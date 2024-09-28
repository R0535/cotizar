import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { GetAgentResponse } from '../domain/entities/Agents'

interface AgentsState {
  agents: GetAgentResponse[] | null
  agentsQuery: GetAgentResponse[] | null
  agent: GetAgentResponse | null
  lines: string[] | null
  error: string | null
  loading: boolean
}

const initialState: AgentsState = {
  agents: null,
  agentsQuery: null,
  agent: null,
  lines: null,
  error: null,
  loading: false
}

const agentsSlice = createSlice({
  name: 'agents',
  initialState,
  reducers: {
    setAgents: (state, action: PayloadAction<GetAgentResponse[] | null>) => {
      state.agents = action.payload
    },
    setAgent: (state, action: PayloadAction<GetAgentResponse | null>) => {
      state.agent = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setLines: (state, action: PayloadAction<string[] | null>) => {
      state.lines = action.payload
    },
    getAgentsEnum: (state, action:PayloadAction<string>) => {
      if (action.payload === '') {
        state.agentsQuery = null
        return
      }
      state.agentsQuery = state.agents?.filter((agent)=> {
        return(
          agent.names.toLowerCase().includes(action.payload.toLowerCase()) ||
          agent.lastNames.toLowerCase().includes(action.payload.toLowerCase()) ||
          agent.email.toLowerCase().includes(action.payload.toLowerCase()) ||
          agent.phoneNumber.toLowerCase().includes(action.payload.toLowerCase()) ||
          agent.role.toLowerCase().includes(action.payload.toLowerCase())
        )
      })||null;
    }
  }
})

export const { setAgents, setAgent, setError, setLoading, setLines,getAgentsEnum } = agentsSlice.actions

export default agentsSlice.reducer
