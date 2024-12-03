import { PayloadAction } from "@reduxjs/toolkit";

import {
  FeaturesVM,
  CreateFeatureFormErrors,
  EditFeatureFormErrors,
} from "../models/FeaturesVM";
import {
  GetFeatureDto,
  PostFeatureRequest,
  PutFeatureRequest,
} from "../models/Features";
import { createFeaturesSlice } from "./createFeaturesSlice";
import { FeaturesApi } from "@/lib/api/Features/FeaturesApi";


//make empty forms
const emptyCreateFeatureForm: PostFeatureRequest = {
  label: "",
  description: "",
  color: "",
  timeBack: 0,
  timeFront: 0,
  tags: "",
  sectionId: 0,
  preview: "",


};
const emptyCreateFeatureFormErrors: CreateFeatureFormErrors = {
  nameError: "",
};
const emptyEditFeatureForm: PutFeatureRequest = {
  id: "",
  label: "",
  description: "",
  color: "",
  timeBack: 0,
  timeFront: 0,
  tags: "",
  sectionId: 0,
  preview: "",
};
const emptyEditFeatureFormErrors: EditFeatureFormErrors = {
  nameError: "",
};

//create api reference
const api: FeaturesApi = new FeaturesApi("/api");

interface FeaturesState {
  screenVM: FeaturesVM; //screen state

  features: GetFeatureDto[] | null; //from the **API**,
  featuresQuery: GetFeatureDto[] | null; //features with queries and filters
  feature: GetFeatureDto | null; //selected feature from the list

  createFeatureForm: PostFeatureRequest | null; //form state
  createFeatureFormErrors: CreateFeatureFormErrors | null; //form errors
  editFeatureForm: PutFeatureRequest | null; //form
  editFeatureFormErrors: EditFeatureFormErrors | null; //form errors

  apiError: string | null; //error message
  loading: boolean; //loading state
}
const initialState: FeaturesState = {
  screenVM: {
    modalEditFeatureOpen: false,
    modalCreateFeatureOpen: false,
  },

  features: null,
  featuresQuery: null,
  feature: null,

  createFeatureForm: emptyCreateFeatureForm,
  createFeatureFormErrors: emptyCreateFeatureFormErrors,
  editFeatureForm: emptyEditFeatureForm,
  editFeatureFormErrors: emptyEditFeatureFormErrors,

  apiError: null,
  loading: false,
};

