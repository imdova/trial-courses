"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });

interface ActiveHoursBarChartProps {
  timeSpentData?: { hours: number; percentage: number };
  lessonsTakenData?: { count: number; percentage: number };
  passedData?: { count: number; percentage: number };
}

const ActiveHoursBarChart: React.FC<ActiveHoursBarChartProps> = ({
  timeSpentData = { hours: 28, percentage: 80 },
  lessonsTakenData = { count: 60, percentage: 70 },
  passedData = { count: 10, percentage: 100 },
}) => {
  const [activeTab, setActiveTab] = useState<"weekly" | "monthly" | "yearly">(
    "weekly"
  );

  // Chart data configuration
  const chartData = {
    weekly: {
      categories: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      series: [5, 7, 6, 8, 6, 5, 4], // Active hours only
    },
    monthly: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      series: [120, 110, 130, 125, 140, 135, 150, 145, 130, 140, 125, 135],
    },
    yearly: {
      categories: ["2020", "2021", "2022", "2023", "2024"],
      series: [150, 160, 170, 180, 190],
    },
  };

  const chartOptions: ApexOptions = {
    chart: {
      type: "bar",
      height: 350,
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "60%",
        borderRadius: 4,
      },
    },
    dataLabels: { enabled: false },
    stroke: { show: true, width: 2, colors: ["transparent"] },
    xaxis: {
      categories: chartData[activeTab].categories,
      labels: { style: { fontSize: "13px", fontWeight: 500 } },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      labels: { formatter: (val: number) => `${val}h` },
    },
    fill: { opacity: 1 },
    colors: ["#3f51b5"],
    tooltip: {
      y: { formatter: (val: number) => `${val} hours` },
    },
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
      <div className="flex flex-col justify-between items-center gap-2 mb-6 md:flex-row">
        <h2 className="text-xl font-bold text-gray-900">Active Hours</h2>
        <div className="flex space-x-2">
          <button
            onClick={() => setActiveTab("weekly")}
            className={`px-3 py-1 text-sm rounded-md ${
              activeTab === "weekly"
                ? "text-[#3f51b5] bg-[#3f51b50d]"
                : "text-gray-500 hover:bg-gray-100"
            }`}
          >
            Weekly
          </button>
          <button
            onClick={() => setActiveTab("monthly")}
            className={`px-3 py-1 text-sm rounded-md ${
              activeTab === "monthly"
                ? "text-[#3f51b5] bg-[#3f51b50d]"
                : "text-gray-500 hover:bg-gray-100"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setActiveTab("yearly")}
            className={`px-3 py-1 text-sm rounded-md ${
              activeTab === "yearly"
                ? "text-[#3f51b5] bg-[#3f51b50d]"
                : "text-gray-500 hover:bg-gray-100"
            }`}
          >
            Yearly
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-8">
        <div className="md:col-span-3 h-[280px]">
          <ApexCharts
            options={chartOptions}
            series={[
              { name: "Active Hours", data: chartData[activeTab].series },
            ]}
            type="bar"
            height="100%"
          />
        </div>

        <div className="col-span-1 space-y-3">
          {/* Time Spent Card */}
          <div className="p-2 rounded-lg">
            <h3 className="text-xs mb-1 font-medium text-gray-500">
              Time spent
            </h3>
            <div className="flex items-center gap-3">
              <div className="text-2xl font-bold text-gray-900 mb-2">
                {timeSpentData.hours}h
              </div>
              <span className="text-purple-500 text-sm bg-purple-100 px-2 py-1 rounded-lg font-medium">
                {timeSpentData.percentage}%
              </span>
            </div>
          </div>

          {/* Lessons Taken Card */}
          <div className="p-2 rounded-lg">
            <h3 className="text-xs mb-1 font-medium text-gray-500">
              Lessons taken
            </h3>
            <div className="flex items-center gap-3">
              <div className="text-2xl font-bold text-gray-900 mb-2">
                {lessonsTakenData.count}
              </div>
              <span className="text-green-500 text-sm bg-green-100 px-2 py-1 rounded-lg font-medium">
                {lessonsTakenData.percentage}%
              </span>
            </div>
          </div>

          {/* Passed Card */}
          <div className="p-2 rounded-lg">
            <h3 className="text-xs mb-1 font-medium text-gray-500">
              Exam passed
            </h3>
            <div className="flex items-center gap-3">
              <div className="text-2xl font-bold text-gray-900 mb-2">
                {passedData.count}
              </div>
              <span className="text-amber-500 text-sm bg-amber-100 px-2 py-1 rounded-lg font-medium">
                {passedData.percentage}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActiveHoursBarChart;
