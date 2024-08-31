import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import databaseService from "../appwrite/database";
import { populateStoreWithExpenses } from "../store/expenseSlice/expenseSlice";
import { Loader } from "../components";

function CategoryExpenses() {
  // local state
  const [loading, setLoading] = useState(false);
  const [expenseList, setExpenseList] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categoryId } = useParams();
  // extract the name from the categoryId
  const categoryName = categoryId
    .split("-and-")
    .map((part) => {
      const words = part.split("-");
      return words
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    })
    .join(" and ");

  const { loginStatus, userData } = useSelector((state) => state.auth);
  const { expenses } = useSelector((state) => state.expense);

  useEffect(() => {
    (async () => {
      try {
        const filteredExpenses = expenses.filter(
          (expense) => expense.category === categoryName
        );
        filteredExpenses.reverse();
        setExpenseList(filteredExpenses);
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

  if (expenseList.length === 0) {
    return (
      <div className="my-auto w-full flex flex-col justify-center items-center gap-3">
        <h1 className="text-primary font-semibold text-sm-1 md:text-sm-3 md:text-center">
          {" "}
          You have not made any expenditures in this category.{" "}
        </h1>
        <p className="font-regular  md:text-sm-1">Please register an expense and then come back again!</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="w-full flex flex-row justify-center items-center">
        <Loader />
      </div>
    );
  } else if (errorMessage) {
    <div className="w-full flex flex-row justify-center items-center">
      <p className="text-danger text-sm-2 font-bold">{errorMessage}</p>
    </div>;
  }

  return (
    <div className=" lg:-mt-5 w-full flex flex-col justify-start items-start gap-5 mt-2">
      {/* Text Section */}
      <div className="leading-snug lg:mb-10 md:mb-5">
        <h1 className="text-primary font-medium text-md-1 lg:text-lg-1 md:text-md-3">
          <span className="font-bold">{categoryName}</span>
        </h1>
        <p className="text-primary font-regular lg:text-sm-1 ">
          {`Here are all your expenditures in the ${categoryName} category.`}
        </p>
      </div>
      {/* Table Headers */}
      <div className="w-[75vw] p-2 rounded-small text-[13px] lg:min-w-[75vw] flex flex-row justify-between items-center lg:font-medium lg:text-sm-1 md:p-4 md:rounded-med text-center shadow-md border-[1.5px] border-primary md:font-semibold md:min-w-[80vw]">
        <p className="w-1/3 max-w-1/3 text-left">Category</p>
        <p className="w-1/3 max-w-1/3 text-center">Expense name</p>
        <p className="w-1/3 max-w-1/3 text-right">Amount($)</p>
      </div>
      {/* Section of list of expenses */}
      <div className="lg:mb-10 w-full flex flex-col justify-start items-start gap-3 font-medium text-sm-0 text-center md:mb-5">
        {expenseList.map((item) => (
          <div
            key={item.$id}
            className="flex flex-row justify-start items-center gap-3"
          >
            <div
              key={item.$id}
              className=" w-[75vw] lg:w-[75vw] flex flex-row justify-between items-start border-b-[1px] border-primary p-3 md:w-[80vw]"
            >
            <p className="w-1/3 max-w-1/3 text-left">{item.category}</p>
            <p className="w-1/3 max-w-1/3 text-center">{item.name}</p>
            <p className="w-1/3 max-w-1/3 text-right"> {item.amount} </p>
            </div>
              {/* Action button */}
              <div className="flex flex-col  gap-1 md:flex-row justify-between md:justify-start items-center lg:gap-3 md:gap-1">
              <Link
                to={`/edit-expense/${item.$id}`}
                className="w-full px-1 lg:px-4 py-1 bg-accent border-[1.5px] border-accent text-background rounded-small font-medium hover:bg-accent/80 hover:border-accent/80 transition-all duration-100 md:px-2 md:text-sm-0"
              >
                Edit
              </Link>
              <div
                className="px-1 lg:px-4 py-1 bg-background text-danger border-[1.5px] border-danger font-medium rounded-small cursor-pointer hover:bg-danger hover:text-background transition-all duration-100 md:px-2 md:text-sm-0"
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

export default CategoryExpenses;
