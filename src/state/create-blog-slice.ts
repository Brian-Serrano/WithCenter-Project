import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface CreateBlog {
    title: string
    description: string
    error: string
}

const initialState: CreateBlog = {
    title: "",
    description: "",
    error: ""
}

const createBlogSlice = createSlice({
    name: "createBlog",
    initialState,
    reducers: {
        changeTitle: (state, action: PayloadAction<string>) => {
            state.title = action.payload
        },
        changeDescription: (state, action: PayloadAction<string>) => {
            state.description = action.payload
        },
        changeError: (state, action: PayloadAction<string>) => {
            state.error = action.payload
        }
    }
})

export const { changeTitle, changeDescription, changeError } = createBlogSlice.actions
export default createBlogSlice.reducer