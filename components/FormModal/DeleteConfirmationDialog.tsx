import React, { useState } from "react";
import TextField from "./fields/TextField";
import { ButtonColor } from "@/types/forms";
import { Button } from "../UI/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../UI/dialog";

interface DeleteConfirmationDialogProps {
  open: boolean;
  title: string;
  message?: string;
  onDelete: () => void;
  onClose: () => void;
  loading?: boolean;
  color?: ButtonColor;
  buttonText?: string;
  hardDeleteText?: string; // ✅ NEW prop
}

const DeleteConfirmationDialog: React.FC<DeleteConfirmationDialogProps> = ({
  // open,
  title,
  message,
  onDelete,
  // onClose,
  loading,
  color = "danger",
  buttonText = "Yes Delete",
  hardDeleteText,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");

  const colors: Record<ButtonColor, string> = {
    success: "text-green-600",
    primary: "text-green-600",
    secondary: "text-green-600",
    warning: "text-amber-600",
    danger: "text-red-600",
    error: "text-red-600",
  };

  const handleDeleteClick = () => {
    if (hardDeleteText) {
      if (inputValue !== hardDeleteText) {
        setError("Text does not match. Please type it exactly.");
        return;
      }
    }
    onDelete();
  };

  // const handleClose = () => {
  //   setInputValue("");
  //   setError("");
  //   onClose();
  // };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Share</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className={colors[color]}>{title}</DialogTitle>
          <DialogDescription>{message}</DialogDescription>
        </DialogHeader>
        {hardDeleteText && (
          <div className="mt-4">
            <p className="text-sm text-red-500">
              To confirm, type this exactly: <strong>{hardDeleteText}</strong>
            </p>
            <TextField
              className="w-full"
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
                setError("");
              }}
              error={!!error}
              helperText={error}
            />
          </div>
        )}
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
          <Button onClick={handleDeleteClick} color={color} disabled={loading}>
            {loading ? "loading..." : buttonText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteConfirmationDialog;
