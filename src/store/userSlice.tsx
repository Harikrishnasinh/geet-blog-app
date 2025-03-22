import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuthenticated: false,
    user: {},
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action) {
            console.log(state,13,  action);
            state.isAuthenticated = true;
            state.user = action.payload;
            localStorage.setItem('user', JSON.stringify(action.payload));
        },
        logout(state) {
            state.isAuthenticated = false;
            state.user = {};
        },
    },
})

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;