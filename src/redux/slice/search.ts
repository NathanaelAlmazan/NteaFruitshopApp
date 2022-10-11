import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SearchState {
    searchQuery: string;
    notification: string[]
}

const initialState: SearchState = {
    searchQuery: "",
    notification: []
}

const connectionnSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        search: (state, action: PayloadAction<string>) => {
            state.searchQuery = action.payload.toLowerCase()
        },
        addNotification: (state, action: PayloadAction<string[]>) => {
            const notif: string[] = []
            action.payload.forEach(item => notif.push(item))
            state.notification = notif
        }
    }
})

export const { search, addNotification } = connectionnSlice.actions

export default connectionnSlice.reducer