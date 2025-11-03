"use client";

import * as React from "react";
import { Button } from "@/components/UI/button";
import { Input } from "@/components/UI/input";
import { FileTextIcon, Loader2, Upload } from "lucide-react";
import { Avatar, AvatarFallback } from "./Avatar";
import { FormControl } from "./form";
import { uploadFiles } from "@/lib/actions/upload.actions";
import { toast } from "./toast";

type FileUploadInputProps = Omit<
  React.ComponentProps<"input">,
  "type" | "value" | "onChange"
> & {
  value?: string | File | null;
  onChange?: (value: string | File | null | undefined) => void;
  accept?: string; // "image/*" | ".pdf,.docx" | "*/*"
  label?: React.ReactNode; // button label (Upload Image, Upload File, etc.)
};

function FileUploadInput({ onChange, ...field }: FileUploadInputProps) {
  const [uploading, setUploading] = React.useState(false);

  const id = React.useId();

  const uploadMaterial = async (
    file: File | null,
    onChange?: (url: string) => void,
  ) => {
    setUploading(true);
    try {
      if (file && file instanceof File) {
        const [uploadedUrl] = await uploadFiles([file]);
        onChange?.(uploadedUrl);
      }
    } catch (error) {
      toast.error("Failed to upload file. Please try again.");
      console.error("File upload error:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-1 rounded-md shadow-xs">
      <Avatar className="border-input aspect-video h-9 w-auto rounded-md rounded-r-none border border-r-0">
        <AvatarFallback>
          <FileTextIcon />
        </AvatarFallback>
      </Avatar>
      <FormControl>
        <Input
          placeholder="Enter Material url"
          className="-me-px w-full rounded-l-none rounded-r-none shadow-none focus-visible:z-1"
          {...field}
          onChange={(e) =>
            e.target.value ? onChange?.(e.target.value) : onChange?.(undefined)
          }
          value={getFileName(field.value as string | File | null)}
        />
      </FormControl>
      <Input
        type="file"
        accept=".pdf,.docx,.txt"
        id={id}
        hidden
        className="w-20 rounded-l-none"
        onChange={(e) => uploadMaterial(e.target.files?.[0] || null, onChange)}
      />
      <Button
        asChild
        className="ml-[1px] rounded-l-none border-l-0"
        variant="muted"
        disabled={uploading}
      >
        <label htmlFor={id}>
          {uploading ? (
            <>
              <Loader2 className="text-primary animate-spin" />
              Uploading
            </>
          ) : (
            <>
              <Upload />
              Upload File
            </>
          )}
        </label>
      </Button>
    </div>
  );
}

export default FileUploadInput;

const getFileName = (value?: string | File | null) => {
  if (value instanceof File) {
    return value.name;
  }
  if (typeof value === "string") {
    return value;
  }
  if (!value) {
    return "";
  }
};
