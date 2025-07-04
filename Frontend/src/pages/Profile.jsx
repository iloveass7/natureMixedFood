import React from 'react';

export const Profile = () => {
  return (
    <div className="mb-6 bg-gradient-to-br from-white to-green-100 flex justify-center items-center p-4">
      <div className="mx-45 w-full max-w-8xl my-6 pb-4 bg-white rounded-3xl shadow-lg overflow-hidden">
        
        {/* Top Accent Header */}
        <div className="bg-green-800 px-6 py-8 flex flex-col justify-center">
          <h1 className="text-[2rem] sm:text-[2.5rem] font-bold text-amber-400 px-5">Welcome, Alexa</h1>
          <p className="text-white text-xl sm:text-2xl font-semibold mt-2 px-5">Tue, 07 June 2022</p>
        </div>

        {/* Profile Info Section */}
        <div className="px-6 sm:px-10 py-10 flex flex-col lg:flex-row items-center lg:items-start gap-6 lg:gap-10">
          <img
            src="https://randomuser.me/api/portraits/women/44.jpg"
            alt="User"
            className="w-28 h-28 sm:w-36 sm:h-36 rounded-full object-cover shadow"
          />

          <div className="text-center lg:text-left flex-1 py-4 lg:py-7 px-2 lg:px-3">
            <h2 className="text-2xl sm:text-3xl font-bold text-green-700 mb-2">Alexa Rawles</h2>
            <p className="text-gray-500 text-lg">alexarawles@gmail.com</p>
          </div>

          {/* Edit Button - adjusts position on small screens */}
          <div className="lg:ml-auto mt-4 lg:mt-6">
            <button className="bg-green-700 hover:bg-amber-400 text-white text-lg font-semibold px-6 py-2 rounded transition">
              Edit
            </button>
          </div>
        </div>

        {/* Form Fields Section */}
        <div className="px-6 sm:px-10 pb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-green-700">
            <InputField label="Full Name" />
            <InputField label="Phone Number" />
            <InputField label="Email Address" />
            <InputField label="District" />
            <InputField label="Division" />
            <InputField label="Blood Group" />
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable Input Field
const InputField = ({ label }) => (
  <div>
    <label className="block text-lg font-medium text-green-700 mb-2">{label}</label>
    <input
      type="text"
      placeholder="Enter here"
      className="w-full border border-green-800 rounded px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400 hover:bg-green-50"
    />
  </div>
);
