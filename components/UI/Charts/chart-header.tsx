"use client";
import { Filters, TimeUnit } from "@/types/charts";
import DateSlider from "@/components/UI/DateSlider";
import { BarChart2, LineChart } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../select";
import { Tooltip, TooltipContent, TooltipTrigger } from "../Tooltip";
import { Button } from "../button";
import { cn } from "@/util";

interface ChartHeaderProps<T> {
  category?: T;
  categories?: ActionOption[];
  setCategory?: React.Dispatch<React.SetStateAction<T>>;
  timeUnit: TimeUnit;
  currentPeriod: Date;
  setCurrentPeriod: React.Dispatch<React.SetStateAction<Date>>;
  setTimeUnit?: React.Dispatch<React.SetStateAction<TimeUnit>>;
  setChartType?: React.Dispatch<React.SetStateAction<"line" | "bar">>;
  chartType?: "line" | "bar";
  filter?: Filters;
  setFilter?: React.Dispatch<React.SetStateAction<Filters>>;
  filterOptions?: ActionOption[];
}

const options = [
  { label: "Daily", value: "daily" },
  { label: "Weekly", value: "weekly" },
  { label: "Monthly", value: "monthly" },
  { label: "Yearly", value: "yearly" },
];

const ChartHeader = <T,>({
  category,
  categories,
  setCategory,
  timeUnit,
  currentPeriod,
  setCurrentPeriod,
  setTimeUnit,
  setChartType,
  chartType,
  // filter,
  // setFilter,
  filterOptions,
}: ChartHeaderProps<T>) => {
  return (
    <div className="flex w-full justify-center gap-2 px-3">
      <div className="flex h-[35px] w-full flex-1 items-center gap-2 p-1">
        <DateSlider
          timeUnit={timeUnit}
          currentPeriod={currentPeriod}
          setCurrentPeriod={setCurrentPeriod}
        />
      </div>
      <div
        className={cn("flex flex-1 flex-wrap items-center justify-end gap-2", {
          hidden:
            !setChartType && !setTimeUnit && !setCategory && !filterOptions,
        })}
      >
        {setChartType && (
          <div className="inline-flex w-fit -space-x-px rounded-md shadow-xs rtl:space-x-reverse">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  data-active={chartType === "line"}
                  className="data-[active=true]:text-primary rounded-none rounded-l-md shadow-none focus-visible:z-10 data-[active=true]:bg-gray-100"
                  variant="outline"
                  onClick={() => setChartType("line")}
                >
                  <LineChart />
                  <span className="sr-only">Line Chart</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent className="px-2 py-1 text-xs">
                Line Chart
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  data-active={chartType === "bar"}
                  className="data-[active=true]:text-primary rounded-none rounded-r-md shadow-none focus-visible:z-10 data-[active=true]:bg-gray-100"
                  variant="outline"
                  onClick={() => setChartType("bar")}
                >
                  <BarChart2 />
                  <span className="sr-only">Bar Chart</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent className="px-2 py-1 text-xs">
                Bar Chart
              </TooltipContent>
            </Tooltip>
          </div>
        )}

        {setTimeUnit && (
          <Select
            onValueChange={(value) => {
              setTimeUnit(value as TimeUnit);
            }}
            defaultValue={timeUnit}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a student" />
            </SelectTrigger>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
        {setCategory && (
          <Select
            onValueChange={(value) => {
              setCategory(value as T);
            }}
            defaultValue={category as string}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a student" />
            </SelectTrigger>
            <SelectContent>
              {categories?.map((category) => (
                <SelectItem
                  key={category.value}
                  value={category.value as string}
                >
                  {category.label as string}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
        {category && filterOptions && filterOptions.length > 0 && (
          <div className="rounded-base flex h-[35px] items-center justify-center gap-2 border border-gray-300">
            {/* <MultipleSelector
              options={filterOptions}
              value={filter[category as keyof Filters] as string[]}
              onChange={(value) => {
                const currentFilters =
                  (filter[category as keyof Filters] as string[]) || [];
                const newFilters = currentFilters.includes(value)
                  ? currentFilters.length > 2
                    ? currentFilters.filter((f) => f !== value)
                    : currentFilters
                  : [...currentFilters, value];

                setFilter({
                  ...filter,
                  [category as keyof Filters]: newFilters,
                });
              }}
            /> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChartHeader;
