"use client";

import React from "react";
import FormModal from "./FormModal";
import { FieldConfig } from "@/types/forms";
import { useAssignments } from "@/app/(auth)/instructor/assignments/hooks/useAssignments";
import { CreateAssignmentPayload } from "@/store/slices/assignmentsSlice";


const DEFAULT_TIME = "00:00";
interface AssignmentFormValues {
  assignmentName: string;
  start_date: Date | null;
  start_time: string;  
  end_date: Date | null;
  end_time: string;
  instructions: string;
  attachment_url: FileList | null;
  totalPoints: number;
  numberOfQuestions: number;
}

interface AssignmentFormModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit?: (data: AssignmentFormValues) => void;
  fields: FieldConfig<AssignmentFormValues>[];
  title?: string;
  description?: string;
  submitButtonText?: string;
  cancelButtonText?: string;
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl";
  enableResetButton?: boolean;
  defaultValues?: Partial<AssignmentFormValues>;
  courseId?: string;
  subjectId?: string;
}

const AssignmentFormModal: React.FC<AssignmentFormModalProps> = ({
  open,
  onClose,
  onSubmit,
  fields,
  title = "Create Assignment",
  description,
  submitButtonText = "Create Assignment",
  cancelButtonText = "Cancel",
  maxWidth = "lg",
  enableResetButton = false,
  defaultValues = {
    start_time: DEFAULT_TIME,
    end_time: DEFAULT_TIME,
  },
  // courseId,
  // subjectId,
}) => {
  const { createNewAssignment, loading, error } = useAssignments();

  const handleFormSubmit = async (data: AssignmentFormValues) => {
    try {
      // Validate required dates
      if (!data.start_date || !data.end_date || !data.start_time || !data.end_time) {
        console.error('Start date, end date, and times are required');
        return;
      }
      const [startHours, startMinutes] = data.start_time.split(":").map(Number);
      const startDateTime = new Date(data.start_date);
      startDateTime.setHours(startHours, startMinutes, 0, 0);
      const startDateISO = startDateTime.toISOString();
      const [endHours, endMinutes] = data.end_time.split(":").map(Number);
      const endDateTime = new Date(data.end_date);
      endDateTime.setHours(endHours, endMinutes, 0, 0);
      const endDateISO = endDateTime.toISOString();
      let attachmentUrl = "";
      if (data.attachment_url && data.attachment_url.length > 0) {
        attachmentUrl = `uploaded_file_${Date.now()}.pdf`;
      }

      const createPayload: CreateAssignmentPayload = {
        name: data.assignmentName,
        start_date: startDateISO,
        end_date: endDateISO,
        totalPoints: parseInt(String(data.totalPoints || 100), 10),
        numberOfQuestions: parseInt(String(data.numberOfQuestions || 1), 10),
        attachment_url: attachmentUrl,
        instructions: data.instructions || "",
      };

      console.log('Creating assignment with payload:', createPayload);

      const result = await createNewAssignment(createPayload);

      if (result?.meta?.requestStatus === 'fulfilled') {
        onSubmit?.(data);
        onClose();
      } else {
        console.error('Failed to create assignment:', result?.payload);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <FormModal
      open={open}
      onClose={onClose}
      onSubmit={handleFormSubmit}
      fields={fields}
      title={title}
      description={description}
      submitButtonText={submitButtonText}
      cancelButtonText={cancelButtonText}
      maxWidth={maxWidth}
      enableResetButton={enableResetButton}
      initialValues={defaultValues}
      loading={loading}
      error={error || undefined}
      mode="onChange"
    />
  );
};

export default AssignmentFormModal;