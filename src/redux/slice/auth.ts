import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Authentication {
    username: string | null,
    firstName: string | null,
    lastName: string | null,
    token: string | null,
    position: string | null
}

const initialState: Authentication = {
    username: null,
    firstName: null,
    lastName: null,
    token: null,
    position: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action: PayloadAction<Authentication>) => {
            state.username = action.payload.username,
            state.firstName = action.payload.firstName,
            state.lastName = action.payload.lastName,
            state.token = action.payload.token,
            state.position = action.payload.position
        },
        logout: (state) => {
            state.username = null,
            state.firstName = null,
            state.lastName = null,
            state.token = null
        }
    }
})

export const { login, logout } = authSlice.actions

export default authSlice.reducer