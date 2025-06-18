import { configureStore } from '@reduxjs/toolkit'
import loginStateReducer from './login-slice.ts'
import registerStateReducer from './register-slice.ts'
import createBlogReducer from './create-blog-slice.ts'
import blogsListReducer from './blogs-list-slice.ts'
import updateBlogReducer from './update-blog-slice.ts'
import deleteBlogReducer from './delete-blog-slice.ts'
import logoutStateReducer from './logout-slice.ts'

export const store = configureStore({
  reducer: {
    loginState: loginStateReducer,
    registerState: registerStateReducer,
    createBlog: createBlogReducer,
    blogsList: blogsListReducer,
    updateBlog: updateBlogReducer,
    deleteBlog: deleteBlogReducer,
    logoutState: logoutStateReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;