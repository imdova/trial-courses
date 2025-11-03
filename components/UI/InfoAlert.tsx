import { Info } from "lucide-react";
import React from "react";

interface InfoProps {
  title: string;
  description: string;
  variant?: "primary" | "secondary" | "success" | "warning" | "error";
  className?: string;
}

const InfoAlert: React.FC<InfoProps> = ({
  title,
  description,
  variant = "primary",
  className = "",
}) => {
  const variantClasses = {
    primary: "bg-blue-50 border-blue-200 text-blue-800",
    secondary: "bg-gray-50 border-gray-200 text-gray-800",
    success: "bg-green-50 border-green-200 text-green-800",
    warning: "bg-yellow-50 border-yellow-200 text-yellow-800",
    error: "bg-red-50 border-red-200 text-red-800",
  };

  const iconClasses = {
    primary: "text-blue-500",
    secondary: "text-gray-500",
    success: "text-green-500",
    warning: "text-yellow-500",
    error: "text-red-500",
  };

  return (
    <div className="group ">
      <div
        className={`relative mr-3 mt-0.5 text-xl cursor-pointer ${iconClasses[variant]}`}>
        <Info size={15} />
      </div>
      <div
        className={`absolute opacity-0 invisible rounded-lg border w-fit p-4 group-hover:opacity-100 z-30 group-hover:visible transition-all ${variantClasses[variant]} ${className}`}>
        <h3 className="text-sm font-semibold">{title}</h3>
        <p className="mt-1 text-xs opacity-80">{description}</p>
      </div>
    </div>
  );
};

export default InfoAlert;
