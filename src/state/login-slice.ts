import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface LoginState {
    username: string
    password: string
    error: string
}

const initialState: LoginState = {
    username: "",
    password: "",
    error: ""
}

const loginSlice = createSlice({
    name: "loginState",
    initialState,
    reducers: {
        changeUsername: (state, action: PayloadAction<string>) => {
            state.username = action.payload
        },
        changePassword: (state, action: PayloadAction<string>) => {
            state.password = action.payload
        },
        changeError: (state, action: PayloadAction<string>) => {
            state.error = action.payload
        }
    }
})

export const { changeUsername, changePassword, changeError } = loginSlice.actions
export default loginSlice.reducer