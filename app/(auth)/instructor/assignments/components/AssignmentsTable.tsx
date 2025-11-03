/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as React from "react";
import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import AdvancedDataTable from "@/components/UI/AdvancedDataTable";
import { Loader2 } from "lucide-react";
import EditAssignmentModal from "@/components/FormModal/EditAssignmentModal";
import AssignmentActionsModal from "@/components/FormModal/AssignmentActionsModal";
import { useAssignments } from "../hooks/useAssignments";
import { AssignmentFilters } from "@/store/slices/assignmentsSlice";
import { generateAssignmentColumns } from "@/components/columns/assignmentColumns";
import { Assignment } from "@/types/courses";

const AssignmentsTable: React.FC = () => {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [actionsModalOpen, setActionsModalOpen] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);
  const [currentAction, setCurrentAction] = useState<"archive" | "reminder" | "link" | null>(null);
  
  const searchParams = useSearchParams();

  // Use the assignments hook to get data and actions
  const {
    assignments,
    loading,
    error,
    getAssignments,
    updateExistingAssignment,
    updateFilters,
  } = useAssignments();

  // Extract filters from URL parameters
  const urlFilters = useMemo(() => {
    const filters: AssignmentFilters = {};
    
    const search = searchParams.get("q");
    if (search) filters.search = search;
    
    const subject = searchParams.get("subject");
    if (subject) filters.subject = subject;
    
    const grading = searchParams.get("grading");
    if (grading) filters.grading = grading;
    
    const status = searchParams.get("status");
    if (status) filters.status = status;
    
    return filters;
  }, [searchParams]);

  // Fetch assignments when URL filters change
  useEffect(() => {
    updateFilters(urlFilters);
    getAssignments(urlFilters);
  }, [urlFilters, updateFilters, getAssignments]);

  const handleEditAssignment = (assignment: Assignment) => {
    setSelectedAssignment(assignment);
    setEditModalOpen(true);
  };

  const handleAssignmentAction = (assignment: Assignment, action: "archive" | "reminder" | "link") => {
    setSelectedAssignment(assignment);
    setCurrentAction(action);
    setActionsModalOpen(true);
  };

  const handleEditSubmit = async (data: any) => {
    if (!selectedAssignment) return;
    
    try {
      await updateExistingAssignment({
        id: selectedAssignment.id,
        ...data,
      });
      setEditModalOpen(false);
      setSelectedAssignment(null);
      // Refresh assignments with current filters
      getAssignments(urlFilters);
    } catch (error) {
      console.error("Failed to update assignment:", error);
    }
  };

  // Generate columns with action handlers
  const columns = useMemo(
    () =>
      generateAssignmentColumns({
        onEdit: handleEditAssignment,
        onArchive: (assignment) => handleAssignmentAction(assignment, "archive"),
        onReminder: (assignment) => handleAssignmentAction(assignment, "reminder"),
        onDelete: async (assignment) => {
          if (window.confirm(`Are you sure you want to delete "${assignment.name}"?`)) {
            // TODO: Implement delete functionality
            console.log("Delete assignment:", assignment.id);
          }
        },
      }),
    []
  );

  // Show error state
  if (error) {
    return (
      <div className="flex flex-col rounded-lg border bg-white p-4 shadow-soft">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <p className="text-red-600 mb-2">Error loading assignments: {error}</p>
            <button
              onClick={() => {
                getAssignments();
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col rounded-lg border bg-white p-4 shadow-soft">
      {loading && assignments.length === 0 ? (
        <div className="flex items-center justify-center h-64">
          <div className="flex items-center gap-2">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span>Loading assignments...</span>
          </div>
        </div>
      ) : (
        <AdvancedDataTable<Assignment>
          name="Assignments"
          data={assignments}
          columns={columns}
          loading={loading}
          hidePagination={false}
          hideSearch={false}
          hideExport={false}
          hideColumnManager={false}
          initialPagination={{
            pageIndex: 0,
            pageSize: 10,
          }}
          defaultSorting={{
            id: "created_at",
            desc: true,
          }}
          defaultColumnVisibility={{
            created_at: false,
          }}
        />
      )}


      {/* Edit Assignment Modal */}
      <EditAssignmentModal
        open={editModalOpen}
        onClose={() => {
          setEditModalOpen(false);
          setSelectedAssignment(null);
        }}
        onSubmit={handleEditSubmit}
        assignment={selectedAssignment as any}
        courseId="default-course-id"
        subjectId="default-subject-id"
      />

      <AssignmentActionsModal
        open={actionsModalOpen}
        onClose={() => {
          setActionsModalOpen(false);
          setSelectedAssignment(null);
          setCurrentAction(null);
        }}
        assignment={selectedAssignment as any}
        action={currentAction}
      />
    </div>
  );
};

export default AssignmentsTable;
