import React, { useState } from "react";
import { Select, Input, Button, Loader } from "../components";
import { useForm } from "react-hook-form";
import databaseService from "../appwrite/database";
import { useDispatch, useSelector } from "react-redux";
import { addExpense as addExpenseToStore } from "../store/expenseSlice/expenseSlice";
import { useNavigate } from "react-router-dom";

function AddExpense() {
  // local state
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    clearErrors,
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      amount: "",
      category: "",
    },
  });

  const addExpense = async (data) => {
    clearErrors();
    setLoading(true);
    try {
      const expense = await databaseService.createNewExpense({
        name: data.name,
        amount: Number(data.amount),
        category: data.category,
        userId: userData.$id,
      });
      // console.log(expense);

      if (expense) {
        reset(); //reset the form

        dispatch(addExpenseToStore({ expense })); // modify the store

        navigate("/dashboard"); // navigate to the dashboard
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className=" w-2/5 mx-auto flex flex-col items-center justify-start">
      {loading === true ? (
        <Loader />
      ) : (
        <>
          {/* Headline */}
          <h1 className="text-primary font-medium text-lg-1 mb-10">
            Add a new expense
          </h1>
          {/* Form */}
          <form
            onSubmit={handleSubmit(addExpense)}
            className="w-full flex flex-col justify-start items-center gap-4"
          >
            <Input
              label={"Expense name"}
              placeholder={"e.g. Lunch at the Wendy's"}
              type="text"
              {...register("name", { required: true })}
            />
            <Input
              label={"Amount ($)"}
              placeholder={"e.g. 1200"}
              type="number"
              step="any"
              {...register("amount", { required: true })}
            />
            <Select
              label="Expense category"
              options={[
                {
                  category: "Food and Leisure",
                  categoryId: "food-and-leisure",
                },
                {
                  category: "Bills and Recharges",
                  categoryId: "bills-and-recharges",
                },
                {
                  category: "Other Expenses",
                  categoryId: "other-expenses",
                },
              ]}
              {...register("category", { required: true })}
            />
            <Button
              disabled={isSubmitting ? true : false}
              type="submit"
              className="mt-4"
              buttonText="Add expense"
            />
          </form>
        </>
      )}
    </div>
  );
}

export default AddExpense;
