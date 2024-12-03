import { PayloadAction } from "@reduxjs/toolkit";

import {
  ProjectsVM,
  CreateProjectFormErrors,
  EditProjectFormErrors,
} from "../models/ProjectsVM";
import {
  GetProjectDto,
  PostProjectRequest,
  PutProjectRequest,
} from "../models/Projects";
import { createProjectsSlice } from "./createProjectsSlice";
import { ProjectsApi } from "@/lib/api/Projects/ProjectsApi";


//make empty forms
const emptyCreateProjectForm: PostProjectRequest = {
  name: "",
  description: "",
  logo: "",
  previews: "",
  createdAt: "",
  createdBy: "",
};
const emptyCreateProjectFormErrors: CreateProjectFormErrors = {
  nameError: "",
};
const emptyEditProjectForm: PutProjectRequest = {
  id: "",
  name: "",
  description: "",
  logo: "",
  previews: "",

};
const emptyEditProjectFormErrors: EditProjectFormErrors = {
  nameError: "",
};

//create api reference
const api: ProjectsApi = new ProjectsApi("/api/projects");

interface ProjectsState {
  screenVM: ProjectsVM; //screen state

  projects: GetProjectDto[] | null; //from the **API**,
  projectsQuery: GetProjectDto[] | null; //projects with queries and filters
  project: GetProjectDto | null; //selected project from the list

  createProjectForm: PostProjectRequest | null; //form state
  createProjectFormErrors: CreateProjectFormErrors | null; //form errors
  editProjectForm: PutProjectRequest | null; //form
  editProjectFormErrors: EditProjectFormErrors | null; //form errors

  apiError: string | null; //error message
  loading: boolean; //loading state
}
const initialState: ProjectsState = {
  screenVM: {
    modalEditProjectOpen: false,
    modalCreateProjectOpen: false,
  },

  projects: null,
  projectsQuery: null,
  project: null,

  createProjectForm: emptyCreateProjectForm,
  createProjectFormErrors: emptyCreateProjectFormErrors,
  editProjectForm: emptyEditProjectForm,
  editProjectFormErrors: emptyEditProjectFormErrors,

  apiError: null,
  loading: false,
};

