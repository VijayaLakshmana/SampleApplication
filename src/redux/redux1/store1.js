import { configureStore } from "@reduxjs/toolkit";
import addReducer from "./Add";

const store=configureStore({
    reducer:{
        ad:addReducer
    }
})
export default store