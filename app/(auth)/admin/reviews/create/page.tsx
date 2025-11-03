"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  ArrowLeft,
  Star,
  X,
  ChevronDownIcon,
  Save,
  LogOut,
  ImageIcon,
  Check,
  ChevronsUpDown,
} from "lucide-react";
import { Button } from "@/components/UI/button";
import { Input } from "@/components/UI/input";
import { Label } from "@/components/UI/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/UI/select";
import { Textarea } from "@/components/UI/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/UI/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/UI/command";
import { cn } from "@/util";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/UI/form";
import { Calendar } from "@/components/UI/calendar";
import { Card } from "@/components/UI/card";
import Image from "next/image";

// Zod validation schema
const reviewFormSchema = z.object({
  course: z.string().min(1, "Course is required"),
  student: z.string().min(1, "Student is required"),
  rating: z.number().min(1, "Rating is required").max(5, "Maximum rating is 5"),
  comment: z.string().min(10, "Comment must be at least 10 characters"),
  status: z.enum(["published", "pending", "rejected"]),
  images: z.array(z.instanceof(File)).optional(),
  createdAt: z.date().optional(),
});

type ReviewFormValues = z.infer<typeof reviewFormSchema>;

// Sample courses and students for form
const courses = [
  { id: "c1", name: "React Fundamentals", instructor: "John Doe" },
  { id: "c2", name: "Advanced TypeScript", instructor: "Jane Smith" },
  { id: "c3", name: "Next.js Masterclass", instructor: "Mike Johnson" },
  { id: "c4", name: "Tailwind CSS", instructor: "Sarah Williams" },
  { id: "c5", name: "Node.js Backend", instructor: "David Brown" },
];

// const students = [
//   { id: "s1", name: "Alice Johnson", email: "alice@example.com" },
//   { id: "s2", name: "Bob Smith", email: "bob@example.com" },
//   { id: "s3", name: "Charlie Brown", email: "charlie@example.com" },
//   { id: "s4", name: "Diana Prince", email: "diana@example.com" },
//   { id: "s5", name: "Edward Davis", email: "edward@example.com" },
// ];

