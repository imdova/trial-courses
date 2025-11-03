import { Quiz } from "@/types/quiz";
import { Play, Share2, SquarePen, Timer, Trash2 } from "lucide-react";
import Link from "next/link";

function QuizCard({
  quiz,
  isStudent = false,
}: {
  quiz: Quiz;
  isStudent?: boolean;
}) {
  return (
    <div
      className="p-3 shadow-sm rounded-lg border border-gray-200"
      key={quiz.id}
    >
      <Link
        href={
          isStudent ? `quizzes/${quiz.id}/start` : `quizzes/overview/${quiz.id}`
        }
        className="text-lg block font-bold mb-3"
      >
        {quiz.title}
      </Link>
      <div className="flex items-center gap-2 mb-3">
        <span className="flex items-center gap-2 text-xs text-muted-foreground">
          <Timer size={15} />
          {quiz.timeLimit && quiz.timeLimit > 0
            ? (() => {
                const totalSeconds = quiz.timeLimit;
                const hours = Math.floor(totalSeconds / 3600); // Total hours
                const minutes = Math.floor((totalSeconds % 3600) / 60); // Remaining minutes
                const seconds = totalSeconds % 60; // Remaining seconds
                return hours > 0
                  ? `${hours} hour${hours > 1 ? "s" : ""} ${
                      minutes > 0
                        ? `${minutes} minute${minutes > 1 ? "s" : ""}`
                        : ""
                    } ${
                      seconds > 0
                        ? `${seconds} second${seconds > 1 ? "s" : ""}`
                        : ""
                    }`
                  : `${minutes} minute${minutes > 1 ? "s" : ""} ${
                      seconds > 0
                        ? `${seconds} second${seconds > 1 ? "s" : ""}`
                        : ""
                    }`;
              })()
            : "No limit"}
        </span>
        <span className="border-l text-xs text-muted-foreground pl-2">
          {quiz?.questions?.length} Questions
        </span>
      </div>
      <p className="text-sm text-muted-foreground mb-4">{quiz.instructions}</p>
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <button className="p-2 border rounded-md shadow-sm text-primary">
            <Share2 size={15} />
          </button>
          {!isStudent && (
            <button className="p-2 border rounded-md shadow-sm text-primary">
              <Trash2 size={15} />
            </button>
          )}
        </div>
        <div className="flex gap-2">
          {!isStudent && (
            <button className="flex items-center gap-2 p-2 border rounded-md shadow-sm text-primary">
              <SquarePen size={15} />
              <span className="text-xs font-medium">Edit</span>
            </button>
          )}
          <Link
            href={`quizzes/${quiz.id}/start`}
            className="flex items-center gap-2 p-2 border rounded-md shadow-sm bg-primary text-white"
          >
            <Play size={15} />
            <span className="text-xs font-medium">Start</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
export default QuizCard;
