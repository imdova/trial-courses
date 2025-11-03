/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback } from "react";
import { useSession } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchQuizzes,
  fetchQuizById,
  fetchQuizOverview,
  createQuiz,
  updateQuiz,
  deleteQuiz,
  setFilters,
  clearFilters,
  setCurrentQuiz,
  clearError,
  QuizFilters,
  createQuizWithQuestions,
  fetchQuizQuestionsStats,
  fetchQuizStudents,
  fetchLatestQuizzes,
} from "@/store/slices/quizSlice";
import { Quiz } from "@/types/quiz";

export const useQuiz = () => {
  const dispatch = useAppDispatch();
  const { data: session } = useSession();
  const { 
    quizzes, 
    currentQuiz, 
    quizOverview,
    quizQuestionsStats,
    quizStudents,
    latestQuizzes,
    loading, 
    loadingOverview,
    loadingStats,
    loadingStudents,
    loadingLatest,
    error, 
    filters, 
    pagination 
  } = useAppSelector((state) => state.quiz);

  // Get the access token from session
  const token = session?.user?.accessToken;

  // Fetch quizzes with optional filters
  const getQuizzes = useCallback(
    (filters?: QuizFilters) => {
      return token && dispatch(fetchQuizzes({ filters: filters || {}, token }));
    },
    [dispatch, token],
  );

  // Fetch a single quiz by ID
  const getQuizById = useCallback(
    (quizId: string) => {
      if(token) {
        console.log("token", token);
        console.log("quizId", quizId);
        return dispatch(fetchQuizById({ quizId, token }));
      }
    },
    [dispatch, token],
  );

  // Fetch quiz overview by ID
  const getQuizOverview = useCallback(
    (quizId: string) => {
      if(token) {
        return dispatch(fetchQuizOverview({ quizId, token }));
      }
    },
    [dispatch, token],
  );

  // Create a new quiz
  const createNewQuiz = useCallback(
    (quizData: Partial<Quiz>) => {
      return dispatch(createQuiz({ quizData, token }));
    },
    [dispatch, token],
  );

  // Update an existing quiz
  const updateExistingQuiz = useCallback(
    (id: string, quizData: Partial<Quiz>) => {
      return dispatch(updateQuiz({ id, quizData, token }));
    },
    [dispatch, token],
  );

  // Delete a quiz
  const removeQuiz = useCallback(
    (quizId: string) => {
      return dispatch(deleteQuiz({ quizId, token }));
    },
    [dispatch, token],
  );

  // Set filters
  const applyFilters = useCallback(
    (newFilters: QuizFilters) => {
      dispatch(setFilters(newFilters));
      // Automatically fetch quizzes with new filters
      return token && dispatch(fetchQuizzes({ filters: newFilters, token }));
    },
    [dispatch, token],
  );

  // Clear all filters
  const resetFilters = useCallback(() => {
    dispatch(clearFilters());
    // Fetch quizzes without filters
    return token && dispatch(fetchQuizzes({ filters: {}, token }));
  }, [dispatch, token]);

  // Set current quiz
  const selectQuiz = useCallback(
    (quiz: Quiz | null) => {
      dispatch(setCurrentQuiz(quiz));
    },
    [dispatch],
  );

  // Clear error
  const resetError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  // Filter quizzes by success rate
  const filterBySuccessRate = useCallback(
    (min?: number, max?: number) => {
      const newFilters = {
        ...filters,
        minSuccessRate: min,
        maxSuccessRate: max,
      };
      return applyFilters(newFilters);
    },
    [filters, applyFilters],
  );

  // Filter quizzes by average score
  const filterByAverageScore = useCallback(
    (min?: number, max?: number) => {
      const newFilters = {
        ...filters,
        minAverageScore: min,
        maxAverageScore: max,
      };
      return applyFilters(newFilters);
    },
    [filters, applyFilters],
  );

  // Filter quizzes by question count
  const filterByQuestionCount = useCallback(
    (min?: number, max?: number) => {
      const newFilters = {
        ...filters,
        minQuestionCount: min,
        maxQuestionCount: max,
      };
      return applyFilters(newFilters);
    },
    [filters, applyFilters],
  );

  // Filter quizzes by status
  const filterByStatus = useCallback(
    (status: string) => {
      const newFilters = {
        ...filters,
        status,
      };
      return applyFilters(newFilters);
    },
    [filters, applyFilters],
  );

  // Search quizzes by title
  const searchByTitle = useCallback(
    (title: string) => {
      const newFilters = {
        ...filters,
        title,
      };
      return applyFilters(newFilters);
    },
    [filters, applyFilters],
  );

  // Create a quiz with questions (new API)
  const createQuizWithQuestionsToApi = useCallback(
    (payload: any) => {
      return dispatch(createQuizWithQuestions({ payload, token }));
    },
    [dispatch, token]
  );

  // Fetch quiz questions statistics
  const getQuizQuestionsStats = useCallback(
    (quizId: string) => {
      if (token) {
        return dispatch(fetchQuizQuestionsStats({ quizId, token }));
      }
    },
    [dispatch, token]
  );

  // Fetch quiz students
  const getQuizStudents = useCallback(
    (quizId: string) => {
      if (token) {
        return dispatch(fetchQuizStudents({ quizId, token }));
      }
    },
    [dispatch, token]
  );

  // Fetch latest quizzes for student
  const getLatestQuizzes = useCallback(
    () => {
      if (token) {
        return dispatch(fetchLatestQuizzes({ token }));
      }
    },
    [dispatch, token]
  );

  return {
    // State
    quizzes,
    currentQuiz,
    quizOverview,
    quizQuestionsStats,
    quizStudents,
    latestQuizzes,
    loading,
    loadingOverview,
    loadingStats,
    loadingStudents,
    loadingLatest,
    isLoading: loading, // Add isLoading as alias for loading
    error,
    filters,
    pagination,

    // Actions
    getQuizzes,
    getQuizById,
    getQuizOverview,
    createNewQuiz,
    updateExistingQuiz,
    removeQuiz,
    applyFilters,
    resetFilters,
    selectQuiz,
    resetError,

    // Convenience methods
    filterBySuccessRate,
    filterByAverageScore,
    filterByQuestionCount,
    filterByStatus,
    searchByTitle,
    // New API
    createQuizWithQuestionsToApi,
    getQuizQuestionsStats,
    getQuizStudents,
    getLatestQuizzes,
  };
};
