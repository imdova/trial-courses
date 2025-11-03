"use client";

import { useState, useRef, ChangeEvent, JSX } from "react";
import { Camera, Upload } from "lucide-react";
import Modal from "./Modal"; // Your modal component
import Image from "next/image";

type AvatarOption = {
  id: string;
  label: string;
  icon: JSX.Element;
  action: () => void;
};

type AvatarProps = {
  src?: string | File;
  onChange: (file: File | string) => void;
  defaultAvatars?: string[];
  size?: "sm" | "md" | "lg";
  className?: string;
};

const AvatarUploader: React.FC<AvatarProps> = ({
  src,
  onChange,
  className,

  size = "md",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-12 w-12",
    lg: "h-[130px] w-[130px]",
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onChange(e.target.files[0]);
      setIsModalOpen(false);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onChange(e.dataTransfer.files[0]);
      setIsModalOpen(false);
    }
  };

  const avatarOptions: AvatarOption[] = [
    {
      id: "upload",
      label: "Upload Image",
      icon: <Upload className="h-4 w-4" />,
      action: () => {
        setIsModalOpen(true);
        setIsOpen(false);
      },
    },
  ];

  return (
    <div>
      <div className={`${className} inline-block`}>
        {/* Avatar Button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`relative rounded-full ${sizeClasses[size]} group flex cursor-pointer items-center justify-center overflow-hidden border-2 border-white bg-gray-100 shadow-md transition-colors hover:bg-gray-200`}
        >
          {src ? (
            <Image
              width={400}
              height={400}
              src={typeof src === "string" ? src : URL.createObjectURL(src)}
              alt="Avatar"
              className="h-full w-full object-cover"
            />
          ) : (
            <Image
              width={400}
              height={400}
              src={"/images/placeholder-avatar.svg"}
              alt="Avatar"
              className="h-full w-full object-cover"
            />
          )}
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity group-hover:opacity-100">
            <Camera className="h-8 w-8 text-white" />
          </div>
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="ring-opacity-5 absolute mt-2 w-48 rounded-md bg-white shadow-lg ring-1 ring-black focus:outline-none">
            <div className="py-1">
              {avatarOptions.map((option) => (
                <button
                  type="button"
                  key={option.id}
                  onClick={option.action}
                  className="flex w-full items-center px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                >
                  <span className="mr-2">{option.icon}</span>
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      {/* Upload Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="w-full p-4">
          <h2 className="mb-4 text-center text-xl font-bold">Upload Avatar</h2>
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`cursor-pointer rounded-lg border-2 border-dashed p-8 text-center transition-colors ${
              dragActive
                ? "border-primary bg-blue-50"
                : "hover:border-primary-transparent border-gray-300"
            }`}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept="image/*"
            />
            <div className="flex flex-col items-center justify-center space-y-2">
              <Upload className="h-12 w-12 text-gray-400" />
              <p className="text-sm text-gray-500">
                {dragActive
                  ? "Drop your image here"
                  : "Drag and drop your image here or click to browse"}
              </p>
              <p className="text-xs text-gray-400">PNG, JPG, JPEG (max. 5MB)</p>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AvatarUploader;
