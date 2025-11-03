"use client";

import FormModal from "@/components/FormModal/FormModal";
import IconButton from "@/components/UI/Buttons/IconButton";
import { FieldConfig } from "@/types/forms";
import { Pen } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";

interface BioFormProps {
  user: InstructorProfile;
  isMe: boolean;
}

const initialValues = (
  user: Partial<InstructorProfile>
): Partial<InstructorProfile> => ({
  bio: user?.bio || "",
});

const BioForm: React.FC<BioFormProps> = ({ user, isMe }) => {
  const { update: updateSession } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const fields: FieldConfig[] = [
    {
      label: "Bio",
      name: "bio",
      type: "textEditor",
    },
  ];

  const handleUpdate = async (formData: Partial<InstructorProfile>) => {
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const updatedProfile = {
        ...user,
        ...formData,
      };

      console.log("Bio updated:", updatedProfile);

      await updateSession({
        bio: updatedProfile.bio,
      });

      setIsModalOpen(false);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isMe && (
        <FormModal
          open={isModalOpen}
          loading={isLoading}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleUpdate}
          fields={fields}
          title="Edit Bio"
          initialValues={initialValues(user)}
        />
      )}

      <div className="flex h-full flex-col items-center justify-center gap-2 sm:items-end">
        {isMe && (
          <IconButton
            className="!text-gray-500 border border-gray-200 !rounded-md"
            Icon={Pen}
            onClick={() => setIsModalOpen(true)}
          />
        )}
      </div>
    </>
  );
};

export default BioForm;
