import { configureStore } from "@reduxjs/toolkit";
import getuserid from "./reducer/UserData";


const Store = configureStore({
    reducer:{
      userid: getuserid,
    }
})
export default Store;