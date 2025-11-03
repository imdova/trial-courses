import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { CouponData, CouponFormData } from "@/types/coupon";
import { toQueryString } from "@/util/general";
import {
  API_COUPONS_CREATE,
  API_COUPONS_UPDATE_BY_ID,
  API_COUPONS_DELETE_BY_ID,
  API_COUPONS_GET_PAGINATED,
} from "@/constants/api/api-coupons";
import { toast } from "@/components/UI/toast";

export interface CouponFilters {
  code?: string;
  status?: string;
}

interface CouponState {
  data: CouponData[];
  previousData: CouponData[] | null;
  fetching: boolean;
  loading: boolean;
  cached: string | null;
  error: string | null;
}

const initialState: CouponState = {
  data: [],
  previousData: null,
  fetching: false,
  loading: false,
  cached: null,
  error: null,
};

// ─── Fetch Courses ──────────────────────────────────────────────
export const fetchInstructorCoupons = createAsyncThunk(
  "instructorCoupons/fetchInstructorCoupons",
  async (
    { filters, token }: { filters: CouponFilters; token: string },
    { rejectWithValue },
  ) => {
    try {
      const param = toQueryString(filters);
      const response = await fetch(API_COUPONS_GET_PAGINATED + param, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data: PaginatedResponse_New<CouponData> = await response.json();
        return data.data;
      }
      return rejectWithValue("Failed to fetch Coupons");
    } catch (err) {
      return rejectWithValue(
        err instanceof Error ? err.message : "Failed to fetch Coupons",
      );
    }
  },
  {
    condition: ({ filters }, { getState }) => {
      const state = getState() as RootState;
      const param = toQueryString(filters);
      if (state.instructorCoupons.fetching) return false;
      if (state.instructorCoupons.cached === param) return false;
      return true;
    },
  },
);

const formateCoupon = (coupon: Partial<CouponFormData>) => {
  return {
    ...coupon,
    minimum_purchase: coupon.minimum_purchase || undefined,
    usage_limit: coupon.usage_limit || undefined,
    start_date: coupon.start_date
      ? new Date(coupon.start_date).toISOString().split("T")[0]
      : undefined,
    end_date: coupon.end_date
      ? new Date(coupon.end_date).toISOString().split("T")[0]
      : undefined,
  };
};


// ─── Create Course ──────────────────────────────────────────────
export const createCoupon = createAsyncThunk(
  "instructorCoupons/createCoupon",
  async (
    {
      values,
      token,
    }: {
      values: CouponFormData;
      token: string;
    },
    { rejectWithValue },
  ) => {
    try {
      const response = await fetch(API_COUPONS_CREATE, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formateCoupon(values)),
      });
      if (response.ok) {
        const data: CouponData = await response.json();
        return data;
      }
      const error = await response.json();
      return rejectWithValue(error.message || "Failed to create Coupon");
    } catch (err) {
      return rejectWithValue(
        err instanceof Error ? err.message : "Failed to create Coupon",
      );
    }
  },
);
// ─── Update Course ──────────────────────────────────────────────
export const updateCoupon = createAsyncThunk(
  "instructorCoupons/updateCoupon",
  async (
    {
      id,
      values,
      token,
    }: {
      id: string;
      values: Partial<CouponFormData>;
      token: string;
    },
    { rejectWithValue },
  ) => {
    try {
      const response = await fetch(API_COUPONS_UPDATE_BY_ID + id, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formateCoupon(values)),
      });
      if (response.ok) {
        const data: CouponData = await response.json();
        return data;
      }
      const error = await response.json();
      return rejectWithValue(error.message || "Failed to update Coupon");
    } catch (err) {
      return rejectWithValue(
        err instanceof Error ? err.message : "Failed to update Coupon",
      );
    }
  },
);
// ─── Delete Course ──────────────────────────────────────────────
export const deleteCoupon = createAsyncThunk(
  "instructorCoupons/deleteCoupon",
  async ({ id, token }: { id: string; token: string }, { rejectWithValue }) => {
    try {
      const response = await fetch(API_COUPONS_DELETE_BY_ID + id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) return { id };
      const error = await response.json();
      return rejectWithValue(error.message || "Failed to delete Coupon");
    } catch (err) {
      return rejectWithValue(
        err instanceof Error ? err.message : "Failed to delete Coupon",
      );
    }
  },
);

// ─── Slice ──────────────────────────────────────────────
const instructorCouponsSlice = createSlice({
  name: "coupons",
  initialState,
  reducers: {
    clearCoupons: (state) => {
      state.data = [];
      state.fetching = false;
      state.loading = false;
      state.cached = null;
    },
    clearCouponsError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // ─── Fetch all Coupons ───
      .addCase(fetchInstructorCoupons.pending, (state, action) => {
        state.fetching = true;
        state.cached = toQueryString(action.meta.arg.filters);
        state.error = null;
      })
      .addCase(fetchInstructorCoupons.fulfilled, (state, action) => {
        state.data = action.payload;
        state.fetching = false;
      })
      .addCase(fetchInstructorCoupons.rejected, (state, action) => {
        state.fetching = false;
        state.error = action.payload as string;
        toast.error("Error on Fetching coupons", {
          description: action.payload as string,
        });
      })
      // ─── Create ───
      .addCase(createCoupon.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCoupon.fulfilled, (state, action) => {
        state.data = [...state.data, action.payload];
        state.loading = false;
        toast.success("Coupon Created", {
          description: `You have created ${action.payload.name}`,
        });
      })
      .addCase(createCoupon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        toast.error("Error on Creating coupon", {
          description: action.payload as string,
        });
      })
      // ─── Update ─── (Optimistic)
      .addCase(updateCoupon.pending, (state, action) => {
        state.previousData = state.data;
        const values = action.meta.arg.values as unknown as CouponData
        state.data = state.data.map((d) =>
          d.id === action.meta.arg.id ? { ...d, ...values } : d,
        );
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCoupon.fulfilled, (state, action) => {
        state.data = state.data.map((d) =>
          d.id === action.payload.id ? action.payload : d,
        );
        toast.success("Coupon Updated", {
          description: `You have updated ${action.payload.name}`,
        });
        state.loading = false;
      })
      .addCase(updateCoupon.rejected, (state, action) => {
        if (state.previousData) state.data = state.previousData;
        toast.error("Error on Updating Coupon", {
          description: action.payload as string,
        });
        state.loading = false;
        state.error = action.payload as string;
      })
      // ─── Delete ─── (Optimistic)
      .addCase(deleteCoupon.pending, (state, action) => {
        state.previousData = state.data;
        state.loading = true;
        state.data = state.data.filter((d) => d.id !== action.meta.arg.id);
        state.error = null;
      })
      .addCase(deleteCoupon.fulfilled, (state) => {
        state.loading = false;
        toast.success("Coupon Deleted", {
          description: "you have deleted coupon successful.",
        });
        state.error = null;
      })
      .addCase(deleteCoupon.rejected, (state, action) => {
        if (state.previousData) state.data = state.previousData;
        toast.error("Error on Deleting Coupon", {
          description: action.payload as string,
        });
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// ─── Export ──────────────────────────────────────────────
export const { clearCoupons, clearCouponsError } =
  instructorCouponsSlice.actions;
export const instructorCouponsReducer = instructorCouponsSlice.reducer;
