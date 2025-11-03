"use client";
import React, { useState, type ReactElement } from "react";
import { IconButton, MenuItem, Select, Tooltip } from "@mui/material";
import {
  Edit,
  Facebook,
  Instagram,
  Language,
  LinkedIn,
  LinkOutlined,
  Pinterest,
  Reddit,
  Telegram,
  Twitter,
  WhatsApp,
  YouTube,
} from "@mui/icons-material";
import Link from "next/link";
import FormModal from "@/components/FormModal/FormModal";
import { FieldConfig, FieldType } from "@/types/forms";

// Types
type SocialMediaLinks = {
  instagram?: string;
  twitter?: string;
  linkedin?: string;
  website?: string;
  facebook?: string;
  youtube?: string;
  pinterest?: string;
  reddit?: string;
  telegram?: string;
  whatsapp?: string;
  [key: string]: string | undefined;
};

type Company = {
  id: string;
  socialLinks?: SocialMediaLinks;
};

type User = {
  type: "student" | "employer";
};

type SocialMediaSectionProps = {
  user: UserProfile;
  isMe: boolean;
  isLocked?: boolean;
  type: User["type"];
};

const socialMediaOptions = [
  { value: "instagram", label: "Instagram" },
  { value: "twitter", label: "Twitter" },
  { value: "linkedin", label: "LinkedIn" },
  { value: "website", label: "Website" },
  { value: "facebook", label: "Facebook" },
  { value: "youtube", label: "YouTube" },
  { value: "pinterest", label: "Pinterest" },
  { value: "reddit", label: "Reddit" },
  { value: "telegram", label: "Telegram" },
  { value: "whatsapp", label: "WhatsApp" },
];

// Icons mapping
const socialMediaIcons: { [K in keyof SocialMediaLinks]: ReactElement } = {
  instagram: <Instagram sx={{ color: "rgba(241, 9, 234, 1)" }} />,
  twitter: <Twitter sx={{ color: "rgba(91, 146, 250, 1)" }} />,
  linkedin: <LinkedIn sx={{ color: "rgba(0, 119, 181, 1)" }} />,
  website: <Language sx={{ color: "rgba(46, 174, 125, 1)" }} />,
  facebook: <Facebook sx={{ color: "rgba(59, 89, 152, 1)" }} />,
  youtube: <YouTube sx={{ color: "rgba(255, 0, 0, 1)" }} />,
  pinterest: <Pinterest sx={{ color: "rgba(189, 8, 28, 1)" }} />,
  reddit: <Reddit sx={{ color: "rgba(255, 69, 0, 1)" }} />,
  telegram: <Telegram sx={{ color: "rgba(0, 136, 204, 1)" }} />,
  whatsapp: <WhatsApp sx={{ color: "rgba(37, 211, 102, 1)" }} />,
};

const defaultFields: FieldConfig[] = [
  {
    name: "instagram",
    label: "Instagram",
    type: "text",
    icon: socialMediaIcons.instagram,
  },
  {
    name: "twitter",
    label: "Twitter",
    type: "text",
    icon: socialMediaIcons.twitter,
  },
  {
    name: "linkedin",
    label: "LinkedIn",
    type: "text",
    icon: socialMediaIcons.linkedin,
  },
  {
    name: "website",
    label: "Website",
    type: "text",
    icon: socialMediaIcons.website,
  },
];

// Mock API functions
const useUpdateApi = (callback: (error: Error | null) => void) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<{ message: string } | null>(null);

  const update = async (
    api: string,
    options: { body: Record<string, unknown> },
    tag: string
  ) => {
    setIsLoading(true);
    setError(null);
    try {
      console.log("Mock API call:", { api, options, tag });
      await new Promise((resolve) => setTimeout(resolve, 1000));
      callback(null);
    } catch (error: unknown) {
      const err =
        error instanceof Error ? error : new Error("An unknown error occurred");
      setError({ message: "Failed to update social links" });
      callback(err);
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setError(null);
  };

  return { isLoading, error, update, reset };
};

const API_UPDATE_SEEKER = "/api/update-seeker";
const API_UPDATE_COMPANY = "/api/update-company";
const TAGS = {
  profile: "profile",
  company: "company",
};

