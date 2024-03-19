import { configureStore } from "@reduxjs/toolkit";
import busReducer from "./BusDetails";

const store = configureStore({
  reducer: {
    bus: busReducer,
  },
});

export default store;
