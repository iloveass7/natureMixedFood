import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { api } from "../config/api";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    district: "",
    division: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const registerHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords don't match");
      setLoading(false);
      return;
    }

    try {
      const { data } = await api.post("/user/register", {
        name: form.name,
        email: form.email,
        password: form.password,
        phone: form.phone,
        district: form.district,
        division: form.division
      });

      if (data.success) {
        localStorage.setItem("authToken", data.token);
        navigate("/login");
      } else {
        setError(data.message || "Registration failed");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen md:min-h-250 flex flex-col md:flex-row">
      {/* Left side with full logo and tagline - hidden on mobile */}
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

      {/* Right side - register form */}
      <div className="w-full md:w-1/2 min-h-screen flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-md md:max-w-2xl h-auto flex flex-col justify-center space-y-6 md:space-y-8 p-6 md:p-10 border border-green-400 shadow-lg md:shadow-2xl rounded-lg">
          <h2 className="text-center text-2xl md:text-3xl font-extrabold text-green-700">
            Create your account
          </h2>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-sm md:text-base">
              {error}
            </div>
          )}

          <form className="space-y-4 md:space-y-5" onSubmit={registerHandler}>
            <div>
              <label htmlFor="name" className="block text-base md:text-lg font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full px-3 py-2 md:px-4 md:py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 text-base md:text-lg"
                placeholder="John Doe"
                value={form.name}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-base md:text-lg font-medium text-gray-700 mb-1">
                Email address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-3 py-2 md:px-4 md:py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 text-base md:text-lg"
                placeholder="johndoe@example.com"
                value={form.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-base md:text-lg font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className="w-full px-3 py-2 md:px-4 md:py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 text-base md:text-lg"
                placeholder="+8801XXXXXXXXX"
                value={form.phone}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="district" className="block text-base md:text-lg font-medium text-gray-700 mb-1">
                District
              </label>
              <input
                type="text"
                id="district"
                name="district"
                className="w-full px-3 py-2 md:px-4 md:py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 text-base md:text-lg"
                placeholder="Your district"
                value={form.district}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="division" className="block text-base md:text-lg font-medium text-gray-700 mb-1">
                Division
              </label>
              <input
                type="text"
                id="division"
                name="division"
                className="w-full px-3 py-2 md:px-4 md:py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 text-base md:text-lg"
                placeholder="Your division"
                value={form.division}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-base md:text-lg font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                required
                minLength="8"
                className="w-full px-3 py-2 md:px-4 md:py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 text-base md:text-lg"
                placeholder="Minimum 8 characters"
                value={form.password}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-base md:text-lg font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                required
                className="w-full px-3 py-2 md:px-4 md:py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 text-base md:text-lg"
                placeholder="Confirm your password"
                value={form.confirmPassword}
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 text-base md:text-lg font-semibold text-white rounded-md transition flex justify-center items-center ${
                loading ? "bg-green-500 opacity-60 cursor-not-allowed" : "bg-green-700 hover:bg-amber-500"
              }`}
            >
              {loading ? (
                <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                "Register"
              )}
            </button>
          </form>

          <div className="text-center text-gray-600 text-base md:text-lg">
            <p>
              Already have an account?{" "}
              <button
                onClick={() => navigate('/login')}
                className="font-medium text-green-700 hover:text-amber-600"
              >
                Login
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;