import React from "react";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="">
      <h1 className="text-4xl font-bold text-link">
        EXPENSE
      </h1>
      <Outlet />
    </div>
  );
}

export default App;
