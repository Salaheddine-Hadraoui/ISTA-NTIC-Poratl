import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchSchedules = createAsyncThunk(
  'schedules/fetchSchedules',
  async ({ urlApi, scheduleInfo, methodHTTP, isFormData }, { rejectWithValue }) => {
    try {
      const method = methodHTTP;
      const headers = scheduleInfo
        ? {
            Accept: 'application/json',
            ...(isFormData ? { 'Authorization': `Bearer ${localStorage.getItem('auth_token')}` } : {}),
          }
        : {};

      const res = await fetch(`http://localhost:8000/api/${urlApi}`, {
        method: method,
        headers: headers,
        ...(isFormData ? { body: scheduleInfo } : {}),
      });

      if (!res.ok) {
        const status = res.status;
        const error = await res.json();
        let errorMsg = 'Une erreur est survenue lors de la gestion des emplois du temps.';

        if ([500, 502, 503].includes(status)) {
          errorMsg = 'Erreur du serveur, veuillez réessayer plus tard.';
        } else if ([401, 422].includes(status)) {
          errorMsg = "Échec de l'authentification.";
        } else if (status === 419) {
          errorMsg = 'Session expirée.';
        }

        return rejectWithValue(error.message || errorMsg);
      }

      const data = await res.json();
      return { data, method };
    } catch (err) {
      return rejectWithValue("Échec de l'authentification.");
    }
  }
);

const SchedulesSlice = createSlice({
    name: 'SchedulesData',
    initialState: {
      schedules: [],
      error: null,
      loading: false,
    },
    reducers: {
      DeleteSchedule: (state, action) => {
        const deletedId = action.payload.id;
        if (deletedId) {
          state.schedules = state.schedules.filter(s => s.id !== deletedId);
        }
      },
      UpdateSchedule: (state, action) => {
        const updatedSchedule = action.payload;
        state.schedules = state.schedules.map(schedule =>
          schedule.id === updatedSchedule.id ? updatedSchedule : schedule
        );
      },
    },
    extraReducers: builder => {
      builder
        .addCase(fetchSchedules.pending, state => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchSchedules.fulfilled, (state, action) => {
          state.loading = false;
          const { method, data } = action.payload;
  
          if (method === 'POST' && data.schedule) {
            const exists = state.schedules.some(s => s.id === data.schedule.id);
            if (!exists) {
              state.schedules.push(data.schedule);
            }
          } else if (method === 'GET') {
            state.schedules = data.schedules;
          }
        })
        .addCase(fetchSchedules.rejected, (state, action) => {
          state.loading = false;
          state.schedules = [];
          state.error = action.payload;
        });
    },
  });
  
  export const { DeleteSchedule, UpdateSchedule } = SchedulesSlice.actions;
  export default SchedulesSlice.reducer;
  
