import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Input, Button, Loader } from "../components";
import { Link } from "react-router-dom";
import authService from "../appwrite/auth.js";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login as storeLogin } from "../store/authSlice/authSlice.js";

function Login() {
  // local state
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authStatus = useSelector((state) => state.auth.loginStatus);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    clearErrors,
    setError,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLogin = async (data) => {
    clearErrors();
    setLoading(true);
    try {
      const session = await authService.userLogin({
        email: data.email,
        password: data.password,
      });
      if (session) {
        // console.log("session = ", session); // DEBUG

        // reset the form back to the default values
        reset();

        const userData = await authService.getLoggedInUser();

        // console.log(userData); // DEBUG

        if (userData) {
          // change authStatus of the store
          dispatch(storeLogin({ userData }));
        }
        // navigate to dashboard
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(`User login failed:: Error = ${error.message}`);
      // set error
      setError("root.serverError", {
        type: "manual",
        message: "User login failed!",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" lg:mb-10  lg:w-2/5 mx-auto flex flex-col items-center justify-start md:w-3/5 md:mb-0">
      {loading === true ? (
        <Loader />
      ) : (
        <>
          {/* Headline */}
          <h1 className="text-primary font-medium text-lg-1 mb-10 md:mb-7">
            Login to your account
          </h1>
          {/* Form */}
          <form
            onSubmit={handleSubmit(handleLogin)}
            className="w-full flex flex-col justify-start items-center gap-4"
          >
            {/* Error display */}
            {errors.root && (
              <p className="font-regular text-danger ">
                {errors.root.serverError.message}
              </p>
            )}
            <Input
              type="email"
              label="Email"
              placeholder="Enter your e-mail"
              {...register("email", { required: true })}
            />
            <Input
              type="password"
              label="Password"
              placeholder="Enter your password"
              {...register("password", { required: true })}
            />
            <Button
              disabled={isSubmitting ? true : false}
              type="submit"
              className="mt-4"
              buttonText="Enter the dashboard"
            />
          </form>
          {/* Baseline */}
          <p className="w-full mt-5 text-center">
            Don't have an account?{" "}
            <Link to="/signup" className="text-accent hover:underline">
              create a new account
            </Link>{" "}
          </p>
        </>
      )}
    </div>
  );
}

export default Login;
