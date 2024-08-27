import { createSlice } from "@reduxjs/toolkit";

// Note: Ideally we should have created two different slices for auth and expenses each
const initialState = {
  auth: {
    loginStatus: false,
    userData: {},
  },
  expenses: [
    {
      $id: 1,
      name: "",
      amount: 0.0,
      category: "",
    },
  ],
};

const slice = createSlice({
  name: "slice",
  initialState,
  reducers: {
    // auth reducers

    logout: (state, action) => {
      state.auth.loginStatus = false;
      state.auth.userData = {};
    },
    login: (state, action) => {
      state.auth.loginStatus = true;
      state.auth.userData = action.payload;
    },

    // expenses reducers

    updateExpense: (state, action) => {
      const expenseId = action.payload.$id; // Note: Since appwrite gives the IDs in "$id" format, so we are storing the IDs in the same format here as well, just to maintain consistency in the syntax/code.
      state.expenses = state.expenses.map((expense) => {
        if (expense.$id === expenseId) {
          const updateExpense = {
            ...expense, // spread the members of the original expense object.
            ...action.payload, // spread the members of the expense object (containing only those properties that need to be changed)
            /*
                NOTE: The properties from action.payload will override those in the original expense, hence updation will take place.
            */
          };
          return updateExpense;
        }
        return expense;
      });
    },
    deleteExpense: (state, action) => {
      const expenseId = action.payload.$id; // Note: Since appwrite gives the IDs in "$id" format, so we are storing the IDs in the same format here as well, just to maintain consistency in the syntax/code.
      state.expenses = state.expenses.filter(
        (expense) => expense.$id !== expenseId
      );
    },
    deleteAllExpenses: (state, action) => {
      state.expenses = [];
    },
  },
});

export const { logout, login, updateExpense, deleteExpense } = slice.actions;

export const sliceReducer = slice.reducer;
