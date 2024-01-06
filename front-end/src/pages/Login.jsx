import React, { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { doSignInWithEmailAndPassword } from "../firecase/FirebaseFunction";

function Login() {
  const { currentUser } = useContext(AuthContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    let { email, password } = event.target.elements;

    try {
      await doSignInWithEmailAndPassword(email.value, password.value);
    } catch (error) {
      alert(
        "Invalid email or password. Please check your credentials and try again."
      );
    }
  };

  if (currentUser) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex item-center h-full m-20">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-md ring-2 ring-gray-800/50 lg:max-w-lg">
        <h1 className="text-3xl font-semibold text-center text-gray-700">
          Login
        </h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="label">
              <span className="text-base label-text">Email</span>
            </label>
            <input
              id="email"
              className="w-full input input-bordered"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="Email Address"
              maxLength="30"
              autoFocus
            />
          </div>
          <div>
            <label className="label">
              <span className="text-base label-text">Password</span>
            </label>
            <input
              id="password"
              className="w-full input input-bordered"
              name="password"
              type="password"
              autoComplete="password"
              placeholder="Enter Password"
              maxLength="30"
              autoFocus
            />
          </div>
          <a
            href="#"
            className="text-xs text-gray-600 hover:underline hover:text-blue-600"
          >
            Forget Password?
          </a>
          <div>
            <button className="btn btn-block" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
