import { SquarePen } from "lucide-react";
import {
  Control,
  UseFormRegister,
  FieldErrors,
  UseFormSetValue,
  UseFormWatch,
  UseFormTrigger,
  UseFormGetValues,
} from "react-hook-form";
import { QuizFormValues } from "@/types/forms";
import QuizSettings from "./QuizSettings";

interface QuizContentProps {
  control: Control<QuizFormValues>;
  register: UseFormRegister<QuizFormValues>;
  errors: FieldErrors<QuizFormValues>;
  watch: UseFormWatch<QuizFormValues>;
  setValue: UseFormSetValue<QuizFormValues>;
  trigger: UseFormTrigger<QuizFormValues>;
  getValues: UseFormGetValues<QuizFormValues>;
}

export default function QuizContent({
  register,
  errors,
  watch,
}: QuizContentProps) {
  return (
    <div className="p-3 border border-gray-200 bg-white shadow-sm rounded-lg space-y-6">
      {/* Quiz Details */}
      <div className="overflow-hidden">
        <div className="p-4 ">
          <h2 className="flex items-center gap-3 font-semibold text-lg mb-1">
            <SquarePen size={18} /> Quiz Details
          </h2>
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
      <QuizSettings register={register} errors={errors} watch={watch} />
    </div>
  );
}
