/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { TimerIcon } from "lucide-react";
import { useEffect, useState } from "react";

type TimerMode = "no-limit" | "hidden" | "normal";

interface TimerProps {
  timeLimit: number;
  mode?: TimerMode;
  onTimeUp?: () => void;
  resetKey?: string;
  onTimeUpdate?: (timeTaken: number) => void;
  storageKey?: string;
}

export default function Timer({
  timeLimit,
  mode = "no-limit",
  onTimeUp,
  resetKey = "default",
  onTimeUpdate,
  storageKey = "quizTimerData",
}: TimerProps) {
  const [hasMounted, setHasMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number>(timeLimit);
  const [timeTaken, setTimeTaken] = useState<number>(0);

  const removeTimerData = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(storageKey);
    }
  };

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (!hasMounted) return;

    const savedData = loadTimerData();
    if (savedData) {
      const secondsPassed = Math.floor(
        (Date.now() - savedData.lastActive) / 1000
      );
      const newTimeLeft = Math.max(0, savedData.timeLeft - secondsPassed);
      const newTimeTaken = timeLimit - newTimeLeft;

      setTimeLeft(newTimeLeft);
      setTimeTaken(newTimeTaken > 0 ? newTimeTaken : 0);
    } else {
      setTimeLeft(timeLimit);
      setTimeTaken(0);
    }
  }, [resetKey, timeLimit, hasMounted]);

  useEffect(() => {
    if (!hasMounted) return;

    const interval = setInterval(() => {
      saveTimerData();
    }, 5000);

    return () => {
      clearInterval(interval);
      saveTimerData(); // Save one last time on unmount
    };
  }, [timeLeft, timeTaken, mode, timeLimit, resetKey, hasMounted]);

  useEffect(() => {
    if (!hasMounted || mode === "no-limit") return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setTimeTaken(timeLimit);
          onTimeUp?.();
          removeTimerData();
          return 0;
        }

        const updatedTime = prev - 1;
        const updatedTaken = timeLimit - updatedTime;

        setTimeTaken(updatedTaken);
        onTimeUpdate?.(updatedTaken);

        return updatedTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [hasMounted, mode, onTimeUp, onTimeUpdate, timeLimit]);

  const loadTimerData = () => {
    if (typeof window === "undefined") return null;

    try {
      const saved = localStorage.getItem(storageKey);
      if (!saved) return null;

      const parsed = JSON.parse(saved);
      if (
        parsed.resetKey === resetKey &&
        parsed.timeLimit === timeLimit &&
        typeof parsed.timeLeft === "number" &&
        typeof parsed.timeTaken === "number" &&
        typeof parsed.lastActive === "number"
      ) {
        return parsed;
      }
    } catch (e) {
      console.error("Failed to load timer data:", e);
    }

    return null;
  };

  const saveTimerData = () => {
    if (typeof window === "undefined" || mode === "no-limit") return;

    const data = {
      timeLeft,
      timeTaken,
      timeLimit,
      resetKey,
      lastActive: Date.now(),
    };

    localStorage.setItem(storageKey, JSON.stringify(data));
  };

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;

    return h > 0
      ? `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s
        .toString()
        .padStart(2, "0")}`
      : `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const getTimerColor = () => {
    if (timeLeft < 30) return "text-red-600 bg-red-50 animate-pulse";
    if (timeLeft < 60) return "text-red-600 bg-red-50";
    if (timeLeft < 180) return "text-yellow-600 bg-yellow-50";
    return "text-gray-800 bg-gray-100";
  };

  if (!hasMounted || mode === "hidden") return null;
  if (!hasMounted || mode === "no-limit") return null;

  return (
    <div className="flex flex-col gap-2">
      <div
        className={`flex items-center gap-2 px-3 py-1 rounded-md text-sm font-medium ${getTimerColor()}`}
        aria-label="Time remaining">
        <TimerIcon size={15} />
        {formatTime(timeLeft)}
        <span className="text-xs opacity-75">remaining</span>
      </div>
    </div>
  );
}
