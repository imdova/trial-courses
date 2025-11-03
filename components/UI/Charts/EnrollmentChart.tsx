"use client";
import dynamic from "next/dynamic";
import ChartHeader from "./chart-header";
import { useChartData } from "@/hooks/useChartData";
import { createChartConfig, generateRandomArray } from "@/util/chart";
import { useState } from "react";
import { cn } from "@/util";
import { categoriesData, countries } from "@/constants/seekers-dummy";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "../card";
import { Filters } from "@/types/charts";

// Dynamically import ApexCharts to avoid SSR issues
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const FinanceCharts = () => {
  const [filter, setFilter] = useState<Filters>({
    type: "instructor",
    countries: countries.map((country) => country.name),
    categories: categoriesData,
  });
  const {
    timeUnit,
    currentPeriod,
    setCurrentPeriod,
    setTimeUnit,
    data,
    isLoading,
  } = useChartData({ filter });

  const enrollments =
    generateRandomArray(
      data.userDataPerTime.counts.length,
      1,
      timeUnit == "daily"
        ? 1
        : timeUnit == "weekly"
          ? 2
          : timeUnit == "monthly"
            ? 8
            : 20,
    ) || [];

  const seriesData = [
    {
      name: "views",
      color: "#FF8743", // Green
      data:
        generateRandomArray(data.userDataPerTime.counts.length, 5, 95) || [],
    },
    {
      name: "enrollments",
      color: "#0884FF", // Blue
      data: enrollments,
    },
  ];

  const [selectedSeries, setSelectedSeries] = useState<string[]>(
    seriesData.map((series) => series.name),
  );
  const [chartType, setChartType] = useState<"line" | "bar">("line");

  const filteredSeries = seriesData.filter((series) =>
    selectedSeries.includes(series.name),
  );
  const xAxis = data.userDataPerTime.dates;

  const { chartOptions, series } = createChartConfig(xAxis, {
    series: filteredSeries,
    shortenNames: true,
  });

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="max-w-72 text-2xl font-bold">
          Enrollment Overview
        </CardTitle>
        <CardAction>
          <div className="flex w-full justify-between gap-4 md:w-auto md:items-center">
            {seriesData.length > 0 && (
              <div className="flex items-center gap-4">
                <div className="flex flex-wrap justify-end gap-3">
                  {seriesData.map((series) => (
                    <button
                      onClick={() =>
                        setSelectedSeries(
                          selectedSeries.includes(series.name)
                            ? selectedSeries.length > 1
                              ? selectedSeries.filter((s) => s !== series.name)
                              : selectedSeries
                            : [...selectedSeries, series.name],
                        )
                      }
                      key={series.name}
                      className={cn(
                        "flex items-center opacity-50",
                        selectedSeries.includes(series.name) && "opacity-100",
                      )}
                    >
                      <div
                        className="mr-2 h-4 w-4 rounded-md"
                        style={{ backgroundColor: series.color }}
                      />
                      <span className="text-xs text-nowrap">{series.name}</span>
                      <span className="mx-2 text-xs font-semibold">
                        (
                        {series.data.reduce(
                          (acc: number, curr: number | null) =>
                            acc + (curr ?? 0),
                          0,
                        )}{" "}
                        )
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardAction>
      </CardHeader>
      <CardHeader>
        <ChartHeader
          timeUnit={timeUnit}
          currentPeriod={currentPeriod}
          setCurrentPeriod={setCurrentPeriod}
          setTimeUnit={setTimeUnit}
          setChartType={setChartType}
          chartType={chartType}
          filter={filter}
          setFilter={setFilter}
        />
      </CardHeader>
      <CardContent className="h-[calc(100%-90px)] w-full pl-0">
        {isLoading ? (
          <div className="h-full w-full animate-pulse rounded-lg bg-gray-100"></div>
        ) : (
          <Chart
            options={chartOptions}
            series={series}
            type={chartType}
            width="100%"
            height="100%"
          />
        )}
      </CardContent>
    </Card>
  );
};

export default FinanceCharts;
