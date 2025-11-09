import React, { useState } from "react";
import { User, Mail } from "../Assets/icons";
import { postFeedback } from "../utils/api";

const SubmitFeedback = ({ setFeedbackList }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    gender: "other",
    company: "",
    message: "",
  });
  const [status, setStatus] = useState(null);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.message.length < 5 || !formData.company) return;

    setStatus("loading");

    const payload = {
      name: formData.name || null,
      email: formData.email || null,
      gender: formData.gender,
      company: formData.company,
      message: formData.message,
    };

    try {
      const createdEntry = await postFeedback(payload);

      setFeedbackList((prev) => [createdEntry, ...prev]);
      setStatus("success");

      setFormData({
        name: "",
        email: "",
        gender: "other",
        company: "",
        message: "",
      });
    } catch (error) {
      console.error("Feedback submission failed:", error);
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="text-center p-12 bg-green-50 border border-green-200 rounded-lg">
        <h2 className="text-xl font-semibold text-green-800 mb-4">
          Thank you! Your feedback is pending review.
        </h2>
        <button
          onClick={() => setStatus(null)}
          className="w-auto py-3 mt-6 px-6 bg-blue-600 text-white font-semibold rounded-md shadow-md transition duration-150 ease-in-out hover:bg-blue-700"
        >
          Submit More Feedback
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto p-8 bg-white shadow-xl rounded-lg space-y-4"
    >
      <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-3">
        Share Your Thoughts (Pending Approval)
      </h2>

      <label className="flex items-center gap-2 text-gray-700 font-medium">
        <User className="w-5 h-5 text-blue-500" /> Name (Optional)
      </label>
      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
      />

      <label className="flex items-center gap-2 text-gray-700 font-medium mt-4">
        <Mail className="w-5 h-5 text-blue-500" /> Email (Optional)
      </label>
      <input
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
      />

      <label className="text-gray-700 font-medium mt-4">
        Company Name (Required)
      </label>
      <input
        name="company"
        value={formData.company}
        onChange={handleChange}
        required
        placeholder="Which company is this feedback about?"
        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
      />

      <label className="text-gray-700 font-medium mt-4">
        Gender (Optional)
      </label>
      <select
        name="gender"
        value={formData.gender}
        onChange={handleChange}
        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 appearance-none pr-8"
      >
        <option value="other">Prefer not to say</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>

      <label className="text-gray-700 font-medium">Feedback Message</label>
      <textarea
        name="message"
        value={formData.message}
        onChange={handleChange}
        required
        minLength={5}
        placeholder="Enter your feedback here (at least 5 characters)"
        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 resize-y h-32"
      />

      <button
        type="submit"
        disabled={
          status === "loading" ||
          formData.message.length < 5 ||
          !formData.company
        }
        className="w-full py-3 mt-6 bg-blue-600 text-white font-semibold rounded-md shadow-md transition duration-150 ease-in-out hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "loading" ? "Submitting..." : "Send Feedback"}
      </button>

      {status === "error" && (
        <p className="text-red-600 mt-4">Submission failed. Try again.</p>
      )}
    </form>
  );
};

export default SubmitFeedback;
