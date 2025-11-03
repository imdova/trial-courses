import { useState, useEffect } from "react";
import { Plus, X, Save, NotepadText, Edit, Trash, Loader2 } from "lucide-react";
import OptionsDropdown from "@/components/UI/OptionsDropdown";
import { timeAgo } from "@/util/timeAgo";
import { useNotes } from "@/hooks/useNotes";
import { CourseNote } from "@/types/notes";

interface NotesSectionProps {
  courseId: string;
}

const NotesSection = ({ courseId }: NotesSectionProps) => {
    const {
      notes: apiNotes,
      loading,
      error,
      creating,
      updating,
      deleting,
      getNotes,
      createNote,
      updateNote,
      deleteNote,
    } = useNotes();
    const [isCreating, setIsCreating] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [noteTitle, setNoteTitle] = useState("");
    const [noteContent, setNoteContent] = useState("");
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [noteToDelete, setNoteToDelete] = useState<string | null>(null);
  
    // Load notes when component mounts
    useEffect(() => {
      if (courseId) {
        getNotes(courseId);
      }
    }, [courseId, getNotes]);

    const handleCreateNote = async () => {
      if (!noteTitle.trim() || !noteContent.trim()) return;
  
      const result = await createNote(courseId, {
        title: noteTitle.trim(),
        description: noteContent.trim(),
      });

      if (result) {
        setNoteTitle("");
        setNoteContent("");
        setIsCreating(false);
        // Refetch to ensure real-time sync with server
        await getNotes(courseId);
      }
    };
  
    const handleEditNote = (note: CourseNote) => {
      setEditingId(note.id);
      setNoteTitle(note.title);
      setNoteContent(note.description || note.content || "");
    };
  
    const handleUpdateNote = async () => {
      if (!noteTitle.trim() || !noteContent.trim() || !editingId) return;
  
      const result = await updateNote(courseId, editingId, {
        title: noteTitle.trim(),
        description: noteContent.trim(),
      });
  
      if (result) {
        setEditingId(null);
        setNoteTitle("");
        setNoteContent("");
        // Refetch to ensure real-time sync with server
        await getNotes(courseId);
      }
    };
  
    const handleDeleteNote = (id: string) => {
      setNoteToDelete(id);
      setDeleteModalOpen(true);
    };

    const confirmDelete = async () => {
      if (!noteToDelete) return;
      
      const success = await deleteNote(courseId, noteToDelete);
      if (success) {
        // Refetch to ensure real-time sync with server
        await getNotes(courseId);
      }
      
      setDeleteModalOpen(false);
      setNoteToDelete(null);
    };

    const cancelDelete = () => {
      setDeleteModalOpen(false);
      setNoteToDelete(null);
    };
  
    const handleCancel = () => {
      setIsCreating(false);
      setEditingId(null);
      setNoteTitle("");
      setNoteContent("");
    };
  
    return (
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        {/* Error Display */}
        {error && (
          <div className="mb-4 rounded-lg bg-red-50 border border-red-200 p-4">
            <p className="text-red-800 text-sm">{error}</p>
          </div>
        )}

        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-800">My Notes</h1>
            <p className="text-sm text-gray-600">
              Create and manage your personal course notes
            </p>
          </div>
          {!isCreating && !editingId && (
            <button
              onClick={() => setIsCreating(true)}
              disabled={loading}
              className="bg-primary flex items-center gap-2 rounded-lg px-4 py-2 text-white transition-colors hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Plus size={16} />
              New Note
            </button>
          )}
        </div>
  
        {/* Create/Edit Note Form */}
        {(isCreating || editingId) && (
          <div className="mb-6 rounded-lg border border-green-200 bg-green-50 p-4">
            <h3 className="mb-4 text-lg font-semibold">
              {editingId ? "Edit Note" : "Create New Note"}
            </h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Note title..."
                value={noteTitle}
                onChange={(e) => setNoteTitle(e.target.value)}
                disabled={creating || updating}
                className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 disabled:opacity-50"
              />
              <textarea
                placeholder="Write your note here..."
                value={noteContent}
                onChange={(e) => setNoteContent(e.target.value)}
                rows={6}
                disabled={creating || updating}
                className="w-full resize-none rounded-lg border border-gray-300 p-3 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 disabled:opacity-50"
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={handleCancel}
                  disabled={creating || updating}
                  className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-700 transition-colors hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <X size={16} />
                  Cancel
                </button>
                <button
                  onClick={editingId ? handleUpdateNote : handleCreateNote}
                  disabled={creating || updating || !noteTitle.trim() || !noteContent.trim()}
                  className="bg-primary flex items-center gap-2 rounded-lg px-4 py-2 text-white transition-colors hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {(creating || updating) && <Loader2 size={16} className="animate-spin" />}
                  {!(creating || updating) && <Save size={16} />}
                  {editingId ? "Update Note" : "Save Note"}
                </button>
              </div>
            </div>
          </div>
        )}
  
        {/* Notes List */}
        <div className="space-y-4" id="notes-list" key={courseId}>
          {/* Loading State */}
          {loading && (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            </div>
          )}

          {/* Empty State */}
          {!loading && apiNotes.length === 0 && (
            <div className="py-12 text-center">
              <NotepadText size={48} className="mx-auto mb-4 text-gray-300" />
              <p className="text-gray-500">
                No notes yet. Click &quot;New Note&quot; to create your first note.
              </p>
            </div>
          )}

          {/* Notes List */}
          {!loading && apiNotes.length > 0 && apiNotes.map((note) => (
            <div
              key={note.id}
              className="rounded-lg border border-gray-200 bg-white p-4 transition-shadow hover:shadow-md"
            >
                <div className="mb-3 flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {note.title}
                    </h3>
                    <p className="text-xs text-gray-500">
                      Created {timeAgo(note.timestamp || (note.createdAt ? new Date(note.createdAt).getTime() : Date.now()))}
                      {(note.lastEdited || (note.updatedAt && note.createdAt !== note.updatedAt)) && (
                        <span className="ml-2">
                          • Edited {timeAgo(note.lastEdited || (note.updatedAt ? new Date(note.updatedAt).getTime() : Date.now()))}
                        </span>
                      )}
                    </p>
                  </div>
                  <OptionsDropdown
                    actions={[
                      {
                        label: "Edit",
                        icon: <Edit className="h-4 w-4" />,
                        onClick: () => handleEditNote(note),
                      },
                      {
                        label: "Delete",
                        icon: <Trash className="h-4 w-4" />,
                        onClick: () => handleDeleteNote(note.id),
                        danger: true,
                      },
                    ]}
                  />
                </div>
                <p className="whitespace-pre-wrap text-gray-700">
                  {note.description || note.content}
                </p>
              </div>
            ))}
        </div>

        {/* Delete Confirmation Modal */}
        {deleteModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0000007a]">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 overflow-hidden">
              {/* Modal Header */}
              <div className="bg-red-600 px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="bg-white bg-opacity-20 rounded-full p-2">
                    <Trash className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Delete Note</h3>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6">
                <p className="text-gray-700 text-lg mb-2">
                  Are you sure you want to delete this note?
                </p>
                <p className="text-gray-500 text-sm">
                  This action cannot be undone. The note will be permanently removed.
                </p>
              </div>

              {/* Modal Footer */}
              <div className="bg-gray-50 px-6 py-4 flex justify-end gap-3">
                <button
                  onClick={cancelDelete}
                  disabled={deleting}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  disabled={deleting}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {deleting && <Loader2 className="h-4 w-4 animate-spin" />}
                  {deleting ? "Deleting..." : "Delete Note"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

export default NotesSection;