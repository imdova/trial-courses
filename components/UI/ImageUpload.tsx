"use client";

import Image from "next/image";
import { useCallback, useState, useRef, useEffect } from "react";
import { Button } from "@/components/UI/button";
import { cn } from "@/util";
import { X, Camera, RefreshCcw } from "lucide-react";

interface ImageUploadProps {
  onChange: (file: File | null) => void;
  value?: File | string | null;
  label?: string;
  required?: boolean;
  resolution?: string;
}

const ImageUpload = ({
  onChange,
  value,
  resolution = "400 x 250",
}: ImageUploadProps) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle preview
  useEffect(() => {
    if (typeof value === "string") {
      setPreview(value);
    } else if (value instanceof File) {
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result as string);
      reader.readAsDataURL(value);
    } else {
      setPreview(null);
    }
  }, [value]);

  // Handle file selection
  const handleFileChange = useCallback(
    (file: File | null) => {
      if (file) {
        if (!file.type.match("image.*")) return;
        onChange(file);
      } else {
        onChange(null);
      }
    },
    [onChange],
  );

  // Drag events
  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
      if (e.dataTransfer.files?.length > 0) {
        handleFileChange(e.dataTransfer.files[0]);
      }
    },
    [handleFileChange],
  );

  const handleClick = () => fileInputRef.current?.click();

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleFileChange(null);
  };

  return (
    <div
      onClick={handleClick}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={cn(
        "border-muted-foreground/20 hover:border-foreground/40 mt-1 flex h-52 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed transition-all duration-200",
        isDragging && "border-green-600 bg-green-50",
      )}
    >
      {preview ? (
        <div className="group relative w-full">
          <Image
            width={400}
            height={400}
            src={preview}
            alt="Preview"
            className="h-full max-h-52 w-full rounded-md object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-200 group-hover:bg-black/40 group-hover:opacity-100">
            <div className="flex gap-2">
              <Button
                type="button"
                size="icon"
                variant="outline"
                onClick={handleClick}
                title="Change image"
                className="rounded-full"
              >
                <RefreshCcw className="h-5 w-5" />
              </Button>
              <Button
                type="button"
                size="icon"
                variant="outline"
                onClick={handleRemove}
                title="Remove image"
                className="rounded-full"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-2 text-center">
          <Camera
            className={cn(
              "mx-auto h-12 w-12",
              isDragging ? "text-green-600" : "text-muted-foreground",
            )}
          />
          <div className="text-muted-foreground text-sm">
            <span className="font-medium text-green-600">Upload a file</span>
            <p className="pl-1">or drag and drop</p>
          </div>
          <p className="text-muted-foreground text-xs">
            Fixed resolution is ({resolution})
          </p>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="sr-only"
            onChange={(e) =>
              handleFileChange(e.target.files ? e.target.files[0] : null)
            }
          />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
