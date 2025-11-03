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
import { Input } from "@/components/UI/input";
import { Separator } from "@/components/UI/separator";
import {
  ChevronDown,
  FileWarning,
  GripVertical,
  Loader2,
  Plus,
  Trash2,
  Video,
} from "lucide-react";
import { useFieldArray, useFormContext } from "react-hook-form";
import React, { useState } from "react";
import { Textarea } from "@/components/UI/textarea";
import { useDraggable } from "@/hooks/useDraggable";
import CourseLectureItem from "./CourseLectureItem";
import DropZone from "@/components/UI/drop-zone";
import CourseQuizItem from "./CourseQuizItem";
import { generateId } from "@/util";
import { Label } from "@/components/UI/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/UI/Avatar";
import { getYouTubeVideoId } from "@/util/forms";
import { Switch } from "@/components/UI/switch";
import FileUploadInput from "@/components/UI/FileUploadInput";
import { Badge } from "@/components/UI/badge";
import {
  countByType,
  countErrorsMessage,
  getModuleInfo,
} from "../util/helpers";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/UI/Tooltip";
import { Step3FormData } from "../util/course.schema";

const DRAG_TYPE = "LIST_ITEM";
const LECTURE_DRAG_TYPE = "LECTURE_ITEM";
const ACCEPTS = [LECTURE_DRAG_TYPE];

type DropZoneData = {
  path: number;
};