// Date Selector Component
const DateSelector: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({
  onChange,
  value,
  placeholder,
}) => {
  const date = value as Date | string | undefined;
  const [open, setOpen] = useState(false);

  const handleChange = (value?: Date) => {
    if (onChange && value) {
      const syntheticEvent = {
        target: { value: value.toISOString() },
      } as unknown as React.ChangeEvent<HTMLInputElement>;
      onChange(syntheticEvent);
    }
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant="outline"
            className="w-full justify-between font-normal"
          >
            {date
              ? new Date(date).toLocaleDateString()
              : placeholder || "Pick a date"}
            <ChevronDownIcon className="h-4 w-4 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date ? new Date(date) : undefined}
          onSelect={handleChange}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

// Image Drag & Drop Component
function ImageUpload({
  onFilesChange,
}: {
  onFilesChange: (files: File[]) => void;
}) {
  const [isDragging, setIsDragging] = useState(false);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files).filter((file) =>
      file.type.startsWith("image/"),
    );

    processFiles(files);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []).filter((file) =>
      file.type.startsWith("image/"),
    );
    processFiles(files);
  };

  const processFiles = (files: File[]) => {
    if (files.length === 0) return;

    const newPreviewUrls = files.map((file) => URL.createObjectURL(file));
    setPreviewUrls((prev) => [...prev, ...newPreviewUrls]);
    onFilesChange([...previewUrls.map((_, i) => files[i]), ...files]);
  };

  const removeImage = (index: number) => {
    const newPreviewUrls = previewUrls.filter((_, i) => i !== index);
    setPreviewUrls(newPreviewUrls);
    onFilesChange(
      newPreviewUrls.map((url, i) => {
        // This is a simplified approach - in a real app, you'd want to maintain File objects
        return new File([], `image-${i}.jpg`);
      }),
    );
  };

  return (
    <div className="space-y-4">
      <div
        className={`rounded-lg border-2 border-dashed p-8 text-center transition-colors ${
          isDragging
            ? "border-green-400 bg-green-50"
            : "border-gray-300 bg-gray-50"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center space-y-3">
          <ImageIcon className="h-12 w-12 text-gray-400" />
          <div className="text-center text-sm text-gray-600">
            <Label
              htmlFor="file-upload"
              className="cursor-pointer text-sm font-medium text-green-600 hover:text-green-500"
            >
              Click to upload
            </Label>{" "}
            or drag and drop
          </div>
          <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB each</p>
          <Input
            id="file-upload"
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>
      </div>

      {previewUrls.length > 0 && (
        <div className="grid grid-cols-3 gap-4">
          {previewUrls.map((url, index) => (
            <div key={index} className="group relative">
              <Image
                src={url}
                fill
                alt={`Preview ${index + 1}`}
                className="h-24 w-full rounded-md object-cover"
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute -top-2 -right-2 rounded-full bg-red-500 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function CreateReviewPage() {
  const router = useRouter();
  const [hoverRating, setHoverRating] = useState(0);

  const form = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewFormSchema),
    defaultValues: {
      course: "",
      student: "",
      rating: 0,
      comment: "",
      status: "pending",
      images: [],
      createdAt: new Date(), // Default to current date
    },
  });

  const onSubmit = (data: ReviewFormValues) => {
    console.log("Form data:", data);
    alert("Review created successfully!");
  };

  const onSubmitAndExit = (data: ReviewFormValues) => {
    onSubmit(data);
    router.push("/admin/reviews");
  };

  return (
    <div>
      <div>
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="mb-6 flex items-center gap-2"
        >
          <ArrowLeft size={16} /> Back to Reviews
        </Button>

        <div className="px-4">
          <div className="mb-8">
            <h1 className="text-xl font-bold text-gray-900">
              Create New Review
            </h1>
            <p className="mt-1 text-sm text-gray-600">
              Add a new course review from a student
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-8">
                <Card className="col-span-5 grid gap-6 p-3">
                  {/* Course Field - Searchable */}
                  <FormField
                    control={form.control}
                    name="course"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Course</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                role="combobox"
                                className={cn(
                                  "w-full justify-between",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value
                                  ? courses.find(
                                      (course) => course.id === field.value
                                    )?.name
                                  : "Select a course"}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-full p-0">
                            <Command>
                              <CommandInput placeholder="Search courses..." />
                              <CommandEmpty>No course found.</CommandEmpty>
                              <CommandGroup>
                                {courses.map((course) => (
                                  <CommandItem
                                    value={course.name}
                                    key={course.id}
                                    onSelect={() => {
                                      form.setValue("course", course.id);
                                    }}
                                  >
                                    <Check
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        course.id === field.value
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                    {course.name} - {course.instructor}
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </Command>
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Student Field */}
                  <FormField
                    control={form.control}
                    name="student"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Student</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter student name or email"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Rating Field */}
                  <FormField
                    control={form.control}
                    name="rating"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Rating</FormLabel>
                        <FormControl>
                          <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                size={24}
                                className={`cursor-pointer ${
                                  star <= (hoverRating || field.value)
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-300"
                                }`}
                                onClick={() => field.onChange(star)}
                                onMouseEnter={() => setHoverRating(star)}
                                onMouseLeave={() => setHoverRating(0)}
                              />
                            ))}
                            <span className="ml-2 text-sm text-gray-600">
                              ({field.value || "Not rated"})
                            </span>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Comment Field */}
                  <FormField
                    control={form.control}
                    name="comment"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Comment</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter the student's review comments"
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Minimum 10 characters required
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Image Upload Field */}
                  <FormField
                    control={form.control}
                    name="images"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Image</FormLabel>
                        <FormControl>
                          <ImageUpload onFilesChange={field.onChange} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Status Field */}
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="published">Published</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="rejected">Rejected</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </Card>
                <div className="col-span-3 space-y-4">
                  <Card className="p-3">
                    <FormLabel className="border-b pb-2">Publish</FormLabel>
                    {/* Buttons */}
                    <div className="mt-4 flex gap-4">
                      <Button className="flex-1" type="submit">
                        <Save size={14} /> Save
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        className="flex-1"
                        onClick={() => form.handleSubmit(onSubmitAndExit)()}
                      >
                        <LogOut size={14} /> Save & Exit
                      </Button>
                    </div>
                  </Card>
                  <Card className="p-3">
                    {/* Created At Field */}
                    <FormField
                      control={form.control}
                      name="createdAt"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="border-b pb-2">
                            Created At
                          </FormLabel>
                          <FormControl>
                            <DateSelector
                              value={
                                field.value ? field.value.toISOString() : ""
                              }
                              onChange={field.onChange}
                              placeholder="Select creation date"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </Card>
                </div>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
