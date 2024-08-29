import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { Input, Button, Loader } from "../components";
import authService from "../appwrite/auth.js";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login as storeLogin } from "../store/authSlice/authSlice.js";

function Signup() {
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
      fullname: "",
      email: "",
      password: "",
    },
  });

  const handleSignup = async (data) => {
    clearErrors(); // clear all errors before submission
    setLoading(true);
    try {
      console.log("try block started");
      const session = await authService.userSignup({
        email: data.email,
        password: data.password,
        name: data.fullname,
      });
      if (session) {
        // console.log(session); // DEBUG

        // reset the form back to the default values
        reset();
        const userData = await authService.getLoggedInUser();

        // console.log(userData);//DEBUG

        if (userData) {
          // change authStatus of the store
          dispatch(storeLogin({ userData }));
        }
        // navigate to dashboard
        navigate("/dashboard", { replace: true });
      }
    } catch (error) {
      console.log(`User signup failed:: Error = ${error.message}`);
      // set error
      setError("root.serverError", {
        type: "manual",
        message: "User signup failed!",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" w-2/5 mx-auto flex flex-col items-center justify-start">
      {isLoading === true ? (
        <Loader />
      ) : (
        <>
          {/* Headline */}
          <h1 className="text-primary font-medium text-lg-1 mb-8">
            Create a new account
          </h1>
          {/* Form */}
          <form
            onSubmit={handleSubmit(handleSignup)}
            className="w-full flex flex-col justify-start items-center gap-4"
          >
            {/* Error display */}
            {errors.root && (
              <p className="font-regular text-danger ">
                {errors.root.serverError.message}
              </p>
            )}
            <Input
              type="text"
              label="Full name"
              placeholder="e.g. Abhijeet Gautam"
              {...register("fullname", { required: true })}
            />
            <Input
              type="email"
              label="Email"
              placeholder="e.g. abhijeetgautam@gmail.com"
              {...register("email", { required: true })}
            />
            <Input
              type="password"
              label="Password"
              placeholder="Prefer setting a strong password"
              {...register("password", { required: true })}
            />
            <Button
              disabled={isSubmitting ? true : false}
              className="mt-4"
              type="submit"
              buttonText="Create account"
            />
          </form>
          {/* Baseline */}
          <p className="w-full mt-5 text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-accent hover:underline">
              login
            </Link>{" "}
          </p>
        </>
      )}
    </div>
  );
}

export default Signup;
