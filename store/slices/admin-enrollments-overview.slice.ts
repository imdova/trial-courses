import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { API_ADMIN_GET_ENROLLMENTS_OVERVIEW } from "@/constants/api/adminAPIs";
import { toast } from "@/components/UI/toast";

export interface EnrollmentTimeSeries {
  date: string;
  count: number;
}

export interface EnrollmentsOverviewData {
  totalEnrollments: number;
  activeEnrollments: number;
  completedEnrollments: number;
  thisMonthEnrollments: number;
  enrollmentRate: number;
  enrollmentTimeSeries: EnrollmentTimeSeries[];
}

export type PeriodFilter = "yearly" | "monthly" | "weekly";

interface AdminEnrollmentsOverviewState {
  data: EnrollmentsOverviewData | null;
  period: PeriodFilter;
  loading: boolean;
  error: string | null;
}

const initialState: AdminEnrollmentsOverviewState = {
  data: null,
  period: "monthly",
  loading: false,
  error: null,
};

// ─── Fetch Enrollments Overview ──────────────────────────────────────────────
export const fetchEnrollmentsOverview = createAsyncThunk(
  "adminEnrollmentsOverview/fetchOverview",
  async (
    {
      token,
      period = "monthly",
    }: {
      token: string;
      period?: PeriodFilter;
    },
    { rejectWithValue },
  ) => {
    try {
      const params = new URLSearchParams({
        period,
      });

      const response = await fetch(`${API_ADMIN_GET_ENROLLMENTS_OVERVIEW}?${params}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data: EnrollmentsOverviewData = await response.json();
        return { data, period };
      }
      return rejectWithValue("Failed to fetch enrollments overview");
    } catch (err) {
      return rejectWithValue(
        err instanceof Error ? err.message : "Failed to fetch enrollments overview",
      );
    }
  },
);

// ─── Slice ──────────────────────────────────────────────
const adminEnrollmentsOverviewSlice = createSlice({
  name: "adminEnrollmentsOverview",
  initialState,
  reducers: {
    clearEnrollmentsOverview: (state) => {
      state.data = null;
      state.loading = false;
      state.error = null;
    },
    setPeriod: (state, action) => {
      state.period = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // ─── Fetch Enrollments Overview ───
      .addCase(fetchEnrollmentsOverview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEnrollmentsOverview.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.period = action.payload.period;
        state.loading = false;
      })
      .addCase(fetchEnrollmentsOverview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        toast.error("Error on Fetching Enrollments Overview", {
          description: action.payload as string,
        });
      });
  },
});

// ─── Export ──────────────────────────────────────────────
export const { clearEnrollmentsOverview, setPeriod } = adminEnrollmentsOverviewSlice.actions;
export const adminEnrollmentsOverviewReducer = adminEnrollmentsOverviewSlice.reducer;

// ─── Selectors ──────────────────────────────────────────────
export const selectEnrollmentsOverview = (state: RootState) => state.adminEnrollmentsOverview.data;
export const selectEnrollmentsPeriod = (state: RootState) => state.adminEnrollmentsOverview.period;
export const selectEnrollmentsOverviewLoading = (state: RootState) => state.adminEnrollmentsOverview.loading;
export const selectEnrollmentsOverviewError = (state: RootState) => state.adminEnrollmentsOverview.error;

