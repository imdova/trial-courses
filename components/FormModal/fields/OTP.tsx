"use client";
import React, { useState, useRef } from "react";
import { FieldError } from "react-hook-form";
import { cn } from "@/util";
import { FieldConfig } from "@/types/forms";
import TextField from "./TextField";

const OTPInput = ({
  field,
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
    <div
      className={cn("flex flex-col gap-2", field?.textFieldProps?.className)}
    >
      <div className="flex justify-center gap-1">
        {otp.map((_, index) => (
          <TextField
            key={index}
            value={otp[index]}
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onPaste={handlePaste}
            maxLength={1}
            inputMode="numeric"
            autoFocus={index === 0}
            className={cn(
              "text-center font-bold aspect-square flex-1 p-3 md:p-5 md:text-2xl rounded-[10px] border outline-none transition-all duration-200",
              {
                "border-red-500": error,
                "border-gray-300": !error,
              },
              "focus:border-secondary"
            )}
            type="text"
            style={{
              MozAppearance: "textfield",
              height: "60px",
              width: "60px",
            }}
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
