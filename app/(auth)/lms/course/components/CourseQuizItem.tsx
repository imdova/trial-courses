import { Button } from "@/components/UI/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/UI/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/UI/Collapsible";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/UI/form";
import { Separator } from "@/components/UI/separator";
import {
  ChevronDown,
  FileWarning,
  GripVertical,
  Plus,
  Trash2,
} from "lucide-react";
import { useFormContext } from "react-hook-form";
import React, { useEffect } from "react";
import { useDraggable } from "@/hooks/useDraggable";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/UI/select";
import { useQuiz } from "@/app/(auth)/instructor/quizzes/hooks/useQuiz";
import { Step3FormData } from "../util/course.schema";

const LECTURE_DRAG_TYPE = "LECTURE_ITEM";

const CourseQuizItem = ({
  index,
  itemIndex,
  item,
  active,
  setActive,
  removeItem,
}: {
  index: number;
  itemIndex: number;
  item: Step3FormData["sections"][number]["items"][number] & { id: string };
  active: string | null;
  setActive: (id: string | null) => void;
  removeItem: () => void;
}) => {
  const { quizzes, getQuizzes } = useQuiz();
  const form = useFormContext<Step3FormData>();
  const { dragRef, previewRef, opacity } = useDraggable(
    itemIndex,
    LECTURE_DRAG_TYPE,
  );

  const quizId = form.watch(`sections.${index}.items.${itemIndex}.quizId`);
  const quiz = quizzes.find((q) => q.id === quizId);
  const open = active === item.itemId;

  useEffect(() => {
    getQuizzes();
  }, [getQuizzes]);
  return (
    <div
      ref={previewRef} // drop target
      style={{ opacity }}
    >
      <Card className="overflow-hidden p-0">
        <Collapsible
          open={open}
          onOpenChange={(open) => setActive(open ? item.itemId || null : null)}
        >
          <CardHeader className="bg-gray-100 p-1 px-2">
            <div className="flex h-10 w-full items-center">
              <div ref={dragRef} tabIndex={-1} className="cursor-grabbing p-2">
                <GripVertical className="text-muted-foreground size-4" />{" "}
              </div>
              <span className="py-2">
                <FileWarning className="size-4 text-orange-400" />
              </span>
              <div className="flex-1 px-2">
                <CardTitle className="w-full text-sm">
                  {quizId ? (
                    quiz?.title
                  ) : (
                    <span className="text-muted-foreground">Select Quiz</span>
                  )}
                </CardTitle>
              </div>
            </div>
            <CardAction className="flex h-full items-center justify-center">
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm">
                  {open ? "Close" : "Edit"}
                  <ChevronDown className='size-4 shrink-0 transition-transform [[data-state="open"]>&]:rotate-180' />
                </Button>
              </CollapsibleTrigger>

              <Button
                onClick={removeItem}
                size="icon"
                variant="ghost"
                className="size-6"
              >
                <Trash2 />
              </Button>
            </CardAction>
          </CardHeader>
          <CollapsibleContent>
            <Separator className="mb-2" />
            <CardContent className="p-3">
              <FormField
                control={form.control}
                name={`sections.${index}.items.${itemIndex}.quizId`}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Quiz</FormLabel>
                    <div className="flex w-full items-end justify-between gap-2">
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl className="w-full">
                          <SelectTrigger>
                            <SelectValue placeholder="Select Quiz" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {quizzes.map((quiz) => (
                            <SelectItem key={quiz.id} value={quiz.id}>
                              {quiz.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Button variant="outline">
                        <Plus />
                        Create Quiz
                      </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </CollapsibleContent>
        </Collapsible>
      </Card>
    </div>
  );
};

export default CourseQuizItem;
