import { useFieldArray } from "react-hook-form";
import {
  DragDropContext,
  Draggable,
  DraggableProvided,
  DraggableStateSnapshot,
  Droppable,
  DropResult,
} from "@hello-pangea/dnd";
import {
  SquarePlus,
  ListChecks,
  ToggleRight,
  Type,
  FileText,
  Plus,
  AlignLeft,
  GripVertical,
} from "lucide-react";
import {
  Control,
  UseFormRegister,
  FieldErrors,
  UseFormSetValue,
  UseFormWatch,
  UseFormTrigger,
  UseFormGetValues,
} from "react-hook-form";
import { Question, QuizFormValuesTwo } from "@/types/forms";
import QuestionEditor from "./QuestionEditor";
import { JSX, useState, useCallback, memo } from "react";

interface QuestionContentProps {
  control: Control<QuizFormValuesTwo>;
  register: UseFormRegister<QuizFormValuesTwo>;
  errors: FieldErrors<QuizFormValuesTwo>;
  watch: UseFormWatch<QuizFormValuesTwo>;
  setValue: UseFormSetValue<QuizFormValuesTwo>;
  trigger: UseFormTrigger<QuizFormValuesTwo>;
  getValues: UseFormGetValues<QuizFormValuesTwo>;
}

const QuestionTypeIcon = memo(({ type }: { type: string }) => {
  const icons: Record<string, JSX.Element> = {
    "multiple-choice": <ListChecks className="w-4 h-4" />,
    "true-false": <ToggleRight className="w-4 h-4" />,
    "short-answer": <Type className="w-4 h-4" />,
    "fill-in-the-blank": <AlignLeft className="w-4 h-4" />,
  };

  return icons[type] || <FileText className="w-4 h-4" />;
});

QuestionTypeIcon.displayName = "QuestionTypeIcon";

const QuestionTypeLabel = memo(({ type }: { type: string }) => {
  const labels: Record<string, string> = {
    "multiple-choice": "Multiple Choice",
    "true-false": "True/False",
    "short-answer": "Short Answer",
    "fill-in-the-blank": "Fill in the Blank",
  };

  return labels[type] || "Question";
});

QuestionTypeLabel.displayName = "QuestionTypeLabel";

const QuestionItem = memo(
  ({
    index,
    questions,
    provided,
    snapshot,
    onClick,
    isSelected,
  }: {
    index: number;
    question: Question;
    questions: Question[];
    provided: DraggableProvided;
    snapshot: DraggableStateSnapshot;
    onClick: () => void;
    isSelected: boolean;
    isDragging: boolean;
    getValues: UseFormGetValues<QuizFormValuesTwo>;
    setValue: UseFormSetValue<QuizFormValuesTwo>;
  }) => {
    return (
      <li
        ref={provided.innerRef}
        {...provided.draggableProps}
        className={`relative p-3 hover:bg-gray-50 cursor-pointer transition-colors ${
          snapshot.isDragging ? "bg-blue-50 shadow-lg z-10" : ""
        } ${isSelected ? "bg-gray-100" : ""}`}
        onClick={onClick}
        style={provided.draggableProps.style}
      >
        <div className="flex items-center gap-3">
          <div
            {...provided.dragHandleProps}
            className="flex-shrink-0 p-1 text-gray-400 hover:text-gray-600"
          >
            <GripVertical className="w-4 h-4" />
          </div>
          <span
            className={`text-sm ${isSelected ? "font-bold" : "font-normal"}`}
          >
            {index + 1}
          </span>
          <div className="flex-shrink-0 p-2 bg-green-50 rounded-md text-green-600">
            <QuestionTypeIcon
              type={questions[index]?.type || "multiple-choice"}
            />
          </div>
          <div className="min-w-0 flex-1">
            <p
              className={`text-sm truncate ${
                isSelected
                  ? "font-bold text-gray-900"
                  : "font-medium text-gray-900"
              }`}
            >
              {questions[index]?.text || "New Question"}
            </p>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span className={`text-xs ${isSelected ? "font-semibold" : ""}`}>
                <QuestionTypeLabel
                  type={questions[index]?.type || "multiple-choice"}
                />
              </span>
              <span>•</span>
              <span className={`text-xs ${isSelected ? "font-semibold" : ""}`}>
                {questions[index]?.points || 1} point
                {questions[index]?.points !== 1 ? "s" : ""}
              </span>
            </div>
          </div>
        </div>
      </li>
    );
  }
);

QuestionItem.displayName = "QuestionItem";

