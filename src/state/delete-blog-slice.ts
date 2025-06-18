import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface DeleteBlog {
    id: number
    title: string
    user_id: string
    error: string
    processState: string
}

const initialState: DeleteBlog = {
    id: 0,
    title: "",
    user_id: "",
    error: "",
    processState: "loading"
}

const deleteBlogSlice = createSlice({
    name: "deleteBlog",
    initialState,
    reducers: {
        changeError: (state, action: PayloadAction<string>) => {
            state.error = action.payload
        },
        onError: (state, action: PayloadAction<string>) => {
            state.error = action.payload
            state.processState = "failed"
        },
        onSuccess: (state, action: PayloadAction<DeleteBlog>) => {
            state.id = action.payload.id
            state.title = action.payload.title
            state.user_id = action.payload.user_id
            state.error = ""
            state.processState = "success"
        }
    }
})

export const { changeError, onError, onSuccess } = deleteBlogSlice.actions
export default deleteBlogSlice.reducer