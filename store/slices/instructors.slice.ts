import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { API_ADMIN_GET_INSTRUCTORS } from "@/constants/api/adminAPIs";
import { toast } from "@/components/UI/toast";

export interface InstructorProfile {
  id: string;
  firstName: string;
  lastName: string;
  userName: string;
  photoUrl: string;
  phoneNumber: string;
  hasWhatsapp: boolean;
  phoneNumbertForWhatsapp: string | null;
  dateOfBirth: string | null;
  gender: "male" | "female" | null;
  nationality: string;
  maritalStatus: string | null;
  hasDrivingLicense: boolean;
  resumePath: string;
  contactEmail: string;
  linkedinUrl: string | null;
  instagramUrl: string;
  twitterUrl: string;
  facebookUrl: string | null;
  youtubeUrl: string | null;
  languages: Array<{ level: string; language: string }>;
  metadata: {
    skills: any[];
    courses: any[];
    education: any[];
    activities: any[];
    experience: any[];
  };
  isPublic: boolean;
  country: { code: string; name: string };
  state: { code: string; name: string };
  city: string;
  completionPercentage: number;
  averageRating: number;
}

export interface Instructor {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  email: string;
  isEmailVerified: boolean;
  isIdentityVerified: boolean;
  isVerified: boolean;
  profile: InstructorProfile;
}

export interface InstructorsPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface InstructorsResponse {
  instructors: Instructor[];
  pagination: InstructorsPagination;
}

interface InstructorsState {
  data: Instructor[];
  pagination: InstructorsPagination | null;
  loading: boolean;
  fetching: boolean;
  error: string | null;
  searchQuery: string;
}

const initialState: InstructorsState = {
  data: [],
  pagination: null,
  loading: false,
  fetching: false,
  error: null,
  searchQuery: "",
};

// ─── Fetch Instructors ──────────────────────────────────────────────
export const fetchInstructors = createAsyncThunk(
  "instructors/fetchInstructors",
  async (
    {
      token,
      page = 1,
      limit = 10,
      search = "",
    }: {
      token: string;
      page?: number;
      limit?: number;
      search?: string;
    },
    { rejectWithValue },
  ) => {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        ...(search && { search }),
      });

      const response = await fetch(`${API_ADMIN_GET_INSTRUCTORS}?${params}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data: InstructorsResponse = await response.json();
        return data;
      }
      return rejectWithValue("Failed to fetch instructors");
    } catch (err) {
      return rejectWithValue(
        err instanceof Error ? err.message : "Failed to fetch instructors",
      );
    }
  },
);

// ─── Slice ──────────────────────────────────────────────
const instructorsSlice = createSlice({
  name: "instructors",
  initialState,
  reducers: {
    clearInstructors: (state) => {
      state.data = [];
      state.pagination = null;
      state.fetching = false;
      state.loading = false;
      state.error = null;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // ─── Fetch Instructors ───
      .addCase(fetchInstructors.pending, (state) => {
        state.fetching = true;
        state.error = null;
      })
      .addCase(fetchInstructors.fulfilled, (state, action) => {
        state.data = action.payload.instructors;
        state.pagination = action.payload.pagination;
        state.fetching = false;
      })
      .addCase(fetchInstructors.rejected, (state, action) => {
        state.fetching = false;
        state.error = action.payload as string;
        toast.error("Error on Fetching Instructors", {
          description: action.payload as string,
        });
      });
  },
});

// ─── Export ──────────────────────────────────────────────
export const { clearInstructors, setSearchQuery } = instructorsSlice.actions;
export const instructorsReducer = instructorsSlice.reducer;

// ─── Selectors ──────────────────────────────────────────────
export const selectInstructors = (state: RootState) => state.instructors.data;
export const selectInstructorsPagination = (state: RootState) => state.instructors.pagination;
export const selectInstructorsLoading = (state: RootState) => state.instructors.fetching;
export const selectInstructorsError = (state: RootState) => state.instructors.error;

