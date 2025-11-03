/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import Image from "next/image";
import { ImageIcon, X } from "lucide-react";
import { QuestionOption, QuizFormValues } from "@/types/forms";
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
    | "multiple-choice"
    | "single-choice"
    | "true-false"
    | "short-answer"
    | "fill-in-the-blank";
  register: UseFormRegister<QuizFormValues>;
  errors: FieldErrors<QuizFormValues>;
  watch: UseFormWatch<QuizFormValues>;
  setValue: UseFormSetValue<QuizFormValues>;
  getValues: UseFormGetValues<QuizFormValues>;
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
  const optionLetters = ["A", "B", "C", "D", "E", "F", "G", "H"];
  const currentLetter = optionLetters[optionIndex];

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

  const handleCorrectAnswerChange = () => {
    const currentOptions =
      getValues(`questions.${questionIndex}.options`) || [];
    // Always enforce only one correct answer
    const updatedOptions = currentOptions.map((opt, i) => ({
      ...opt,
      isCorrect: i === optionIndex,
    }));
    setValue(`questions.${questionIndex}.options`, updatedOptions);
  };

  return (
    <div key={option.id} className="space-y-2">
      <div className="flex items-start gap-3">
        {/* Option letter and input container */}
        <div className="flex items-center gap-3 mt-2 flex-1">
          <span className="font-medium w-4 text-gray-700">
            {currentLetter}.
          </span>

          {/* Input control - checkbox/radio for true/false and single-choice */}
          {questionType === "single-choice" || questionType === "true-false" ? (
            <div className="flex items-center gap-3 flex-1">
              <input
                type="radio"
                name={`correct-option-q${questionIndex}`}
                checked={option.isCorrect}
                onChange={handleCorrectAnswerChange}
                className="h-4 w-4 accent-primary  border-gray-300"
              />
              {questionType === "true-false" ? (
                <span className="text-gray-700 font-medium">{option.text}</span>
              ) : (
                <input
                  type="text"
                  className={`flex-1 px-3 py-2 border ${
                    errors.questions?.[questionIndex]?.options?.[optionIndex]
                      ?.text
                      ? "border-red-500 "
                      : "border-gray-300 "
                  } rounded-md focus:outline-none `}
                  {...register(
                    `questions.${questionIndex}.options.${optionIndex}.text`,
                    {
                      required: "This field is required",
                    }
                  )}
                  placeholder="Enter option text"
                />
              )}
            </div>
          ) : (
            // Multiple choice checkbox and input
            <div className="flex items-center gap-3 flex-1">
              <input
                type="checkbox"
                checked={option.isCorrect}
                onChange={handleCorrectAnswerChange}
                className="h-4 w-4 accent-primary   border-gray-300 rounded"
              />
              <input
                type="text"
                className={`flex-1 px-3 py-2 border ${
                  errors.questions?.[questionIndex]?.options?.[optionIndex]
                    ?.text
                    ? "border-red-500 "
                    : "border-gray-300 "
                } rounded-md focus:outline-none focus:ring-1`}
                {...register(
                  `questions.${questionIndex}.options.${optionIndex}.text`,
                  {
                    required: "This field is required",
                  }
                )}
                placeholder="Enter option text"
              />
            </div>
          )}

          {/* Image upload button (not for true/false) */}
          {/* {questionType !== "true-false" && (
            <label className="cursor-pointer p-2 text-gray-500 hover:text-green-600 rounded-md border border-gray-300  transition-colors">
              <input
                type="file"
                accept="image/*"
                onChange={handleOptionImageUpload}
                className="hidden"
              />
              <ImageIcon className="w-5 h-5" />
              <span className="sr-only">Add image to option</span>
            </label>
          )} */}

          {/* Delete button (not for true/false and when only 4 options remain) */}
          {questionType !== "true-false" &&
            (watch(`questions.${questionIndex}.options`) ?? []).length > 2 && (
              <button
                type="button"
                onClick={() => removeOption(optionIndex)}
                className="text-red-500 hover:text-red-700 p-1 rounded-md hover:bg-red-50 transition-colors"
                aria-label="Remove option"
              >
                <X className="w-5 h-5" />
              </button>
            )}
        </div>
      </div>

      {/* Option image */}
      {option.imageUrl && (
        <div className="ml-12 mt-2 relative w-fit rounded-md overflow-hidden border border-gray-200">
          <Image
            src={option.imageUrl}
            alt="Option"
            width={300}
            height={300}
            className="max-h-32 object-contain"
          />
          <button
            type="button"
            onClick={() => {
              const currentOptions = [
                ...(getValues(`questions.${questionIndex}.options`) || []),
              ];
              currentOptions[optionIndex] = {
                ...currentOptions[optionIndex],
                imageUrl: null as string | null | undefined,
              };
              setValue(`questions.${questionIndex}.options`, currentOptions);
            }}
            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
            aria-label="Remove image"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Error message */}
      {errors.questions?.[questionIndex]?.options?.[optionIndex]?.text && (
        <p className="ml-12 mt-1 text-sm text-red-600">
          {
            errors.questions[questionIndex]?.options?.[optionIndex]?.text
              ?.message
          }
        </p>
      )}
    </div>
  );
}
