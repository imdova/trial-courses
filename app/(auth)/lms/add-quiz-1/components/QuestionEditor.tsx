/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { Controller } from "react-hook-form";
import { Draggable } from "@hello-pangea/dnd";
import {
  ChevronDown,
  ChevronUp,
  GripVertical,
  Trash2,
  Plus,
  Minus,
  Image as ImageIcon,
} from "lucide-react";
import Image from "next/image";
import {
  Question,
  QuestionOption,
  QuestionType,
  QuizFormValues,
} from "@/types/forms";
import QuestionOptionEditor from "./QuestionOptionEditor";
import {
  Control,
  UseFormRegister,
  FieldErrors,
  UseFormSetValue,
  UseFormWatch,
  UseFormTrigger,
  UseFormGetValues,
} from "react-hook-form";
import uploadFiles from "@/lib/files/imageUploader";
import { useState } from "react";

interface QuestionEditorProps {
  index: number;
  question: Question;
  control: Control<QuizFormValues>;
  register: UseFormRegister<QuizFormValues>;
  errors: FieldErrors<QuizFormValues>;
  watch: UseFormWatch<QuizFormValues>;
  setValue: UseFormSetValue<QuizFormValues>;
  trigger: UseFormTrigger<QuizFormValues>;
  getValues: UseFormGetValues<QuizFormValues>;
  remove: (index: number) => void;
}

