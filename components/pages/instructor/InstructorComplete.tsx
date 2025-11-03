"use client";
import React from "react";
import CircularProgress from "@/components/UI/Progress";
import { Card, CardAction,  CardDescription, CardHeader, CardTitle } from "@/components/UI/card";

const getProgressColor = (progress: number): string => {
  if (progress >= 80) return "var(--primary)";
  if (progress >= 50) return "var(--warning)";
  return "var(--destructive)";
};

const CompetenceCard: React.FC<{ percentage: number }> = ({ percentage }) => {
  if (!percentage || percentage >= 100) return null;
  const progressColor = getProgressColor(percentage || 0);
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-bold" style={{ color: progressColor }}>
          Complete your profile
        </CardTitle>
        <CardDescription>
          You are almost there—let&lsquo;s finish setting things up to be able
          to attract students and grow your community!
        </CardDescription>
      <CardAction>
        <div className="grid h-[70px] w-[70px] grid-cols-1 grid-rows-1">
          <CircularProgress
            value={percentage}
            strokeWidth={6}
            className="col-start-1 row-start-1 transition-all duration-300 -rotate-90 delay-300 h-[70px] w-[70px]"
            style={{ color: progressColor }}
          />

          <div className="col-start-1 row-start-1 flex items-center justify-center">
            <span
              className="text-xl font-bold"
              style={{ color: progressColor }}
            >
              {percentage || 0}%
            </span>
          </div>
        </div>
      </CardAction>
      </CardHeader>
    </Card>
  );
};

export default CompetenceCard;
