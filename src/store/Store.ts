import { configureStore } from '@reduxjs/toolkit'
import gridSlice  from './slices/GridSlice'
import querySlice from './slices/QuerySlice'
export const store = configureStore({
    reducer:{
        grid:gridSlice,
        query:querySlice
    }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch