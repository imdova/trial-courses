"use client";

import React from "react";
import FormModal from "./FormModal";
import { FieldConfig } from "@/types/forms";
import { useAssignments } from "@/app/(auth)/instructor/assignments/hooks/useAssignments";
import { UpdateAssignmentPayload } from "@/store/slices/assignmentsSlice";
import { Assignment } from "@/types/courses";
import { Calendar, Upload, BookOpen } from "lucide-react";
// Type for assignment form values
// interface AssignmentFormValues {
//   assignmentName: string;
//   dueDate: Date | null;
//   dueTime: string;
//   instructions: string;
//   grading: string;
//   pdfFile: FileList | null;
//   points: number;
//   questions: number;
// }

type AssignmentFormValues = {
  name: string;
  start_date: Date | null;
  start_time: string;
  end_date: Date | null;
  end_time: string;
  instructions: string;
  attachment_url: FileList | string | null;
  totalPoints: number;
  numberOfQuestions: number;
};

interface EditAssignmentModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit?: (data: AssignmentFormValues) => void;
  assignment: Assignment | null;
  courseId?: string;
  subjectId?: string;
}

// const gradingOptions = [
//   { value: "A", label: "A (90–100%)" },
//   { value: "A-", label: "A- (85–89%)" },
//   { value: "B+", label: "B+ (80–84%)" },
//   { value: "B", label: "B (75–79%)" },
//   { value: "C", label: "C (70–74%)" },
//   { value: "D", label: "D (60–69%)" },
//   { value: "F", label: "F (Below 60%)" },
// ];

