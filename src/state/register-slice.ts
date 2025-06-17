import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface RegisterState {
    username: string
    password: string
    email: string
    age: number
    location: string
    error: string
}

const initialState: RegisterState = {
    username: "",
    password: "",
    email: "",
    age: 18,
    location: "",
    error: ""
}

const registerSlice = createSlice({
    name: "registerState",
    initialState,
    reducers: {
        changeUsername: (state, action: PayloadAction<string>) => {
            state.username = action.payload
        },
        changePassword: (state, action: PayloadAction<string>) => {
            state.password = action.payload
        },
        changeEmail: (state, action: PayloadAction<string>) => {
            state.email = action.payload
        },
        changeAge: (state, action: PayloadAction<number>) => {
            state.age = action.payload
        },
        changeLocation: (state, action: PayloadAction<string>) => {
            state.location = action.payload
        },
        changeError: (state, action: PayloadAction<string>) => {
            state.error = action.payload
        }
    }
})

export const { changeUsername, changePassword, changeEmail, changeAge, changeLocation, changeError } = registerSlice.actions
export default registerSlice.reducer