export default function QuestionContent({
  control,
  register,
  errors,
  watch,
  setValue,
  getValues,
  trigger,
}: QuestionContentProps) {
  const { fields, append, remove, move } = useFieldArray({
    control,
    name: "questions",
  });

  const questions = watch("questions");
  const [isDragging, setIsDragging] = useState(false);
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState<
    number | null
  >(null);

  const addQuestion = useCallback(() => {
    const newId = `q${Date.now()}`;
    append({
      id: newId,
      type: "multiple-choice",
      text: "",
      points: 1,
      options: [
        { id: `${newId}-o1`, text: "", isCorrect: false },
        { id: `${newId}-o2`, text: "", isCorrect: false },
      ],
      isExpanded: true,
    });
  }, [append]);

  const handleDragEnd = useCallback(
    (result: DropResult) => {
      setIsDragging(false);

      if (!result.destination) return;

      const draggedIndex = result.source.index;
      const draggedQuestion = questions[draggedIndex];
      const wasExpanded = draggedQuestion?.isExpanded;

      move(result.source.index, result.destination.index);

      requestAnimationFrame(() => {
        const newQuestions = [...getValues("questions")];
        const newIndex = result.destination?.index ?? draggedIndex;

        if (newQuestions[newIndex]) {
          newQuestions[newIndex] = {
            ...newQuestions[newIndex],
            isExpanded: wasExpanded,
          };
          setValue("questions", newQuestions);
        }
      });
    },
    [move, getValues, setValue, questions]
  );

  const handleDragStart = useCallback(() => {
    setIsDragging(true);
    const hasExpanded = questions.some((q) => q.isExpanded);
    if (hasExpanded) {
      setValue(
        "questions",
        questions.map((q) => ({ ...q, isExpanded: false }))
      );
    }
  }, [questions, setValue]);

  const handleQuestionClick = useCallback(
    (index: number) => {
      if (isDragging) return;
      const currentQuestions = getValues("questions");
      setValue(
        "questions",
        currentQuestions.map((q, i) => ({
          ...q,
          isExpanded: i === index ? true : false,
        }))
      );
    },
    [isDragging, getValues, setValue]
  );
  const moveQuestion = (fromIndex: number, toIndex: number) => {
    if (toIndex < 0 || toIndex >= questions.length) return;

    const newQuestions = [...questions];
    const [movedQuestion] = newQuestions.splice(fromIndex, 1);
    newQuestions.splice(toIndex, 0, movedQuestion);
    setValue("questions", newQuestions);
  };

  const moveUp = (index: number) => moveQuestion(index, index - 1);
  const moveDown = (index: number) => moveQuestion(index, index + 1);

  return (
    <DragDropContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="grid md:grid-cols-10 gap-4 mb-4">
        {/* Questions Sidebar - Keep the drag and drop functionality here */}
        <div className="md:col-span-3">
          <div className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
            <div className="flex justify-between items-center p-4 bg-gray-50 border-b">
              <h2 className="font-semibold text-lg flex items-center gap-2">
                Questions
              </h2>
              <button
                type="button"
                onClick={addQuestion}
                className="flex items-center justify-center gap-2 w-7 h-7 font-medium text-muted-foreground rounded-md transition-colors"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-y-auto max-h-[calc(100vh-250px)] min-h-[300px]">
              <Droppable droppableId="questions-sidebar">
                {(provided) => (
                  <ul
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="divide-y divide-gray-200"
                  >
                    {fields.map((question, index) => (
                      <Draggable
                        key={question.id}
                        draggableId={question.id}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <QuestionItem
                            question={question}
                            index={index}
                            questions={questions}
                            provided={provided}
                            snapshot={snapshot}
                            isDragging={isDragging}
                            getValues={getValues}
                            setValue={setValue}
                            onClick={() => {
                              setSelectedQuestionIndex(index);
                              handleQuestionClick(index);
                            }}
                            isSelected={selectedQuestionIndex === index}
                          />
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </ul>
                )}
              </Droppable>
            </div>
            <div className="p-2">
              <button
                type="button"
                onClick={addQuestion}
                className="flex items-center gap-2 w-full p-2 text-sm font-medium justify-center bg-white border border-gray-200 shadow-sm rounded-md transition-colors"
              >
                <SquarePlus className="w-4 h-4" />
                Add Question
              </button>
            </div>
          </div>
        </div>

        {/* Questions Editor - Remove drag and drop from here */}
        <div className="md:col-span-7">
          <div className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
            <div className="p-4 bg-gray-50 border-b">
              <h2 className="font-semibold text-lg">Question Editor</h2>
            </div>
            <div className="p-4">
              <div className="space-y-4">
                {fields.map((question, index) => (
                  <QuestionEditor
                    key={question.id}
                    index={index}
                    question={question}
                    control={control}
                    register={register}
                    errors={errors}
                    watch={watch}
                    setValue={setValue}
                    getValues={getValues}
                    trigger={trigger}
                    remove={remove}
                    moveUp={moveUp}
                    moveDown={moveDown}
                    totalQuestions={questions.length}
                  />
                ))}
              </div>

              {fields.length === 0 && (
                <div className="text-center py-8">
                  <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <ListChecks className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-1">
                    No questions yet
                  </h3>
                  <p className="text-gray-500 mb-4">
                    Add your first question to get started
                  </p>
                  <button
                    type="button"
                    onClick={addQuestion}
                    className="inline-flex items-center gap-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-secondary hover:bg-secondary-dark focus:outline-none"
                  >
                    <SquarePlus className="w-4 h-4" />
                    Add Question
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </DragDropContext>
  );
}
