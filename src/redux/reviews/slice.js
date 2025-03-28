import { createSlice } from "@reduxjs/toolkit";
import { allReviews } from "./operations";

import { logOut } from "../auth/operations";
const reviewsSlice = createSlice({
  name: "reviews",
  initialState: {
    item: {},
    items: [],
    currentPage: 1,
    totalPage: "",
    isLoading: false,
    error: null,
    loading: false,
  },

  extraReducers: (builder) => {
    builder
      .addCase(allReviews.pending, (state) => {
        state.error = false;
        state.isLoading = true;
      })
      .addCase(allReviews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = action.payload.data.data;
        state.totalPage = action.payload.data.totalPages;
        state.currentPage = action.payload.data.page;
        console.log("action.payload", action.payload);
        console.log("state.totalPage", state.totalPage);
      })
      .addCase(allReviews.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(logOut.fulfilled, (state) => {
        state.items = [];
        state.loading = false;
        state.error = null;
      });
  },
});

export const reviewsReducer = reviewsSlice.reducer;

