import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface LogoutState {
    error: string
}

const initialState: LogoutState = {
    error: ""
}

const logoutSlice = createSlice({
    name: "logoutState",
    initialState,
    reducers: {
        changeError: (state, action: PayloadAction<string>) => {
            state.error = action.payload
        }
    }
})

export const { changeError } = logoutSlice.actions
export default logoutSlice.reducer