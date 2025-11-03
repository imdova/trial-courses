// components/CustomRadioButton.tsx

import React from "react";

interface CustomRadioButtonProps {
  label: string;
  name: string;
  value: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CustomRadioButton: React.FC<CustomRadioButtonProps> = ({
  label,
  name,
  value,
  checked,
  onChange,
}) => {
  return (
    <div className="flex items-center space-x-1 cursor-pointer">
      <input
        type="radio"
        id={value}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="hidden"
      />
      <label
        htmlFor={value}
        className={`w-6 h-6 border-2 rounded-full flex items-center justify-center cursor-pointer transition-all ${
          checked ? "bg-white border-primary" : "border-gray-200"
        }`}>
        {checked && <div className="w-4 h-4 bg-primary rounded-full"></div>}
      </label>
      <label htmlFor={value} className="text-gray-700 cursor-pointer text-sm">
        {label}
      </label>
    </div>
  );
};

export default CustomRadioButton;
