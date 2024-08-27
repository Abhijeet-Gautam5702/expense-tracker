import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Home() {
  const authStatus = useSelector((state) => state.auth.loginStatus);
  // local state
  const [isLoggedIn, setIsLoggedIn] = useState(authStatus);

  useEffect(() => {
    setIsLoggedIn(authStatus);
  }, [authStatus]);

  return (
    <div className="w-full flex flex-col items-center justify-center gap-[4rem]">
      {/* Welcome Text */}
      <div className="flex flex-col items-center justify-center leading-snug">
        <h2 className="font-light text-md-3">
          Keep your expenses in check with
        </h2>
        <h1 className="font-bold text-lg-3">
          <span className="text-accent">EXPENSE </span> TRACKER
        </h1>
      </div>
      {/* Login prompt */}
      {!isLoggedIn && (
        <p className="text-sm-1">
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
