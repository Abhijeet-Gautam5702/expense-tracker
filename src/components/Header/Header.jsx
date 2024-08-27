import React, { useEffect, useState } from "react";
import Logo from "./Logo";
import LogoutButton from "./LogoutButton";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

function Header() {
  const authStatus = useSelector((state) => state.auth.loginStatus);

  // local state
  const [navItems, setNavItems] = useState([
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
      name: "Dashboard",
      path: "/dashboard",
      active: authStatus,
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
    {
      name: "Edit Expense",
      path: "/edit-expense",
      active: authStatus,
    },
  ]);

  // change the navItems whenever authStatus changes
  useEffect(() => {
    setNavItems([
      {
        name: "Home",
        path: "/",
        active: !authStatus,
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
        name: "Dashboard",
        path: "/dashboard",
        active: authStatus,
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
      {
        name: "Edit Expense",
        path: "/edit-expense",
        active: authStatus,
      },
    ]);
  }, [authStatus]);

  return (
    <div className="w-full flex flex-row justify-between items-center gap-5 p-4 ">
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
                  let styles = "text-sm-1 px-4 py-2 transition-all  duration-100 ";

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
          className="px-4 py-2 rounded-med bg-background text-primary"
          onClick={() => {}}
        >
          Logout
        </div>
      )}
    </div>
  );
}

export default Header;
