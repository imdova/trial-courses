"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { step5SEOSchema, type Step5SEOFormData } from "../util/course.schema";
import { useCourseForm } from "../hooks/useCourseForm";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/UI/form";
import { Input } from "@/components/UI/input";
import { Textarea } from "@/components/UI/textarea";
import { Button } from "@/components/UI/button";
import MultiTextInput from "@/components/UI/MultiTextInput";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/UI/card";
import { useAutosave } from "../hooks/use-autosave";
import PreventLeaveDialog from "@/components/UI/PreventLeaveDialog";
import { hasFormErrors } from "@/util/forms";
import { useState, useEffect } from "react";
import { Check, TriangleAlertIcon } from "lucide-react";
import UploadArea from "@/components/UI/UploadArea";
import { CourseStepsToCourseFormType } from "../util/transformToCourseForm";
import { useInstructorCourse } from "@/hooks/useInstructorCourse";
import { CourseItem } from "@/types/courses";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/UI/alert-dialog";
import Link from "next/link";
import { clearCourseFromIndexedDB } from "../util/db";

const getDefaultValues = (): Step5SEOFormData => ({
  metaTitle: "",
  metaKeywords: [],
  metaDescription: "",
  metaImage: "",
});

export function Step5SEO() {
  const { 
    setSEO, 
    seo, 
    courseInfo,
    courseDetails,
    courseCurriculum,
    setCurrentStep,
    courseId,
    resetForm,
    completedSteps,
    setCompletedSteps,
  } = useCourseForm();
  const [stepError, setStepError] = useState<string | null>(null);
  const [createdCourse, setCreatedCourse] = useState<CourseItem | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSEOCompleted, setIsSEOCompleted] = useState(false);

  const {
    createNewCourse,
    updateFullExistingCourse,
    loading,
    error,
    clearCourseError,
  } = useInstructorCourse();

  const form = useForm<Step5SEOFormData>({
    resolver: zodResolver(step5SEOSchema),
    defaultValues: seo || getDefaultValues(),
  });

  const values = form.watch();
  const isDirty = form.formState.isDirty;

  const { saveToIndexDB } = useAutosave({
    values: { seo: values },
    isDirty: isDirty,
    reset: () => form.reset(values),
    preventSaving: hasFormErrors(form.formState.errors),
  });

  // Mark Preview step (step 3) as completed when SEO step loads
  useEffect(() => {
    if (!completedSteps.includes(3)) {
      setCompletedSteps([...completedSteps, 3]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Check if SEO data already exists (when editing a course)
  useEffect(() => {
    if (seo && seo.metaTitle && seo.metaKeywords && seo.metaKeywords.length > 0 && seo.metaDescription) {
      setIsSEOCompleted(true);
    }
  }, [seo]);

  // Reset completion status if form becomes dirty (user is editing)
  useEffect(() => {
    if (isDirty && isSEOCompleted) {
      setIsSEOCompleted(false);
    }
  }, [isDirty, isSEOCompleted]);

  const onSubmit = async (data: Step5SEOFormData) => {
    setSEO(data);
    saveToIndexDB({ seo: data });
    setIsSEOCompleted(true);
    // Note: onSuccess is not called here since we're handling publish in this step
  };

  const PublishCourse = async () => {
    if (completedSteps.length < 4) {
      setStepError(
        `Please Complete all the steps before trying to ${courseId ? "update" : "create"} course `,
      );
      return;
    }

    const values = CourseStepsToCourseFormType({
      courseInfo,
      courseDetails,
      courseCurriculum,
      seo: form.getValues(),
    });
    if (!values) return null;

    if (courseId) {
      const updatedCourse = await updateFullExistingCourse(courseId, values);
      if (updatedCourse) {
        setCreatedCourse(updatedCourse);
        setIsSuccess(true);
      }
    } else {
      const newCourse = await createNewCourse(values);
      if (newCourse) {
        setCreatedCourse(newCourse);
        setIsSuccess(true);
      }
    }
  };

  return (
    <>
      <CourseSuccessAlertDialog
        isEdit={Boolean(courseId)}
        course={createdCourse}
        open={isSuccess}
        onClick={() => {
          resetForm();
          clearCourseFromIndexedDB();
        }}
      />
      <CourseErrorAlertDialog
        isEdit={Boolean(courseId)}
        message={error || stepError}
        onOpenChange={() => {
          clearCourseError();
          setStepError(null);
        }}
      />
      <Form {...form}>
        <form
          id="seo"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
          noValidate
        >
          <PreventLeaveDialog />
        
        <div className="grid gap-6 lg:grid-cols-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold">SEO Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Meta Title */}
              <FormField
                control={form.control}
                name="metaTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Meta Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter Meta Title"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Meta Keywords */}
              <FormField
                control={form.control}
                name="metaKeywords"
                defaultValue={[]}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Meta Keywords</FormLabel>
                    <FormControl>
                      <MultiTextInput
                        type="text"
                        placeholder="Type keyword and press Enter or comma"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Meta Description */}
              <FormField
                control={form.control}
                name="metaDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Meta Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter meta description"
                        className="min-h-[100px]"
                        rows={4}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Meta Image */}
              <FormField
                control={form.control}
                name="metaImage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Meta Image</FormLabel>
                    <FormControl>
                      <UploadArea
                        {...field}
                        aspectRatio={16 / 9}
                        maxSize={10}
                        acceptedFileTypes={["image/jpeg", "image/png", "image/gif", "image/webp"]}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
        </div>

        {/* Form Navigation */}
        <div className="flex justify-between pt-6">
          <Button
            type="button"
            variant="outline"
            onClick={() => setCurrentStep(3)}
          >
            Back: (4) Preview
          </Button>
          
          {!isSEOCompleted ? (
            <Button type="submit" className="bg-green-600 hover:bg-green-700">
              Complete SEO Setup
            </Button>
          ) : (
            <Button 
              type="button" 
              className="bg-green-600 hover:bg-green-700"
              onClick={PublishCourse}
              disabled={loading}
            >
              {loading ? "Loading..." : courseId ? "Update Course" : "Publish Course"}
            </Button>
          )}
        </div>
      </form>
    </Form>
    </>
  );
}

const CourseSuccessAlertDialog: React.FC<{
  isEdit: boolean;
  course: CourseItem | null;
  open: boolean;
  onClick: () => void;
}> = ({ course, open, onClick, isEdit }) => {
  return (
    <AlertDialog open={open && Boolean(course)}>
      <AlertDialogContent>
        <AlertDialogHeader className="items-center text-center">
          <div className="bg-primary/10 mx-auto mb-3 flex items-center justify-center rounded-full p-3">
            <Check className="text-primary size-12" />
          </div>

          <AlertDialogTitle className="text-lg font-semibold">
            {isEdit
              ? "Course Updated Successfully 🎉"
              : "Course Created Successfully 🎉"}
          </AlertDialogTitle>

          <AlertDialogDescription className="text-muted-foreground text-center">
            {isEdit ? (
              <span>
                Congratulations! Your course{" "}
                <strong className="text-primary">{course?.name}</strong> has has
                been successfully updated.
              </span>
            ) : (
              <span>
                Congratulations! Your course{" "}
                <strong className="text-primary">{course?.name}</strong> has
                been successfully created.
              </span>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="flex justify-center gap-3 pt-4">
          <AlertDialogAction variant="outline" onClick={onClick} asChild>
            <Link href="/instructor/courses/">Back to Courses</Link>
          </AlertDialogAction>
          <AlertDialogAction onClick={onClick} asChild>
            <Link href={`/courses/${course?.slug}`}>
              {isEdit ? "View Updated Course" : "View Course"}
            </Link>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

const CourseErrorAlertDialog: React.FC<{
  isEdit: boolean;
  message?: string | null;
  onOpenChange: () => void;
}> = ({ message, isEdit, onOpenChange }) => {
  return (
    <AlertDialog open={Boolean(message)} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader className="items-center text-center">
          <div className="bg-destructive/10 mx-auto mb-3 flex items-center justify-center rounded-full p-3">
            <TriangleAlertIcon className="text-destructive size-12" />
          </div>
          <AlertDialogTitle className="text-lg font-semibold">
            {isEdit ? "Course Update failed" : "Course Creation failed"}
          </AlertDialogTitle>

          <AlertDialogDescription className="text-muted-foreground text-center">
            {message}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex justify-center gap-3 pt-4">
          <AlertDialogCancel variant="destructive">ok</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
