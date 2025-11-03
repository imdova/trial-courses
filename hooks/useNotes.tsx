import { useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { 
  fetchCourseNotes,
  createCourseNote,
  updateCourseNote,
  deleteCourseNote,
  getCourseNote,
  clearError,
  clearNotes
} from '@/store/slices/notesSlice';
import { 
  CreateNoteRequest, 
  UpdateNoteRequest,
  UseNotesReturn 
} from '@/types/notes';

export const useNotes = (): UseNotesReturn => {
  const dispatch = useAppDispatch();
  const {
    notes,
    loading,
    error,
    creating,
    updating,
    deleting
  } = useAppSelector((state) => state.notes);

  const { data: session } = useSession();
  const token = session?.user?.accessToken;

  // Get notes for a course
  const getNotes = useCallback(async (courseId: string) => {
    await dispatch(fetchCourseNotes({ courseId, token: token || '' }));
  }, [dispatch, token]);

  // Create a new note
  const createNote = useCallback(async (courseId: string, data: CreateNoteRequest) => {
    const result = await dispatch(createCourseNote({ courseId, data, token: token || '' }));
    if (createCourseNote.fulfilled.match(result)) {
      return result.payload;
    }
    return null;
  }, [dispatch, token]);

  // Update a note
  const updateNote = useCallback(async (courseId: string, noteId: string, data: UpdateNoteRequest) => {
    const result = await dispatch(updateCourseNote({ courseId, noteId, data, token: token || '' }));
    if (updateCourseNote.fulfilled.match(result)) {
      return result.payload.note;
    }
    return null;
  }, [dispatch, token]);

  // Delete a note
  const deleteNote = useCallback(async (courseId: string, noteId: string) => {
    const result = await dispatch(deleteCourseNote({ courseId, noteId, token: token || '' }));
    return deleteCourseNote.fulfilled.match(result);
  }, [dispatch, token]);

  // Get a specific note
  const getNote = useCallback(async (courseId: string, noteId: string) => {
    const result = await dispatch(getCourseNote({ courseId, noteId, token: token || '' }));
    if (getCourseNote.fulfilled.match(result)) {
      return result.payload;
    }
    return null;
  }, [dispatch, token]);

  // Clear error
  const clearErrorHandler = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  // Clear notes
  const clearNotesHandler = useCallback(() => {
    dispatch(clearNotes());
  }, [dispatch]);

  return {
    notes,
    loading,
    error,
    creating,
    updating,
    deleting,
    getNotes,
    createNote,
    updateNote,
    deleteNote,
    getNote,
    clearError: clearErrorHandler,
    clearNotes: clearNotesHandler,
  };
};

