import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { API_ADMIN_GET_STUDENTS_OVERVIEW, API_ADMIN_GET_STUDENTS_GEO_STATS } from "@/constants/api/adminAPIs";
import { toast } from "@/components/UI/toast";

export interface TimeSeriesData {
  date: string;
  count: number;
}

export interface StudentsOverviewData {
  totalStudents: number;
  totalCourses: number;
  totalEnrollments: number;
  timeSeries: TimeSeriesData[];
}

export interface GeoStat {
  country: {
    code: string;
    name: string;
  };
  students: number;
  percentage: number;
}

export type PeriodFilter = "yearly" | "monthly" | "weekly";

interface AdminStudentsState {
  overview: StudentsOverviewData | null;
  geoStats: GeoStat[];
  period: PeriodFilter;
  loading: boolean;
  loadingGeoStats: boolean;
  error: string | null;
}

const initialState: AdminStudentsState = {
  overview: null,
  geoStats: [],
  period: "monthly",
  loading: false,
  loadingGeoStats: false,
  error: null,
};

// ─── Fetch Students Overview ──────────────────────────────────────────────
export const fetchStudentsOverview = createAsyncThunk(
  "adminStudents/fetchOverview",
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

      const response = await fetch(`${API_ADMIN_GET_STUDENTS_OVERVIEW}?${params}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data: StudentsOverviewData = await response.json();
        return { data, period };
      }
      return rejectWithValue("Failed to fetch students overview");
    } catch (err) {
      return rejectWithValue(
        err instanceof Error ? err.message : "Failed to fetch students overview",
      );
    }
  },
);

// ─── Fetch Geo Stats ──────────────────────────────────────────────
export const fetchStudentsGeoStats = createAsyncThunk(
  "adminStudents/fetchGeoStats",
  async (token: string, { rejectWithValue }) => {
    try {
      const response = await fetch(API_ADMIN_GET_STUDENTS_GEO_STATS, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data: GeoStat[] = await response.json();
        return data;
      }
      return rejectWithValue("Failed to fetch geo stats");
    } catch (err) {
      return rejectWithValue(
        err instanceof Error ? err.message : "Failed to fetch geo stats",
      );
    }
  },
);

// ─── Slice ──────────────────────────────────────────────
const adminStudentsSlice = createSlice({
  name: "adminStudents",
  initialState,
  reducers: {
    clearStudentsOverview: (state) => {
      state.overview = null;
      state.geoStats = [];
      state.loading = false;
      state.loadingGeoStats = false;
      state.error = null;
    },
    setPeriod: (state, action) => {
      state.period = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // ─── Fetch Students Overview ───
      .addCase(fetchStudentsOverview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStudentsOverview.fulfilled, (state, action) => {
        state.overview = action.payload.data;
        state.period = action.payload.period;
        state.loading = false;
      })
      .addCase(fetchStudentsOverview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        toast.error("Error on Fetching Students Overview", {
          description: action.payload as string,
        });
      })
      
      // ─── Fetch Geo Stats ───
      .addCase(fetchStudentsGeoStats.pending, (state) => {
        state.loadingGeoStats = true;
        state.error = null;
      })
      .addCase(fetchStudentsGeoStats.fulfilled, (state, action) => {
        state.geoStats = action.payload;
        state.loadingGeoStats = false;
      })
      .addCase(fetchStudentsGeoStats.rejected, (state, action) => {
        state.loadingGeoStats = false;
        state.error = action.payload as string;
        toast.error("Error on Fetching Geo Stats", {
          description: action.payload as string,
        });
      });
  },
});

// ─── Export ──────────────────────────────────────────────
export const { clearStudentsOverview, setPeriod } = adminStudentsSlice.actions;
export const adminStudentsReducer = adminStudentsSlice.reducer;

// ─── Selectors ──────────────────────────────────────────────
export const selectStudentsOverview = (state: RootState) => state.adminStudents.overview;
export const selectStudentsGeoStats = (state: RootState) => state.adminStudents.geoStats;
export const selectStudentsPeriod = (state: RootState) => state.adminStudents.period;
export const selectStudentsLoading = (state: RootState) => state.adminStudents.loading;
export const selectGeoStatsLoading = (state: RootState) => state.adminStudents.loadingGeoStats;
export const selectStudentsError = (state: RootState) => state.adminStudents.error;

