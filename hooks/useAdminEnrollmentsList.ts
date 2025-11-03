import { useCallback, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { 
  fetchEnrollmentsList, 
  clearEnrollmentsList, 
  setFilters,
  resetFilters,
  EnrollmentsFilters 
} from "@/store/slices/admin-enrollments-list.slice";

export const useAdminEnrollmentsList = (autoFetch: boolean = false, initialLimit: number = 10) => {
  const dispatch = useAppDispatch();
  const { data: session } = useSession();
  const token = session?.user?.accessToken;

  const { data, pagination, filters, loading, error } = useAppSelector(
    (state) => state.adminEnrollmentsList
  );

  const getEnrollments = useCallback(
    (customFilters?: Partial<EnrollmentsFilters>) => {
      if (!token) return;
      const finalFilters = { ...filters, ...customFilters };
      return dispatch(
        fetchEnrollmentsList({
          token,
          filters: finalFilters,
        })
      );
    },
    [dispatch, token, filters]
  );

  const updateFilters = useCallback(
    (newFilters: Partial<EnrollmentsFilters>) => {
      dispatch(setFilters(newFilters));
      if (token) {
        dispatch(fetchEnrollmentsList({ token, filters: { ...filters, ...newFilters } }));
      }
    },
    [dispatch, token, filters]
  );

  const clearFilters = useCallback(() => {
    dispatch(resetFilters());
    if (token) {
      dispatch(fetchEnrollmentsList({ token, filters: { page: 1, limit: initialLimit } }));
    }
  }, [dispatch, token, initialLimit]);

  const clearData = useCallback(() => {
    dispatch(clearEnrollmentsList());
  }, [dispatch]);

  // Auto-fetch on mount if enabled
  useEffect(() => {
    if (autoFetch && token && data.length === 0) {
      getEnrollments({ limit: initialLimit, page: 1 });
    }
  }, [autoFetch, token, data.length, getEnrollments, initialLimit]);

  return {
    enrollments: data,
    pagination,
    filters,
    loading,
    error,
    getEnrollments,
    updateFilters,
    clearFilters,
    clearEnrollments: clearData,
  };
};

