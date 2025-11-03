import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "sonner";
import { AdminUser } from "@/types/admin";
import { RegisterCategory } from "@/constants/enums/register-category.enum";
import {
  API_GET_ADMIN_PROFILES,
  API_GET_ASSIGNED_USERS,
  API_UPDATE_ADMIN_PROFILE,
} from "@/constants/api/employees";
import { toQueryString } from "@/util/general";
import { User as NextAuthUser } from "next-auth";

interface User extends NextAuthUser {
  category: RegisterCategory;
  id: string;
}

// 🔹 Default values
const defaultValues: AdminUser = {
  id: "",
  firstName: "",
  lastName: "",
  avatar: "",
  email: "",
  phone: "",
  title: "",
  type: RegisterCategory.ADMIN_EMPLOYEE,
  departmentId: "",
  active: true,
  created_at: "",
  updated_at: "",
};

interface AdminsState {
  data: AdminUser[];
  previousData: AdminUser[] | null;
  cachedQuery: string | null;
  fetching: boolean;
  loading: boolean;
  isOpen: boolean;
  defaultValues: AdminUser;
}

const initialState: AdminsState = {
  data: [],
  previousData: null,
  cachedQuery: null,
  fetching: false,
  loading: false,
  isOpen: false,
  defaultValues,
};

interface UserFilter {
  type?: string | string[];
  q?: string;
  limit?: number;
  page?: number;
}

interface FetchAdminsParams {
  filter: UserFilter;
  user: User;
}

// ─── Fetch Admins ──────────────────────────────
export const fetchAdmins = createAsyncThunk(
  "admins/fetchAdmins",
  async ({ filter, user }: FetchAdminsParams, { rejectWithValue }) => {
    try {
      if (user.category === RegisterCategory.SUPER_ADMIN) {
        const params = toQueryString(filter);
        const res = await fetch(API_GET_ADMIN_PROFILES + params);
        // console.log("🚀 ~ res:API_GET_ADMIN_PROFILES", res)
        if (res.ok) {
          const data: PaginatedResponse<AdminUser> = await res.json();
          // console.log("🚀 ~ data:API_GET_ADMIN_PROFILES", data)
          return data.data;
        }
        return rejectWithValue("Failed to fetch admins");
      } else {
        if (!user.id) {
          return rejectWithValue("Admin ID is required");
        }
        const res = await fetch(
          API_GET_ASSIGNED_USERS.replace("{targetAdminId}", user.id) + user.id,
        );
        // console.log("🚀 ~ res:API_GET_ASSIGNED_USERS", res)
        if (res.ok) {
          const data: AdminUser[] = await res.json();
          // console.log("🚀 ~ data:API_GET_ASSIGNED_USERS", data)
          return data;
        }
        return rejectWithValue("Failed to fetch admins");
      }
    } catch (err) {
      return rejectWithValue(
        err instanceof Error ? err.message : "Failed to fetch admins",
      );
    }
  },
);

// ─── Update Admin ──────────────────────────────
export const updateAdminProfile = createAsyncThunk(
  "admins/updateAdminProfile",
  async (
    { id, updates }: { id: string; updates: Partial<AdminUser> },
    { rejectWithValue },
  ) => {
    try {
      const res = await fetch(API_UPDATE_ADMIN_PROFILE, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...updates }),
      });
      if (res.ok) {
        return (await res.json()) as AdminUser;
      }
      const error = await res.json();
      return rejectWithValue(error.message || "Failed to update admin");
    } catch (err) {
      return rejectWithValue(
        err instanceof Error ? err.message : "Failed to update admin",
      );
    }
  },
);

// ─── Toast Helper ──────────────────────────────
const showToast = (title: string, message: string) => {
  toast.error(title, {
    description: message,
    position: "bottom-right",
  });
};

// ─── Slice ─────────────────────────────────────
const adminsSlice = createSlice({
  name: "admins",
  initialState,
  reducers: {
    openDrawer: (state) => {
      state.isOpen = true;
    },
    closeDrawer: (state) => {
      state.isOpen = false;
      state.defaultValues = defaultValues;
    },
    setDefaultValues: (state, action) => {
      state.defaultValues = action.payload;
    },
    clearAdmins: (state) => {
      state.data = [];
      state.fetching = false;
      state.loading = false;
      state.cachedQuery = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // ─── Fetch ───
      .addCase(fetchAdmins.pending, (state) => {
        state.fetching = true;
      })
      .addCase(fetchAdmins.fulfilled, (state, action) => {
        state.fetching = false;
        state.data = action.payload;
        state.cachedQuery = toQueryString(action.meta.arg.filter);
      })
      .addCase(fetchAdmins.rejected, (state, action) => {
        state.fetching = false;
        showToast("Error on Fetching Admins", action.payload as string);
      })

      // ─── Update ─── (Optimistic)
      .addCase(updateAdminProfile.pending, (state, action) => {
        state.previousData = state.data;
        state.data = state.data.map((a) =>
          a.id === action.meta.arg.id
            ? { ...a, ...action.meta.arg.updates }
            : a,
        );
        state.loading = true;
      })
      .addCase(updateAdminProfile.fulfilled, (state, action) => {
        state.data = state.data.map((a) =>
          a.id === action.payload.id ? action.payload : a,
        );
        state.loading = false;
      })
      .addCase(updateAdminProfile.rejected, (state, action) => {
        if (state.previousData) state.data = state.previousData;
        showToast("Error on Updating Admin", action.payload as string);
        state.loading = false;
      });
  },
});

export const { openDrawer, closeDrawer, setDefaultValues, clearAdmins } =
  adminsSlice.actions;

export const adminsReducer = adminsSlice.reducer;
