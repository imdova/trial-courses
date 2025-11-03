"use client";
import { Eye, Save } from "lucide-react";
import { Button } from "@/components/UI/button";
import {
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/UI/card";
import { Tabs, TabsContent } from "@/components/UI/Tabs";
import { Stepper } from "@/components/UI/stepper";
import { Step1BasicInfo } from "./step1-basic-info";
import { CourseFormState, useCourseForm } from "../hooks/useCourseForm";
import { Step2Details } from "./step2-details";
import { Step3Curriculum } from "./step3-curriculum";
import { Step5SEO } from "./step5-seo";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { clearCourseFromIndexedDB, loadCourseFromIndexedDB } from "../util/db";
import { formatDistanceToNow } from "date-fns";
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
import Loading from "@/components/loading/loading";
import { Step4Preview } from "./step4-preview";
import { courseToCourseForm } from "../util/transformToCourseForm";
import { CourseItem } from "@/types/courses";

interface CourseFormProps {
  course?: Omit<CourseItem, "id"> & { id?: CourseItem["id"] };
  duplicateId?: string;
}

const getSteps = (isAdmin: boolean) => [
  {
    id: "1",
    formId: "basic-info",
    completed: false,
    label: "Basic Info",
    description: "Course details & pricing",
  },
  {
    id: "2",
    formId: "details",
    completed: false,
    label: "Details",
    description: "Description & Overview",
  },
  {
    id: "3",
    formId: "curriculum",
    completed: false,
    label: "Curriculum",
    description: "Modules & lectures",
  },
  {
    id: "4",
    label: "Preview",
    completed: false,
    description: "Review & publish",
  },
  ...(isAdmin ? [{
    id: "5",
    formId: "seo",
    completed: false,
    label: "SEO",
    description: "Meta tags & optimization",
  }] : []),
];

const CourseForm: React.FC<CourseFormProps> = ({ course, duplicateId }) => {
  const [loading, setIsLoading] = useState(true);
  const [targetStep, setTargetStep] = useState<number | null>(null);
  const [prevSession, setPrevSession] =
    useState<Partial<CourseFormState> | null>(null);
  const isEdit = Boolean(course?.id);
  const { data: session } = useSession();
  const isAdmin = session?.user?.type === "admin";
  const steps = getSteps(isAdmin);
  
  const {
    isSaving,
    lastSaved,
    hasUnsavedChanges,
    currentStep,
    setCurrentStep,
    restoreFromIndexedDB,
    completedSteps,
    setCompletedSteps,
  } = useCourseForm();

  useEffect(() => {
    /**
     * Restore form data either from IndexedDB (previous session)
     * or from the current course (if editing mode is active).
     */
    const restoreData = async () => {
      setIsLoading(true);

      try {
        // Try to load previously saved course data from IndexedDB
        const savedData = await loadCourseFromIndexedDB();

        if (savedData) {
          if (isEdit && course) {
            // If the saved course matches the current course being edited,
            // restore the previous session data directly
            if (course.id === savedData.courseId) {
              setPrevSession(savedData);
            } else {
              // Otherwise, convert the course to form structure and restore it
              const courseForm = courseToCourseForm(course);
              restoreFromIndexedDB(courseForm);
            }
          } else if (duplicateId && course) {
            if (duplicateId === savedData.duplicateId) {
              setPrevSession(savedData);
            } else {
              // Otherwise, convert the course to form structure and restore it
              const courseForm = courseToCourseForm(course, duplicateId);
              restoreFromIndexedDB(courseForm);
            }
          } else {
            setPrevSession(savedData);
          }
        } else {
          // Case 3: No saved data found — if editing, restore from the existing course
          if (isEdit && course) {
            const courseForm = courseToCourseForm(course);
            restoreFromIndexedDB(courseForm);
          }
          if (duplicateId && course) {
            const courseForm = courseToCourseForm(course, duplicateId);
            restoreFromIndexedDB(courseForm);
          }
        }
      } catch (error) {
        console.error("Error restoring course data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    restoreData();

    // Runs once on mount — intentionally no dependencies
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const restore = () => {
    if (prevSession) {
      restoreFromIndexedDB(prevSession);
      setPrevSession(null);
    }
  };

  const startFresh = () => {
    clearCourseFromIndexedDB();
    if (isEdit && course) {
      const courseForm = courseToCourseForm(course);
      restoreFromIndexedDB(courseForm);
    }
    if (duplicateId && course) {
      const courseForm = courseToCourseForm(course, duplicateId);
      restoreFromIndexedDB(courseForm);
    }
  };

  const onStepChange = (step: number) => {
    const activeFormId = steps[currentStep].formId;
    if (!activeFormId) return setCurrentStep(step);
    setTargetStep(step);
    setTimeout(() => {
      const activeForm = document.getElementById(
        activeFormId,
      ) as HTMLFormElement | null;
      if (activeForm) {
        activeForm.requestSubmit();
      }
    }, 10);
    setTimeout(() => {
      setTargetStep(null);
    }, 100);
  };

  const onSuccess = (step: number) => {
    const filterSteps = completedSteps.filter((s) => s !== currentStep);
    setCompletedSteps([...filterSteps, currentStep]);
    setCurrentStep(targetStep ?? step);
    setTargetStep(null);
  };

  const lastEdited = lastSaved ? formatDistanceToNow(lastSaved) : null;

  if (loading) return <Loading />;

  if (Boolean(prevSession))
    return (
      <AlertDialog
        open={Boolean(prevSession)}
        onOpenChange={() => setPrevSession(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {isEdit
                ? "Unsaved Edits Detected"
                : "Restore Your Last Course Draft?"}
            </AlertDialogTitle>

            <AlertDialogDescription>
              {isEdit ? (
                <>
                  It looks like you were editing this course before the page was
                  reloaded or closed. Would you like to continue editing with
                  your previous changes or discard them and reload the original
                  version?
                </>
              ) : (
                <>
                  We found an unfinished course you started creating earlier.
                  Would you like to continue where you left off, or start a
                  brand new one?
                </>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel onClick={startFresh}>
              {isEdit ? "Discard Changes" : "Start Fresh"}
            </AlertDialogCancel>

            <AlertDialogAction asChild>
              <Button autoFocus onClick={restore}>
                {isEdit ? "Continue Editing" : "Restore Draft"}
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );

  return (
    <div className="space-y-6">
      <CardHeader>
        <CardTitle className="text-2xl">
          {isEdit ? "Edit Course" : "Create New Course"}
        </CardTitle>
        <CardDescription>
          {isEdit
            ? "Edit course information, manage, and update a course "
            : "Follow the steps below to create and publish your course"}
        </CardDescription>
        <CardAction className="flex gap-2">
          <Button variant="ghost">
            <Save className="text-primary" />
            <p>
              {isSaving ? (
                <span className="text-muted-foreground text-xs">
                  Saving ...
                </span>
              ) : hasUnsavedChanges ? (
                <span className="text-xs text-amber-600">unSaved Changes</span>
              ) : (
                <span className="text-primary text-xs">
                  {" "}
                  Saved {lastEdited ? `(${lastEdited})` : ""}
                </span>
              )}
            </p>
          </Button>
          <Button onClick={() => onStepChange(3)} variant="outline">
            <Eye /> Preview
          </Button>
        </CardAction>
      </CardHeader>
      <CardHeader>
        <Stepper
          steps={steps}
          completedSteps={completedSteps}
          activeStep={currentStep}
          onStepChange={onStepChange}
        />
      </CardHeader>

      <CardContent>
        <Tabs value={currentStep.toString()}>
          <TabsContent value="0">
            <Step1BasicInfo onSuccess={() => onSuccess(1)} />
          </TabsContent>
          <TabsContent value="1">
            <Step2Details onSuccess={() => onSuccess(2)} />
          </TabsContent>
          <TabsContent value="2">
            <Step3Curriculum onSuccess={() => onSuccess(3)} />
          </TabsContent>
          <TabsContent value="3">
            <Step4Preview showPublishButton={!isAdmin} />
          </TabsContent>
          {isAdmin && (
            <TabsContent value="4">
              <Step5SEO />
            </TabsContent>
          )}
        </Tabs>
      </CardContent>
    </div>
  );
};

export default CourseForm;
