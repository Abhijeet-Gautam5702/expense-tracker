import React, { useEffect, useState } from "react";
import { Select, Input, Button, Loader } from "../components";
import { useForm } from "react-hook-form";
import databaseService from "../appwrite/database";
import { useDispatch, useSelector } from "react-redux";
import { updateExpense as updateExpenseToStore } from "../store/expenseSlice/expenseSlice";
import { useNavigate, useParams } from "react-router-dom";

function EditExpense() {
  // local state
  const [loading, setLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { expenseId } = useParams();
  const authState = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    clearErrors,
    reset,
    setValue,
  } = useForm({
    defaultValues: {
      name: "",
      amount: "",
      category: "",
    },
  });

  // Compare the userId from the store and the userId who created this expense. If they are same => then only authorize user to edit. Otherwise, redirect them to the dashboard
  useEffect(() => {
    // console.log("expenseId = ", expenseId);
    (async () => {
      try {
        const expenseFromDB = await databaseService.getSingleExpense({
          expenseId,
        });
        console.log(expenseFromDB);
        if (expenseFromDB) {
          const userId = expenseFromDB.userId;
          // console.log("userId = ", userId);
          // console.log("userData = ", authState.userData);

          if (userId === authState.userData.$id && authState.loginStatus) {
            setIsAuthorized(true); // set authorization flag to true

            // fill values in the form-fields
            setValue("name", expenseFromDB.name);
            setValue("amount", expenseFromDB.amount);
            setValue("category", expenseFromDB.category);
          } else {
            console.log("You are not authorized to edit this entry");
            navigate("/dashboard");
          }
        }
      } catch (error) {
        console.log(
          `Could not check if user is authorized for editing or not | Error = ${error.message}`
        );
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const editExpense = async (data) => {
    clearErrors();
    setLoading(true);
    try {
      const expense = await databaseService.updateExpense(expenseId, {
        name: data.name,
        amount: Number(data.amount),
        category: data.category,
      });
      // console.log(expense);

      if (expense) {
        reset(); //reset the form

        dispatch(updateExpenseToStore({ expense })); // modify the store

        navigate("/all-expenses"); // navigate to the AllExpense Page
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="w-2/5 mx-auto flex flex-col items-center justify-start">
        <Loader />
      </div>
    );
  }
  return (
    <div className=" lg:w-2/5 mx-auto flex flex-col items-center justify-start md:w-3/5 md:mb-3">
      {/* Headline */}
      <h1 className="text-primary font-medium lg:text-lg-1 lg:mb-10 md:text-md-3 md:mb-5 md:mt-3">
        Edit your expense
      </h1>
      {/* Form */}
      <form
        onSubmit={handleSubmit(editExpense)}
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
          className=" lg:mt-4 md:mt-2"
          buttonText="Add expense"
        />
      </form>
    </div>
  );
}

export default EditExpense;
