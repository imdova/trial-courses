"use client";

import FormModal from "@/components/FormModal/FormModal";
import IconButton from "@/components/UI/Buttons/IconButton";
import { FieldConfig } from "@/types/forms";
import { Pen, Plus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface SocialMedia {
  facebook?: string;
  linkedin?: string;
  github?: string;
  twitter?: string;
}

interface SocialMediaFormProps {
  socialLinks: SocialMedia;
  isMe: boolean;
}

const SocialMediaForm: React.FC<SocialMediaFormProps> = ({
  socialLinks,
  isMe,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [socialMedia, setSocialMedia] = useState<SocialMedia>(socialLinks);

  const hasSocialMedia = Object.values(socialMedia).some((link) => !!link);

  const socialMediaFields: FieldConfig[] = [
    {
      name: "facebook",
      type: "text",
      label: "Facebook URL",
      textFieldProps: {
        placeholder: "https://facebook.com/username",
      },
      rules: {
        pattern: {
          value: /^(https?:\/\/)?(www\.)?facebook\.com\/.+/,
          message: "Please enter a valid Facebook URL",
        },
      },
    },
    {
      name: "linkedin",
      type: "text",
      label: "LinkedIn URL",
      textFieldProps: {
        placeholder: "https://linkedin.com/in/username",
      },
      rules: {
        pattern: {
          value: /^(https?:\/\/)?(www\.)?linkedin\.com\/in\/.+/,
          message: "Please enter a valid LinkedIn URL",
        },
      },
    },
    {
      name: "github",
      type: "text",
      label: "GitHub URL",
      textFieldProps: {
        placeholder: "https://github.com/username",
      },
      rules: {
        pattern: {
          value: /^(https?:\/\/)?(www\.)?github\.com\/.+/,
          message: "Please enter a valid GitHub URL",
        },
      },
    },
    {
      name: "twitter",
      type: "text",
      label: "Twitter URL",
      textFieldProps: {
        placeholder: "https://twitter.com/username",
      },
      rules: {
        pattern: {
          value: /^(https?:\/\/)?(www\.)?twitter\.com\/.+/,
          message: "Please enter a valid Twitter URL",
        },
      },
    },
  ];

  const handleUpdateSocialMedia = (newLinks: SocialMedia) => {
    setSocialMedia(newLinks);
    setIsModalOpen(false);
  };

  return (
    <div className="w-full">
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Social Media</h2>
          {isMe && hasSocialMedia && (
            <IconButton
              className="!text-gray-500 border border-gray-200 !rounded-md"
              Icon={Pen}
              onClick={() => setIsModalOpen(true)}
            />
          )}
        </div>

        {hasSocialMedia ? (
          <ul className="space-y-3 text-sm text-gray-700">
            {socialMedia.facebook && (
              <li className="w-fit">
                <Link
                  href={socialMedia.facebook}
                  target="_blank"
                  className="flex items-center space-x-2 hover:text-blue-600"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M22.675 0H1.325C.593 0 0 .593 0 1.326V22.67c0 .732.593 1.325 1.325 1.325h11.495V14.7h-3.13v-3.622h3.13V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.464.099 2.794.143v3.24l-1.918.001c-1.504 0-1.796.715-1.796 1.763v2.312h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.324-.593 1.324-1.325V1.326C24 .593 23.406 0 22.675 0z" />
                  </svg>
                  <span>Facebook</span>
                </Link>
              </li>
            )}
            {socialMedia.linkedin && (
              <li className="w-fit">
                <Link
                  href={socialMedia.linkedin}
                  target="_blank"
                  className="flex items-center space-x-2 hover:text-blue-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M4.98 3.5C4.98 4.61 4.09 5.5 2.98 5.5S1 4.61 1 3.5 1.89 1.5 3 1.5 4.98 2.39 4.98 3.5zM.5 8.5H5V24H.5V8.5zM7.5 8.5h4.2v2.1h.06c.58-1.1 2-2.25 4.14-2.25 4.43 0 5.25 2.91 5.25 6.69V24h-4.5v-7.5c0-1.79-.03-4.11-2.5-4.11-2.5 0-2.89 1.95-2.89 3.97V24H7.5V8.5z" />
                  </svg>
                  <span>LinkedIn</span>
                </Link>
              </li>
            )}
            {socialMedia.github && (
              <li className="w-fit">
                <Link
                  href={socialMedia.github}
                  target="_blank"
                  className="flex items-center space-x-2 hover:text-black"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 .5C5.648.5.5 5.648.5 12.002c0 5.097 3.292 9.412 7.861 10.945.574.105.785-.25.785-.556 0-.273-.01-1.184-.016-2.15-3.2.697-3.876-1.542-3.876-1.542-.522-1.328-1.276-1.682-1.276-1.682-1.043-.713.08-.698.08-.698 1.153.082 1.76 1.183 1.76 1.183 1.026 1.756 2.694 1.248 3.35.954.105-.743.4-1.248.727-1.536-2.552-.29-5.236-1.275-5.236-5.672 0-1.252.448-2.274 1.183-3.075-.12-.29-.513-1.453.11-3.027 0 0 .965-.31 3.162 1.175a10.97 10.97 0 012.878-.387 10.98 10.98 0 012.878.387c2.197-1.484 3.162-1.175 3.162-1.175.623 1.574.23 2.737.113 3.027.737.801 1.183 1.823 1.183 3.075 0 4.409-2.69 5.377-5.252 5.661.41.353.774 1.049.774 2.116 0 1.527-.014 2.759-.014 3.132 0 .309.208.667.79.554C20.715 21.409 24 17.095 24 12.002 24 5.648 18.852.5 12 .5z" />
                  </svg>
                  <span>GitHub</span>
                </Link>
              </li>
            )}
            {socialMedia.twitter && (
              <li className="w-fit">
                <Link
                  href={socialMedia.twitter}
                  target="_blank"
                  className="flex items-center space-x-2 hover:text-blue-400"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M24 4.557a9.828 9.828 0 01-2.828.775A4.933 4.933 0 0023.337 3.1a9.864 9.864 0 01-3.127 1.195A4.916 4.916 0 0016.616 3c-2.717 0-4.92 2.204-4.92 4.92 0 .386.044.762.127 1.124C7.728 8.847 4.1 6.88 1.671 3.905a4.822 4.822 0 00-.666 2.475c0 1.708.869 3.216 2.188 4.099A4.903 4.903 0 01.964 9.14v.062a4.926 4.926 0 003.946 4.827 4.996 4.996 0 01-2.21.084 4.927 4.927 0 004.604 3.42A9.867 9.867 0 010 19.54a13.94 13.94 0 007.548 2.212c9.056 0 14.01-7.496 14.01-13.986 0-.213-.004-.425-.014-.636A10.004 10.004 0 0024 4.557z" />
                  </svg>
                  <span>Twitter</span>
                </Link>
              </li>
            )}
          </ul>
        ) : isMe ? (
          <div className="flex flex-col items-center justify-center py-8">
            <IconButton
              className="!text-gray-500 border border-gray-200 !rounded-md mb-4"
              Icon={Plus}
              onClick={() => setIsModalOpen(true)}
            />
            <p className="text-gray-500 text-xs ">
              No social media links added yet
            </p>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            No social media links available
          </div>
        )}
      </div>

      <FormModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleUpdateSocialMedia}
        fields={socialMediaFields}
        title={
          hasSocialMedia ? "Edit Social Media Links" : "Add Social Media Links"
        }
        initialValues={socialMedia}
      />
    </div>
  );
};

export default SocialMediaForm;
