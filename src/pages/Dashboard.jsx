import React, { useEffect, useState } from "react";
import { CategoryCard, Loader } from "../components";
import { Link, useNavigate } from "react-router-dom";
import databaseService from "../appwrite/database";
import { useDispatch, useSelector } from "react-redux";
import { populateStoreWithExpenses } from "../store/expenseSlice/expenseSlice";

function Dashboard() {
  // local states
  const [categoryAmounts, setCategoryAmounts] = useState({
    foodAndLeisure: 0,
    billsAndRecharges: 0,
    otherExpenses: 0,
  });
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const userData = useSelector((state) => state.auth.userData);
  const dispatch = useDispatch();

  const categories = [
    {
      name: "Food and Leisure",
      id: "food-and-leisure",
      amount: categoryAmounts.foodAndLeisure,
    },
    {
      name: "Bills and Recharges",
      id: "bills-and-recharges",
      amount: categoryAmounts.billsAndRecharges,
    },
    {
      name: "Other Expenses",
      id: "other-expenses",
      amount: categoryAmounts.otherExpenses,
    },
  ];

  useEffect(() => {
    // fetch the expenses data from DB and populate the local state as well as store
    (async () => {
      try {
        const expensesFromDB = await databaseService.getAllExpenses(userData.$id);

        if (expensesFromDB) {
          // populate the store
          dispatch(populateStoreWithExpenses({ expenses: expensesFromDB }));

          // get the individual category expense amounts from the expensesFromDB
          let c1 = categoryAmounts.foodAndLeisure,
            c2 = categoryAmounts.billsAndRecharges,
            c3 = categoryAmounts.otherExpenses;
          expensesFromDB.forEach((item) => {
            if (item.category === "Food and Leisure") {
              c1 += item.amount;
            } else if (item.category === "Bills and Recharges") {
              c2 += item.amount;
            } else {
              c3 += item.amount;
            }
          });
          // update the local state
          setCategoryAmounts({
            foodAndLeisure: c1,
            billsAndRecharges: c2,
            otherExpenses: c3,
          });
        }
      } catch (error) {
        console.log(`Could not fetch expenses :: Error = ${error.message}`);
        setErrorMessage("Something went wrong. Please try again");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <div className="w-full flex flex-col justify-center items-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col justify-start items-start gap-5">
      {errorMessage ? (
        <p className="w-full font-regular text-danger">{errorMessage}</p>
      ) : (
        <>
          {/* Welcome Text */}
          <div className="flex flex-col justify-start gap-3 items-start leading-snug">
            <h1 className="text-lg-2 font-semibold">
              Welcome <span className="text-accent">{userData.name}</span>{" "}
            </h1>
            <h2 className="text-sm-2 font-regular">
              You have spent a total of{" "}
              <span className="text-accent font-semibold">
                {`$ ${
                  categoryAmounts.billsAndRecharges +
                  categoryAmounts.foodAndLeisure +
                  categoryAmounts.otherExpenses
                }`}{" "}
              </span>{" "}
              till now.
            </h2>
          </div>
          {/* Category Spends */}
          <div className="w-full mt-14 flex flex-col justify-start items-start gap-2">
            <h2 className="text-primary font-medium text-md-3">
              Categorical Expenses
            </h2>
            <div className="w-full mt-2 flex flex-row justify-start items-center gap-[2rem]">
              {categories.map((category) => (
                <CategoryCard
                  key={category.id}
                  id={category.id}
                  name={category.name}
                  amount={category.amount}
                  path={`/category-expenses/${category.id}`}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Dashboard;
