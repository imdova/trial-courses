import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { cn } from "@/util";
import { CloudUpload, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { ImageNotSupported } from "@mui/icons-material";
import { uploadFiles } from "@/lib/actions/upload.actions";
import { Avatar, AvatarFallback, AvatarImage } from "./Avatar";
import { AspectRatio } from "./aspect-ratio";

interface UploadAreaProps {
  onChange: (file: FileWithPreview[] | string | string[] | null) => void;
  value?: File | string | null;
  aspectRatio?: number;
  autoUpload?: boolean;
  maxSize?: number;
  previewType?: "image" | "list" | "grid" | "pdf";
  maxFiles?: number;
  multiple?: boolean;
  acceptedFileTypes?: string[];
}

interface FileWithPreview extends File {
  preview: string;
  uploaded?: boolean;
}

function createFileWithPreviewFromUrl(
  url?: string | FileWithPreview[] | null,
): FileWithPreview[] {
  if (!url) return [];

  // Handle array of URLs
  if (Array.isArray(url)) {
    return url;
  }

  const fakeFile = {
    name: url.split("/").pop() || "image.jpg",
    lastModified: Date.now(),
    size: 0,
    type: "image/jpeg", // or guess from url
    preview: url,
    uploaded: true,
  } as FileWithPreview;

  return [fakeFile];
}

const DEFAULT_ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png"];

const UploadArea: React.FC<UploadAreaProps> = ({
  onChange,
  value: initialValue,
  aspectRatio = 16 / 9,
  autoUpload = true,
  maxSize = 1,
  maxFiles = 1,
  multiple = false,
  acceptedFileTypes = DEFAULT_ACCEPTED_IMAGE_TYPES,
}) => {
  const [loading, setLoading] = useState(false);
  const value = createFileWithPreviewFromUrl(String(initialValue));
  function handleAddFiles(
    oldData: FileWithPreview[],
    newData: FileWithPreview[],
    maxFiles: number,
  ): FileWithPreview[] {
    if (maxFiles === 1) {
      // Replace the old file with the first new file
      return newData.slice(0, 1);
    }
    const totalFiles = oldData.length + newData.length;

    if (totalFiles <= maxFiles) {
      return [...oldData, ...newData];
    } else {
      const remainingSlots = maxFiles - oldData.length;
      if (remainingSlots > 0) {
        return [...oldData, ...newData.slice(0, remainingSlots)];
      } else {
        // No room, return oldData or optionally replace oldest?
        return oldData;
      }
    }
  }

  const showError = (message: string) => {
    toast.error(message);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      const oversizedFiles = acceptedFiles.filter(
        (file) => file.size > maxSize * 1024 * 1024,
      );
      if (oversizedFiles.length > 0) {
        showError(`Some files exceed the ${maxSize}MB limit`);
        return;
      }
      // Check number of files
      if (acceptedFiles.length > maxFiles) {
        showError(`Maximum ${maxFiles} files allowed`);
        return;
      }

      if (acceptedFiles.length === 0) {
        showError(
          `Unsupported file type. Only ${acceptedFileTypes.join(", ")} allowed.`,
        );
        return;
      }

      if (value.length + acceptedFiles.length > 3) {
        showError("You can only upload up to 3 files.");
        return;
      }

      const filesWithPreview = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
          uploaded: false,
        }),
      );
      const newValue = handleAddFiles(value, filesWithPreview, maxFiles);
      upload(newValue);
    },
    accept: acceptedFileTypes.reduce(
      (acc, curr) => ({ ...acc, [curr]: [] }),
      {},
    ),
    multiple: multiple,
    maxFiles: maxFiles,
  });

  const upload = async (files: FileWithPreview[]) => {
    setLoading(true);
    try {
      if (autoUpload) {
        const uploadedUrls = await uploadFiles(files);
        if (maxFiles === 1) {
          onChange?.(uploadedUrls[0] || "");
        } else {
          onChange?.(uploadedUrls);
        }
      } else {
        onChange?.(files);
      }
    } catch (error) {
      showError("Error uploading files");
      console.error("Error uploading files:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      {...getRootProps()}
      className={cn(
        "hover:border-primary hover:bg-primary/10 border-muted-foreground/50 bg-muted relative cursor-pointer rounded-lg border-2 border-dashed p-2 text-center transition-colors duration-300",
        isDragActive && "border-primary bg-primary/10",
      )}
    >
      {loading && (
        <div className="absolute top-0 right-0 bottom-0 left-0 z-10 flex items-center justify-center rounded-lg bg-black/10">
          <Loader2 className="mx-auto size-9 animate-spin text-white" />
        </div>
      )}
      <input {...getInputProps()} />
      <AspectRatio ratio={aspectRatio} className="rounded-lg">
        {value.length > 0 ? (
          value[0]?.type?.startsWith("image/") && (
            <ImagePreview file={value[0]} />
          )
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-2">
            <CloudUpload className="size-10 text-gray-400" />
            <p className="px-2 text-sm">
              Drag & drop {multiple ? "files" : "a file"} here, or click to
              select
            </p>
            <p className="text-muted-foreground text-xs">
              {acceptedFileTypes.join(", ")} (max {maxSize}MB
              {multiple ? `, ${maxFiles} files` : ""})
            </p>
          </div>
        )}
      </AspectRatio>
    </div>
  );
};

export default UploadArea;

const ImagePreview: React.FC<{ file: FileWithPreview }> = ({ file }) => {
  return (
    <Avatar className="size-full rounded-lg object-cover">
      <AvatarImage className="size-full object-cover" src={file.preview} />
      <AvatarFallback>
        <div className="shadow-soft bg-muted flex size-full items-center justify-center border">
          <ImageNotSupported className="size-24 text-gray-300" />
        </div>
      </AvatarFallback>
    </Avatar>
  );
};
