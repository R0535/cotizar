import { PayloadAction } from "@reduxjs/toolkit";

import {
  SectionsVM,
  CreateSectionFormErrors,
  EditSectionFormErrors,
} from "../models/SectionsVM";
import {
  GetSectionDto,
  GetSectionEnum,
  PostSectionRequest,
  PutSectionRequest,
} from "../models/Sections";
import { createSectionsSlice } from "./createSectionsSlice";
import { SectionsApi } from "@/lib/api/Sections/SectionsApi";

//make empty forms
const emptyCreateSectionForm: PostSectionRequest = {
  name: "",
  description: "",
};
const emptyCreateSectionFormErrors: CreateSectionFormErrors = {
  nameError: "",
};
const emptyEditSectionForm: PutSectionRequest = {
  id: 0,
  name: "",
  description: "",
};
const emptyEditSectionFormErrors: EditSectionFormErrors = {
  nameError: "",
};

//create api reference
const api: SectionsApi = new SectionsApi("/api");

interface SectionsState {
  screenVM: SectionsVM; //screen state

  sections: GetSectionDto[] | null; //from the **API**,
  sectionsEnum: GetSectionEnum[] | null; //from the **API**,
  sectionsQuery: GetSectionDto[] | null; //sections with queries and filters
  section: GetSectionDto | null; //selected section from the list

  createSectionForm: PostSectionRequest | null; //form state
  createSectionFormErrors: CreateSectionFormErrors | null; //form errors
  editSectionForm: PutSectionRequest | null; //form
  editSectionFormErrors: EditSectionFormErrors | null; //form errors

  apiError: string | null; //error message
  loading: boolean; //loading state
}
const initialState: SectionsState = {
  screenVM: {
    modalEditSectionOpen: false,
    modalCreateSectionOpen: false,
  },

  sections: null,
  sectionsEnum: null,
  sectionsQuery: null,
  section: null,

  createSectionForm: emptyCreateSectionForm,
  createSectionFormErrors: emptyCreateSectionFormErrors,
  editSectionForm: emptyEditSectionForm,
  editSectionFormErrors: emptyEditSectionFormErrors,

  apiError: null,
  loading: false,
};

