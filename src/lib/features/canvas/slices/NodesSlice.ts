import { PayloadAction } from "@reduxjs/toolkit";

import {
  CreateFeatureFormErrors,
  EditFeatureFormErrors,
  GetFeatureDto,
  PostFeatureRequest,
  PutFeatureRequest,
} from "../models/Features";
import { createNodesSlice } from "./createNodesSlice";

import { FeaturesApi } from "@/lib/api/Features/FeaturesApi";
import { CustomProperty, FeatureCardVM } from "../models/CanvasVM";
import { type Node, type Edge } from "@xyflow/react";
import { ColorNodeData } from "@/app/canvas/models/ColorNodes";
import { create } from "domain";

//#region Empty Form States
//make empty forms
const emptyCreateFeatureForm: FeatureCardVM = {
  id: "",
  label: "",
  description: "",
  time: 0,
  dependencies: [],
  customProperties: [],
  changeColor: () => {},
  section: "",
  color: "#9B2828",
};
const emptyCreateFeatureFormErrors: CreateFeatureFormErrors = {
  labelError: "",
  sectionError: "",
  descriptionError: "",
  timeError: "",
  dependenciesError: "",
};

const emptyEditFeatureFormErrors: EditFeatureFormErrors = {
  idError: "",
  nameError: "",
  emailError: "",
  activeError: "",
  codeError: "",
  deletedError: "",
  agentIdError: "",
  sectionError: "",
};

const initialNodes: Node[] = [
  {
    id: "1",
    data: {
      id: "node-1",
      label: "Node 1",
      time: "2",
      section: "Agents",
      description: "Just a desc",
      dependencies: ["node-2"],
      color: "#287E9B",
      customProperties: [{ key: "prop1", value: "value1" }] as CustomProperty[],
    },

    type: "colorNode",
    position: { x: 5, y: 5 },
  },
  {
    id: "2",
    data: {
      id: "node-2",
      label: "Node 2",
      time: "3",
      section: "Agents",
      description: "Just a desc",
      dependencies: ["node-1"],
      color: "#287E9B",
      customProperties: [{ key: "prop1", value: "value1" }] as CustomProperty[],
    },
    type: "colorNode",
    position: { x: 5, y: 100 },
  },
];
const initialEdges: Edge[] = [{ id: "e1-2", source: "1", target: "2" }];

//#endregion

//create api reference
const api: FeaturesApi = new FeaturesApi("/api");

interface FeaturesState {
  nodes: Node[];
  edges: Edge[] | null;

  featuresQuery: FeatureCardVM[] | null; //features with queries and filters
  features: FeatureCardVM[] | null; //from the **API**,
  feature: FeatureCardVM | null; //selected feature from the list

  createFeatureForm: FeatureCardVM | null; //form state
  createFeatureFormErrors: CreateFeatureFormErrors | null; //form errors
  editFeatureForm: FeatureCardVM | null; //form
  editFeatureFormErrors: EditFeatureFormErrors | null; //form errors

  apiError: string | null; //error message
  loading: boolean; //loading state
}
const initialState: FeaturesState = {
  nodes: initialNodes,
  edges: [],

  features: null,
  featuresQuery: null,
  feature: null,

  createFeatureForm: null,
  createFeatureFormErrors: null,
  editFeatureForm: null,
  editFeatureFormErrors: null,

  apiError: null,
  loading: false,
};

