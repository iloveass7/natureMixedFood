import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    phone: "",
    district: "",
    division: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:8000/api/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        const u = response.data.user;
        setUser(u);
        setFormData({
          name: u.name,
          password: "",
          phone: u.phone || "",
          district: u.district || "",
          division: u.division || "",
        });
      } else {
        console.log("Unauthorized or failed");
      }
    } catch (error) {
      console.error("Failed to fetch profile", error);
    }
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    setMessage("");
    if (user) {
      setFormData({
        name: user.name,
        password: "",
        phone: user.phone || "",
        district: user.district || "",
        division: user.division || "",
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        "http://localhost:8000/api/edit",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        await fetchProfile(); // re-fetch to update local state
        setIsEditing(false);
        setMessage("Profile updated successfully!");
      } else {
        setMessage("Failed to update profile.");
      }
    } catch (error) {
      console.error("Update error:", error);
      setMessage(
        error.response?.data?.message || "An error occurred during update."
      );
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
        <div className="max-w-3xl w-full bg-white h-150 p-18 rounded-lg shadow-md text-center flex flex-col justify-center items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 mx-auto text-green-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
          <h2 className="mt-4 mb-4 text-2xl font-medium text-gray-900">
            Login Required
          </h2>
          <p className="mt-2 text-gray-600">
            Please login to view your profile
          </p>
          <button
            onClick={() => navigate("/login")}
            className="mt-6 w-2xl flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-700 hover:bg-amber-400 focus:outline-none"
          >
            Go to Login
          </button>
          <p className="mt-6 text-sm text-gray-500">
            Don't have an account?{" "}
            <button
              onClick={() => navigate("/register")}
              className="font-medium text-green-700 hover:text-amber-400"
            >
              Register here
            </button>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-6 bg-gradient-to-br from-white to-green-100 flex justify-center items-center p-4">
      <div className="mx-45 w-full max-w-8xl my-6 pb-4 bg-white rounded-3xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-green-800 px-6 py-8 flex flex-col justify-center">
          <h1 className="text-[2rem] sm:text-[2.5rem] font-bold text-amber-400 px-5">
            Welcome, {user.name}
          </h1>
          <p className="text-white text-xl sm:text-2xl font-semibold mt-2 px-5">
            {new Date().toDateString()}
          </p>
        </div>

        {/* Profile Section */}
        <div className="px-6 sm:px-10 py-10 flex flex-col lg:flex-row items-center lg:items-start gap-6 lg:gap-10">
          <img
            src="https://iili.io/HPz3fFn.png"
            alt="User"
            className="w-28 h-28 sm:w-36 sm:h-36 rounded-full object-cover shadow"
          />

          <div className="text-center lg:text-left flex-1 py-4 lg:py-7 px-2 lg:px-3">
            <h2 className="text-2xl sm:text-3xl font-bold text-green-700 mb-2">
              {user.name}
            </h2>
            <p className="text-gray-500 text-lg">{user.email}</p>
          </div>

          <div className="lg:ml-auto mt-4 lg:mt-6">
            <button
              className="bg-green-700 hover:bg-amber-400 text-white text-lg font-semibold px-6 py-2 rounded transition"
              onClick={handleEditToggle}
            >
              {isEditing ? "Cancel" : "Edit"}
            </button>
          </div>
        </div>

        {/* Editable Form */}
        {isEditing && (
          <form
            onSubmit={handleSubmit}
            className="px-6 sm:px-10 pb-10 grid grid-cols-1 md:grid-cols-2 gap-6 text-green-700"
          >
            <InputField
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            <InputField
              label="New Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
            />
            <InputField
              label="Phone Number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
            <InputField
              label="District"
              name="district"
              value={formData.district}
              onChange={handleChange}
            />
            <InputField
              label="Division"
              name="division"
              value={formData.division}
              onChange={handleChange}
            />
            <div className="md:col-span-2 flex justify-end mt-4">
              <button
                type="submit"
                className="bg-green-700 hover:bg-amber-400 text-white text-lg font-semibold px-6 py-2 rounded transition disabled:opacity-50"
                disabled={loading}
              >
                {loading ? "Updating..." : "Save Changes"}
              </button>
            </div>
            {message && (
              <p className="col-span-2 text-center text-red-600 font-semibold">
                {message}
              </p>
            )}
          </form>
        )}

        {/* Static Info */}
        {!isEditing && (
          <div className="px-6 sm:px-10 pb-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-green-700">
              <InputField label="Full Name" value={user.name} readOnly />
              <InputField label="Phone Number" value={user.phone || "N/A"} readOnly />
              <InputField label="District" value={user.district || "N/A"} readOnly />
              <InputField label="Division" value={user.division || "N/A"} readOnly />
              <div className="md:col-span-2">
                <InputField label="Email Address" value={user.email} readOnly />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const InputField = ({
  label,
  name,
  value,
  onChange,
  readOnly = false,
  type = "text",
}) => (
  <div>
    <label className="block text-lg font-medium text-green-700 mb-2">
      {label}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      readOnly={readOnly}
      className={`w-full border border-green-800 rounded px-4 py-3 text-gray-700 bg-gray-100 focus:outline-none ${!readOnly ? "bg-white" : ""
        }`}
    />
  </div>
);

export default Profile;
