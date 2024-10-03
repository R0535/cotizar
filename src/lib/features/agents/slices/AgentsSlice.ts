import {  PayloadAction } from "@reduxjs/toolkit";

import {
  AgentsVM,
  CreateAgentFormErrors,
  EditAgentFormErrors,
} from "../models/AgentsVM";
import { GetAgentDto, PostAgentRequest, PutAgentRequest } from "../models/Agents";
import { createAgentsSlice } from "./createAgentsSlice";
import { AgentsApi } from "@/lib/api/AgentsApi";

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
const emptyCreateAgentForm: PostAgentRequest = {
  name: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  zip: "",
  country: "",
  userId: "",
  creatorId: "",
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
const emptyEditAgentForm: PutAgentRequest = {
  id: "",
  name: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  zip: "",
  country: "",
  userId: "",
  updaterId: "",
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

//create api reference
const api: AgentsApi = new AgentsApi("/api");


interface AgentsState {
  screenVM: AgentsVM; //screen state

  agents: GetAgentDto[] | null; //from the **API**,
  agentsQuery: GetAgentDto[] | null; //agents with queries and filters
  agent: GetAgentDto | null; //selected agent from the list

  createAgentForm: PostAgentRequest | null; //form state
  createAgentFormErrors: CreateAgentFormErrors | null; //form errors
  editAgentForm: PutAgentRequest | null; //form
  editAgentFormErrors: EditAgentFormErrors | null; //form errors

  apiError: string | null; //error message
  loading: boolean; //loading state
}
const initialState: AgentsState = {
  screenVM: {
    modalEditAgentOpen: false,
    modalCreateAgentOpen: false,
  },

  agents: null,
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
  reducers: (createRx) => ({
    //#region Form States
    //VM
    openEditModal: createRx.reducer(
      (state, action: PayloadAction<PutAgentRequest>) => {
        state.apiError = null;

        state.editAgentForm = action.payload;
        state.editAgentFormErrors = emptyEditAgentFormErrors;

        state.screenVM.modalEditAgentOpen = true;
      }
    ),
    closeEditModal: createRx.reducer((state) => {
      state.editAgentForm = emptyEditAgentForm;
      state.editAgentFormErrors = emptyEditAgentFormErrors;

      state.screenVM.modalEditAgentOpen = false;
    }),
    openCreateModal: createRx.reducer((state) => {
      state.apiError = null;

      state.createAgentForm = emptyCreateAgentForm;
      state.createAgentFormErrors = emptyCreateAgentFormErrors;

      state.screenVM.modalCreateAgentOpen = true;
    }),
    closeCreateModal: createRx.reducer((state) => {
      state.createAgentForm = emptyCreateAgentForm;
      state.createAgentFormErrors = emptyCreateAgentFormErrors;

      state.screenVM.modalCreateAgentOpen = false;
    }),
    //#endregion Form States
    //#region Local Repository Streams

    setAgents: createRx.reducer(
      (state, action: PayloadAction<GetAgentDto[] | null>) => {
        state.agents = action.payload;
      }
    ),
    setAgent: createRx.reducer(
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
          userId: action.payload?.id || "",
          updaterId: action.payload?.id || "",
        };
        state.editAgentFormErrors = emptyEditAgentFormErrors;
      }
    ),
    setAgentsQuery: createRx.reducer((state, action: PayloadAction<string>) => {
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
    //#endregion Local Repository Streams
    //#region Async Thunks
    /**
     * Async Thunks are used to make API calls and handle the response.
     */
    //Local API
    fetchAgents: createRx.asyncThunk(async (_, thunkAPI) => {

      thunkAPI.dispatch(setLoading(true));
      thunkAPI.dispatch(setApiError(null));

      try {
        const response = await api.getAgents();
        if (!response) {
          thunkAPI.dispatch(setApiError("Failed to fetch agents"));
          thunkAPI.dispatch(setLoading(false));
          throw new Error("Failed to fetch agents");
        }
        thunkAPI.dispatch(setAgents(response));
        thunkAPI.dispatch(setLoading(false));
        return response;
      } catch (error : any) {

        thunkAPI.dispatch(setApiError(error?.message || "Failed to fetch agents"));
        thunkAPI.dispatch(setLoading(false));

        return thunkAPI.rejectWithValue(error);
      }
    }),
    createAgent: createRx.asyncThunk(
      async (form: PostAgentRequest, thunkAPI) => {
        thunkAPI.dispatch(setLoading(true));
        thunkAPI.dispatch(setApiError(null));

        try {
          const response = await api.createAgent(form);

          if (!response) {
            thunkAPI.dispatch(setApiError("Failed to create agent"));
            thunkAPI.dispatch(setLoading(false));
            throw new Error("Failed to create agent");

          }

          thunkAPI.dispatch(setLoading(false));
          thunkAPI.dispatch(closeCreateModal());
          return response;
        } catch (error:any) {
          thunkAPI.dispatch(setApiError(error?.message || "Failed to create agent"));
          thunkAPI.dispatch(setLoading(false));
          return thunkAPI.rejectWithValue(error);
        }
      }
    ),
        //Local Fake API
    createAgentLocal: createRx.asyncThunk(
      async (form: PostAgentRequest) => {
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
      }
    ),

    editAgent: createRx.asyncThunk(async (form: PutAgentRequest, thunkAPI) => {
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
    //#endregion
    /***
     * Form States are used to manage the form state and errors.
     */
    setCreateAgentForm: createRx.reducer(
      (state, action?: PayloadAction<PostAgentRequest | null>) => {
        if (action) {
          state.createAgentForm = action.payload;
          return;
        } else state.createAgentForm = emptyCreateAgentForm;
      }
    ),

    setCreateAgentFormErrors: createRx.reducer(
      (state, action: PayloadAction<CreateAgentFormErrors>) => {
        state.createAgentFormErrors = action.payload;
      }
    ),

    setEditAgentForm: createRx.reducer(
      (state, action: PayloadAction<PutAgentRequest>) => {
        state.editAgentForm = action.payload;
      }
    ),
    setEditAgentFormErrors: createRx.reducer(
      (state, action: PayloadAction<EditAgentFormErrors>) => {
        state.editAgentFormErrors = action.payload;
      }
    ),

    /**
     * States to handle API errors and loading state.
     */
    setApiError: createRx.reducer(
      (state, action: PayloadAction<string | null>) => {
        state.apiError = action.payload;
      }
    ),
    setLoading: createRx.reducer((state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    }),
  }),
  //#endregion Form States

  /*
Selectors are used to extract data from the Redux store state.
*/
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
  fetchAgents,
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
