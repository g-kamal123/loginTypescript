import { configureStore } from '@reduxjs/toolkit'
import gridSlice  from './slices/GridSlice'
export const store = configureStore({
    reducer:{
        grid:gridSlice,
    }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch