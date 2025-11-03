import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import {
  API_CREATE_COURSE,
  API_CREATE_COURSE_SECTIONS_BULK,
  API_DELETE_COURSE,
  API_GET_COURSE_BY_ID,
  API_GET_COURSE_STUDENTS,
  API_GET_COURSES,
  API_UPDATE_COURSE,
  API_UPDATE_COURSE_SECTIONS_BULK_WITH_ITEMS,
} from "@/constants/api/course"; // define in your api file
import { CourseFormType, CourseItem, CourseStudent } from "@/types/courses";
import { buildFilterQueryFromSchema } from "@/util/general";
import { toast } from "@/components/UI/toast";
import { clearCoursesDB, getCourseById, saveCourse } from "@/lib/indexedDB";
import { FilterSchema } from "@/types/forms";

export interface CourseFilters {
  isActive?: boolean;
  isCourseFree?: boolean;
  categoryName?: string;
  currencyCode?: string;
  salePriceFrom?: number;
  salePriceTo?: number;
  page?: number;
  limit?: number;
  sortBy?: string; // "created_at:DESC"
}

export const courseSchema: FilterSchema<CourseFilters> = {
  isActive: ["filter.isActive", "$eq"],
  isCourseFree: ["filter.isCourseFree", "$eq"],
  categoryName: ["filter.category.name", "$ilike"],
  currencyCode: ["filter.pricings.currencyCode", "$eq"],
  salePriceFrom: ["filter.pricings.salePrice", "$gte"],
  salePriceTo: ["filter.pricings.salePrice", "$lte"],
};

interface CourseState {
  data: CourseItem[];
  meta: PaginatedMeta;
  students: CourseStudent[];
  previousData: CourseItem[] | null;
  fetching: boolean;
  fetchingStudents: boolean;
  loading: boolean;
  drafting: boolean;
  cached: string | null;
  cachedId: string | null;
  cachedIdStudents: string | null;
  course: CourseItem | null;
  previewCourse: CourseItem | null;
  error: string | null;
}

const initialState: CourseState = {
  data: [],
  meta: {
    itemsPerPage: 0,
    totalItems: 0,
    currentPage: 0,
    totalPages: 0,
    sortBy: [],
    filter: {},
  },
  students: [],
  previousData: null,
  fetching: false,
  fetchingStudents: false,
  loading: false,
  drafting: false,
  cached: null,
  cachedId: null,
  cachedIdStudents: null,
  course: null,
  previewCourse: null,
  error: null,
};

// ─── Fetch Courses ──────────────────────────────────────────────
export const fetchCourses = createAsyncThunk(
  "instructorCourses/fetchCourses",
  async (
    { filters, token }: { filters?: CourseFilters | null; token: string },
    { rejectWithValue },
  ) => {
    try {
      const param = buildFilterQueryFromSchema(courseSchema, filters);
      const response = await fetch(API_GET_COURSES + param, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data: PaginatedResponse_New<CourseItem> = await response.json();
        return data;
      }
      return rejectWithValue("Failed to fetch courses");
    } catch (err) {
      return rejectWithValue(
        err instanceof Error ? err.message : "Failed to fetch courses",
      );
    }
  },
  {
    condition: ({ filters }, { getState }) => {
      const state = getState() as RootState;
      const param = buildFilterQueryFromSchema(courseSchema, filters);
      if (state.instructorCourses.fetching) return false;
      if (state.instructorCourses.cached === param) return false;
      return true;
    },
  },
);

export const saveCourseForPreview = createAsyncThunk(
  "course/saveCourseForPreview",
  async (course: CourseItem) => {
    await saveCourse(course);
    return course;
  },
);

// Thunk: Load course from IndexedDB
export const loadCourseFromDB = createAsyncThunk(
  "course/loadCourseFromDB",
  async (id: string) => {
    const course = await getCourseById(id);
    return course || null;
  },
);

export const fetchCourseById = createAsyncThunk(
  "instructorCourses/fetchCourseById",
  async (
    { id, token }: { id: string; token: string },
    { rejectWithValue, getState },
  ) => {
    const state = getState() as RootState;
    const courses = state.instructorCourses.data;
    const course = courses.find((c) => c.id === id);
    if (course) return course;
    try {
      const response = await fetch(API_GET_COURSE_BY_ID + id, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data: CourseItem = await response.json();
        return data;
      }
      return rejectWithValue("Failed to fetch courses");
    } catch (err) {
      return rejectWithValue(
        err instanceof Error ? err.message : "Failed to fetch courses",
      );
    }
  },
  {
    condition: (_, { getState }) => {
      const state = getState() as RootState;
      if (state.instructorCourses.fetching) return false;
      return true;
    },
  },
);
export const fetchCourseStudents = createAsyncThunk(
  "instructorCourses/fetchCourseStudents",
  async ({ id, token }: { id: string; token: string }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        API_GET_COURSE_STUDENTS.replace("{courseId}", id),
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response.ok) {
        const data: CourseStudent[] = await response.json();
        return data;
      }
      return rejectWithValue("Failed to fetch courses");
    } catch (err) {
      return rejectWithValue(
        err instanceof Error ? err.message : "Failed to fetch courses",
      );
    }
  },
  {
    condition: ({ id }, { getState }) => {
      const state = getState() as RootState;
      if (state.instructorCourses.fetchingStudents) return false;
      if (state.instructorCourses.cachedIdStudents === id) return false;
      return true;
    },
  },
);

