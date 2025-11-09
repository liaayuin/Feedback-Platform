import React from "react";
import FeedbackCard from "../components/FeedbackCard";
import { MessageSquareText } from "../Assets/icons";

const ViewFeedback = ({ feedbackList, userId, setFeedbackList }) => {
  const approvedFeedback = feedbackList.filter(
    (entry) => entry.status === "approved"
  );

  return (
    <div className="mt-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2">
        Community Voices ({approvedFeedback.length} total)
      </h2>
      <p id="vote-message" className="text-red-500 text-center mb-4"></p>
      <div className="space-y-4">
        {approvedFeedback.length > 0 ? (
          approvedFeedback.map((entry) => (
            <FeedbackCard
              key={entry.id}
              entry={entry}
              userId={userId}
              setFeedbackList={setFeedbackList}
            />
          ))
        ) : (
          <div className="text-center p-12 bg-gray-100 rounded-xl text-gray-500">
            <MessageSquareText className="h-8 w-8 mx-auto mb-3" />
            <p>No public feedback yet. Submit yours or check back later!</p>
          </div>
        )}
      </div>
      <div className="mt-6 text-sm text-gray-500">
        <p>
          User ID for Voting (Mock):{" "}
          <span className="font-mono text-xs bg-gray-200 p-1 rounded">
            {userId}
          </span>
        </p>
      </div>
    </div>
  );
};

export default ViewFeedback;
