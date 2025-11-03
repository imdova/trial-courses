import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Academy, AcademyForm } from "@/types/academy";
import { toast } from "@/components/UI/toast";
import {
  API_GET_ACADEMY_BY_ID,
  API_UPDATE_ACADEMY_BY_ID,
} from "@/constants/api/academy";

export interface AcademyFilters {
  name?: string;
  status?: string;
}

type AsyncStatus = "idle" | "fetching" | "updating" | "success" | "error";

interface AcademyState {
  data: Academy | null;
  previousData: Academy | null;
  status: AsyncStatus;
  error: string | null;
}

const initialState: AcademyState = {
  data: null,
  previousData: null,
  status: "idle",
  error: null,
};

// ─── Fetch Academies ──────────────────────────────────────────────
export const fetchAcademy = createAsyncThunk(
  "academy/fetchAcademy",
  async ({ id, token }: { id: string; token: string }, { rejectWithValue }) => {
    try {
      const response = await fetch(API_GET_ACADEMY_BY_ID + id, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data: Academy = await response.json();
        return data;
      }
      return rejectWithValue("Failed to fetch Academies");
    } catch (err) {
      return rejectWithValue(
        err instanceof Error ? err.message : "Failed to fetch Academies",
      );
    }
  },
  {
    condition: ({ id }, { getState }) => {
      const state = getState() as RootState;
      if (state.academy.status === "fetching") return false;
      if (state.academy.data?.id === id) return false;
      return true;
    },
  },
);

// ─── Update Academy ──────────────────────────────────────────────
export const updateAcademy = createAsyncThunk(
  "academy/updateAcademy",
  async (
    {
      id,
      values,
      token,
    }: {
      id: string;
      values: Partial<AcademyForm>;
      token: string;
    },
    { rejectWithValue },
  ) => {
    try {
      const response = await fetch(API_UPDATE_ACADEMY_BY_ID + id, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(values),
      });
      if (response.ok) {
        const data: Academy = await response.json();
        return data;
      }
      const error = await response.json();
      return rejectWithValue(error.message || "Failed to update Academy");
    } catch (err) {
      return rejectWithValue(
        err instanceof Error ? err.message : "Failed to update Academy",
      );
    }
  },
);

// ─── Slice ──────────────────────────────────────────────
const academySlice = createSlice({
  name: "academy",
  initialState,
  reducers: {
    clearAcademy: (state) => {
      state.data = null;
      state.status = "idle";
      state.error = null;
    },
    clearAcademyError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // ─── Fetch Academy ───
      .addCase(fetchAcademy.pending, (state) => {
        state.status = "fetching";
        state.error = null;
      })
      .addCase(fetchAcademy.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "success";
      })
      .addCase(fetchAcademy.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload as string;
        toast.error("Error on Fetching academy", {
          description: action.payload as string,
        });
      })
      // ─── Update ───
      .addCase(updateAcademy.pending, (state, action) => {
        state.previousData = state.data;
        const values = action.meta.arg.values as unknown as Academy;
        state.data = { ...state.data, ...values };
        state.status = "updating";
        state.error = null;
      })
      .addCase(updateAcademy.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "success";
        toast.success("Academy Updated", {
          description: `You have updated ${action.payload.name}`,
        });
      })
      .addCase(updateAcademy.rejected, (state, action) => {
        if (state.previousData) state.data = state.previousData;
        state.status = "error";
        state.error = action.payload as string;
        toast.error("Error on Updating Academy", {
          description: action.payload as string,
        });
      });
  },
});

// ─── Export ──────────────────────────────────────────────
export const { clearAcademy, clearAcademyError } = academySlice.actions;
export const academyReducer = academySlice.reducer;
