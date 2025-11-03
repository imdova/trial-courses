import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { API_ADMIN_GET_QUIZZES } from "@/constants/api/adminAPIs";
import { toast } from "@/components/UI/toast";

export interface AdminQuiz {
  id: string;
  title: string;
  instructorName: string;
  instructorPhotoUrl: string;
  date: string;
  totalQuestions: number;
  isActive: boolean;
  status: "draft" | "published";
  totalEnrollments: number;
}

export interface QuizzesPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface QuizzesResponse {
  totalQuizzes: number;
  totalEnrollments: number;
  totalQuestions: number;
  quizzes: AdminQuiz[];
  pagination: QuizzesPagination;
}

interface AdminQuizzesState {
  data: AdminQuiz[];
  totalQuizzes: number;
  totalEnrollments: number;
  totalQuestions: number;
  pagination: QuizzesPagination | null;
  loading: boolean;
  fetching: boolean;
  error: string | null;
}

const initialState: AdminQuizzesState = {
  data: [],
  totalQuizzes: 0,
  totalEnrollments: 0,
  totalQuestions: 0,
  pagination: null,
  loading: false,
  fetching: false,
  error: null,
};

// ─── Fetch Quizzes ──────────────────────────────────────────────
export const fetchAdminQuizzes = createAsyncThunk(
  "adminQuizzes/fetchQuizzes",
  async (
    {
      token,
      page = 1,
      limit = 10,
    }: {
      token: string;
      page?: number;
      limit?: number;
    },
    { rejectWithValue },
  ) => {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      });

      const response = await fetch(`${API_ADMIN_GET_QUIZZES}?${params}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data: QuizzesResponse = await response.json();
        return data;
      }
      return rejectWithValue("Failed to fetch quizzes");
    } catch (err) {
      return rejectWithValue(
        err instanceof Error ? err.message : "Failed to fetch quizzes",
      );
    }
  },
);

// ─── Slice ──────────────────────────────────────────────
const adminQuizzesSlice = createSlice({
  name: "adminQuizzes",
  initialState,
  reducers: {
    clearQuizzes: (state) => {
      state.data = [];
      state.totalQuizzes = 0;
      state.totalEnrollments = 0;
      state.totalQuestions = 0;
      state.pagination = null;
      state.fetching = false;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // ─── Fetch Quizzes ───
      .addCase(fetchAdminQuizzes.pending, (state) => {
        state.fetching = true;
        state.error = null;
      })
      .addCase(fetchAdminQuizzes.fulfilled, (state, action) => {
        state.data = action.payload.quizzes;
        state.totalQuizzes = action.payload.totalQuizzes;
        state.totalEnrollments = action.payload.totalEnrollments;
        state.totalQuestions = action.payload.totalQuestions;
        state.pagination = action.payload.pagination;
        state.fetching = false;
      })
      .addCase(fetchAdminQuizzes.rejected, (state, action) => {
        state.fetching = false;
        state.error = action.payload as string;
        toast.error("Error on Fetching Quizzes", {
          description: action.payload as string,
        });
      });
  },
});

// ─── Export ──────────────────────────────────────────────
export const { clearQuizzes } = adminQuizzesSlice.actions;
export const adminQuizzesReducer = adminQuizzesSlice.reducer;

// ─── Selectors ──────────────────────────────────────────────
export const selectQuizzes = (state: RootState) => state.adminQuizzes.data;
export const selectQuizzesStats = (state: RootState) => ({
  totalQuizzes: state.adminQuizzes.totalQuizzes,
  totalEnrollments: state.adminQuizzes.totalEnrollments,
  totalQuestions: state.adminQuizzes.totalQuestions,
});
export const selectQuizzesPagination = (state: RootState) => state.adminQuizzes.pagination;
export const selectQuizzesLoading = (state: RootState) => state.adminQuizzes.fetching;
export const selectQuizzesError = (state: RootState) => state.adminQuizzes.error;

