import { useCallback } from "react";
import { useSession } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

import { CourseTransaction } from "@/types/transaction";
import {
  clearCourseTransactions,
  fetchCourseTransactions,
  updateCourseTransaction,
} from "@/store/slices/courseTransactions.slice";

export const useCourseTransactions = () => {
  const dispatch = useAppDispatch();
  const { data: session } = useSession();

  const { data, fetching, loading, cached } = useAppSelector(
    (state) => state.courseTransactions,
  );

  // Get token from session (if needed for your API)
  const token = session?.user?.accessToken;

  // ─── Fetch Transactions ──────────────────────────────
  const getCourseTransactions = useCallback(() => {
    if (token) return dispatch(fetchCourseTransactions());
  }, [dispatch, token]);

  // ─── Update Transaction ──────────────────────────────
  const updateTransaction = useCallback(
    (id: string, updates: Record<string, CourseTransaction>) => {
      if (token)
        return dispatch(updateCourseTransaction({ id, updates })).unwrap();
    },
    [dispatch, token],
  );

  // ─── Clear ──────────────────────────────
  const clearTransactions = useCallback(() => {
    dispatch(clearCourseTransactions());
  }, [dispatch]);

  return {
    // State
    transactions: data,
    fetching,
    loading,
    cached,

    // Actions
    getCourseTransactions,
    updateTransaction,
    clearTransactions,
  };
};
