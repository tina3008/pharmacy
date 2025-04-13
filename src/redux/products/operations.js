import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const allProducts = createAsyncThunk(
  "products/all",
  async ({ shopId, page }, thunkAPI) => {
    try {
      const response = await axios.get(`/shop/${shopId}/product?page=${page}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchProducts = createAsyncThunk(
  "products/fetch",
  async ({ page, category, name }, thunkAPI) => {
    try {
      const response = await axios.get(`/products/`, {
        params: { page, category, name },
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategory",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`/products/categories`);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addProduct = createAsyncThunk(
  "products/create",
  async ({ shopId, newProduct }, thunkAPI) => {

    try {
      const response = await axios.post(
        `/shop/${shopId}/product/add`,
        newProduct
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const getProductById = createAsyncThunk(
  "products/gepProductId",
  async ({ shopId, productId }, thunkAPI) => {
    try {
      const response = await axios.get(`/shop/${shopId}/product/${productId}`);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const editProduct = createAsyncThunk(
  "products/editProduct",
  async ({ shopId, productId, values }, thunkAPI) => {
    try {
      const response = await axios.put(
        `/shop/${shopId}/product/${productId}/edit`,
        values
      );
      return { productId, updatedProduct: response.data };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async ({ shopId, _id }, thunkAPI) => {
    try {
      const response = await axios.delete(
        `/shop/${shopId}/product/${_id}/delete`
      );

      return _id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
