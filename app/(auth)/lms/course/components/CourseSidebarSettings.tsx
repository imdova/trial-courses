import { Plus, Video } from "lucide-react";
import { OptionSelect } from "@/types";
import { useFormContext } from "react-hook-form";
import { Card, CardContent } from "@/components/UI/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/UI/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/UI/select";
import MultiTextInput from "@/components/UI/MultiTextInput";
import { Input } from "@/components/UI/input";
import UploadArea from "@/components/UI/UploadArea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/UI/Avatar";
import { getYouTubeVideoId } from "@/util/forms";
import { Step1FormData } from "../util/course.schema";
import { useEffect } from "react";
import { Button } from "@/components/UI/button";
import { AcademyInstructor } from "@/types/academy";
import StringMultipleSelector from "@/components/UI/StringMultipleSelector";
import { useAcademyInstructors } from "@/hooks/useAcademyInstructors";
import { useSession } from "next-auth/react";

const levelOptions: OptionSelect[] = [
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
];

const LANGUAGES = [
  "Arabic",
  "English",
  "Bengali",
  "Chinese",
  "Dutch",
  "French",
  "German",
  "Hindi",
  "Indonesian",
  "Italian",
  "Japanese",
  "Korean",
  "Malay",
  "Norwegian",
  "Polish",
  "Portuguese",
  "Russian",
  "Spanish",
  "Swedish",
  "Tamil",
  "Telugu",
  "Thai",
  "Turkish",
  "Ukrainian",
  "Vietnamese",
];

export const CourseSidebarSettings: React.FC<{
  setOpenDialog: (open: boolean) => void;
  setItem: (item: Partial<AcademyInstructor> | null) => void;
}> = ({ setOpenDialog, setItem }) => {
  const form = useFormContext<Step1FormData>();
  const { getAcademyInstructors, instructors } = useAcademyInstructors();
  const { data: session } = useSession();
  const isAcademyUser = session?.user?.type === "academy_admin" || session?.user?.hasAcademy;

  useEffect(() => {
    getAcademyInstructors();
  }, [getAcademyInstructors]);

  return (
    <div className="space-y-2">
      <Card>
        <CardContent className="space-y-4">
          <FormField
            control={form.control}
            name="courseImage"
            defaultValue=""
            render={({ field }) => (
              <FormItem>
                <FormLabel>Course Image</FormLabel>
                <FormControl>
                  <UploadArea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="previewVideo"
            defaultValue=""
            render={({ field }) => (
              <FormItem>
                <div className="w-full space-y-2">
                  <FormLabel>Preview Video</FormLabel>
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
                    <Input
                      placeholder="Enter Video url"
                      className="-me-px w-full rounded-l-none shadow-none focus-visible:z-1"
                      {...field}
                    />
                  </div>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>
      <Card>
        <CardContent className="space-y-2">
          {isAcademyUser && (
            <FormField
              control={form.control}
              name="academyInstructorIds"
              render={({ field }) => (
                <FormItem className="w-full grid-cols-1">
                  <div className="flex w-full items-center justify-between">
                    <FormLabel>Instructors</FormLabel>
                    <Button
                      variant="outline"
                      size="iconSm"
                      onClick={() => setOpenDialog(true)}
                    >
                      <Plus />
                      <span className="sr-only">Add</span>
                    </Button>
                  </div>
                  <StringMultipleSelector
                    options={instructors.map((instructor) => ({
                      value: instructor.id,
                      image: instructor.photoUrl,
                      label: instructor.name,
                    }))}
                    type="avatar"
                    value={field.value}
                    creatable
                    onCreate={(value) => {
                      setOpenDialog(true);
                      setItem({ name: value });
                    }}
                    onChange={field.onChange}
                    avatarClassName="aspect-square size-5 rounded-full"
                    placeholder="Instructors"
                    optionClassName="text-xs"
                    emptyIndicator={
                      <p className="text-center text-sm">type to create</p>
                    }
                    inputProps={{
                      className:
                        "-me-px rounded-r-none shadow-none focus-visible:z-1",
                    }}
                    className="w-full"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <FormField
            control={form.control}
            name="level"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Course Level</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value || ""}
                >
                  <FormControl className="w-full">
                    <SelectTrigger>
                      <SelectValue placeholder="Select course level" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {levelOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* languages */}
          <FormField
            control={form.control}
            name="languages"
            defaultValue={[]}
            render={({ field }) => (
              <FormItem className="w-full grid-cols-1">
                <FormLabel>Course Languages</FormLabel>
                <FormControl>
                  <StringMultipleSelector
                    defaultOptions={LANGUAGES.map((lang) => ({
                      value: lang,
                      label: lang,
                    }))}
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Select Languages"
                    emptyIndicator={
                      <p className="text-center text-sm">No Language found</p>
                    }
                    className="w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="tags"
            defaultValue={[]}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Course Tags</FormLabel>
                <FormControl>
                  <MultiTextInput
                    type="text"
                    placeholder="Type tag and press Enter or comma"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>
    </div>
  );
};
