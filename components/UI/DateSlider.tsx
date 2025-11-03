import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useState, useEffect } from "react";
import {
  addDays,
  addMonths,
  addWeeks,
  addYears,
  formatPeriodLabel,
  subDays,
  subMonths,
  subWeeks,
  subYears,
} from "@/util/date";
import { TimeUnit } from "@/types/charts";
import { Button } from "./button";

interface DateSliderProps {
  timeUnit: TimeUnit;
  currentPeriod: Date;
  setCurrentPeriod: React.Dispatch<React.SetStateAction<Date>>;
}

const DateSlider: React.FC<DateSliderProps> = ({
  timeUnit,
  setCurrentPeriod,
  currentPeriod,
}) => {
  const [canGoNext, setCanGoNext] = useState<boolean>(false);
  const [animateDirection, setAnimateDirection] = useState<
    "left" | "right" | ""
  >("");

  const goToPreviousPeriod = () => {
    setAnimateDirection("left");
    setCurrentPeriod((prevPeriod) => {
      let newPeriod;
      switch (timeUnit) {
        case "daily":
          newPeriod = subDays(prevPeriod, 1);
          break;
        case "weekly":
          newPeriod = subWeeks(prevPeriod, 1);
          break;
        case "monthly":
          newPeriod = subMonths(prevPeriod, 1);
          break;
        case "yearly":
          newPeriod = subYears(prevPeriod, 1);
          break;
        default:
          newPeriod = prevPeriod;
      }
      return newPeriod;
    });
  };

  const goToNextPeriod = () => {
    if (!canGoNext) return;
    setAnimateDirection("right");
    setCurrentPeriod((prevPeriod) => {
      let newPeriod;
      switch (timeUnit) {
        case "daily":
          newPeriod = addDays(prevPeriod, 1);
          break;
        case "weekly":
          newPeriod = addWeeks(prevPeriod, 1);
          break;
        case "monthly":
          newPeriod = addMonths(prevPeriod, 1);
          break;
        case "yearly":
          newPeriod = addYears(prevPeriod, 1);
          break;
        default:
          newPeriod = prevPeriod;
      }
      return newPeriod;
    });
  };

  useEffect(() => {
    const now = new Date();
    let canNavigateNext = true;

    switch (timeUnit) {
      case "daily":
        canNavigateNext = currentPeriod < now;
        break;
      case "weekly":
        canNavigateNext = addWeeks(currentPeriod, 1) <= now;
        break;
      case "monthly":
        canNavigateNext = addMonths(currentPeriod, 1) <= now;
        break;
      case "yearly":
        canNavigateNext = addYears(currentPeriod, 1) <= now;
        break;
    }

    setCanGoNext(canNavigateNext);
  }, [currentPeriod, timeUnit]);

  return (
    <div className="flex items-center w-full justify-between gap-2">
      <Button
        onClick={goToPreviousPeriod}
        aria-label="Previous day"
        variant="outline"
        size="icon"
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>

      <div className="relative flex h-10 min-w-56 items-center justify-center overflow-hidden">
        <div
          className={`absolute font-semibold text-gray-800 transition-all duration-300 ${
            animateDirection === "right"
              ? "animate-slide-out-left"
              : animateDirection === "left"
                ? "animate-slide-out-right"
                : ""
          }`}
          onAnimationEnd={() => setAnimateDirection("")}
        >
          {formatPeriodLabel(currentPeriod, timeUnit)}
        </div>

        {animateDirection && (
          <div
            className={`absolute font-semibold text-gray-800 ${
              animateDirection === "right"
                ? "animate-slide-in-right"
                : "animate-slide-in-left"
            }`}
          >
            {formatPeriodLabel(currentPeriod, timeUnit)}
          </div>
        )}
      </div>

      <Button
        onClick={goToNextPeriod}
        disabled={!canGoNext}
        variant="outline"
        size="icon"
        aria-label="Next "
      >
        <ChevronRight className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default DateSlider;
