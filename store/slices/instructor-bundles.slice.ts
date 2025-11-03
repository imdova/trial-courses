import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { CourseBundle } from "@/types/courses";
import { toQueryString } from "@/util/general";
import { toast } from "@/components/UI/toast";
import {
  API_CREATE_BUNDLE,
  API_DELETE_BUNDLE,
  API_GET_BUNDLE_BY_ID,
  API_GET_BUNDLES,
  API_UPDATE_BUNDLE,
} from "@/constants/api/bundle.api";
import { BundleFormData } from "@/app/(auth)/lms/bundle/utils/bundle.schema";
import { bundleFormToItem } from "@/app/(auth)/lms/bundle/utils/transform";

export interface BundleFilters {
  name?: string;
  category?: string;
  status?: string;
}

interface BundleState {
  data: CourseBundle[];
  bundle: CourseBundle | null;
  previousData: CourseBundle[] | null;
  fetching: boolean;
  loading: boolean;
  drafting: boolean;
  cached: string | null;
  cachedId: string | null;
  error: string | null;
}

const initialState: BundleState = {
  data: [],
  bundle: null,
  previousData: null,
  fetching: false,
  loading: false,
  drafting: false,
  cached: null,
  cachedId: null,
  error: null,
};

// ─── Fetch Courses ──────────────────────────────────────────────
export const fetchInstructorBundles = createAsyncThunk(
  "instructorBundles/fetchInstructorBundles",
  async (
    { filters, token }: { filters: BundleFilters; token: string },
    { rejectWithValue },
  ) => {
    try {
      const param = toQueryString(filters);
      const response = await fetch(API_GET_BUNDLES + param, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data: PaginatedResponse_New<CourseBundle> = await response.json();
        return data.data;
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
      const param = toQueryString(filters);
      if (state.instructorBundles.fetching) return false;
      if (state.instructorBundles.cached === param) return false;
      return true;
    },
  },
);
export const fetchBundleById = createAsyncThunk(
  "instructorBundles/fetchBundleById",
  async (
    { id, token }: { id: string; token: string },
    { rejectWithValue, getState },
  ) => {
    const state = getState() as RootState;
    const courses = state.instructorBundles.data;
    const bundle = courses.find((c) => c.id === id);
    if (bundle) return bundle;
    try {
      const response = await fetch(API_GET_BUNDLE_BY_ID + id, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data: CourseBundle = await response.json();
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
      if (state.instructorBundles.fetching) return false;
      return true;
    },
  },
);

const formateBundle = (bundle: Partial<BundleFormData>) => {
  const pricings = bundle.is_free ? null : bundle.pricings;
  return { ...bundle, pricings };
};

// ─── Create Course ──────────────────────────────────────────────
export const createBundle = createAsyncThunk(
  "instructorBundles/createBundle",
  async (
    {
      values,
      token,
    }: {
      values: BundleFormData;
      token: string;
    },
    { rejectWithValue },
  ) => {
    try {
      const response = await fetch(API_CREATE_BUNDLE, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formateBundle(values)),
      });
      if (response.ok) {
        const data: CourseBundle = await response.json();
        return data;
      }
      const error = await response.json();
      return rejectWithValue(error.message || "Failed to create department");
    } catch (err) {
      return rejectWithValue(
        err instanceof Error ? err.message : "Failed to create department",
      );
    }
  },
);
// ─── Update Course ──────────────────────────────────────────────
export const updateBundle = createAsyncThunk(
  "instructorBundles/updateBundle",
  async (
    {
      id,
      values,
      token,
    }: {
      id: string;
      values: Partial<BundleFormData>;
      token: string;
    },
    { rejectWithValue },
  ) => {
    try {
      const response = await fetch(API_UPDATE_BUNDLE + id, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formateBundle(values)),
      });
      if (response.ok) {
        const data: CourseBundle = await response.json();
        return data;
      }
      const error = await response.json();
      return rejectWithValue(error.message || "Failed to create department");
    } catch (err) {
      return rejectWithValue(
        err instanceof Error ? err.message : "Failed to update category",
      );
    }
  },
);
// ─── Delete Course ──────────────────────────────────────────────
export const deleteBundle = createAsyncThunk(
  "instructorBundles/deleteBundle",
  async ({ id, token }: { id: string; token: string }, { rejectWithValue }) => {
    try {
      const response = await fetch(API_DELETE_BUNDLE + id, {
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
const instructorBundlesSlice = createSlice({
  name: "bundles",
  initialState,
  reducers: {
    clearBundles: (state) => {
      state.data = [];
      state.fetching = false;
      state.loading = false;
      state.cached = null;
    },
    clearBundlesError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // ─── Fetch all Courses ───
      .addCase(fetchInstructorBundles.pending, (state, action) => {
        state.fetching = true;
        state.cached = toQueryString(action.meta.arg.filters);
        state.error = null;
      })
      .addCase(fetchInstructorBundles.fulfilled, (state, action) => {
        state.data = action.payload;
        state.fetching = false;
      })
      .addCase(fetchInstructorBundles.rejected, (state, action) => {
        state.fetching = false;
        state.error = action.payload as string;
        toast.error("Error on Fetching bundles", {
          description: action.payload as string,
        });
      })
      // ─── Fetch Course by ID ───
      .addCase(fetchBundleById.pending, (state, action) => {
        state.fetching = true;
        state.cachedId = action.meta.arg.id;
        state.error = null;
      })
      .addCase(fetchBundleById.fulfilled, (state, action) => {
        const bundle = state.data.find(
          (bundle) => bundle.id === action.meta.arg.id,
        );
        if (bundle) {
          state.data = state.data.map((bundle) =>
            bundle.id === action.meta.arg.id ? action.payload : bundle,
          );
        } else {
          state.data = [...state.data, action.payload];
        }
        state.bundle = action.payload;
        state.fetching = false;
      })
      .addCase(fetchBundleById.rejected, (state, action) => {
        state.fetching = false;
        state.error = action.payload as string;
        state.bundle = null;
        toast.error("Error on Fetching bundle", {
          description: action.payload as string,
        });
      })
      // ─── Create ───
      .addCase(createBundle.pending, (state, action) => {
        const values = action.meta.arg.values;
        if (values.status === "draft") {
          state.drafting = true;
        } else {
          state.loading = true;
        }
        state.error = null;
      })
      .addCase(createBundle.fulfilled, (state, action) => {
        state.data = [...state.data, action.payload];
        state.loading = false;
        state.drafting = false;
        state.bundle = action.payload;
      })
      .addCase(createBundle.rejected, (state, action) => {
        state.loading = false;
        state.drafting = false;
        state.error = action.payload as string;
      })

      // ─── Update ─── (Optimistic)
      .addCase(updateBundle.pending, (state, action) => {
        state.previousData = state.data;
        const values = action.meta.arg.values;
        const template = bundleFormToItem(values);
        state.data = state.data.map((d) =>
          d.id === action.meta.arg.id ? { ...d, ...template } : d,
        );
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBundle.fulfilled, (state, action) => {
        state.data = state.data.map((d) =>
          d.id === action.payload.id ? action.payload : d,
        );
        if (state.bundle?.id == action.payload.id) {
          state.bundle = action.payload;
        }
        toast.success("Bundle Updated", {
          description: `You have updated ${action.payload.title}`,
        });
        state.loading = false;
      })
      .addCase(updateBundle.rejected, (state, action) => {
        if (state.previousData) state.data = state.previousData;
        toast.error("Error on Updating Bundle", {
          description: action.payload as string,
        });
        state.loading = false;
        state.error = action.payload as string;
      })
      // ─── Delete ─── (Optimistic)
      .addCase(deleteBundle.pending, (state, action) => {
        state.previousData = state.data;
        state.loading = true;
        state.data = state.data.filter((d) => d.id !== action.meta.arg.id);
        state.bundle = null;
        state.error = null;
      })
      .addCase(deleteBundle.fulfilled, (state) => {
        state.loading = false;
        toast.success("Course Deleted", {
          description: "you have deleted bundle successful.",
        });
        state.bundle = null;
        state.error = null;
      })
      .addCase(deleteBundle.rejected, (state, action) => {
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
export const { clearBundles, clearBundlesError } =
  instructorBundlesSlice.actions;
export const instructorBundlesReducer = instructorBundlesSlice.reducer;
