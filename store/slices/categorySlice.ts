import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { API_GET_CATEGORIES } from "@/constants/api/users";
import { getAuthHeaders } from "@/util/getAuthHeader";
// Types
export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  specialities: string[];
}

interface ApiResponse {
  data: Category[];
  message?: string;
  success?: boolean;
}

interface CategoryState {
  categories: Category[];
  loading: boolean;
  error: string | null;
}

const initialState: CategoryState = {
  categories: [],
  loading: false,
  error: null,
};

// Helper function to get auth headers with token

// Async thunk for fetching categories
export const fetchCategories = createAsyncThunk(
  "category/fetchCategories",
  async ({ token }: { token?: string }, { rejectWithValue }) => {
    try {
      const response = await fetch(API_GET_CATEGORIES, {
        method: "GET",
        headers: getAuthHeaders(token),
        credentials: "include", // Include cookies in the request
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result: ApiResponse = await response.json();
      return result.data || [];
    } catch (error) {
      console.error("Error fetching categories:", error);
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to fetch categories"
      );
    }
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    clearCategories: (state) => {
      state.categories = [];
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action: PayloadAction<Category[]>) => {
        state.loading = false;
        state.categories = action.payload;
        state.error = null;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearCategories, clearError } = categorySlice.actions;
export const categoryReducer = categorySlice.reducer;
export default categorySlice.reducer;