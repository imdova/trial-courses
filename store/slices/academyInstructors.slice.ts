import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { AcademyInstructor, AcademyInstructorForm } from "@/types/academy";
import { toast } from "@/components/UI/toast";
import {
  API_ADD_ACADEMY_INSTRUCTOR,
  API_DELETE_ACADEMY_INSTRUCTOR,
  API_GET_ACADEMY_INSTRUCTORS,
  API_UPDATE_ACADEMY_INSTRUCTOR,
} from "@/constants/api/academy";

interface AcademyInstructorsState {
  data: AcademyInstructor[];
  previousData: AcademyInstructor[];
  fetching: boolean;
  loading: boolean;
  cached: boolean;
  error: string | null;
}

const initialState: AcademyInstructorsState = {
  data: [],
  previousData: [],
  fetching: false,
  loading: false,
  cached: false,
  error: null,
};
// ─── Fetch Academy Instructors ───────────────────────────
export const fetchAcademyInstructors = createAsyncThunk(
  "academy/fetchAcademyInstructors",
  async (
    { academyId, token }: { academyId: string; token: string },
    { rejectWithValue },
  ) => {
    try {
      const response = await fetch(
        API_GET_ACADEMY_INSTRUCTORS.replace("{academyId}", academyId),
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.ok) {
        const data: AcademyInstructor[] = await response.json();
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
    condition: (_, { getState }) => {
      const state = getState() as RootState;
      if (state.academyInstructors.fetching) return false;
      if (state.academyInstructors.data.length > 0) return false;
      return true;
    },
  },
);
interface AcademyInstructorResponse {
  message: string;
  data: AcademyInstructor;
}
// ─── Create Academy Instructor ───────────────────────────
export const createAcademyInstructor = createAsyncThunk(
  "academy/createAcademyInstructor",
  async (
    {
      academyId,
      token,
      values,
    }: {
      academyId: string;
      token: string;
      template: AcademyInstructor;
      values: AcademyInstructorForm;
    },
    { rejectWithValue },
  ) => {
    try {
      const response = await fetch(
        API_ADD_ACADEMY_INSTRUCTOR.replace("{academyId}", academyId),
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(values),
        },
      );

      if (response.ok) {
        const data: AcademyInstructorResponse = await response.json();
        return data.data;
      }
      return rejectWithValue("Failed to create Academy Instructor");
    } catch (err) {
      return rejectWithValue(
        err instanceof Error
          ? err.message
          : "Failed to create Academy Instructor",
      );
    }
  },
);
// ─── Update Academy Instructor ───────────────────────────
export const updateAcademyInstructor = createAsyncThunk(
  "academy/updateAcademyInstructor",
  async (
    {
      academyId,
      id,
      token,
      values,
    }: {
      academyId: string; // Academy id
      id: string; // Instructor id
      token: string;
      values: Partial<AcademyInstructorForm>;
    },
    { rejectWithValue },
  ) => {
    try {
      const response = await fetch(
        API_UPDATE_ACADEMY_INSTRUCTOR.replace("{academyId}", academyId) + id,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(values),
        },
      );

      if (response.ok) {
        const data: AcademyInstructor = await response.json();
        return data;
      }

      return rejectWithValue("Failed to update Academy Instructor");
    } catch (err) {
      return rejectWithValue(
        err instanceof Error
          ? err.message
          : "Failed to update Academy Instructor",
      );
    }
  },
);

