import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const allShops = createAsyncThunk(
  "drugs/all",
  async (page = 1, thunkAPI) => {
    try {
      const response = await axios.get(`/shop?page=${page}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);