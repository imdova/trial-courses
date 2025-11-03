import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/UI/Tabs";
import { Card } from "@/components/UI/card";
import { ScrollArea, ScrollBar } from "@/components/UI/scroll-area";
import YouTubePlayer from "@/components/UI/youtube-video-player";
import CourseOverviewTab from "@/app/(public)/courses/components/CourseOverviewTab";
import ReviewTab from "@/app/(public)/courses/components/ReviewTab";
import CourseSidebar from "@/app/(public)/courses/[slug]/course_sidebar";
import { useCourseForm } from "../hooks/useCourseForm";
import { useCoursesCategories } from "@/hooks/useCoursesCategories";
import {
  CourseStepsToCourseFormType,
  CourseStepsToCourseItem,
} from "../util/transformToCourseForm";
import InstructorsCard from "@/app/(public)/courses/components/InstructorsTab";
import { useSession } from "next-auth/react";
import { InstructorType } from "@/types/instructor-type";
import useFetch from "@/hooks/useFetch";
import { API_GET_INSTRUCTOR_BY_USERNAME } from "@/constants/api/instructor";
import { FormNavigation } from "./form-navigation";
import { useInstructorCourse } from "@/hooks/useInstructorCourse";
import { CourseItem } from "@/types/courses";
import { useState } from "react";
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
import { Check, TriangleAlertIcon } from "lucide-react";
import Link from "next/link";
import { clearCourseFromIndexedDB } from "../util/db";

interface Step4PreviewProps {
  showPublishButton?: boolean;
}

export const Step4Preview = ({ showPublishButton = true }: Step4PreviewProps) => {
  const [stepError, setStepError] = useState<string | null>(null);
  const [createdCourse, setCreatedCourse] = useState<CourseItem | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const {
    courseInfo,
    courseDetails,
    courseCurriculum,
    setCurrentStep,
    courseId,
    resetForm,
    completedSteps,
  } = useCourseForm();

  const {
    createNewCourse,
    updateFullExistingCourse,
    loading,
    error,
    clearCourseError,
  } = useInstructorCourse();
  const { categories, subCategories } = useCoursesCategories();
  const { data: session } = useSession();
  const user = session?.user;
  const { data: instructor } = useFetch<InstructorType>(
    user?.userName ? API_GET_INSTRUCTOR_BY_USERNAME + user?.userName : null,
  );

  const course = CourseStepsToCourseItem({
    courseInfo,
    courseDetails,
    courseCurriculum,
    categories,
    subcategories: subCategories,
    instructor,
  });

  const PublishCourse = async () => {
    if (completedSteps.length < 3) {
      setStepError(
        `Please Complete all the steps before trying to ${courseId ? "update" : "create"} course `,
      );
      return;
    }

    const values = CourseStepsToCourseFormType({
      courseInfo,
      courseDetails,
      courseCurriculum,
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

  if (!course) return null;
  return (
    <main className="container mx-auto space-y-8 px-5 lg:max-w-[1170px]">
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
      <h1 className="h-12 text-center text-2xl font-bold md:text-start md:text-3xl">
        {course.name}
      </h1>
      <div className="my-8 flex flex-col gap-4 md:flex-row">
        <div className="flex-1 space-y-4">
          <YouTubePlayer
            videoUrl={course.previewVideo}
            autoPlay
            priority
            className="aspect-video h-auto w-full"
          />
          <div>
            <Tabs defaultValue="Overview">
              <Card className="p-0">
                <ScrollArea className="grid max-w-full p-0">
                  <TabsList>
                    <TabsTrigger value="Overview">Overview</TabsTrigger>
                    <TabsTrigger value="Instructors">Instructors</TabsTrigger>
                    <TabsTrigger value="Reviews">Reviews</TabsTrigger>
                    <TabsTrigger value="Certification">
                      Certification
                    </TabsTrigger>
                  </TabsList>
                  <ScrollBar orientation="horizontal" />
                </ScrollArea>
              </Card>

              <TabsContent value="Overview">
                <CourseOverviewTab course={course} />
              </TabsContent>
              <TabsContent value="Instructors">
                <InstructorsCard
                  name={instructor?.firstName + " " + instructor?.lastName}
                  photo={instructor?.photoUrl || ""}
                  studentCount={0}
                  rating={0}
                  courseCount={0}
                  reviewCount={0}
                />
              </TabsContent>
              <TabsContent value="Reviews">
                <ReviewTab course={course} />
              </TabsContent>
              <TabsContent value="Certification">certification</TabsContent>
            </Tabs>
          </div>
        </div>
        <CourseSidebar course={course} />
      </div>
      {showPublishButton ? (
        <FormNavigation
          currentStep={3}
          nextLabel={
            loading ? "Loading..." : courseId ? "Update Course" : "Publish Course"
          }
          backLabel="Back: (3) Curriculum"
          onBack={() => setCurrentStep(2)}
          onNext={PublishCourse}
        />
      ) : (
        <FormNavigation
          currentStep={3}
          nextLabel="Next: (5) SEO"
          backLabel="Back: (3) Curriculum"
          onBack={() => setCurrentStep(2)}
          onNext={() => setCurrentStep(4)}
        />
      )}
    </main>
  );
};

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
