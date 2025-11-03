"use client";
import FormModal from "@/components/FormModal/FormModal";
import { Button } from "@/components/UI/button";
import ShareMenu from "@/components/UI/ShareMenu";
import { useLocationData } from "@/hooks/useLocationData";
import useUpdateApi from "@/hooks/useUpdateApi";
import { FieldConfig } from "@/types/forms";
import { getExperienceDetail } from "@/util/general";
import { Edit } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { Share2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";

interface EditProfileProps {
  user: UserProfile;
  isMe: boolean;
}

export const nationalitiesOptions = [
  { label: "Egyptian", value: "egyptian" },
  { label: "American", value: "american" },
  { label: "French", value: "french" },
  { label: "German", value: "german" },
  { label: "Saudi", value: "saudi" },
];

const initialValues = (user: Partial<UserProfile>): Partial<UserProfile> => ({
  firstName: user?.firstName,
  lastName: user?.lastName,
  birthDate: user?.birthDate,
  nationality: user?.nationality,
  title: user?.title,
  state: user?.state || null,
  country: user?.country || null,
  city: user?.city,
});

const EditProfile: React.FC<EditProfileProps> = ({ user, isMe }) => {
  const { update: updateSession } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isLoading, error } = useUpdateApi<UserProfile>(handleSuccess);

  // location selection
  const [countryCode, setCountryCode] = useState(user?.country?.code || "");
  const { countries, states } = useLocationData(countryCode);

  const fields: FieldConfig<UserProfile>[] = [
    {
      label: "First Name",
      name: "firstName",
      type: "text",
      gridProps: { xs: 12, sm: 6 },
      required: true,
    },
    {
      label: "Last Name",
      name: "lastName",
      type: "text",
      gridProps: { xs: 12, sm: 6 },
      required: true,
    },
    {
      name: "title",
      label: "Title",
      type: "text",
      gridProps: { xs: 12, sm: 6 },
    },

    {
      name: "birthDate",
      type: "date",
      label: "Date of Birth",
      gridProps: { xs: 12, sm: 6 },
      textFieldProps: {
        inputProps: {
          max: new Date(new Date().setFullYear(new Date().getFullYear() - 18))
            .toISOString()
            .split("T")[0],
        },
      },
    },
    {
      name: "nationality",
      label: "Nationality",
      type: "search-select",
      options: nationalitiesOptions,
      gridProps: { xs: 12, sm: 6 },
    },
    {
      name: "country.code",
      type: "search-select",
      resetFields: ["state.code", "city"],
      label: "Country",
      options: countries.map((country) => ({
        value: country.isoCode,
        label: country.name,
      })),
      onChange: (value) => setCountryCode(value),
      gridProps: { xs: 12, sm: 6 },
    },
    {
      name: "state.code",
      type: "search-select",
      dependsOn: "country.code",
      label: "State",
      options: states.map((state) => ({
        value: state.isoCode,
        label: state.name,
      })),
      gridProps: { xs: 12, sm: 6 },
    },
    {
      name: "city",
      type: "text",
      label: "City",
      gridProps: { xs: 12, sm: 6 },
      rules: {
        minLength: { value: 2, message: "City must be at least 2 characters" },
      },
    },
  ];

  async function handleSuccess(newProfile: UserProfile) {
    await updateSession({
      firstName: newProfile.firstName,
      lastName: newProfile.lastName,
      email: newProfile.email,
    });
  }

  return (
    <>
      {isMe && (
        <FormModal
          open={isModalOpen}
          error={error?.message}
          onClose={() => console.log("closed")}
          onSubmit={() => console.log("Submitd")}
          loading={isLoading}
          fields={fields}
          title="Personal Information"
          initialValues={initialValues({
            ...user,
            title: getExperienceDetail(user.title || ""),
          })}
        />
      )}
      <div className="flex h-full flex-col items-center justify-center gap-2 sm:items-end">
        {/* Edit Button */}
        {isMe && (
          <IconButton onClick={() => setIsModalOpen(true)}>
            <Edit className="text-white" />
          </IconButton>
        )}
        {/* Share Button */}
        <ShareMenu
          url={
            typeof window !== "undefined"
              ? window.location.href
              : "https://your.site"
          }
          title="Your Page"
          text="Check this out!"
        >
          <Button
            size="icon"
            variant="ghost"
            className="text-primary-foreground hover:text-primary-foreground rounded-full hover:bg-black/10"
          >
            <Share2 />
          </Button>
        </ShareMenu>
      </div>
    </>
  );
};

export default EditProfile;