const CourseSectionItem: React.FC<{
  section: Step3FormData["sections"][number] & { id: string };
  active: string | null;
  setActive: (id: string | null) => void;
  index: number;
  removeSection: () => void;
}> = ({ section, index, removeSection, active, setActive }) => {
  const form = useFormContext<Step3FormData>();

  const { dragRef, previewRef, opacity } = useDraggable(index, DRAG_TYPE);

  const {
    fields: items,
    append,
    swap,
    remove,
  } = useFieldArray({
    control: form.control,
    name: `sections.${index}.items`,
  });

  const [activeItem, setActiveItem] = useState<string | null>(
    items?.[0]?.itemId ?? null,
  );

  const handleDrop = (dropZone: DropZoneData, draggableItem: DropZoneData) => {
    const from = draggableItem.path;
    const to =
      dropZone.path === items.length ? items.length - 1 : dropZone.path;
    swap(from, to);
  };

  const [lectureLoading, setLectureLoading] = useState(false);
  const [lectureData, setLectureData] = useState<{
    title: string;
    videoUrl: string;
    materialUrl: string;
    isLectureFree: boolean;
  }>({
    title: "",
    videoUrl: "",
    materialUrl: "",
    isLectureFree: false,
  });

  const addQuiz = () => {
    const id = generateId();
    const item = {
      itemId: id,
      curriculumType: "quiz" as const,
      lecture: { title: "Quiz" },
      quizId: "",
    };
    append(item);
    setActiveItem(id);
  };
  const addLecture = async () => {
    const id = generateId();
    setLectureLoading(true);
    try {
      const item = {
        itemId: id,
        curriculumType: "lecture" as const,
        lecture: lectureData,
      };

      append(item);
      setActiveItem(id);
    } catch (error) {
      console.error("Failed to add lecture:", error);
    } finally {
      setLectureData({
        title: "",
        videoUrl: "",
        materialUrl: "",
        isLectureFree: false,
      });
      setLectureLoading(false);
    }
  };

  const open = active === section.sectionId;
  const { lecture, quiz } = countByType(items, "curriculumType");
  const error = form.formState?.errors?.sections?.[index]?.items;

  const { count, messages } = countErrorsMessage(
    form.formState.errors?.sections?.[index],
  );

  return (
    <div
      ref={previewRef} // drop target
      style={{ opacity }}
    >
      <Card className="overflow-hidden p-0">
        <Collapsible
          open={open}
          onOpenChange={(open) =>
            setActive(open ? section.sectionId || null : null)
          }
        >
          <CardHeader className="bg-gray-100 p-1 px-2">
            <div className="flex w-full items-center">
              <div ref={dragRef} tabIndex={-1} className="cursor-grabbing p-2">
                <GripVertical className="text-muted-foreground size-4" />{" "}
              </div>
              {count > 0 && (
                <Tooltip>
                  <TooltipTrigger>
                    <Badge
                      variant="destructive"
                      className="h-4 min-w-4 rounded-full px-0.5 text-xs tabular-nums"
                    >
                      {count}
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{messages.join(", ")}</p>
                  </TooltipContent>
                </Tooltip>
              )}
              <div className="flex-1">
                <CardTitle className="w-full text-sm">
                  <FormField
                    control={form.control}
                    name={`sections.${index}.name`}
                    defaultValue=""
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormControl>
                          <Input
                            variant="ghost1"
                            fieldSize="sm"
                            type="text"
                            placeholder="Section Name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardTitle>
                <CardDescription className="px-2 text-xs">
                  {error?.message ? (
                    <FormMessage>{error?.message}</FormMessage>
                  ) : (
                    getModuleInfo(lecture, quiz)
                  )}
                </CardDescription>
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
                onClick={removeSection}
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
                name={`sections.${index}.description`}
                defaultValue=""
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Section Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Section Description"
                        rows={3}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {items.map((item, itemIndex) => (
                <React.Fragment key={item.id}>
                  <DropZone
                    data={{ path: itemIndex }}
                    accepts={ACCEPTS}
                    onDrop={handleDrop}
                    className="min-h-2"
                  />
                  {item.curriculumType === "lecture" ? (
                    <CourseLectureItem
                      key={itemIndex}
                      index={index}
                      itemIndex={itemIndex}
                      item={item}
                      active={activeItem}
                      setActive={setActiveItem}
                      removeItem={() => remove(itemIndex)}
                    />
                  ) : (
                    <CourseQuizItem
                      key={itemIndex}
                      index={index}
                      itemIndex={itemIndex}
                      item={item}
                      active={activeItem}
                      setActive={setActiveItem}
                      removeItem={() => remove(itemIndex)}
                    />
                  )}
                </React.Fragment>
              ))}
              <DropZone
                data={{ path: items.length }}
                accepts={ACCEPTS}
                onDrop={handleDrop}
                className="min-h-2"
              />
            </CardContent>
            <Separator className="my-4" />
            <CardFooter className="justify-end pb-4">
              <CardAction className="flex gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">
                      <Video className="text-blue-400" />
                      Add Lecture
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="p-0 py-5 sm:max-w-xl">
                    <DialogHeader className="px-5">
                      <DialogTitle>Lecture Information</DialogTitle>
                      <DialogDescription>
                        You can set the Main information of the Lecture from
                        here. and update it later in the form
                      </DialogDescription>
                    </DialogHeader>
                    <Separator />

                    <div className="grid gap-4 px-5">
                      <div className="grid gap-3">
                        <Label htmlFor="name-1">Lecture Title</Label>
                        <Input
                          id="name-1"
                          name="name"
                          placeholder={`Enter Lecture Title eg. introduction to...`}
                          value={lectureData.title}
                          onChange={(e) =>
                            setLectureData((pv) => ({
                              ...pv,
                              title: e.target.value,
                            }))
                          }
                        />
                      </div>
                      <div className="grid gap-3">
                        <div className="w-full space-y-2">
                          <Label>Video Url</Label>
                          <div className="flex flex-1 rounded-md shadow-xs">
                            <Avatar className="border-input aspect-video h-9 w-auto rounded-md rounded-r-none border border-r-0">
                              <AvatarImage
                                src={
                                  getYouTubeVideoId(lectureData.videoUrl)
                                    ? `https://i.ytimg.com/vi/${getYouTubeVideoId(lectureData.videoUrl)}/maxresdefault.jpg`
                                    : undefined
                                }
                                alt={"Preview Video"}
                              />
                              <AvatarFallback>
                                <Video />
                              </AvatarFallback>
                            </Avatar>
                            <Input
                              placeholder="Enter Video url or id"
                              value={lectureData.videoUrl}
                              className="-me-px w-full rounded-l-none shadow-none focus-visible:z-1"
                              onChange={(e) =>
                                setLectureData((pv) => ({
                                  ...pv,
                                  videoUrl: e.target.value,
                                }))
                              }
                            />
                          </div>
                        </div>

                        <div className="w-full space-y-2">
                          <Label>Material Url</Label>
                          <FileUploadInput
                            value={lectureData.materialUrl}
                            onChange={(value) => {
                              if (typeof value === "string") {
                                setLectureData((pv) => ({
                                  ...pv,
                                  materialUrl: value,
                                }));
                              }
                            }}
                          />
                        </div>
                        <div className="flex gap-4">
                          <Switch
                            checked={lectureData.isLectureFree}
                            onCheckedChange={(value) =>
                              setLectureData((pv) => ({
                                ...pv,
                                isLectureFree: value,
                              }))
                            }
                          />
                          <div>
                            <Label>Free Lecture</Label>
                            <p className="text-muted-foreground text-sm">
                              Allow students to view this lecture without
                              enrolling in the course.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <Separator />
                    <DialogFooter className="px-5">
                      <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                      </DialogClose>
                      <DialogClose asChild>
                        <Button
                          onClick={addLecture}
                          disabled={lectureLoading || !lectureData.title}
                        >
                          {lectureLoading ? (
                            <>
                              <Loader2 className="animate-spin" />
                              Uploading File
                            </>
                          ) : (
                            <>
                              <Plus />
                              Add Lecture
                            </>
                          )}
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <Button onClick={addQuiz} variant="outline">
                  <FileWarning className="text-orange-400" />
                  Add Quiz
                </Button>
              </CardAction>
            </CardFooter>
          </CollapsibleContent>
        </Collapsible>
      </Card>
    </div>
  );
};

export default CourseSectionItem;
