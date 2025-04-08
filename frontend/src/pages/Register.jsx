import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserData } from "../context/UserContext";
import { LoadingAnimation } from "../components/Loading";
import { TrailData } from "../context/TrailContext";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const { registerUser , btnLoading } = UserData();
  const navigate = useNavigate();

  const { fetchTrails } = TrailData();

  const submitHandler = (e) => {
    e.preventDefault();
    registerUser(name, email, password, navigate, fetchTrails);
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-center items-center mb-4">
          <img
            className="h-12"
            src="https://www.iconarchive.com/download/i103380/paomedia/small-n-flat/device-camera.1024.png"
            alt="SnapTrail"
          />
          {/* <h1 className='font-semibold text-red-500'>SNAPTRAIL</h1> */}
        </div>
        <h2 className="text-2xl font-semibold text-center mb-6">
          Register on Snaptrail
        </h2>
        <form onSubmit={submitHandler}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              className="common-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="common-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="common-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="common-btn" disabled={btnLoading}>
            {btnLoading ? <LoadingAnimation /> : "Register"}
          </button>
        </form>
        <div className="mt-4 text-center">
          <div className="relative mb-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white p-2 text-gray-500">OR</span>
            </div>
          </div>
          <div className="mt-4 text-center text-sm">
            <span>
              Already have an account ?
              <Link
                to="/login"
                className="font-medium hover:underline text-blue-600"
              >
                Login
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
