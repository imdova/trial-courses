import React from "react";
import { X } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../UI/Alert";
import IconButton from "../UI/Buttons/IconButton";

interface ModalHeaderProps {
  title?: React.ReactNode;
  description?: React.ReactNode;
  error?: string;
  handleCancel: () => void;
}

export const ModalHeader: React.FC<ModalHeaderProps> = ({
  title,
  description,
  error,
  handleCancel,
}) => (
  <>
    <div className="border-b border-gray-200 p-2 text-lg font-bold">
      <div className="flex items-start">
        <div className="flex-1 p-2">
          {title}
          {description &&
            (typeof description === "string" ? (
              <p className="text-muted-foreground mt-1 text-sm font-normal">
                {description}
              </p>
            ) : (
              description
            ))}
        </div>
        <IconButton
          className="!bg-gray-100 !text-gray-600"
          Icon={X}
          onClick={handleCancel}
        />
      </div>
    </div>
    {error && (
      <Alert variant="destructive" className="my-1 !w-full">
        <AlertTitle>Something went wrong.</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )}
  </>
);
