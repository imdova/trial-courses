import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
} from "@/components/UI/alert-dialog";
import { Check } from "lucide-react";

const WithdrawRequestSuccess: React.FC<{
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  processingTimeDays: string;
}> = ({ open, setOpen, processingTimeDays }) => {
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader className="items-center text-center">
          <div className="bg-primary/10 mx-auto mb-3 flex items-center justify-center rounded-full p-3">
            <Check className="text-primary size-12" />
          </div>

          <AlertDialogTitle className="text-lg font-semibold">
            Withdrawal Request Submitted
          </AlertDialogTitle>

          <AlertDialogDescription className="text-muted-foreground text-center">
            Your withdrawal request has been successfully received. Our team
            will process it within a {processingTimeDays}.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="flex justify-center gap-3 pt-4">
          <AlertDialogCancel variant="default" >Close</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default WithdrawRequestSuccess;
