import { Question, QuizFormValuesTwo } from "@/types/forms";
import { UseFormWatch } from "react-hook-form";

interface QuizSummaryProps {
  watch: UseFormWatch<QuizFormValuesTwo>;
}

export default function QuizSummary({ watch }: QuizSummaryProps) {
  const calculateTotalPoints = () => {
    return watch("questions").reduce(
      (sum: number, q: Question) => sum + q.points,
      0
    );
  };

  return (
    <div className="box-content">
      <h3 className="font-semibold text-lg mb-4">Quiz Summary</h3>
      <div className="text-sm">
        <div>
          <p className="flex items-center justify-between mb-4 text-sm ">
            <span className="text-muted-foreground text-sm">Questions:</span>{" "}
            {watch("questions")?.length}
          </p>
          {watch("startDate") && watch("endDate") && (
            <p className="flex flex-col gap-2 justify-between mb-4 text-xs">
              <span className="text-muted-foreground text-sm">Time Range:</span>{" "}
              {new Date(watch("startDate")).toLocaleString()} -{" "}
              {new Date(watch("endDate")).toLocaleString()}
            </p>
          )}
        </div>
        <div>
          <p className="flex items-center justify-between mb-4 text-sm">
            <span className="text-muted-foreground text-sm">Time Limit:</span>
            <span className="text-sm">
              {watch("timeLimit") && watch("timeLimit") > 0
                ? (() => {
                    const totalSeconds = watch("timeLimit");
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
            {watch("immediateFeedback") ? "Immediate" : "After submission"}
          </p>
          <p className="flex items-center justify-between mb-4 text-sm">
            <span className="text-muted-foreground text-sm">Total Points:</span>{" "}
            {calculateTotalPoints()}
          </p>
          <p className="flex items-center justify-between mb-4 text-sm">
            <span className="text-muted-foreground text-sm">Passing Score:</span>{" "}
            {watch("passingScore")}%
          </p>
        </div>
      </div>
    </div>
  );
}
