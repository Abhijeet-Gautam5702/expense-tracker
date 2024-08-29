import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  expenses: [],
};

const expenseSlice = createSlice({
  name: "expense",
  initialState,
  reducers: {
    populateStoreWithExpenses: (state, action) => {
      state.expenses = action.payload.expenses;
    },
    addExpense: (state, action) => {
      state.expenses.push(action.payload.expense);
    },
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

export const {
  populateStoreWithExpenses,
  updateExpense,
  deleteAllExpenses,
  deleteExpense,
  addExpense,
} = expenseSlice.actions;

export const expenseReducer = expenseSlice.reducer;
