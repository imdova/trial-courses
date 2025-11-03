import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { API_MY_COURSES_ENROLLED, API_MY_COURSES_LATEST, API_MY_COURSES_RELATED, API_MY_COURSES_ITEMS_PROGRESS, API_MY_COURSES_ACTIVITY } from "@/constants/api/myCourses";
import { EnrolledCoursesResponse, EnrolledCoursesApiResponse, LatestCoursesResponse, LatestEnrolledCourse, RelatedCoursesResponse, CourseItemsProgress } from "@/types/enrolledCourses";
import { getAuthHeaders } from "@/util/getAuthHeader";

// Activity API type
type StudentActivityStats = {
  id: string;
  name: string;
  avatar: string;
  phone: string;
  email: string;
  address: string;
  coursesInProgress: number;
  coursesCompleted: number;
  certificatesEarned: number;
  communitySupport: number;
};

interface EnrolledCoursesState {
  courses: EnrolledCoursesResponse;
  latestCourses: LatestCoursesResponse;
  relatedCourses: RelatedCoursesResponse;
  courseItemsProgress: CourseItemsProgress | null;
  meta: EnrolledCoursesApiResponse["meta"] | null;
  loading: boolean;
  loadingLatest: boolean;
  loadingRelated: boolean;
  loadingItemsProgress: boolean;
  error: string | null;
  activityStats: StudentActivityStats | null;
  loadingActivity: boolean;
}

const initialState: EnrolledCoursesState = {
  courses: [],
  latestCourses: [],
  relatedCourses: [],
  courseItemsProgress: null,
  meta: null,
  loading: false,
  loadingLatest: false,
  loadingRelated: false,
  loadingItemsProgress: false,
  error: null,
  activityStats: null,
  loadingActivity: false,
};

export const fetchEnrolledCourses = createAsyncThunk<EnrolledCoursesApiResponse, { token: string }>(
  "enrolledCourses/fetchEnrolledCourses",
  async ({ token }) => {
    const response = await fetch(API_MY_COURSES_ENROLLED, {
      headers: getAuthHeaders(token),
    });
    if (!response.ok) {
      throw new Error("Failed to fetch enrolled courses");
    }
    const data = await response.json();
    return data;
  }
);

export const fetchLatestCourses = createAsyncThunk<LatestCoursesResponse | LatestEnrolledCourse, { token: string }>(
  "enrolledCourses/fetchLatestCourses",
  async ({ token }, { rejectWithValue }) => {
    try {
      const response = await fetch(API_MY_COURSES_LATEST, {
        headers: getAuthHeaders(token),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch latest courses");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to fetch latest courses";
      return rejectWithValue(message);
    }
  }
);

export const fetchRelatedCourses = createAsyncThunk<RelatedCoursesResponse, { token: string }>(
  "enrolledCourses/fetchRelatedCourses",
  async ({ token }, { rejectWithValue }) => {
    try {
      const response = await fetch(API_MY_COURSES_RELATED, {
        headers: getAuthHeaders(token),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch related courses");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to fetch related courses";
      return rejectWithValue(message);
    }
  }
);

export const fetchCourseItemsProgress = createAsyncThunk<CourseItemsProgress, { courseId: string; token: string }>(
  "enrolledCourses/fetchCourseItemsProgress",
  async ({ courseId, token }, { rejectWithValue }) => {
    try {
      const url = API_MY_COURSES_ITEMS_PROGRESS.replace("{courseId}", courseId);
      const response = await fetch(url, {
        headers: getAuthHeaders(token),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch course items progress");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to fetch course items progress";
      return rejectWithValue(message);
    }
  }
);

export const fetchStudentActivity = createAsyncThunk<StudentActivityStats, { token: string }>(
  "enrolledCourses/fetchStudentActivity",
  async ({ token }, { rejectWithValue }) => {
    try {
      const response = await fetch(API_MY_COURSES_ACTIVITY, {
        headers: getAuthHeaders(token),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch student activity");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to fetch student activity";
      return rejectWithValue(message);
    }
  }
);

const enrolledCoursesSlice = createSlice({
  name: "enrolledCourses",
  initialState,
  reducers: {
    clearEnrolledCourses: (state) => {
      state.courses = [];
      state.latestCourses = [];
      state.relatedCourses = [];
      state.courseItemsProgress = null;
      state.meta = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEnrolledCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEnrolledCourses.fulfilled, (state, action: PayloadAction<EnrolledCoursesApiResponse>) => {
        state.loading = false;
        state.courses = action.payload.data; // Extract data array from response
        state.meta = action.payload.meta;
      })
      .addCase(fetchEnrolledCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch enrolled courses";
      })
      
      // Latest courses
      .addCase(fetchLatestCourses.pending, (state) => {
        state.loadingLatest = true;
        state.error = null;
      })
      .addCase(fetchLatestCourses.fulfilled, (state, action: PayloadAction<LatestCoursesResponse | LatestEnrolledCourse>) => {
        state.loadingLatest = false;
        // Handle both array and single object responses
        if (Array.isArray(action.payload)) {
          state.latestCourses = action.payload;
        } else {
          // If it's a single object, wrap it in an array
          state.latestCourses = [action.payload];
        }
      })
      .addCase(fetchLatestCourses.rejected, (state, action) => {
        state.loadingLatest = false;
        state.error = action.error.message || "Failed to fetch latest courses";
      })

      // Related courses
      .addCase(fetchRelatedCourses.pending, (state) => {
        state.loadingRelated = true;
        state.error = null;
      })
      .addCase(fetchRelatedCourses.fulfilled, (state, action: PayloadAction<RelatedCoursesResponse>) => {
        state.loadingRelated = false;
        state.relatedCourses = action.payload;
      })
      .addCase(fetchRelatedCourses.rejected, (state, action) => {
        state.loadingRelated = false;
        state.error = action.error.message || "Failed to fetch related courses";
      })

      // Course items progress
      .addCase(fetchCourseItemsProgress.pending, (state) => {
        state.loadingItemsProgress = true;
        state.error = null;
      })
      .addCase(fetchCourseItemsProgress.fulfilled, (state, action: PayloadAction<CourseItemsProgress>) => {
        state.loadingItemsProgress = false;
        state.courseItemsProgress = action.payload;
      })
      .addCase(fetchCourseItemsProgress.rejected, (state, action) => {
        state.loadingItemsProgress = false;
        state.error = action.error.message || "Failed to fetch course items progress";
      })

      // Student Activity
      .addCase(fetchStudentActivity.pending, (state) => {
        state.loadingActivity = true;
      })
      .addCase(fetchStudentActivity.fulfilled, (state, action: PayloadAction<StudentActivityStats>) => {
        state.loadingActivity = false;
        state.activityStats = action.payload;
      })
      .addCase(fetchStudentActivity.rejected, (state, action) => {
        state.loadingActivity = false;
        state.error = action.error.message || "Failed to fetch student activity";
      });
  },
});

export const { clearEnrolledCourses } = enrolledCoursesSlice.actions;
export default enrolledCoursesSlice.reducer;

