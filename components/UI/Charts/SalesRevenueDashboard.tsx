import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Dropdown from "../DropDownMenu";
import type { ApexOptions } from "apexcharts";

// Dynamically import ApexCharts to avoid SSR issues
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface ChartData {
  options: ApexOptions;
  series: { name: string; data: number[] }[];
}

export default function SalesRevenueDashboard() {
  const [timeRange, setTimeRange] = useState("last8months");
  const [chartData, setChartData] = useState<ChartData | null>(null);

  const timeRangeOptions = [
    { id: "last6months", name: "Last 6 Months" },
    { id: "last8months", name: "Last 8 Months" },
    { id: "last12months", name: "Last 12 Months" },
    { id: "ytd", name: "Year to Date" },
  ];

  useEffect(() => {
    // Sample data for the last 8 months
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"];
    const revenueData = [
      42300, 48500, 51200, 56320, 49800, 53200, 55800, 51600,
    ];
    const profitData = [18300, 21500, 23200, 25320, 21800, 24200, 25800, 22600];

    const options: ApexOptions = {
      chart: {
        height: 190,
        type: "bar",
        zoom: { enabled: false },
        toolbar: { show: false },
      },
      colors: ["#82c341", "#d4e2c7"],
      dataLabels: { enabled: false },
      plotOptions: {
        bar: {
          borderRadius: 8,
          borderRadiusApplication: "end",
          borderRadiusWhenStacked: "last",
          columnWidth: "70%",
        },
      },
      grid: {
        borderColor: "#E5E7EB",
        strokeDashArray: 5,
        xaxis: { lines: { show: true } },
        yaxis: { lines: { show: true } },
        padding: { top: 0, right: 0, bottom: 0, left: 0 },
      },
      markers: {
        size: 5,
        colors: ["#4F46E5", "#10B981"],
        strokeColors: "#fff",
        strokeWidth: 2,
        hover: { size: 7 },
      },
      xaxis: {
        categories: months,
        axisBorder: { show: false },
        axisTicks: { show: false },
        labels: {
          style: {
            colors: "#6B7280",
            fontSize: "12px",
            fontFamily: "Inter, sans-serif",
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: "#6B7280",
            fontSize: "12px",
            fontFamily: "Inter, sans-serif",
          },
          formatter: (val: number) => `$${val.toLocaleString()}`,
        },
      },
      legend: {
        position: "top",
        horizontalAlign: "right",
        fontSize: "14px",
        fontFamily: "Inter, sans-serif",
        markers: {},
        itemMargin: { horizontal: 10, vertical: 5 },
      },
      tooltip: {
        theme: "light",
        x: {
          formatter: (_: number, opts) => months[opts.dataPointIndex] ?? "",
        },
        y: {
          formatter: (val: number) => `$${val.toLocaleString()}`,
        },
      },
    };

    const series = [
      { name: "Revenue", data: revenueData },
      { name: "Profit", data: profitData },
    ];

    setChartData({ options, series });
  }, [timeRange]);

  return (
    <div>
      <div className="mx-auto max-w-6xl overflow-hidden">
        <div className="grid grid-cols-1">
          <div className="p-3 pb-0">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">
                Revenue Overview
              </h2>
              <div className="max-w-xs">
                <Dropdown
                  options={timeRangeOptions}
                  selected={timeRange}
                  onSelect={(value) => setTimeRange(String(value))}
                  placeholder="Select time range"
                />
              </div>
            </div>
            <div className="rounded-lg">
              <p className="text-sm">Total Revenue</p>
              <p className="text-lg font-bold">$348,805</p>
            </div>
          </div>
          {chartData && (
            <Chart
              options={chartData.options}
              series={chartData.series}
              type="bar"
              height={190}
            />
          )}
        </div>
      </div>
    </div>
  );
}
