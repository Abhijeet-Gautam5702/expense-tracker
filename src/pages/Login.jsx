import React from "react";
import { useForm } from "react-hook-form";
import { Input, Button } from "../components";
import { Link } from "react-router-dom";

function Login() {
  const { register, handleSubmit } = useForm();

  const handleLogin = async () => {};

  return (
    <div className="mb-10 w-2/5 mx-auto flex flex-col items-center justify-start">
      {/* Headline */}
      <h1 className="text-primary font-medium text-lg-1 mb-10">
        Login to your account
      </h1>
      {/* Form */}
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="w-full flex flex-col justify-start items-center gap-4"
      >
        <Input
          type="email"
          label="Email"
          placeholder="e.g. abhijeetgautam@gmail.com"
          {...register("email", { required: true })}
        />
        <Input
          type="password"
          label="Password"
          placeholder="Enter your password"
          {...register("password", { required: true })}
        />
        <Button className="mt-4" buttonText="Enter the dashboard" />
      </form>
      {/* Baseline */}
      <p className="w-full mt-5 text-center">
        Don't have an account?{" "}
        <Link to="/signup" className="text-accent hover:underline">
          create a new account
        </Link>{" "}
      </p>
    </div>
  );
}

export default Login;
