import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Assignment } from "@/types/courses";
import {
  API_CREATE_ASSIGNMENT,
  API_GET_ASSIGNMENTS,
  API_GET_ASSIGNMENT_BY_ID,
  API_UPDATE_ASSIGNMENT,
  API_DELETE_ASSIGNMENT,
  API_SEND_REMINDER,
  API_GET_ASSIGNMENT_STUDENTS
} from "@/constants/api/assignments";

// Assignment filter interface
export interface AssignmentFilters {
  status?: string; // "draft" | "published" | "archived"
  course?: string;
  subject?: string;
  grading?: string;
  dueDate?: string;
  createdFrom?: string;
  createdTo?: string;
  search?: string; // search by title
}

// API response interface
interface AssignmentApiResponse {
  data: Assignment[];
  meta: {
    itemsPerPage: number;
    totalItems: number;
    currentPage: number;
    totalPages: number;
    sortBy: [[string, string]];
  };
  links: {
    current: string;
  };
}

// Create assignment payload
export interface CreateAssignmentPayload {
  name: string;
  instructions: string;
  start_date: string; // ISO 8601 format
  end_date: string; // ISO 8601 format
  totalPoints: number;
  numberOfQuestions: number;
  attachment_url: string;
}

// Update assignment payload
// export interface UpdateAssignmentPayload {
//   id: string;
//   title?: string;
//   course?: string;
//   dueDate?: string;
//   points?: number;
//   questions?: number;
//   pdfInstructions?: string;
//   subject?: string;
//   status?: "draft" | "published" | "archived";
//   grading?: string;
// }
export interface UpdateAssignmentPayload {
  id: string;
  name?: string;
  start_date?: string; // ISO 8601 format
  end_date?: string; // ISO 8601 format
  instructions?: string;
  attachment_url?: string;
  totalPoints?: number;
  numberOfQuestions?: number;
}

// First, add the interface for student submission
interface StudentSubmission {
  id: string;
  studentName: string;
  submissionDate: string;
  score: number;
  status: 'submitted' | 'graded';
  timeSpent: string;
}

// Add interface for the API response
interface StudentSubmissionsResponse {
  data: StudentSubmission[];
  meta: {
    itemsPerPage: number;
    totalItems: number;
    currentPage: number;
    totalPages: number;
    sortBy: [[string, string]];
  };
}

// Add interface for the filter parameters
export interface StudentSubmissionFilters {
  startDate?: string;
  endDate?: string;
  minScore?: number;
  maxScore?: number;
  status?: 'submitted' | 'graded';
  limit?: number;
  page?: number;
}

const getAuthHeaders = (token?: string) => {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    
  };

  if (token) {
    // headers["Cookie"] = `access_token=${token}`;
    headers["Authorization"] = `Bearer ${token}`;
  }

  return headers;
};

// Async thunk to fetch assignments with filters
export const fetchAssignments = createAsyncThunk(
  "assignments/fetchAssignments",
  async ({ filters = {}, token }: { filters?: AssignmentFilters; token?: string }, { rejectWithValue }) => {
    try {
      const queryParams = new URLSearchParams();

      // Add filters to query params
      if (filters.status) queryParams.append("filter.status", filters.status);
      if (filters.course) queryParams.append("filter.course", filters.course);
      if (filters.subject) queryParams.append("filter.subject", filters.subject);
      if (filters.grading) queryParams.append("filter.grading", filters.grading);
      if (filters.dueDate) queryParams.append("filter.dueDate", filters.dueDate);
      if (filters.createdFrom) queryParams.append("filter.createdFrom", filters.createdFrom);
      if (filters.createdTo) queryParams.append("filter.createdTo", filters.createdTo);
      if (filters.search) queryParams.append("filter.title", filters.search);

      const url = queryParams.toString()
        ? `${API_GET_ASSIGNMENTS}?${queryParams.toString()}`
        : API_GET_ASSIGNMENTS;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          ...getAuthHeaders(token),
          accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: AssignmentApiResponse = await response.json();

      console.log(token, data)
      return data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to fetch assignments"
      );
    }
  }
);