const nodesSlice = createNodesSlice({
  name: "nodes",
  initialState,
  reducers: (createRx) => ({
    //#region handlers form states
    //VM

    //#endregion handlers form states

    //#region Local Repository Streams

    //NODES AND EDGES
    setNodesVM: createRx.reducer((state, action: PayloadAction<Node[]>) => {
      state.nodes = action.payload;
    }),
    updateNode: createRx.reducer((state, action: PayloadAction<Node>) => {
      // Eliminar el nodo antiguo si existe
      const nodeIndex = state.nodes.findIndex(
        (node) => node.data.id === action.payload.data.id
      );

      if (nodeIndex !== -1) {
        state.nodes[nodeIndex] = action.payload;
      }
    }),
    handleClear: createRx.reducer((state) => {
      state.feature = null;

      state.editFeatureForm = null;
      state.editFeatureFormErrors = null;

      state.createFeatureForm = null;
      state.createFeatureFormErrors = null;

      state.apiError = null;
      state.loading = false;
    }),
    handleEdit: createRx.reducer(
      (state, action: PayloadAction<FeatureCardVM>) => {
        state.feature = action.payload;
        state.editFeatureForm = {
          id: action.payload.id,
          label: action.payload.label,
          description: action.payload.description,
          time: action.payload.time,
          dependencies: action.payload.dependencies,
          customProperties: action.payload.customProperties,
          color: action.payload.color,
          changeColor: action.payload.changeColor,
          section: action.payload.section,
        };
        state.editFeatureFormErrors = emptyEditFeatureFormErrors;
      }
    ),
    handleCreate: createRx.reducer((state) => {
      state.createFeatureForm = emptyCreateFeatureForm;
      state.createFeatureFormErrors = emptyCreateFeatureFormErrors;
    }),
    addNode: createRx.reducer((state, action: PayloadAction<Node>) => {
      state.nodes.push(action.payload);
    }),
    addFeature: createRx.reducer(
      (state, action: PayloadAction<FeatureCardVM>) => {
        state.features?.push(action.payload);
      }
    ),
    updateFeature: createRx.reducer(
      (state, action: PayloadAction<FeatureCardVM>) => {
        const index = state.features?.findIndex(
          (feature) => feature.id === action.payload.id
        );
        if (index !== -1) {
          //state.features[index] = action.payload;
        }
      }
    ),
    addEdge: createRx.reducer((state, action: PayloadAction<Edge>) => {
      state.edges?.push(action.payload);
    }),

    setFeatures: createRx.reducer(
      (state, action: PayloadAction<FeatureCardVM[] | null>) => {
        state.features = action.payload;
      }
    ),

    setFeature: createRx.reducer(
      (state, action: PayloadAction<FeatureCardVM | null>) => {
        state.feature = action.payload;
        state.editFeatureForm = {
          id: action.payload?.id || "",
          section: action.payload?.section || "",
          label: action.payload?.label || "",
          description: action.payload?.description || "",
          time: action.payload?.time || 0,
          dependencies: action.payload?.dependencies || [],
          customProperties: action.payload?.customProperties || [],
          color: action.payload?.color || "",
          changeColor: action.payload?.changeColor || (() => {}),
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
          state.features?.filter((feature: FeatureCardVM) => {
            return (
              feature?.label
                ?.toLowerCase()
                .includes(action.payload.toLowerCase()) ||
              feature?.description
                ?.toLowerCase()
                .includes(action.payload.toLowerCase())
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
      } catch (error: any) {
        thunkAPI.dispatch(
          setApiError(error?.message || "Failed to fetch features")
        );
        thunkAPI.dispatch(setLoading(false));

        return thunkAPI.rejectWithValue(error);
      }
    }),
    createFeature: createRx.asyncThunk(
      async (form: PostFeatureRequest, thunkAPI) => {
        thunkAPI.dispatch(setLoading(true));
        thunkAPI.dispatch(setApiError(null));

        try {
          const response = await api.createFeature(form);

          if (!response) {
            thunkAPI.dispatch(setApiError("Failed to create feature"));
            thunkAPI.dispatch(setLoading(false));
            throw new Error("Failed to create feature");
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

    /***
     * Form States are used to manage the form state and errors.
     */
    setCreateFeatureForm: createRx.reducer(
      (state, action?: PayloadAction<FeatureCardVM | null>) => {
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
      (state, action: PayloadAction<FeatureCardVM>) => {
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

    getNodes: (featuresState) => featuresState.nodes,
    getEdges: (featuresState) => featuresState.edges,
  },
});

export const {
  setFeatures,
  setFeature,
  setApiError,
  setLoading,

  handleClear,
  handleCreate,

  handleEdit,
  setFeaturesQuery,
  fetchFeatures,
  createFeature,
  setCreateFeatureForm,
  setCreateFeatureFormErrors,
  setEditFeatureForm,
  setEditFeatureFormErrors,
  addFeature,
  updateFeature,
  addNode,
  updateNode,
  setNodesVM,
} = nodesSlice.actions; //actions

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
  getNodes,
  getEdges,
} = nodesSlice.selectors; //selectors

export default nodesSlice.reducer;
