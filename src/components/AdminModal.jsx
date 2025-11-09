import React, { useState, useEffect } from "react";
import { X, Lock } from "react-feather";

const AdminModal = ({
  passwordInput,
  setPasswordInput,
  handleAdminAccess,
  closeAdminModal,
  error,
}) => {
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimateIn(true), 10);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm p-4 transition-opacity duration-300"
      onClick={(e) => {
        if (e.target.classList.contains("bg-opacity-60")) {
          closeAdminModal();
        }
      }}
    >
      <div
        className={`bg-white p-6 rounded-xl shadow-2xl w-full max-w-sm relative transform transition-all duration-300 ease-out ${
          animateIn ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        <button
          onClick={closeAdminModal}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 transition"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col items-center">
          <Lock className="w-8 h-8 text-indigo-600 mb-3" />
          <h3 className="text-xl font-bold text-gray-900 mb-4">Admin Login</h3>
          <p className="text-sm text-gray-500 mb-5 text-center">
            Access restricted administrative features.
          </p>
        </div>

        <label className="block text-gray-700 text-sm font-semibold mb-2 text-left">
          Secret Password:
        </label>
        <input
          type="password"
          value={passwordInput}
          onChange={(e) => setPasswordInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleAdminAccess()}
          className={`w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ${
            error ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Enter secret key..."
          aria-describedby="password-error"
        />

        <p
          id="password-error"
          className="text-red-500 text-xs italic h-4 mt-1 text-left"
        >
          {error}
        </p>

        <button
          onClick={handleAdminAccess}
          disabled={!passwordInput}
          className="w-full mt-5 px-4 py-2 border border-transparent text-base font-medium rounded-lg shadow-md text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 transition duration-300"
        >
          Grant Access
        </button>
      </div>
    </div>
  );
};

export default AdminModal;
