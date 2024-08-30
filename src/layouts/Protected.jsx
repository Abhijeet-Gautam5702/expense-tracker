import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Protected({ authentication, children }) {
  const navigate = useNavigate();

  const authStatus = useSelector((state) => state.auth.loginStatus);

  useEffect(() => {
    // console.log(`useEffect of Protected | authStatus = ${authStatus}`)
    if (authentication && !authStatus) {
      navigate("/");
    }
  }, []);

  return <>{children}</>;
}

export default Protected;
