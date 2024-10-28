import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import agentsReducer from '@/lib/features/agents/slices/AgentsSlice'
import usersReducer from '@/lib/features/users/slices/UsersSlice'
import featuresReducer from '@/lib/features/canvas/slices/FeaturesSlice'
import projectsReducer from '@/lib/features/canvas/slices/ProjectsSlice'
export const makeStore = () => {
  return configureStore({
    reducer: {
      agents: agentsReducer,
      users: usersReducer,
      features: featuresReducer,
      projects: projectsReducer,
    }
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>;
