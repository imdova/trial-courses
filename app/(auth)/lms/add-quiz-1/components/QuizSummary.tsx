import { Question, QuizFormValues } from "@/types/forms";
import { UseFormWatch } from "react-hook-form";

interface QuizSummaryProps {
  watch: UseFormWatch<QuizFormValues>;
}

export default function QuizSummary({ watch }: QuizSummaryProps) {
  const calculateTotalPoints = () => {
    return (watch("questions") || []).reduce(
      (sum: number, q: Question) => sum + q.points,
      0
    );
  };

  return (
    <div className="bg-white border border-gray-200 shadow-sm rounded-lg p-4">
      <h3 className="font-semibold text-lg mb-4">Quiz Summary</h3>
      <div className="text-sm">
        <div>
          <p className="flex items-center justify-between mb-4 text-sm ">
            <span className="text-muted-foreground text-sm">Questions:</span>{" "}
            {watch("questions")?.length}
          </p>
          {watch("start_date") && watch("end_date") && (
            <p className="flex flex-col gap-2 justify-between mb-4 text-xs">
              <span className="text-muted-foreground text-sm">Time Range:</span>{" "}
              {new Date(watch("start_date")).toLocaleString()} -{" "}
              {new Date(watch("end_date")).toLocaleString()}
            </p>
          )}
        </div>
        <div>
          <p className="flex items-center justify-between mb-4 text-sm">
            <span className="text-muted-foreground text-sm">Time Limit:</span>
            <span className="text-sm">
              {watch("late_time_minutes") && watch("late_time_minutes") > 0
                ? (() => {
                    const totalSeconds = watch("late_time_minutes");
                    const hours = Math.floor(totalSeconds / 3600);
                    const minutes = Math.floor((totalSeconds % 3600) / 60);
                    const seconds = totalSeconds % 60;
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
          </p>

          <p className="flex items-center justify-between mb-4 text-sm">
            <span className="text-muted-foreground text-sm">Feedback:</span>{" "}
            {watch("immediate_feedback") ? "Immediate" : "After submission"}
          </p>
          <p className="flex items-center justify-between mb-4 text-sm">
            <span className="text-muted-foreground text-sm">Total Points:</span>{" "}
            {calculateTotalPoints()}
          </p>
          <p className="flex items-center justify-between mb-4 text-sm">
            <span className="text-muted-foreground text-sm">Passing Score:</span>{" "}
            {watch("passing_score")}%
          </p>
        </div>
      </div>
    </div>
  );
}
