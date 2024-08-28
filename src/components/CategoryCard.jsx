import React from "react";
import { Link } from "react-router-dom";

function CategoryCard({ name, amount, path, ...props }) {
  return (
    <div className="min-w-[270px] flex flex-col justify-start items-stretch gap-4 rounded-large border-[1.5px] border-primary p-3 transition-all duration-100 hover:scale-105 cursor-default ">
      {/* Category Title */}
      <p className="w-full text-center font-regular text-md-1 text-primary">
        {name}
      </p>
      {/* Total Category Spend */}
      <div className="flex flex-row justify-between items-center font-regular">
        <p>Total amount:</p>
        <p className="text-accent font-regular">{`$ ${amount}`}</p>
      </div>
      {/* Action buttons */}
      <div className="flex flex-row justify-between items-center font-regular text-sm-0">
        <Link to={path}>
          <div className="rounded-small px-4 py-2 text-background bg-accent">
            Show more
          </div>
        </Link>
        <div
          className="rounded-small px-4 py-2 text-danger bg-background border-[1.5px] border-danger cursor-pointer"
          onClick={() => {}}
        >
          Delete
        </div>
      </div>
    </div>
  );
}

export default CategoryCard;
