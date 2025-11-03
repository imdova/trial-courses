import React from "react";

interface DeleteConfirmationDialogProps {
  open: boolean;
  title: string;
  message?: string;
  onDelete: () => void;
  onClose: () => void;
  loading?: boolean;
  color?: "error" | "success" | "warning";
  buttonText?: string;
}

const DeleteConfirmationDialog: React.FC<DeleteConfirmationDialogProps> = ({
  open,
  title,
  message,
  onDelete,
  onClose,
  loading,
  color = "error",
  buttonText = "Yes Delete",
}) => {
  if (!open) return null;

  const colorClasses = {
    success: "text-green-600 bg-green-100",
    warning: "text-amber-600 bg-amber-100",
    error: "text-red-600 bg-red-100",
  };

  const buttonColorClasses = {
    success: "bg-green-600 hover:bg-green-700",
    warning: "bg-amber-600 hover:bg-amber-700",
    error: "bg-red-600 hover:bg-red-700",
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md mx-4 shadow-xl">
        <div className={`p-4 rounded-t-lg ${colorClasses[color]}`}>
          <h3 className="text-lg font-medium">{title}</h3>
        </div>

        <div className="p-4">
          <p className="text-gray-600">{message}</p>
        </div>

        <div className="flex justify-end gap-2 p-4 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            No
          </button>
          <button
            onClick={onDelete}
            disabled={loading}
            className={`px-4 py-2 rounded-md text-white ${buttonColorClasses[color]} disabled:opacity-70`}
          >
            {loading ? "Loading..." : buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationDialog;
