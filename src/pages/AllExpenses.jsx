import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import databaseService from "../appwrite/database";
import { populateStoreWithExpenses } from "../store/expenseSlice/expenseSlice";
import { Loader } from "../components";

function AllExpenses() {
  // local state
  const [loading, setLoading] = useState(false);
  const [expenseList, setExpenseList] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loginStatus, userData } = useSelector((state) => state.auth);
  const { expenses } = useSelector((state) => state.expense);

  useEffect(() => {
    (async () => {
      try {
        // Note: array is reversed so that the latest entry is at the top
        // Array.from(arrName).reverse() creates a new reversed array
        // arrName.reverse() reverses the original array
        // Note: We cannot mutate the original state-expense-variable
        setExpenseList(Array.from(expenses).reverse());
      } catch (error) {
        console.log(
          `Error fetching the list of expenses | Error = ${error.message}`
        );
        setErrorMessage(
          "Something went wrong! We could not fetch your expenses. Please try again later."
        );
      }
    })();
  }, []);

  const handleDeleteExpense = async (expenseId) => {
    setLoading(true);
    try {
      // delete the expense from the database
      await databaseService.deleteExpense({ expenseId });
      // fetch all expenses from the database
      const expenseListFromDB = await databaseService.getAllExpenses(
        userData.$id
      );
      if (expenseListFromDB) {
        // set new expense list to the store
        dispatch(populateStoreWithExpenses({ expenses: expenseListFromDB }));
        //set new expense list to the local state
        setExpenseList(expenseListFromDB);
      }
    } catch (error) {
      console.log(`Could not delete expense | Error = ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="w-full flex flex-row justify-center items-center">
        <Loader />
      </div>
    );
  } else if (expenseList.length === 0) {
    return (
      <div className="w-full flex flex-col justify-center items-center gap-3">
        <h1 className="text-primary font-semibold text-sm-3">
          You have not made any expenditures yet.
        </h1>
        <p className="font-regular text-sm-1">
          Please register an expense and then come back again!
        </p>
      </div>
    );
  } else if (errorMessage) {
    return (
      <div className="w-full flex flex-col justify-center items-center gap-3">
        <p className="font-regular text-sm-2 text-danger ">
          Please register an expense and then come back again!
        </p>
      </div>
    );
  }

  return (
    <div className=" -mt-5 w-full flex flex-col justify-start items-start gap-5">
      {/* Text Section */}
      <div className="leading-snug mb-10">
        <h1 className="text-primary font-medium text-lg-1">All Expenses</h1>
        <p className="text-primary font-regular text-sm-1">
          Here are all your expenditures till now.
        </p>
      </div>
      {/* Table Headers */}
      <div className="min-w-[75vw] flex flex-row justify-between items-center font-medium text-sm-1 p-4 rounded-med text-center shadow-md border-[1.5px] border-primary">
        <p className="w-1/3 max-w-1/3">Category</p>
        <p className="w-1/3 max-w-1/3">Expense name</p>
        <p className="w-1/3 max-w-1/3">Amount($)</p>
      </div>
      {/* Section of list of expenses */}
      <div className="mb-10 w-full flex flex-col justify-start items-start gap-3 font-medium text-sm-0 text-center">
        {expenseList.map((item) => (
          <div
            key={item.$id}
            className="flex flex-row justify-start items-center gap-3"
          >
            <div
              key={item.$id}
              className="w-[75vw] flex flex-row justify-between items-start border-b-[1px] border-primary p-3"
            >
              <p className="w-1/3 max-w-1/3">{item.category}</p>
              <p className="w-1/3 max-w-1/3">{item.name}</p>
              <p className="w-1/3 max-w-1/3"> {item.amount} </p>
              {/* Action button */}
            </div>
            <div className="flex flex-row justify-start items-center gap-3">
              <Link
                to={`/edit-expense/${item.$id}`}
                className="px-4 py-1 bg-accent border-[2px] border-accent text-background rounded-small font-medium hover:bg-accent/80 hover:border-accent/80 transition-all duration-100"
              >
                Edit
              </Link>
              <div
                className="px-4 py-1 bg-background text-danger border-[2px] border-danger font-medium rounded-small cursor-pointer hover:bg-danger hover:text-background transition-all duration-100"
                onClick={() => {
                  handleDeleteExpense(item.$id);
                }}
              >
                Delete
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllExpenses;
