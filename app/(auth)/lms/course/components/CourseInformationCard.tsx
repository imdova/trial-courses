import { useFormContext } from "react-hook-form";
import { Card, CardContent } from "@/components/UI/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/UI/form";
import { Input } from "@/components/UI/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/UI/select";
import { useCoursesCategories } from "@/hooks/useCoursesCategories";
import { OptionSelect } from "@/types";
import RecordAccessFields from "./RecordAccessFields";
import NonRecordAccessFields from "./NonRecordAccessFields";
import { Step1FormData } from "../util/course.schema";

const courseTypeOptions: OptionSelect[] = [
  { value: "recorded", label: "Recorded" },
  { value: "live", label: "Live" },
  { value: "offline", label: "Offline" },
  { value: "hybrid", label: "Hybrid (Live + Offline)" },
];

const programTypeOptions: OptionSelect[] = [
  { value: "course", label: "Course" },
  { value: "certificate_of_achievement", label: "Certificate of Achievement" },
  { value: "professional_diploma", label: "Professional Diploma" },
  { value: "master", label: "Master" },
  { value: "doctorate", label: "Doctorate" },
];

const CourseInformationCard: React.FC = () => {
  const form = useFormContext<Step1FormData>();
  const category = form.watch("category");
  const courseType = form.watch("type");

  const { categories, subCategories } = useCoursesCategories(category);
  const isRecorded = courseType === "recorded";

  return (
    <Card className="space-y-6">
      <CardContent className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Course Name</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Enter the name of your course"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex w-full items-start gap-3">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Category</FormLabel>
                <Select
                  onValueChange={(value) => field.onChange(value)}
                  value={field.value}
                >
                  <FormControl className="w-full">
                    <SelectTrigger>
                      <SelectValue placeholder="Select course category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="subcategory"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Subcategory</FormLabel>
                <Select
                  onValueChange={(value) => field.onChange(value)}
                  value={field.value}
                  disabled={!subCategories.length && !field.value}
                >
                  <FormControl className="w-full">
                    <SelectTrigger>
                      <SelectValue placeholder="Select course subcategory" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {subCategories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex w-full items-start gap-3">
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem className="w-1/2">
                <FormLabel>Course Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl className="w-full">
                    <SelectTrigger>
                      <SelectValue placeholder="Select Course Type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {courseTypeOptions.map((option) => (
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
          <FormField
            control={form.control}
            name="programType"
            render={({ field }) => (
              <FormItem className="w-1/2">
                <FormLabel>Program Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl className="w-full">
                    <SelectTrigger>
                      <SelectValue placeholder="Select Program Type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {programTypeOptions.map((option) => (
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
        </div>
        {isRecorded ? <RecordAccessFields /> : <NonRecordAccessFields />}
      </CardContent>
    </Card>
  );
};

export default CourseInformationCard;
