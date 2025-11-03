import useIsLeaving from "@/hooks/useIsLeaving";

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
import { TriangleAlertIcon } from "lucide-react";
import { useFormContext } from "react-hook-form";

const PreventLeaveDialog = () => {
  const form = useFormContext();
  const { isLeaving, setLeavingManually, handleUserDecision } = useIsLeaving({
    preventDefault: form.formState.isDirty,
  });
  return (
    <AlertDialog open={isLeaving}>
      <AlertDialogContent>
        <AlertDialogHeader className="items-center">
          <div className="bg-destructive/10 mx-auto mb-2 flex size-12 items-center justify-center rounded-full">
            <TriangleAlertIcon className="text-destructive size-6" />
          </div>
          <AlertDialogTitle className="text-center">
            Are you sure you want to leave?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center">
            You have unsaved changes. Are you sure you want to leave without
            saving?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={() => {
              setLeavingManually(false);
              handleUserDecision(false);
            }}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              handleUserDecision(true);
            }}
            className="bg-destructive dark:bg-destructive/60 hover:bg-destructive focus-visible:ring-destructive text-white"
          >
            yes
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PreventLeaveDialog;
