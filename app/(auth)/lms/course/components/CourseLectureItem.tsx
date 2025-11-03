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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/UI/form";
import { Input } from "@/components/UI/input";
import { Separator } from "@/components/UI/separator";
import { ChevronDown, GripVertical, Trash2, Video } from "lucide-react";
import { useFormContext } from "react-hook-form";
import React from "react";
import { useDraggable } from "@/hooks/useDraggable";
import { Switch } from "@/components/UI/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/UI/Avatar";
import { getYouTubeVideoId } from "@/util/forms";
import FileUploadInput from "@/components/UI/FileUploadInput";
import { countErrors } from "../util/helpers";
import { Badge } from "@/components/UI/badge";
import { Step3FormData } from "../util/course.schema";

const LECTURE_DRAG_TYPE = "LECTURE_ITEM";

const CourseLectureItem = ({
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
  const form = useFormContext<Step3FormData>();
  const { dragRef, previewRef, opacity } = useDraggable(
    itemIndex,
    LECTURE_DRAG_TYPE,
  );

  const open = active === item.itemId;
  const errors = countErrors(
    form.formState.errors?.sections?.[index]?.items?.[itemIndex],
  );

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
              <div className="relative py-2">
                <Video className="size-4 text-blue-400" />
                {errors > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute top-0 right-0 h-4 min-w-4 rounded-full px-0.5 text-xs tabular-nums"
                  >
                    {errors || 0}
                  </Badge>
                )}
              </div>
              <div className="flex-1">
                <CardTitle className="w-full text-sm">
                  <FormField
                    control={form.control}
                    name={`sections.${index}.items.${itemIndex}.lecture.title`}
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormControl>
                          <Input
                            variant="ghost1"
                            fieldSize="sm"
                            type="text"
                            placeholder="Lecture Name"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
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
            <CardContent className="space-y-4 p-3">
              <FormField
                control={form.control}
                name={`sections.${index}.items.${itemIndex}.lecture.videoUrl`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Video URL</FormLabel>
                    <div className="flex flex-1 rounded-md shadow-xs">
                      <Avatar className="border-input aspect-video h-9 w-auto rounded-md rounded-r-none border border-r-0">
                        <AvatarImage
                          src={
                            getYouTubeVideoId(field.value)
                              ? `https://i.ytimg.com/vi/${getYouTubeVideoId(field.value)}/maxresdefault.jpg`
                              : undefined
                          }
                          alt={"Preview Video"}
                        />
                        <AvatarFallback>
                          <Video />
                        </AvatarFallback>
                      </Avatar>
                      <FormControl>
                        <Input
                          placeholder="Enter Video url or id"
                          className="-me-px w-full rounded-l-none shadow-none focus-visible:z-1"
                          {...field}
                        />
                      </FormControl>
                    </div>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`sections.${index}.items.${itemIndex}.lecture.materialUrl`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Material URL</FormLabel>
                    <FileUploadInput {...field} />
                    <FormDescription>
                      Upload file pdf, docx, txt
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`sections.${index}.items.${itemIndex}.lecture.isLectureFree`}
                defaultValue={false}
                render={({ field }) => (
                  <FormItem>
                    <div className="flex gap-4">
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div>
                        <FormLabel>Free Lecture</FormLabel>
                        <FormDescription>
                          Allow students to view this lecture without enrolling
                          in the course.
                        </FormDescription>
                      </div>
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

export default CourseLectureItem;
