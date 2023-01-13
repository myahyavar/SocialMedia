 import { configureStore } from "@reduxjs/toolkit";
 import userreducer from "./userSlice";

 export default configureStore({
    reducer:{
        user:userreducer,
    },
 });