import { createSlice } from "@reduxjs/toolkit"
import { createTask } from "../midleware/userdata"

const initialstate = {
    loading:"",
    error:"",
    createdata:[],
}

const createaddid = createSlice({
    name:"createdata",
    initialState:initialstate,
    reducers: {},
    extraReducers:(builders) =>{
        builders.addCase(createTask.pending,(state, action)=>{
            state.loading = true;
        })
        builders.addCase(createTask.fulfilled,(state,action)=>{
            state.loading = false;
            state.createdata = action.payload;
        })
        builders.addCase(createTask.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.error.message;
        })
    }
})
export default createaddid.reducer