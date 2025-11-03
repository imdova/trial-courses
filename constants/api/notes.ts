// Notes API endpoints
import { API_URL } from ".";
export const NOTES_API = {
  // Get all notes for the current student in a course
  GET_COURSE_NOTES: (courseId: string) => `${API_URL}/api/courses/${courseId}/notes`,
  
  // Create a new course note
  CREATE_NOTE: (courseId: string) => `${API_URL}/api/courses/${courseId}/notes`,
  
  // Get a specific course note
  GET_NOTE: (courseId: string, noteId: string) => `${API_URL}/api/courses/${courseId}/notes/${noteId}`,
  
  // Update a note
  UPDATE_NOTE: (courseId: string, noteId: string) => `${API_URL}/api/courses/${courseId}/notes/${noteId}`,
  
  // Delete a course note
  DELETE_NOTE: (courseId: string, noteId: string) => `${API_URL}/api/courses/${courseId}/notes/${noteId}`,
} as const;

