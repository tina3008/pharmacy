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

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {
      name: null,
      phone: null,
      email: null,
    },
    token: initialToken || null,
    refreshToken: null,
    isLoggedin: !!initialToken,
    isLoading: false,
    isRefreshing: false,
  },
  extraReducers: (builder) =>
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.isLoading = false;
        state.isLoggedin = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.data.accessToken;
        state.isLoggedin = true;
        console.log("state.token", state.token);
      })
      // .addCase(getUserInfo.fulfilled, (state, action) => {
      //   console.log("action.payload.user", action.payload.user);
        
      //   state.user = action.payload.user;    
      // })

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
        state.user = action.payload;

        state.isLoggedin = true;
        state.isRefreshing = false;
      })
      .addCase(refreshUser.rejected, (state, action) => {
        state.isRefreshing = false;
        if (action.error.code === "ERR_BAD_REQUEST") {
          state.user = {
            name: null,
            email: null,
          };
          state.token = null;
          state.isLoggedin = false;
          localStorage.removeItem("token");
          localStorage.removeItem("user");
        }
      }),
});

export default authSlice.reducer;
