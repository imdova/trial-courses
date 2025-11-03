"use client";
import { cn } from "@/util";
import { X } from "lucide-react";
import { useEffect } from "react";

/**
 * A modal component that can be used to display a dialog over the main content.
 * The modal will be displayed if the `isOpen` prop is true, and hidden if it is false.
 * When the modal is open, the background will be overlaid with a darkened, blurred
 * version of the underlying content.
 *
 * @param {boolean} isOpen - Whether the modal should be open or not.
 * @param {() => void} onClose - A function that will be called when the user
 *   clicks outside of the modal content.
 * @param {React.ReactNode} children - The content of the modal.
 */
const Modal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}> = ({ isOpen, children, onClose, className }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 top-0 z-[1000] flex h-screen w-screen items-end justify-center md:items-center">
      <div
        onClick={onClose}
        aria-hidden="true"
        className={`fixed inset-0 h-screen w-screen bg-black/30 backdrop-blur-sm`}
      ></div>
      <div
        className={cn(
          "z-30 m-8 flex w-full max-w-[600px] flex-col items-center justify-between gap-2 overflow-auto rounded-md bg-white p-5",
          className,
        )}
      >
        <div className="max-h-[530px] w-full">
          <div className="relative h-0 w-full">
            <button
              onClick={onClose}
              className="link-smooth absolute top-2 right-2 translate-x-1/2 -translate-y-1/2 p-2 hover:text-red-500"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
