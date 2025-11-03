import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import {
  API_CREATE_COURSE_CATEGORY,
  API_DELETE_COURSE_CATEGORY,
  API_GET_COURSE_CATEGORIES,
  API_GET_COURSE_CATEGORY_BY_ID,
  API_UPDATE_COURSE_CATEGORY,
} from "@/constants/api/course";
import { Category } from "@/types";
import { User } from "next-auth";
import { toast } from "@/components/UI/toast";
import { getLocalStorage, setLocalStorage } from "@/lib/local-storage";

const cached = getLocalStorage<Category[]>("course_categories");

interface CourseCategoryState {
  data: Category[];
  previousData: Category[] | null;
  selectedCategory: Category | null;
  fetching: boolean;
  loading: boolean;
  fetchingCategory: boolean;
  cached: boolean;
}

const initialState: CourseCategoryState = {
  data: cached || [],
  previousData: null,
  selectedCategory: null,
  fetching: false,
  loading: false,
  fetchingCategory: false,
  cached: false,
};

// ─── Fetch CoursesCategories ──────────────────────────────────────────────
export const fetchCoursesCategories = createAsyncThunk(
  "coursesCategories/fetchCoursesCategories",
  async (user: User, { rejectWithValue }) => {
    try {
      const response = await fetch(API_GET_COURSE_CATEGORIES, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          Authorization: `Bearer ${user.accessToken}`,
        },
      });

      if (response.ok) {
        const data: Category[] = await response.json();
        setLocalStorage("course_categories", data);
        return data;
      }
      return rejectWithValue("Failed to fetch categories");
    } catch (err) {
      return rejectWithValue(
        err instanceof Error ? err.message : "Failed to fetch categories",
      );
    }
  },
  {
    condition: (_, { getState }) => {
      const state = getState() as RootState;
      if (state.coursesCategories.fetching) return false;
      if (state.coursesCategories.cached) return false;
      return true;
    },
  },
);

// ─── Fetch Category By ID ──────────────────────────────────────────────
export const fetchCategoryById = createAsyncThunk(
  "coursesCategories/fetchCategoryById",
  async ({ id, user }: { id: string; user: User }, { rejectWithValue }) => {
    try {
      const response = await fetch(API_GET_COURSE_CATEGORY_BY_ID + id, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          Authorization: `Bearer ${user.accessToken}`,
        },
      });

      if (response.ok) {
        const data: Category = await response.json();
        return data;
      }
      return rejectWithValue("Failed to fetch category");
    } catch (err) {
      return rejectWithValue(
        err instanceof Error ? err.message : "Failed to fetch category",
      );
    }
  },
);

// ─── Create Category ──────────────────────────────────────────────
export const createCategory = createAsyncThunk(
  "coursesCategories/createCategory",
  async (category: Partial<Category> & { user?: User }, { rejectWithValue }) => {
    const { user, ...categoryData } = category;
    try {
      const response = await fetch(API_CREATE_COURSE_CATEGORY, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          ...(user && { Authorization: `Bearer ${user.accessToken}` }),
        },
        body: JSON.stringify(categoryData),
      });

      if (response.ok) {
        const data: Category = await response.json();
        // Update localStorage cache
        const cached = localStorage.getItem("course_categories");
        if (cached) {
          const categories = JSON.parse(cached) as Category[];
          localStorage.setItem("course_categories", JSON.stringify([...categories, data]));
        }
        return data;
      }
      const error = await response.json();
      return rejectWithValue(error.message || "Failed to create category");
    } catch (err) {
      return rejectWithValue(
        err instanceof Error ? err.message : "Failed to create category",
      );
    }
  },
);

