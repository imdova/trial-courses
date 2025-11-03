import React, { useRef, useEffect } from "react";

interface CustomMenuProps {
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

const Menu: React.FC<CustomMenuProps> = ({
  anchorEl,
  open,
  onClose,
  children,
}) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        anchorEl &&
        !anchorEl.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, anchorEl, onClose]);

  if (!open || !anchorEl) return null;

  const rect = anchorEl.getBoundingClientRect();

  return (
    <div
      ref={menuRef}
      style={{
        top: rect.bottom + window.scrollY + 8,
        left: rect.left + window.scrollX,
        position: "absolute",
        zIndex: 50,
        maxHeight: "300px",
      }}
      className="bg-white border shadow-lg rounded-[10px] scroll-bar-minimal overflow-auto"
    >
      <div className="p-2">{children}</div>
    </div>
  );
};

export default Menu;
