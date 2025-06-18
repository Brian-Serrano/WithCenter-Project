import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface LoginState {
    email: string
    password: string
    error: string
}

const initialState: LoginState = {
    email: "",
    password: "",
    error: ""
}

const loginSlice = createSlice({
    name: "loginState",
    initialState,
    reducers: {
        changeEmail: (state, action: PayloadAction<string>) => {
            state.email = action.payload
        },
        changePassword: (state, action: PayloadAction<string>) => {
            state.password = action.payload
        },
        changeError: (state, action: PayloadAction<string>) => {
            state.error = action.payload
        }
    }
})

export const { changeEmail, changePassword, changeError } = loginSlice.actions
export default loginSlice.reducer