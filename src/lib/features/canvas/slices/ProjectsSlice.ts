import { PayloadAction } from "@reduxjs/toolkit";

import {
  CreateProjectFormErrors,
  GetProjectDto,
  PostProjectRequest,
} from "../models/Projects";
import { createProjectsSlice } from "./createProjectsSlice";

import { FeatureCardVM, ProjectVM } from "../models/CanvasVM";
import { ProjectsApi } from "@/lib/api/Projects/ProjectsApi";
import { type Node, type Edge } from "@xyflow/react";
import { ColorNodeData } from "@/app/canvas/models/ColorNodes";
import { create } from "domain";

function generateProjectName(): string {
  const petNames = ["Buddy", "Max", "Bella", "Charlie", "Molly"];
  const colors = ["Red", "Blue", "Green", "Yellow", "Purple"];
  const sizes = ["001", "002", "003", "004", "005"];

  const randomPetName = petNames[Math.floor(Math.random() * petNames.length)];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  const randomSize = sizes[Math.floor(Math.random() * sizes.length)];

  //return the random values as 1 string
  return "Project " + randomPetName + " " + randomColor + " " + randomSize;
}
function generateProjectId(): string {
  return Math.random().toString(36).substr(2, 9);
}
//#region Empty Form States
//make empty forms
const emptyCreateProjectForm: { id: string; nodes: Node[] } = {
  id: generateProjectName(),
  nodes: [],
};

//#endregion

//create api reference
const api: ProjectsApi = new ProjectsApi("/api");

interface ProjectsState {
  nodes: Node[];
  edges: Edge[] | null;

  projectsQuery: ProjectVM[] | null; //projects with queries and filters
  projects: ProjectVM[] | null; //from the **API**,
  project: ProjectVM | null; //selected project from the list

  createProjectForm: ProjectVM | null; //form state

  apiError: string | null; //error message
  loading: boolean; //loading state
}
const initialState: ProjectsState = {
  nodes: [],
  edges: [],

  projects: null,
  projectsQuery: null,
  project: {
    id: generateProjectId(),
    name: generateProjectName(),
    date: new Date().toISOString(),
    nodes: [],
  },

  createProjectForm: {
    id: generateProjectId(),
    nodes: [],
    date: new Date().toISOString(),
    name: generateProjectName(),
  },

  apiError: null,
  loading: false,
};

const projectsSlice = createProjectsSlice({
  name: "projects",
  initialState,
  reducers: (createRx) => ({
    //#region handlers form states
    //VM

    changeProjectName: createRx.reducer(
      (state, action: PayloadAction<string>) => {
        state.apiError = null;
        state.createProjectForm = null;
        if (state.project) state.project.name = action.payload;
      }
    ),

    //#endregion handlers form states

    //#region Local Repository Streams
    setProjects: createRx.reducer(
      (state, action: PayloadAction<ProjectVM[]>) => {
        state.projects = action.payload;
      }
    ),

    setProject: createRx.reducer(
      (state, action: PayloadAction<ProjectVM | null>) => {
        state.project = action.payload;
      }
    ),
    dropProject: createRx.reducer((state) => {
      state.project = null;
    }),
    //#endregion Local Repository Streams

    //#region Async Thunks

    fetchProjects: createRx.asyncThunk(async (_, thunkAPI) => {
      thunkAPI.dispatch(setLoading(true));
      thunkAPI.dispatch(setApiError(null));

      try {
        const response = await api.getProjects();
        if (!response) {
          thunkAPI.dispatch(setApiError("Failed to fetch projects"));
          thunkAPI.dispatch(setLoading(false));
          throw new Error("Failed to fetch projects");
        }
        thunkAPI.dispatch(setProjects(response));
        thunkAPI.dispatch(setLoading(false));
        return response;
      } catch (error: any) {
        thunkAPI.dispatch(
          setApiError(error?.message || "Failed to fetch projects")
        );
        thunkAPI.dispatch(setLoading(false));

        return thunkAPI.rejectWithValue(error);
      }
    }),
    createProject: createRx.asyncThunk(
      async (form: PostProjectRequest, thunkAPI) => {
        thunkAPI.dispatch(setLoading(true));
        thunkAPI.dispatch(setApiError(null));

        try {
          const response = await api.createProject(form);

          if (!response) {
            thunkAPI.dispatch(setApiError("Failed to create project"));
            thunkAPI.dispatch(setLoading(false));
            throw new Error("Failed to create project");
          }

          thunkAPI.dispatch(setLoading(false));
          return response;
        } catch (error: any) {
          thunkAPI.dispatch(
            setApiError(error?.message || "Failed to create project")
          );
          thunkAPI.dispatch(setLoading(false));
          return thunkAPI.rejectWithValue(error);
        }
      }
    ),

    //#endregion Async Thunks
    /***
     * Form States are used to manage the form state and errors.
     */
    setCreateProjectForm: createRx.reducer(
      (state, action?: PayloadAction<string>) => {
        if (action) {
          state.createProjectForm = {
            id: generateProjectId(),
            nodes: [],
            date: new Date().toISOString(),
            name: action.payload,
          };
        }
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
    getProjects: (projectsState) => projectsState.project,
    queryProjects: (projectsState) => projectsState.projectsQuery,
    getProject: (projectsState) => projectsState.project,

    getCreateProjectForm: (projectsState) => projectsState.createProjectForm,

    getError: (projectsState) => projectsState.apiError,
    getLoading: (projectsState) => projectsState.loading,

    getNodes: (projectsState) => projectsState.nodes,
    getEdges: (projectsState) => projectsState.edges,
  },
});

export const {
  setProjects,
  setProject,
  dropProject,
  changeProjectName,

  setApiError,
  setLoading,

  fetchProjects,
  createProject,
  setCreateProjectForm,
} = projectsSlice.actions; //actions

export const {
  getProjects,
  getProject,
  queryProjects,
  getError,
  getLoading,
  getCreateProjectForm,
  getNodes,
  getEdges,
} = projectsSlice.selectors; //selectors

export default projectsSlice.reducer;
