import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Header, Footer, Container } from "./components";
import authService from "./appwrite/auth";
import { useDispatch } from "react-redux";
import { login as storeLogin } from "./store/authSlice/authSlice";

function App() {
  const dispatch = useDispatch();

  // Whenever App is loaded => populate store.auth if the user is logged in
  useEffect(() => {
    (async () => {
      try {
        const userData = await authService.getLoggedInUser();
        if (userData) {
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
