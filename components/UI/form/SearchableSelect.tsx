import TextField from "@/components/FormModal/fields/TextField";
import { Option } from "@/types/forms";
import { cn } from "@/util";
import React, { useState, useRef, useEffect, KeyboardEvent } from "react";

interface SearchableSelectProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  renderValue?: (value: string) => React.ReactNode;
  disabled?: boolean;
  error?: boolean;
  menuClassName?: string;
}

const filterItems = (items: Option[], searchTerm: string) => {
  return items.filter((item) =>
    typeof item.label === "string"
      ? item.label.toLowerCase().includes(searchTerm.toLowerCase())
      : false
  );
};

const SearchableSelect = React.forwardRef<
  HTMLDivElement,
  SearchableSelectProps
>(
  (
    {
      options,
      value,
      onChange,
      placeholder = "Select...",
      className = "",
      renderValue,
      disabled,
      error,
      menuClassName = "",
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [focusedIndex, setFocusedIndex] = useState(0);
    const searchInputRef = useRef<HTMLInputElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const optionsRef = useRef<(HTMLDivElement | null)[]>([]);

    const filteredOptions = filterItems(options, searchTerm);
    const selected = options.find((opt) => opt.value === value);

    const handleOpen = () => {
      if (disabled) return;
      setIsOpen(true);
      setSearchTerm("");
      setFocusedIndex(0);
    };

    const handleClose = () => {
      setIsOpen(false);
      setSearchTerm("");
    };

    const handleSelect = (val: string) => {
      onChange(val);
      handleClose();
    };

    const handleContainerKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
      if (!isOpen) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleOpen();
        }
        return;
      }

      switch (e.key) {
        case "Escape":
          handleClose();
          break;
        case "ArrowDown":
          e.preventDefault();
          setFocusedIndex((prev) =>
            Math.min(prev + 1, filteredOptions.length - 1)
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setFocusedIndex((prev) => Math.max(prev - 1, 0));
          break;
        case "Enter":
          e.preventDefault();
          if (filteredOptions[focusedIndex]) {
            handleSelect(filteredOptions[focusedIndex].value);
          }
          break;
      }
    };

    const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && filteredOptions.length > 0) {
        e.preventDefault();
        handleSelect(filteredOptions[0].value);
      }
    };

    useEffect(() => {
      if (isOpen && focusedIndex >= 0) {
        optionsRef.current[focusedIndex]?.scrollIntoView({
          block: "nearest",
        });
      }
    }, [focusedIndex, isOpen]);

    // Click outside handler
    useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
        if (
          wrapperRef.current &&
          !wrapperRef.current.contains(e.target as Node)
        ) {
          handleClose();
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Auto focus input when dropdown opens
    useEffect(() => {
      if (isOpen) {
        setTimeout(() => {
          searchInputRef.current?.focus();
        }, 0);
      }
    }, [isOpen]);

    return (
      <div
        ref={wrapperRef}
        className={`relative `}
        onKeyDown={handleContainerKeyDown}
        tabIndex={0}
      >
        <button
          type="button"
          onClick={handleOpen}
          disabled={disabled}
          className={cn(
            `w-full px-3 py-2 border text-lg rounded-lg text-left bg-white ${className}`,
            "focus:outline-none ",
            "transition-all duration-200",
            disabled ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "",
            error
              ? "border-red-500 focus:ring-red-500 focus:border-red-500"
              : "border-gray-300"
          )}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          <div className="flex items-center justify-between  p-[1px]">
            {renderValue ? renderValue(value) : selected?.label || placeholder}
            <svg
              className={`w-5 h-5 text-gray-400 transition-transform ${
                isOpen ? "rotate-180" : ""
              }`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </button>

        {isOpen && (
          <div
            ref={ref}
            className={cn(
              "absolute mt-1 w-full max-h-60 min-w-[200px] overflow-auto rounded-lg border bg-white shadow-lg z-50",
              menuClassName
            )}
            role="listbox"
          >
            {/* Search Field */}
            <div className="sticky top-0 z-10 bg-white p-2 border-b">
              <div className="flex items-center gap-2 border rounded-md px-3  bg-gray-50">
                <svg
                  className="w-4 h-4 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-4.35-4.35M17 11A6 6 0 1 0 5 11a6 6 0 0 0 12 0z"
                  />
                </svg>
                <TextField
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search..."
                  className="w-full  bg-transparent border-none focus:ring-0 text-sm"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setFocusedIndex(0);
                  }}
                  onKeyDown={handleInputKeyDown}
                  autoComplete="off"
                  spellCheck={false}
                />
              </div>
            </div>

            {/* Options */}
            {filteredOptions.length > 0 ? (
              filteredOptions.map((item, i) => (
                <div
                  key={`${item.value}-${i}`}
                  ref={(el) => {
                    optionsRef.current[i] = el;
                  }}
                  onClick={() => handleSelect(item.value)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2.5 cursor-pointer",
                    "hover:bg-gray-50 transition-colors duration-150",
                    item.value === value
                      ? "bg-primary-50 text-primary-600 font-medium"
                      : "",
                    i === focusedIndex ? "bg-gray-100" : ""
                  )}
                  role="option"
                  aria-selected={item.value === value}
                >
                  {item.icon && (
                    <span className="flex-shrink-0">{item.icon}</span>
                  )}
                  <span className="truncate">{item.label}</span>
                </div>
              ))
            ) : (
              <div className="px-4 py-3 text-sm text-gray-500 text-center">
                No options found
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
);

SearchableSelect.displayName = "SearchableSelect";

export default SearchableSelect;
