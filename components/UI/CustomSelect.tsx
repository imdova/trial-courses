import { ChevronDown, ChevronUp } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  options: Option[];
  selected: Option | null;
  onChange: (option: Option) => void;
  placeholder?: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  selected,
  onChange,
  placeholder = "Select an option",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!isOpen) return;

    switch (event.key) {
      case "ArrowDown":
        setHighlightedIndex((prev) =>
          prev === null || prev === options.length - 1 ? 0 : prev + 1
        );
        break;
      case "ArrowUp":
        setHighlightedIndex((prev) =>
          prev === null || prev === 0 ? options.length - 1 : prev - 1
        );
        break;
      case "Enter":
        if (highlightedIndex !== null) {
          onChange(options[highlightedIndex]);
          setIsOpen(false);
        }
        break;
      case "Escape":
        setIsOpen(false);
        break;
      default:
        break;
    }
  };

  return (
    <div
      className="relative min-w-36 z-20"
      ref={dropdownRef}
      tabIndex={0}
      onKeyDown={handleKeyDown}>
      {/* Selected Option */}
      <div
        className="bg-white border border-gray-300 rounded-md p-2 cursor-pointer flex justify-between items-center"
        onClick={() => setIsOpen((prev) => !prev)}>
        <span className="text-sm">
          {selected ? selected.label : placeholder}
        </span>
        <span className="text-gray-500">
          {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </span>
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute left-0 w-full bg-white p-1 shadow-lg rounded-md mt-1 max-h-60 overflow-auto">
          {options.map((option, index) => (
            <div
              key={option.value}
              className={`p-3 rounded-md text-sm cursor-pointer ${
                highlightedIndex === index
                  ? "bg-primary text-white"
                  : "hover:bg-gray-100"
              }`}
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
              onMouseEnter={() => setHighlightedIndex(index)}>
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
