"use client";
import React from "react";
import { getProgressColor } from "@/util/general";

const ProfileComplete: React.FC<{ user: InstructorProfile }> = () => {
  const percentage = 60;
  if (!percentage || percentage >= 100) return null;
  const progressColor = getProgressColor(percentage || 0);

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

      {/* Custom Circular Progress with Value */}
      <div className="relative h-[70px] w-[70px]"> 
        <svg className="h-full w-full" viewBox="0 0 36 36">
          {/* Background circle */}
          <circle
            cx="18"
            cy="18"
            r="16"
            fill="none"
            stroke="#e0e0e0"
            strokeWidth="2"
          />
          {/* Progress circle */}
          <circle
            cx="18"
            cy="18"
            r="16"
            fill="none"
            stroke={progressColor}
            strokeWidth="2"
            strokeDasharray={`${percentage} 100`}
            strokeLinecap="round"
            transform="rotate(-90 18 18)"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xl font-black" style={{ color: progressColor }}>
            {percentage}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProfileComplete;
