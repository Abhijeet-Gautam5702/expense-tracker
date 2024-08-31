import React from "react";

function Logo({className=""}) {
  return (
    <div className={`w-full flex flex-col justify-center items-start font-bold lg:text-md-2 leading-none md:text-sm-3 ${className}`}>
      <p className="text-accent tracking-wider w-full ">EXPENSE</p>
      <p className="tracking-wide w-full ">TRACKER</p>
    </div>
  );
}

export default Logo;