const sectionsSlice = createSectionsSlice({
  name: "sections",
  initialState,
  reducers: (createRx) => ({
    //#region Form States
    //VM
    openEditModal: createRx.reducer(
      (state, action: PayloadAction<PutSectionRequest>) => {
        state.apiError = null;

        state.editSectionForm = action.payload;
        state.editSectionFormErrors = emptyEditSectionFormErrors;

        state.screenVM.modalEditSectionOpen = true;
      }
    ),
    closeEditModal: createRx.reducer((state) => {
      state.editSectionForm = emptyEditSectionForm;
      state.editSectionFormErrors = emptyEditSectionFormErrors;

      state.screenVM.modalEditSectionOpen = false;
    }),
    openCreateModal: createRx.reducer((state) => {
      state.apiError = null;

      state.createSectionForm = emptyCreateSectionForm;
      state.createSectionFormErrors = emptyCreateSectionFormErrors;

      state.screenVM.modalCreateSectionOpen = true;
    }),
    closeCreateModal: createRx.reducer((state) => {
      state.createSectionForm = emptyCreateSectionForm;
      state.createSectionFormErrors = emptyCreateSectionFormErrors;

      state.screenVM.modalCreateSectionOpen = false;
    }),
    //#endregion Form States
    //#region Local Repository Streams

    setSections: createRx.reducer(
      (state, action: PayloadAction<GetSectionDto[] | null>) => {
        state.sections = action.payload;
      }
    ),
    setSectionsEnum: createRx.reducer(
      (state, action: PayloadAction<GetSectionEnum[] | null>) => {
        state.sectionsEnum = action.payload;
      }
    ),
    setSection: createRx.reducer(
      (state, action: PayloadAction<GetSectionDto | null>) => {
        state.section = action.payload;
        state.editSectionForm = {
          id: action.payload?.id || 0,
          name: action.payload?.name || "",
          description: action.payload?.description || "",
        };
        state.editSectionFormErrors = emptyEditSectionFormErrors;
      }
    ),
    setSectionsQuery: createRx.reducer(
      (state, action: PayloadAction<string>) => {
        if (action.payload === "") {
          state.sectionsQuery = null;
          return;
        }
        state.sectionsQuery =
          state.sections?.filter((section: GetSectionDto) => {
            return (
              section.name
                .toLowerCase()
                .includes(action.payload.toLowerCase()) ||
              section.description
                .toLowerCase()
                .includes(action.payload.toLowerCase()) ||
              section.features.some(
                (feature) =>
                  feature.label
                    .toLowerCase()
                    .includes(action.payload.toLowerCase()) ||
                  feature.description
                    .toLowerCase()
                    .includes(action.payload.toLowerCase()) ||
                  feature.tags.some((tag) =>
                    tag.toLowerCase().includes(action.payload.toLowerCase())
                  )
              )
            );
          }) || null;
      }
    ),
    //#endregion Local Repository Streams
    //#region Async Thunks
    /**
     * Async Thunks are used to make API calls and handle the response.
     */
    //#region fetchSections
    fetchSections: createRx.asyncThunk(async (_, thunkAPI) => {
      thunkAPI.dispatch(setLoading(true));
      thunkAPI.dispatch(setApiError(null));

      try {
        const response = await api.getSections();
        if (!response) {
          thunkAPI.dispatch(setApiError("Failed to fetch sections"));
          thunkAPI.dispatch(setLoading(false));
          throw new Error("Failed to fetch sections");
        }
        thunkAPI.dispatch(setSections(response));
        thunkAPI.dispatch(setLoading(false));
        return response;
      } catch (error: any) {
        thunkAPI.dispatch(
          setApiError(error?.message || "Failed to fetch sections")
        );
        thunkAPI.dispatch(setLoading(false));

        return thunkAPI.rejectWithValue(error.message);
      }
    }),
    fetchSectionsEnum: createRx.asyncThunk(async (_, thunkAPI) => {
      thunkAPI.dispatch(setLoading(true));
      thunkAPI.dispatch(setApiError(null));

      try {
        const response = await api.getSectionsEnum();
        if (!response) {
          thunkAPI.dispatch(setApiError("Failed to fetch sections"));
          thunkAPI.dispatch(setLoading(false));
          throw new Error("Failed to fetch sections");
        }
        thunkAPI.dispatch(setSectionsEnum(response));
        thunkAPI.dispatch(setLoading(false));
        return response;
      } catch (error: any) {
        thunkAPI.dispatch(
          setApiError(error?.message || "Failed to fetch sections")
        );
        thunkAPI.dispatch(setLoading(false));

        return thunkAPI.rejectWithValue(error.message);
      }
    }),
    fetchSection: createRx.asyncThunk(async (id: number, thunkAPI) => {
      thunkAPI.dispatch(setLoading(true));
      thunkAPI.dispatch(setApiError(null));

      try {
        const response = await api.getSection(id);
        if (!response) {
          thunkAPI.dispatch(setApiError("Failed to fetch sections"));
          thunkAPI.dispatch(setLoading(false));
          throw new Error("Failed to fetch sections");
        }
        thunkAPI.dispatch(setSection(response));
        thunkAPI.dispatch(setLoading(false));
        return response;
      } catch (error: any) {
        thunkAPI.dispatch(
          setApiError(error?.message || "Failed to fetch sections")
        );
        thunkAPI.dispatch(setLoading(false));

        return thunkAPI.rejectWithValue(error.message);
      }
    }),
    //#endregion fetchSections
    //#region CRUD Operations
    createSection: createRx.asyncThunk(
      async (form: PostSectionRequest, thunkAPI) => {
        thunkAPI.dispatch(setLoading(true));
        thunkAPI.dispatch(setApiError(null));

        try {
          const response = await api.createSection(form);

          if (!response) {
            thunkAPI.dispatch(setApiError("Failed to create section"));
            thunkAPI.dispatch(setLoading(false));
            throw new Error("Failed to create section", response);
          }

          thunkAPI.dispatch(setLoading(false));
          return response;
        } catch (error: any) {
          thunkAPI.dispatch(
            setApiError(error?.message || "Failed to create section")
          );
          thunkAPI.dispatch(setLoading(false));
          return thunkAPI.rejectWithValue(error);
        }
      }
    ),
    updateSection: createRx.asyncThunk(
      async (form: PutSectionRequest, thunkAPI) => {
        thunkAPI.dispatch(setLoading(true));
        thunkAPI.dispatch(setApiError(null));

        try {
          const response = await api.updateSection(form.id.toString(), form);

          if (!response) {
            thunkAPI.dispatch(setApiError("Failed to create section"));
            thunkAPI.dispatch(setLoading(false));
            throw new Error("Failed to create section", response);
          }

          thunkAPI.dispatch(setLoading(false));
          return response;
        } catch (error: any) {
          thunkAPI.dispatch(
            setApiError(error?.message || "Failed to create section")
          );
          thunkAPI.dispatch(setLoading(false));
          return thunkAPI.rejectWithValue(error);
        }
      }
    ),

    //#endregion CRUD Operations
    //#endregion Async Thunks
    /***
     * Form States are used to manage the form state and errors.
     */
    setCreateSectionForm: createRx.reducer(
      (state, action?: PayloadAction<PostSectionRequest | null>) => {
        if (action) {
          state.createSectionForm = action.payload;
          return;
        } else state.createSectionForm = emptyCreateSectionForm;
      }
    ),

    setCreateSectionFormErrors: createRx.reducer(
      (state, action: PayloadAction<CreateSectionFormErrors>) => {
        state.createSectionFormErrors = action.payload;
      }
    ),

    setEditSectionForm: createRx.reducer(
      (state, action: PayloadAction<PutSectionRequest>) => {
        state.editSectionForm = action.payload;
      }
    ),
    setEditSectionFormErrors: createRx.reducer(
      (state, action: PayloadAction<EditSectionFormErrors>) => {
        state.editSectionFormErrors = action.payload;
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
    getScreenVM: (sectionsState) => sectionsState.screenVM,

    getSections: (sectionsState) => sectionsState.section,
    querySections: (sectionsState) => sectionsState.sectionsQuery,
    getSection: (sectionsState) => sectionsState.section,

    getCreateSectionForm: (sectionsState) => sectionsState.createSectionForm,
    getCreateSectionFormErrors: (sectionsState) =>
      sectionsState.createSectionFormErrors,
    getEditSectionForm: (sectionsState) => sectionsState.editSectionForm,
    getEditSectionFormErrors: (sectionsState) =>
      sectionsState.editSectionFormErrors,

    getError: (sectionsState) => sectionsState.apiError,
    getLoading: (sectionsState) => sectionsState.loading,
  },
});

export const {
  setSections,
  setSection,
  setSectionsEnum,
  setApiError,
  setLoading,
  closeCreateModal,
  closeEditModal,
  openCreateModal,
  openEditModal,
  setSectionsQuery,
  fetchSections,
  fetchSection,
  fetchSectionsEnum,
  updateSection,
  createSection,
  setCreateSectionForm,
  setCreateSectionFormErrors,
  setEditSectionForm,
  setEditSectionFormErrors,
} = sectionsSlice.actions; //actions

export const {
  getSections,
  getSection,
  querySections,
  getError,
  getLoading,
  getCreateSectionForm,
  getCreateSectionFormErrors,
  getEditSectionForm,
  getEditSectionFormErrors,
  getScreenVM,
} = sectionsSlice.selectors; //selectors

export default sectionsSlice.reducer;
