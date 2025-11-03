import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Dropdown from "../DropDownMenu";
import type { ApexOptions } from "apexcharts";

// Dynamically import ApexCharts to avoid SSR issues
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface EventData {
  category: string;
  percentage: number;
  count: string;
  value: number;
}

interface ChartData {
  options: ApexOptions;
  series: { name: string; data: number[] }[];
}

export default function PopularEventsDashboard() {
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [timeRange, setTimeRange] = useState("last6months");

  const timeRangeOptions = [
    { id: "last6months", name: "Last 6 Months" },
    { id: "last8months", name: "Last 8 Months" },
    { id: "last12months", name: "Last 12 Months" },
    { id: "ytd", name: "Year to Date" },
  ];

  const eventData: EventData[] = [
    { category: "Music", percentage: 40, count: "8,000 Events", value: 40 },
    { category: "Sports", percentage: 15, count: "3,000 Events", value: 15 },
    { category: "Fashion", percentage: 15, count: "3,000 Events", value: 15 },
  ];

  // Generate chart data
  useEffect(() => {
    const categories = eventData.map((item) => item.category);
    const percentages = eventData.map((item) => item.percentage);

    const options: ApexOptions = {
      chart: {
        type: "bar",
        height: 180,
        toolbar: { show: false },
      },
      colors: ["#4F46E5", "#10B981", "#F59E0B", "#EF4444"],
      plotOptions: {
        bar: {
          borderRadius: 2,
          borderRadiusApplication: "end",
          horizontal: true,
          distributed: true,
          barHeight: "60%",
          dataLabels: { position: "center" },
        },
      },
      legend: { show: false },
      dataLabels: {
        enabled: true,
        textAnchor: "middle",
        style: {
          colors: ["#fff"],
          fontSize: "14px",
          fontFamily: "Inter, sans-serif",
          fontWeight: "bold",
        },
        formatter: (val: number) => `${val}%`,
      },
      grid: {
        borderColor: "#E5E7EB",
        strokeDashArray: 5,
        xaxis: { lines: { show: true } },
        yaxis: { lines: { show: false } },
      },
      xaxis: {
        categories,
        max: 100,
        axisBorder: { show: false },
        axisTicks: { show: false },
        labels: {
          show: true,
          style: {
            colors: "#6B7280",
            fontSize: "10px",
            fontFamily: "Inter, sans-serif",
          },
          formatter: (val: string) => `${val}%`,
        },
      },
      yaxis: {
        labels: {
          show: true,
          style: {
            colors: "#6B7280",
            fontSize: "12px",
            fontFamily: "Inter, sans-serif",
            fontWeight: 400,
          },
        },
      },
      tooltip: {
        theme: "light",
        y: {
          formatter: (_, { seriesIndex }) => eventData[seriesIndex].count,
        },
      },
      responsive: [
        {
          breakpoint: 768,
          options: {
            plotOptions: { bar: { barHeight: "30%" } },
            dataLabels: { style: { fontSize: "10px" } },
          },
        },
      ],
    };

    const series = [{ name: "Percentage", data: percentages }];

    setChartData({ options, series });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeRange]);

  return (
    <div className="overflow-hidden">
      <div>
        <div className="flex flex-col justify-between p-3 md:flex-row md:items-center">
          <h2 className="text-lg font-semibold text-gray-900">
            Popular Events
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

        <div>
          {chartData && (
            <Chart
              options={chartData.options}
              series={chartData.series}
              type="bar"
              height={180}
            />
          )}
        </div>
      </div>
    </div>
  );
}
