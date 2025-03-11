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
        state.items = action.payload.items;
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
        console.log("state.item--", state.item);
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
        state.isLoading = false;
        state.error = null;
        state.items.push(action.payload);
      })
    
      .addCase(changeShop.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      //   .addCase(changeShop.fulfilled, (state, action) => {
      //     state.isLoading = false;
      //       state.error = null;
      //       state.item = action.payload;
      // const index = state.items.findIndex(
      //   (item) => item._id === action.payload._id
      // );
      // if (index !== -1) {
      //   state.items[index] = action.payload;
      // }
      //   })

      //   .addCase(deleteShop.pending, (state) => {
      //     state.error = false;
      //     state.isLoading = true;
      //   })
      //   .addCase(deleteShop.fulfilled, (state, action) => {
      //     state.isLoading = false;
      //     state.error = null;
      //     state.items = state.items.filter(
      //       (item) => item._id !== action.payload._id
      //     );
      //   })
      //   .addCase(deleteShop.rejected, (state, action) => {
      //     state.isLoading = false;
      //     state.error = action.payload;
      //   })

      //   .addCase(fetchStatistics.pending, (state) => {
      //     state.error = false;
      //     state.isLoading = true;
      //   })
      //   .addCase(fetchStatistics.fulfilled, (state, action) => {
      //     state.isLoading = false;
      //     state.error = null;
      //     state.totalCount = action.payload;
      //   })
      //   .addCase(fetchStatistics.rejected, (state, action) => {
      //     state.isLoading = false;
      //     state.error = action.payload;
      //   })
      .addCase(logOut.fulfilled, (state) => {
        state.items = [];
        state.loading = false;
        state.error = null;
      });
  },
});

export const shopReducer = shopSlice.reducer;
