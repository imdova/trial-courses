import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { API_ADMIN_GET_STUDENTS_LIST } from "@/constants/api/adminAPIs";
import { toast } from "@/components/UI/toast";

export interface StudentProfile {
  firstName: string;
  lastName: string;
  fullName: string;
  photoUrl: string;
  country: {
    code: string;
    name: string;
  } | null;
  state: {
    code: string;
    name: string;
  } | null;
  dateOfBirth: string;
  gender: "male" | "female" | null;
  age: number;
  category: string | null;
  speciality: string | null;
}

export interface Student {
  id: string;
  email: string;
  createdAt: string;
  profile: StudentProfile;
}

export interface StudentsPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface StudentsListResponse {
  students: Student[];
  pagination: StudentsPagination;
}

export interface StudentsFilters {
  page?: number;
  limit?: number;
  search?: string;
  minAge?: number;
  maxAge?: number;
  gender?: "male" | "female";
  category?: string;
  speciality?: string;
}

interface AdminStudentsListState {
  data: Student[];
  pagination: StudentsPagination | null;
  filters: StudentsFilters;
  loading: boolean;
  error: string | null;
}

const initialState: AdminStudentsListState = {
  data: [],
  pagination: null,
  filters: {
    page: 1,
    limit: 10,
    search: "",
    minAge: undefined,
    maxAge: undefined,
    gender: undefined,
    category: "",
    speciality: "",
  },
  loading: false,
  error: null,
};

// ─── Fetch Students List ──────────────────────────────────────────────
export const fetchStudentsList = createAsyncThunk(
  "adminStudentsList/fetchStudents",
  async (
    {
      token,
      filters,
    }: {
      token: string;
      filters?: StudentsFilters;
    },
    { rejectWithValue },
  ) => {
    try {
      const params = new URLSearchParams();
      
      if (filters?.page) params.append("page", filters.page.toString());
      if (filters?.limit) params.append("limit", filters.limit.toString());
      if (filters?.search) params.append("search", filters.search);
      if (filters?.minAge) params.append("minAge", filters.minAge.toString());
      if (filters?.maxAge) params.append("maxAge", filters.maxAge.toString());
      if (filters?.gender) params.append("gender", filters.gender);
      if (filters?.category) params.append("category", filters.category);
      if (filters?.speciality) params.append("speciality", filters.speciality);

      const response = await fetch(`${API_ADMIN_GET_STUDENTS_LIST}?${params}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data: StudentsListResponse = await response.json();
        return data;
      }
      return rejectWithValue("Failed to fetch students");
    } catch (err) {
      return rejectWithValue(
        err instanceof Error ? err.message : "Failed to fetch students",
      );
    }
  },
);

// ─── Slice ──────────────────────────────────────────────
const adminStudentsListSlice = createSlice({
  name: "adminStudentsList",
  initialState,
  reducers: {
    clearStudentsList: (state) => {
      state.data = [];
      state.pagination = null;
      state.loading = false;
      state.error = null;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
    },
  },
  extraReducers: (builder) => {
    builder
      // ─── Fetch Students List ───
      .addCase(fetchStudentsList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStudentsList.fulfilled, (state, action) => {
        state.data = action.payload.students;
        state.pagination = action.payload.pagination;
        state.loading = false;
      })
      .addCase(fetchStudentsList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        toast.error("Error on Fetching Students", {
          description: action.payload as string,
        });
      });
  },
});

// ─── Export ──────────────────────────────────────────────
export const { clearStudentsList, setFilters, resetFilters } = adminStudentsListSlice.actions;
export const adminStudentsListReducer = adminStudentsListSlice.reducer;

// ─── Selectors ──────────────────────────────────────────────
export const selectStudentsList = (state: RootState) => state.adminStudentsList.data;
export const selectStudentsListPagination = (state: RootState) => state.adminStudentsList.pagination;
export const selectStudentsListFilters = (state: RootState) => state.adminStudentsList.filters;
export const selectStudentsListLoading = (state: RootState) => state.adminStudentsList.loading;
export const selectStudentsListError = (state: RootState) => state.adminStudentsList.error;

