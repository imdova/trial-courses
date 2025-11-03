import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { API_URL } from "@/constants/api";
import { StudentProfile } from "@/types/courses";
import { getAuthHeaders } from "@/util/getAuthHeader";
// Student filter interface
export interface StudentFilters {
  search?: string;
  gender?: "male" | "female" | "other";
  nationality?: string;
  maritalStatus?: "single" | "married" | "divorced" | "widowed";
  hasDrivingLicense?: boolean;
  isPublic?: boolean;
  category?: string;
  speciality?: string;
  country?: string;
  state?: string;
  city?: string;
  hasWhatsapp?: boolean;
  createdFrom?: string;
  createdTo?: string;
  page?: number;
  limit?: number;
}

// API Response interface
interface StudentsApiResponse {
  data: StudentProfile[];
  total: number;
  page: number;
  limit: number;
}

// const getAuthHeaders = (token?: string) => {
//   const headers: Record<string, string> = {
//     "Content-Type": "application/json",
//   };
  
//   // If token is provided, set it as a cookie
//   if (token) {
//     headers["Cookie"] = `access_token=${token}`;
//     headers["Authorization"] = `Bearer ${token}`;
//   }
//   console.log(token, "from student")
  
//   return headers;
// };

// Async thunk to fetch students for an instructor
export const fetchStudentsForInstructor = createAsyncThunk(
  "students/fetchStudentsForInstructor",
  async ({ 
    instructorId, 
    filters = {}, 
    token 
  }: { 
    instructorId: string; 
    filters?: StudentFilters; 
    token?: string;
  }) => {
    const queryParams = new URLSearchParams();
    
    // Add filters to query params
    if (filters.search) {
      queryParams.append("search", filters.search);
    }
    if (filters.gender) {
      queryParams.append("gender", filters.gender);
    }
    if (filters.nationality) {
      queryParams.append("nationality", filters.nationality);
    }
    if (filters.maritalStatus) {
      queryParams.append("maritalStatus", filters.maritalStatus);
    }
    if (filters.hasDrivingLicense !== undefined) {
      queryParams.append("hasDrivingLicense", filters.hasDrivingLicense.toString());
    }
    if (filters.isPublic !== undefined) {
      queryParams.append("isPublic", filters.isPublic.toString());
    }
    if (filters.category) {
      queryParams.append("category", filters.category);
    }
    if (filters.speciality) {
      queryParams.append("speciality", filters.speciality);
    }
    if (filters.country) {
      queryParams.append("country", filters.country);
    }
    if (filters.state) {
      queryParams.append("state", filters.state);
    }
    if (filters.city) {
      queryParams.append("city", filters.city);
    }
    if (filters.hasWhatsapp !== undefined) {
      queryParams.append("hasWhatsapp", filters.hasWhatsapp.toString());
    }
    if (filters.createdFrom) {
      queryParams.append("createdFrom", filters.createdFrom);
    }
    if (filters.createdTo) {
      queryParams.append("createdTo", filters.createdTo);
    }
    if (filters.page) {
      queryParams.append("page", filters.page.toString());
    }
    if (filters.limit) {
      queryParams.append("limit", filters.limit.toString());
    }

    const url = `${API_URL}/api/users/${instructorId}/students${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    
    // const headers: HeadersInit = {
    //   "Content-Type": "application/json",
    //   "Accept": "application/json",
    // };

    // if (token) {
    //   headers.Authorization = `Bearer ${token}`;
    // }

    const response = await fetch(url, {
      method: "GET",
      headers: getAuthHeaders(token),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch students: ${response.statusText}`);
    }

    const data: StudentsApiResponse = await response.json();
    return data;
  }
);

// Async thunk to fetch a single student by ID
export const fetchStudentById = createAsyncThunk(
  "students/fetchStudentById",
  async ({ studentId, token }: { studentId: string; token?: string }) => {
    // const headers: HeadersInit = {
    //   "Content-Type": "application/json",
    //   "Accept": "application/json",
    // };

    // if (token) {
    //   headers.Authorization = `Bearer ${token}`;
    // }

    const response = await fetch(`${API_URL}/api/users/${studentId}`, {
      method: "GET",
      headers: getAuthHeaders(token),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch student: ${response.statusText}`);
    }

    const data: StudentProfile = await response.json();
    return data;
  }
);

// Students state interface
interface StudentsState {
  students: StudentProfile[];
  currentStudent: StudentProfile | null;
  loading: boolean;
  error: string | null;
  filters: StudentFilters;
  pagination: {
    total: number;
    page: number;
    limit: number;
  };
}

const initialState: StudentsState = {
  students: [],
  currentStudent: null,
  loading: false,
  error: null,
  filters: {
    page: 1,
    limit: 10,
  },
  pagination: {
    total: 0,
    page: 1,
    limit: 10,
  },
};

const studentsSlice = createSlice({
  name: "students",
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<StudentFilters>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = {
        page: 1,
        limit: 10,
      };
    },
    setCurrentStudent: (state, action: PayloadAction<StudentProfile | null>) => {
      state.currentStudent = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    updateStudentInList: (state, action: PayloadAction<StudentProfile>) => {
      const index = state.students.findIndex(student => student.id === action.payload.id);
      if (index !== -1) {
        state.students[index] = action.payload;
      }
    },
    removeStudentFromList: (state, action: PayloadAction<string>) => {
      state.students = state.students.filter(student => student.id !== action.payload);
    },
    setPagination: (state, action: PayloadAction<{ page?: number; limit?: number; total?: number }>) => {
      state.pagination = { ...state.pagination, ...action.payload };
    },
    clearStudents: (state) => {
      state.students = [];
      state.currentStudent = null;
      state.pagination = {
        total: 0,
        page: 1,
        limit: 10,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch students for instructor
      .addCase(fetchStudentsForInstructor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStudentsForInstructor.fulfilled, (state, action) => {
        state.loading = false;
        state.students = action.payload.data;
        state.pagination = {
          total: action.payload.total,
          page: action.payload.page,
          limit: action.payload.limit,
        };
        state.error = null;
      })
      .addCase(fetchStudentsForInstructor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch students";
      })
      
      // Fetch student by ID
      .addCase(fetchStudentById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStudentById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentStudent = action.payload;
        
        // Update student in list if it exists
        const index = state.students.findIndex(student => student.id === action.payload.id);
        if (index !== -1) {
          state.students[index] = action.payload;
        }
        
        state.error = null;
      })
      .addCase(fetchStudentById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch student";
      });
  },
});

export const {
  setFilters,
  clearFilters,
  setCurrentStudent,
  clearError,
  updateStudentInList,
  removeStudentFromList,
  setPagination,
  clearStudents,
} = studentsSlice.actions;

export const studentsReducer = studentsSlice.reducer;
export default studentsSlice.reducer;