// ─── Delete Academy Instructor ───────────────────────────
export const deleteAcademyInstructor = createAsyncThunk(
  "academy/deleteAcademyInstructor",
  async (
    { academyId, token, id }: { id: string; academyId: string; token: string },
    { rejectWithValue },
  ) => {
    try {
      const response = await fetch(
        API_DELETE_ACADEMY_INSTRUCTOR.replace("{academyId}", academyId) + id,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response.ok) {
        return id;
      }

      return rejectWithValue("Failed to delete Academy Instructor");
    } catch (err) {
      return rejectWithValue(
        err instanceof Error
          ? err.message
          : "Failed to delete Academy Instructor",
      );
    }
  },
);
// ─── Slice ──────────────────────────────────────────────
const academyInstructorsSlice = createSlice({
  name: "academyInstructors",
  initialState,
  reducers: {
    clearAcademyInstructors: (state) => {
      state.data = [];
      state.previousData = [];
      state.fetching = false;
      state.loading = false;
      state.cached = false;
      state.error = null;
    },
    clearAcademyInstructorsError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // ─── Fetch Academy Instructors ───
      .addCase(fetchAcademyInstructors.pending, (state) => {
        state.fetching = true;
        state.error = null;
      })
      .addCase(fetchAcademyInstructors.fulfilled, (state, action) => {
        state.data = action.payload;
        state.fetching = false;
        state.cached = true;
      })
      .addCase(fetchAcademyInstructors.rejected, (state, action) => {
        state.fetching = false;
        state.error = action.payload as string;
        toast.error("Error on Fetching academy", {
          description: action.payload as string,
        });
      })
      // ─── Create Academy Instructor ───
      .addCase(createAcademyInstructor.pending, (state, action) => {
        state.previousData = state.data;
        state.data.push(action.meta.arg.template);
        state.loading = true;
      })
      .addCase(createAcademyInstructor.fulfilled, (state, action) => {
        state.data = state.data.map((d) =>
          String(d.id).startsWith("temp") ? action.payload : d,
        );
        state.loading = false;
        toast.success("Academy Updated", {
          description: `You have created ${action.payload.name} and added to academy`,
        });
      })
      .addCase(createAcademyInstructor.rejected, (state, action) => {
        if (state.previousData) state.data = state.previousData;
        state.loading = false;
        state.error = action.payload as string;
        toast.error("Error on Creating Academy Instructor", {
          description: action.payload as string,
        });
      })
      // ─── Update Academy Instructor (Optimistic) ───
      .addCase(updateAcademyInstructor.pending, (state, action) => {
        const { id, values } = action.meta.arg;
        state.previousData = state.data;
        state.data = state.data.map((instructor) =>
          instructor.id === id ? { ...instructor, ...values } : instructor,
        );
        state.loading = true;
      })
      .addCase(updateAcademyInstructor.fulfilled, (state, action) => {
        state.data = state.data.map((instructor) =>
          instructor.id === action.payload.id ? action.payload : instructor,
        );
        state.loading = false;
        toast.success("Instructor Updated", {
          description: `${action.payload.name} has been updated successfully.`,
        });
      })
      .addCase(updateAcademyInstructor.rejected, (state, action) => {
        if (state.previousData) state.data = state.previousData;
        state.loading = false;
        state.error = action.payload as string;
        toast.error("Error on Updating Instructor", {
          description: action.payload as string,
        });
      })

      // ─── Delete Academy Instructor (Optimistic) ───
      .addCase(deleteAcademyInstructor.pending, (state, action) => {
        state.previousData = state.data;
        state.data = state.data.filter((d) => d.id !== action.meta.arg.id);
        state.loading = true;
      })
      .addCase(deleteAcademyInstructor.fulfilled, (state) => {
        state.loading = false;
        toast.success("Instructor Deleted", {
          description: "Instructor has been removed successfully.",
        });
      })
      .addCase(deleteAcademyInstructor.rejected, (state, action) => {
        if (state.previousData) state.data = state.previousData;
        state.loading = false;
        state.error = action.payload as string;
        toast.error("Error on Deleting Instructor", {
          description: action.payload as string,
        });
      });
  },
});

// ─── Export ──────────────────────────────────────────────
export const { clearAcademyInstructors, clearAcademyInstructorsError } =
  academyInstructorsSlice.actions;
export const academyInstructorsReducer = academyInstructorsSlice.reducer;
