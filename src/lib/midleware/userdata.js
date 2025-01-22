import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../Client";

export const GetInfo = createAsyncThunk("data/fetchData", async () => {
  const response = await fetch(`${API_URL}/dataid`);
  const result = await response.json();
  console.log("user api data",
     result);
  return result;
});
export const createTask = createAsyncThunk("tasks/create", async (taskData) => {
  const response = await fetch(`${API_URL}/dataid`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(taskData),
  });
  return await response.json();
});
export const updateTask = createAsyncThunk(
  "dataid/update",
  async ({ id, updatedData }) => {
    const response = await fetch(`${API_URL}/dataid/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });
    console.log("update", response);
    return await response.json();
  }
);
// Delete
export const deleteTask = createAsyncThunk("dataid/delete", async (id) => {
  await fetch(`${API_URL}/dataid/${id}`, {
    method: "DELETE",
  });
  return id; // Return the ID of the deleted task
});
