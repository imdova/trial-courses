"use client";

import { Plus, Calendar, Upload, BookOpen } from "lucide-react";
import { useState, Suspense } from "react";
import AssignmentsTable from "./components/AssignmentsTable";
import AssignmentFormModal from "@/components/FormModal/AssignmentFormModal";
import { FieldConfig } from "@/types/forms";

// Type definition for form values
type AssignmentFormValues = {
  assignmentName: string;
  start_date: Date | null;
  start_time: string;
  end_date: Date | null;
  end_time: string;
  instructions: string;
  attachment_url: FileList | null;
  totalPoints: number;
  numberOfQuestions: number;
  
};

// const gradingOptions = [
//   { value: "A", label: "A (90–100%)" },
//   { value: "A-", label: "A- (85–89%)" },
//   { value: "B+", label: "B+ (80–84%)" },
//   { value: "B", label: "B (75–79%)" },
//   { value: "C", label: "C (70–74%)" },
//   { value: "D", label: "D (60–69%)" },
//   { value: "F", label: "F (Below 60%)" },
// ];

const AssignmentsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fields: FieldConfig<AssignmentFormValues>[] = [
    {
      name: "assignmentName",
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
    // {
    //   name: "dueTime",
    //   label: "Due Time",
    //   type: "time",
    //   required: true,
    //   gridProps: { xs: 6 },
    //   textFieldProps: {
    //     type: "time",
    //     placeholder: "HH:MM",
    //   },
    // },
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

  return (
    <div className="mx-4 md:mx-5">
      <div className="mb-5 flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="text-center md:text-start">
          <h1 className="mb-2 text-2xl font-bold">My Assignments</h1>
          <p className="text-sm text-gray-500">
            View, manage, and track all your course assignments in one place.
          </p>
        </div>
        <button
          className="bg-primary flex items-center gap-2 rounded-md px-3 py-2 text-white"
          onClick={() => setIsModalOpen(true)}
        >
          <Plus size={16} /> Add Assignment
        </button>
      </div>

      {/* Wrap AssignmentsTable with Suspense */}
      <Suspense fallback={<div className="flex justify-center p-8">Loading assignments...</div>}>
        <AssignmentsTable />
      </Suspense>

      <AssignmentFormModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        fields={fields}
        title="Create New Assignment"
        submitButtonText="Create Assignment"
        maxWidth="lg"
        enableResetButton
        defaultValues={{
          start_time: "00:00",
          end_time: "00:00"
        }}
        courseId="default-course-id"
        subjectId="default-subject-id"
      />
    </div>
  );
};

export default AssignmentsPage;
