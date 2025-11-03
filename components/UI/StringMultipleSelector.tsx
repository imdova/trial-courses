import * as React from "react";
import MultipleSelector, {
  MultipleSelectorProps,
  Option,
} from "./multi-select";

interface StringMultipleSelectorProps
  extends Omit<MultipleSelectorProps, "value" | "onChange"> {
  value?: string[];
  onChange?: (values: string[]) => void;
}

const StringMultipleSelector: React.FC<StringMultipleSelectorProps> = ({
  value,
  onChange,
  defaultOptions = [],
  options,
  ...props
}) => {
  // Convert string[] to Option[]
  const convertToOptions = React.useCallback(
    (values: string[]): Option[] => {
      return values.map((val) => {
        // Try to find the option in defaultOptions or options to preserve label and other properties
        const allOptions = [...defaultOptions, ...(options || [])];
        const foundOption = allOptions.find((opt) => opt.value === val);

        return foundOption || { value: val, label: val };
      });
    },
    [defaultOptions, options],
  );

  // Convert Option[] to string[]
  const convertToStrings = React.useCallback((opts: Option[]): string[] => {
    return opts.map((opt) => opt.value);
  }, []);

  // Memoize the converted value
  const optionValue = React.useMemo(() => {
    return value ? convertToOptions(value) : undefined;
  }, [value, convertToOptions]);

  // Handle onChange by converting back to string[]
  const handleChange = React.useCallback(
    (selectedOptions: Option[]) => {
      if (onChange) {
        onChange(convertToStrings(selectedOptions));
      }
    },
    [onChange, convertToStrings],
  );

  return (
    <MultipleSelector
      value={optionValue}
      onChange={handleChange}
      defaultOptions={defaultOptions}
      options={options}
      {...props}
    />
  );
};

StringMultipleSelector.displayName = "StringMultipleSelector";

export default StringMultipleSelector;
