"use client";
import React from "react";
import CircularProgress from "@/components/UI/Progress";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/UI/card";
import { CheckCircle } from "lucide-react";

const getProgressColor = (progress: number): string => {
  if (progress >= 80) return "var(--primary)";
  if (progress >= 50) return "var(--warning)";
  return "var(--destructive)";
};

const AcademyCompetenceCard: React.FC<{ percentage: number }> = ({
  percentage,
}) => {
  if (!percentage || percentage > 100) return null;
  const isComplete = percentage === 100;
  const progressColor = getProgressColor(percentage || 0);
  return (
    <Card>
      <CardHeader>
        <CardTitle
          className="text-xl font-bold"
          style={{ color: progressColor }}
        >
          {isComplete
            ? "Profile Completed Successfully!"
            : "Complete Your Profile to Grow Faster"}
        </CardTitle>
        <CardDescription>
          {isComplete
            ? "Your profile is complete — now it’s time to showcase your academy and attract new opportunities."
            : "You’re just one step away from unlocking your academy’s full potential. Complete your profile and start growing today."}
        </CardDescription>
        <CardAction>
          {isComplete ? (
            <CheckCircle className="text-primary size-12" />
          ) : (
            <div className="grid h-[70px] w-[70px] grid-cols-1 grid-rows-1">
              <CircularProgress
                value={percentage}
                strokeWidth={6}
                className="col-start-1 row-start-1 h-[70px] w-[70px] -rotate-90 transition-all delay-300 duration-300"
                style={{ color: progressColor }}
              />

              <div className="col-start-1 row-start-1 flex items-center justify-center">
                <span
                  className="text-xl font-bold"
                  style={{ color: progressColor }}
                >
                  {percentage.toFixed(0) || 0}%
                </span>
              </div>
            </div>
          )}
        </CardAction>
      </CardHeader>
    </Card>
  );
};

export default AcademyCompetenceCard;
