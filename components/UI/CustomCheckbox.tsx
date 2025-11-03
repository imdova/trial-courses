interface CustomCheckboxProps {
  label: string;
  name: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  label,
  name,
  checked,
  onChange,
}) => {
  return (
    <div className="flex items-center space-x-2">
      <input
        type="checkbox"
        id={name}
        name={name}
        checked={checked}
        onChange={onChange}
        className="hidden"
      />
      <label
        htmlFor={name}
        className={`w-5 h-5 border rounded-md flex items-center justify-center cursor-pointer transition-all ${
          checked ? "bg-primary border-white" : "border-gray-400"
        }`}>
        {checked && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="16"
            height="16"
            className="text-white">
            <path fill="none" d="M0 0h24v24H0z" />
            <path
              fill="currentColor"
              d="M9 16.2l-4.2-4.2 1.4-1.4L9 13.4l7.8-7.8 1.4 1.4z"
            />
          </svg>
        )}
      </label>
      <label htmlFor={name} className="text-gray-700 text-sm">
        {label}
      </label>
    </div>
  );
};

export default CustomCheckbox;
