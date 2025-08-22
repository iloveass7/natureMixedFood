import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { api } from "../config/api";

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
    const { data } = await api.post("/user/login", {
      email,
      password,
    });

    if (data.success) {
      // Store all user data in localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("userData", JSON.stringify({
        _id: data.user._id,
        name: data.user.name,
        email: data.user.email,
        phone: data.user.phone || "",
        district: data.user.district || "",
        division: data.user.division || "",
        cartData: data.user.cartData || {},
        isGuest: false
      }));
      navigate("/");
    } else {
      setError(data.message || "Login failed");
    }
  } catch (err) {
    setError(err.response?.data?.message || "Login failed. Please try again.");
  } finally {
    setLoading(false);
  }
};

const guestHandler = () => {
  // Store minimal guest data in localStorage
  localStorage.setItem("userData", JSON.stringify({
    id: "guest",
    name: "Guest",
    email: "",
    phone: "",
    district: "",
    division: "",
    cartData: {},
    isGuest: true
  }));
  navigate("/");
};

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side with logo and tagline (hidden on small screens) */}
      <div className="hidden md:flex w-full md:w-2/3 bg-gradient-to-br from-green-800 to-white flex-col items-center justify-center p-4">
        <img
          src="/logo.png"
          alt="Logo"
          className="w-60 md:w-90 h-auto md:h-90 object-contain mb-6 md:mb-10"
        />
        <p
          className="text-white text-2xl md:text-[2.9rem] font-bold tracking-wide drop-shadow-lg text-center px-4"
          style={{
            WebkitTextStroke: "1px black",
            WebkitTextFillColor: "white",
          }}
        >
          Nature Mixed Food
        </p>
      </div>

      {/* Right side - Login form */}
      <div className="w-full md:w-1/2 flex items-center justify-center min-h-screen p-4 md:p-8">
        <div className="w-full h-170 max-w-md md:max-w-2xl flex flex-col justify-center space-y-10 md:space-y-15 p-6 md:p-14 border border-green-400 shadow-lg md:shadow-2xl rounded-lg bg-white">
          <h2 className="text-center text-2xl md:text-3xl font-extrabold text-green-700">
            Sign in to your account
          </h2>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-sm md:text-base">
              {error}
            </div>
          )}

          <form className="space-y-4 md:space-y-6" onSubmit={loginHandler}>
            <div>
              <label htmlFor="email" className="block text-base md:text-lg font-medium text-gray-700 mb-1">
                Email address
              </label>
              <input
                type="email"
                id="email"
                required
                className="w-full px-3 py-2 md:px-4 md:py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 text-base md:text-lg"
                placeholder="johndoe@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-base md:text-lg font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                required
                className="w-full px-3 py-2 md:px-4 md:py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 text-base md:text-lg"
                placeholder="Top secret"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 text-base md:text-lg font-semibold text-white rounded-md transition flex justify-center items-center ${loading
                  ? "bg-green-500 opacity-60 cursor-not-allowed"
                  : "bg-green-700 hover:bg-amber-500"
                }`}
              style={{ minHeight: "44px" }}
            >
              {loading ? (
                <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                "Sign in"
              )}
            </button>

          </form>

          <div className="text-center text-gray-600 text-base md:text-lg">
            <p>
              Don't have an account?{" "}
              <button
                onClick={() => navigate("/register")}
                className="font-medium text-green-700 hover:text-amber-600"
              >
                Register
              </button>{" "}
              or{" "}
              <button
                onClick={guestHandler}
                className="font-medium text-amber-500 hover:text-green-400"
              >
                Continue as guest
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
