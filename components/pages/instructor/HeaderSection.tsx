/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { calculateAge, getOptionLabel } from "@/util/general";
import EditProfile from "./editProfile";
import ProfileImage from "@/components/UI/ProfileImage";
import { Flag, MapPin } from "lucide-react";
import { uploadFiles } from "@/lib/actions/upload.actions";
import { useProfile } from "@/hooks/useProfile";
import { toast } from "sonner";

const nationalitiesOptions = [
  { label: "Egyptian", value: "egyptian" },
  { label: "American", value: "american" },
  { label: "French", value: "french" },
  { label: "German", value: "german" },
  { label: "Saudi", value: "saudi" },
];

const HeaderSection: React.FC<{
  user: InstructorData;
}> = ({ user }) => {
  const { update: updateSession } = useSession();
  const { saveProfile, updating } = useProfile();
  const [image, setImage] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const session = useSession();
  const { profile } = useProfile();

  const updateImage = async (file: File) => {
    setUploading(true);
    try {
      // Upload the image file
      const uploadedUrls = await uploadFiles([file]);
      
      if (uploadedUrls.length > 0) {
        const imageUrl = uploadedUrls[0];
        
        // Update the profile with the new image URL
        if (session.data?.user.id) {
          await saveProfile(session.data?.user.id, { photoUrl: imageUrl });
        }
        
        // Update the session with the new photo
        await updateSession({
          photo: imageUrl,
        });
        
        // Set the local image state for immediate UI update
        setImage(file);
        
        toast.success("Profile image updated successfully!");
      } else {
        throw new Error("No image URLs returned from upload");
      }
    } catch (error) {
      console.error("Failed to upload image:", error);
      toast.error("Failed to upload image. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const age = user.dateOfBirth ? calculateAge(new Date(user.dateOfBirth)) : "";
  const nationality = getOptionLabel(nationalitiesOptions, user.nationality);
  return (
    <div className="rounded-base bg-[url('/images/jobs-background.jpg')] bg-cover bg-center">
      <div className="from-secondary/70 to-primary/80 shadow-soft relative flex h-fit min-h-[180px] w-full flex-col items-center gap-12 rounded-lg bg-gradient-to-b p-5 lg:flex-row">
        <div className="relative">
          <ProfileImage
            currentImageUrl={
              image ? URL.createObjectURL(image) : profile?.photoUrl || ""
            }
            alt={user.firstName + " " + user.lastName + " user image"}
            size="xLarge"
            onImageUpdate={updateImage}
            className={uploading ? "opacity-50 pointer-events-none" : ""}
          />
          {uploading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full">
              <div className="text-white text-sm">Uploading...</div>
            </div>
          )}
        </div>
        <div className="flex w-full items-center">
          <div className="mr-5 flex-1">
            <h5 className="text-xl font-bold text-white">
              {user.firstName} {user.lastName}
            </h5>
            <div>
              <p className="text-sm text-gray-100">
                {age ? `${age} years old` : ""}{" "}
                {nationality ? `- ${nationality}` : ""}{" "}
                {user.maritalStatus ? `- ${user.maritalStatus}` : ""}{" "}
              </p>
              {(user.country?.code || user.state?.name) && (
                <div className="mr-3 flex items-center gap-2">
                  <MapPin className="size-4 text-gray-100" />
                  <p className="text-sm text-gray-100">
                    {(user.country?.code || "") +
                      (user.state?.name ? `, ${user.state?.name}` : "")}
                  </p>
                </div>
              )}
              {user.isPublic && (
                <p className="mt-3 text-xs font-medium text-white">
                  <Flag className="mr-2 inline-block size-4 font-medium text-white" />
                  Open For Opportunities
                </p>
              )}
            </div>
          </div>
          <EditProfile user={user} />
        </div>
      </div>
    </div>
  );
};

export default HeaderSection;
