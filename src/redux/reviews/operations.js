import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const allReviews = createAsyncThunk(
  "reviews/allReviews",
  async ({ productId, page, perPage }, thunkAPI) => {
    try {
      const response = await axios.get(
        `/products/${productId}/review?page=${page}&perPage=${perPage}`
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
