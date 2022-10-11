import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Authentication {
    id: number,
    username: string | null,
    firstName: string | null,
    lastName: string | null,
    token: string | null,
    position: string | null,
    phone: string | null,
    image: string | null
}

const initialState: Authentication = {
    id: 0,
    username: null,
    firstName: null,
    lastName: null,
    token: null,
    position: null,
    phone: null,
    image: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action: PayloadAction<Authentication>) => {
            state.id = action.payload.id
            state.username = action.payload.username
            state.firstName = action.payload.firstName
            state.lastName = action.payload.lastName
            state.token = action.payload.token
            state.position = action.payload.position
            state.phone = action.payload.phone
            state.image = action.payload.image
        },
        logout: (state) => {
            state.id = 0
            state.username = null
            state.firstName = null
            state.lastName = null
            state.token = null
            state.position = null
            state.phone = null
            state.image = null
        }
    }
})

export const { login, logout } = authSlice.actions

export default authSlice.reducer