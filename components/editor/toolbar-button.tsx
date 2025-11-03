"use client";

import { Button } from "../UI/button";

interface ToolbarButtonProps {
  icon: React.ElementType; // Update type to accept Material UI icon components
  label: string;
  onClick: () => void;
  isActive?: boolean;
}

export function ToolbarButton({
  icon: Icon,
  label,
  onClick,
  isActive = false,
}: ToolbarButtonProps) {
  return (
    <Button
      onClick={onClick}
      variant={isActive ? "default" : "ghost"}
      title={label}
      size="icon"
      className="size-5"
    >
      <Icon className="size-3.5" />
    </Button>
  );
}
