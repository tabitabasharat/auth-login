import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const Create = createAsyncThunk(
  "createUser",
  async (user, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `https://jsonplaceholder.typicode.com/users`,
        user
      );
      console.log("Middleware Response Data:", response.data); // Console log the data inside middleware
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "An error occurred");
    }
  }
);