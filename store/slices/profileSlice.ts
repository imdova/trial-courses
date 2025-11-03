/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { 
  API_GET_USER_BY_ID,
  API_UPDATE_USER_BY_ID
} from "@/constants/api/users";
import { toast } from "sonner";
import { getAuthHeaders } from "@/util/getAuthHeader";
// Types
interface UserProfile {
  id: string;
  userName: string;
  phone: string | null;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  avatar: string | null;
  birthDate: string | null;
  type: string;
  active: boolean;
  bio: string;
  title: string | null;
  whatsapp: string | null;
  nationality: string | null;
  maritalStatus: string | null;
  hasDrivingLicence: boolean | null;
  country: any | null;
  state: any | null;
  city: string | null;
  isPublic: boolean;
  created_at: string;
  updated_at: string;
  gender: "male" | "female" | "other" | null;
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    facebook?: string;
  };
  languages?: Array<{
    language: string;
    level: string;
  }>;
  resume?: string | null;
  about?: string;
  [key: string]: any; // For additional profile fields
}

interface ProfileState {
  profile: UserProfile | null;
  loading: boolean;
  error: string | null;
  updating: boolean;
  updateError: string | null;
}

const initialState: ProfileState = {
  profile: null,
  loading: false,
  error: null,
  updating: false,
  updateError: null,
};


// Async thunks
export const fetchProfile = createAsyncThunk(
  "profile/fetchProfile",
  async ({ userId, token }: { userId: string; userType?: string; token?: string }, { rejectWithValue }) => {
    try {
      const apiUrl = API_GET_USER_BY_ID.replace("{userId}", userId); 

      const response = await fetch(apiUrl, {
        method: "GET",
        headers: getAuthHeaders(token),
        credentials: "include", // Include cookies in the request
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch profile: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : "Failed to fetch profile");
    }
  }
);

export const updateProfile = createAsyncThunk(
  "profile/updateProfile",
  async ({ 
    userId, 
    profileData, 
    token 
  }: { 
    userId: string; 
    profileData: any; // Changed to any to handle the new API structure
    userType?: string;
    token?: string;
  }, { rejectWithValue }) => {
    try {
      const  apiUrl = API_UPDATE_USER_BY_ID.replace("{userId}", userId) + "/profile";

      const response = await fetch(apiUrl, {
        method: "PATCH",
        headers: getAuthHeaders(token),
        credentials: "include", // Include cookies in the request
        body: JSON.stringify(profileData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        toast.error("Failed to update profile");
        throw new Error(errorData.message || `Failed to update profile: ${response.statusText}`);
      }

      const data = await response.json();
      toast.success("Profile updated successfully");
      return data;
    } catch (error) {
      toast.error("Failed to update profile");
      return rejectWithValue(error instanceof Error ? error.message : "Failed to update profile");
    }
  }
);

// Slice
const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    clearProfile: (state) => {
      state.profile = null;
      state.error = null;
      state.updateError = null;
    },
    clearErrors: (state) => {
      state.error = null;
      state.updateError = null;
    },
    updateProfileField: (state, action: PayloadAction<{ field: string; value: any }>) => {
      if (state.profile) {
        state.profile[action.payload.field] = action.payload.value;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch profile cases
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
        state.error = null;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Update profile cases
      .addCase(updateProfile.pending, (state) => {
        state.updating = true;
        state.updateError = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.updating = false;
        // Update the profile with the returned data
        if (action.payload) {
          state.profile = { ...state.profile, ...action.payload };
        }
        state.updateError = null;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.updating = false;
        state.updateError = action.payload as string;
      });
  },
});

export const { clearProfile, clearErrors, updateProfileField } = profileSlice.actions;
export const profileReducer = profileSlice.reducer;
export default profileSlice.reducer;