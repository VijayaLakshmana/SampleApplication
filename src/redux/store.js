import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./CounterSlice";
import counterReducer1 from "./CounterSlice1";

const store = configureStore({
  reducer: {
    counter: counterReducer,
    counter1: counterReducer1,
  },
});
export default store;
