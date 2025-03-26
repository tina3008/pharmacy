import { createSlice } from "@reduxjs/toolkit";
import { allShops, getShopById, addShop, changeShop } from "./operations";

import { logOut } from "../auth/operations";
const shopSlice = createSlice({
  name: "shops",
  initialState: {
    item: {},
    items: [],
    currentPage: 1,
    totalPage: "",
    isLoading: false,
    error: null,
    loading: false,
    allShops: {},
    currentShopId: localStorage.getItem("shopId") || null,
  },
  reducers: {
    setCurrentShopId: (state, action) => {
      state.currentShopId = action.payload;
      localStorage.setItem("shopId", action.payload);
    },
    clearCurrentShopId: (state) => {
      state.currentShopId = null;
      localStorage.removeItem("shopId");
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(allShops.pending, (state) => {
        state.error = false;
        state.isLoading = true;
      })
      .addCase(allShops.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = action.payload.data?.shops;
        state.totalPage = action.payload.totalPages;
        state.currentPage = action.payload.page;
      })
      .addCase(allShops.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getShopById.pending, (state) => {
        state.error = false;
        state.isLoading = true;
      })
      .addCase(getShopById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.item = action.payload.data;
      })
      .addCase(getShopById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(addShop.pending, (state) => {
        state.error = false;
        state.isLoading = true;
      })
      .addCase(addShop.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items.push(action.payload);
        console.log("action.payload-", action.payload);
        console.log("state.items--", state.items);
      })
      .addCase(addShop.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(changeShop.pending, (state) => {
        state.error = false;
        state.isLoading = true;
      })
      .addCase(changeShop.fulfilled, (state, action) => {
        console.log("action.payload", action.payload);
        state.isLoading = false;
        state.error = null;
        state.items.push(action.payload);
      })
      .addCase(changeShop.rejected, (state, action) => {
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

export const { setCurrentShopId, clearCurrentShopId } = shopSlice.actions;
export const shopReducer = shopSlice.reducer;
