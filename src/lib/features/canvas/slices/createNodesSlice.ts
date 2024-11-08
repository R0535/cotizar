import { asyncThunkCreator, buildCreateSlice } from "@reduxjs/toolkit";

// `buildCreateSlice` allows us to create a slice with async thunks.
export const createNodesSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});
