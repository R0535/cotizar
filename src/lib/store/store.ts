import { configureStore } from '@reduxjs/toolkit'
import agentsReducer from '@/lib/features/agents/slices/AgentsSlice'
export const makeStore = () => {
  return configureStore({
    reducer: {
      agents: agentsReducer

    }
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']