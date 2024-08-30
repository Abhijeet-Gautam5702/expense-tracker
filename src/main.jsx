import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store.js";
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
import { Protected } from "./layouts";

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
        element: (
          <Protected authentication>
            <Dashboard />
          </Protected>
        ),
      },
      {
        path: "/add-expense",
        element: (
          <Protected authentication>
            <AddExpense />
          </Protected>
        ),
      },
      {
        path: "/edit-expense/:expenseId",
        element: (
          <Protected authentication>
            <EditExpense />
          </Protected>
        ),
      },
      {
        path: "/all-expenses",
        element: (
          <Protected authentication>
            <AllExpenses />
          </Protected>
        ),
      },
      {
        path: "/category-expenses/:categoryId",
        element: (
          <Protected authentication>
            <CategoryExpenses />
          </Protected>
        ),
      },
    ],
    errorElement:<Error/>
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
