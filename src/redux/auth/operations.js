import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

 axios.defaults.baseURL = "https://pharmacy-backend-szji.onrender.com";
// https: axios.defaults.baseURL = "http://localhost:3000";
// const setAuthHeader = (token) => {
//   axios.defaults.headers.common.Authorization = `Bearer ${token}`;
// };

export const setAuthHeader = (token) => {
  if (token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common.Authorization;
  }
};
const token = localStorage.getItem("token");
if (token) {
  setAuthHeader(token);
}
const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = "";
};

export const register = createAsyncThunk(
  "auth/register",
  async (newUser, thunkAPI) => {
    try {
      const res = await axios.post("/user/register", newUser);
      console.log("operation:", res.data);
      
      setAuthHeader(res.data.data.accessToken);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (userInfo, thunkAPI) => {
    try {
      const res = await axios.post("/user/login", userInfo, {
        withCredentials: true,
      });
      setAuthHeader(res.data.data.accessToken);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


export const logOut = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await axios.post("/user/logout");
    localStorage.removeItem("token"); 
    setAuthHeader(null);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const getUserInfo = createAsyncThunk(
  "auth/user-info",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get("/user/user-info");
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const refreshUser = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    const res = await axios.post(
      "/user/refresh",
      {},
      { withCredentials: true }
    );
    setAuthHeader(res.data.data.accessToken);
    return res.data;
  },
  {
    condition(_, thunkAPI) {
      const reduxState = thunkAPI.getState();

      return reduxState.auth.token !== null;
    },
  }
);
