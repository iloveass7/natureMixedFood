import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Oval } from "react-loader-spinner";

const AdminLogin = () => {
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
      const { data } = await axios.post("http://localhost:8000/api/admin/login", {
        email,
        password,
      });

      if (data.success) {
        localStorage.setItem("adminToken", data.token);
        navigate("/admin");
      } else {
        setError(data.message || "Admin login failed");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
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

      {/* Right side - admin login form */}
<div className="w-full md:w-1/2 min-h-screen flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-md md:max-w-2xl h-170 md:h-170 flex flex-col justify-center space-y-6 md:space-y-12 p-6 md:p-14 border border-red-500 shadow-lg md:shadow-2xl rounded-lg">
          <h2 className="text-center text-2xl md:text-3xl font-extrabold text-red-700">
            Admin Login
          </h2>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-sm md:text-base">
              {error}
            </div>
          )}

          <form className="space-y-4 md:space-y-6" onSubmit={loginHandler}>
            <div>
              <label htmlFor="email" className="block text-base md:text-lg font-medium text-gray-700 mb-1">
                Admin Email
              </label>
              <input
                type="email"
                id="email"
                required
                className="w-full px-3 py-2 md:px-4 md:py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 text-base md:text-lg"
                placeholder="admin@example.com"
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
                placeholder="Super secret"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 text-base md:text-lg font-semibold text-white rounded-md transition flex justify-center items-center ${
                loading ? "bg-red-600 opacity-60 cursor-not-allowed" : "bg-red-600 hover:bg-amber-500"
              }`}
              style={{ minHeight: "44px" }}
            >
              {loading ? (
                <Oval
                  height={24}
                  width={24}
                  color="#ffffff"
                  visible={true}
                  ariaLabel="oval-loading"
                  secondaryColor="#ffffff"
                  strokeWidth={6}
                  strokeWidthSecondary={6}
                />
              ) : (
                "Admin Login"
              )}
            </button>
          </form>

          {/* <div className="text-center text-gray-600 text-base md:text-lg">
            <button
              onClick={() => navigate("/login")}
              className="font-medium text-red-500 hover:text-amber-600"
            >
              Go back to User Login
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;