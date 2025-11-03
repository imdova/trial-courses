"use client";

import { X } from "lucide-react";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  width?: string;
  hasOverlay?: boolean;
  position?: "left" | "right";
}

export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  children,
  width = "w-70",
  hasOverlay = true,
  position = "left",
}) => {
  return (
    <div>
      {hasOverlay && (
        <div
          className={`fixed inset-0 bg-[#00000060] bg-opacity-50 transition-opacity z-[1000] ${
            isOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
          onClick={onClose}
        ></div>
      )}
      <div
        className={`fixed z-[1000] top-0 ${
          position === "right" ? "right-0" : "left-0"
        } h-full bg-white shadow-lg transition-transform ${
          isOpen
            ? "translate-x-0"
            : position === "right"
            ? "translate-x-full"
            : "-translate-x-full"
        } ${width}`}
      >
        <button
          className={`!absolute top-2  p-2 ${
            position === "right" ? "left-2" : "right-2"
          }`}
          onClick={onClose}
        >
          <X size={15} />
        </button>

        <div className="mt-4 p-4">{children}</div>
      </div>
    </div>
  );
};
