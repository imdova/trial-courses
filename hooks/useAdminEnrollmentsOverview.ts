import { useCallback, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { 
  fetchEnrollmentsOverview, 
  clearEnrollmentsOverview,
  setPeriod,
  PeriodFilter
} from "@/store/slices/admin-enrollments-overview.slice";

export const useAdminEnrollmentsOverview = (autoFetch: boolean = false) => {
  const dispatch = useAppDispatch();
  const { data: session } = useSession();
  const token = session?.user?.accessToken;

  const { data, period, loading, error } = useAppSelector(
    (state) => state.adminEnrollmentsOverview
  );

  const getEnrollmentsOverview = useCallback(
    (selectedPeriod?: PeriodFilter) => {
      if (!token) return;
      return dispatch(
        fetchEnrollmentsOverview({
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
        dispatch(fetchEnrollmentsOverview({ token, period: newPeriod }));
      }
    },
    [dispatch, token]
  );

  const clearOverview = useCallback(() => {
    dispatch(clearEnrollmentsOverview());
  }, [dispatch]);

  // Auto-fetch on mount if enabled
  useEffect(() => {
    if (autoFetch && token && !data) {
      getEnrollmentsOverview();
    }
  }, [autoFetch, token, data, getEnrollmentsOverview]);

  return {
    overview: data,
    period,
    loading,
    error,
    getEnrollmentsOverview,
    changePeriod,
    clearOverview,
  };
};

