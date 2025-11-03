import { useCallback, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { 
  fetchCoursesOverview, 
  fetchWeeklySales,
  clearCoursesOverview 
} from "@/store/slices/admin-courses-overview.slice";

export const useAdminCoursesOverview = (autoFetch: boolean = false) => {
  const dispatch = useAppDispatch();
  const { data: session } = useSession();
  const token = session?.user?.accessToken;

  const { data, weeklySales, loading, loadingWeeklySales, error } = useAppSelector(
    (state) => state.adminCoursesOverview
  );

  const getCoursesOverview = useCallback(() => {
    if (!token) return;
    return dispatch(fetchCoursesOverview(token));
  }, [dispatch, token]);

  const getWeeklySales = useCallback(() => {
    if (!token) return;
    return dispatch(fetchWeeklySales(token));
  }, [dispatch, token]);

  const clearOverview = useCallback(() => {
    dispatch(clearCoursesOverview());
  }, [dispatch]);

  // Auto-fetch on mount if enabled
  useEffect(() => {
    if (autoFetch && token && !data) {
      getCoursesOverview();
      getWeeklySales();
    }
  }, [autoFetch, token, data, getCoursesOverview, getWeeklySales]);

  return {
    overview: data,
    weeklySales,
    loading,
    loadingWeeklySales,
    error,
    getCoursesOverview,
    getWeeklySales,
    clearOverview,
  };
};

