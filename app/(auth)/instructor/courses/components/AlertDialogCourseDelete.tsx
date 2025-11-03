import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/UI/alert-dialog";
import { Input } from "@/components/UI/input";
import { useControllableState } from "@/hooks/useControllableState";
import { useInstructorCourse } from "@/hooks/useInstructorCourse";
import { CourseItem } from "@/types/courses";
import { TriangleAlertIcon } from "lucide-react";
import { useState } from "react";

const DELETE_CONFIRMATION_TEXT = "DELETE";

export const AlertDialogCourseDelete = ({
  open,
  onOpenChange,
  course,
  children,
}: {
  open?: boolean;
  onOpenChange?: (next: boolean | ((prev: boolean) => boolean)) => void;
  course?: CourseItem | null;
  children?: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useControllableState({
    value: open,
    onChange: onOpenChange,
    defaultValue: false,
  });
  const [confirmationInput, setConfirmationInput] = useState("");
  const { deleteExistingCourse } = useInstructorCourse();

  const handleDelete = async () => {
    if (confirmationInput === DELETE_CONFIRMATION_TEXT && course?.id) {
      deleteExistingCourse(course.id);
      setIsOpen(false);
    }
    setConfirmationInput("");
  };

  if (!course) return null;
  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      {children && <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>}
      <AlertDialogContent>
        <AlertDialogHeader className="items-center">
          <div className="bg-destructive/10 mx-auto mb-2 flex size-12 items-center justify-center rounded-full">
            <TriangleAlertIcon className="text-destructive size-6" />
          </div>
          <AlertDialogTitle className="text-center">
            Are you absolutely sure you want to delete {course?.name} course?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center">
            This action cannot be undone. This will permanently delete the
            course and remove its data from our servers. Please type{" "}
            <strong className="text-destructive">
              {DELETE_CONFIRMATION_TEXT}
            </strong>{" "}
            to confirm.
          </AlertDialogDescription>
          <Input
            value={confirmationInput}
            onChange={(e) => setConfirmationInput(e.target.value)}
            placeholder={DELETE_CONFIRMATION_TEXT}
            className="border-destructive/50 mt-2"
          />
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={confirmationInput !== DELETE_CONFIRMATION_TEXT}
            className="bg-destructive dark:bg-destructive/60 hover:bg-destructive focus-visible:ring-destructive text-white"
          >
            Delete Course
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
