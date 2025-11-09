import React from "react";
import { ThumbsUp, User } from "../Assets/icons";

import { updateFeedbackStatusApi } from "../utils/api";

const AdminDashboard = ({ feedbackList, setFeedbackList, refetchFeedback }) => {
  const pendingFeedback = feedbackList.filter(
    (entry) => entry.status === "pending"
  );

  const updateFeedbackStatus = async (entryId, newStatus) => {
    try {
      await updateFeedbackStatusApi(entryId, newStatus);

      await refetchFeedback();

      const msg = document.getElementById("admin-message");
      if (msg) {
        msg.textContent = `Feedback ${entryId} marked as ${newStatus}.`;
        setTimeout(() => (msg.textContent = ""), 4000);
      }
    } catch (error) {
      console.error("Admin status update failed:", error);
    }
  };

  return (
    <div className="mt-8">
      <h2 className="text-3xl font-bold text-red-700 mb-6 border-b pb-2 flex items-center">
        <User className="h-6 w-6 mr-2" /> Admin Review Dashboard
      </h2>
      <p id="admin-message" className="text-red-500 text-center mb-4"></p>
      <div className="text-lg font-medium text-gray-700 mb-4">
        Pending Items:{" "}
        <span className="text-red-600 font-extrabold">
          {pendingFeedback.length}
        </span>
      </div>
      <div className="space-y-4">
        {pendingFeedback.length > 0 ? (
          pendingFeedback.map((entry) => (
            <div
              key={entry.id}
              className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-red-400 flex flex-col sm:flex-row justify-between items-start sm:items-center"
            >
              <div className="flex-grow pr-4 mb-4 sm:mb-0">
                <p className="text-lg text-gray-800 italic mb-2">
                  "{entry.message}"
                </p>
                <p className="text-sm text-gray-500">
                  Submitted by: {entry.name || "Anonymous"}
                  <span className="ml-3 text-xs">
                    {entry.createdAt
                      ? " • " + new Date(entry.createdAt).toLocaleString()
                      : ""}
                  </span>
                </p>
              </div>
              <div className="flex space-x-2 flex-shrink-0">
                <button
                  onClick={() => updateFeedbackStatus(entry.id, "approved")}
                  className="px-4 py-2 bg-green-500 text-white text-sm font-medium rounded-full shadow-md hover:bg-green-600 transition duration-150"
                >
                  <ThumbsUp className="h-4 w-4 inline-block mr-1" /> Approve
                </button>
                <button
                  onClick={() => updateFeedbackStatus(entry.id, "rejected")}
                  className="px-4 py-2 bg-gray-500 text-white text-sm font-medium rounded-full shadow-md hover:bg-gray-600 transition duration-150"
                >
                  Reject
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center p-12 bg-green-50 rounded-xl text-green-700">
            <ThumbsUp className="h-8 w-8 mx-auto mb-3" />
            <p>No pending feedback to review. Great job!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
