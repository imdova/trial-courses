import { ButtonColor } from "@/types/forms";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  color?: ButtonColor;
  variant?: "contained" | "outlined" | "text";
  size?: "sm" | "md" | "lg";
}

const Button: React.FC<ButtonProps> = ({
  children,
  loading = false,
  color = "primary",
  variant = "contained",
  size = "md",
  className = "",
  ...props
}) => {
  const baseStyles =
    "flex items-center justify-center font-medium rounded-md transition";

  const colorClasses = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-600 text-white hover:bg-gray-700",
    danger: "bg-red-600 text-white hover:bg-red-700",
    error: "bg-red-600 text-white hover:bg-red-700",
    success: "bg-green-600 text-white hover:bg-green-700",
    warning: "bg-yellow-600 text-white hover:bg-yellow-700",
  };

  const outlinedClasses = {
    primary: "border border-blue-600 text-blue-600 hover:bg-blue-50",
    secondary: "border border-gray-600 text-gray-600 hover:bg-gray-50",
    danger: "border border-red-600 text-red-600 hover:bg-red-50",
    error: "border border-red-600 text-red-600 hover:bg-red-50",
    success: "border border-green-600 text-green-600 hover:bg-green-50",
    warning: "border border-yellow-600 text-yellow-600 hover:bg-yellow-50",
  };

  const sizeClasses = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-5 py-3 text-lg",
  };

  let finalClasses = baseStyles + " " + sizeClasses[size];

  if (variant === "contained") {
    finalClasses += " " + colorClasses[color];
  } else if (variant === "outlined") {
    finalClasses += " " + outlinedClasses[color] + " bg-transparent";
  } else {
    finalClasses += " text-" + color + "-600 hover:bg-" + color + "-50";
  }

  return (
    <button
      className={`${finalClasses} ${className} ${
        loading ? "opacity-50 cursor-not-allowed" : ""
      }`}
      disabled={loading}
      {...props}
    >
      {loading ? "Loading..." : children}
    </button>
  );
};

export default Button;
