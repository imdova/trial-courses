"use client";

import { PDF_ICON } from "@/components/icons/icons";
import { Button } from "@/components/UI/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/UI/dialog";
import { useState, useRef } from "react";
import { Upload } from "lucide-react";

interface ResumeUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (file: File) => void;
}

const ResumeUploadModal: React.FC<ResumeUploadModalProps> = ({
  isOpen,
  onClose,
  onUpload,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File) => {
    if (file.type === "application/pdf" && file.size <= 1024 * 1024) { // 1MB limit
      setSelectedFile(file);
    } else {
      alert("Please select a PDF file under 1MB");
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleDropAreaClick = () => {
    fileInputRef.current?.click();
  };

  const handleUpload = () => {
    if (selectedFile) {
      onUpload(selectedFile);
      handleCancel(); // Reset modal state after upload
    }
  };

  const handleCancel = () => {
    setSelectedFile(null);
    setIsDragOver(false);
    onClose();
  };

  // Reset state when modal opens
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      handleCancel();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Upload your resume</DialogTitle>
          <p className="text-sm text-muted-foreground">
            Choose a PDF file as your resume. Supported formats: PDF
          </p>
        </DialogHeader>
        <div className="space-y-4">
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer hover:bg-gray-50 ${
              isDragOver
                ? "border-primary bg-primary/5"
                : "border-gray-300"
            }`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={handleDropAreaClick}
          >
            <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <p className="text-sm text-gray-600 mb-2">
              Drag & drop a file here, or click to select
            </p>
            <p className="text-xs text-gray-500">
              application/pdf (max 1MB)
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf"
              onChange={handleFileInputChange}
              className="hidden"
            />
          </div>
          
          {selectedFile && (
            <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
              <PDF_ICON width={24} height={24} className="text-[#EF5350]" />
              <span className="text-sm text-green-800 flex-1">
                {selectedFile.name}
              </span>
              <span className="text-xs text-green-600">
                {(selectedFile.size / 1024).toFixed(1)} KB
              </span>
            </div>
          )}
          
          <div className="flex gap-2 pt-4">
            <Button
              variant="outline"
              className="flex-1"
              onClick={handleCancel}
            >
              CANCEL
            </Button>
            <Button
              className="flex-1"
              onClick={handleUpload}
              disabled={!selectedFile}
            >
              UPLOAD
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ResumeUploadModal;