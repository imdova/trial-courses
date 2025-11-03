import { useCallback, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { 
  fetchStudentsOverview,
  fetchStudentsGeoStats,
  clearStudentsOverview, 
  setPeriod,
  PeriodFilter 
} from "@/store/slices/admin-students.slice";

export const useAdminStudents = (autoFetch: boolean = false) => {
  const dispatch = useAppDispatch();
  const { data: session } = useSession();
  const token = session?.user?.accessToken;

  const { overview, geoStats, period, loading, loadingGeoStats, error } = useAppSelector(
    (state) => state.adminStudents
  );

  const getStudentsOverview = useCallback(
    (selectedPeriod?: PeriodFilter) => {
      if (!token) return;
      return dispatch(
        fetchStudentsOverview({
          token,
          period: selectedPeriod || period,
        })
      );
    },
    [dispatch, token, period]
  );

  const changePeriod = useCallback(
    (newPeriod: PeriodFilter) => {
      dispatch(setPeriod(newPeriod));
      if (token) {
        dispatch(fetchStudentsOverview({ token, period: newPeriod }));
      }
    },
    [dispatch, token]
  );

  const getGeoStats = useCallback(() => {
    if (!token) return;
    return dispatch(fetchStudentsGeoStats(token));
  }, [dispatch, token]);

  const clearOverview = useCallback(() => {
    dispatch(clearStudentsOverview());
  }, [dispatch]);

  // Auto-fetch on mount if enabled
  useEffect(() => {
    if (autoFetch && token && !overview) {
      getStudentsOverview();
      getGeoStats();
    }
  }, [autoFetch, token, overview, getStudentsOverview, getGeoStats]);

  return {
    overview,
    geoStats,
    period,
    loading,
    loadingGeoStats,
    error,
    getStudentsOverview,
    getGeoStats,
    changePeriod,
    clearOverview,
  };
};

