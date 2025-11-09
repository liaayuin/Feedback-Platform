import axios from "axios";
const BASE_URL = "http://localhost:3000/api/feedback";

export const fetchApprovedFeedback = async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
};

export const postFeedback = async (payload) => {
  const response = await axios.post(`${BASE_URL}/submit`, payload);
  return response.data;
};

export const fetchPendingFeedback = async () => {
  const response = await axios.get(`${BASE_URL}/pending`);
  return response.data;
};

export const updateFeedbackStatusApi = async (id, status) => {
  const response = await axios.patch(`${BASE_URL}/${id}/status`, { status });
  return response.data;
};

export const handleVote = async (id, voteType, userId) => {
  const response = await axios.patch(`${BASE_URL}/${id}/vote`, {
    userId,
    voteType,
  });
  return response.data;
};

export const fetchAllFeedback = async () => {
  const approvedData = await fetchApprovedFeedback();
  const pendingData = await fetchPendingFeedback();
  return [...approvedData, ...pendingData];
};
