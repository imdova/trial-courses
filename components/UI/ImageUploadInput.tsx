"use client";

import * as React from "react";
import { Button } from "@/components/UI/button";
import { Input } from "@/components/UI/input";
import { ImageIcon, Upload } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./Avatar";
import { uploadFiles } from "@/lib/actions/upload.actions";
import { Spinner } from "./spinner";

function ImageUploadInput({
  value,
  onChange,
  autoUpload,
  ...props
}: Omit<React.ComponentProps<"input">, "type" | "value" | "onChange"> & {
  value?: string | File | null; // supports default URL or File
  onChange?: (value: string | File | null) => void;
  autoUpload?: boolean;
}) {
  const id = React.useId();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
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
        setError("Error uploading files: " + error.message);
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
      <div className="flex flex-1 rounded-md shadow-xs">
        <label htmlFor={id}>
          <Avatar className="border-input aspect-video h-full max-h-9 w-auto rounded-md rounded-r-none border border-r-0">
            <AvatarImage src={preview || undefined} alt={"Preview"} />
            <AvatarFallback>
              <ImageIcon />
            </AvatarFallback>
          </Avatar>
        </label>
        <Input
          type="text"
          placeholder="Enter url"
          className="-me-px flex-1 rounded-l-none rounded-r-none shadow-none focus-visible:z-1"
          value={preview || ""}
          onChange={(e) => onChange?.(e.target.value)}
          {...props}
        />
        <input
          type="file"
          hidden
          id={id}
          accept="image/*"
          onChange={handleFileChange}
          className="w-20 rounded-l-none"
        />
        <Button
          asChild
          className="ml-[1px] rounded-l-none border-l-0"
          variant="muted"
        >
          <label htmlFor={id}>
            {loading ? (
              <>
                <Spinner /> Uploading
              </>
            ) : (
              <>
                <Upload /> Upload
              </>
            )}
          </label>
        </Button>
      </div>
      <p className="text-destructive text-sm">{error}</p>
    </div>
  );
}

export default ImageUploadInput;
