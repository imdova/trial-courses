"use client";

import * as React from "react";
import { Camera } from "lucide-react";
import { Avatar, AvatarImage } from "./Avatar";
import { AVATAR_IMAGE_PLACEHOLDER } from "@/constants";
import { cn } from "@/util";
import { uploadFiles } from "@/lib/actions/upload.actions";
import { toast } from "./toast";
import { Spinner } from "./spinner";

function AvatarInput({
  value,
  onChange,
  autoUpload,
  className,
}: Omit<React.ComponentProps<"input">, "type" | "value" | "onChange"> & {
  value?: string | File | null; // supports default URL or File
  onChange?: (value: string | File | null) => void;
  autoUpload?: boolean;
  className?: string;
}) {
  const id = React.useId();
  const [loading, setLoading] = React.useState(false);
  const [preview, setPreview] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (value instanceof File) {
      const objectUrl = URL.createObjectURL(value);
      setPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
    if (typeof value === "string") {
      setPreview(value); // existing image URL
    }
    if (!value) {
      setPreview(null);
    }
  }, [value]);

  const upload = async (files: File) => {
    setLoading(true);
    try {
      const uploadedUrls = await uploadFiles([files]);
      return uploadedUrls[0];
    } catch (error) {
      if (error instanceof Error) {
        toast.error("Error uploading files", {
          description: error.message,
        });
      }
      return null;
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (autoUpload) {
        const uploaded = await upload(file);
        onChange?.(uploaded);
      } else {
        onChange?.(file);
      }
    }
  };

  return (
    <div>
      <label htmlFor={id}>
        <Avatar
          className={cn("border-input group size-20 cursor-pointer", className)}
        >
          <AvatarImage
            src={preview || AVATAR_IMAGE_PLACEHOLDER}
            alt={"Preview"}
          />
          <div className="absolute inset-0 z-5 hidden h-full w-full items-center justify-center bg-black/40 group-hover:flex [&>svg]:size-6 [&>svg]:text-white">
            <Camera />
          </div>
          {loading && (
            <div className="absolute inset-0 z-5 flex h-full w-full items-center justify-center bg-black/40 [&>svg]:size-6 [&>svg]:text-white">
              <Spinner />
            </div>
          )}
        </Avatar>
      </label>
      <input
        type="file"
        hidden
        id={id}
        accept="image/*"
        onChange={handleFileChange}
      />
    </div>
  );
}

export default AvatarInput;
