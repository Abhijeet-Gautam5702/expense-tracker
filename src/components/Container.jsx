import React from "react";

function Container({ children }) {
  return (
    <div className="w-full flex-grow flex flex-col justify-start md:justify-center md:px-7 px-3">
      {children}
    </div>
  );
}

export default Container;
