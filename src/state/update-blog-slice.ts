import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface UpdateBlog {
    id: number
    title: string
    description: string
    user_id: string
    error: string
    processState: string
}

const initialState: UpdateBlog = {
    id: 0,
    title: "",
    description: "",
    user_id: "",
    error: "",
    processState: "loading"
}

const updateBlogSlice = createSlice({
    name: "updateBlog",
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
        },
        onError: (state, action: PayloadAction<string>) => {
            state.error = action.payload
            state.processState = "failed"
        },
        onSuccess: (state, action: PayloadAction<UpdateBlog>) => {
            state.id = action.payload.id
            state.title = action.payload.title
            state.description = action.payload.description
            state.user_id = action.payload.user_id
            state.error = ""
            state.processState = "success"
        }
    }
})

export const { changeTitle, changeDescription, changeError, onError, onSuccess } = updateBlogSlice.actions
export default updateBlogSlice.reducer