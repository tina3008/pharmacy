import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";
import { authFirebase } from "../../firebase/firebase";
const API_KEY = "AIzaSyCkxPo19SKC6V2-8LbTZ2GtxLW5CqWoePs";

const setAuthHeader = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = "";
};

export const register = createAsyncThunk(
  "auth/register",
  async (newUser, thunkAPI) => {
    const { email, password, name } = newUser;
    const auth = authFirebase;

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      await updateProfile(user, { displayName: name });
      const idToken = await userCredential.user.getIdToken(); 
      setAuthHeader(idToken);
  
      return {
        idToken: idToken,
        uid: user.uid,
        email: user.email,
        displayName: name, 
      };
    } catch (error) {
      console.error("Error registering user:", error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


export const logIn = createAsyncThunk(
  "auth/login",
  async (userInfo, thunkAPI) => {
    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(
        auth,
        userInfo.email,
        userInfo.password
      );
      const idToken = await userCredential.user.getIdToken();

      setAuthHeader(idToken);
      return {
        idToken,
        email: userCredential.user.email,
        displayName: userCredential.user.displayName,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logOut = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    const auth = getAuth();
    await signOut(auth);
    localStorage.removeItem("persist:root");
    clearAuthHeader();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const refreshUser = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    const reduxState = thunkAPI.getState();
    setAuthHeader(reduxState.auth.token);
    const res = await axios.get("/users/current");

    return res.data;
  },
  {
    condition(_, thunkAPI) {
      const reduxState = thunkAPI.getState();

      return reduxState.auth.token !== null;
    },
  }
);
