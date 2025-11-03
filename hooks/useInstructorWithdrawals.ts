import { useCallback } from "react";
import { useSession } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

// Assuming you have defined the InstructorWithdrawal type and the slice actions/reducers
import {
  clearInstructorWithdrawals,
  fetchInstructorWithdrawals,
  updateInstructorWithdrawal,
} from "@/store/slices/instructorWithdrawals.slice"; // Assuming this is the slice file name
import { InstructorWithdrawal } from "@/types/withdraw";

export const useInstructorWithdrawals = () => {
  const dispatch = useAppDispatch();
  const { data: session } = useSession();

  // Select state from the instructorWithdrawals slice
  const { data, fetching, loading, cached } = useAppSelector(
    (state) => state.instructorWithdrawals, // Ensure this matches the key in your RootState
  );

  // Get token from session (if needed for your API calls)
  const token = session?.user?.accessToken;

  // ─── Fetch Withdrawals ──────────────────────────────
  /**
   * Dispatches the action to fetch instructor withdrawals.
   * Only runs if a token is available.
   */
  const getInstructorWithdrawals = useCallback(() => {
    if (token) return dispatch(fetchInstructorWithdrawals());
  }, [dispatch, token]);

  // ─── Update Withdrawal ──────────────────────────────
  /**
   * Dispatches the action to update a specific withdrawal record.
   *
   * @param id - The ID of the withdrawal to update.
   * @param updates - An object containing the fields to update (e.g., status, note).
   */
  const updateWithdrawal = useCallback(
    (id: string, updates: Partial<InstructorWithdrawal>) => {
      if (token)
        return dispatch(updateInstructorWithdrawal({ id, updates })).unwrap();
    },
    [dispatch, token],
  );

  // ─── Clear ──────────────────────────────
  /**
   * Dispatches the action to clear the withdrawal data from the Redux store.
   */
  const clearWithdrawals = useCallback(() => {
    dispatch(clearInstructorWithdrawals());
  }, [dispatch]);

  return {
    // State
    withdrawals: data,
    fetching,
    loading,
    cached,

    // Actions
    getInstructorWithdrawals,
    updateWithdrawal,
    clearWithdrawals,
  };
};
