
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchEvents = createAsyncThunk('events/fetchEvents',async ({ urlApi, eventInfo ,methodHTTP,isFormData}, { rejectWithValue }) => {


    try {
        const method = methodHTTP ;
      
        const headers = eventInfo ? {
            ...(isFormData &&
                {'Authorization': `Bearer ${localStorage.getItem('auth_token')}`})
            } : {};
        const res = await fetch(`http://localhost:8000/api/${urlApi}`, {
            method: method,
            headers: headers,
            ...((isFormData) ? { body: eventInfo } : {})
        });
        if (!res.ok) {
            const status = res.status;
            const error = await res.json();
            
            let errorMsg = "Une erreur est survenue lors de la gestion de l'evenements";
          
            if ([500, 502, 503].includes(status)) {

                errorMsg = "Erreur du serveur, impossible de gerer l'evenement pour le moment. Veuillez reessayer plus tard.";
              } 
              else 
                if ([401, 422].includes(status)) 
                    {
                errorMsg = "Echec de l'authentification. Vous devez être connecte pour effectuer cette action.";
              } else if 
              (status === 419) {
                errorMsg = "Session expiree. Veuillez vous reconnecter pour continuer.";
              } else {
                errorMsg = `Une erreur inconnue s'est produite. Veuillez reessayer plus tard.`;
              }
          
            return rejectWithValue(error.message || errorMsg);
          }
        
        const data = await res.json();
        console.log(data.events)
        return {data, method};
    }
    catch (err) { 
        console.log(err)
        return rejectWithValue("echec de l'authentification, veuillez reessayer."); 
    }
})

const EventsSlice = createSlice({
    name: "EventsData",
    initialState: {
        events: [], 
        error: null,
        loading:false,
    },
    reducers:{
        DeleteEvent :(state,action)=>{
            const deletedId = action.payload.id;
            if (deletedId) {
                state.events = state.events.filter(e => e.id !== deletedId);
            }
        },
        UpdateEvent:(state,action)=>{
            const updatedEvent = action.payload;
            
                   state.events = state.events.map((event) =>
                    event.id === updatedEvent.id ? updatedEvent : event
                  );    
               
        }
    }
    ,
    extraReducers: (builder) => {
        builder
            .addCase(fetchEvents.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchEvents.fulfilled, (state, action) => {
                state.loading = false;
                const {method,data} = action.payload
                
                if(method === 'POST' &&  data.event){
                    const exist = state.events.some(e=>e.id === data.event.id)
                    if(!exist){
                        state.events.push(data.event)
                        
                    }
                }
                else if(method === 'GET'){
                    
                    state.events = action.payload.data.events;
                }

            })
            .addCase(fetchEvents.rejected, (state, action) => {
                state.loading = false;
                state.events = [];
                state.error = action.payload;
            })
    },
});
export const { DeleteEvent, UpdateEvent} = EventsSlice.actions
export default EventsSlice.reducer;
