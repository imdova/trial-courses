import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/UI/alert-dialog";
import { Check } from "lucide-react";
import Link from "next/link";
import { useControllableState } from "@/hooks/useControllableState";

interface SuccessDialogAction {
  /** Text label for the button */
  label: string;
  /** Optional link path for navigation */
  href?: string;
  /** Optional onClick handler */
  onClick?: () => void;
  /** Optional variant for style (default: "default") */
  variant?: "default" | "outline";
}

interface SuccessAlertDialogProps {
  /** Controls dialog open state (optional) */
  open?: boolean;
  onOpenChange?: (next: boolean | ((prev: boolean) => boolean)) => void;

  /** The main success title */
  title?: string;

  /** Optional success description */
  description?: string;

  /** Optional resource name (e.g., course name) */
  resourceName?: string;

  /** Optional icon (default: Check icon) */
  icon?: React.ReactNode;

  /** Color tone (e.g., "primary", "success", "accent") */
  tone?: "primary" | "success" | "accent";

  /** Actions to display at the bottom (buttons/links) */
  actions?: SuccessDialogAction[];
}

/**
 * ✅ Reusable Success Alert Dialog
 *
 * A flexible dialog for success messages (e.g., creation, update, submission).
 *
 * Can display a custom title, description, icon, and multiple actions.
 */
export const SuccessAlertDialog: React.FC<SuccessAlertDialogProps> = ({
  open,
  onOpenChange,
  title = "Action Completed Successfully 🎉",
  description,
  resourceName,
  icon,
  tone = "primary",
  actions = [],
}) => {
  const [isOpen, setIsOpen] = useControllableState({
    value: open,
    onChange: onOpenChange,
    defaultValue: false,
  });

  const Icon = icon || <Check className={`text-${tone} size-12`} />;

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader className="items-center text-center">
          {/* Icon container */}
          <div
            className={`bg-${tone}/10 mx-auto mb-3 flex items-center justify-center rounded-full p-3`}
          >
            {Icon}
          </div>

          {/* Title */}
          <AlertDialogTitle className="text-lg font-semibold">
            {title}
          </AlertDialogTitle>

          {/* Description */}
          {description && (
            <AlertDialogDescription className="text-muted-foreground text-center">
              {resourceName ? (
                <>
                  {description}{" "}
                  <strong className={`text-${tone}`}>{resourceName}</strong>.
                </>
              ) : (
                description
              )}
            </AlertDialogDescription>
          )}
        </AlertDialogHeader>

        {/* Footer Actions */}
        {actions.length > 0 && (
          <AlertDialogFooter className="flex justify-center gap-3 pt-4">
            {actions.map((action, i) => (
              <AlertDialogAction
                key={i}
                asChild={Boolean(action.href)}
                variant={action.variant ?? "default"}
                onClick={action.onClick}
              >
                {action.href ? (
                  <Link href={action.href}>{action.label}</Link>
                ) : (
                  action.label
                )}
              </AlertDialogAction>
            ))}
          </AlertDialogFooter>
        )}
      </AlertDialogContent>
    </AlertDialog>
  );
};
