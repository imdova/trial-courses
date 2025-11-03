import { Button } from "@/components/UI/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/UI/card";
import { Plus } from "lucide-react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import React, { useEffect, useState } from "react";
import DropZone from "@/components/UI/drop-zone";
import CourseSectionItem from "./CourseSectionItem";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/UI/dialog";
import { Label } from "@/components/UI/label";
import { Input } from "@/components/UI/input";
import { generateId } from "@/util";
import { FormDescription } from "@/components/UI/form";
import { Separator } from "@/components/UI/separator";
import { useQuiz } from "@/app/(auth)/instructor/quizzes/hooks/useQuiz";
import { Step3FormData } from "../util/course.schema";
import TextEditor from "@/components/editor/editor";

type DropZoneData = {
  path: number;
};

const DRAG_TYPE = "LIST_ITEM";
const ACCEPTS = [DRAG_TYPE];

const CourseSectionsCard = () => {
  const { getQuizzes } = useQuiz();

  const form = useFormContext<Step3FormData>();
  const {
    fields: sections,
    append,
    remove,
    swap,
  } = useFieldArray({
    control: form.control,
    name: "sections",
  });

  const [active, setActive] = useState<string | null>(
    sections[0]?.sectionId || null,
  );

  const handleDrop = (dropZone: DropZoneData, draggableItem: DropZoneData) => {
    const from = draggableItem.path;
    const to =
      dropZone.path === sections.length ? sections.length - 1 : dropZone.path;
    swap(from, to);
  };

  const [sectionData, setSectionData] = useState({
    title: "",
    description: "",
  });

  const addSection = () => {
    const id = generateId();
    append({
      sectionId: id,
      name: sectionData.title,
      description: sectionData.description,
      items: [],
    });
    setActive(id);
    setSectionData({
      title: "",
      description: "",
    });
  };

  useEffect(() => {
    getQuizzes();
  }, [getQuizzes]);

  const error = form.formState?.errors?.sections;

  return (
    <DndProvider backend={HTML5Backend}>
      <Card>
        <CardHeader>
          <CardTitle>Course Curriculum & Structure</CardTitle>
          <CardDescription>
            Build your course structure with modules, lectures, and resources
          </CardDescription>
        </CardHeader>
        <CardContent>
          {sections.map((section, index) => (
            <React.Fragment key={section.id}>
              <DropZone
                data={{ path: index }}
                accepts={ACCEPTS}
                onDrop={handleDrop}
                className="min-h-2"
              />
              <CourseSectionItem
                key={section.id}
                section={section}
                active={active}
                setActive={setActive}
                index={index}
                removeSection={() => remove(index)}
              />
            </React.Fragment>
          ))}
          <DropZone
            data={{ path: sections.length }}
            accepts={ACCEPTS}
            onDrop={handleDrop}
            className="min-h-2"
          />
        </CardContent>
        <CardFooter className={error ? "justify-between" : "justify-end"}>
          {error && (
            <FormDescription className="text-destructive">
              {error?.message}
            </FormDescription>
          )}
          <CardAction>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Plus />
                  Add Section
                </Button>
              </DialogTrigger>
              <DialogContent className="p-0 py-5 sm:max-w-xl">
                <DialogHeader className="px-5">
                  <DialogTitle>Section Information</DialogTitle>
                  <DialogDescription>
                    You can set the Main information of the section from here.
                    and update it later in the form
                  </DialogDescription>
                </DialogHeader>
                <Separator />
                <div className="grid gap-4 px-5">
                  <div className="grid gap-3">
                    <Label htmlFor="name-1">Section Name</Label>
                    <Input
                      id="name-1"
                      name="name"
                      placeholder={`module ${sections.length + 1}`}
                      value={sectionData.title}
                      onChange={(e) =>
                        setSectionData({
                          ...sectionData,
                          title: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="description">Description Name</Label>
                    <TextEditor
                      hasLinks={false}
                      value={sectionData.description}
                      wrapperClassName="max-h-[40vh] py-4 overflow-y-auto"
                      onChange={(e) =>
                        setSectionData({
                          ...sectionData,
                          description: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <Separator />
                <DialogFooter className="px-5">
                  <DialogClose asChild>
                    <Button
                      onClick={() =>
                        setSectionData({
                          title: "",
                          description: "",
                        })
                      }
                      variant="outline"
                    >
                      Cancel
                    </Button>
                  </DialogClose>
                  <DialogClose asChild>
                    <Button disabled={!sectionData.title} onClick={addSection}>
                      <Plus />
                      Add Section
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardAction>
        </CardFooter>
      </Card>
    </DndProvider>
  );
};

export default CourseSectionsCard;
