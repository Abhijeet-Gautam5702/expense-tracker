import React, { useEffect, useState } from "react";
import Logo from "./Logo";
import { useDispatch, useSelector } from "react-redux";
import { logout as storeLogout } from "../../store/authSlice/authSlice";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import authService from "../../appwrite/auth";
import { deleteAllExpenses } from "../../store/expenseSlice/expenseSlice";

function Header() {
  const authStatus = useSelector((state) => state.auth.loginStatus);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  // console.log(location);

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
    // Artifically giving a delay of 2s if the user is currently on Home Page
    if (location.pathname === "/") {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    } else {
      setIsLoading(false);
    }
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
      } w-full flex flex-row justify-between items-center lg:gap-5 p-4 pb-0 md:pb-4 transition-all duration-150 md:gap-3 md:p-3 flex-wrap relative border-b-[1px] border-b-tertiary`}
    >
      {/* Logo */}
      <div className={`min-w-[132px] transition-all duration-150 w-full md:w-fit ${authStatus ? "w-fit" : ""}`}>
        <Logo
        className={authStatus ? "" : "text-center"}
        />
      </div>
      {/* Nav Items */}
      <div className="mt-1 w-full md:w-fit lg:flex-grow flex flex-row md:justify-end justify-between items-center lg:gap-3 md:gap-2">
        {navItems.map((item) => {
          if (item.active) {
            return (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) => {
                  let styles =
                    " text-sm-0 lg:text-sm-1 lg:px-4 py-2 transition-all  duration-100 md:px-2 ";

                  if (isActive) {
                    styles += " border-b-[3px] border-b-accent text-accent";
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
          className=" absolute top-4 right-3 px-4 md:relative md:top-0 md:right-0  lg:px-4 py-2 text-[10px]  md:text-sm-0 text-background bg-accent rounded-small cursor-pointer hover:bg-accent/90 md:px-3 transition-all duration-150"
          onClick={handleLogout}
        >
          Logout
        </div>
      )}
    </div>
  );
}

export default Header;
