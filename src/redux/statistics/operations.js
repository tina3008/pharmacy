import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const allStatistics = createAsyncThunk(
  "statistics/Statistics",
  async ({ shopId, page }, thunkAPI) => {
    try {
      const response = await axios.get(`/shop/${shopId}/statistics`, {
        params: { page, perPage: 6 },
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const ClientStatistics = createAsyncThunk(
  "statistics/clientStatistics",
  async ({ shopId, clientId }, thunkAPI) => {
    try {
      const response = await axios.get(
        `/shop/${shopId}/statistics/${clientId}/goods`
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
