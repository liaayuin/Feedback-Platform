import React from "react";
import {
  Home,
  Send,
  ThumbsUp,
  User,
  Repeat,
  MessageSquareText,
} from "../Assets/icons";

const Header = ({ currentPage, setPage, isAdmin }) => (
  <header className="bg-white shadow-lg fixed top-0 left-0 w-full z-10">
    <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
      <h1 className="text-2xl font-extrabold text-indigo-700 tracking-tight flex items-center">
        <Repeat className="inline-block mr-1 h-5 w-5 text-indigo-500" />
        <MessageSquareText className="inline-block mr-2 h-6 w-6" />
        Feedback Platform
      </h1>
      <nav className="flex space-x-6">
        <button
          onClick={() => setPage("home")}
          className={`nav-button ${currentPage === "home" ? "active" : ""}`}
        >
          <Home className="inline h-4 w-4 mr-1" /> Home
        </button>
        <button
          onClick={() => setPage("submit")}
          className={`nav-button ${currentPage === "submit" ? "active" : ""}`}
        >
          <Send className="inline h-4 w-4 mr-1" /> Give Feedback
        </button>
        <button
          onClick={() => setPage("view")}
          className={`nav-button ${currentPage === "view" ? "active" : ""}`}
        >
          <ThumbsUp className="inline h-4 w-4 mr-1" /> View Feedback
        </button>
        {isAdmin && (
          <button
            onClick={() => setPage("admin")}
            className={`nav-button ${
              currentPage === "admin" ? "admin-active" : ""
            }`}
          >
            <User className="inline h-4 w-4 mr-1" /> Admin Dashboard
          </button>
        )}
      </nav>
    </div>
  </header>
);

export default Header;
