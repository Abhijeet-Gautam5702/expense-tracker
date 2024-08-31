import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

function CategoryCard({ id, name, amount, path, ...props }) {

  return (
    <div className="lg:min-w-[270px] flex flex-col justify-start items-stretch gap-4 rounded-large border-[1.5px] border-primary py-3 px-4 transition-all duration-100 hover:scale-105 cursor-default md:w-[215px]">
      {/* Category Title */}
      <p className="w-full text-center font-regular text-md-1 text-primary md:text-sm-1">
        {name}
      </p>
      {/* Total Category Spend */}
      <div className="flex flex-row justify-between items-center font-regular">
        <p className=" md:text-sm-0">Total amount:</p>
        <p className="text-accent font-regular md:text-sm-0 md:font-semibold">{`$ ${amount}`}</p>
      </div>
      {/* Action button */}
        <Link to={path}>
          <div className=" text-center w-full rounded-small px-4 py-2 text-background bg-accent md:text-sm-0">
            Show more
          </div>
        </Link>
    </div>
  );
}

export default CategoryCard;
