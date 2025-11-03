import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { API_ADMIN_GET_COURSES_OVERVIEW, API_ADMIN_GET_COURSES_WEEKLY_SALES } from "@/constants/api/adminAPIs";
import { toast } from "@/components/UI/toast";

export interface TopCourse {
  id: string;
  name: string;
  enrollments: number;
  completionRate: number;
}

export interface WeeklySale {
  courseId: string;
  courseName: string;
  totalSales: number;
}

export interface CoursesOverviewData {
  totalCourses: number;
  newCoursesThisMonth: number;
  totalEnrollments: number;
  completionRate: number;
  topCourses: TopCourse[];
}

interface AdminCoursesOverviewState {
  data: CoursesOverviewData | null;
  weeklySales: WeeklySale[];
  loading: boolean;
  loadingWeeklySales: boolean;
  error: string | null;
}

const initialState: AdminCoursesOverviewState = {
  data: null,
  weeklySales: [],
  loading: false,
  loadingWeeklySales: false,
  error: null,
};

// ─── Fetch Courses Overview ──────────────────────────────────────────────
export const fetchCoursesOverview = createAsyncThunk(
  "adminCoursesOverview/fetchOverview",
  async (token: string, { rejectWithValue }) => {
    try {
      const response = await fetch(API_ADMIN_GET_COURSES_OVERVIEW, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data: CoursesOverviewData = await response.json();
        return data;
      }
      return rejectWithValue("Failed to fetch courses overview");
    } catch (err) {
      return rejectWithValue(
        err instanceof Error ? err.message : "Failed to fetch courses overview",
      );
    }
  },
);

// ─── Fetch Weekly Sales ──────────────────────────────────────────────
export const fetchWeeklySales = createAsyncThunk(
  "adminCoursesOverview/fetchWeeklySales",
  async (token: string, { rejectWithValue }) => {
    try {
      const response = await fetch(API_ADMIN_GET_COURSES_WEEKLY_SALES, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data: WeeklySale[] = await response.json();
        return data;
      }
      return rejectWithValue("Failed to fetch weekly sales");
    } catch (err) {
      return rejectWithValue(
        err instanceof Error ? err.message : "Failed to fetch weekly sales",
      );
    }
  },
);

// ─── Slice ──────────────────────────────────────────────
const adminCoursesOverviewSlice = createSlice({
  name: "adminCoursesOverview",
  initialState,
  reducers: {
    clearCoursesOverview: (state) => {
      state.data = null;
      state.weeklySales = [];
      state.loading = false;
      state.loadingWeeklySales = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // ─── Fetch Courses Overview ───
      .addCase(fetchCoursesOverview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCoursesOverview.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchCoursesOverview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        toast.error("Error on Fetching Courses Overview", {
          description: action.payload as string,
        });
      })
      
      // ─── Fetch Weekly Sales ───
      .addCase(fetchWeeklySales.pending, (state) => {
        state.loadingWeeklySales = true;
        state.error = null;
      })
      .addCase(fetchWeeklySales.fulfilled, (state, action) => {
        state.weeklySales = action.payload;
        state.loadingWeeklySales = false;
      })
      .addCase(fetchWeeklySales.rejected, (state, action) => {
        state.loadingWeeklySales = false;
        state.error = action.payload as string;
        toast.error("Error on Fetching Weekly Sales", {
          description: action.payload as string,
        });
      });
  },
});

// ─── Export ──────────────────────────────────────────────
export const { clearCoursesOverview } = adminCoursesOverviewSlice.actions;
export const adminCoursesOverviewReducer = adminCoursesOverviewSlice.reducer;

// ─── Selectors ──────────────────────────────────────────────
export const selectCoursesOverview = (state: RootState) => state.adminCoursesOverview.data;
export const selectWeeklySales = (state: RootState) => state.adminCoursesOverview.weeklySales;
export const selectCoursesOverviewLoading = (state: RootState) => state.adminCoursesOverview.loading;
export const selectWeeklySalesLoading = (state: RootState) => state.adminCoursesOverview.loadingWeeklySales;
export const selectCoursesOverviewError = (state: RootState) => state.adminCoursesOverview.error;