const EditAssignmentModal: React.FC<EditAssignmentModalProps> = ({
  open,
  onClose,
  onSubmit,
  assignment,
}) => {
  const { updateExistingAssignment, loading, error } = useAssignments();

  console.log(assignment, "ass")

  const fields: FieldConfig<AssignmentFormValues>[] = [
    {
      name: "name",
      label: "Assignment Name",
      type: "text",
      required: true,
      rules: {
        required: "Assignment name is required",
        maxLength: {
          value: 100,
          message: "Name must be less than 100 characters",
        },
      },
      icon: <BookOpen size={18} className="text-gray-400" />,
      gridProps: { xs: 12 },
      textFieldProps: {
        placeholder: "Enter assignment name",
      },
    },
    {
      name: "start_date",
      label: "Start Date",
      type: "date",
      required: true,
      icon: <Calendar size={18} className="text-gray-400" />,
      rules: {
        required: "Start date is required",
      },
      gridProps: { xs: 6 },
      dateFieldProps: {
        showTimeSelect: false,
        dateFormat: "MMMM d, yyyy",
        minDate: new Date(),
        placeholderText: "Select start date",
      },
    },
    {
      name: "start_time",
      label: "Start Time",
      type: "time",
      required: true,
      rules: {
        required: "Start time is required",
      },
      gridProps: { xs: 6 },
      textFieldProps: {
        type: "time",
        placeholder: "HH:MM",
      },
    },
    {
      name: "end_date",
      label: "End Date",
      type: "date",
      required: true,
      icon: <Calendar size={18} className="text-gray-400" />,
      rules: {
        required: "End date is required",
      },
      gridProps: { xs: 6 },
      dateFieldProps: {
        showTimeSelect: false,
        dateFormat: "MMMM d, yyyy",
        minDate: new Date(),
        placeholderText: "Select end date",
      },
    },
    {
      name: "end_time",
      label: "End Time",
      type: "time",
      required: true,
      rules: {
        required: "End time is required",
      },
      gridProps: { xs: 6 },
      textFieldProps: {
        type: "time",
        placeholder: "HH:MM",
      },
    },
    {
      name: "totalPoints",
      label: "Total Points",
      type: "number",
      required: true,
      rules: {
        required: "Points are required",
        min: { value: 0, message: "Points cannot be negative" },
        max: { value: 1000, message: "Points cannot exceed 1000" },
        validate: (value: number) => {
          if (!Number.isInteger(Number(value))) {
            return "Points must be a whole number";
          }
          return true;
        },
      },
      gridProps: { xs: 6 },
      textFieldProps: {
        placeholder: "Enter total points",
        type: "number",
        step: "1",
        min: "0",
      },
    },
    {
      name: "numberOfQuestions",
      label: "Number of Questions",
      type: "number",
      required: true,
      rules: {
        required: "Number of questions is required",
        min: { value: 0, message: "Cannot be negative" },
        max: { value: 100, message: "Cannot exceed 100 questions" },
        validate: (value: number) => {
          if (!Number.isInteger(Number(value))) {
            return "Must be a whole number";
          }
          return true;
        },
      },
      gridProps: { xs: 6 },
      textFieldProps: {
        placeholder: "Enter number of questions",
        type: "number",
        step: "1",
        min: "0",
      },
    },
    {
      name: "instructions",
      label: "Instructions",
      type: "textEditor",
      gridProps: { xs: 12 },
      textFieldProps: {
        rows: 4,
        multiline: true,
        placeholder: "Enter detailed instructions for students...",
      },
    },
    // {
    //   name: "grading",
    //   label: "Grading Scale",
    //   type: "select",
    //   options: gradingOptions,
    //   gridProps: { xs: 12 },
    //   selectProps: {
    //     native: false,
    //     placeholder: "Select grading scale",
    //   },
    // },
    {
      name: "attachment_url",
      label: "Upload PDF Instructions",
      type: "file",
      required: true,
      rules: {
        required: "PDF file is required",
      },
      fileProps: {
        type: "files",
        maxFiles: 1,
        multiple: false,
        maxSize: 10240, // 10MB in KB
        acceptedFileTypes: [".pdf", ".pptx"],
        previewType: "list",
      },
      icon: <Upload size={18} className="text-gray-400" />,
      gridProps: { xs: 12 },
    },
  ];
  const getDefaultValues = (): Partial<AssignmentFormValues> => {
    if (!assignment) return {};

    // Parse start date and time
    let startDate: Date | null = null;
    let startTime = "09:00";
    if (assignment.start_date) {
      const date = new Date(assignment.start_date);
      startDate = date;
      startTime = date.toTimeString().slice(0, 5); // HH:MM format
    }

    // Parse end date and time
    let endDate: Date | null = null;
    let endTime = "17:00";
    if (assignment.end_date) {
      const date = new Date(assignment.end_date);
      endDate = date;
      endTime = date.toTimeString().slice(0, 5); // HH:MM format
    }

    return {
      name: assignment.name,
      start_date: startDate,
      start_time: startTime,
      end_date: endDate,
      end_time: endTime,
      totalPoints: assignment.totalPoints,
      numberOfQuestions: assignment.numberOfQuestions,
      instructions: assignment.instructions || "",
      attachment_url: assignment.attachment_url || "",
    };
  };

  const handleFormSubmit = async (data: AssignmentFormValues) => {
    if (!assignment) return;
  
    console.log("Edit form submission started with data:", data);
    
    try {
      // Combine date and time for start_date
      let startDateISO: string | undefined = undefined;
      if (data.start_date && data.start_time) {
        const [hours, minutes] = data.start_time.split(":").map(Number);
        const startDateTime = new Date(data.start_date);
        startDateTime.setHours(hours, minutes, 0, 0);
        startDateISO = startDateTime.toISOString();
      }

      // Combine date and time for end_date
      let endDateISO: string | undefined = undefined;
      if (data.end_date && data.end_time) {
        const [hours, minutes] = data.end_time.split(":").map(Number);
        const endDateTime = new Date(data.end_date);
        endDateTime.setHours(hours, minutes, 0, 0);
        endDateISO = endDateTime.toISOString();
      }

      // Handle attachment URL
      let attachmentUrl = assignment.attachment_url; // Keep existing if no new file
      if (data.attachment_url && typeof data.attachment_url !== 'string' && data.attachment_url.length > 0) {
        // TODO: Replace with actual file upload logic
        attachmentUrl = `uploaded_file_${Date.now()}.pdf`;
      }

      const updatePayload: UpdateAssignmentPayload = {
        id: assignment.id,
        name: data.name,
        instructions: data.instructions,
        start_date: startDateISO,
        end_date: endDateISO,
        attachment_url: attachmentUrl,
        totalPoints: parseInt(String(data.totalPoints), 10),
        numberOfQuestions: parseInt(String(data.numberOfQuestions), 10),
      };

      console.log('Updating assignment with payload:', updatePayload);

      const result = await updateExistingAssignment(updatePayload);
      
      if (result.meta.requestStatus === 'fulfilled') {
        console.log("Assignment updated successfully");
        onSubmit?.(data);
        onClose();
      } else {
        console.error('Failed to update assignment:', result.payload);
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
      title="Edit Assignment"
      description="Update assignment details and settings"
      submitButtonText="Update Assignment"
      cancelButtonText="Cancel"
      maxWidth="lg"
      enableResetButton={true}
      initialValues={getDefaultValues()}
      loading={loading}
      error={error || undefined}
    />
  );
};

export default EditAssignmentModal;