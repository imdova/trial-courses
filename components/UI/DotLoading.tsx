import { cn } from "@/util";
import React from "react";

type DotLoadingProps = {
  size?: "xs" | "sm" | "md" | "lg";
  color?: string;
  className?: string;
};

const DotLoading: React.FC<DotLoadingProps> = ({
  size = "md",
  color = "bg-white",
  className = "",
}) => {
  const sizeClasses = {
    xs: "w-1 h-1",
    sm: "w-2 h-2",
    md: "w-3 h-3",
    lg: "w-4 h-4",
  };

  return (
    <div
      className={cn("flex items-center justify-center space-x-2", className)}
    >
      <div
        className={`${sizeClasses[size]} ${color} animate-bounce rounded-full`}
        style={{ animationDelay: "0ms" }}
      />
      <div
        className={`${sizeClasses[size]} ${color} animate-bounce rounded-full`}
        style={{ animationDelay: "150ms" }}
      />
      <div
        className={`${sizeClasses[size]} ${color} animate-bounce rounded-full`}
        style={{ animationDelay: "300ms" }}
      />
    </div>
  );
};

export default DotLoading;
