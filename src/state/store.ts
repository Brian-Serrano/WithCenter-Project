import { configureStore } from '@reduxjs/toolkit'
import loginStateReducer from './login-slice.ts'
import registerStateReducer from './register-slice.ts'

export const store = configureStore({
  reducer: {
    loginState: loginStateReducer,
    registerState: registerStateReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;