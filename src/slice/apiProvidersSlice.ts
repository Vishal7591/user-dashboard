import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { initialState } from "./initialState";
import { User } from "../types/client/clientTypes";

export const fetchAPIProviders = createAsyncThunk(
  "apiProviders/fetchAPIProviders",
  async (randomId: number) => {
    const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}${randomId}`);
    const result = await res.json();

    return result;
  }
);

export type ThunkDispatch = typeof fetchAPIProviders;

export const apiProvidersSlice = createSlice({
  name: "apiProviders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAPIProviders.pending, (state) => {
      state.common.loading = true;
    });
    builder.addCase(fetchAPIProviders.fulfilled, (state, action) => {
      state.common.loading = false;
      state.common.success = true;
      state.common.contents = action.payload as User;
    });
    builder.addCase(fetchAPIProviders.rejected, (state, action) => {
      state.common.loading = false;
      state.common.error = action.error.message as string;
    });
  },
});

export default apiProvidersSlice.reducer;