// ─── Update Category ──────────────────────────────────────────────
export const updateCategory = createAsyncThunk(
  "coursesCategories/updateCategory",
  async (
    { id, updates, user }: { id: string; updates: Partial<Category> & { parentId?: string }; user: User },
    { rejectWithValue },
  ) => {
    try {
      const response = await fetch(API_UPDATE_COURSE_CATEGORY + id, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          Authorization: `Bearer ${user.accessToken}`,
        },
        body: JSON.stringify(updates),
      });

      if (response.ok) {
        const data: Category = await response.json();
        // Update localStorage cache
        const cached = localStorage.getItem("course_categories");
        if (cached) {
          const categories = JSON.parse(cached) as Category[];
          const updated = categories.map((c) => c.id === data.id ? data : c);
          localStorage.setItem("course_categories", JSON.stringify(updated));
        }
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

// ─── Delete Category ──────────────────────────────────────────────
export const deleteCategory = createAsyncThunk(
  "coursesCategories/deleteCategory",
  async ({ id, user }: { id: string; user: User }, { rejectWithValue }) => {
    try {
      const response = await fetch(API_DELETE_COURSE_CATEGORY + id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          Authorization: `Bearer ${user.accessToken}`,
        },
      });

      if (response.ok) {
        // Update localStorage cache
        const cached = localStorage.getItem("course_categories");
        if (cached) {
          const categories = JSON.parse(cached) as Category[];
          const filtered = categories.filter((c) => c.id !== id);
          localStorage.setItem("course_categories", JSON.stringify(filtered));
        }
        return { id };
      }
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
const courseCategoriesSlice = createSlice({
  name: "coursesCategories",
  initialState,
  reducers: {
    clearCoursesCategories: (state) => {
      state.data = [];
      state.fetching = false;
      state.loading = false;
      state.cached = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // ─── Fetch ───
      .addCase(fetchCoursesCategories.pending, (state) => {
        state.fetching = true;
      })
      .addCase(fetchCoursesCategories.fulfilled, (state, action) => {
        state.data = action.payload;
        state.fetching = false;
        state.cached = true;
      })
      .addCase(fetchCoursesCategories.rejected, (state, action) => {
        state.fetching = false;
        toast.error("Error on Fetching CoursesCategories", {
          description: action.payload as string,
        });
      })

      // ─── Fetch Category By ID ───
      .addCase(fetchCategoryById.pending, (state) => {
        state.fetchingCategory = true;
        state.selectedCategory = null;
      })
      .addCase(fetchCategoryById.fulfilled, (state, action) => {
        state.selectedCategory = action.payload;
        state.fetchingCategory = false;
      })
      .addCase(fetchCategoryById.rejected, (state, action) => {
        state.fetchingCategory = false;
        toast.error("Error on Fetching Category", {
          description: action.payload as string,
        });
      })

      // ─── Create ─── (Optimistic)
      .addCase(createCategory.pending, (state, action) => {
        state.previousData = state.data;
        const tempId = "temp-" + Date.now();
        state.data.push({
          ...(action.meta.arg as Category),
          id: tempId,
        });
        state.loading = true;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.data = state.data.map((d) =>
          String(d.id).startsWith("temp") ? action.payload : d,
        );
        state.loading = false;
        toast.success("Category created successfully");
      })
      .addCase(createCategory.rejected, (state, action) => {
        if (state.previousData) state.data = state.previousData;
        toast.error("Error on Creating Category", {
          description: action.payload as string,
        });
        state.loading = false;
      })

      // ─── Update ─── (Optimistic)
      .addCase(updateCategory.pending, (state, action) => {
        state.previousData = state.data;
        state.data = state.data.map((d) =>
          d.id === action.meta.arg.id
            ? { ...d, ...action.meta.arg.updates }
            : d,
        );
        state.loading = true;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.data = state.data.map((d) =>
          d.id === action.payload.id ? action.payload : d,
        );
        state.loading = false;
        toast.success("Category updated successfully");
      })
      .addCase(updateCategory.rejected, (state, action) => {
        if (state.previousData) state.data = state.previousData;
        toast.error("Error on Updating Category", {
          description: action.payload as string,
        });
        state.loading = false;
      })

      // ─── Delete ─── (Optimistic)
      .addCase(deleteCategory.pending, (state, action) => {
        state.previousData = state.data;
        state.data = state.data.filter((d) => d.id !== action.meta.arg.id);
        state.loading = true;
      })
      .addCase(deleteCategory.fulfilled, (state) => {
        state.loading = false;
        toast.success("Category deleted successfully");
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        if (state.previousData) state.data = state.previousData;
        toast.error("Error on Deleting Category", {
          description: action.payload as string,
        });
        state.loading = false;
      });
  },
});

// ─── Export ──────────────────────────────────────────────
export const { clearCoursesCategories } = courseCategoriesSlice.actions;
export const coursesCategoriesReducer = courseCategoriesSlice.reducer;
