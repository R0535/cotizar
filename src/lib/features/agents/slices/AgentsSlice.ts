import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
  AgentsVM,
  CreateAgentForm,
  CreateAgentFormErrors,
  EditAgentForm,
  EditAgentFormErrors,
} from "../models/AgentsVM";
import { error } from "console";
import { GetAgentDto } from "../models/Agents";
import { create } from "domain";
import { createAgentsSlice } from "./createAgentsSlice";

//make a simple array of agents
const agents: GetAgentDto[] = [
  {
    id: "1",
    name: "Alice Johnson",
    email: "dasds@sdd.com",
    phone: "123-456-7890",
    address: "123 Main St",
    city: "Springfield",
    state: "IL",
    zip: "62701",
    country: "USA",
    createdOn: "2023-07-15",
    updatedOn: "2023-07-15",
  },
  {
    id: "2",
    name: "Alice Johnson",
    email: "dasds@sdd.com",
    phone: "123-456-7890",
    address: "123 Main St",
    city: "Springfield",
    state: "IL",
    zip: "62701",
    country: "USA",
    createdOn: "2023-07-15",
    updatedOn: "2023-07-15",
  },
  {
    id: "3",
    name: "Alice Johnson",
    email: "dasds@sdd.com",
    phone: "123-456-7890",
    address: "123 Main St",
    city: "Springfield",
    state: "IL",
    zip: "62701",
    country: "USA",
    createdOn: "2023-07-15",
    updatedOn: "2023-07-15",
  },
  {
    id: "4",
    name: "Alice Johnson",
    email: "dasds@sdd.com",
    phone: "123-456-7890",
    address: "123 Main St",
    city: "Springfield",
    state: "IL",
    zip: "62701",
    country: "USA",
    createdOn: "2023-07-15",
    updatedOn: "2023-07-15",
  },
  {
    id: "5",
    name: "Alice Johnson",
    email: "dasds@sdd.com",
    phone: "123-456-7890",
    address: "123 Main St",
    city: "Springfield",
    state: "IL",
    zip: "62701",
    country: "USA",
    createdOn: "2023-07-15",
    updatedOn: "2023-07-15",
  },
];
//make empty forms
const emptyCreateAgentForm: CreateAgentForm = {
  name: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  zip: "",
  country: "",
};
const emptyCreateAgentFormErrors: CreateAgentFormErrors = {
  nameError: "",
  emailError: "",
  phoneError: "",
  addressError: "",
  cityError: "",
  stateError: "",
  zipError: "",
  countryError: "",
};
const emptyEditAgentForm: EditAgentForm = {
  id: "",
  name: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  zip: "",
  country: "",
};
const emptyEditAgentFormErrors: EditAgentFormErrors = {
  idError: "",
  nameError: "",
  emailError: "",
  phoneError: "",
  addressError: "",
  cityError: "",
  stateError: "",
  zipError: "",
  countryError: "",
};

interface AgentsState {
  screenVM: AgentsVM; //screen state

  agents: GetAgentDto[] | null; //from the **API**,
  agentsQuery: GetAgentDto[] | null; //agents with queries and filters
  agent: GetAgentDto | null; //selected agent from the list

  createAgentForm: CreateAgentForm | null; //form state
  createAgentFormErrors: CreateAgentFormErrors | null; //form errors
  editAgentForm: EditAgentForm | null; //form
  editAgentFormErrors: EditAgentFormErrors | null; //form errors

  apiError: string | null; //error message
  loading: boolean; //loading state
}
const initialState: AgentsState = {
  screenVM: {
    modalEditAgentOpen: false,
    modalCreateAgentOpen: false,
  },

  agents: agents,
  agentsQuery: null,
  agent: null,

  createAgentForm: emptyCreateAgentForm,
  createAgentFormErrors: emptyCreateAgentFormErrors,
  editAgentForm: emptyEditAgentForm,
  editAgentFormErrors: emptyEditAgentFormErrors,

  apiError: null,
  loading: false,
};

