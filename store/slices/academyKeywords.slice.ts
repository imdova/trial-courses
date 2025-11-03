import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { AcademyKeyword } from "@/types/academy";
import { API_GET_ACADEMY_KEYWORDS } from "@/constants/api/academy";
import { getLocalStorage, setLocalStorage } from "@/lib/local-storage";
import { toast } from "@/components/UI/toast";

interface AcademyKeywordState {
  data: AcademyKeyword[];
  fetching: boolean;
}

const initialState: AcademyKeywordState = {
  data: [],
  fetching: false,
};

// ─── Fetch Academy Keywords ──────────────────────────────────────────────
export const fetchAcademyKeywords = createAsyncThunk(
  "academyKeywords/fetchAcademyKeywords",
  async (_, { rejectWithValue }) => {
    try {
      const cached = getLocalStorage<AcademyKeyword[]>("academy_keywords");
      if (cached) {
        return cached;
      }
      const response = await fetch(API_GET_ACADEMY_KEYWORDS, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
      });

      if (response.ok) {
        const data: AcademyKeyword[] = await response.json();
        setLocalStorage("academy_keywords", data);
        return data;
      }
      return rejectWithValue("Failed to fetch Academy Keywords");
    } catch (err) {
      return rejectWithValue(
        err instanceof Error ? err.message : "Failed to fetch Academy Keywords",
      );
    }
  },
  {
    condition: (_, { getState }) => {
      const state = getState() as RootState;
      if (state.academyKeywords.fetching) return false;
      if (state.academyKeywords.data.length > 0) return false;
      return true;
    },
  },
);

// ─── Slice ──────────────────────────────────────────────
const academyKeywordsSlice = createSlice({
  name: "academyKeywords",
  initialState,
  reducers: {
    clearAcademyKeywords: (state) => {
      state.data = [];
      state.fetching = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAcademyKeywords.pending, (state) => {
        state.fetching = true;
      })
      .addCase(fetchAcademyKeywords.fulfilled, (state, action) => {
        state.data = action.payload;
        state.fetching = false;
      })
      .addCase(fetchAcademyKeywords.rejected, (state, action) => {
        state.fetching = false;
        toast.error("Error on Fetching Academy Keywords", {
          description: action.payload as string,
        });
      });
  },
});

// ─── Export ──────────────────────────────────────────────
export const { clearAcademyKeywords } = academyKeywordsSlice.actions;
export const academyKeywordsReducer = academyKeywordsSlice.reducer;
