import { QuizFormValues } from "@/types/forms";
import { Settings, Timer } from "lucide-react";
import { FieldErrors, UseFormRegister, UseFormWatch } from "react-hook-form";

interface QuizSettingsProps {
  register: UseFormRegister<QuizFormValues>;
  errors: FieldErrors<QuizFormValues>;
  watch: UseFormWatch<QuizFormValues>;
}

export default function QuizSettings({ register, errors }: QuizSettingsProps) {
  return (
    <div className="overflow-hidden mb-4">
      <h2 className="flex items-center gap-2 font-semibold text-lg mb-4">
        <Settings size={20} /> Quiz Settings
      </h2>
      <div className="p-4 space-y-4">
        {/* <div>
          <label
            htmlFor="randomizeQuestions"
            className="flex justify-between items-center cursor-pointer"
          >
            <div>
              <h2 className="text-sm font-bold">Randomize Questions</h2>
              <span className="text-xs font-medium text-muted-foreground">
                Shuffle questions for each participant
              </span>
            </div>
            <div className="relative">
              <input
                type="checkbox"
                id="randomizeQuestions"
                {...register("randomize_questions")}
                className="sr-only peer"
              />
              <div className="w-12 h-6 bg-gray-300 peer-checked:bg-primary rounded-full"></div>
              <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition peer-checked:transform peer-checked:translate-x-6"></div>
            </div>
          </label>
        </div>
        <div className="mt-4">
          <label
            htmlFor="immediateFeedback"
            className="flex justify-between items-center cursor-pointer"
          >
            <div>
              <h2 className="text-sm font-bold">Immediate Feedback</h2>
              <span className="text-xs font-medium text-muted-foreground">
                Show correct answers after the quiz finish
              </span>
            </div>
            <div className="relative">
              <input
                type="checkbox"
                id="immediateFeedback"
                {...register("immediate_feedback")}
                className="sr-only peer"
              />
              <div className="w-12 h-6 bg-gray-300 peer-checked:bg-primary rounded-full"></div>
              <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition peer-checked:transform peer-checked:translate-x-6"></div>
            </div>
          </label>
        </div>
        <div className="mt-4">
          <label
            htmlFor="feedbackByEmail"
            className="flex justify-between items-center cursor-pointer"
          >
            <div>
              <h2 className="text-sm font-bold">Feedback By Email</h2>
              <span className="text-xs font-medium text-muted-foreground">
                Send feadback to my email
              </span>
            </div>
            <div className="relative">
              <input
                type="checkbox"
                id="feedbackByEmail"
                {...register("feedback_by_email")}
                className="sr-only peer"
              />
              <div className="w-12 h-6 bg-gray-300 peer-checked:bg-primary rounded-full"></div>
              <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition peer-checked:transform peer-checked:translate-x-6"></div>
            </div>
          </label>
        </div> */}
        <div className="flex gap-3 w-full">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Time Limit (minutes)
            </label>
            <div className="relative">
              <input
                type="number"
                min="1"
                className={`w-full px-3 py-2 pl-8 border ${
                  errors.late_time_minutes ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none `}
                {...register("late_time_minutes", {
                  valueAsNumber: true,
                  min: { value: 1, message: "Time limit must be greater than 0" },
                  validate: (value: number) =>
                    value > 0 || "Time limit must be greater than 0",
                })}
              />
              <Timer
                size={15}
                className="absolute top-1/2 left-2 -translate-y-1/2 text-muted-foreground"
              />
            </div>
            {errors.late_time_minutes && (
              <p className="mt-1 text-sm text-red-600">
                {errors.late_time_minutes.message}
              </p>
            )}
            {/* <p className="mt-1 text-xs text-gray-500">Set to 0 for no limit</p> */}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Retake numbers
            </label>
            <input
              type="number"
              min="0"
              className={`w-full px-3 py-2 border ${
                errors.retakes ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none `}
              {...register("retakes", {
                valueAsNumber: true,
              })}
            />
            {errors.retakes && (
              <p className="mt-1 text-sm text-red-600">
                {errors.retakes.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <label className="block w-full text-sm font-medium text-gray-700 mb-1">
            Passing Score (%)
          </label>
          <input
            type="number"
            min="0"
            max="100"
            className={`px-3 w-full py-2 border ${
              errors.passing_score ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none `}
            {...register("passing_score", {
              valueAsNumber: true,
              min: { value: 0, message: "Must be positive" },
              max: { value: 100, message: "Cannot exceed 100" },
            })}
          />
          {errors.passing_score && (
            <p className="mt-1 text-sm text-red-600">
              {errors.passing_score.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
