import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    username : null,
    email : null,
    accesstoken : null,
    role :null,
}

export const authSlice = createSlice({
    name :'auth',
    initialState,
    reducers :{
        addCredentials : (state,action) => {
            state.username = action.payload.username ;
            state.email = action.payload.email;
            state.accesstoken = action.payload.accesstoken;
            state.role = action.payload.role
        },
        logout :(state) =>{
            state.username = null;
            state.email = null;
            state.accesstoken = null
        }
    }
})
export const currentUser = (state) =>state.username
export const {addCredentials,logout} = authSlice.actions;
export default authSlice.reducer