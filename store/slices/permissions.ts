import { API_GET_PERMISSIONS_BY_USER_TYPE } from "@/constants/api/users copy";
import { Permission } from "@/types/next-auth";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "next-auth";

interface PermissionState {
  data: Permission[];
  loading: boolean;
  error: string | null;
}

const initialState: PermissionState = {
  data: [],
  loading: false,
  error: null,
};

// Async thunk for fetching permissions
export const fetchPermissions = createAsyncThunk(
  "permissions/fetchPermissions",
  async (userType: User["type"], { rejectWithValue }) => {
    try {
      const response = await fetch(
        API_GET_PERMISSIONS_BY_USER_TYPE + userType,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            accept: "application/json",
          },
        },
      );
      if (!response.ok) return rejectWithValue("Failed to fetch permissions");
      const result: Permission[] = await response.json();
      return result || [];
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to fetch permissions",
      );
    }
  },
  {
    condition: (_, { getState }) => {
      const state = getState() as { permissions: PermissionState };
      return state.permissions.data.length === 0;
    },
  },
);

const permissionsSlice = createSlice({
  name: "permissions",
  initialState,
  reducers: {
    clearPermissions: (state) => {
      state.data = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch permissions
      .addCase(fetchPermissions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPermissions.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload || [];
        state.error = null;
      })
      .addCase(fetchPermissions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearPermissions } = permissionsSlice.actions;
export const permissionsReducer = permissionsSlice.reducer;
