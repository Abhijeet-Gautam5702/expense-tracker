import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Loader } from "../components";

function Home() {
  const authStatus = useSelector((state) => state.auth.loginStatus);

  // local state
  const [isLoggedIn, setIsLoggedIn] = useState(authStatus);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setIsLoggedIn(authStatus);
    // Artifically giving a delay of 2s
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, [authStatus]);

  if (loading) {
    return (
      <div className="w-full flex flex-col items-center justify-center gap-[4rem]">
        <Loader />
      </div>
    );
  }

  return (
    <div className="transition-all duration-150 w-full flex flex-col items-center justify-center lg:gap-[4rem] md:gap-[2rem]">
      {/* Welcome Text */}
      <div className="flex flex-col items-center justify-center leading-snug">
        <h2 className="font-light lg:text-md-3 md:text-md-1">
          Keep your expenses in check with
        </h2>
        <h1 className="font-bold lg:text-lg-3 md:text-lg-1">
          <span className="text-accent">EXPENSE </span> TRACKER
        </h1>
      </div>
      {/* Login prompt */}
      {!isLoggedIn && (
        <p className="lg:text-sm-1">
          Please{" "}
          <Link to={"/login"} className="text-accent hover:underline">
            login
          </Link>{" "}
          or{" "}
          <Link to={"/signup"} className="text-accent hover:underline">
            create an account
          </Link>{" "}
          to continue
        </p>
      )}
    </div>
  );
}

export default Home;
