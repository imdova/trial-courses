interface CustomCheckboxProps {
  id: string;
  checked: boolean;
  label: string;
  onChange?: (checked: boolean) => void;
  readOnly?: boolean;
}

const CustomCheckbox = ({
  id,
  checked,
  label,
  onChange,
  readOnly = false,
}: CustomCheckboxProps) => {
  return (
    <div className="flex items-center ">
      <label htmlFor={id} className="flex items-center cursor-pointer">
        <div
          className={`relative w-5 h-5 rounded-full border-2 ${
            checked ? "border-green-500 bg-green-500" : "border-gray-400"
          } mr-3`}>
          {checked && (
            <div className="absolute inset-0 flex items-center justify-center text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3"
                viewBox="0 0 20 20"
                fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          )}
        </div>
        <span className="text-gray-700 text-sm">{label}</span>
      </label>
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange?.(e.target.checked)}
        className="hidden"
        readOnly={readOnly}
      />
    </div>
  );
};
export default CustomCheckbox;
