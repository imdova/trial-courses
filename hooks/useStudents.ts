import { useSelector, useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { RootState, AppDispatch } from '@/store/store';
import {
  fetchStudentsForInstructor,
  fetchStudentById,
  setFilters,
  clearFilters,
  setCurrentStudent,
  clearError,
  clearStudents,
  setPagination,
  StudentFilters,
} from '@/store/slices/studentsSlice';
import { useSession } from 'next-auth/react';
import { StudentProfile } from '@/types/courses';

export const useStudents = () => {
  const dispatch = useDispatch<AppDispatch>();
  
  const {
    students,
    currentStudent,
    loading,
    error,
    filters,
    pagination,
  } = useSelector((state: RootState) => state.students);
  const { data: session } = useSession();

  const token = session?.user?.accessToken;

  // Fetch students for instructor
  const fetchStudents = useCallback(
    (instructorId: string, filters?: StudentFilters) => {
      return dispatch(fetchStudentsForInstructor({ instructorId, filters, token }));
    },
    [dispatch, token]
  );

  // Fetch single student
  const fetchStudent = useCallback(
    (studentId: string) => {
      return dispatch(fetchStudentById({ studentId, token }));
    },
    [dispatch, token]
  );

  // Update filters
  const updateFilters = useCallback(
    (newFilters: StudentFilters) => {
      dispatch(setFilters(newFilters));
    },
    [dispatch]
  );

  // Clear filters
  const resetFilters = useCallback(() => {
    dispatch(clearFilters());
  }, [dispatch]);

  // Set current student
  const selectStudent = useCallback(
    (student: StudentProfile | null) => {
      dispatch(setCurrentStudent(student));
    },
    [dispatch]
  );

  // Clear error
  const resetError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  // Clear all students data
  const resetStudents = useCallback(() => {
    dispatch(clearStudents());
  }, [dispatch]);

  // Update pagination
  const updatePagination = useCallback(
    (paginationData: { page?: number; limit?: number; total?: number }) => {
      dispatch(setPagination(paginationData));
    },
    [dispatch]
  );

  // Helper function to get student by ID from current list
  const getStudentById = useCallback(
    (studentId: string): StudentProfile | undefined => {
      return students.find(student => student.id === studentId);
    },
    [students]
  );

  // Helper function to check if there are more pages
  const hasMorePages = useCallback(() => {
    return pagination.page * pagination.limit < pagination.total;
  }, [pagination]);

  // Helper function to get total pages
  const getTotalPages = useCallback(() => {
    return Math.ceil(pagination.total / pagination.limit);
  }, [pagination]);

  return {
    // State
    students,
    currentStudent,
    loading,
    error,
    filters,
    pagination,
    
    // Actions
    fetchStudents,
    fetchStudent,
    updateFilters,
    resetFilters,
    selectStudent,
    resetError,
    resetStudents,
    updatePagination,
    
    // Helpers
    getStudentById,
    hasMorePages,
    getTotalPages,
  };
};

export default useStudents;