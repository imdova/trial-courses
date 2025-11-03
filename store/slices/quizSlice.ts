/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Quiz, LatestQuiz } from "@/types/quiz";
import { API_URL } from "@/constants/api";
import {
  API_CREATE_QUIZ_WITH_QUESTIONS,
  API_GET_QUIZ_BY_ID_WITH_QUESTIONS,
  API_GET_QUIZ_OVERVIEW_BY_ID,
  API_UPDATE_QUIZ,
  API_DELETE_QUIZ,
  API_GET_QUIZZES,
  API_GET_QUIZ_QUESTIONS_STATS,
  API_GET_QUIZ_STUDENTS,
  API_GET_LATEST_QUIZZES,
} from "@/constants/api/quize";
import { getAuthHeaders } from "@/util/getAuthHeader";
// Quiz filter interface based on the Swagger documentation
export interface QuizFilters {
  maxSuccessRate?: number;
  minSuccessRate?: number;
  maxAverageScore?: number;
  minAverageScore?: number;
  maxQuestionCount?: number;
  minQuestionCount?: number;
  retakes?: string; // e.g., "$gte:2", "$lte:5"
  status?: string; // e.g., "published"
  title?: string; // search by title using ILIKE
  maxAnswerTime?: number;
  minAnswerTime?: number;
  userId?: string;
}

export interface QuizQuestionStatsAnswer {
  text: string;
  correct: boolean;
  chosenCount: number;
  chosenPercentage: string;
}

export interface QuizQuestionStats {
  questionId: string;
  text: string;
  type: string;
  answers: QuizQuestionStatsAnswer[];
  correctCount: number;
  incorrectCount: number;
  correctPercentage: string;
}

export interface QuizQuestionsStatsResponse {
  quizId: string;
  title: string;
  questions: QuizQuestionStats[];
}

export interface QuizStudent {
  student_name: string;
  email: string;
  date: string;
  time_taken: number;
  score: number;
  plays: string;
  status: "passed" | "failed";
}

export interface QuizStudentsResponse {
  data: QuizStudent[];
  meta: {
    total: number;
    page: number;
    lastPage: number;
  };
}

interface QuizState {
  quizzes: Quiz[];
  currentQuiz: Quiz | null;
  quizOverview: any | null;
  quizQuestionsStats: QuizQuestionsStatsResponse | null;
  quizStudents: QuizStudentsResponse | null;
  latestQuizzes: LatestQuiz[];
  fetching: boolean;
  loading: boolean;
  loadingOverview: boolean;
  loadingStats: boolean;
  loadingStudents: boolean;
  loadingLatest: boolean;
  cached: string | null;
  error: string | null;
  filters: QuizFilters;
  pagination: {
    total: number;
    page: number;
    limit: number;
  };
}

const initialState: QuizState = {
  quizzes: [],
  currentQuiz: null,
  quizOverview: null,
  quizQuestionsStats: null,
  quizStudents: null,
  latestQuizzes: [],
  loading: false,
  loadingOverview: false,
  loadingStats: false,
  loadingStudents: false,
  loadingLatest: false,
  fetching: false,
  cached: null,
  error: null,
  filters: {},
  pagination: {
    total: 0,
    page: 1,
    limit: 10,
  },
};
interface FetchQuizzesProps {
  filters?: QuizFilters;
  token: string;
}
// ─── Fetch Quizzes ──────────────────────────────────────────────
// Helper function to format filters with filter. prefix
const formatQuizFilters = (filters: QuizFilters): string => {
  const params = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      params.append(`filter.${key}`, String(value));
    }
  });

  const queryString = params.toString();
  return queryString ? `?${queryString}` : "";
};

export const fetchQuizzes = createAsyncThunk(
  "quiz/fetchQuizzes",
  async ({ filters = {}, token }: FetchQuizzesProps, { rejectWithValue }) => {
    try {
      const params = formatQuizFilters(filters);
      const response = await fetch(API_GET_QUIZZES + params, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data: PaginatedResponse_New<Quiz> = await response.json();
        return data;
      }
      return rejectWithValue("Failed to fetch categories");
    } catch (err) {
      return rejectWithValue(
        err instanceof Error ? err.message : "Failed to fetch categories",
      );
    }
  },
);

