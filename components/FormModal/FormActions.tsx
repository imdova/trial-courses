import React, { useState } from "react";
import Button from "../UI/Buttons/Button";
import DeleteConfirmationDialog from "./DeleteConfirmationDialog";

interface FormActionsProps {
  onCancel: () => void;
  onDelete?: () => void;
  loading?: boolean;
  deleteLoading?: boolean;
  submitButtonText?: React.ReactNode;
  deleteButtonText?: string;
  cancelButtonText?: string;
  enableResetButton?: boolean;
  onReset?: () => void;
  isDirty?: boolean;
  isValid?: boolean;
  onSubmit?: () => void;
}

export const FormActions: React.FC<FormActionsProps> = ({
  onCancel,
  onDelete,
  loading,
  deleteLoading,
  submitButtonText = "Save",
  deleteButtonText = "Delete",
  cancelButtonText = "Cancel",
  enableResetButton = false,
  onReset,
  isDirty,
  isValid,
}) => {
  const [openDialog, setOpenDialog] = useState(false);
  const onDeleteOpen = () => setOpenDialog(true);
  const onDeleteCancel = () => setOpenDialog(false);

  // For creation forms (like assignments), we should allow submission even if not dirty
  const shouldDisableSubmit = enableResetButton && !isValid && isDirty === false;

  return (
    <>
      <div className="border-t pt-4 p-2 border-gray-200">
        <div className="flex w-full justify-between">
          {onDelete && (
            <Button onClick={onDeleteOpen} variant="text" color="secondary">
              {deleteButtonText}
            </Button>
          )}
          <div className="flex flex-1 justify-end gap-2">
            {!enableResetButton && (
              <Button onClick={onCancel} variant="text" color="secondary">
                {cancelButtonText}
              </Button>
            )}
            {enableResetButton && isDirty && (
              <Button onClick={onReset} variant="text" color="secondary">
                Reset
              </Button>
            )}
            <Button
              disabled={shouldDisableSubmit || loading}
              type="submit"
              color="success"
              variant="contained"
            >
              {loading ? "Loading..." : submitButtonText}
            </Button>
          </div>
        </div>
      </div>
      {onDelete && (
        <DeleteConfirmationDialog
          open={openDialog}
          title="Confirm Deletion"
          loading={deleteLoading}
          message={`Are you sure you want to ${deleteButtonText}? This action cannot be undone.`}
          onDelete={onDelete}
          onClose={onDeleteCancel}
        />
      )}
    </>
  );
};
