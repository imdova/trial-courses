"use client";
import { useEffect } from "react";
import { useParams } from "next/navigation";
import StudentQuizAttemptsTable from "@/components/UI/tables/StudentQuizAttemptsTable";
import { useQuiz } from "../../../hooks/useQuiz";
import { Loader2 } from "lucide-react";

export default function StudentsListPanel() {
  const params = useParams();
  const quizId = params.slug as string;
  const { quizStudents, loadingStudents, getQuizStudents } = useQuiz();

  useEffect(() => {
    if (quizId) {
      getQuizStudents(quizId);
    }
  }, [quizId, getQuizStudents]);

  if (loadingStudents) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="ml-3 text-gray-500">Loading students...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
        <h2 className="text-xl font-bold mb-3">All Students ({quizStudents?.meta?.total || 0})</h2>
        {/* Students Table  */}
        <StudentQuizAttemptsTable data={quizStudents?.data || []} />
      </div>
    </div>
  );
}
