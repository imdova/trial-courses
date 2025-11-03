import {
  Control,
  UseFormRegister,
  FieldErrors,
  UseFormSetValue,
  UseFormWatch,
  UseFormTrigger,
  UseFormGetValues,
} from "react-hook-form";
import { QuizFormValuesTwo } from "@/types/forms";

interface QuizEditorProps {
  control: Control<QuizFormValuesTwo>;
  register: UseFormRegister<QuizFormValuesTwo>;
  errors: FieldErrors<QuizFormValuesTwo>;
  watch: UseFormWatch<QuizFormValuesTwo>;
  setValue: UseFormSetValue<QuizFormValuesTwo>;
  trigger: UseFormTrigger<QuizFormValuesTwo>;
  getValues: UseFormGetValues<QuizFormValuesTwo>;
}

export default function QuizEditor({ register, errors }: QuizEditorProps) {
  return (
    <div className="space-y-6 mb-4">
      {/* Quiz Details */}
      <div>
        <div className="p-4 ">
          <h2 className="font-semibold text-lg">Quiz Details</h2>
          <p className="text-muted-foreground text-sm">
            Enter the basic information about your quiz
          </p>
        </div>

        <div className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Quiz Title *
            </label>
            <input
              type="text"
              className={`w-full px-3 py-2 border ${
                errors.title ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none `}
              {...register("title", {
                required: "Title is required",
              })}
              placeholder="Enter quiz title"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">
                {errors.title.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Instructions
            </label>
            <textarea
              className="w-full px-3 py-2 min-h-[200px] resize-none border border-gray-300 rounded-md focus:outline-none "
              rows={3}
              {...register("instructions")}
              placeholder="Write Quiz Instructions"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
