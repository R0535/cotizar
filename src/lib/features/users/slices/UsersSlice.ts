import { PayloadAction } from "@reduxjs/toolkit";

import {
  UsersVM,
  CreateUserFormErrors,
  EditUserFormErrors,
} from "../models/UsersVM";
import { GetUserDto, PostUserRequest, PutUserRequest } from "../models/Users";
import { createUsersSlice } from "./createUsersSlice";
import { UsersApi } from "@/lib/api/Users/UsersApi";

//make empty forms
const emptyCreateUserForm: PostUserRequest = {
  email: "",
  name: "",
  password: "",
  agentId: "",
  createdById: "",
};
const emptyCreateUserFormErrors: CreateUserFormErrors = {
  emailError: "",
  nameError: "",
  passwordError: "",
  agentIdError: "",
  codeError: "",
  activeError: "",
  deletedError: "",
};
const emptyEditUserForm: PutUserRequest = {
  id: "",
  name: "",
  email: "",
  active: false,
  code: "",
  updatedById: "",
};
const emptyEditUserFormErrors: EditUserFormErrors = {
  idError: "",
  nameError: "",
  emailError: "",
  activeError: "",
  codeError: "",
  deletedError: "",
  agentIdError: "",
};

//create api reference
const api: UsersApi = new UsersApi("/api");

interface UsersState {
  screenVM: UsersVM; //screen state

  users: GetUserDto[] | null; //from the **API**,
  usersQuery: GetUserDto[] | null; //users with queries and filters
  user: GetUserDto | null; //selected user from the list

  createUserForm: PostUserRequest | null; //form state
  createUserFormErrors: CreateUserFormErrors | null; //form errors
  editUserForm: PutUserRequest | null; //form
  editUserFormErrors: EditUserFormErrors | null; //form errors

  apiError: string | null; //error message
  loading: boolean; //loading state
}
const initialState: UsersState = {
  screenVM: {
    modalEditUserOpen: false,
    modalCreateUserOpen: false,
  },

  users: null,
  usersQuery: null,
  user: null,

  createUserForm: emptyCreateUserForm,
  createUserFormErrors: emptyCreateUserFormErrors,
  editUserForm: emptyEditUserForm,
  editUserFormErrors: emptyEditUserFormErrors,

  apiError: null,
  loading: false,
};

