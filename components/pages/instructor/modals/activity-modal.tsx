/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import FormModal from "@/components/FormModal/FormModal";
import useUpdateApi from "@/hooks/useUpdateApi";
import { FieldConfig } from "@/types/forms";
import { useSession } from "next-auth/react";
import { useProfile } from "@/hooks/useProfile";

interface Activity {
  id: string;
  title: string;
  provider: string;
  date: string;
}

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  initialValues?: Partial<Activity>;
  seekerId?: string;
};

const ActivityModal = ({ isOpen, onClose, initialValues }: ModalProps) => {
  const { isLoading, error, reset } = useUpdateApi(handleClose);
  const { isLoading: isDeleting } = useUpdateApi(handleClose);
  const { data: session } = useSession();
  const { profile, saveProfile } = useProfile();

  function handleClose() {
    reset();
    onClose();
  }
  const fields: FieldConfig<Activity>[] = [
    {
      name: "title",
      type: "text",
      label: "Activity Title",
      textFieldProps: {
        placeholder: "e.g., Community Health Workshop, Blood Donation Drive",
      },
      required: true,
    },
    {
      name: "provider",
      type: "text",
      label: "Organizing Institution",
      gridProps: { xs: 12, md: 4 },
      textFieldProps: {
        placeholder: "e.g., Red Cross, Local Health Department, Hospital XYZ",
      },
      required: true,
    },
    {
      name: "date",
      type: "date",
      label: "Activity Date",
      gridProps: { xs: 14, md: 4 },
      textFieldProps: {
        placeholder: "e.g., 2000-06-18",
        style: { width: "185px", minWidth: "185px", maxWidth: "185px" },
        sx: { width: "185px !important" },
        className: "date-field-185px",
      },
      required: true,
    },
  ];

  const onSubmit = async (formData: Partial<Activity>) => {
    try {
      const userId = (session?.user?.id as string | undefined) || undefined;
      if (!userId) return;

      const existingMetadata = profile?.metadata
        ? (typeof profile.metadata === "string"
            ? JSON.parse(profile.metadata)
            : profile.metadata)
        : {};

      const activities: any[] = Array.isArray(existingMetadata.activities)
        ? [...existingMetadata.activities]
        : [];

      const payloadItem = {
        activityTitle: formData.title || "",
        organizationInstitution: formData.provider || "",
        activityDate: formData.date || "",
      };

      const idx = formData.id !== undefined ? Number(formData.id) : -1;
      if (!Number.isNaN(idx) && idx >= 0 && idx < activities.length) {
        activities[idx] = payloadItem;
      } else {
        activities.push(payloadItem);
      }

      const updatedMetadata = {
        ...existingMetadata,
        activities,
      };

      await saveProfile(userId, { metadata: updatedMetadata });
      handleClose();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to save activity");
    }
  };

  return (
    <FormModal
      open={isOpen}
      error={error?.message}
      loading={isLoading}
      deleteLoading={isDeleting}
      onClose={handleClose}
      onSubmit={onSubmit}
      fields={fields}
      deleteButtonText="Delete Activity"
      title="Add Activity"
      description="Share workshops, events, or volunteer work you’ve done."
      initialValues={initialValues}
    />
  );
};

export default ActivityModal;
