import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { initialState } from "./initialState";
import { BlogPost } from "../types/client/clientTypes";

export const fetchAPIDetails = createAsyncThunk(
  "apiDetails/fetchAPIDetails",
  async (randomId: number) => {
    const res = await fetch(
      `${process.env.REACT_APP_API_BASE_URL}${randomId}/posts`
    );
    const result = await res.json();

    return result;
  }
);

export type ThunkDispatch = typeof fetchAPIDetails;

export const apiDetailsSlice = createSlice({
  name: "apiProviders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAPIDetails.pending, (state) => {
      state.common.loading = true;
    });
    builder.addCase(fetchAPIDetails.fulfilled, (state, action) => {
      state.common.loading = false;
      state.common.success = true;
      state.common.contents = action.payload as Array<BlogPost>;
    });
    builder.addCase(fetchAPIDetails.rejected, (state, action) => {
      state.common.loading = false;
      state.common.error = action.error.message as string;
    });
  },
});

export default apiDetailsSlice.reducer;
