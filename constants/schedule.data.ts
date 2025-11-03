import { Event } from "@/types/courses";

// Define colors for each tag
export const tagColors: Record<string, string> = {
  "First lesson": "#3b82f6", // Blue
  "Single lesson": "#22c55e", // Green
  "Weekly lesson": "#facc15", // Yellow
  "Time off": "#ef4444", // Red
  "Google Calendar": "#f97316", // Orange
  "Confirmed by student": "#10b981", // Teal
  "No Confirmed by student": "#6b7280", // Gray
};

// Sample events data with tags
export const eventsData: Event[] = [
  {
    id: 1,
    date: "2024-01-02",
    title: "Course Name A",
    time: "10:30 AM",
    color: "#2196f3",
    tags: ["First lesson", "Google Calendar"],
  },
  {
    id: 2,
    date: "2024-01-05",
    title: "Course Name B",
    time: "2:00 PM",
    color: "#ffeb3b",
    tags: ["Single lesson", "Confirmed by student"],
  },
  {
    id: 3,
    date: "2024-01-09",
    title: "Course Name C",
    time: "9:00 AM",
    color: "#4caf50",
    tags: ["Weekly lesson", "Time off"],
  },
  {
    id: 4,
    date: "2024-01-15",
    title: "Course Name D",
    time: "3:30 PM",
    color: "#ff5722",
    tags: ["Single lesson", "Google Calendar"],
  },
  {
    id: 5,
    date: "2025-03-21",
    title: "Course Name E",
    time: "1:00 PM",
    color: "#673ab7",
    tags: ["Confirmed by student", "Weekly lesson"],
  },
];
