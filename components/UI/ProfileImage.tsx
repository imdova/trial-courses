import React, { useState } from "react";
import { DeleteOutline, PhotoCamera } from "@mui/icons-material";
import { Avatar, AvatarImage, AvatarFallback } from "./Avatar";
import { FileUploadModal } from "../FormModal/FileUploadModal";
import { AVATAR_IMAGE_PLACEHOLDER } from "@/constants";
import { cn } from "@/util";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";

interface ProfileImageProps {
  currentImageUrl?: string;
  size?: "small" | "medium" | "large" | "xLarge";
  onImageUpdate?: (file: File) => Promise<void>;
  onImageRemove?: () => Promise<void>;
  maxFileSizeMB?: number;
  alt: string;
  // Style props
  className?: string;
  imageClassName?: string;
  // Custom styling
  avatarStyle?: React.CSSProperties;
  imageStyle?: React.CSSProperties;
  // Labels
  uploadModalTitle?: string;
  uploadButtonText?: string;
  removeButtonText?: string;
}

const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png"];

const SIZE_MAP = {
  small: { width: 32, height: 32 },
  medium: { width: 48, height: 48 },
  large: { width: 78, height: 78 },
  xLarge: { width: 96, height: 96 },
} as const;

export const ProfileImage: React.FC<ProfileImageProps> = ({
  currentImageUrl,
  onImageUpdate,
  onImageRemove,
  maxFileSizeMB = 1,
  size = "medium",
  className,
  alt = "User",
  imageClassName,
  // Custom styling
  avatarStyle,
  // Labels
  uploadModalTitle = "Update Profile Picture",
  uploadButtonText = "Upload",
}) => {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const handleUploadClick = () => {
    setIsUploadModalOpen(true);
  };
  const handleRemoveClick = async () => {
    if (onImageRemove) {
      await onImageRemove();
    }
  };
  const handleUpload = async (files: File[]) => {
    const file = files[0];
    await onImageUpdate?.(file);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div
            className={cn(
              "group relative overflow-hidden border duration-200 border-white shadow-md aria-expanded:border-primary aria-expanded:ring-primary/50 aria-expanded:ring-[3px] bg-primary/10 rounded-full",
              className
            )}
            style={avatarStyle}
          >
            <Avatar
              style={SIZE_MAP[size]}
              className="bg-white border border-white"
            >
              <AvatarImage
                src={currentImageUrl || AVATAR_IMAGE_PLACEHOLDER}
                alt={alt}
                className={cn("object-cover bg-primary/10", imageClassName)}
              />
              <AvatarFallback className="text-xs bg-primary/10">
                {alt.slice(0, 2)}
              </AvatarFallback>
            </Avatar>

            {/* Overlay with camera icon */}
            <div
              className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100"
              aria-label="Update profile picture"
            >
              <PhotoCamera className="h-7 w-7 text-white" />
            </div>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={handleUploadClick} className="text-sm">
            <PhotoCamera />
            Update Photo
          </DropdownMenuItem>
          {onImageRemove && currentImageUrl && (
            <DropdownMenuItem
              onClick={handleRemoveClick}
              className="text-red-600 text-sm"
            >
              <DeleteOutline className="mr-2 h-4 w-4" />
              Remove Photo
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <FileUploadModal
        open={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onUpload={handleUpload}
        title={uploadModalTitle}
        uploadButtonText={uploadButtonText}
        maxFileSizeMB={maxFileSizeMB}
        acceptedFileTypes={ACCEPTED_IMAGE_TYPES}
        previewType="image"
        description="Choose a new profile picture. Supported formats: JPG, PNG, GIF"
      />
    </>
  );
};

export default ProfileImage;
