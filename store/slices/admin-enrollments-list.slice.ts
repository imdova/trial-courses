import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { API_ADMIN_GET_ENROLLMENTS_INFORMATION } from "@/constants/api/adminAPIs";
import { toast } from "@/components/UI/toast";

export interface Enrollment {
  enrollmentId: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  studentPhotoUrl?: string;
  courseId: string;
  courseName: string;
  enrollmentDate: string;
  status: "completed" | "active" | "inactive";
  progress: number;
  instructorName: string;
  price: number;
  completedItems: number;
  totalItems: number;
}

export interface EnrollmentsPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface EnrollmentsListResponse {
  enrollments: Enrollment[];
  pagination: EnrollmentsPagination;
}

export interface EnrollmentsFilters {
  page?: number;
  limit?: number;
  search?: string;
  status?: "completed" | "active" | "inactive" | "all" | "";
  startDate?: string;
  endDate?: string;
}

interface AdminEnrollmentsListState {
  data: Enrollment[];
  pagination: EnrollmentsPagination | null;
  filters: EnrollmentsFilters;
  loading: boolean;
  error: string | null;
}

const initialState: AdminEnrollmentsListState = {
  data: [],
  pagination: null,
  filters: {
    page: 1,
    limit: 10,
    search: "",
    status: "",
    startDate: "",
    endDate: "",
  },
  loading: false,
  error: null,
};

// ─── Fetch Enrollments List ──────────────────────────────────────────────
export const fetchEnrollmentsList = createAsyncThunk(
  "adminEnrollmentsList/fetchEnrollments",
  async (
    {
      token,
      filters,
    }: {
      token: string;
      filters?: EnrollmentsFilters;
    },
    { rejectWithValue },
  ) => {
    try {
      const params = new URLSearchParams();
      
      if (filters?.page) params.append("page", filters.page.toString());
      if (filters?.limit) params.append("limit", filters.limit.toString());
      if (filters?.search) params.append("search", filters.search);
      if (filters?.status && filters.status.length > 0) params.append("status", filters.status);
      if (filters?.startDate) params.append("startDate", filters.startDate);
      if (filters?.endDate) params.append("endDate", filters.endDate);

      const response = await fetch(`${API_ADMIN_GET_ENROLLMENTS_INFORMATION}?${params}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data: EnrollmentsListResponse = await response.json();
        return data;
      }
      return rejectWithValue("Failed to fetch enrollments");
    } catch (err) {
      return rejectWithValue(
        err instanceof Error ? err.message : "Failed to fetch enrollments",
      );
    }
  },
);

// ─── Slice ──────────────────────────────────────────────
const adminEnrollmentsListSlice = createSlice({
  name: "adminEnrollmentsList",
  initialState,
  reducers: {
    clearEnrollmentsList: (state) => {
      state.data = [];
      state.pagination = null;
      state.loading = false;
      state.error = null;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
    },
  },
  extraReducers: (builder) => {
    builder
      // ─── Fetch Enrollments List ───
      .addCase(fetchEnrollmentsList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEnrollmentsList.fulfilled, (state, action) => {
        state.data = action.payload.enrollments;
        state.pagination = action.payload.pagination;
        state.loading = false;
      })
      .addCase(fetchEnrollmentsList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        toast.error("Error on Fetching Enrollments", {
          description: action.payload as string,
        });
      });
  },
});

// ─── Export ──────────────────────────────────────────────
export const { clearEnrollmentsList, setFilters, resetFilters } = adminEnrollmentsListSlice.actions;
export const adminEnrollmentsListReducer = adminEnrollmentsListSlice.reducer;

// ─── Selectors ──────────────────────────────────────────────
export const selectEnrollmentsList = (state: RootState) => state.adminEnrollmentsList.data;
export const selectEnrollmentsListPagination = (state: RootState) => state.adminEnrollmentsList.pagination;
export const selectEnrollmentsListFilters = (state: RootState) => state.adminEnrollmentsList.filters;
export const selectEnrollmentsListLoading = (state: RootState) => state.adminEnrollmentsList.loading;
export const selectEnrollmentsListError = (state: RootState) => state.adminEnrollmentsList.error;