// ─── Create Course ──────────────────────────────────────────────
export const createCourse = createAsyncThunk(
  "instructorCourses/createCourse",
  async (
    {
      values,
      token,
    }: {
      values: CourseFormType;
      token: string;
    },
    { rejectWithValue },
  ) => {
    const { sections, ...data } = values;
    try {
      const informationResponse = await fetch(API_CREATE_COURSE, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      if (!informationResponse.ok) {
        const error = await informationResponse.json();
        return rejectWithValue(error.message || "Failed to create Course");
      }
      const informationResult: CourseItem = await informationResponse.json();

      const sectionsResponse = await fetch(
        API_CREATE_COURSE_SECTIONS_BULK.replace(
          "{courseId}",
          informationResult.id,
        ),
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ sections }),
        },
      );

      if (sectionsResponse.ok) {
        return informationResult;
      }
      const error = await sectionsResponse.json();
      return rejectWithValue(
        error.message || "Failed to create course sections",
      );
    } catch (err) {
      return rejectWithValue(
        err instanceof Error ? err.message : "Failed to create category",
      );
    }
  },
);

// ─── Update Course ──────────────────────────────────────────────
export const updateCourse = createAsyncThunk(
  "instructorCourses/updateCourse",
  async (
    {
      id,
      values,
      token,
    }: {
      id: string;
      values: CourseFormType;
      token: string;
    },
    { rejectWithValue },
  ) => {
    const { sections, ...data } = values;
    try {
      const informationResponse = await fetch(API_UPDATE_COURSE + id, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      if (!informationResponse.ok) {
        const error = await informationResponse.json();
        return rejectWithValue(
          error.message || "Failed to update course information",
        );
      }
      const informationResult: CourseItem = await informationResponse.json();

      const sectionsResponse = await fetch(
        API_UPDATE_COURSE_SECTIONS_BULK_WITH_ITEMS.replace("{courseId}", id),
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ sections }),
        },
      );
      if (sectionsResponse.ok) {
        return informationResult;
      }
      const error = await sectionsResponse.json();
      return rejectWithValue(
        error.message || "Failed to update course sections",
      );
    } catch (err) {
      return rejectWithValue(
        err instanceof Error ? err.message : "Failed to update category",
      );
    }
  },
);
export const quickUpdateCourse = createAsyncThunk(
  "instructorCourses/quickUpdateCourse",
  async (
    {
      id,
      values,
      token,
    }: {
      id: string;
      values: Partial<CourseFormType>;
      template: Partial<CourseItem>;
      token: string;
    },
    { rejectWithValue },
  ) => {
    try {
      const response = await fetch(API_UPDATE_COURSE + id, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        const data: CourseItem = await response.json();
        return data;
      }
      const error = await response.json();
      return rejectWithValue(error.message || "Failed to update category");
    } catch (err) {
      return rejectWithValue(
        err instanceof Error ? err.message : "Failed to update category",
      );
    }
  },
);

// ─── Delete Course ──────────────────────────────────────────────
export const deleteCourse = createAsyncThunk(
  "instructorCourses/deleteCourse",
  async ({ id, token }: { id: string; token: string }, { rejectWithValue }) => {
    try {
      const response = await fetch(API_DELETE_COURSE + id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) return { id };
      const error = await response.json();
      return rejectWithValue(error.message || "Failed to delete category");
    } catch (err) {
      return rejectWithValue(
        err instanceof Error ? err.message : "Failed to delete category",
      );
    }
  },
);

