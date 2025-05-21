import { createSlice } from "@reduxjs/toolkit";


const NotificationToastSlice = createSlice({
    name: "NotifyToast",
    initialState: {
        title:'',
        text:'',
        visible:false,
        success:null
    },
    reducers:{
        showNotify :(state,action)=>{
            state.title=action.payload.title;
            state.text=action.payload.text;
            state.visible= true;
            state.success= action.payload.success;

        },
        hideNotify :(state)=>{
            state.title='';
            state.text='';
            state.visible= false;
            state.success= null;

        }
    }
})
export const {showNotify,hideNotify} = NotificationToastSlice.actions;
export default NotificationToastSlice.reducer;