import React from "react";
import { ThumbsUp, ThumbsDown, Mars, Venus, User } from "../Assets/icons";
import { handleVote as callHandleVoteApi } from "../utils/api";

const FeedbackCard = ({ entry, userId, setFeedbackList }) => {
  const {
    id,
    name,
    message,
    createdAt,
    upvotes,
    downvotes,
    voters,
    gender,
    company,
  } = entry;

  const displayName = name || "Anonymous";
  const hasVoted = voters.includes(userId);

  const upvoted = voters.includes(userId + "-up");
  const downvoted = voters.includes(userId + "-down");

  const handleVote = async (voteType) => {
    if (hasVoted) return;

    try {
      await callHandleVoteApi(id, voteType, userId);
    } catch (error) {
      console.error("Voting API failed:", error);
      return;
    }

    setFeedbackList((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              upvotes: item.upvotes + (voteType === "up" ? 1 : 0),
              downvotes: item.downvotes + (voteType === "down" ? 1 : 0),
              voters: [...item.voters, userId, userId + `-${voteType}`],
            }
          : item
      )
    );
  };

  let AvatarIcon = User;
  if (gender === "male") {
    AvatarIcon = Mars;
  } else if (gender === "female") {
    AvatarIcon = Venus;
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg flex items-start mb-4 border-l-4 border-indigo-400">
      <div className="mr-4 pt-1 flex-shrink-0 flex flex-col items-center">
        <AvatarIcon className="h-10 w-10 text-indigo-500" />
        {gender && gender !== "other" && (
          <span className="text-xs text-indigo-500 font-bold capitalize mt-1">
            {gender}
          </span>
        )}
      </div>

      <div className="flex-grow pr-4">
        {company && (
          <h3 className="text-base font-bold text-indigo-700 mb-2">
            Feedback on: {company}
          </h3>
        )}

        <p className="text-lg text-gray-800 italic mb-3">"{message}"</p>

        <p className="text-sm text-gray-500 font-medium">
          <span className="font-semibold text-gray-700">— {displayName}</span>
          <span className="ml-3 text-xs text-gray-400">
            {createdAt ? " • " + new Date(createdAt).toLocaleDateString() : ""}
          </span>
        </p>
      </div>

      <div className="flex flex-col items-center space-y-2 flex-shrink-0">
        <button
          onClick={() => handleVote("up")}
          disabled={hasVoted}
          className={`p-2 rounded-full transition duration-150 ${
            upvoted
              ? "bg-indigo-600 text-white"
              : "text-gray-400 hover:text-indigo-600 hover:bg-indigo-50"
          } disabled:opacity-50`}
        >
          <ThumbsUp className="h-5 w-5" />
        </button>

        <span className="text-base font-bold text-green-600">{upvotes} </span>

        <span className="text-base font-bold text-red-600">{downvotes}</span>

        <button
          onClick={() => handleVote("down")}
          disabled={hasVoted}
          className={`p-2 rounded-full transition duration-150 ${
            downvoted
              ? "bg-red-500 text-white"
              : "text-gray-400 hover:text-red-500 hover:bg-red-50"
          } disabled:opacity-50`}
        >
          <ThumbsDown className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default FeedbackCard;
