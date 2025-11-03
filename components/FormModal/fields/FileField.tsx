import React, { useRef } from "react";
import {
  ControllerRenderProps,
  FieldError,
  FieldValues,
} from "react-hook-form";
import { Camera, FileText, Upload, X, ImageIcon } from "lucide-react";
import { cn } from "@/util";
import { FieldConfig } from "@/types/forms";
import { uploadFiles } from "@/lib/actions/upload.actions";
import { Avatar, AvatarImage } from "@/components/UI/Avatar";
import { AVATAR_IMAGE_PLACEHOLDER } from "@/constants";

const DEFAULT_ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png"];
const DEFAULT_ACCEPTED_FILE_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

interface FileFieldProps {
  field: FieldConfig;
  controllerField?: Partial<ControllerRenderProps<FieldValues, string>>;
  error?: FieldError | null;
}

export const FileField: React.FC<FileFieldProps> = ({
  field,
  controllerField,
  error,
}) => {
  const {
    type = "profile",
    acceptedFileTypes = type === "files"
      ? DEFAULT_ACCEPTED_FILE_TYPES
      : DEFAULT_ACCEPTED_IMAGE_TYPES,
    maxFiles = 1,
    size = 50, // avatar size
    shape = "circle",
    className = "",
  } = field.fileProps || {};

  const { onChange, value, disabled } = controllerField || {};
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const filesArray = Array.from(files);
    const uploadedFiles = await uploadFiles(filesArray);

    if (type === "images" || type === "files") {
      onChange?.(uploadedFiles);
    } else {
      onChange?.(uploadedFiles[0]);
    }
  };

  const handleRemove = (e: React.MouseEvent, index?: number) => {
    e.stopPropagation();
    if (index !== undefined && Array.isArray(value)) {
      onChange?.(value.filter((_, i) => i !== index));
    } else {
      onChange?.(null);
    }
  };

  const renderSingleImagePreview = () => (
    <div className="relative group">
      <Avatar className="w-20 h-20">
        <AvatarImage
          src={value || AVATAR_IMAGE_PLACEHOLDER}
          className={cn(
            "object-cover transition-all duration-200 group-hover:opacity-90",
            error && "border-2 border-red-500",
            className
          )}
        />
      </Avatar>

      <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 rounded-full transition-opacity">
        <Camera className="h-5 w-5 text-white" />
      </div>
      <button
        type="button"
        onClick={handleRemove}
        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );

  const renderFileItem = (file: string | File, index: number) => {
    const isImage =
      typeof file === "string" && file.match(/\.(jpeg|jpg|gif|png)$/) != null;

    if (isImage) {
      return (
        <div key={index} className="relative group">
          <Avatar className="w-20 h-20">
            <AvatarImage
              src={file}
              className={cn(
                "object-cover transition-all duration-200 group-hover:opacity-90",
                error && "border-2 border-red-500",
                className
              )}
            />
          </Avatar>
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 rounded-lg transition-opacity">
            <ImageIcon className="h-5 w-5 text-white" />
          </div>
          <button
            type="button"
            onClick={(e) => handleRemove(e, index)}
            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
          >
            <X className="h-3 w-3" />
          </button>
        </div>
      );
    }

    // For non-image files (PDF, DOC, etc.)
    const fileName =
      typeof file === "string"
        ? file.split("/").pop()?.split("?")[0]
        : file.name;

    return (
      <div
        key={index}
        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors group"
      >
        <div className="flex items-center gap-3">
          <FileText className="h-5 w-5 text-gray-500 flex-shrink-0" />
          <span className="text-sm font-medium truncate max-w-[180px]">
            {fileName}
          </span>
        </div>
        <button
          type="button"
          onClick={(e) => handleRemove(e, index)}
          className="text-gray-400 hover:text-red-500 transition-colors p-1"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  };

  const renderMultipleFilesPreview = () => {
    const hasFiles = value && Array.isArray(value) && value.length > 0;
    console.log(value, "hasFiles")
    const canAddMore =
      maxFiles === undefined ||
      (Array.isArray(value) && value.length < maxFiles);

    return (
      <div className="space-y-3 p-2">
        {hasFiles && (
          <div
            className={cn(
              "grid gap-3",
              type === "images"
                ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
                : "grid-cols-1"
            )}
          >
            {value.map(renderFileItem)}
          </div>
        )}
        {typeof value === "string" && (
          <div
            className={cn(
              "grid gap-3",
              type === "images"
                ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
                : "grid-cols-1"
            )}
          >
            {renderFileItem(value, 1)}
          </div>
        )}

        {canAddMore && (
          <div
            onClick={() => fileInputRef.current?.click()}
            className={cn(
              "flex flex-col items-center justify-center cursor-pointer border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors p-6",
              error && "border-red-500"
            )}
          >
            <Upload className="h-8 w-8 text-gray-400 mb-2" />
            <span className="text-sm text-gray-500 text-center">
              {type === "images" ? "Upload images" : "Upload files"}
              <br />
              <span className="text-xs text-gray-400">
                {type === "images"
                  ? "JPG, PNG up to 5MB"
                  : "PDF, DOC up to 5MB"}
              </span>
            </span>
            <input
              type="file"
              ref={fileInputRef}
              onChange={(e) => handleUpload(e.target.files)}
              accept={acceptedFileTypes.join(",")}
              multiple={type === "images" || type === "files"}
              className="hidden"
              disabled={disabled}
            />
          </div>
        )}
      </div>
    );
  };

  const renderPlaceholder = () => (
    <div
      onClick={() => fileInputRef.current?.click()}
      className={cn(
        "flex flex-col items-center justify-center cursor-pointer border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors",
        type === "profile" || type === "image"
          ? `w-${size} h-${size} ${
              shape === "circle" ? "rounded-full" : "rounded-lg"
            }`
          : "w-full min-h-40 p-6",
        error && "border-red-500"
      )}
    >
      {type === "files" ? (
        <>
          <Upload className="h-8 w-8 text-gray-400 mb-2" />
          <span className="text-sm text-gray-500 text-center">
            Upload files
            <br />
            <span className="text-xs text-gray-400">PDF, PPTX up to 5MB</span>
          </span>
        </>
      ) : (
        <>
          <Camera className="h-8 w-8 text-gray-400 mb-2" />
          <span className="text-sm text-gray-500 text-center">
            Upload image
            <br />
            <span className="text-xs text-gray-400">JPG, PNG up to 5MB</span>
          </span>
        </>
      )}
      <input
        type="file"
        ref={fileInputRef}
        onChange={(e) => handleUpload(e.target.files)}
        accept={acceptedFileTypes.join(",")}
        multiple={type === "images" || type === "files"}
        className="hidden"
        disabled={disabled}
      />
    </div>
  );

  const renderPreview = () => {
    if (!value || (Array.isArray(value) && value.length === 0)) {
      return renderPlaceholder();
    }

    if (type === "profile" || type === "image") {
      return (
        <div className="flex items-center gap-4">
          {renderSingleImagePreview()}
          <div
            onClick={() => fileInputRef.current?.click()}
            className={cn(
              "flex flex-col items-center justify-center cursor-pointer border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors",
              `w-${size} h-${size} ${
                shape === "circle" ? "rounded-full" : "rounded-lg"
              }`,
              error && "border-red-500"
            )}
          >
            <Camera className="h-5 w-5 text-gray-400" />
          </div>
        </div>
      );
    }

    if (type === "images" || type === "files") {
      return renderMultipleFilesPreview();
    }

    return null;
  };

  return (
    <div
      className={cn(
        "space-y-2",
        type === "profile" || type === "image" ? "" : "min-h-40",
        className
      )}
    >
      {field.label && (
        <div className="mb-1">
          <label htmlFor={String(field.name)} className={`font-semibold `}>
            {field.label?.replace("*", "")}
            {field.required ? <span className="text-red-500">*</span> : null}
          </label>
        </div>
      )}
      {renderPreview()}
      {error && <p className="text-sm text-red-500">{error.message}</p>}
    </div>
  );
};
