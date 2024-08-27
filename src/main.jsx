import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  AddExpense,
  AllExpenses,
  CategoryExpenses,
  Dashboard,
  EditExpense,
  Error,
  Home,
  Login,
  Signup,
} from "./pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/add-expense",
        element: <AddExpense />,
      },
      {
        path: "/edit-expense/:expenseId",
        element: <EditExpense />,
      },
      {
        path: "/all-expenses",
        element: <AllExpenses />,
      },
      {
        path: "/category-expenses/:categoryId",
        element: <CategoryExpenses />,
      },
    ],
    errorElement: <Error />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