// Async thunk to fetch a single quiz by ID with questions
export const fetchQuizById = createAsyncThunk(
  "quiz/fetchQuizById",
  async ({ quizId, token }: { quizId: string; token?: string }) => {
    const response = await fetch(
      API_GET_QUIZ_BY_ID_WITH_QUESTIONS.replace("{quizId}", quizId),
      {
        method: "GET",
        headers: getAuthHeaders(token),
        credentials: "include", // Include cookies in the request
      },
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch quiz: ${response.statusText}`);
    }

    const data = await response.json();
    return data as Quiz;
  },
);

// Async thunk to fetch quiz overview by ID
export const fetchQuizOverview = createAsyncThunk(
  "quiz/fetchQuizOverview",
  async ({ quizId, token }: { quizId: string; token?: string }) => {
    const response = await fetch(
      API_GET_QUIZ_OVERVIEW_BY_ID.replace("{quizId}", quizId),
      {
        method: "GET",
        headers: getAuthHeaders(token),
        credentials: "include", // Include cookies in the request
      },
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch quiz overview: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  },
);

// Async thunk to create a new quiz
export const createQuiz = createAsyncThunk(
  "quiz/createQuiz",
  async ({ quizData, token }: { quizData: Partial<Quiz>; token?: string }) => {
    const response = await fetch(`${API_URL}/api/quizzes`, {
      method: "POST",
      headers: getAuthHeaders(token),
      credentials: "include", // Include cookies in the request
      body: JSON.stringify(quizData),
    });

    if (!response.ok) {
      throw new Error(`Failed to create quiz: ${response.statusText}`);
    }

    const data = await response.json();
    return data as Quiz;
  },
);

// Async thunk to update a quiz
export const updateQuiz = createAsyncThunk(
  "quiz/updateQuiz",
  async ({
    id,
    quizData,
    token,
  }: {
    id: string;
    quizData: Partial<Quiz>;
    token?: string;
  }) => {
    const response = await fetch(API_UPDATE_QUIZ.replace("{quizId}", id), {
      method: "PATCH",
      headers: getAuthHeaders(token),
      credentials: "include", // Include cookies in the request
      body: JSON.stringify(quizData),
    });

    if (!response.ok) {
      throw new Error(`Failed to update quiz: ${response.statusText}`);
    }

    const data = await response.json();
    return data as Quiz;
  },
);

// Async thunk to delete a quiz
export const deleteQuiz = createAsyncThunk(
  "quiz/deleteQuiz",
  async ({ quizId, token }: { quizId: string; token?: string }) => {
    const response = await fetch(API_DELETE_QUIZ.replace("{quizId}", quizId), {
      method: "DELETE",
      headers: getAuthHeaders(token),
      credentials: "include", // Include cookies in the request
    });

    if (!response.ok) {
      throw new Error(`Failed to delete quiz: ${response.statusText}`);
    }

    return quizId;
  },
);

// Async thunk to create a quiz with questions
export const createQuizWithQuestions = createAsyncThunk(
  "quiz/createQuizWithQuestions",
  async (
    { payload, token }: { payload: any; token?: string },
    { rejectWithValue },
  ) => {
    try {
      const response = await fetch(API_CREATE_QUIZ_WITH_QUESTIONS, {
        method: "POST",
        headers: getAuthHeaders(token),
        credentials: "include",
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        const error = await response.text();
        return rejectWithValue(error);
      }
      return await response.json();
    } catch (error: any) {
      return rejectWithValue(error.message || "Unknown error");
    }
  },
);

// Async thunk to fetch quiz questions statistics
export const fetchQuizQuestionsStats = createAsyncThunk(
  "quiz/fetchQuizQuestionsStats",
  async (
    { quizId, token }: { quizId: string; token?: string },
    { rejectWithValue },
  ) => {
    try {
      const response = await fetch(
        API_GET_QUIZ_QUESTIONS_STATS.replace("{quizId}", quizId),
        {
          method: "GET",
          headers: getAuthHeaders(token),
          credentials: "include",
        },
      );

      if (!response.ok) {
        const error = await response.text();
        return rejectWithValue(error || "Failed to fetch quiz questions stats");
      }

      const data: QuizQuestionsStatsResponse = await response.json();
      return data;
    } catch (error: any) {
      return rejectWithValue(
        error.message || "Failed to fetch quiz questions stats",
      );
    }
  },
);

// Async thunk to fetch quiz students
export const fetchQuizStudents = createAsyncThunk(
  "quiz/fetchQuizStudents",
  async (
    { quizId, token }: { quizId: string; token?: string },
    { rejectWithValue },
  ) => {
    try {
      const response = await fetch(
        API_GET_QUIZ_STUDENTS.replace("{quizId}", quizId),
        {
          method: "GET",
          headers: getAuthHeaders(token),
          credentials: "include",
        },
      );

      if (!response.ok) {
        const error = await response.text();
        return rejectWithValue(error || "Failed to fetch quiz students");
      }

      const data: QuizStudentsResponse = await response.json();
      return data;
    } catch (error: any) {
      return rejectWithValue(
        error.message || "Failed to fetch quiz students",
      );
    }
  },
);

// Async thunk to fetch latest quizzes for student
export const fetchLatestQuizzes = createAsyncThunk(
  "quiz/fetchLatestQuizzes",
  async ({ token }: { token?: string }, { rejectWithValue }) => {
    try {
      const response = await fetch(API_GET_LATEST_QUIZZES, {
        method: "GET",
        headers: getAuthHeaders(token),
        credentials: "include",
      });

      if (!response.ok) {
        const error = await response.text();
        return rejectWithValue(error || "Failed to fetch latest quizzes");
      }

      const data: LatestQuiz[] = await response.json();
      return data;
    } catch (error: any) {
      return rejectWithValue(
        error.message || "Failed to fetch latest quizzes",
      );
    }
  },
);

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<QuizFilters>) => {
      state.filters = action.payload;
    },
    clearFilters: (state) => {
      state.filters = {};
    },
    setCurrentQuiz: (state, action: PayloadAction<Quiz | null>) => {
      state.currentQuiz = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    updateQuizInList: (state, action: PayloadAction<Quiz>) => {
      const index = state.quizzes.findIndex(
        (quiz) => quiz.id === action.payload.id,
      );
      if (index !== -1) {
        state.quizzes[index] = action.payload;
      }
    },
    removeQuizFromList: (state, action: PayloadAction<string>) => {
      state.quizzes = state.quizzes.filter(
        (quiz) => quiz.id !== action.payload,
      );
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch quizzes
      .addCase(fetchQuizzes.pending, (state, action) => {
        state.fetching = true;
        const param = formatQuizFilters(action.meta.arg.filters || {});
        state.cached = param;
        state.error = null;
      })
      .addCase(fetchQuizzes.fulfilled, (state, action) => {
        state.fetching = false;
        state.quizzes = action.payload.data;
        state.pagination = {
          total: action.payload.meta.totalItems,
          page: action.payload.meta.currentPage,
          limit: action.payload.meta.itemsPerPage,
        };
      })
      .addCase(fetchQuizzes.rejected, (state, action) => {
        state.fetching = false;
        state.error = action.error.message || "Failed to fetch quizzes";
      })

      // Fetch quiz by ID
      .addCase(fetchQuizById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchQuizById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentQuiz = action.payload;
      })
      .addCase(fetchQuizById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch quiz";
      })

      // Fetch quiz overview
      .addCase(fetchQuizOverview.pending, (state) => {
        state.loadingOverview = true;
        state.error = null;
      })
      .addCase(fetchQuizOverview.fulfilled, (state, action) => {
        state.loadingOverview = false;
        state.quizOverview = action.payload;
      })
      .addCase(fetchQuizOverview.rejected, (state, action) => {
        state.loadingOverview = false;
        state.error = action.error.message || "Failed to fetch quiz overview";
      })

      // Create quiz
      .addCase(createQuiz.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createQuiz.fulfilled, (state, action) => {
        state.loading = false;
        state.quizzes.unshift(action.payload);
        state.currentQuiz = action.payload;
      })
      .addCase(createQuiz.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to create quiz";
      })

      // Update quiz
      .addCase(updateQuiz.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateQuiz.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.quizzes.findIndex(
          (quiz) => quiz.id === action.payload.id,
        );
        if (index !== -1) {
          state.quizzes[index] = action.payload;
        }
        if (state.currentQuiz?.id === action.payload.id) {
          state.currentQuiz = action.payload;
        }
      })
      .addCase(updateQuiz.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to update quiz";
      })

      // Delete quiz
      .addCase(deleteQuiz.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteQuiz.fulfilled, (state, action) => {
        state.loading = false;
        state.quizzes = state.quizzes.filter(
          (quiz) => quiz.id !== action.payload,
        );
        if (state.currentQuiz?.id === action.payload) {
          state.currentQuiz = null;
        }
      })
      .addCase(deleteQuiz.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to delete quiz";
      })

      // Fetch quiz questions stats
      .addCase(fetchQuizQuestionsStats.pending, (state) => {
        state.loadingStats = true;
        state.error = null;
      })
      .addCase(fetchQuizQuestionsStats.fulfilled, (state, action) => {
        state.loadingStats = false;
        state.quizQuestionsStats = action.payload;
      })
      .addCase(fetchQuizQuestionsStats.rejected, (state, action) => {
        state.loadingStats = false;
        state.error =
          action.error.message || "Failed to fetch quiz questions stats";
      })

      // Fetch quiz students
      .addCase(fetchQuizStudents.pending, (state) => {
        state.loadingStudents = true;
        state.error = null;
      })
      .addCase(fetchQuizStudents.fulfilled, (state, action) => {
        state.loadingStudents = false;
        state.quizStudents = action.payload;
      })
      .addCase(fetchQuizStudents.rejected, (state, action) => {
        state.loadingStudents = false;
        state.error =
          action.error.message || "Failed to fetch quiz students";
      })

      // Fetch latest quizzes
      .addCase(fetchLatestQuizzes.pending, (state) => {
        state.loadingLatest = true;
        state.error = null;
      })
      .addCase(fetchLatestQuizzes.fulfilled, (state, action) => {
        state.loadingLatest = false;
        state.latestQuizzes = action.payload;
      })
      .addCase(fetchLatestQuizzes.rejected, (state, action) => {
        state.loadingLatest = false;
        state.error =
          action.error.message || "Failed to fetch latest quizzes";
      });
  },
});

export const {
  setFilters,
  clearFilters,
  setCurrentQuiz,
  clearError,
  updateQuizInList,
  removeQuizFromList,
} = quizSlice.actions;

export const quizReducer = quizSlice.reducer;
