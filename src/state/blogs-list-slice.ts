import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface Blog {
    id: number
    title: string,
    description: string,
    created_at: string,
    created_by: string,
    is_editable: boolean,
    user_id: string
}

interface BlogsList {
    data: Array<Blog>,
    processState: string,
    error: string
}

const initialState: BlogsList = {
    data: [],
    processState: "loading",
    error: ""
}

const blogsListSlice = createSlice({
    name: "blogsList",
    initialState,
    reducers: {
        onSuccess: (state, action: PayloadAction<Array<Blog>>) => {
            state.data = action.payload
            state.processState = "success"
        },
        onError: (state, action: PayloadAction<string>) => {
            state.error = action.payload
            state.processState = "failed"
        }
    }
})

export const { onSuccess, onError } = blogsListSlice.actions
export default blogsListSlice.reducer