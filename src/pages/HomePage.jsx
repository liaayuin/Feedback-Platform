import React from "react";
import FeedbackLoopLogo from "../common/FeedbackLoopLogo";
import AdminModal from "../components/AdminModal";
import { User } from "../Assets/icons";

const Home = ({
  isAdmin,
  setPage,
  showPasswordPrompt,
  setShowPasswordPrompt,
  passwordInput,
  setPasswordInput,
  handleAdminAccess,
  exitAdminMode,
  error,
}) => (
  <div className="text-center py-20 bg-gray-50 rounded-xl shadow-inner my-8">
    <FeedbackLoopLogo />
    <h2 className="text-5xl font-extrabold text-gray-900 mb-4">
      Customer Feedback System
    </h2>
    <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
      Your input is vital for us to improve. Share your thoughts, or see what
      others are saying and upvote the best ideas.
    </p>
    <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
      <button
        onClick={() => setPage("submit")}
        className="px-8 py-3 border border-transparent text-base font-medium rounded-full shadow-lg text-white bg-indigo-600 hover:bg-indigo-700 transition duration-300 transform hover:scale-105"
      >
        Get Started: Give Feedback
      </button>
      <button
        onClick={() => setPage("view")}
        className="px-8 py-3 border border-indigo-600 text-base font-medium rounded-full shadow-lg text-indigo-600 bg-white hover:bg-indigo-50 transition duration-300 transform hover:scale-105"
      >
        View Community Feedback
      </button>
    </div>
    <div className="mt-8 text-sm text-gray-500">
      {isAdmin ? (
        <p>
          <button
            onClick={exitAdminMode}
            className="underline text-red-500 hover:text-red-700 font-bold"
          >
            Exit Admin Mode
          </button>
        </p>
      ) : (
        <>
          <p>
            <button
              onClick={() => {
                setShowPasswordPrompt((prev) => !prev);
                setPasswordInput("");
              }}
              className="underline text-indigo-500 hover:text-indigo-700"
            >
              {showPasswordPrompt
                ? "Cancel Admin Login"
                : "Enter Admin Mode (Restricted)"}
            </button>
          </p>
          {showPasswordPrompt && (
            <AdminModal
              passwordInput={passwordInput}
              setPasswordInput={setPasswordInput}
              handleAdminAccess={handleAdminAccess}
              closeAdminModal={() => setShowPasswordPrompt(false)}
              error={error}
            />
          )}
        </>
      )}
    </div>
  </div>
);

export default Home;
