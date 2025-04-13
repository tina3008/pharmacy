import { createSlice } from "@reduxjs/toolkit";
import {
  allProducts,
  addProduct,
  deleteProduct,
  getProductById,
  editProduct,
  fetchProducts,
} from "./operations";

import { logOut } from "../auth/operations";
const productsSlice = createSlice({
  name: "products",
  initialState: {
    item: {},
    items: [],
    currentPage: 1,
    totalPage: "",
    isLoading: false,
    error: null,
    loading: false,
    selectedProduct: null,
  },
  reducers: {
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(allProducts.pending, (state) => {
        state.error = false;
        state.isLoading = true;
      })
      .addCase(allProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = action.payload.data.data;
        state.totalPage = action.payload.data.totalPages;
        state.currentPage = action.payload.data.page;
      })
      .addCase(allProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchProducts.pending, (state) => {
        state.error = false;
        state.isLoading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = action.payload.data.data;
        state.totalPage = action.payload.data.totalPages;
        state.currentPage = action.payload.data.page;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(addProduct.pending, (state) => {
        state.error = false;
        state.isLoading = true;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items.push(action.payload.data);
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.error = false;
        state.isLoading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = state.items.filter(
          (product) => product._id !== action.payload
        );
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(editProduct.pending, (state) => {
        state.error = false;
        state.isLoading = true;
      })
      .addCase(editProduct.fulfilled, (state, action) => {
        const { productId, updatedProduct } = action.payload;
        state.isLoading = false;
        state.error = null;
        state.items = state.items.map((product) =>
          product._id === productId ? updatedProduct.data : product
        );
      })
      .addCase(editProduct.rejected, (state, action) => {
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

export const productsReducer = productsSlice.reducer;
export const { setSelectedProduct } = productsSlice.actions;