const usersSlice = createUsersSlice({
  name: "users",
  initialState,
  reducers: (createRx) => ({
    //#region Form States
    //VM
    openEditModal: createRx.reducer(
      (state, action: PayloadAction<PutUserRequest>) => {
        state.apiError = null;

        state.editUserForm = action.payload;
        state.editUserFormErrors = emptyEditUserFormErrors;

        state.screenVM.modalEditUserOpen = true;
      }
    ),
    closeEditModal: createRx.reducer((state) => {
      state.editUserForm = emptyEditUserForm;
      state.editUserFormErrors = emptyEditUserFormErrors;

      state.screenVM.modalEditUserOpen = false;
    }),
    openCreateModal: createRx.reducer((state) => {
      state.apiError = null;

      state.createUserForm = emptyCreateUserForm;
      state.createUserFormErrors = emptyCreateUserFormErrors;

      state.screenVM.modalCreateUserOpen = true;
    }),
    closeCreateModal: createRx.reducer((state) => {
      state.createUserForm = emptyCreateUserForm;
      state.createUserFormErrors = emptyCreateUserFormErrors;

      state.screenVM.modalCreateUserOpen = false;
    }),
    //#endregion Form States
    //#region Local Repository Streams

    setUsers: createRx.reducer(
      (state, action: PayloadAction<GetUserDto[] | null>) => {
        state.users = action.payload;
      }
    ),
    setUser: createRx.reducer(
      (state, action: PayloadAction<GetUserDto | null>) => {
        state.user = action.payload;
        state.editUserForm = {
          id: action.payload?.id || "",
          name: action.payload?.name || "",
          email: action.payload?.email || "",
          active: action.payload?.active || false,
          code: action.payload?.code || "",
          updatedById: "",
        };
        state.editUserFormErrors = emptyEditUserFormErrors;
      }
    ),
    setUsersQuery: createRx.reducer((state, action: PayloadAction<string>) => {
      if (action.payload === "") {
        state.usersQuery = null;
        return;
      }
      state.usersQuery =
        state.users?.filter((user: GetUserDto) => {
          return (
            user?.name?.toLowerCase().includes(action.payload.toLowerCase()) ||
            user?.email?.toLowerCase().includes(action.payload.toLowerCase()) ||
            user?.code?.toLowerCase().includes(action.payload.toLowerCase()) ||
            user?.active?.toString().includes(action.payload.toLowerCase()) ||
            user?.deleted?.toString().includes(action.payload.toLowerCase()) ||
            user?.agents?.some((agent) =>
              agent?.name?.toLowerCase().includes(action.payload.toLowerCase())
            )
          );
        }) || null;
    }),
    //#endregion Local Repository Streams
    //#region Async Thunks
    /**
     * Async Thunks are used to make API calls and handle the response.
     */
    //Local API
    fetchUsers: createRx.asyncThunk(async (_, thunkAPI) => {
      thunkAPI.dispatch(setLoading(true));
      thunkAPI.dispatch(setApiError(null));

      try {
        const response = await api.getUsers();
        if (!response) {
          thunkAPI.dispatch(setApiError("Failed to fetch users"));
          thunkAPI.dispatch(setLoading(false));
          throw new Error("Failed to fetch users");
        }
        thunkAPI.dispatch(setUsers(response));
        thunkAPI.dispatch(setLoading(false));
        return response;
      } catch (error: any) {
        thunkAPI.dispatch(
          setApiError(error?.message || "Failed to fetch users")
        );
        thunkAPI.dispatch(setLoading(false));

        return thunkAPI.rejectWithValue(error);
      }
    }),
    createUser: createRx.asyncThunk(async (form: PostUserRequest, thunkAPI) => {
      thunkAPI.dispatch(setLoading(true));
      thunkAPI.dispatch(setApiError(null));

      try {
        const response = await api.createUser(form);

        if (!response) {
          thunkAPI.dispatch(setApiError("Failed to create user"));
          thunkAPI.dispatch(setLoading(false));
          throw new Error("Failed to create user");
        }

        thunkAPI.dispatch(setLoading(false));
        thunkAPI.dispatch(closeCreateModal());
        return response;
      } catch (error: any) {
        thunkAPI.dispatch(
          setApiError(error?.message || "Failed to create user")
        );
        thunkAPI.dispatch(setLoading(false));
        return thunkAPI.rejectWithValue(error);
      }
    }),

    /***
     * Form States are used to manage the form state and errors.
     */
    setCreateUserForm: createRx.reducer(
      (state, action?: PayloadAction<PostUserRequest | null>) => {
        if (action) {
          state.createUserForm = action.payload;
          return;
        } else state.createUserForm = emptyCreateUserForm;
      }
    ),

    setCreateUserFormErrors: createRx.reducer(
      (state, action: PayloadAction<CreateUserFormErrors>) => {
        state.createUserFormErrors = action.payload;
      }
    ),

    setEditUserForm: createRx.reducer(
      (state, action: PayloadAction<PutUserRequest>) => {
        state.editUserForm = action.payload;
      }
    ),
    setEditUserFormErrors: createRx.reducer(
      (state, action: PayloadAction<EditUserFormErrors>) => {
        state.editUserFormErrors = action.payload;
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
    getScreenVM: (usersState) => usersState.screenVM,

    getUsers: (usersState) => usersState.user,
    queryUsers: (usersState) => usersState.usersQuery,
    getUser: (usersState) => usersState.user,

    getCreateUserForm: (usersState) => usersState.createUserForm,
    getCreateUserFormErrors: (usersState) => usersState.createUserFormErrors,
    getEditUserForm: (usersState) => usersState.editUserForm,
    getEditUserFormErrors: (usersState) => usersState.editUserFormErrors,

    getError: (usersState) => usersState.apiError,
    getLoading: (usersState) => usersState.loading,
  },
});

export const {
  setUsers,
  setUser,
  setApiError,
  setLoading,
  closeCreateModal,
  closeEditModal,
  openCreateModal,
  openEditModal,
  setUsersQuery,
  fetchUsers,
  createUser,
  setCreateUserForm,
  setCreateUserFormErrors,
  setEditUserForm,
  setEditUserFormErrors,
} = usersSlice.actions; //actions

export const {
  getUsers,
  getUser,
  queryUsers,
  getError,
  getLoading,
  getCreateUserForm,
  getCreateUserFormErrors,
  getEditUserForm,
  getEditUserFormErrors,
  getScreenVM,
} = usersSlice.selectors; //selectors

export default usersSlice.reducer;
