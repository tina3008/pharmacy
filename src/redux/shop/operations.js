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
      console.log("response.data-", response.data);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// export const addWordId = createAsyncThunk(
//   "words/addWordId",
//   async (id, thunkAPI) => {
//     try {
//       const response = await axios.post(`/words/add/${id}`);
//       return response.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

// export const deleteWord = createAsyncThunk(
//   "words/deleteWord",
//   async (id, thunkAPI) => {
//     try {
//       const response = await axios.delete(`/words/delete/${id}`);
//       return { _id: response.data.id };
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

// export const changeWord = createAsyncThunk(
//   "words/changeWord",
//   async ({ id, en, ua, category, isIrregular }, thunkAPI) => {
//     try {
//       const response = await axios.patch(`/words/edit/${id}`, {
//         en,
//         ua,
//         category,
//         isIrregular,
//       });
//       return response.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

// export const fetchStatistics = createAsyncThunk(
//   "words/statistics",
//   async (_, thunkAPI) => {
//     try {
//       const response = await axios.get("/words/statistics");
//       return response.data.totalCount;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

// export const fetchTasks = createAsyncThunk(
//   "words/fetchTasks",
//   async (_, { getState }) => {
//     const { auth } = getState();
//     const token = auth.token;

//     if (!token) {
//       throw new Error("No authentication token found.");
//     }

//     const response = await axios.get(
//       "https://vocab-builder-backend.p.goit.global/api/words/tasks",
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );
//     return response.data;
//   }
// );

// export const fetchAnswers = createAsyncThunk(
//   "words/answers",
//   async (word, thunkAPI) => {
//     try {
//       const response = await axios.post("/words/answers", word);

//       return response.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

// export const fetchWordById = createAsyncThunk(
//   "words/fetchWordById",
//   async (id, thunkAPI) => {
//     try {
//       const response = await axios.get(`/words/tasks/${id}`);

//       return response.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

// export const fetchAllOwnWords = createAsyncThunk(
//   "words/fetchAllOwnWords",
//   async (wordId, thunkAPI) => {
//     try {
//       const response = await axios.get(`/words/own?page=1&limit=1000`);

//       return response.data.results;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );
