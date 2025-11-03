import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { 
  CourseNote, 
  NoteResponse, 
  CreateNoteRequest, 
  UpdateNoteRequest,
  NotesState 
} from '@/types/notes';
import { NOTES_API } from '@/constants/api/notes';
import { getAuthHeaders } from '@/util/getAuthHeader';

// Initial state
const initialState: NotesState = {
  notes: [],
  loading: false,
  error: null,
  creating: false,
  updating: false,
  deleting: false,
};

// Helper function to transform API response to local format
const transformNoteResponse = (response: NoteResponse): CourseNote => ({
  ...response,
  content: response.description, // For legacy compatibility
  timestamp: response.createdAt ? new Date(response.createdAt).getTime() : Date.now(),
  lastEdited: response.updatedAt ? new Date(response.updatedAt).getTime() : undefined,
});

// Async thunks
export const fetchCourseNotes = createAsyncThunk(
  'notes/fetchNotes',
  async ({ courseId, token }: { courseId: string; token: string }, { rejectWithValue }) => {
    try {
      const response = await fetch(NOTES_API.GET_COURSE_NOTES(courseId), {
        method: 'GET',
        headers: getAuthHeaders(token),
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch notes: ${response.statusText}`);
      }

      const data: NoteResponse[] = await response.json();
      return data.map(transformNoteResponse);
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch notes');
    }
  }
);

export const createCourseNote = createAsyncThunk(
  'notes/createNote',
  async ({ courseId, data, token }: { courseId: string; data: CreateNoteRequest; token: string }, { rejectWithValue }) => {
    try {
      const response = await fetch(NOTES_API.CREATE_NOTE(courseId), {
        method: 'POST',
        headers: getAuthHeaders(token),
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Failed to create note: ${response.statusText}`);
      }

      const result: NoteResponse = await response.json();
      return transformNoteResponse(result);
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to create note');
    }
  }
);

export const updateCourseNote = createAsyncThunk(
  'notes/updateNote',
  async ({ courseId, noteId, data, token }: { courseId: string; noteId: string; data: UpdateNoteRequest; token: string }, { rejectWithValue }) => {
    try {
      const response = await fetch(NOTES_API.UPDATE_NOTE(courseId, noteId), {
        method: 'PATCH',
        headers: getAuthHeaders(token),
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Failed to update note: ${response.statusText}`);
      }

      const result: NoteResponse = await response.json();
      return { noteId, note: transformNoteResponse(result) };
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to update note');
    }
  }
);

export const deleteCourseNote = createAsyncThunk(
  'notes/deleteNote',
  async ({ courseId, noteId, token }: { courseId: string; noteId: string; token: string }, { rejectWithValue }) => {
    try {
      const response = await fetch(NOTES_API.DELETE_NOTE(courseId, noteId), {
        method: 'DELETE',
        headers: getAuthHeaders(token),
      });

      if (!response.ok) {
        throw new Error(`Failed to delete note: ${response.statusText}`);
      }

      return noteId;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to delete note');
    }
  }
);

export const getCourseNote = createAsyncThunk(
  'notes/getNote',
  async ({ courseId, noteId, token }: { courseId: string; noteId: string; token: string }, { rejectWithValue }) => {
    try {
      const response = await fetch(NOTES_API.GET_NOTE(courseId, noteId), {
        method: 'GET',
        headers: getAuthHeaders(token),
      });

      if (!response.ok) {
        throw new Error(`Failed to get note: ${response.statusText}`);
      }

      const result: NoteResponse = await response.json();
      return transformNoteResponse(result);
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to get note');
    }
  }
);

// Slice
const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearNotes: (state) => {
      state.notes = [];
    },
  },
  extraReducers: (builder) => {
    // Fetch notes
    builder
      .addCase(fetchCourseNotes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCourseNotes.fulfilled, (state, action: PayloadAction<CourseNote[]>) => {
        state.loading = false;
        state.notes = action.payload;
      })
      .addCase(fetchCourseNotes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Create note
    builder
      .addCase(createCourseNote.pending, (state) => {
        state.creating = true;
        state.error = null;
      })
      .addCase(createCourseNote.fulfilled, (state, action: PayloadAction<CourseNote>) => {
        state.creating = false;
        state.notes.unshift(action.payload);
      })
      .addCase(createCourseNote.rejected, (state, action) => {
        state.creating = false;
        state.error = action.payload as string;
      });

    // Update note
    builder
      .addCase(updateCourseNote.pending, (state) => {
        state.updating = true;
        state.error = null;
      })
      .addCase(updateCourseNote.fulfilled, (state, action: PayloadAction<{ noteId: string; note: CourseNote }>) => {
        state.updating = false;
        const { noteId, note } = action.payload;
        const index = state.notes.findIndex(n => n.id === noteId);
        if (index !== -1) {
          state.notes[index] = note;
        }
      })
      .addCase(updateCourseNote.rejected, (state, action) => {
        state.updating = false;
        state.error = action.payload as string;
      });

    // Delete note
    builder
      .addCase(deleteCourseNote.pending, (state) => {
        state.deleting = true;
        state.error = null;
      })
      .addCase(deleteCourseNote.fulfilled, (state, action: PayloadAction<string>) => {
        state.deleting = false;
        const noteId = action.payload;
        state.notes = state.notes.filter(note => note.id !== noteId);
      })
      .addCase(deleteCourseNote.rejected, (state, action) => {
        state.deleting = false;
        state.error = action.payload as string;
      });

    // Get single note
    builder
      .addCase(getCourseNote.fulfilled, (state, action: PayloadAction<CourseNote>) => {
        const updatedNote = action.payload;
        const existingIndex = state.notes.findIndex(note => note.id === updatedNote.id);
        if (existingIndex !== -1) {
          state.notes[existingIndex] = updatedNote;
        }
      });
  },
});

export const { clearError, clearNotes } = notesSlice.actions;
export default notesSlice.reducer;

