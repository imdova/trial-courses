"use client";
import { FieldConfig } from "@/types/forms";
import SelectPlan from "./SelectPlan";
import FormModal from "@/components/FormModal/FormModal";

interface AssignPlanModalProps {
  employerId?: string | null;
  open: boolean;
  onClose: () => void;
}

const AssignPlanModal: React.FC<AssignPlanModalProps> = ({ open, onClose }) => {
  const fields: FieldConfig[] = [
    {
      name: "id",
      type: "component",
      componentProps: {
        label: "All Plans",
      },
      component: SelectPlan,
    },
  ];

  const onSubmit = async (data: Folder) => {
    console.log("🚀 ~ onSubmit ~ data:", data);
    onClose();
  };

  return (
    <FormModal
      open={open}
      onClose={onClose}
      onSubmit={onSubmit}
      fields={fields}
      title="Assign Plan"
      description="Select a plan to assign to this employer. The plan will determine the features and pricing for the employer's account."
      submitButtonText="Assign Plan"
    />
  );
};

export default AssignPlanModal;