const agentsSlice = createAgentsSlice({
  name: "agents",
  initialState,
  reducers: (create) => ({
    //VM
    openEditModal: create.reducer(
      (state, action: PayloadAction<EditAgentForm>) => {
        state.apiError = null;

        state.editAgentForm = action.payload;
        state.editAgentFormErrors = emptyEditAgentFormErrors;

        state.screenVM.modalEditAgentOpen = true;
      }
    ),
    closeEditModal: create.reducer((state) => {
      state.editAgentForm = emptyEditAgentForm;
      state.editAgentFormErrors = emptyEditAgentFormErrors;

      state.screenVM.modalEditAgentOpen = false;
    }),
    openCreateModal: create.reducer((state) => {
      state.apiError = null;

      state.createAgentForm = emptyCreateAgentForm;
      state.createAgentFormErrors = emptyCreateAgentFormErrors;

      state.screenVM.modalCreateAgentOpen = true;
    }),
    closeCreateModal: create.reducer((state) => {
      state.createAgentForm = emptyCreateAgentForm;
      state.createAgentFormErrors = emptyCreateAgentFormErrors;

      state.screenVM.modalCreateAgentOpen = false;
    }),

    //Local Repository Streams

    setAgents: create.reducer(
      (state, action: PayloadAction<GetAgentDto[] | null>) => {
        state.agents = action.payload;
      }
    ),
    setAgent: create.reducer(
      (state, action: PayloadAction<GetAgentDto | null>) => {
        state.agent = action.payload;
        state.editAgentForm = {
          id: action.payload?.id || "",
          name: action.payload?.name || "",
          email: action.payload?.email || "",
          phone: action.payload?.phone || "",
          address: action.payload?.address || "",
          city: action.payload?.city || "",
          state: action.payload?.state || "",
          zip: action.payload?.zip || "",
          country: action.payload?.country || "",
        };
        state.editAgentFormErrors = emptyEditAgentFormErrors;
      }
    ),
    setAgentsQuery: create.reducer((state, action: PayloadAction<string>) => {
      if (action.payload === "") {
        state.agentsQuery = null;
        return;
      }
      state.agentsQuery =
        state.agents?.filter((agent: GetAgentDto) => {
          return (
            agent.name.toLowerCase().includes(action.payload.toLowerCase()) ||
            agent.email.toLowerCase().includes(action.payload.toLowerCase()) ||
            agent.phone.toLowerCase().includes(action.payload.toLowerCase()) ||
            agent.address
              .toLowerCase()
              .includes(action.payload.toLowerCase()) ||
            agent.city.toLowerCase().includes(action.payload.toLowerCase()) ||
            agent.state.toLowerCase().includes(action.payload.toLowerCase()) ||
            agent.zip.toLowerCase().includes(action.payload.toLowerCase()) ||
            agent.country.toLowerCase().includes(action.payload.toLowerCase())
          );
        }) || null;
    }),

    //Local Fake API
    createAgent: create.asyncThunk(async (form: CreateAgentForm, thunkAPI) => {
      const response = await new Promise<GetAgentDto>((resolve) => {
        setTimeout(() => {
          resolve({
            id: (agents.length + 1).toString(),
            ...form,
            createdOn: new Date().toISOString(),
            updatedOn: new Date().toISOString(),
          });
        }, 2000);
      });

      return response;
    }),

    editAgent: create.asyncThunk(async (form: EditAgentForm, thunkAPI) => {
      const response = await new Promise<GetAgentDto>((resolve) => {
        setTimeout(() => {
          const agent = agents.find((agent) => agent.id === form.id);

          if (agent) {
            agent.name = form.name;
            agent.email = form.email;
            agent.phone = form.phone;
            agent.address = form.address;
            agent.city = form.city;
            agent.state = form.state;
            agent.zip = form.zip;
            agent.country = form.country;
            agent.updatedOn = new Date().toISOString();
          }

          resolve(agent!);
        }, 2000);
      });
      return response;
    }),

    //Forms
    setCreateAgentForm: create.reducer(
      (state, action?: PayloadAction<CreateAgentForm | null>) => {
        if (action) {
          state.createAgentForm = action.payload;
          return;
        } else state.createAgentForm = emptyCreateAgentForm;
      }
    ),

    setCreateAgentFormErrors: create.reducer(
      (state, action: PayloadAction<CreateAgentFormErrors>) => {
        state.createAgentFormErrors = action.payload;
      }
    ),

    setEditAgentForm: create.reducer(
      (state, action: PayloadAction<EditAgentForm>) => {
        state.editAgentForm = action.payload;
      }
    ),
    setEditAgentFormErrors: create.reducer(
      (state, action: PayloadAction<EditAgentFormErrors>) => {
        state.editAgentFormErrors = action.payload;
      }
    ),

    //Api Responses and States
    setApiError: create.reducer(
      (state, action: PayloadAction<string | null>) => {
        state.apiError = action.payload;
      }
    ),
    setLoading: create.reducer((state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    }),
  }),
  selectors: {
    getScreenVM: (agentsState) => agentsState.screenVM,

    getAgents: (agentsState) => agentsState.agent,
    queryAgents: (agentsState) => agentsState.agentsQuery,
    getAgent: (agentsState) => agentsState.agent,

    getCreateAgentForm: (agentsState) => agentsState.createAgentForm,
    getCreateAgentFormErrors: (agentsState) =>
      agentsState.createAgentFormErrors,
    getEditAgentForm: (agentsState) => agentsState.editAgentForm,
    getEditAgentFormErrors: (agentsState) => agentsState.editAgentFormErrors,

    getError: (agentsState) => agentsState.apiError,
    getLoading: (agentsState) => agentsState.loading,
  },
});

export const {
  setAgents,
  setAgent,
  setApiError,
  setLoading,
  closeCreateModal,
  closeEditModal,
  openCreateModal,
  openEditModal,
  setAgentsQuery,
  createAgent,
  editAgent,
  setCreateAgentForm,
  setCreateAgentFormErrors,
  setEditAgentForm,
  setEditAgentFormErrors,
} = agentsSlice.actions; //actions

export const {
  getAgents,
  getAgent,
  queryAgents,
  getError,
  getLoading,
  getCreateAgentForm,
  getCreateAgentFormErrors,
  getEditAgentForm,
  getEditAgentFormErrors,
  getScreenVM,
} = agentsSlice.selectors; //selectors

export default agentsSlice.reducer;
