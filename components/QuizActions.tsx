"use client";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/UI/dropdown-menu";
import { MoreVertical, Eye, Pencil, Trash2 } from "lucide-react";
import DeleteQuizModal from "@/components/UI/DeleteQuizModal";
import { useQuiz } from "@/app/(auth)/instructor/quizzes/hooks/useQuiz";
import { Quiz } from "@/types/quiz";
import { toast } from "sonner";

interface QuizActionsProps {
  quiz: Quiz;
}

export default function QuizActions({ quiz }: QuizActionsProps) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { removeQuiz, loading } = useQuiz();

  const handleDelete = async () => {
    try {
      const result = await removeQuiz(quiz.id);
      if (result.meta.requestStatus === 'fulfilled') {
        setIsDeleteModalOpen(false);
        toast.success("Quiz deleted successfully!");
      } else {
        // Keep modal open if deletion failed
        toast.error("Failed to delete quiz!");
      }
    } catch (error) {
      console.error('Failed to delete quiz:', error);
      // Keep modal open if deletion failed
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="p-2 rounded-full hover:bg-gray-100">
            <MoreVertical className="w-5 h-5" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => window.location.href = `/instructor/quizzes/overview/${quiz.id}`}>
            <Eye className="w-4 h-4 mr-2" /> View
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => window.location.href = `/lms/add-quiz-1?edit=${quiz.id}`}>
            <Pencil className="w-4 h-4 mr-2" /> Edit
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => setIsDeleteModalOpen(true)} 
            className="text-red-600"
          >
            <Trash2 className="w-4 h-4 mr-2" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DeleteQuizModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        quizTitle={quiz.title}
        isLoading={loading}
      />
    </>
  );
}
