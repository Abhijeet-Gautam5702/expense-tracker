import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./authSlice/authSlice";
import { expenseReducer } from "./expenseSlice/expenseSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    expense: expenseReducer,
  },
});

export default store;
