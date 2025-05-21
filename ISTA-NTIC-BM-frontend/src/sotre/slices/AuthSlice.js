import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const loginUser = createAsyncThunk(
  "authUser/loginUser",
  async ({ urlApi, userInfo, token }, { rejectWithValue }) => {
    try {
      
        const method = userInfo ? 'POST' : 'GET';
      const res = await fetch(`http://localhost:8000/api/${urlApi}`, {
        method: method,
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          ...(token ? {'Authorization': `Bearer ${token}`} : {})
        },
        body: userInfo ?  JSON.stringify(userInfo) : null,
      });

      const data = await res.json();

      if (!res.ok) {
        let errorMsg = "Échec de l'authentification, veuillez réessayer.";
        if (res.status === 401 || res.status === 422) {
          errorMsg = data.message || errorMsg;
        }
       
        return rejectWithValue(errorMsg);
      }
      
    

      token ? localStorage.setItem("auth_token",token) : localStorage.setItem("auth_token",data.token);
      console.log(data)
      return data;
    } catch (err) {
      
      return rejectWithValue("Erreur inattendue lors de la connexion.");
    }
  }
);


export const logoutUser = createAsyncThunk(
  "authUser/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("auth_token");
     
      const res = await fetch("http://localhost:8000/api/logout", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const errorData = await res.json();
        return rejectWithValue(errorData.message || "Erreur lors de la déconnexion.");
      }

      localStorage.removeItem("auth_token");

      return await res.json();
    } catch (err) {
      return rejectWithValue("Erreur de déconnexion.");
    }
  }
);

const userAuthSlice = createSlice({
  name: "authUser",
  initialState: {
    user: null,
    loading: false,
    error: null,
    role: null,
    token: localStorage.getItem("auth_token") || null,
  },
  reducers: {
    setUser:(state,action)=>{
      state.user = action.payload.user;
      state.role = action.payload.role;
      console.log(action.payload)
    }
  },
  extraReducers: (builder) => {
    builder
      
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.role = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = localStorage.getItem('auth_token');
        state.role = action.payload.user.role;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.token = null;
        state.error = action.payload;
      })
     
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.error = null;
        state.role = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});
export const {setUser} = userAuthSlice.actions;
export default userAuthSlice.reducer;
