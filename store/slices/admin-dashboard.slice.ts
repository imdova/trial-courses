import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { API_ADMIN_GET_DASHBOARD } from "@/constants/api/adminAPIs";
import { toast } from "@/components/UI/toast";

export interface TopInstructor {
  id: string;
  name: string;
  photoUrl: string | null;
  title: string;
  averageRating: number;
  totalRatings: number;
  totalCourses: number;
}

export interface DashboardData {
  students: {
    total: number;
    yearOverYearChange: number;
  };
  newStudents: {
    newThisMonth: number;
    monthOverMonthChange: number;
  };
  courses: {
    totalActive: number;
    newThisMonth: number;
  };
  topInstructors: TopInstructor[];
}

interface AdminDashboardState {
  data: DashboardData | null;
  loading: boolean;
  error: string | null;
}

const initialState: AdminDashboardState = {
  data: null,
  loading: false,
  error: null,
};

// ─── Fetch Dashboard Data ──────────────────────────────────────────────
export const fetchDashboardData = createAsyncThunk(
  "adminDashboard/fetchDashboardData",
  async (token: string, { rejectWithValue }) => {
    try {
      const response = await fetch(API_ADMIN_GET_DASHBOARD, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data: DashboardData = await response.json();
        return data;
      }
      return rejectWithValue("Failed to fetch dashboard data");
    } catch (err) {
      return rejectWithValue(
        err instanceof Error ? err.message : "Failed to fetch dashboard data",
      );
    }
  },
);

// ─── Slice ──────────────────────────────────────────────
const adminDashboardSlice = createSlice({
  name: "adminDashboard",
  initialState,
  reducers: {
    clearDashboardData: (state) => {
      state.data = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // ─── Fetch Dashboard Data ───
      .addCase(fetchDashboardData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchDashboardData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        toast.error("Error on Fetching Dashboard Data", {
          description: action.payload as string,
        });
      });
  },
});

// ─── Export ──────────────────────────────────────────────
export const { clearDashboardData } = adminDashboardSlice.actions;
export const adminDashboardReducer = adminDashboardSlice.reducer;

// ─── Selectors ──────────────────────────────────────────────
export const selectDashboardData = (state: RootState) => state.adminDashboard.data;
export const selectDashboardLoading = (state: RootState) => state.adminDashboard.loading;
export const selectDashboardError = (state: RootState) => state.adminDashboard.error;

