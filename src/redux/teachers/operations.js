import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTeachers = createAsyncThunk(
  "teachers/fetchAll",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        "https://node-teachers.onrender.com/teachers"
      );      
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addTeacher = createAsyncThunk(
  "teachers/addTeacher",
  async (newTeacher, thunkAPI) => {
    try {
      const response = await axios.post(
        "https://node-teachers.onrender.com/teachers",
        newTeacher
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteTeacher = createAsyncThunk(
  "teachers/deleteTeacher",
  async (id, thunkAPI) => {
    try {
      const response = await axios.delete(
        `https://node-teachers.onrender.com/teachers/${id}`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const changeTeacher = createAsyncThunk(
  "teachers/changeTeacher",
  async ({ id, name, number }, thunkAPI) => {
    try {
      const response = await axios.patch(`/teachers/${id}`, { name, number });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
