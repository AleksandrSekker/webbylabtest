import { configureStore } from '@reduxjs/toolkit'
import modalReducer from './modal'
import moviesReducer from './movie'

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    movies: moviesReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
