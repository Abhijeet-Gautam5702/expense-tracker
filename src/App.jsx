import React from "react";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="">
      <h1 className="text-4xl font-thin text-purple-600">
        Expense Tracker Application
      </h1>
      <Outlet />
    </div>
  );
}

export default App;