const featuresSlice = createFeaturesSlice({
  name: "features",
  initialState,
  reducers: (createRx) => ({
    //#region Form States
    //VM
    
    openEditModal: createRx.reducer(
      (state, action: PayloadAction<PutFeatureRequest>) => {
        state.apiError = null;

        state.editFeatureForm = action.payload;
        state.editFeatureFormErrors = emptyEditFeatureFormErrors;

        state.screenVM.modalEditFeatureOpen = true;
      }
    ),
    handleClear: createRx.reducer((state) => {
      state.feature = null;

      state.editFeatureForm = null;
      state.editFeatureFormErrors = null;

      state.createFeatureForm = null;
      state.createFeatureFormErrors = null;

      state.apiError = null;
      state.loading = false;
    }),
    handleEdit : createRx.reducer((state, action: PayloadAction<GetFeatureDto>) => {
      state.feature = action.payload;
      state.editFeatureForm = {
        id: action.payload.id,
        label: action.payload.label,
        description: action.payload.description,
        color: action.payload.color,
        timeBack: action.payload.timeBack,
        timeFront: action.payload.timeFront,
        tags: action.payload.tags,
        sectionId: action.payload.sectionId,
        preview: action.payload.previews,
      };
      state.editFeatureFormErrors = emptyEditFeatureFormErrors;
    }),
    handleClearEdit: createRx.reducer((state) => {
      state.editFeatureForm = emptyEditFeatureForm;
      state.editFeatureFormErrors = emptyEditFeatureFormErrors;
    }),
    closeEditModal: createRx.reducer((state) => {
      state.editFeatureForm = emptyEditFeatureForm;
      state.editFeatureFormErrors = emptyEditFeatureFormErrors;

      state.screenVM.modalEditFeatureOpen = false;
    }),
    openCreateModal: createRx.reducer((state) => {
      state.apiError = null;

      state.createFeatureForm = emptyCreateFeatureForm;
      state.createFeatureFormErrors = emptyCreateFeatureFormErrors;

      state.screenVM.modalCreateFeatureOpen = true;
    }),
    closeCreateModal: createRx.reducer((state) => {
      state.createFeatureForm = emptyCreateFeatureForm;
      state.createFeatureFormErrors = emptyCreateFeatureFormErrors;

      state.screenVM.modalCreateFeatureOpen = false;
    }),
    //#endregion Form States
    //#region Local Repository Streams

    setFeatures: createRx.reducer(
      (state, action: PayloadAction<GetFeatureDto[] | null>) => {
        state.features = action.payload;
      }
    ),
    setFeature: createRx.reducer(
      (state, action: PayloadAction<GetFeatureDto | null>) => {
        state.feature = action.payload;
        state.editFeatureForm = {
          id: action.payload?.id || "",
          label: action.payload?.label || "",
          description: action.payload?.description || "",
          color: action.payload?.color || "",
          timeBack: action.payload?.timeBack || 0,
          timeFront: action.payload?.timeFront || 0,
          tags: action.payload?.tags || "",
          sectionId: action.payload?.sectionId || 0,
          preview: action.payload?.previews || "",

        };
        state.editFeatureFormErrors = emptyEditFeatureFormErrors;
      }
    ),
    setFeaturesQuery: createRx.reducer(
      (state, action: PayloadAction<string>) => {
        if (action.payload === "") {
          state.featuresQuery = null;
          return;
        }
        state.featuresQuery =
          state.features?.filter((feature: GetFeatureDto) => {
            return (
              feature.label
                .toLowerCase()
                .includes(action.payload.toLowerCase()) ||
              feature.description
                .toLowerCase()
                .includes(action.payload.toLowerCase()) ||
              feature.features.some(
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
    //Local API
    // fetchFeatures: createRx.asyncThunk(async (_, thunkAPI) => {
    //   thunkAPI.dispatch(setLoading(true));
    //   thunkAPI.dispatch(setApiError(null));
    //   try {
    //     const response = await new Promise<GetFeatureDto[]>((resolve) => {
    //       setTimeout(() => {
    //         resolve(features);
    //       }, 2000);
    //     });

    //     if (!response) {
    //       thunkAPI.dispatch(setApiError("Failed to fetch features"));
    //       thunkAPI.dispatch(setLoading(false));
    //       throw new Error("Failed to fetch features");
    //     }
    //     thunkAPI.dispatch(setFeatures(response));
    //     thunkAPI.dispatch(setLoading(false));
    //     return response;
    //   } catch (error) {
    //     console.error(error);
    //   }
    // }),
    fetchFeatures: createRx.asyncThunk(async (_, thunkAPI) => {

      thunkAPI.dispatch(setLoading(true));
      thunkAPI.dispatch(setApiError(null));

      try {
        const response = await api.getFeatures();
        if (!response) {
          thunkAPI.dispatch(setApiError("Failed to fetch features"));
          thunkAPI.dispatch(setLoading(false));
          throw new Error("Failed to fetch features");
        }
        thunkAPI.dispatch(setFeatures(response));
        thunkAPI.dispatch(setLoading(false));
        return response;
      } catch (error : any) {

        thunkAPI.dispatch(setApiError(error?.message || "Failed to fetch features"));
        thunkAPI.dispatch(setLoading(false));

        return thunkAPI.rejectWithValue(error.message);
      }
    }),
    fetchFeature: createRx.asyncThunk(async (id:string, thunkAPI) => {

      thunkAPI.dispatch(setLoading(true));
      thunkAPI.dispatch(setApiError(null));

      try {
        const response = await api.getFeature(id);
        if (!response) {
          thunkAPI.dispatch(setApiError("Failed to fetch features"));
          thunkAPI.dispatch(setLoading(false));
          throw new Error("Failed to fetch features");
        }
        thunkAPI.dispatch(setFeature(response));
        thunkAPI.dispatch(setLoading(false));
        return response;
      } catch (error : any) {

        thunkAPI.dispatch(setApiError(error?.message || "Failed to fetch features"));
        thunkAPI.dispatch(setLoading(false));

        return thunkAPI.rejectWithValue(error.message);
      }
    }),
    createFeature: createRx.asyncThunk(
      async (form: FormData, thunkAPI) => {
        thunkAPI.dispatch(setLoading(true));
        thunkAPI.dispatch(setApiError(null));

        try {
          const response = await api.createFeature(form);

          if (!response) {
            thunkAPI.dispatch(setApiError("Failed to create feature"));
            thunkAPI.dispatch(setLoading(false));
            throw new Error("Failed to create feature", response);
          }

          thunkAPI.dispatch(setLoading(false));
          return response;
        } catch (error: any) {
          thunkAPI.dispatch(
            setApiError(error?.message || "Failed to create feature")
          );
          thunkAPI.dispatch(setLoading(false));
          return thunkAPI.rejectWithValue(error);
        }
      }
    ),
    updateFeature: createRx.asyncThunk(
      async ( form: FormData, thunkAPI) => {
        thunkAPI.dispatch(setLoading(true));
        thunkAPI.dispatch(setApiError(null));

        try {
          const response = await api.updateFeature(
            form.get("id") as string,
            form
          );

          if (!response) {
            thunkAPI.dispatch(setApiError("Failed to create feature"));
            thunkAPI.dispatch(setLoading(false));
            throw new Error("Failed to create feature", response);
          }

          thunkAPI.dispatch(setLoading(false));
          return response;
        } catch (error: any) {
          thunkAPI.dispatch(
            setApiError(error?.message || "Failed to create feature")
          );
          thunkAPI.dispatch(setLoading(false));
          return thunkAPI.rejectWithValue(error);
        }
      }
    ),

    //#endregion
    /***
     * Form States are used to manage the form state and errors.
     */
    setCreateFeatureForm: createRx.reducer(
      (state, action?: PayloadAction<PostFeatureRequest | null>) => {
        if (action) {
          state.createFeatureForm = action.payload;
          return;
        } else state.createFeatureForm = emptyCreateFeatureForm;
      }
    ),

    setCreateFeatureFormErrors: createRx.reducer(
      (state, action: PayloadAction<CreateFeatureFormErrors>) => {
        state.createFeatureFormErrors = action.payload;
      }
    ),

    setEditFeatureForm: createRx.reducer(
      (state, action: PayloadAction<PutFeatureRequest>) => {
        state.editFeatureForm = action.payload;
      }
    ),
    setEditFeatureFormErrors: createRx.reducer(
      (state, action: PayloadAction<EditFeatureFormErrors>) => {
        state.editFeatureFormErrors = action.payload;
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
    getScreenVM: (featuresState) => featuresState.screenVM,

    getFeatures: (featuresState) => featuresState.feature,
    queryFeatures: (featuresState) => featuresState.featuresQuery,
    getFeature: (featuresState) => featuresState.feature,

    getCreateFeatureForm: (featuresState) => featuresState.createFeatureForm,
    getCreateFeatureFormErrors: (featuresState) =>
      featuresState.createFeatureFormErrors,
    getEditFeatureForm: (featuresState) => featuresState.editFeatureForm,
    getEditFeatureFormErrors: (featuresState) =>
      featuresState.editFeatureFormErrors,

    getError: (featuresState) => featuresState.apiError,
    getLoading: (featuresState) => featuresState.loading,
  },
});

export const {
  handleClear,
  setFeatures,
  setFeature,
  setApiError,
  setLoading,
  closeCreateModal,
  closeEditModal,
  openCreateModal,
  openEditModal,
  setFeaturesQuery,
  fetchFeatures,
  fetchFeature,
  updateFeature,
  createFeature,
  setCreateFeatureForm,
  setCreateFeatureFormErrors,
  setEditFeatureForm,
  setEditFeatureFormErrors,
} = featuresSlice.actions; //actions

export const {
  getFeatures,
  getFeature,
  queryFeatures,
  getError,
  getLoading,
  getCreateFeatureForm,
  getCreateFeatureFormErrors,
  getEditFeatureForm,
  getEditFeatureFormErrors,
  getScreenVM,
} = featuresSlice.selectors; //selectors

export default featuresSlice.reducer;
