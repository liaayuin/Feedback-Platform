import React, { useState, useEffect, useCallback } from "react";
import Header from "./common/Header";
import Home from "./pages/HomePage";
import "./index.css";
import SubmitFeedback from "./pages/SubmitFeedback";
import ViewFeedback from "./pages/ViewFeedback";
import AdminDashboard from "./pages/AdminDashboardPage";
import { fetchAllFeedback } from "./utils/api";

const App = () => {
  const [page, setPage] = useState("home");
  const [userId] = useState(crypto.randomUUID());
  const [feedbackList, setFeedbackList] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const ADMIN_PASSWORD = "gudayadmin";

  const loadFeedbackData = useCallback(async () => {
    try {
      const allFeedback = await fetchAllFeedback();

      allFeedback.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

      setFeedbackList(allFeedback);
    } catch (error) {
      console.error("Failed to load feedback data:", error);
    }
  }, []);

  useEffect(() => {
    loadFeedbackData();
  }, [loadFeedbackData]);

  const handleAdminAccess = () => {
    const errorElement = document.getElementById("password-error");
    if (errorElement) errorElement.textContent = "";
    if (passwordInput === ADMIN_PASSWORD) {
      setIsAdmin(true);
      setPage("admin");
      setShowPasswordPrompt(false);
      setPasswordInput("");
      loadFeedbackData();
    } else {
      if (errorElement)
        errorElement.textContent = "Incorrect password. Access denied.";
      setPasswordInput("");
    }
  };

  const exitAdminMode = () => {
    setIsAdmin(false);
    setPage("home");
    setShowPasswordPrompt(false);
    setPasswordInput("");
    loadFeedbackData();
  };

  let content;
  switch (page) {
    case "submit":
      content = <SubmitFeedback setFeedbackList={setFeedbackList} />;
      break;
    case "view":
      content = (
        <ViewFeedback
          feedbackList={feedbackList}
          userId={userId}
          setFeedbackList={setFeedbackList}
        />
      );
      break;
    case "admin":
      content = isAdmin ? (
        <AdminDashboard
          feedbackList={feedbackList}
          setFeedbackList={setFeedbackList}
          refetchFeedback={loadFeedbackData}
        />
      ) : (
        <div className="text-center p-10 mt-8 bg-red-50 border border-red-300 rounded-xl text-red-600 shadow-lg">
          <h2 className="text-xl font-bold">Access Denied</h2>
          <p>You do not have permission to view the Admin Dashboard.</p>
        </div>
      );
      break;
    default:
      content = (
        <Home
          isAdmin={isAdmin}
          setPage={setPage}
          showPasswordPrompt={showPasswordPrompt}
          setShowPasswordPrompt={setShowPasswordPrompt}
          passwordInput={passwordInput}
          setPasswordInput={setPasswordInput}
          handleAdminAccess={handleAdminAccess}
          exitAdminMode={exitAdminMode}
        />
      );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20 px-4 sm:px-6 lg:px-8">
      <Header currentPage={page} setPage={setPage} isAdmin={isAdmin} />
      {content}
    </div>
  );
};

export default App;
