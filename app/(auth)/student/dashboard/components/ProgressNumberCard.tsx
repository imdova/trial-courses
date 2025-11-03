/* eslint-disable @typescript-eslint/no-unused-vars */
import { ReactNode } from "react";

interface ProgressNumberCardProps {
  value: number;
  progressValue: number;
  title: string;
  icon?: ReactNode;
  color?: "blue" | "green" | "orange" | "red" | "purple";
  size?: "sm" | "md" | "lg";
}

export function ProgressNumberCard({
  value,
  progressValue,
  title,
  icon,
  color = "blue",
  size = "md",
}: ProgressNumberCardProps) {
  // Color configurations
  const colorClasses = {
    blue: {
      bg: "bg-blue-50",
      text: "text-blue-600",
      icon: "text-blue-500",
      iconBg: "bg-blue-500",
      progressBg: "bg-blue-100",
      progressBar: "bg-blue-500",
    },
    green: {
      bg: "bg-green-50",
      text: "text-green-600",
      icon: "text-green-500",
      iconBg: "bg-green-500",
      progressBg: "bg-green-100",
      progressBar: "bg-green-500",
    },
    orange: {
      bg: "bg-orange-50",
      text: "text-orange-600",
      icon: "text-orange-500",
      iconBg: "bg-orange-500",
      progressBg: "bg-orange-100",
      progressBar: "bg-orange-500",
    },
    red: {
      bg: "bg-red-50",
      text: "text-red-600",
      icon: "text-red-500",
      iconBg: "bg-red-500",
      progressBg: "bg-red-100",
      progressBar: "bg-red-500",
    },
    purple: {
      bg: "bg-purple-50",
      text: "text-purple-600",
      icon: "text-purple-500",
      iconBg: "bg-purple-500",
      progressBg: "bg-purple-100",
      progressBar: "bg-purple-500",
    },
  };

  // Size configurations
  const sizeClasses = {
    sm: {
      card: "p-3",
      value: "text-xl",
      iconSize: "h-4 w-4",
      progressHeight: "h-1.5",
    },
    md: {
      card: "p-4",
      value: "text-2xl",
      iconSize: "h-5 w-5",
      progressHeight: "h-1.5",
    },
    lg: {
      card: "p-5",
      value: "text-4xl",
      iconSize: "h-6 w-6",
      progressHeight: "h-1.5",
    },
  };

  return (
    <div
      className={`rounded-xl shadow-sm ${colorClasses[color].bg} ${sizeClasses[size].card}`}
    >
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-1 mb-2">
            {icon && (
              <span
                className={`mr-1 w-8 h-8 rounded-lg flex items-center justify-center text-white ${colorClasses[color].iconBg}`}
              >
                {icon}
              </span>
            )}
            <span className="text-xs font-medium text-gray-500">{title}</span>
          </div>
          <div
            className={`font-bold mt-4 ${colorClasses[color].text} ${sizeClasses[size].value}`}
          >
            {value}
          </div>
        </div>
      </div>

      {/* Progress bar */}
      {/* <div
        className={`mt-3 w-full ${colorClasses[color].progressBg} rounded-full ${sizeClasses[size].progressHeight}`}
      >
        <div
          className={`${colorClasses[color].progressBar} rounded-full ${sizeClasses[size].progressHeight}`}
          style={{ width: `${progressValue}%` }}
        ></div>
      </div> */}
    </div>
  );
}
