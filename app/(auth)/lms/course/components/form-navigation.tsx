"use client";

import { Button } from "@/components/UI/button";
import { Card } from "@/components/UI/card";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface FormNavigationProps {
  currentStep: number;
  onBack?: () => void;
  onNext?: () => void;
  isNextDisabled?: boolean;
  nextLabel?: string;
  backLabel?: string;
}

export function FormNavigation({
  currentStep,
  onBack,
  onNext,
  isNextDisabled = false,
  backLabel = "Back",
  nextLabel = "Next",
}: FormNavigationProps) {
  return (
    <Card className="sticky bottom-4 p-2 w-fit">
      <div className="flex items-center justify-end gap-4">
        {currentStep > 1 && (
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            className="gap-2 bg-transparent"
          >
            <ChevronLeft className="h-4 w-4" />
            {backLabel}
          </Button>
        )}
        <Button
          type="submit"
          onClick={onNext}
          disabled={isNextDisabled}
          className="gap-2"
        >
          {nextLabel}
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
}
