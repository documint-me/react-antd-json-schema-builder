import { configureStore } from '@reduxjs/toolkit'
import schemaReducer from 'reducers/schema'

export const store = configureStore({
  reducer: {
    schema: schemaReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
