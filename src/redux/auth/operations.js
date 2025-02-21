import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://pharmacy-backend-szji.onrender.com";

const setAuthHeader = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = "";
};

export const register = createAsyncThunk(
  "auth/register",
  async (newUser, thunkAPI) => {
    try {
      const res = await axios.post("/user/register", newUser);
      setAuthHeader(res.data.token);
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
      const res = await axios.post("/user/login", userInfo);
      console.log("res.data.data.token", res.data);
      
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
    clearAuthHeader();
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

// export const refreshUser = createAsyncThunk(
//   "auth/refresh",
//   async (_, thunkAPI) => {
//     const reduxState = thunkAPI.getState();
//     console.log("refresh reduxState", reduxState);
//     setAuthHeader(reduxState.auth.token);
//     // const res = await axios.post("/user/refresh");
//     const res = await axios.post(
//       "/user/refresh",
//       {},
//       {
//         withCredentials: true,
//       }
//     );
//     console.log("refresh", res);
    
//     return res.data;
//   },
//   {
//     condition(_, thunkAPI) {
//       const reduxState = thunkAPI.getState();

//       return reduxState.auth.token !== null;
//     },
//   }
// );

export const refreshSession = async ({ sessionId, refreshToken }) => {
  const session = await SessionsCollections.findOne({
    _id: sessionId,
    refreshToken,
  });

  if (!session) {
    throw createHttpError(401, "Session not found");
  }

  if (new Date() > new Date(session.refreshTokenValidUntil)) {
    throw createHttpError(401, "Session token expired");
  }
  const newSession = await SessionsCollections.create({
    userId: session.userId,
    ...createSession(),
  });

  await SessionsCollections.deleteOne({ _id: sessionId });

  return newSession;
};