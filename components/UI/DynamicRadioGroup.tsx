"use client";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import React, { useState } from "react";

// Define the type for individual option
type RadioOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

type DynamicRadioGroupProps = {
  options: RadioOption[];
  defaultValue?: string;
  row?: boolean;
  onChange?: (value: string) => void;
};

const DynamicRadioGroup = ({
  options,
  defaultValue,
  row = false,
  onChange,
}: DynamicRadioGroupProps) => {
  const [selected, setSelected] = useState(
    defaultValue || options[0]?.value || ""
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSelected(value);
    onChange?.(value);
  };

  return (
    <RadioGroup
      row={row}
      value={selected}
      onChange={handleChange}
      className="gap-4"
    >
      {options.map((option) => (
        <FormControlLabel
          key={option.value}
          value={option.value}
          disabled={option.disabled}
          control={<Radio />}
          label={<span className="font-semibold">{option.label}</span>}
          className="mr-4"
        />
      ))}
    </RadioGroup>
  );
};

export default DynamicRadioGroup;

// Example usage:
// const ExampleUsage = () => {
//   const options = [
//     { value: "private", label: "Private" },
//     { value: "governmental", label: "Governmental" },
//     { value: "nonprofit", label: "Non-Profit", disabled: true },
//   ];

//   const handleChange = (value: string) => {
//     console.log("Selected value:", value);
//   };

//   return (
//     <DynamicRadioGroup
//       options={options}
//       defaultValue="private"
//       row
//       onChange={handleChange}
//     />
//   );
// };
