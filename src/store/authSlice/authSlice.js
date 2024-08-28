import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loginStatus: false,
  userData: {},
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state, action) => {
        state.loginStatus=false;
        state.userData={};
    },
    login: (state, action) => {
        state.loginStatus=true;
        state.userData=action.payload.userData;
    },
  },
});

export const {login,logout} =authSlice.actions;

export const authReducer = authSlice.reducer;
