import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { toast } from "@/components/UI/toast";
import { InstructorWithdrawal } from "@/types/withdraw";

interface InstructorWithdrawalState {
  data: InstructorWithdrawal[];
  fetching: boolean;
  loading: boolean;
  cached: boolean;
}

const initialState: InstructorWithdrawalState = {
  data: [],
  fetching: false,
  loading: false,
  cached: false,
};

// --- Mock Data (Replace with your API calls) ──────────────────────────────
const withdrawals: InstructorWithdrawal[] = [
  {
    id: "W_005",
    amount: 15000.0,
    feeAmount: 300.0,
    netAmount: 14700.0,
    currency: "EGP",
    method: "paypal",
    status: "Processed",
    note: null,
    created_at: "September 1, 2025",
    updated_at: "September 2, 2025",
  },
  {
    id: "W_006",
    amount: 30000.0,
    feeAmount: 0.0,
    netAmount: 30000.0,
    currency: "EGP",
    method: "bankTransfer",
    status: "Pending",
    note: null,
    created_at: "October 15, 2025",
    updated_at: null,
  },
  {
    id: "W_007",
    amount: 5000.0,
    feeAmount: 5.0,
    netAmount: 4995.0,
    currency: "EGP",
    method: "instapay",
    status: "Rejected",
    note: "Minimum withdrawal amount is 1000 EGP for Instapay.",
    created_at: "October 20, 2025",
    updated_at: "October 21, 2025",
  },
  {
    id: "W_008",
    amount: 7500.0,
    feeAmount: 75.0,
    netAmount: 7425.0,
    currency: "EGP",
    method: "eWallet",
    status: "Processed",
    note: null,
    created_at: "August 12, 2025",
    updated_at: "August 12, 2025",
  },
  {
    id: "W_009",
    amount: 12000.0,
    feeAmount: 0.0,
    netAmount: 12000.0,
    currency: "EGP",
    method: "bankTransfer",
    status: "Failed",
    note: "Bank details provided were incorrect. Please verify and resubmit.",
    created_at: "October 28, 2025",
    updated_at: "October 29, 2025",
  },
  {
    id: "W_010",
    amount: 9000.0,
    feeAmount: 9.0,
    netAmount: 8991.0,
    currency: "EGP",
    method: "instapay",
    status: "Pending",
    note: null,
    created_at: "October 29, 2025",
    updated_at: null,
  },
];

const calculateFee = (amount: number, method: string): number => {
  switch (method) {
    case "bankTransfer":
      return 0;
    case "instapay":
      return amount * 0.001;
    case "eWallet":
      return amount * 0.01;
    case "paypal":
      return amount * 0.02;
    default:
      return 0;
  }
};

// ─── Create Instructor Withdrawal ──────────────────────────────
export const createInstructorWithdrawal = createAsyncThunk(
  "instructorWithdrawals/createInstructorWithdrawal",
  async (
    { amount, method, note }: { amount: number; method: string; note?: string },
    { rejectWithValue },
  ) => {
    try {
      const feeAmount = calculateFee(amount, method);
      const netAmount = amount - feeAmount;

      // NOTE: Replace this with your actual API call to create a withdrawal
      const API_CREATE_WITHDRAWAL = "/api/instructor/withdrawals/create";
      const response = await fetch(API_CREATE_WITHDRAWAL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify({ amount, method, note, feeAmount, netAmount }),
      });

      if (response.ok) {
        const data: InstructorWithdrawal = await response.json();
        return data;
      }

      const error = await response.json();
      return rejectWithValue(
        error.message || "Failed to create instructor withdrawal",
      );
    } catch (err) {
      return rejectWithValue(
        err instanceof Error
          ? err.message
          : "Failed to create instructor withdrawal",
      );
    }
  },
);

