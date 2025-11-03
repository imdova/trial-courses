"use client";
import React from "react";
import { CircularProgress } from "@mui/material";

// Types
type UserProfile = {
  id: string;
  profileCompletion?: number;
};

// Dummy implementation
const StudentComplete: React.FC<{ user: UserProfile }> = ({ user }) => {
  // Mock data instead of API call
  const percentage = user.profileCompletion || Math.floor(Math.random() * 100); // Random percentage for demo

  // Mock loading state for initial render
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <SkeletonLoading />;
  if (percentage >= 100) return null;

  const progressColor = getProgressColor(percentage);

  return (
    <div className="flex rounded-base border border-gray-200 bg-white p-3 shadow-soft md:p-5">
      {/* Title and Description */}
      <div className="flex-1">
        <h6
          className="mb-2 text-2xl font-bold"
          style={{ color: progressColor }}
        >
          Complete your profile
        </h6>
        <p className="max-w-60 text-muted-foreground">
          You are almost there—let&lsquo;s finish setting things up to be able
          to apply for jobs!
        </p>
      </div>
      {/* Circular Progress with Value */}
      <div className="grid h-[70px] w-[70px] grid-cols-1 grid-rows-1">
        <CircularProgress
          variant="determinate"
          value={percentage}
          size={70}
          sx={{
            color: progressColor,
          }}
          className="col-start-1 row-start-1"
        />
        <div className="col-start-1 row-start-1 flex items-center justify-center">
          <span className="text-xl font-black" style={{ color: progressColor }}>
            {percentage}%
          </span>
        </div>
      </div>
    </div>
  );
};

// Mock getProgressColor if not available
function getProgressColor(percentage: number): string {
  if (percentage >= 80) return "#10B981"; // green
  if (percentage >= 50) return "#F59E0B"; // yellow
  return "#EF4444"; // red
}

// Mock SkeletonLoading component if not available
const SkeletonLoading = () => (
  <div className="flex rounded-base border border-gray-200 bg-white p-3 shadow-soft md:p-5">
    <div className="flex-1 space-y-2">
      <div className="h-6 w-3/4 rounded bg-gray-200"></div>
      <div className="h-4 w-full rounded bg-gray-200"></div>
    </div>
    <div className="h-[70px] w-[70px] rounded-full bg-gray-200"></div>
  </div>
);

export default StudentComplete;

// Example usage with dummy user
export const DemoStudentComplete = () => {
  const dummyUser: UserProfile = {
    id: "123",
    profileCompletion: 65, // Example completion percentage
  };

  return <StudentComplete user={dummyUser} />;
};

export const CompleteProfile = () => {
  const dummyUser: UserProfile = {
    id: "123",
    profileCompletion: 100, // Should not render
  };

  return <StudentComplete user={dummyUser} />;
};

export const LoadingState = () => {
  const dummyUser: UserProfile = {
    id: "123",
  };

  // Force loading state
  return (
    <div>
      <StudentComplete user={dummyUser} />
      <p className="mt-2 text-sm text-gray-500">
        Note: This shows loading state for the first 500ms
      </p>
    </div>
  );
};
