/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  fetchAssignments,
  fetchAssignmentById,
  createAssignment,
  updateAssignment,
  deleteAssignment,
  sendReminder,
  setFilters,
  clearFilters,
  setCurrentAssignment,
  clearError,
  setPagination,
  AssignmentFilters,
  CreateAssignmentPayload,
  UpdateAssignmentPayload,
  fetchAssignmentStudents,
  StudentSubmissionFilters,
} from '@/store/slices/assignmentsSlice';

export const useAssignments = () => {
  const dispatch = useAppDispatch();
  const { data: session } = useSession();
  const {
    assignments,
    currentAssignment,
    loading,
    error,
    filters,
    pagination,
  } = useAppSelector((state) => state.assignments);

  // Get the access token from session
  const token = session?.user?.accessToken;


  // Fetch assignments with filters
  const getAssignments = useCallback(
    (filters?: AssignmentFilters) => {
      return token && dispatch(fetchAssignments({ filters: filters || {}, token }));
    },
    [dispatch, token]
  );

  // Fetch assignment by ID
  const getAssignmentById = useCallback(
    (id: string) => {
      return dispatch(fetchAssignmentById({ id, token }));
    },
    [dispatch, token]
  );

  // Create new assignment
  const createNewAssignment = useCallback(
    (assignmentData: CreateAssignmentPayload) => {
      return dispatch(createAssignment({ assignmentData, token }));
    },
    [dispatch, token]
  );

  // Update existing assignment
  const updateExistingAssignment = useCallback(
    (assignmentData: UpdateAssignmentPayload) => {
      console.log(assignmentData, "assignmentData")
      return dispatch(updateAssignment({ assignmentData, token }));
    },
    [dispatch, token]
  );

  // Delete assignment
  const removeAssignment = useCallback(
    (id: string) => {
      return dispatch(deleteAssignment({ id, token }));
    },
    [dispatch, token]
  );

  // Send reminder
  const sendAssignmentReminder = useCallback(
    (id: string, message: string) => {
      return dispatch(sendReminder({ id, message, token }));
    },
    [dispatch, token]
  );

  // Set filters
  const updateFilters = useCallback(
    (filters: AssignmentFilters) => {
      dispatch(setFilters(filters));
    },
    [dispatch]
  );

  // Clear filters
  const resetFilters = useCallback(() => {
    dispatch(clearFilters());
  }, [dispatch]);

  // Set current assignment
  const selectAssignment = useCallback(
    (assignment: any) => {
      dispatch(setCurrentAssignment(assignment));
    },
    [dispatch]
  );

  // Clear error
  const resetError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  // Update pagination
  const updatePagination = useCallback(
    (paginationData: { page?: number; limit?: number }) => {
      dispatch(setPagination(paginationData));
    },
    [dispatch]
  );

  // Fetch assignment students
  const getAssignmentStudents = useCallback(
    (assignmentId: string, filters?: StudentSubmissionFilters) => {
      return dispatch(fetchAssignmentStudents({ assignmentId, filters, token }));
    },
    [dispatch, token]
  );

  return {
    // State
    assignments,
    currentAssignment,
    loading,
    error,
    filters,
    pagination,
    studentSubmissions: useAppSelector((state) => state.assignments.studentSubmissions),
    studentSubmissionsMeta: useAppSelector((state) => state.assignments.studentSubmissionsMeta),
    
    // Actions
    getAssignments,
    getAssignmentById,
    createNewAssignment,
    updateExistingAssignment,
    removeAssignment,
    sendAssignmentReminder,
    updateFilters,
    resetFilters,
    selectAssignment,
    resetError,
    updatePagination,
    getAssignmentStudents,
  };
};