import { useFieldArray } from "react-hook-form";
import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd";
import { Plus } from "lucide-react";
import {
  Control,
  UseFormRegister,
  FieldErrors,
  UseFormSetValue,
  UseFormWatch,
  UseFormTrigger,
  UseFormGetValues,
} from "react-hook-form";
import QuestionEditor from "./QuestionEditor";
import { QuizFormValues } from "@/types/forms";

interface QuizEditorProps {
  control: Control<QuizFormValues>;
  register: UseFormRegister<QuizFormValues>;
  errors: FieldErrors<QuizFormValues>;
  watch: UseFormWatch<QuizFormValues>;
  setValue: UseFormSetValue<QuizFormValues>;
  trigger: UseFormTrigger<QuizFormValues>;
  getValues: UseFormGetValues<QuizFormValues>;
}

export default function QuizEditor({
  control,
  register,
  errors,
  watch,
  setValue,
  getValues,
  trigger,
}: QuizEditorProps) {
  const { fields, append, remove, move } = useFieldArray({
    control,
    name: "questions",
  });

  const addQuestion = () => {
    const newId = `q${Date.now()}`;
    append({
      id: newId,
      type: "multiple-choice",
      text: "",
      points: 1,
      options: [
        { id: `${newId}-o1`, text: "", isCorrect: false },
        { id: `${newId}-o2`, text: "", isCorrect: false },
        { id: `${newId}-o3`, text: "", isCorrect: false },
        { id: `${newId}-o4`, text: "", isCorrect: false },
      ],
      isExpanded: true,
    });
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    move(result.source.index, result.destination.index);
  };

  return (
    <div className=" space-y-6">
      {/* Questions */}
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <div className="flex flex-col justify-between  p-4 bg-gray-50 cursor-pointer sm:flex-row sm:items-center">
          <h2 className="font-semibold text-lg">Questions</h2>
          <button
            type="button"
            onClick={addQuestion}
            className="mt-4 px-4 py-2 w-fit bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none  focus:ring-offset-2 flex items-center"
          >
            <Plus className="w-5 h-5 mr-1" />
            Add Question
          </button>
        </div>
        <div className="p-4">
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="questions">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="space-y-4"
                >
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
                    />
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>

          {fields.length === 0 && (
            <p className="mt-2 text-sm text-red-600">
              At least one question is required
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
