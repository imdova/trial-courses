// Notes Types
export interface CourseNote {
  id: string;
  title: string;
  description: string;
  courseId?: string;
  userId?: string;
  createdAt?: string;
  updatedAt?: string;
  // Legacy compatibility
  content?: string;
  timestamp?: number;
  lastEdited?: number;
}

// API Request/Response Types
export interface CreateNoteRequest {
  title: string;
  description: string;
}

export interface UpdateNoteRequest {
  title: string;
  description: string;
}

export interface NoteResponse {
  id: string;
  title: string;
  description: string;
  courseId?: string;
  userId?: string;
  createdAt?: string;
  updatedAt?: string;
}

// State Types
export interface NotesState {
  notes: CourseNote[];
  loading: boolean;
  error: string | null;
  creating: boolean;
  updating: boolean;
  deleting: boolean;
}

// Hook Return Type
export interface UseNotesReturn {
  notes: CourseNote[];
  loading: boolean;
  error: string | null;
  creating: boolean;
  updating: boolean;
  deleting: boolean;
  getNotes: (courseId: string) => Promise<void>;
  createNote: (courseId: string, data: CreateNoteRequest) => Promise<NoteResponse | null>;
  updateNote: (courseId: string, noteId: string, data: UpdateNoteRequest) => Promise<NoteResponse | null>;
  deleteNote: (courseId: string, noteId: string) => Promise<boolean>;
  getNote: (courseId: string, noteId: string) => Promise<NoteResponse | null>;
  clearError: () => void;
  clearNotes: () => void;
}

