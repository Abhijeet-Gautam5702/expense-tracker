import React, { useEffect, useState } from "react";
import Logo from "./Logo";
import { useDispatch, useSelector } from "react-redux";
import { logout as storeLogout } from "../../store/authSlice/authSlice";
import { NavLink, useNavigate } from "react-router-dom";
import authService from "../../appwrite/auth";
import { deleteAllExpenses } from "../../store/expenseSlice/expenseSlice";
import Loader from "../Loader";

function Header() {
  const authStatus = useSelector((state) => state.auth.loginStatus);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // local state
  const [navItems, setNavItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // change the navItems whenever authStatus changes
  useEffect(() => {
    setNavItems([
      {
        name: "Home",
        path: "/",
        active: true,
      },
      {
        name: "Dashboard",
        path: "/dashboard",
        active: true,
      },
      {
        name: "Signup",
        path: "/signup",
        active: !authStatus,
      },
      {
        name: "Login",
        path: "/login",
        active: !authStatus,
      },
      {
        name: "All Expenses",
        path: "/all-expenses",
        active: authStatus,
      },
      {
        name: "Add Expense",
        path: "/add-expense",
        active: authStatus,
      },
    ]);
    // Artifically giving a delay of 2s
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, [authStatus]);

  const handleLogout = async () => {
    try {
      const response = await authService.userLogout();
      if (response) {
        dispatch(storeLogout());
        dispatch(deleteAllExpenses());
      }

      navigate("/");
    } catch (error) {
      console.log(`User logout failed:: Error = ${error.message}`);
    }
  };

  return (
    <div
      className={` ${
        isLoading ? "opacity-0" : ""
      } w-full flex flex-row justify-between items-center gap-5 p-4 transition-all duration-150`}
    >
      {/* Logo */}
      <div className="min-w-[132px]">
        <Logo />
      </div>
      {/* Nav Items */}
      <div className="flex-grow flex flex-row justify-end items-center gap-3">
        {navItems.map((item) => {
          if (item.active) {
            return (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) => {
                  let styles =
                    "text-sm-1 px-4 py-2 transition-all  duration-100 ";

                  if (isActive) {
                    styles += "border-b-[3px] border-b-accent text-accent";
                  } else {
                    styles += " text-primary bg-background hover:scale-110";
                  }

                  return styles;
                }}
              >
                {item.name}
              </NavLink>
            );
          }
        })}
      </div>
      {/* Logout Button */}
      {authStatus && (
        <div
          className="px-4 py-2 text-sm-0 text-background bg-accent rounded-small cursor-pointer hover:bg-accent/90"
          onClick={handleLogout}
        >
          Logout
        </div>
      )}
    </div>
  );
}

export default Header;
