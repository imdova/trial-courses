import React from "react";
import { cn } from "@/util";
import { Check } from "lucide-react";

export type StepType = {
  id: string;
  formId?: string;
  label: string;
  description: string;
};
interface StepperProps {
  steps: StepType[];
  activeStep: number;
  completedSteps: number[];
  onStepChange?: (index: number) => void;
  orientation?: "horizontal" | "vertical";
}

export const Stepper: React.FC<StepperProps> = ({
  steps,
  activeStep,
  completedSteps,
  onStepChange,
  orientation = "horizontal",
}) => {
  const isHorizontal = orientation === "horizontal";

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <div
        className={cn(
          "flex w-full px-[calc(100%/8-1.125rem)]",
          isHorizontal
            ? "flex-row items-center justify-around"
            : "flex-col gap-6",
        )}
      >
        {steps.map((step, index) => {
          const isActive = index === activeStep;
          const isPassed = index < activeStep;
          const isCompleted = completedSteps.includes(index);
          const isClickable = true;
          const isLast = index === steps.length - 1;

          return (
            <div
              key={step.id}
              className={cn(
                "flex items-center",
                isHorizontal
                  ? !isLast && "flex-1"
                  : "flex flex-col items-start",
              )}
            >
              <div
                onClick={() => isClickable && onStepChange?.(index)}
                aria-disabled={!isClickable}
                tabIndex={isClickable ? 0 : -1}
                role="button"
                className={cn(
                  "group relative flex cursor-pointer items-center transition-all aria-disabled:cursor-not-allowed aria-disabled:opacity-50",
                  isHorizontal && index !== steps.length - 1 && "w-full",
                )}
              >
                {/* Step Circle */}
                <div
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-full border-2 text-sm font-medium",
                    isActive
                      ? "border-primary text-primary bg-primary/10"
                      : "border-muted-foreground text-muted-foreground",
                    isPassed && "border-primary",
                    isCompleted &&
                      "border-primary bg-primary text-primary-foreground",
                  )}
                >
                  {isCompleted ? <Check className="h-4 w-4" /> : index + 1}
                </div>

                {/* Connector Line */}
                {isHorizontal && !isLast && (
                  <div
                    className={cn(
                      "h-[2px] flex-1 -translate-y-1/2 transition-all",
                      isPassed ? "bg-green-500" : "bg-gray-300",
                    )}
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>
      <div className={"flex w-full justify-between"}>
        {steps.map((step, index) => {
          const isActive = index === activeStep;
          const isCompleted = completedSteps.includes(index);
          return (
            <div
              key={step.id}
              className={cn(
                "flex items-center",
                isHorizontal ? "flex-1" : "flex flex-col items-start",
              )}
            >
              {/* Labels */}
              <div
                className={cn(
                  "mt-2",
                  isHorizontal ? "w-full text-center" : "ml-4",
                )}
              >
                <p
                  className={cn(
                    "text-sm font-medium",
                    isActive
                      ? "text-primary"
                      : isCompleted
                        ? "text-green-600"
                        : "text-gray-500",
                  )}
                >
                  {step.label}
                </p>
                {step.description && (
                  <p className="text-xs text-gray-400">{step.description}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