const projectsSlice = createProjectsSlice({
  name: "projects",
  initialState,
  reducers: (createRx) => ({
    //#region Form States
    //VM
    
    openEditModal: createRx.reducer(
      (state, action: PayloadAction<PutProjectRequest>) => {
        state.apiError = null;

        state.editProjectForm = action.payload;
        state.editProjectFormErrors = emptyEditProjectFormErrors;

        state.screenVM.modalEditProjectOpen = true;
      }
    ),
    handleClear: createRx.reducer((state) => {
      state.project = null;

      state.editProjectForm = null;
      state.editProjectFormErrors = null;

      state.createProjectForm = null;
      state.createProjectFormErrors = null;

      state.apiError = null;
      state.loading = false;
    }),
    handleEdit : createRx.reducer((state, action: PayloadAction<GetProjectDto>) => {
      state.project = action.payload;
      state.editProjectForm = {
        id: action.payload.id,
        name: action.payload.name,
        description: action.payload.description,
        logo: action.payload.logo,
        previews: action.payload.previews,
      };
      state.editProjectFormErrors = emptyEditProjectFormErrors;
    }),
    handleClearEdit: createRx.reducer((state) => {
      state.editProjectForm = emptyEditProjectForm;
      state.editProjectFormErrors = emptyEditProjectFormErrors;
    }),
    closeEditModal: createRx.reducer((state) => {
      state.editProjectForm = emptyEditProjectForm;
      state.editProjectFormErrors = emptyEditProjectFormErrors;

      state.screenVM.modalEditProjectOpen = false;
    }),
    openCreateModal: createRx.reducer((state) => {
      state.apiError = null;

      state.createProjectForm = emptyCreateProjectForm;
      state.createProjectFormErrors = emptyCreateProjectFormErrors;

      state.screenVM.modalCreateProjectOpen = true;
    }),
    closeCreateModal: createRx.reducer((state) => {
      state.createProjectForm = emptyCreateProjectForm;
      state.createProjectFormErrors = emptyCreateProjectFormErrors;

      state.screenVM.modalCreateProjectOpen = false;
    }),
    //#endregion Form States
    //#region Local Repository Streams

    setProjects: createRx.reducer(
      (state, action: PayloadAction<GetProjectDto[] | null>) => {
        state.projects = action.payload;
      }
    ),
    setProject: createRx.reducer(
      (state, action: PayloadAction<GetProjectDto | null>) => {
        state.project = action.payload;
        state.editProjectForm = {
          id: action.payload?.id || "",
          name: action.payload?.name || "",
          description: action.payload?.description || "",
          logo: action.payload?.logo || "",
          previews: action.payload?.previews || "",

        };
        state.editProjectFormErrors = emptyEditProjectFormErrors;
      }
    ),
    setProjectsQuery: createRx.reducer(
      (state, action: PayloadAction<string>) => {
        if (action.payload === "") {
          state.projectsQuery = null;
          return;
        }
        state.projectsQuery =
          state.projects?.filter((project: GetProjectDto) => {
            return (
              project.name
                .toLowerCase()
                .includes(action.payload.toLowerCase()) ||
              project.description
                .toLowerCase()
                .includes(action.payload.toLowerCase()) ||
              project.createdBy.toLowerCase().includes(action.payload.toLowerCase()
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
    // fetchProjects: createRx.asyncThunk(async (_, thunkAPI) => {
    //   thunkAPI.dispatch(setLoading(true));
    //   thunkAPI.dispatch(setApiError(null));
    //   try {
    //     const response = await new Promise<GetProjectDto[]>((resolve) => {
    //       setTimeout(() => {
    //         resolve(projects);
    //       }, 2000);
    //     });

    //     if (!response) {
    //       thunkAPI.dispatch(setApiError("Failed to fetch projects"));
    //       thunkAPI.dispatch(setLoading(false));
    //       throw new Error("Failed to fetch projects");
    //     }
    //     thunkAPI.dispatch(setProjects(response));
    //     thunkAPI.dispatch(setLoading(false));
    //     return response;
    //   } catch (error) {
    //     console.error(error);
    //   }
    // }),
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
      } catch (error : any) {

        thunkAPI.dispatch(setApiError(error?.message || "Failed to fetch projects"));
        thunkAPI.dispatch(setLoading(false));

        return thunkAPI.rejectWithValue(error.message);
      }
    }),
    fetchProject: createRx.asyncThunk(async (id:string, thunkAPI) => {

      thunkAPI.dispatch(setLoading(true));
      thunkAPI.dispatch(setApiError(null));

      try {
        const response = await api.getProject(id);
        if (!response) {
          thunkAPI.dispatch(setApiError("Failed to fetch projects"));
          thunkAPI.dispatch(setLoading(false));
          throw new Error("Failed to fetch projects");
        }
        thunkAPI.dispatch(setProject(response));
        thunkAPI.dispatch(setLoading(false));
        return response;
      } catch (error : any) {

        thunkAPI.dispatch(setApiError(error?.message || "Failed to fetch projects"));
        thunkAPI.dispatch(setLoading(false));

        return thunkAPI.rejectWithValue(error.message);
      }
    }),
    createProject: createRx.asyncThunk(
      async (form: FormData, thunkAPI) => {
        thunkAPI.dispatch(setLoading(true));
        thunkAPI.dispatch(setApiError(null));

        try {
          const response = await api.createProject(form);

          if (!response) {
            thunkAPI.dispatch(setApiError("Failed to create project"));
            thunkAPI.dispatch(setLoading(false));
            throw new Error("Failed to create project", response);
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
    updateProject: createRx.asyncThunk(
      async ( form: FormData, thunkAPI) => {
        thunkAPI.dispatch(setLoading(true));
        thunkAPI.dispatch(setApiError(null));

        try {
          const response = await api.updateProject(
            form.get("id") as string,
            form
          );

          if (!response) {
            thunkAPI.dispatch(setApiError("Failed to create project"));
            thunkAPI.dispatch(setLoading(false));
            throw new Error("Failed to create project", response);
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

    //#endregion
    /***
     * Form States are used to manage the form state and errors.
     */
    setCreateProjectForm: createRx.reducer(
      (state, action?: PayloadAction<PostProjectRequest | null>) => {
        if (action) {
          state.createProjectForm = action.payload;
          return;
        } else state.createProjectForm = emptyCreateProjectForm;
      }
    ),

    setCreateProjectFormErrors: createRx.reducer(
      (state, action: PayloadAction<CreateProjectFormErrors>) => {
        state.createProjectFormErrors = action.payload;
      }
    ),

    setEditProjectForm: createRx.reducer(
      (state, action: PayloadAction<PutProjectRequest>) => {
        state.editProjectForm = action.payload;
      }
    ),
    setEditProjectFormErrors: createRx.reducer(
      (state, action: PayloadAction<EditProjectFormErrors>) => {
        state.editProjectFormErrors = action.payload;
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
    getScreenVM: (projectsState) => projectsState.screenVM,

    getProjects: (projectsState) => projectsState.project,
    queryProjects: (projectsState) => projectsState.projectsQuery,
    getProject: (projectsState) => projectsState.project,

    getCreateProjectForm: (projectsState) => projectsState.createProjectForm,
    getCreateProjectFormErrors: (projectsState) =>
      projectsState.createProjectFormErrors,
    getEditProjectForm: (projectsState) => projectsState.editProjectForm,
    getEditProjectFormErrors: (projectsState) =>
      projectsState.editProjectFormErrors,

    getError: (projectsState) => projectsState.apiError,
    getLoading: (projectsState) => projectsState.loading,
  },
});

export const {
  handleClear,
  setProjects,
  setProject,
  setApiError,
  setLoading,
  closeCreateModal,
  closeEditModal,
  openCreateModal,
  openEditModal,
  setProjectsQuery,
  fetchProjects,
  fetchProject,
  updateProject,
  createProject,
  setCreateProjectForm,
  setCreateProjectFormErrors,
  setEditProjectForm,
  setEditProjectFormErrors,
} = projectsSlice.actions; //actions

export const {
  getProjects,
  getProject,
  queryProjects,
  getError,
  getLoading,
  getCreateProjectForm,
  getCreateProjectFormErrors,
  getEditProjectForm,
  getEditProjectFormErrors,
  getScreenVM,
} = projectsSlice.selectors; //selectors

export default projectsSlice.reducer;
