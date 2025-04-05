import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    adminUser: {
        firstName: '',
        lastName: '',
        userName: '',
        email: '',
    },
}

const adminUserSlice = createSlice({
    name: 'adminUser',
    initialState,
    reducers: {
        updateAdminUser(state, action) {
            state.adminUser.firstName = action.payload.firstName;
            state.adminUser.lastName = action.payload.lastName;
            state.adminUser.userName = action.payload.userName;
            state.adminUser.email = action.payload.email;
        },
    },
})

export const { updateAdminUser } = adminUserSlice.actions
export default adminUserSlice.reducer