import React from "react";
import { CategoryCard } from "../components";
import { Link } from "react-router-dom";

function Dashboard() {
  const categories = [
    {
      name: "Food & Leisure",
      path: "/category-expenses/food-and-leisure",
      amount: 400.5,
    },
    {
      name: "Bills & Recharges",
      path: "/category-expenses/bills-and-recharges",
      amount: 4340,
    },
    {
      name: "Other Expenses",
      path: "/category-expenses/other-expenses",
      amount: 0,
    },
  ];

  return (
    <div className="w-full flex flex-col justify-start items-start gap-5">
      {/* Welcome Text */}
      <div className="flex flex-col justify-start gap-3 items-start leading-snug">
        <h1 className="text-lg-2 font-semibold">
          Welcome <span className="text-accent">Abhijeet</span>{" "}
        </h1>
        <h2 className="text-sm-2 font-regular">
          You have spent a total of{" "}
          <span className="text-accent font-semibold">$ 500.50 </span> till now.
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
              key={category.name}
              name={category.name}
              amount={category.amount}
              path={category.path}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
