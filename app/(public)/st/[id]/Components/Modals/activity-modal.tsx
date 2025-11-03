"use client";

import FormModal from "@/components/FormModal/FormModal";
import useUpdateApi from "@/hooks/useUpdateApi";
import { FieldConfig } from "@/types/forms";

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
      gridProps: { xs: 12, md: 4 },
      textFieldProps: {
        placeholder: "e.g., 2000-06-18",
      },
      required: true,
    },
  ];

  return (
    <FormModal
      open={isOpen}
      error={error?.message}
      loading={isLoading}
      deleteLoading={isDeleting}
      onClose={handleClose}
      onSubmit={() => console.log("submit")}
      fields={fields}
      deleteButtonText="Delete Activity"
      title="Add Activity"
      description="Share workshops, events, or volunteer work you’ve done."
      initialValues={initialValues}
    />
  );
};

export default ActivityModal;
