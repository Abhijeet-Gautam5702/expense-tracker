import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Header, Footer, Container } from "./components";
import authService from "./appwrite/auth";
import { useDispatch } from "react-redux";
import { login as storeLogin } from "./store/authSlice/authSlice";
import { populateStoreWithExpenses } from "./store/expenseSlice/expenseSlice";
import databaseService from "./appwrite/database";

function App() {
  const dispatch = useDispatch();

  // Whenever App is loaded => populate store with auth & expense details
  useEffect(() => {
    (async () => {
      try {
        const userData = await authService.getLoggedInUser();
        if (userData) {
          const expenses = await databaseService.getAllExpenses(userData.$id);
          expenses.reverse(); // reverse the list so that the latest expense is at the top
          if (expenses) {
            dispatch(populateStoreWithExpenses({ expenses }));
          }
          dispatch(storeLogin({ userData }));
        }
      } catch (error) {
        console.log("Error in App.jsx useEffect: ", error.message);
      }
    })();
    // console.log("App.jsx loaded");
  }, []);
  return (
    <div className="w-full min-h-screen flex flex-col justify-between items-center">
      <Header />
      <Container>
        <Outlet />
      </Container>
      <Footer />
    </div>
  );
}

export default App;
