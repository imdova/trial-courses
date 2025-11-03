"use client";

import { useState } from "react";
import { Button } from "@/components/UI/button";
import { BookOpen, Calendar, Plus, Upload } from "lucide-react";
import AssignmentsTable from "@/components/admin/AssignmentsTable";
import { MOCK_ASSIGNMENTS, Assignment } from "@/types/assignment";
import AssignmentFormModal from "@/components/FormModal/AssignmentFormModal";
import { FieldConfig } from "@/types/forms";

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

export default function AssignmentsPage() {
  const [assignments] = useState<Assignment[]>(MOCK_ASSIGNMENTS);
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

  const handleEdit = (assignment: Assignment) => {
    console.log("Edit assignment:", assignment);
    // TODO: Navigate to edit page or open edit modal
  };

  const handleDelete = (assignment: Assignment) => {
    console.log("Delete assignment:", assignment);
    // TODO: Implement delete functionality
  };

  const handleView = (assignment: Assignment) => {
    console.log("View assignment:", assignment);
    // TODO: Navigate to assignment details page
  };

  return (
    <div className="space-y-6 px-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">All Assignments</h1>
          <p className="text-gray-600 mt-1">
            View, manage, and track all your course assignments in one place.
          </p>
        </div>
        <Button 
          className="bg-green-600 hover:bg-green-700"
          onClick={() => setIsModalOpen(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Assignment
        </Button>
      </div>

      {/* Assignments Table */}
      <AssignmentsTable
        assignments={assignments}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onView={handleView}
      />
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
}