// ─── Slice ──────────────────────────────────────────────
const instructorCoursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    clearCourses: (state) => {
      state.data = [];
      state.fetching = false;
      state.loading = false;
      state.cached = null;
      state.cachedId = null;
    },
    clearCourse: (state) => {
      state.course = null;
      state.students = [];
    },
    clearCourseError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // ─── Save Course for Preview & Load from IndexedDB ───
      .addCase(saveCourseForPreview.fulfilled, (state, action) => {
        state.previewCourse = action.payload;
      })
      .addCase(loadCourseFromDB.fulfilled, (state, action) => {
        state.previewCourse = action.payload;
      })
      // ─── Fetch all Courses ───
      .addCase(fetchCourses.pending, (state, action) => {
        state.fetching = true;
        state.cached = buildFilterQueryFromSchema(
          courseSchema,
          action.meta.arg.filters,
        );
        state.error = null;
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.meta = action.payload.meta;
        state.fetching = false;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.fetching = false;
        state.error = action.payload as string;
        toast.error("Error on Fetching Courses", {
          description: action.payload as string,
        });
      })
      // ─── Fetch Course by ID ───
      .addCase(fetchCourseById.pending, (state, action) => {
        state.fetching = true;
        state.cachedId = action.meta.arg.id;
        state.error = null;
      })
      .addCase(fetchCourseById.fulfilled, (state, action) => {
        const course = state.data.find(
          (course) => course.id === action.meta.arg.id,
        );
        if (course) {
          state.data = state.data.map((course) =>
            course.id === action.meta.arg.id ? action.payload : course,
          );
        } else {
          state.data = [...state.data, action.payload];
        }
        state.course = action.payload;
        state.fetching = false;
      })
      .addCase(fetchCourseById.rejected, (state, action) => {
        state.fetching = false;
        state.error = action.payload as string;
        state.course = null;
        toast.error("Error on Fetching Courses", {
          description: action.payload as string,
        });
      })
      // ─── Fetch Course Students ───
      .addCase(fetchCourseStudents.pending, (state, action) => {
        state.cachedIdStudents = action.meta.arg.id;
        state.fetchingStudents = true;
        state.error = null;
      })
      .addCase(fetchCourseStudents.fulfilled, (state, action) => {
        state.students = action.payload;
        state.fetchingStudents = false;
      })
      .addCase(fetchCourseStudents.rejected, (state, action) => {
        state.fetchingStudents = false;
        state.error = action.payload as string;
        toast.error("Error on Fetching Courses", {
          description: action.payload as string,
        });
      })
      // ─── Create ───
      .addCase(createCourse.pending, (state, action) => {
        const values = action.meta.arg.values;
        if (values.status === "draft") {
          state.drafting = true;
        } else {
          state.loading = true;
        }
        state.error = null;
      })
      .addCase(createCourse.fulfilled, (state, action) => {
        state.data = [...state.data, action.payload];
        // if (action.payload.status === "draft") {
        //   toast.success("Course Saved as Draft", {
        //     description: `You have saved ${action.payload.name} as a draft`,
        //   });
        // } else {
        //   toast.success("Course Published", {
        //     description: `You have published ${action.payload.name}`,
        //   });
        // }
        state.loading = false;
        state.drafting = false;
        state.course = action.payload;
        clearCoursesDB();
        state.previewCourse = null;
      })
      .addCase(createCourse.rejected, (state, action) => {
        state.loading = false;
        state.drafting = false;
        state.error = action.payload as string;
      })

      // ─── Update ───
      .addCase(updateCourse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCourse.fulfilled, (state, action) => {
        state.data = state.data.map((d) =>
          d.id === action.payload.id ? action.payload : d,
        );
        if (state.course?.id == action.payload.id) {
          state.course = action.payload;
        }
        state.loading = false;
        clearCoursesDB();
        state.previewCourse = null;
      })
      .addCase(updateCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(quickUpdateCourse.pending, (state, action) => {
        state.previousData = state.data;
        state.data = state.data.map((d) =>
          d.id === action.meta.arg.id
            ? { ...d, ...action.meta.arg.template }
            : d,
        );
        if (state.course?.id == action.meta.arg.id) {
          state.course = { ...state.course, ...action.meta.arg.template };
        }
        state.loading = true;
        state.error = null;
      })
      .addCase(quickUpdateCourse.fulfilled, (state, action) => {
        state.data = state.data.map((d) =>
          d.id === action.payload.id ? action.payload : d,
        );
        if (state.course?.id == action.payload.id) {
          state.course = action.payload;
        }
        toast.success("Course Updated", {
          description: `You have updated ${action.payload.name}`,
        });
        state.loading = false;
        clearCoursesDB();
        state.previewCourse = null;
      })
      .addCase(quickUpdateCourse.rejected, (state, action) => {
        if (state.previousData) state.data = state.previousData;
        toast.error("Error on Updating Course", {
          description: action.payload as string,
        });
        state.loading = false;
        state.error = action.payload as string;
      })
      // ─── Delete ─── (Optimistic)
      .addCase(deleteCourse.pending, (state, action) => {
        state.previousData = state.data;
        state.loading = true;
        state.data = state.data.filter((d) => d.id !== action.meta.arg.id);
        state.course = null;
        state.error = null;
      })
      .addCase(deleteCourse.fulfilled, (state) => {
        state.loading = false;
        toast.success("Course Deleted", {
          description: "you have deleted course successful.",
        });
        state.course = null;
        state.error = null;
        state.previewCourse = null;
        clearCoursesDB();
      })
      .addCase(deleteCourse.rejected, (state, action) => {
        if (state.previousData) state.data = state.previousData;
        toast.error("Error on Deleting Course", {
          description: action.payload as string,
        });
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// ─── Export ──────────────────────────────────────────────
export const { clearCourses, clearCourse, clearCourseError } =
  instructorCoursesSlice.actions;
export const instructorCoursesReducer = instructorCoursesSlice.reducer;
