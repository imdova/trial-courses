import React, { useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "./Avatar";
import { cn } from "@/util";
import { CloudUpload, ImageIcon } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";
import { Separator } from "./separator";
import { useDropzone } from "react-dropzone";
import { Button } from "./button";
import DotLoading from "./DotLoading";
import { Alert, AlertDescription } from "./Alert";
import { uploadFiles } from "@/lib/actions/upload.actions";
import { useControllableState } from "@/hooks/useControllableState";
import { PDF_ICON } from "../icons/icons";

const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png"];

interface DropFileDialogProps {
  open?: boolean;
  onOpenChange?: (next: boolean | ((prev: boolean) => boolean)) => void;
  multiple?: boolean;
  maxFiles?: number;
  maxFileSizeMB?: number;
  acceptedFileTypes?: string[];
  previewType?: "image" | "list" | "grid" | "pdf";
  title?: string;
  description?: string;
  uploadButtonText?: string;
  cancelButtonText?: string;
  previewClassName?: string;
  onSuccess?: (urls: string[]) => void;
  children?: React.ReactNode;
}

const DropFileDialog: React.FC<DropFileDialogProps> = ({
  open: isOpen,
  onOpenChange,
  multiple = false,
  maxFiles = 1,
  maxFileSizeMB = 1,
  acceptedFileTypes = ACCEPTED_IMAGE_TYPES,
  title = "Upload Files",
  previewType = "image",
  description,
  uploadButtonText = "Upload",
  cancelButtonText = "Cancel",
  previewClassName,
  onSuccess,
  children,
}) => {
  const [open, setOpen] = useControllableState({
    value: isOpen,
    onChange: onOpenChange,
    defaultValue: false,
  });

  const [selectedFiles, setSelectedFiles] = useState<FileWithPreview[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      setError(null);

      const oversizedFiles = acceptedFiles.filter(
        (file) => file.size > maxFileSizeMB * 1024 * 1024,
      );
      if (oversizedFiles.length > 0) {
        setError(`Some files exceed the ${maxFileSizeMB}MB limit`);
        return;
      }

      // Check number of files
      if (multiple && selectedFiles.length + acceptedFiles.length > maxFiles) {
        setError(`Maximum ${maxFiles} files allowed`);
        return;
      }

      if (acceptedFiles.length === 0) {
        setError(
          `Unsupported file type. Only ${acceptedFileTypes.join(", ")} allowed.`,
        );
        return;
      }

      const filesWithPreview = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
          uploaded: false,
        }),
      );

      if (multiple) {
        setSelectedFiles((prev) => [...prev, ...filesWithPreview]);
      } else {
        setSelectedFiles(filesWithPreview);
      }
    },
    accept: acceptedFileTypes.reduce(
      (acc, curr) => ({ ...acc, [curr]: [] }),
      {},
    ),
    multiple: multiple,
    maxFiles: maxFiles,
  });

  const upload = async () => {
    if (selectedFiles.length === 0) return setError("No files selected");
    setLoading(true);
    setError(null);
    try {
      const uploadedUrls = await uploadFiles(selectedFiles);
      onOpenChangeHandler(false);
      onSuccess?.(uploadedUrls);
    } catch (error) {
      if (error instanceof Error) {
        setError("Error uploading files :" + error.message);
      }
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Cleanup previews on unmount
  React.useEffect(() => {
    return () => {
      selectedFiles.forEach((file) => {
        if (file.preview) URL.revokeObjectURL(file.preview);
      });
    };
  }, [selectedFiles]);

  const onOpenChangeHandler = (open: boolean) => {
    if (!open) {
      setSelectedFiles([]);
      setError(null);
    }
    setOpen(open);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChangeHandler}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="p-0 py-5 sm:max-w-xl">
        <DialogHeader className="px-5">
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <Separator />

        <div
          {...getRootProps()}
          className={cn(
            "mx-4 max-h-[250px] cursor-pointer rounded-lg border-2 border-dashed p-4 text-center transition-colors",
            isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300",
          )}
        >
          <input {...getInputProps()} />
          {selectedFiles.length > 0 ? (
            <div>
              {previewType === "image" &&
                selectedFiles[0]?.type?.startsWith("image/") && (
                  <ImagePreview
                    file={selectedFiles[0]}
                    className={previewClassName}
                  />
                )}
              {previewType === "list" && <ListPreview files={selectedFiles} />}
              {previewType === "grid" && <GridPreview files={selectedFiles} />}
              {previewType === "pdf" && <PDFPreview file={selectedFiles[0]} />}
            </div>
          ) : (
            <div className="py-8">
              <CloudUpload className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-2">
                Drag & drop {multiple ? "files" : "a file"} here, or click to
                select
              </p>
              <p className="text-muted-foreground mt-1">
                {acceptedFileTypes.join(", ")} (max {maxFileSizeMB}MB
                {multiple ? `, ${maxFiles} files` : ""})
              </p>
            </div>
          )}
        </div>
        {error && (
          <div className="px-3">
            <Alert variant="destructive">
              <AlertDescription className="text-xs">{error}</AlertDescription>
            </Alert>
          </div>
        )}
        <Separator />
        <DialogFooter className="px-5">
          <DialogClose asChild>
            <Button variant="outline" disabled={loading}>
              {cancelButtonText}
            </Button>
          </DialogClose>
          <Button
            onClick={upload}
            disabled={selectedFiles.length === 0 || loading}
          >
            {loading ? (
              <>
                Uploading
                <DotLoading size="xs" className="space-x-1" />
              </>
            ) : (
              uploadButtonText
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DropFileDialog;

const ImagePreview: React.FC<{
  file: FileWithPreview;
  className?: string;
}> = ({ file, className }) => {
  return (
    <Avatar className={cn("h-[200px] w-auto rounded", className)}>
      <AvatarImage src={file.preview || ""} alt={file.name} />
      <AvatarFallback>
        <ImageIcon />
      </AvatarFallback>
    </Avatar>
  );
};

export const ListPreview: React.FC<{ files: FileWithPreview[] }> = ({
  files,
}) => (
  <ul className="mt-4 space-y-2">
    {files.map((file, index) => (
      <li key={index} className="flex items-center space-x-2">
        <div className="text-sm text-gray-600">{file.name}</div>
        <div className="text-xs text-gray-400">
          ({Math.round(file.size / 1024)}KB)
        </div>
      </li>
    ))}
  </ul>
);

export const GridPreview: React.FC<{ files: FileWithPreview[] }> = ({
  files,
}) => (
  <div className="grid grid-cols-3 justify-items-center">
    {files.map((file, index) => (
      <div key={index} className="relative aspect-square h-full w-full">
        {file.type.startsWith("image/") ? (
          <Avatar className="h-full w-full rounded-lg border border-gray-300 bg-gray-100">
            <AvatarImage src={file.preview || ""} alt={file.name} />
            <AvatarFallback>
              <ImageIcon />
            </AvatarFallback>
          </Avatar>
        ) : file.type.startsWith("application/pdf") ? (
          <div className="mx-auto flex h-full w-full flex-col items-center justify-center rounded-lg border border-gray-300 bg-gray-100 p-2">
            <PDF_ICON width={40} height={40} className="text-[#EF5350]" />
            <div className="text-xs break-all text-gray-600">{file.name}</div>
            <div className="text-xs text-gray-400">
              ({Math.round(file.size / 1024)}KB)
            </div>
          </div>
        ) : (
          <div className="flex h-full items-center justify-center rounded-lg bg-gray-100">
            <p className="text-sm text-gray-600">{file.name}</p>
          </div>
        )}
      </div>
    ))}
  </div>
);

export const PDFPreview: React.FC<{ file: FileWithPreview }> = ({ file }) => {
  return (
    <div className="mx-auto flex h-32 w-32 flex-col items-center justify-center rounded-lg border border-gray-300 bg-gray-100 p-2">
      <PDF_ICON width={40} height={40} className="text-[#EF5350]" />
      <div className="text-xs break-all text-gray-600">{file.name}</div>
      <div className="text-xs text-gray-400">
        ({Math.round(file.size / 1024)}KB)
      </div>
    </div>
  );
};