// ─── Fetch Instructor Withdrawals ──────────────────────────────
export const fetchInstructorWithdrawals = createAsyncThunk(
  "instructorWithdrawals/fetchInstructorWithdrawals",
  async (_, { rejectWithValue }) => {
    try {
      // NOTE: Replace the return statement below with your actual API call.
      // Example API call structure:
      /*
      // const response = await fetch(API_GET_INSTRUCTOR_WITHDRAWALS, {
      //   method: "GET",
      //   headers: {
      //     "Content-Type": "application/json",
      //     accept: "application/json",
      //   },
      // });
      // if (response.ok) {
      //   const data: PaginatedResponse<InstructorWithdrawal> =
      //     await response.json();
      //   return data.data;
      // }
      // return rejectWithValue("Failed to fetch instructor withdrawals");
      */
      return withdrawals; // Returning mock data for demonstration
    } catch (err) {
      return rejectWithValue(
        err instanceof Error
          ? err.message
          : "Failed to fetch instructor withdrawals",
      );
    }
  },
  {
    // Caching logic as in your reference
    condition: (_, { getState }) => {
      const state = getState() as RootState;
      // You'll need to update the RootState type in your store to include this slice
      if (state.instructorWithdrawals.fetching) return false;
      if (state.instructorWithdrawals.cached) return false;
      return true;
    },
  },
);

// ─── Update Instructor Withdrawal (for status change, etc.) ──────────────────
// This thunk is useful if an admin or the instructor can update the withdrawal details (e.g., status)
export const updateInstructorWithdrawal = createAsyncThunk(
  "instructorWithdrawals/updateInstructorWithdrawal",
  async (
    { id, updates }: { id: string; updates: Partial<InstructorWithdrawal> },
    { rejectWithValue },
  ) => {
    try {
      // NOTE: Replace this with your actual API call to update a withdrawal
      const API_UPDATE_WITHDRAWAL = "/api/instructor/withdrawals/update";
      const response = await fetch(API_UPDATE_WITHDRAWAL, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify({ id, ...updates }),
      });

      if (response.ok) {
        const data: InstructorWithdrawal = await response.json();
        return data;
      }

      const error = await response.json();
      return rejectWithValue(
        error.message || "Failed to update instructor withdrawal",
      );
    } catch (err) {
      return rejectWithValue(
        err instanceof Error
          ? err.message
          : "Failed to update instructor withdrawal",
      );
    }
  },
);

// ─── Slice ──────────────────────────────────────────────
const instructorWithdrawalsSlice = createSlice({
  name: "instructorWithdrawals",
  initialState,
  reducers: {
    // Action to reset the state
    clearInstructorWithdrawals: (state) => {
      state.data = [];
      state.fetching = false;
      state.loading = false;
      state.cached = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // ─── Fetch ───
      .addCase(fetchInstructorWithdrawals.pending, (state) => {
        state.fetching = true;
      })
      .addCase(fetchInstructorWithdrawals.fulfilled, (state, action) => {
        state.data = action.payload;
        state.fetching = false;
        state.cached = true;
      })
      .addCase(fetchInstructorWithdrawals.rejected, (state, action) => {
        state.fetching = false;
        toast.error("Error Fetching Instructor Withdrawals", {
          description: action.payload as string,
        });
      })

      // ─── Update ───
      .addCase(updateInstructorWithdrawal.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateInstructorWithdrawal.fulfilled, (state, action) => {
        // Find the updated withdrawal and replace it in the state
        state.data = state.data.map((w) =>
          w.id === action.payload.id ? action.payload : w,
        );
        state.loading = false;
        toast.success("Withdrawal Updated Successfully");
      })
      .addCase(updateInstructorWithdrawal.rejected, (state, action) => {
        toast.error("Error Updating Withdrawal", {
          description: action.payload as string,
        });
        state.loading = false;
      });
  },
});

// ─── Export ──────────────────────────────────────────────
export const { clearInstructorWithdrawals } =
  instructorWithdrawalsSlice.actions;
export const instructorWithdrawalsReducer = instructorWithdrawalsSlice.reducer;
