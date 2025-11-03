import { useState, useRef, useEffect } from "react";

interface CollapseProps {
  children: React.ReactNode;
  open: boolean;
  className?: string;
}

export default function Collapse({
  children,
  open,
  className = "",
}: CollapseProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | undefined>(
    open ? undefined : 0
  );

  useEffect(() => {
    if (!contentRef.current) return;

    const contentHeight = contentRef.current.scrollHeight;

    if (open) {
      // Opening animation
      setHeight(contentHeight);
      const timeout = setTimeout(() => {
        setHeight(undefined); // Set to undefined to allow natural height
      }, 300); // Match transition duration
      return () => clearTimeout(timeout);
    } else {
      // Closing animation
      setHeight(contentRef.current.scrollHeight);
      const timeout = setTimeout(() => {
        setHeight(0);
      }, 10); // Small delay to ensure the height is set before animating to 0
      return () => clearTimeout(timeout);
    }
  }, [open]);

  return (
    <div
      ref={contentRef}
      className={`transition-all duration-300 ease-in-out overflow-hidden ${className}`}
      style={{ height: height === undefined ? "auto" : `${height}px` }}
    >
      {children}
    </div>
  );
}
