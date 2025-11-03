import { UploadIcon, FileIcon, Trash2, DownloadIcon } from "lucide-react";
import Link from "next/link";
import { useState, useRef, ChangeEvent } from "react";

interface UploadedFile {
  id: string;
  name: string;
  url: string;
  type: "pdf" | "ppt" | "doc" | "other";
  size: number;
}

export const FileUploader = ({
  lectureId,
  onFilesUpload,
}: {
  lectureId: string;
  onFilesUpload: (urls: string[]) => void;
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const getFileType = (fileName: string): UploadedFile["type"] => {
    const extension = fileName.split(".").pop()?.toLowerCase();
    if (extension === "pdf") return "pdf";
    if (["ppt", "pptx"].includes(extension || "")) return "ppt";
    if (["doc", "docx"].includes(extension || "")) return "doc";
    return "other";
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);

    // In a real app, replace this with actual cloud storage upload
    const newFiles: UploadedFile[] = [];
    const newUrls: string[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const fileType = getFileType(file.name);

      // Mock upload - replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      const mockUrl = URL.createObjectURL(file);

      newFiles.push({
        id: `${lectureId}-${Date.now()}-${i}`,
        name: file.name,
        url: mockUrl,
        type: fileType,
        size: file.size,
      });

      newUrls.push(mockUrl);
    }

    setUploadedFiles((prev) => [...prev, ...newFiles]);
    onFilesUpload(newUrls);
    setIsUploading(false);

    // Reset input to allow selecting same files again
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeFile = (id: string) => {
    setUploadedFiles((prev) => prev.filter((file) => file.id !== id));
    // In a real app, you'd also delete from cloud storage here
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const getFileIcon = (type: UploadedFile["type"]) => {
    switch (type) {
      case "pdf":
        return <FileIcon className="text-red-500" />;
      case "ppt":
        return <FileIcon className="text-orange-500" />;
      case "doc":
        return <FileIcon className="text-blue-500" />;
      default:
        return <FileIcon className="text-gray-500" />;
    }
  };

  return (
    <div className="space-y-4">
      {/* Upload Button */}
      <div className="flex flex-col  gap-4 items-start">
        <label className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 text-green-600 rounded-md cursor-pointer hover:bg-green-100 transition-colors">
          <UploadIcon size={15} />
          <span className="text-sm">Select Files</span>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept=".pdf,.ppt,.pptx,.doc,.docx"
            onChange={handleFileChange}
            className="hidden"
            disabled={isUploading}
            aria-label="Upload files"
          />
        </label>

        <div className="text-xs text-gray-500">
          Supports PDF, PowerPoint (PPT), Word (DOC) files
        </div>
      </div>

      {/* Upload Progress */}
      {isUploading && (
        <div className="flex items-center gap-2 text-sm text-green-600">
          <div className="animate-spin">
            <UploadIcon size={16} />
          </div>
          Uploading files...
        </div>
      )}

      {/* Uploaded Files List */}
      {uploadedFiles.length > 0 && (
        <div className="border rounded-lg divide-y">
          <div className="p-3 text-sm bg-gray-50 font-medium">
            Uploaded Materials ({uploadedFiles.length})
          </div>

          <ul className="divide-y">
            {uploadedFiles.map((file) => (
              <li key={file.id} className="p-3 hover:bg-gray-50">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="flex-shrink-0">
                      {getFileIcon(file.type)}
                    </div>
                    <div className="min-w-0">
                      <div className="font-medium truncate text-sm">
                        {file.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {formatFileSize(file.size)} • {file.type.toUpperCase()}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Link
                      href={file.url}
                      download={file.name}
                      className="p-2 text-gray-500 hover:text-green-600"
                      title="Download"
                    >
                      <DownloadIcon size={16} />
                    </Link>
                    <button
                      onClick={() => removeFile(file.id)}
                      className="p-2 text-gray-500 hover:text-red-600"
                      title="Remove"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