// Main Component
const SocialMediaSection: React.FC<SocialMediaSectionProps> = ({
  user,
  isMe = true,
  isLocked = false,
  type = "student",
}) => {
  // Initialize socialLinks with empty strings for all possible fields
  const initialSocialLinks = {
    instagram: "",
    twitter: "",
    linkedin: "",
    website: "",
    facebook: "",
    youtube: "",
    pinterest: "",
    reddit: "",
    telegram: "",
    whatsapp: "",
    ...(user?.socialLinks || {}), // Override with actual values if they exist
  };

  const [selectedOption, setSelectedOption] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fields, setFields] = useState<FieldConfig[]>(() => {
    // Initialize fields with all possible social links that have values
    const initialFields = Object.entries(initialSocialLinks)
      .filter(([, value]) => value)
      .map(([key]) => ({
        name: key,
        label: key.charAt(0).toUpperCase() + key.slice(1),
        type: "text" as FieldType,
        icon: socialMediaIcons[key as keyof SocialMediaLinks] || (
          <LinkOutlined />
        ),
      }));

    return initialFields.length > 0 ? initialFields : defaultFields;
  });

  const { isLoading, error, update, reset } = useUpdateApi(() => {
    setIsModalOpen(false);
  });

  const open = () => {
    setIsModalOpen(true);
    setFields(
      Object.entries(initialSocialLinks)
        .filter(([, value]) => value)
        .map(([key]) => ({
          name: key,
          label: key.charAt(0).toUpperCase() + key.slice(1),
          type: "text",
          icon: socialMediaIcons[key as keyof SocialMediaLinks] || (
            <LinkOutlined />
          ),
        })) || defaultFields
    );
  };

  const close = () => {
    setIsModalOpen(false);
    reset();
  };

  const handleUpdate = async (formData: Partial<UserProfile | Company>) => {
    await update(
      type === "student" ? API_UPDATE_SEEKER : API_UPDATE_COMPANY,
      { body: { id: user?.id, socialLinks: formData } },
      type === "student" ? TAGS.profile : TAGS.company
    );
  };

  const addNewField = (inputValue: keyof SocialMediaLinks) => {
    if (inputValue) {
      const newFields: FieldConfig[] = [
        ...fields,
        {
          name: inputValue as string,
          label:
            (inputValue as string).charAt(0).toUpperCase() +
            (inputValue as string).slice(1),
          type: "text",
          icon: socialMediaIcons[inputValue] || <LinkOutlined />,
        },
      ];
      setFields(newFields);
    }
  };

  const removeField = (fieldName: string) => {
    setFields((pv) => pv.filter((field) => field.name !== fieldName));
  };

  const filteredSocialMediaOptions = socialMediaOptions.filter(
    (option) => !fields.some((field) => field.name === option.value)
  );

  return (
    <div className="relative mb-5 rounded-base border border-gray-200 bg-white p-4 shadow-soft md:p-5">
      <div className="flex items-center justify-between">
        <h6 className="mb-2 text-xl font-semibold text-main">Social Links</h6>
        {isMe && (
          <IconButton
            onClick={open}
            className="rounded border border-solid border-gray-200 p-2"
          >
            <Edit />
          </IconButton>
        )}
      </div>
      <FormModal
        open={isModalOpen}
        onClose={close}
        onSubmit={handleUpdate}
        error={error?.message}
        loading={isLoading}
        fields={fields}
        title="Social Media Links"
        removeField={fields.length > 1 ? removeField : undefined}
        initialValues={initialSocialLinks}
        submitButtonText="Save"
        cancelButtonText="Cancel"
      >
        <div className="border-t border-gray-200 p-4">
          <Select
            className={`w-full h-10 bg-white`}
            labelId={"linkLabel"}
            id={"link"}
            value={selectedOption}
            displayEmpty
            MenuProps={{ PaperProps: { sx: { maxHeight: 300 } } }}
            onChange={(e) => {
              const value = e.target.value as string;
              setSelectedOption(value);
              addNewField(value as keyof SocialMediaLinks);
              setSelectedOption(""); // Reset after adding
            }}
            renderValue={(selected) => {
              if (!selected) {
                return <span className="text-neutral-400">Select Link</span>;
              }
              const option = socialMediaOptions.find(
                (opt) => opt.value === selected
              );
              return option ? option.label : selected;
            }}
          >
            <MenuItem value="" disabled>
              <em>Select Link</em>
            </MenuItem>
            {filteredSocialMediaOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {socialMediaIcons[option.value] || <LinkOutlined />}
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </div>
      </FormModal>
      {Object.values(initialSocialLinks).every((val) => !val) ? (
        <p className="text-muted-foreground">No social media links found.</p>
      ) : isLocked ? (
        <p className="text-muted-foreground">This Social Media links are private.</p>
      ) : (
        <div className="flex flex-wrap gap-4">
          {Object.entries(initialSocialLinks).map(
            ([key, link]) =>
              link && (
                <Tooltip key={key} title={key} placement="bottom">
                  <Link href={link} target="_blank" rel="noopener noreferrer">
                    {socialMediaIcons[key as keyof SocialMediaLinks] || (
                      <LinkOutlined />
                    )}
                  </Link>
                </Tooltip>
              )
          )}
        </div>
      )}
    </div>
  );
};

export default SocialMediaSection;

// Story examples
export const DefaultSocialMediaSection = ({ user }: { user: UserProfile }) => (
  <SocialMediaSection user={user} isMe={true} type="student" />
);

export const CompanySocialMediaSection = ({ user }: { user: UserProfile }) => (
  <SocialMediaSection user={user} isMe={true} type="employer" />
);

export const LockedSocialMediaSection = ({ user }: { user: UserProfile }) => (
  <SocialMediaSection user={user} isMe={false} isLocked={true} type="student" />
);

export const EmptySocialMediaSection = ({ user }: { user: UserProfile }) => (
  <SocialMediaSection user={user} isMe={true} type="student" />
);
