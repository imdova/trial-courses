"use client";
import React, { useState, useRef } from "react";
import { FieldError } from "react-hook-form";
import { cn } from "@/util";
import { FieldConfig } from "@/types/forms";

const OTPInput = ({
  length = 6,
  onChange,
  error,
}: {
  field?: FieldConfig;
  length?: number;
  onChange?: (otp: string) => void;
  error?: FieldError | null;
}) => {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(""));
  const inputsRef = useRef<HTMLInputElement[]>([]);

  const handleChange = (value: string, index: number) => {
    if (!/^[0-9]?$/.test(value)) return; // Allow only digits

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (onChange) onChange(newOtp.join(""));

    // Move to the next input field if the current one is filled
    if (value && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const pastedData = e.clipboardData.getData("text").slice(0, length);
    if (/^\d+$/.test(pastedData)) {
      const newOtp = pastedData.split("").slice(0, length);
      setOtp(newOtp);
      if (onChange) onChange(newOtp.join(""));
      newOtp.forEach((char, i) => {
        if (inputsRef.current[i]) {
          inputsRef.current[i].value = char;
        }
      });
    }
    e.preventDefault();
  };

  return (
    <div className={cn("flex flex-col gap-2")}>
      <div className="flex justify-center gap-2">
        {otp.map((_, index) => (
          <input
            key={index}
            ref={(el) => {
              if (el) inputsRef.current[index] = el;
            }}
            value={otp[index]}
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onPaste={handlePaste}
            maxLength={1}
            className={cn(
              "text-center font-bold aspect-square w-14 h-14 md:w-16 md:h-16",
              "border rounded-lg text-xl md:text-2xl focus:outline-none",
              "focus:ring-2 focus:ring-blue-500 focus:border-transparent",
              error ? "border-red-500" : "border-gray-300",
              "appearance-none [-moz-appearance:textfield]",
              "transition-colors duration-200"
            )}
            inputMode="numeric"
            autoFocus={index === 0}
            type="text" // Using text to hide number input arrows
          />
        ))}
      </div>
      {error && (
        <p className="text-center text-sm text-red-500">{error.message}</p>
      )}
    </div>
  );
};

export default OTPInput;
