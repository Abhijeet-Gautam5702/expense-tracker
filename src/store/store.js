import { configureStore } from "@reduxjs/toolkit";
import { sliceReducer } from "./slice";

const store = configureStore({
  reducer: sliceReducer,
});

export default store;
