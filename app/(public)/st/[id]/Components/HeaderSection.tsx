"use client";
import { useState } from "react";
import { FlagOutlined, LocationOn } from "@mui/icons-material";
import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/UI/Avatar";
import {
  calculateAge,
  getExperienceDetail,
  getOptionLabel,
} from "@/util/general";
import EditProfile from "./editProfile";
import ProfileImage from "@/components/UI/ProfileImage";

const nationalitiesOptions = [
  { label: "Egyptian", value: "egyptian" },
  { label: "American", value: "american" },
  { label: "French", value: "french" },
  { label: "German", value: "german" },
  { label: "Saudi", value: "saudi" },
];

const HeaderSection: React.FC<{
  user: UserProfile;
  isMe: boolean;
}> = ({ user, isMe }) => {
  const { update: updateSession } = useSession();
  const [image, setImage] = useState<File | null>(null);

  const handleUpdateProfile = async () => {
    const newProfile = {};

    await updateSession({
      photo: newProfile, // will be `undefined` since `newProfile` is empty
    });
  };

  const updateImage = async (file: File) => {
    handleUpdateProfile();
    setImage(file);
  };

  const age = user.birthDate ? calculateAge(new Date(user.birthDate)) : "";
  const nationality = getOptionLabel(nationalitiesOptions, user.nationality);
  const title = getExperienceDetail(user.title || "");
  return (
    <div className="mb-12 rounded-lg bg-[url('/images/jobs-background.jpg')] bg-cover bg-center">
      <div className="relative flex  h-fit min-h-[200px] w-full flex-col items-center lg:items-end gap-12 rounded-lg bg-gradient-to-b from-secondary-transparent to-primary-transparent p-5 pb-8 shadow-soft lg:flex-row">
        <div>
          <div className="">
            {isMe ? (
              <ProfileImage
                currentImageUrl={
                  image ? URL.createObjectURL(image) : user.avatar || ""
                }
                alt={user.firstName + " " + user.lastName + " user image"}
                size="xLarge"
                onImageUpdate={updateImage}
                imageClassName="border-4 border-white shadow-md"
              />
            ) : (
              <Avatar className="w-20 h-20">
                <AvatarImage src={user.avatar || ""} />
                <AvatarFallback className="text-xs bg-primary/10">
                  {user.firstName?.slice(0, 2)}
                </AvatarFallback>
              </Avatar>
            )}
          </div>
        </div>
        <div className="flex w-full">
          <div className="mr-5 flex-1">
            <h5 className="text-xl font-bold text-white">
              {user.firstName} {user.lastName}
              {/* TODO: add it  */}
              {/* {user.isVerified && (
              <Verified color="primary" className="ml-1 h-6 w-6" />
              )} */}
            </h5>
            <p className="text-sm text-white">{title}</p>
            <div>
              <p className="text-sm text-gray-100">
                {age ? `${age} years old` : ""}{" "}
                {nationality ? `- ${nationality}` : ""}{" "}
                {user.maritalStatus ? `- ${user.maritalStatus}` : ""}{" "}
                {/* {user.careerLevel ? `- Ex ${user.careerLevel} years` : ""}{" "} */}
              </p>
              {(user.country?.name || user.state?.name || user.city) && (
                <div className="mr-3 flex items-center gap-1">
                  <LocationOn className="text-gray-100" />
                  <p className="text-sm text-gray-100">
                    {(user.country?.name || "") +
                      (user.state?.name ? `, ${user.state.name}` : "") +
                      (user.city ? `, ${user.city}` : "")}
                  </p>
                </div>
              )}
              {user.isPublic && (
                <p className="mt-3 text-xs font-medium text-white">
                  <FlagOutlined className="mr-1 h-4 w-4 font-medium text-white" />
                  Open For Opportunities
                </p>
              )}
            </div>
          </div>
          <EditProfile isMe={isMe} user={user} />
        </div>
      </div>
    </div>
  );
};

export default HeaderSection;
