import React from "react";

type ButtonColor =
  | "gray"
  | "blue"
  | "red"
  | "green"
  | "yellow"
  | "indigo"
  | "purple"
  | "pink";

type ButtonVariant = "text" | "outlined" | "contained";

interface ButtonConfig {
  text: string;
  onClick: () => void;
  color?: ButtonColor;
  variant?: ButtonVariant;
  autoFocus?: boolean;
}

interface LeaveConfirmationModalProps {
  isOpen: boolean;
  onLeave: () => void;
  onStay: () => void;
  title?: string;
  description?: string;
  hideDefaultButtons?: boolean;
  additionalButtons?: ButtonConfig[];
}

const LeaveConfirmationModal: React.FC<LeaveConfirmationModalProps> = ({
  isOpen,
  onLeave,
  onStay,
  title = "Are you sure you want to leave?",
  description = "You have unsaved changes. Are you sure you want to leave without saving?",
  hideDefaultButtons = false,
  additionalButtons = [],
}) => {
  if (!isOpen) return null;

  const getButtonClasses = (
    color: ButtonColor = "blue",
    variant: ButtonVariant = "contained",
  ) => {
    const base =
      "px-4 py-2 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2";

    if (variant === "text") {
      return `${base} text-${color}-600 hover:bg-${color}-50 focus:ring-${color}-500`;
    }

    if (variant === "outlined") {
      return `${base} border border-${color}-600 text-${color}-600 hover:bg-${color}-50 focus:ring-${color}-500`;
    }

    return `${base} bg-${color}-600 text-white hover:bg-${color}-700 focus:ring-${color}-500`;
  };

  const defaultButtons: ButtonConfig[] = !hideDefaultButtons
    ? [
        {
          text: "Stay",
          onClick: onStay,
          color: "blue",
          variant: "outlined",
        },
        {
          text: "Leave",
          onClick: onLeave,
          color: "red",
          variant: "contained",
          autoFocus: true,
        },
      ]
    : [];

  const allButtons: ButtonConfig[] = [...defaultButtons, ...additionalButtons];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-xl bg-white shadow-xl">
        <div className="p-6">
          <h3 className="mb-2 text-lg font-medium text-gray-900">{title}</h3>
          <p className="text-gray-600">{description}</p>
        </div>
        <div className="flex justify-end space-x-3 rounded-b-xl bg-gray-50 px-6 py-4">
          {allButtons.map((button, index) => (
            <button
              key={index}
              onClick={button.onClick}
              className={getButtonClasses(button.color, button.variant)}
              autoFocus={button.autoFocus}
            >
              {button.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeaveConfirmationModal;
