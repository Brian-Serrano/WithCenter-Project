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
    error: string,
    pageNumber: number,
    count: number
}

interface BlogState {
    blogs: Array<Blog>,
    count: number
}

const initialState: BlogsList = {
    data: [],
    processState: "loading",
    error: "",
    pageNumber: 1,
    count: 0
}

const blogsListSlice = createSlice({
    name: "blogsList",
    initialState,
    reducers: {
        onSuccess: (state, action: PayloadAction<BlogState>) => {
            state.data = action.payload.blogs
            state.count = action.payload.count
            state.processState = "success"
        },
        onError: (state, action: PayloadAction<string>) => {
            state.error = action.payload
            state.processState = "failed"
        },
        decrementPage: (state) => {
            if (state.pageNumber > 1) {
                state.pageNumber--
            }
        },
        incrementPage: (state, action: PayloadAction<number>) => {
            if (state.pageNumber < Math.ceil(action.payload / 6)) {
                state.pageNumber++
            }
        }
    }
})

export const { onSuccess, onError, decrementPage, incrementPage } = blogsListSlice.actions
export default blogsListSlice.reducer