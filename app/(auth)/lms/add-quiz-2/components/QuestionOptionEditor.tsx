"use client";
import Image from "next/image";
import { ImageIcon, X } from "lucide-react";
import { QuestionOption, QuizFormValuesTwo } from "@/types/forms";
import {
  UseFormRegister,
  FieldErrors,
  UseFormSetValue,
  UseFormWatch,
  UseFormGetValues,
} from "react-hook-form";

interface QuestionOptionEditorProps {
  questionIndex: number;
  optionIndex: number;
  option: QuestionOption;
  questionType:
    | "single-choice"
    | "multiple-choice"
    | "true-false"
    | "short-answer"
    | "fill-in-the-blank";
  register: UseFormRegister<QuizFormValuesTwo>;
  errors: FieldErrors<QuizFormValuesTwo>;
  watch: UseFormWatch<QuizFormValuesTwo>;
  setValue: UseFormSetValue<QuizFormValuesTwo>;
  getValues: UseFormGetValues<QuizFormValuesTwo>;
  removeOption: (optionIndex: number) => void;
}

export default function QuestionOptionEditor({
  questionIndex,
  optionIndex,
  option,
  questionType,
  register,
  errors,
  watch,
  setValue,
  getValues,
  removeOption,
}: QuestionOptionEditorProps) {
  const handleOptionImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    const currentOptions = [
      ...(getValues(`questions.${questionIndex}.options`) || []),
    ];

    currentOptions[optionIndex] = {
      ...currentOptions[optionIndex],
      imageUrl,
      text: currentOptions[optionIndex].text || "Image Option",
    };
    setValue(`questions.${questionIndex}.options`, currentOptions);
    e.target.value = ""; // Reset input
  };

  // Get the alphabetical label for the option
  const getOptionLabel = (index: number) => {
    return String.fromCharCode(97 + index); // 97 is ASCII for 'a'
  };

  return (
    <div key={option.id} className="space-y-2">
      <div className="flex items-center space-x-2">
        <input
          type={questionType === "true-false" ? "radio" : "checkbox"}
          name={`correct-option-q${questionIndex}`}
          checked={option.isCorrect}
          onChange={() => {
            const updatedOptions = watch(
              `questions.${questionIndex}.options`
            )?.map((opt: QuestionOption, i: number) => ({
              ...opt,
              isCorrect: i === optionIndex,
            }));
            setValue(
              `questions.${questionIndex}.options`,
              updatedOptions || []
            );
          }}
          className={`h-4 w-4 text-green-600 accent-primary ${
            questionType === "true-false" ? "rounded-full" : "rounded"
          }`}
        />
        {questionType === "true-false" ? (
          <span className="text-sm text-gray-700">{option.text}</span>
        ) : (
          <div className="flex-1 flex items-center space-x-2">
            <span className="text-gray-500 w-5 text-sm">
              {getOptionLabel(optionIndex)}.
            </span>
            <input
              type="text"
              className={`flex-1 px-3 py-2 border ${
                errors.questions?.[questionIndex]?.options?.[optionIndex]?.text
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded-md focus:outline-none`}
              {...register(
                `questions.${questionIndex}.options.${optionIndex}.text`,
                {
                  required: "Option text or image is required",
                  validate: (value: string | undefined) =>
                    !!value ||
                    !!watch(
                      `questions.${questionIndex}.options.${optionIndex}.imageUrl`
                    ) ||
                    "Either text or image is required",
                }
              )}
              placeholder="Enter option text"
            />
            <button
              type="button"
              onClick={() => {
                const input = document.createElement("input");
                input.type = "file";
                input.accept = "image/*";
                input.onchange = (e) =>
                  handleOptionImageUpload(
                    e as unknown as React.ChangeEvent<HTMLInputElement>
                  );
                input.click();
              }}
              className="p-2 text-gray-500 hover:text-green-500 rounded-md border border-gray-300 hover:border-green-500 transition-colors"
              title="Add image to option"
            >
              <ImageIcon className="w-5 h-5" />
            </button>
          </div>
        )}
        {(watch(`questions.${questionIndex}.options`) ?? []).length > 2 && (
          <button
            type="button"
            onClick={() => removeOption(optionIndex)}
            className="text-red-500 hover:text-red-700"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>
      {option.imageUrl && (
        <div className="ml-6 relative">
          <Image
            src={option.imageUrl}
            alt="Option"
            width={300}
            height={300}
            className="max-h-32 rounded-md"
          />
          <button
            type="button"
            onClick={() => {
              const currentOptions = [
                ...(getValues(`questions.${questionIndex}.options`) || []),
              ];
              currentOptions[optionIndex] = {
                ...currentOptions[optionIndex],
                imageUrl: undefined,
              };
              setValue(`questions.${questionIndex}.options`, currentOptions);
            }}
            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}
      {errors.questions?.[questionIndex]?.options?.[optionIndex]?.text && (
        <p className="ml-6 text-sm text-red-600">
          {
            errors.questions[questionIndex]?.options?.[optionIndex]?.text
              ?.message
          }
        </p>
      )}
    </div>
  );
}
