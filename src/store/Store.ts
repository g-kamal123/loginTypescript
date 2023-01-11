import { configureStore } from '@reduxjs/toolkit'
import adminPanelSlice from './slices/AdminPanelSlice'
import gridSlice  from './slices/GridSlice'
import querySlice from './slices/QuerySlice'
export const store = configureStore({
    reducer:{
        grid:gridSlice,
        query:querySlice,
        adminPanel:adminPanelSlice
    }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch