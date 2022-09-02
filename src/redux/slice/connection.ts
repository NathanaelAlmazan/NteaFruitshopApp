import { createSlice } from "@reduxjs/toolkit";

interface ConnectionState {
    online: boolean;
}

const initialState: ConnectionState = {
    online: true,
}

const connectionnSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        log: (state) => {
            console.log(state.online)
        },
    }
})

export const { log } = connectionnSlice.actions

export default connectionnSlice.reducer