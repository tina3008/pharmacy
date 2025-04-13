import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const allShops = createAsyncThunk(
  "shop/all",
  async (page = 1, thunkAPI) => {
    try {
      const response = await axios.get(`/shop?page=${page}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getShopById = createAsyncThunk(
  "shops/shopId",
  async (shopId, thunkAPI) => {
    try {
      const response = await axios.get(`/shop/${shopId}`);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const changeShop = createAsyncThunk(
  "shop/changeShop",
  async ({ shopId, ...values }, thunkAPI) => {
    try {
      const response = await axios.put(`/shop/${shopId}/update`, values);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addShop = createAsyncThunk(
  "shop/create",
  async (newShop, thunkAPI) => {
    try {
      const response = await axios.post("/shop/create", newShop);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
