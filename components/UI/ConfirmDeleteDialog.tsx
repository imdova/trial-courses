import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/UI/alert-dialog";
import { Input } from "@/components/UI/input";
import { useControllableState } from "@/hooks/useControllableState";
import { TriangleAlertIcon } from "lucide-react";
import { useState } from "react";

const DEFAULT_CONFIRMATION_TEXT = "DELETE";

interface ConfirmDeleteDialogProps {
  /** External control of open state (optional) */
  open?: boolean;
  onOpenChange?: (next: boolean | ((prev: boolean) => boolean)) => void;

  /** Resource type (e.g., "course", "user", "project") */
  resourceName?: string;

  /** Name or title of the resource (e.g., "Figma Masterclass") */
  resourceDisplayName?: string;

  /** Function to call when confirmed */
  onConfirm?: () => Promise<void> | void;

  /** Whether to show a text input confirmation field */
  requireInputConfirmation?: boolean;

  /** Text that must be typed to confirm (default: "DELETE") */
  confirmationText?: string;

  /** Label for the confirm button (default: "Delete") */
  actionLabel?: string;

  /** Trigger element (e.g., a delete button) */
  children?: React.ReactNode;
}

/**
 * 🧩 ConfirmDeleteDialog
 *
 * A flexible, reusable confirmation dialog for destructive actions (e.g., deleting a course, user, or item).
 *
 * Features:
 * - Optional input confirmation for extra safety.
 * - Fully customizable labels and trigger.
 * - Works for any type of resource.
 */
export const ConfirmDeleteDialog: React.FC<ConfirmDeleteDialogProps> = ({
  open,
  onOpenChange,
  resourceName = "item",
  resourceDisplayName,
  onConfirm,
  requireInputConfirmation = true,
  confirmationText = DEFAULT_CONFIRMATION_TEXT,
  actionLabel = "Delete",
  children,
}) => {
  // Allows both controlled and uncontrolled usage
  const [isOpen, setIsOpen] = useControllableState({
    value: open,
    onChange: onOpenChange,
    defaultValue: false,
  });

  // Used only when input confirmation is required
  const [confirmationInput, setConfirmationInput] = useState("");

  const handleConfirm = async () => {
    // If confirmation is required, validate input
    if (requireInputConfirmation && confirmationInput !== confirmationText)
      return;

    // Execute external action
    if (onConfirm) await onConfirm();

    // Close dialog & reset input
    setIsOpen(false);
    setConfirmationInput("");
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      {/* Optional trigger (e.g., button) */}
      {children && <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>}

      <AlertDialogContent>
        <AlertDialogHeader className="items-center">
          {/* Warning Icon */}
          <div className="bg-destructive/10 mx-auto mb-2 flex size-12 items-center justify-center rounded-full">
            <TriangleAlertIcon className="text-destructive size-6" />
          </div>

          {/* Title */}
          <AlertDialogTitle className="text-center">
            Are you sure you want to delete{" "}
            {resourceDisplayName ? (
              <strong>{resourceDisplayName}</strong>
            ) : (
              `this ${resourceName}`
            )}
            ?
          </AlertDialogTitle>

          {/* Description */}
          <AlertDialogDescription className="text-center">
            This action cannot be undone. It will permanently delete this{" "}
            {resourceName} and remove all related data.
            {requireInputConfirmation && (
              <>
                {" "}
                Please type{" "}
                <strong className="text-destructive">
                  {confirmationText}
                </strong>{" "}
                to confirm.
              </>
            )}
          </AlertDialogDescription>

          {/* Optional confirmation input */}
          {requireInputConfirmation && (
            <Input
              value={confirmationInput}
              onChange={(e) => setConfirmationInput(e.target.value)}
              placeholder={confirmationText}
              className="border-destructive/50 mt-2"
            />
          )}
        </AlertDialogHeader>

        {/* Footer with cancel & confirm buttons */}
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            disabled={
              requireInputConfirmation && confirmationInput !== confirmationText
            }
            className="bg-destructive dark:bg-destructive/60 hover:bg-destructive focus-visible:ring-destructive text-white"
          >
            {actionLabel}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
