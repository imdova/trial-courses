import { cn } from "@/util";
import { ChevronUp } from "lucide-react";
import React from "react";
interface SortableHeaderProps {
  children: React.ReactNode;
  active: boolean;
  direction: "asc" | "desc";
  onClick: () => void;
  className?: string;
}

const SortableHeader: React.FC<SortableHeaderProps> = ({
  children,
  active,
  direction,
  onClick,
  className,
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "group flex w-full cursor-pointer select-none items-center gap-1 text-left",
        className,
      )}
    >
      <span className="line-clamp-1 text-nowrap">{children}</span>
      {active && (
        <span
          className={cn(
            "absolute right-1 transition-transform bg-gray-50 duration-150",
            direction === "desc" ? "rotate-180" : "rotate-0",
          )}
        >
          <ChevronUp className="w-5 h-5" />
        </span>
      )}
      {!active && (
        <span className="absolute right-1 bg-gray-50 text-gray-400 opacity-0 transition-opacity duration-150 group-hover:opacity-100">
          <ChevronUp className="w-5 h-5" />
        </span>
      )}
    </button>
  );
};

export default SortableHeader;
