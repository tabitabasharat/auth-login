import { createSlice } from "@reduxjs/toolkit";
import { updateTask } from "../midleware/userdata";

const initialstate = {
    loading: "",
    error:"",
    updateid:[],
}

const updateuserid = createSlice({
    name:"updateid",
    initialState:initialstate,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(updateTask.pending,(state, action)=>{
            state.loading = true;
        })
        builder.addCase(updateTask.fulfilled,(state, action)=>{
            state.loading = false;
            state.updateid = action.payload;
        })
        builder.addCase(updateTask.rejected,(state, action)=>{
            state.loading = false;
            state.error = action.error.message;
        })
    }
})
export default updateuserid.reducer