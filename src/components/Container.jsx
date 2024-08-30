import React from "react";

function Container({ children }) {
  return (
    <div className="w-full flex-grow flex flex-col justify-center px-7 relative">
      {children}
    </div>
  );
}

export default Container;
