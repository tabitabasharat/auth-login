import { createSlice } from "@reduxjs/toolkit";
import { deleteTask, GetInfo } from "../midleware/userdata";

const initialstate = {
  loading: "",
  error: "",
  dataid: [],
};

const getuserid = createSlice({
  name: "dataid",
  initialState: initialstate,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(GetInfo.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(GetInfo.fulfilled, (state, action) => {
      state.loading = false;
      state.dataid = action.payload;
    });
    builder.addCase(GetInfo.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(deleteTask.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(deleteTask.fulfilled, (state, action) => {
      state.loading = false;
      state.dataid = state.dataid.filter((dataid) => dataid.id !== action.payload);
    //   state.dataid = action.payload;
    });
    builder.addCase(deleteTask.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});
export default getuserid.reducer;
