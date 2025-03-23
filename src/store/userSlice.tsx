import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuthenticated: false,
    user: {
        firstName: '',
        lastName: '',
        userName: '',
        email: '',
        password: '',
        likedPosts: [],
    },
}

const clearUser = () =>{
    initialState.user  = {
        firstName: '',
        lastName: '',
        userName: '',
        email: '',
        password: '',
        likedPosts: [],
    }
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action) {
            state.isAuthenticated = true;
            state.user = action.payload;
        },
        logout(state) {
            state.isAuthenticated = false;
            clearUser();
        },
    },
})

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;