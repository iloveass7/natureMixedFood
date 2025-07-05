import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const loginHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { data } = await axios.post(
        "http://localhost:8000/api/user/login",
        {
          email,
          password,
        }
      );

      if (data.success) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userData", JSON.stringify(data.user));
        navigate("/");
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Add guest login functionality
  const guestHandler = () => {
    const guestUser = {
      id: "guest",
      name: "Guest",
      profileImage: "",
      token: "",
      isGuest: true,
      cartData: {},
    };
    localStorage.setItem("userData", JSON.stringify(guestUser));
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-2xl py-32 w-full space-y-10 bg-white p-8 rounded-lg border border-gren-800 shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-[1.7rem] font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}
        <form
          className="border-transparent mt-8 space-y-6"
          onSubmit={loginHandler}
        >
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-lg font-medium text-gray-700 mb-1"
              >
                Email address
              </label>
              <input
                type="email"
                id="email"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-green-400 focus:border-green-400 focus:z-10 sm:text-sm"
                placeholder="johndoe@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-lg font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-green-400 focus:border-green-400 focus:z-10 sm:text-sm"
                placeholder="Top secret"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-lg font-medium rounded-md text-white bg-green-700 hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </div>
        </form>

        <div className="text-center text-lg text-gray-600">
          <p>
            Don't have an account?{" "}
            <button
              onClick={() => navigate("/register")}
              className="font-medium text-green-700 hover:text-amber-600 cursor-pointer"
            >
              Register
            </button>{" "}
            or{" "}
            <button
              onClick={guestHandler}
              className="font-medium text-amber-500 hover:text-green-400  cursor-pointer"
            >
              Continue as guest
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
export default Login;