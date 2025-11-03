// components/quiz/QuizHeader.tsx
import Link from "next/link";
import { ArrowLeft, Eye, Save, Loader2 } from "lucide-react";

interface QuizHeaderProps {
  activeTab: "editor" | "questions" | "preview";
  setActiveTab: (tab: "editor" | "questions" | "preview") => void;
  handleSubmit: () => void;
  onPublish: () => void;
  onSaveChanges?: () => void;
  isLoading?: boolean;
  isEditMode?: boolean;
  hasUnsavedChanges?: boolean;
  quizStatus?: 'draft' | 'published';
}

export default function QuizHeader({
  setActiveTab,
  handleSubmit,
  onPublish,
  onSaveChanges,
  isLoading = false,
  isEditMode = false,
  hasUnsavedChanges = false,
  quizStatus,
}: QuizHeaderProps) {
  return (
    <div className="flex flex-col justify-between sm:items-center py-4 gap-4 border-b border-gray-200 sm:flex-row">
      <div className="flex gap-6 items-center">
        <Link className="p-2 border text-muted-foreground rounded-md" href={"/instructor/quizzes"}>
          <ArrowLeft size={15} />
        </Link>
        <h1 className="text-2xl font-bold text-gray-800">
          {isEditMode ? "Edit Quiz" : "Create Quiz"}
        </h1>
      </div>
      <div className="flex justify-end items-center gap-2">
        <button
          type="button"
          className="flex items-center gap-2 px-2 py-1 md:px-5 md:py-2 bg-white border rounded-md text-sm text-primary"
          onClick={() => setActiveTab("preview")}
          disabled={isLoading}
        >
          <Eye size={15} />
          Preview
        </button>
        
        {isEditMode ? (
          // Edit mode: Show Save button when there are changes, and Publish if draft
          <>
            {hasUnsavedChanges && (
              <button
                type="button"
                onClick={onSaveChanges}
                disabled={isLoading}
                className="flex items-center gap-2 px-2 py-1 md:px-5 md:py-2 bg-primary border rounded-md text-sm text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader2 size={15} className="animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save size={15} />
                    Save Changes
                  </>
                )}
              </button>
            )}
            
            {/* Show Publish button for draft quizzes */}
            {quizStatus === 'draft' && (
              <button
                type="button"
                onClick={onPublish}
                disabled={isLoading}
                className="flex items-center gap-2 px-2 py-1 md:px-5 md:py-2 bg-green-600 border border-none rounded-md text-sm text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader2 size={15} className="animate-spin" />
                    Publishing...
                  </>
                ) : (
                  'Publish'
                )}
              </button>
            )}
          </>
        ) : (
          // Create mode: Show Save as Draft and Publish buttons
          <>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isLoading}
              className="flex items-center gap-2 px-2 py-1 md:px-5 md:py-2 bg-primary border rounded-md text-sm text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 size={15} className="animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Save size={15} />
                  Save as Draft
                </>
              )}
            </button>
            <button
              type="button"
              onClick={onPublish}
              disabled={isLoading}
              className="flex items-center gap-2 px-2 py-1 md:px-5 md:py-2 bg-green-600 border border-none rounded-md text-sm text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 size={15} className="animate-spin" />
                  Publishing...
                </>
              ) : (
                'Publish'
              )}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