// Async thunk to fetch assignment by ID
export const fetchAssignmentById = createAsyncThunk(
  "assignments/fetchAssignmentById",
  async ({ id, token }: { id: string; token?: string }, { rejectWithValue }) => {
    try {
      const response = await fetch(API_GET_ASSIGNMENT_BY_ID.replace("{id}", id), {
        method: "GET",
        headers: {
          ...getAuthHeaders(token),
          accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const assignment: Assignment = await response.json();
      return assignment;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to fetch assignment"
      );
    }
  }
);

// Async thunk to create assignment
export const createAssignment = createAsyncThunk(
  "assignments/createAssignment",
  async ({ assignmentData, token }: { assignmentData: CreateAssignmentPayload; token?: string }, { rejectWithValue }) => {
    try {
      const response = await fetch(API_CREATE_ASSIGNMENT, {
        method: "POST",
        headers: {
          ...getAuthHeaders(token),
          accept: "application/json",
        },
        body: JSON.stringify(assignmentData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const assignment: Assignment = await response.json();
      return assignment;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to create assignment"
      );
    }
  }
);

// Async thunk to update assignment
export const updateAssignment = createAsyncThunk(
  "assignments/updateAssignment",
  async ({ assignmentData, token }: { assignmentData: UpdateAssignmentPayload; token?: string }, { rejectWithValue }) => {
    try {
      const { id, ...updateData } = assignmentData;
      console.log(assignmentData, "assignmentDataassignmentData");
      const response = await fetch(API_UPDATE_ASSIGNMENT + id, {
        method: "PATCH",
        headers: {
          ...getAuthHeaders(token),
          accept: "application/json",
        },
        body: JSON.stringify(updateData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const assignment: Assignment = await response.json();
      return assignment;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to update assignment"
      );
    }
  }
);

// Async thunk to delete assignment
export const deleteAssignment = createAsyncThunk(
  "assignments/deleteAssignment",
  async ({ id, token }: { id: string; token?: string }, { rejectWithValue }) => {
    try {
      const response = await fetch(API_DELETE_ASSIGNMENT + id, {
        method: "DELETE",
        headers: {
          ...getAuthHeaders(token),
          accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return id;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to delete assignment"
      );
    }
  }
);

// Async thunk to send reminder
export const sendReminder = createAsyncThunk(
  "assignments/sendReminder",
  async ({ id, message, token }: { id: string; message: string; token?: string }, { rejectWithValue }) => {
    try {
      const response = await fetch(API_SEND_REMINDER.replace("{id}", id), {
        method: "POST",
        headers: {
          ...getAuthHeaders(token),
          accept: "application/json",
        },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return { id, message };
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to send reminder"
      );
    }
  }
);

// Create the thunk
export const fetchAssignmentStudents = createAsyncThunk(
  'assignments/fetchAssignmentStudents',
  async ({
    assignmentId,
    filters = {},
    token
  }: {
    assignmentId: string;
    filters?: StudentSubmissionFilters;
    token?: string;
  }, { rejectWithValue }) => {
    try {
      const queryParams = new URLSearchParams();

      // Add all possible filters
      if (filters.startDate) queryParams.append('startDate', filters.startDate);
      if (filters.endDate) queryParams.append('endDate', filters.endDate);
      if (filters.minScore) queryParams.append('minScore', filters.minScore.toString());
      if (filters.maxScore) queryParams.append('maxScore', filters.maxScore.toString());
      if (filters.status) queryParams.append('status', filters.status);
      if (filters.limit) queryParams.append('limit', filters.limit.toString());
      if (filters.page) queryParams.append('page', filters.page.toString());

      const url = `${API_GET_ASSIGNMENT_STUDENTS.replace('{assignmentId}', assignmentId)}${
        queryParams.toString() ? `?${queryParams.toString()}` : ''
      }`;

      const response = await fetch(url, {
        method: 'GET',
        headers: getAuthHeaders(token),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Failed to fetch students: ${response.statusText}`);
      }

      const data: StudentSubmissionsResponse = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch students');
    }
  }
);

// Assignment state interface
interface AssignmentState {
  assignments: Assignment[];
  currentAssignment: Assignment | null;
  loading: boolean;
  error: string | null;
  filters: AssignmentFilters;
  pagination: {
    total: number;
    page: number;
    limit: number;
  };
  studentSubmissions: StudentSubmission[];
  studentSubmissionsMeta: {
    total: number;
    page: number;
    limit: number;
  } | null;
}

const initialState: AssignmentState = {
  assignments: [],
  currentAssignment: null,
  loading: false,
  error: null,
  filters: {},
  pagination: {
    total: 0,
    page: 1,
    limit: 10,
  },
  studentSubmissions: [],
  studentSubmissionsMeta: null,
};

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<AssignmentFilters>) => {
      state.filters = action.payload;
    },
    clearFilters: (state) => {
      state.filters = {};
    },
    setCurrentAssignment: (state, action: PayloadAction<Assignment | null>) => {
      state.currentAssignment = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    updateAssignmentInList: (state, action: PayloadAction<Assignment>) => {
      const index = state.assignments.findIndex(assignment => assignment.id === action.payload.id);
      if (index !== -1) {
        state.assignments[index] = action.payload;
      }
    },
    removeAssignmentFromList: (state, action: PayloadAction<string>) => {
      state.assignments = state.assignments.filter(assignment => assignment.id !== action.payload);
    },
    setPagination: (state, action: PayloadAction<{ page?: number; limit?: number }>) => {
      state.pagination = { ...state.pagination, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch assignments
      .addCase(fetchAssignments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAssignments.fulfilled, (state, action) => {
        state.loading = false;
        state.assignments = action.payload.data;
        state.pagination = {
          total: action.payload.meta.totalItems,
          page: action.payload.meta.currentPage,
          limit: action.payload.meta.itemsPerPage,
        };
        state.error = null;
      })
      .addCase(fetchAssignments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Fetch assignment by ID
      .addCase(fetchAssignmentById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAssignmentById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentAssignment = action.payload;
        state.error = null;
      })
      .addCase(fetchAssignmentById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Create assignment
      .addCase(createAssignment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAssignment.fulfilled, (state, action) => {
        state.loading = false;
        state.assignments.unshift(action.payload);
        state.currentAssignment = action.payload;
        state.error = null;
      })
      .addCase(createAssignment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Update assignment
      .addCase(updateAssignment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAssignment.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.assignments.findIndex(assignment => assignment.id === action.payload.id);
        if (index !== -1) {
          state.assignments[index] = action.payload;
        }
        if (state.currentAssignment?.id === action.payload.id) {
          state.currentAssignment = action.payload;
        }
        state.error = null;
      })
      .addCase(updateAssignment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Delete assignment
      .addCase(deleteAssignment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAssignment.fulfilled, (state, action) => {
        state.loading = false;
        state.assignments = state.assignments.filter(assignment => assignment.id !== action.payload);
        if (state.currentAssignment?.id === action.payload) {
          state.currentAssignment = null;
        }
        state.error = null;
      })
      .addCase(deleteAssignment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Send reminder
      .addCase(sendReminder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendReminder.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(sendReminder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Fetch assignment students
      .addCase(fetchAssignmentStudents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAssignmentStudents.fulfilled, (state, action) => {
        state.loading = false;
        state.studentSubmissions = action.payload.data;
        state.studentSubmissionsMeta = {
          total: action.payload.meta.totalItems,
          page: action.payload.meta.currentPage,
          limit: action.payload.meta.itemsPerPage,
        };
        state.error = null;
      })
      .addCase(fetchAssignmentStudents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  setFilters,
  clearFilters,
  setCurrentAssignment,
  clearError,
  updateAssignmentInList,
  removeAssignmentFromList,
  setPagination,
} = assignmentsSlice.actions;

// Export async thunks

export const assignmentsReducer = assignmentsSlice.reducer;