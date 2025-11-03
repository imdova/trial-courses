"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";
import { OptionSelect } from "@/types";
import Image from "next/image";

interface CustomSelectProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  options: OptionSelect[];
  className?: string;
}

export default function CustomSelect({
  label,
  value,
  onChange,
  options,
  className,
}: CustomSelectProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selected = options.find((opt) => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`w-full flex items-center justify-between px-4 py-2 border border-gray-200 rounded-md bg-white shadow-sm focus:outline-none ${className}`}
      >
        <div className="flex items-center gap-2 text-sm text-gray-500">
          {selected?.icon}
          <span
            className={`text-sm truncate max-w-[150px]  ${
              selected ? "text-gray-900" : "text-gray-400"
            }`}
          >
            {selected?.label || "Select an option"}
          </span>
        </div>
        <ChevronDown className="w-4 h-4 text-gray-500" />
      </button>

      {open && (
        <div className="absolute z-30 right-0 min-w-[150px] mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                onChange(option.value);
                setOpen(false);
              }}
              className="flex items-center w-full gap-2 px-4 py-2 text-left hover:bg-gray-100"
            >
              {option.image && (
                <Image
                  className="w-6 h-6 object-cover rounded-lg"
                  src={option.image}
                  width={200}
                  height={200}
                  alt={option.label}
                />
              )}
              {option.icon}
              <span className="text-sm truncate">{option.label}</span>
              {value === option.value && (
                <Check className="ml-auto w-4 h-4 text-green-500" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
