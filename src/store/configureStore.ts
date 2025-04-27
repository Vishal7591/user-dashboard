/* eslint-disable global-require */
/* eslint-disable no-undef */
import logger from "redux-logger";
import { configureStore } from "@reduxjs/toolkit";
import apiProvidersSlice from "../slice/apiProvidersSlice";
import apiDetailsSlice from "../slice/apiDetailsSlice";

export const store = configureStore({
  reducer: {
    apiProviders: apiProvidersSlice,
    apiDetails: apiDetailsSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      //@ts-ignore
    }).concat(logger),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
