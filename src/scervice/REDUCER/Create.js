import { createSlice } from "@reduxjs/toolkit";
import { Create } from "../middleware/Create";

const initialState = {
  loading: false,
  error: "",
  create: [],
};
const CreateSlice = createSlice({
  name: "create",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(Create.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(Create.fulfilled, (state, action) => {
      (state.loading = false), (state.create = action.payload);
    });
    builder.addCase(Create.rejected, (state, action) => {
      (state.loading = false),
        (state.error = action.error?.message || "Something went wrong");
    });
  },
});
