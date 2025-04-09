import { createSlice } from "@reduxjs/toolkit";
import {
  login,
  logOut,
  refreshUser,
  register,
  getUserInfo,
} from "./operations";

const initialToken = localStorage.getItem("token");
const initialUser = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: {
    name: null,
    phone: null,
    email: null,
  },
  token: initialToken || null,
  isLoggedin: !!initialToken,
  refreshToken: null,
  isLoading: false,
  isRefreshing: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  extraReducers: (builder) =>
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.data.accessToken;
        state.refreshToken = action.payload.data.refreshToken;
        state.isLoading = false;
        state.isLoggedin = true;
      })

      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.data.accessToken;
        state.isLoggedin = true;
      })
      .addCase(login.rejected, (state, action) => {})
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.user = action.payload.user;
      })

      .addCase(logOut.fulfilled, (state) => {
        state.user = {
          name: null,
          email: null,
        };
        state.token = null;
        state.isLoggedin = false;
      })
      .addCase(refreshUser.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.data.accessToken;
        state.isLoggedin = true;
        state.isRefreshing = false;
      })
      .addCase(refreshUser.rejected, (state, action) => {
        state.token = null;
      }),
});

export default authSlice.reducer;
