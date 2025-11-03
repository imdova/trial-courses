import React from "react";
import { ButtonColor } from "@/types/forms";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../dialog";
import { Label } from "../label";
import { Input } from "../input";
import { Button } from "../button";

type ButtonVariant =
  | "default"
  | "destructive"
  | "outline"
  | "secondary"
  | "ghost"
  | "text"
  | "link";

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
  defaultButtonColors?: {
    leave?: string;
    stay?: string;
  };
}

const LeaveConfirmationModal: React.FC<LeaveConfirmationModalProps> = ({
  // isOpen,
  onLeave,
  onStay,
  title = "Are you sure you want to leave?",
  description = "You have unsaved changes. Are you sure you want to leave without saving?",
  hideDefaultButtons = false,
  additionalButtons = [],
}) => {
  const defaultButtons: ButtonConfig[] = !hideDefaultButtons
    ? [
        {
          text: "Stay",
          onClick: onStay,
          color: "success",
          variant: "outline",
        },
        {
          text: "Leave",
          onClick: onLeave,
          color: "danger",
          variant: "default",
          autoFocus: true,
        },
      ]
    : [];

  const allButtons: ButtonConfig[] = [...defaultButtons, ...additionalButtons];

  return (
    <Dialog>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="flex items-center gap-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input
              id="link"
              defaultValue="https://ui.shadcn.com/docs/installation"
              readOnly
            />
          </div>
        </div>
        <DialogFooter className="sm:justify-start">
          <div className="flex gap-2">
            {allButtons.map((button, index) => (
              <Button
                key={index}
                onClick={button.onClick}
                variant={button.variant}
                autoFocus={button.autoFocus}
                color={button.color}
              >
                {button.text}
              </Button>
            ))}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LeaveConfirmationModal;
