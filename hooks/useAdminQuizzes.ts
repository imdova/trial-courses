import { useCallback, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchAdminQuizzes, clearQuizzes } from "@/store/slices/admin-quizzes.slice";

export const useAdminQuizzes = (autoFetch: boolean = false, limit: number = 10) => {
  const dispatch = useAppDispatch();
  const { data: session } = useSession();
  const token = session?.user?.accessToken;

  const { 
    data, 
    totalQuizzes,
    totalEnrollments,
    totalQuestions,
    pagination, 
    fetching, 
    error 
  } = useAppSelector((state) => state.adminQuizzes);

  const getQuizzes = useCallback(
    (page: number = 1, pageLimit?: number) => {
      if (!token) return;
      return dispatch(
        fetchAdminQuizzes({
          token,
          page,
          limit: pageLimit || limit,
        })
      );
    },
    [dispatch, token, limit]
  );

  const clearQuizzesData = useCallback(() => {
    dispatch(clearQuizzes());
  }, [dispatch]);

  // Auto-fetch on mount if enabled
  useEffect(() => {
    if (autoFetch && token && data.length === 0) {
      getQuizzes(1);
    }
  }, [autoFetch, token, data.length, getQuizzes]);

  return {
    quizzes: data,
    stats: {
      totalQuizzes,
      totalEnrollments,
      totalQuestions,
    },
    pagination,
    loading: fetching,
    error,
    getQuizzes,
    clearQuizzes: clearQuizzesData,
  };
};

