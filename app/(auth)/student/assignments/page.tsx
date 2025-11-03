"use client";

import { Upload, FileText } from "lucide-react";
import { useState } from "react";
import FormModal from "@/components/FormModal/FormModal";
import { FieldConfig } from "@/types/forms";
type Assignment = {
  id: string;
  title: string;
  dueDate: string;
  status: "Not Started" | "In Progress" | "Submitted" | "Late";
  course: string;
};

type SubmissionFormValues = {
  submissionText: string;
  submissionFile: FileList | null;
};

const StudentAssignmentsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAssignment, setSelectedAssignment] =
    useState<Assignment | null>(null);

  // Dummy assignments data
  const assignments: Assignment[] = [
    {
      id: "1",
      title: "Math Homework - Chapter 5",
      dueDate: "2023-06-15",
      status: "Not Started",
      course: "Mathematics",
    },
    {
      id: "2",
      title: "History Essay - World War II",
      dueDate: "2023-06-20",
      status: "In Progress",
      course: "History",
    },
    {
      id: "3",
      title: "Science Lab Report",
      dueDate: "2023-06-10",
      status: "Submitted",
      course: "Science",
    },
    {
      id: "4",
      title: "English Book Review",
      dueDate: "2023-06-25",
      status: "Late",
      course: "English",
    },
  ];

  const fields: FieldConfig<SubmissionFormValues>[] = [
    {
      name: "submissionText",
      label: "Your Submission",
      type: "textEditor",
      gridProps: { xs: 12 },
      textFieldProps: {
        placeholder: "Type your submission here...",
      },
    },
    {
      name: "submissionFile",
      label: "Upload Your Work",
      type: "file",
      fileProps: {
        type: "files",
        maxFiles: 1,
        multiple: false,
        maxSize: 10240, // 10MB in KB
        acceptedFileTypes: [
          ".pdf",
          ".doc",
          ".docx",
          ".ppt",
          ".pptx",
          ".jpg",
          ".png",
        ],
        previewType: "list",
      },
      icon: <Upload size={18} className="text-gray-400" />,
      gridProps: { xs: 12 },
    },
  ];

  const handleSubmit = (formData: SubmissionFormValues) => {
    console.log("Assignment submitted:", {
      assignment: selectedAssignment?.title,
      submissionText: formData.submissionText,
      file: formData.submissionFile ? formData.submissionFile[0].name : "None",
    });

    setIsModalOpen(false);
    setSelectedAssignment(null);
  };

  const getStatusColor = (status: Assignment["status"]) => {
    switch (status) {
      case "Not Started":
        return "bg-gray-100 text-gray-800";
      case "In Progress":
        return "bg-blue-100 text-blue-800";
      case "Submitted":
        return "bg-green-100 text-green-800";
      case "Late":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="mx-4 md:mx-5">
      <div className="flex flex-col items-center justify-between gap-4 mb-5 md:flex-row">
        <div className="text-center md:text-start">
          <h1 className="text-2xl font-bold mb-2">My Assignments</h1>
          <p className="text-sm text-gray-500">
            View and submit all your course assignments.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {assignments.length > 0 ? (
          assignments.map((assignment) => (
            <div key={assignment.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-sm">{assignment.title}</h3>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${getStatusColor(
                    assignment.status
                  )}`}
                >
                  {assignment.status}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-1">
                Course: {assignment.course}
              </p>
              <p className="text-sm text-gray-600 mb-4">
                Due: {new Date(assignment.dueDate).toLocaleDateString()}
              </p>
              <div className="flex justify-end">
                <button
                  onClick={() => {
                    setSelectedAssignment(assignment);
                    setIsModalOpen(true);
                  }}
                  className="text-primary hover:text-primary-dark text-sm font-medium flex items-center gap-1"
                >
                  <FileText size={16} /> Submit Work
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-sm text-gray-500 py-8">
            No assignments available.
          </div>
        )}
      </div>

      <FormModal
        open={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedAssignment(null);
        }}
        onSubmit={handleSubmit}
        fields={fields}
        title={`Submit Assignment: ${selectedAssignment?.title || ""}`}
        submitButtonText="Submit Assignment"
        maxWidth="lg"
        enableResetButton
      />
    </div>
  );
};

export default StudentAssignmentsPage;
