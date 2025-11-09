export const simulateAPICall = (data, delay = 500) => {
  return new Promise((resolve) =>
    setTimeout(() => resolve({ success: true, data }), delay)
  );
};
