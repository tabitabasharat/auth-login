import { createSlice } from "@reduxjs/toolkit";
import { userList } from "./Data";

const userSlice = createSlice({
  name: "user",
  initialState: userList,
  reducers: {
    addUser: (state, action) => {
      state.push(action.payload); // Add a new user
    },
    updateUser: (state, action) => {
      const { id, name, email } = action.payload;
      const userToUpdate = state.find((user) => user.id === id); // Find the user by ID
      if (userToUpdate) {
        userToUpdate.name = name; // Update name
        userToUpdate.email = email; // Update email
      }
    },
    deleteUser: (state, action) => {
      const id = action.payload;
      return state.filter((user) => user.id !== action.payload); // Remove user by ID
    },
  },
});

export const { addUser, updateUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;
