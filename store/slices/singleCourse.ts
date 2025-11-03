import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { API_SINGLE_COURSE_BY_ID } from "@/constants/api/singleCourse";
import { SingleCourseResponse } from "@/types/courses";
import { getAuthHeaders } from "@/util/getAuthHeader";

interface SingleCourseState {
  course: SingleCourseResponse | null;
  loading: boolean;
  error: string | null;
}

const initialState: SingleCourseState = {
  course: null,
  loading: false,
  error: null,
};

export const fetchSingleCourse = createAsyncThunk<SingleCourseResponse, { id: string; token: string }>(
  "singleCourse/fetchSingleCourse",
  async ({ id, token }) => {
    const response = await fetch(API_SINGLE_COURSE_BY_ID.replace("{id}", id), {
      headers: getAuthHeaders(token),
    });
    if (!response.ok) {
      throw new Error("Failed to fetch course");
    }
    return response.json();
  }
);

const singleCourseSlice = createSlice({
  name: "singleCourse",
  initialState,
  reducers: {
    clearCourse: (state) => {
      state.course = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSingleCourse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSingleCourse.fulfilled, (state, action: PayloadAction<SingleCourseResponse>) => {
        state.loading = false;
        state.course = action.payload;
      })
      .addCase(fetchSingleCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch course";
      });
  },
});

export const { clearCourse } = singleCourseSlice.actions;
export default singleCourseSlice.reducer;