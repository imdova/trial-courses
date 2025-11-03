import { useCallback, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchDashboardData, clearDashboardData } from "@/store/slices/admin-dashboard.slice";

export const useAdminDashboard = () => {
  const dispatch = useAppDispatch();
  const { data: session } = useSession();
  const token = session?.user?.accessToken;

  const { data, loading, error } = useAppSelector(
    (state) => state.adminDashboard
  );

  const getDashboardData = useCallback(() => {
    if (!token) return;
    return dispatch(fetchDashboardData(token));
  }, [dispatch, token]);

  const clearDashboard = useCallback(() => {
    dispatch(clearDashboardData());
  }, [dispatch]);

  // Auto-fetch on mount
  useEffect(() => {
    if (token && !data) {
      getDashboardData();
    }
  }, [token, data, getDashboardData]);

  return {
    dashboardData: data,
    loading,
    error,
    getDashboardData,
    clearDashboard,
  };
};

