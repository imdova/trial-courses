"use client";
import { Controller } from "react-hook-form";
import {
  ChevronDown,
  ChevronUp,
  Trash2,
  Plus,
  Minus,
  Image as ImageIcon,
  AlignLeft,
  Type,
  ToggleRight,
  ListChecks,
  HelpCircle,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import Image from "next/image";
import {
  Question,
  QuestionOption,
  QuestionType,
  QuizFormValuesTwo,
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
import { OptionSelect } from "@/types";
import CustomSelect from "@/components/UI/DynamicSelectWithIcon";

interface QuestionEditorProps {
  index: number;
  question: Question;
  control: Control<QuizFormValuesTwo>;
  register: UseFormRegister<QuizFormValuesTwo>;
  errors: FieldErrors<QuizFormValuesTwo>;
  watch: UseFormWatch<QuizFormValuesTwo>;
  setValue: UseFormSetValue<QuizFormValuesTwo>;
  trigger: UseFormTrigger<QuizFormValuesTwo>;
  getValues: UseFormGetValues<QuizFormValuesTwo>;
  remove: (index: number) => void;
  moveUp: (index: number) => void;
  moveDown: (index: number) => void;
  totalQuestions: number;
}

const questionTypeOptions: OptionSelect[] = [
  {
    value: "multiple-choice",
    label: "Multiple Choice",
    icon: <ListChecks className="w-4 h-4 text-green-500" />,
  },
  {
    value: "true-false",
    label: "True/False",
    icon: <ToggleRight className="w-4 h-4 text-green-500" />,
  },
  {
    value: "short-answer",
    label: "Short Answer",
    icon: <Type className="w-4 h-4 text-green-500" />,
  },
  {
    value: "fill-in-the-blank",
    label: "Fill in the Blank",
    icon: <AlignLeft className="w-4 h-4 text-green-500" />,
  },
];

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
  moveUp,
  moveDown,
  totalQuestions,
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
    } else if (newType === "multiple-choice") {
      setValue(`questions.${index}.options`, [
        { id: `${questionId}-o1`, text: "", isCorrect: false },
        { id: `${questionId}-o2`, text: "", isCorrect: false },
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

  const handleQuestionImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setValue(`questions.${index}.imageUrl`, imageUrl);
    }
    e.target.value = ""; // Reset input
  };

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
      <div className="flex justify-between items-center p-4 cursor-pointer bg-gray-50">
        <div className="flex items-center space-x-2">
          <span className="flex items-center gap-2 text-sm">
            <HelpCircle className="text-primary" size={15} /> Question{" "}
            {index + 1} ({question.type}) - {question.points} points
          </span>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => moveUp(index)}
              disabled={index === 0}
              className={`text-gray-500 hover:text-gray-700 ${
                index === 0 ? "opacity-50 cursor-not-allowed" : ""
              }`}
              title="Move up"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => moveDown(index)}
              disabled={index === totalQuestions - 1}
              className={`text-gray-500 hover:text-gray-700 ${
                index === totalQuestions - 1
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              title="Move down"
            >
              <ArrowDown className="w-4 h-4" />
            </button>
          </div>
          <button
            type="button"
            onClick={toggleQuestion}
            className="text-gray-500 hover:text-gray-700"
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
            className="text-red-500 hover:text-red-700"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {errors.questions?.[index]?.points && (
        <p className="px-4 text-sm text-red-600">
          {errors.questions[index]?.points?.message}
        </p>
      )}

      {watch(`questions.${index}.isExpanded`) && (
        <div className="p-4 space-y-3">
          <div className="flex gap-4 flex-col sm:flex-row">
            <div className="w-full">
              <Controller
                name={`questions.${index}.type`}
                control={control}
                render={({ field }) => (
                  <CustomSelect
                    label="Question Type"
                    value={field.value}
                    onChange={(val) => {
                      field.onChange(val);
                      handleQuestionTypeChange(val as QuestionType);
                    }}
                    options={questionTypeOptions}
                  />
                )}
              />
            </div>
            <span className="font-medium w-1/4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Points
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
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded-md focus:outline-none`}
                    {...field}
                    onChange={(e) => {
                      field.onChange(parseInt(e.target.value) || 1);
                      trigger(`questions.${index}.points`);
                    }}
                  />
                )}
              />
            </span>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Question Text *
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                className={`flex-1 px-3 py-2 border ${
                  errors.questions?.[index]?.text
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md focus:outline-none`}
                {...register(`questions.${index}.text`, {
                  required: "Question text is required",
                })}
                placeholder="Enter your question"
              />
              <button
                type="button"
                onClick={() => {
                  const input = document.createElement("input");
                  input.type = "file";
                  input.accept = "image/*";
                  input.onchange = (e) =>
                    handleQuestionImageUpload(
                      e as unknown as React.ChangeEvent<HTMLInputElement>
                    );
                  input.click();
                }}
                className="p-2 text-gray-500 hover:text-green-500 hover:border-green-500 rounded-md border border-gray-300"
                title="Add image to question"
              >
                <ImageIcon className="w-5 h-5" />
              </button>
            </div>
            {watch(`questions.${index}.imageUrl`) && (
              <div className="mt-2 relative">
                <Image
                  src={
                    watch(`questions.${index}.imageUrl`) ||
                    "/placeholder-image.jpg"
                  }
                  alt="Question"
                  className="max-h-40 rounded-md"
                  width={300}
                  height={200}
                />
                <button
                  type="button"
                  onClick={() =>
                    setValue(`questions.${index}.imageUrl`, undefined)
                  }
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                >
                  <Minus className="w-3 h-3" />
                </button>
              </div>
            )}
            {errors.questions?.[index]?.text && (
              <p className="mt-1 text-sm text-red-600">
                {errors.questions[index]?.text?.message}
              </p>
            )}
          </div>

          {(watch(`questions.${index}.type`) === "multiple-choice" ||
            watch(`questions.${index}.type`) === "true-false") && (
            <div>
              <div className="flex flex-col justify-between sm:items-center gap-3 mb-3 sm:flex-row sm:mb-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Options *
                </label>
                {watch(`questions.${index}.type`) === "multiple-choice" && (
                  <button
                    type="button"
                    onClick={addOption}
                    className="flex items-center p-2 gap-3 bg-white rounded-md border shadow-sm text-xs w-fit font-semibold"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add Option
                  </button>
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
                      questionType={watch(`questions.${index}.type`)}
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
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Explanation (Optional)
            </label>
            <textarea
              className="w-full px-3 py-2 min-h-[200px] resize-none border border-gray-300 rounded-md focus:outline-none"
              rows={2}
              {...register(`questions.${index}.explanation`)}
              placeholder="Add explanation for the correct answer"
            />
          </div>
        </div>
      )}
    </div>
  );
}
