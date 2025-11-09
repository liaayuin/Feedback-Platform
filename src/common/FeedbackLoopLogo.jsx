import React from "react";
import { Repeat, MessageCircle } from "../Assets/icons";

const FeedbackLoopLogo = () => (
  <div className="relative mx-auto w-24 h-24 mb-6">
    <Repeat
      className="w-full h-full text-indigo-500 opacity-60 absolute"
      strokeWidth={1}
    />
    <MessageCircle
      className="w-1/2 h-1/2 text-indigo-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      fill="currentColor"
    />
  </div>
);

export default FeedbackLoopLogo;
