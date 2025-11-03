"use client";

import React from "react";

type StatCard = {
  id: number;
  title: string;
  value?: string;
  change?: string;
  icon: React.ReactNode;
  bgColor: string;
  textColor: string;
};

const StatCardItem: React.FC<StatCard> = ({
  title,
  value,
  change,
  icon,
  bgColor,
  textColor,
}) => {
  return (
    <div className="flex items-center gap-4 rounded-lg border bg-white p-3">
      <div
        style={{
          backgroundColor: bgColor,
          color: textColor,
        }}
        className={`flex h-12 w-12 items-center justify-center rounded-md`}
      >
        {icon}
      </div>
      <div>
        <span className="text-muted-foreground mb-1 block text-xs">
          {title}
        </span>
        {value ? <h2 className="text-lg font-semibold">{value}</h2> : null}
        {change ? (
          <span className="text-primary text-[10px]">{change}</span>
        ) : null}
      </div>
    </div>
  );
};

export default StatCardItem;
