export const MOCK_FEEDBACK_DATA = [
  {
    id: "1",
    name: "Alice Johnson",
    message:
      "The new dashboard layout is intuitive but lacks mobile responsiveness on tablets.",
    upvotes: 15,
    downvotes: 0,
    voters: ["mock-user-1", "mock-user-1-up", "mock-user-2", "mock-user-2-up"],
    status: "approved",
    createdAt: new Date(Date.now() - 86400000),
    company: "Acme Analytics Inc.",
    gender: "female",
  },
  {
    id: "2",
    name: "",
    message:
      "The search function is very slow when dealing with over 100 entries.",
    upvotes: 8,
    downvotes: 2,
    voters: [
      "mock-user-3",
      "mock-user-3-up",
      "mock-user-4",
      "mock-user-4-up",
      "mock-user-5",
      "mock-user-5-down",
    ],
    status: "approved",
    createdAt: new Date(Date.now() - 172800000),
    company: "Innovate Solutions",
    gender: "other",
  },
  {
    id: "3",
    name: "Robert Smith",
    message:
      "Please consider adding an export-to-CSV option to the reports page.",
    upvotes: 2,
    downvotes: 1,
    voters: [
      "mock-user-6",
      "mock-user-6-up",
      "mock-user-7",
      "mock-user-7-down",
    ],
    status: "approved",
    createdAt: new Date(Date.now() - 259200000),
    company: "TechPulse Group",
    gender: "male",
  },
];
