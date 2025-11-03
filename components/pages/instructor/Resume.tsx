"use client";
import { PDF_ICON } from "@/components/icons/icons";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/UI/card";
import { Button } from "@/components/UI/button";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useProfile } from "@/hooks/useProfile";
import { uploadFiles } from "@/lib/actions/upload.actions";
import ResumeUploadModal from "./ResumeUploadModal";

const getFileNameFromUrl = (url?: string | null): string => {
  if (!url) return "";
  const urlSplit = url.split("/");
  return urlSplit[urlSplit.length - 1];
};

const Resume: React.FC<{
  user?: InstructorData;
}> = ({ user: initialUser }) => {
  const { data: session } = useSession();
  const { getProfile, saveProfile, profile, updating } = useProfile();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // Use profile data if available, otherwise fall back to initialUser
  const user = profile || initialUser;
  const myCv = user?.resumePath;
  const fileName = getFileNameFromUrl(myCv);

  useEffect(() => {
    // Fetch profile if not provided and user is logged in
    if (!initialUser && session?.user?.id) {
      getProfile(session.user.id);
    }
  }, [getProfile, session?.user?.id, initialUser]);

  const handleOpenModal = () => {
    setIsDialogOpen(true);
  };

  const handleCloseModal = () => {
    setIsDialogOpen(false);
  };

  const handleFileUpload = async (file: File) => {
    if (!session?.user?.id) {
      console.error("User not authenticated");
      return;
    }

    try {
      setIsUploading(true);
      
      // Upload the file and get the URL
      const uploadedUrls = await uploadFiles([file]);
      const resumeUrl = uploadedUrls[0];

      if (resumeUrl) {
        // Update the profile with the new resume path
        const profileData = {
          resumePath: resumeUrl
        };

        await saveProfile(session.user.id, profileData);
        console.log("Resume uploaded and profile updated successfully");
      }
    } catch (error) {
      console.error("Error uploading resume:", error);
    } finally {
      setIsUploading(false);
      setIsDialogOpen(false);
    }
  };

  const handleDownload = () => {
    if (myCv) {
      const link = document.createElement('a');
      link.href = myCv;
      link.download = fileName || 'resume.pdf';
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Resume</CardTitle>
        </CardHeader>

        <CardContent>
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
        </CardContent>
        
        <CardFooter className="flex gap-2">
          <Button 
            disabled={!myCv} 
            className="flex-1 text-sm"
            onClick={handleDownload}
          >
            Download
          </Button>
          <Button 
            variant="outline" 
            className="flex-1 text-sm"
            onClick={handleOpenModal}
            disabled={isUploading || updating}
          >
            {"Change"}
          </Button>
        </CardFooter>
      </Card>

      <ResumeUploadModal
        isOpen={isDialogOpen}
        onClose={handleCloseModal}
        onUpload={handleFileUpload}
      />
    </>
  );
};

export default Resume;
