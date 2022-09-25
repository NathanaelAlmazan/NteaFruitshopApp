import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SearchState {
    searchQuery: string;
}

const initialState: SearchState = {
    searchQuery: "",
}

const connectionnSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        search: (state, action: PayloadAction<string>) => {
            state.searchQuery = action.payload.toLowerCase()
        }
    }
})

export const { search } = connectionnSlice.actions

export default connectionnSlice.reducer