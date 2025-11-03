import { useCallback, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { 
  fetchStudentsList, 
  clearStudentsList, 
  setFilters,
  resetFilters,
  StudentsFilters 
} from "@/store/slices/admin-students-list.slice";

export const useAdminStudentsList = (autoFetch: boolean = false, initialLimit: number = 10) => {
  const dispatch = useAppDispatch();
  const { data: session } = useSession();
  const token = session?.user?.accessToken;

  const { data, pagination, filters, loading, error } = useAppSelector(
    (state) => state.adminStudentsList
  );

  const getStudents = useCallback(
    (customFilters?: Partial<StudentsFilters>) => {
      if (!token) return;
      const finalFilters = { ...filters, ...customFilters };
      return dispatch(
        fetchStudentsList({
          token,
          filters: finalFilters,
        })
      );
    },
    [dispatch, token, filters]
  );

  const updateFilters = useCallback(
    (newFilters: Partial<StudentsFilters>) => {
      dispatch(setFilters(newFilters));
      if (token) {
        dispatch(fetchStudentsList({ token, filters: { ...filters, ...newFilters } }));
      }
    },
    [dispatch, token, filters]
  );

  const clearFilters = useCallback(() => {
    dispatch(resetFilters());
    if (token) {
      dispatch(fetchStudentsList({ token, filters: { page: 1, limit: initialLimit } }));
    }
  }, [dispatch, token, initialLimit]);

  const clearData = useCallback(() => {
    dispatch(clearStudentsList());
  }, [dispatch]);

  // Auto-fetch on mount if enabled
  useEffect(() => {
    if (autoFetch && token && data.length === 0) {
      getStudents({ limit: initialLimit, page: 1 });
    }
  }, [autoFetch, token, data.length, getStudents, initialLimit]);

  return {
    students: data,
    pagination,
    filters,
    loading,
    error,
    getStudents,
    updateFilters,
    clearFilters,
    clearStudents: clearData,
  };
};