export default function QuestionEditor({
  index,
  question,
  control,
  register,
  errors,
  watch,
  setValue,
  getValues,
  trigger,
  remove,
}: QuestionEditorProps) {
  const toggleQuestion = () => {
    const currentValue = getValues(`questions.${index}.isExpanded`);
    setValue(`questions.${index}.isExpanded`, !currentValue);
  };

  const handleQuestionTypeChange = (newType: QuestionType) => {
    const questionId = getValues(`questions.${index}.id`);

    if (newType === "true-false") {
      setValue(`questions.${index}.options`, [
        { id: `${questionId}-true`, text: "True", isCorrect: false },
        { id: `${questionId}-false`, text: "False", isCorrect: false },
      ]);
    } else if (newType === "single-choice") {
      setValue(`questions.${index}.options`, [
        { id: `${questionId}-o1`, text: "", isCorrect: false },
        { id: `${questionId}-o2`, text: "", isCorrect: false },
        { id: `${questionId}-o3`, text: "", isCorrect: false },
        { id: `${questionId}-o4`, text: "", isCorrect: false },
      ]);
      // Ensure only one option can be correct
      const currentOptions = getValues(`questions.${index}.options`) || [];
      if (currentOptions.filter((opt) => opt.isCorrect).length > 1) {
        setValue(
          `questions.${index}.options`,
          currentOptions.map((opt, i) => ({
            ...opt,
            isCorrect: i === 0, // Set only first option as correct by default
          }))
        );
      }
    } else if (newType === "multiple-choice") {
      setValue(`questions.${index}.options`, [
        { id: `${questionId}-o1`, text: "", isCorrect: false },
        { id: `${questionId}-o2`, text: "", isCorrect: false },
        { id: `${questionId}-o3`, text: "", isCorrect: false },
        { id: `${questionId}-o4`, text: "", isCorrect: false },
      ]);
    } else {
      setValue(`questions.${index}.options`, undefined);
    }

    setValue(`questions.${index}.type`, newType);
  };

  const addOption = () => {
    const questionId = getValues(`questions.${index}.id`);
    const newOptionId = `${questionId}-o${Date.now()}`;

    const currentOptions = getValues(`questions.${index}.options`) || [];
    setValue(`questions.${index}.options`, [
      ...currentOptions,
      { id: newOptionId, text: "", isCorrect: false },
    ]);
  };

  const removeOption = (optionIndex: number) => {
    const currentOptions = getValues(`questions.${index}.options`) || [];
    const newOptions: QuestionOption[] = currentOptions.filter(
      (_: QuestionOption, i: number) => i !== optionIndex
    );
    setValue(`questions.${index}.options`, newOptions);
  };


  const [imageUploading, setImageUploading] = useState(false);

  const handleQuestionImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageUploading(true);
      try {
        const urls = await uploadFiles([file]);
        if (urls[0]) {
          setValue(`questions.${index}.imageUrl`, urls[0]);
        }
      } catch (err) {
        // Optionally show an error message
      } finally {
        setImageUploading(false);
      }
    }
    e.target.value = ""; // Reset input
  };

  const questionType = watch(`questions.${index}.type`);
  const hasOptions = [
    "single-choice",
    "multiple-choice",
    "true-false",
  ].includes(questionType);

  // Image URL for the question (optional)
  const imageUrl = watch(`questions.${index}.imageUrl`);

  return (
    <Draggable key={question.id} draggableId={question.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className={`border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm transition-all ${
            snapshot.isDragging ? "shadow-lg " : ""
          }`}
        >
          <div
            {...provided.dragHandleProps}
            className="flex justify-between items-center p-4 cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <div className="cursor-grab hover:bg-gray-200 p-1 rounded-md">
                <GripVertical className="w-5 h-5 text-gray-500" />
              </div>
              <span className="text-sm font-medium text-gray-800">
                Question {index + 1}{" "}
                <span className="text-gray-500">
                  ({questionType?.replace("-", " ")})
                </span>{" "}
                - {question.points} {question.points === 1 ? "point" : "points"}
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <button
                type="button"
                onClick={toggleQuestion}
                className="text-gray-500 hover:text-gray-700 p-1 rounded-md hover:bg-gray-200 transition-colors"
                aria-label={
                  watch(`questions.${index}.isExpanded`)
                    ? "Collapse question"
                    : "Expand question"
                }
              >
                {watch(`questions.${index}.isExpanded`) ? (
                  <ChevronUp className="w-5 h-5" />
                ) : (
                  <ChevronDown className="w-5 h-5" />
                )}
              </button>
              <button
                type="button"
                onClick={() => remove(index)}
                className="text-red-500 hover:text-red-700 p-1 rounded-md hover:bg-red-50 transition-colors"
                aria-label="Delete question"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          {errors.questions?.[index]?.points && (
            <p className="px-4 py-1 text-sm text-red-600 bg-red-50">
              {errors.questions[index]?.points?.message}
            </p>
          )}

          {watch(`questions.${index}.isExpanded`) && (
            <div className="p-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Question Type *
                  </label>
                  <Controller
                    name={`questions.${index}.type`}
                    control={control}
                    render={({ field }) => (
                      <select
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none  transition-all"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          handleQuestionTypeChange(
                            e.target.value as QuestionType
                          );
                        }}
                      >
                        <option value="single-choice">
                          Single Choice (One Answer)
                        </option>
                        <option value="multiple-choice">
                          Multiple Choice (Multiple Answers)
                        </option>
                        <option value="true-false">True/False</option>
                        <option value="short-answer">Short Answer</option>
                        <option value="fill-in-the-blank">
                          Fill in the Blank
                        </option>
                      </select>
                    )}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Points *
                  </label>
                  <Controller
                    name={`questions.${index}.points`}
                    control={control}
                    rules={{
                      required: "Points are required",
                      min: {
                        value: 1,
                        message: "Must be at least 1",
                      },
                    }}
                    render={({ field }) => (
                      <input
                        type="number"
                        min="1"
                        className={`w-full px-3 py-2 border ${
                          errors.questions?.[index]?.points
                            ? "border-red-500 "
                            : "border-gray-300 "
                        } rounded-md focus:outline-none  transition-all`}
                        {...field}
                        onChange={(e) => {
                          field.onChange(parseInt(e.target.value) || 1);
                          trigger(`questions.${index}.points`);
                        }}
                      />
                    )}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Question Text *
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    className={`flex-1 px-3 py-2 border ${
                      errors.questions?.[index]?.text
                        ? "border-red-500 "
                        : "border-gray-300 "
                    } rounded-md focus:outline-none  transition-all`}
                    {...register(`questions.${index}.text`, {
                      required: "Question text is required",
                    })}
                    placeholder="Enter your question"
                  />
                  <label className="cursor-pointer p-2 text-gray-500 hover:text-green-600 rounded-md border border-gray-300 hover:border-green-500 transition-colors">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleQuestionImageUpload}
                      className="hidden"
                    />
                    <ImageIcon className="w-5 h-5" />
                    <span className="sr-only">Add image to question</span>
                  </label>
                </div>
                {errors.questions?.[index]?.text && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.questions[index]?.text?.message}
                  </p>
                )}
              </div>

              <div className="mt-2">
                <label className="block font-medium mb-1">Question Image (Optional)</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleQuestionImageUpload}
                  className="mb-2"
                />
                {imageUploading && <div className="text-sm text-gray-500">Uploading...</div>}
                {imageUrl && (
                  <div className="relative w-fit rounded-md overflow-hidden border border-gray-200 mt-2">
                    <Image
                      src={imageUrl}
                      alt="Question"
                      width={300}
                      height={200}
                      className="max-h-32 object-contain"
                    />
                    <button
                      type="button"
                      onClick={() => setValue(`questions.${index}.imageUrl`, null)}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                      aria-label="Remove image"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>

              {hasOptions && (
                <div className="pt-2">
                  <div className="flex justify-between items-center mb-3">
                    <label className="block text-sm font-medium text-gray-700">
                      Options *
                    </label>
                    {questionType === "true-false" && (
                      <span className="text-xs text-gray-500">
                        Select the correct answer
                      </span>
                    )}
                  </div>
                  <div className="space-y-3">
                    {watch(`questions.${index}.options`)?.map(
                      (option: QuestionOption, optionIndex: number) => (
                        <QuestionOptionEditor
                          key={option.id}
                          questionIndex={index}
                          optionIndex={optionIndex}
                          option={option}
                          questionType={questionType}
                          register={register}
                          errors={errors}
                          watch={watch}
                          setValue={setValue}
                          getValues={getValues}
                          removeOption={removeOption}
                        />
                      )
                    )}
                  </div>
                  {questionType !== "true-false" && (
                    <button
                      type="button"
                      onClick={addOption}
                      className="mt-3 flex ml-auto items-center gap-2 px-3 py-2 bg-green-50 text-green-600 rounded-md hover:bg-green-100 transition-colors text-sm font-medium"
                    >
                      <Plus className="w-4 h-4" />
                      Add Option
                    </button>
                  )}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Explanation (Optional)
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none  transition-all min-h-[100px]"
                  {...register(`questions.${index}.explanation`)}
                  placeholder="Add explanation for the correct answer (shown to users after answering)"
                />
              </div>
            </div>
          )}
        </div>
      )}
    </Draggable>
  );
}
