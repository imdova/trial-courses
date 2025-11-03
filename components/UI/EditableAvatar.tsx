import React, { useState } from "react";
import { PhotoCamera } from "@mui/icons-material";
import { Avatar, AvatarImage } from "./Avatar";
import { AVATAR_IMAGE_PLACEHOLDER } from "@/constants";
import { cn } from "@/util";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { Camera } from "lucide-react";
import DropFileDialog from "./DropFileDialog";

interface EditableAvatarProps {
  src?: string;
  className?: string;
  onSuccess?: (url: string[]) => void;
  multiple?: boolean;
  maxFiles?: number;
  maxFileSizeMB?: number;
  acceptedFileTypes?: string[];
  title?: string;
  description?: string;
  uploadButtonText?: string;
  cancelButtonText?: string;
  previewClassName?: string;
}

export const EditableAvatar: React.FC<EditableAvatarProps> = ({
  src,
  className,
  ...props
}) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <DropFileDialog open={open} onOpenChange={setOpen} {...props} />
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar
            className={cn(
              "border-input group size-20 cursor-pointer",
              className,
            )}
          >
            <AvatarImage
              src={src || AVATAR_IMAGE_PLACEHOLDER}
              alt={"Preview"}
            />
            <div className="absolute inset-0 z-5 hidden h-full w-full items-center justify-center bg-black/40 group-hover:flex [&>svg]:size-6 [&>svg]:text-white">
              <Camera />
            </div>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setOpen(true)} className="text-sm">
            <PhotoCamera />
            Update Photo
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default EditableAvatar;
