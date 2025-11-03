"use client";

import React, { useState } from "react";
import { Button } from "@mui/material";
import { PDF_ICON } from "@/components/icons/icons";
import { Upload } from "@mui/icons-material";
import { FileUploadModal } from "@/components/FormModal/FileUploadModal";
import { uploadFiles } from "@/lib/actions/upload.actions";

const getFileNameFromUrl = (url?: string | null): string => {
  if (!url) return "";
  const urlSplit = url.split("/");
  return urlSplit[urlSplit.length - 1];
};

const Resume: React.FC<{
  user: UserProfile;
  isMe: boolean;
  isLocked: boolean;
}> = ({ user, isMe, isLocked }) => {
  const myCv = user.resume;
  const fileName = getFileNameFromUrl(myCv);

  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const handleUpload = async (files: File[]) => {
    if (files.length === 0) return;
    const file = files[0];
    await uploadFiles([file]); // ✅ Optional: implement this server action
    // You might also trigger revalidation or UI update here
  };

  const handleReviewCV = () => {
    if (myCv) {
      window.open(myCv, "_blank");
    }
  };

  if (!isMe && !myCv) return null;
  if (!isMe && isLocked) return null;

  return (
    <div className="rounded-base border border-gray-200 bg-white p-3 shadow-soft md:p-5">
      {/* Title and Description */}
      <h3 className="mb-2 text-xl font-semibold text-main">Resume</h3>

      {/* Uploaded CV Display */}
      <div className="my-2 flex items-center gap-2 rounded bg-primary/10 p-2">
        <PDF_ICON
          width={32}
          height={32}
          className="min-w-[40px] text-[#EF5350]"
        />
        {fileName ? (
          <p className="break-all text-sm text-main">{fileName}</p>
        ) : (
          <p className="text-sm text-muted-foreground">No file uploaded</p>
        )}
      </div>

      {/* Buttons */}
      <div className="flex justify-between gap-3">
        {myCv && (
          <Button
            variant="outlined"
            disabled={!myCv}
            onClick={handleReviewCV}
            className="flex-1 text-sm"
          >
            Download
          </Button>
        )}
        {isMe ? (
          myCv ? (
            <Button
              variant="contained"
              onClick={() => setIsUploadModalOpen(true)}
              className="flex-1 text-sm"
            >
              Change
            </Button>
          ) : (
            <Button
              variant="contained"
              className="flex-1 text-sm"
              onClick={() => setIsUploadModalOpen(true)}
            >
              Upload <Upload className="ml-2" />
            </Button>
          )
        ) : null}
      </div>

      <FileUploadModal
        open={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onUpload={handleUpload}
        acceptedFileTypes={["application/pdf"]}
        title={"Upload your resume"}
        previewType="pdf"
        uploadButtonText={"Upload"}
        description="Choose a PDF file as your resume. Supported format: PDF"
      />
    </div>
  );
};

export default Resume;
