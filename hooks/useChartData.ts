import { useState, useEffect, useMemo } from "react";
import { generateDummyData, User } from "@/constants/seekers-dummy";
import { applyFilters } from "@/util/chart";
import { FilterResults, Filters, TimeUnit } from "@/types/charts";


interface UseChartDataResult {
  timeUnit: TimeUnit;
  setTimeUnit: React.Dispatch<React.SetStateAction<TimeUnit>>;
  currentPeriod: Date;
  setCurrentPeriod: React.Dispatch<React.SetStateAction<Date>>;
  data: FilterResults;
  isLoading: boolean;
  selectedSeries: string;
  setSelectedSeries: React.Dispatch<React.SetStateAction<string>>;
}

const defaultFilterResults: FilterResults = {
  userDataPerTime: {
    dates: [],
    counts: [],
    profileCompletions: [],
    resumeUploads: [],
  },
  userDataPerCountry: {
    dates: [],
    counts: [],
    profileCompletions: [],
    resumeUploads: [],
  },
  userDataPerCategory: {
    dates: [],
    counts: [],
    profileCompletions: [],
    resumeUploads: [],
  },
};

interface UseChartDataProps {
  filter?: Filters;
}

export const useChartData = ({
  filter,
}: UseChartDataProps = {}): UseChartDataResult => {
  
  const [selectedSeries, setSelectedSeries] = useState<string>("");
  const [timeUnit, setTimeUnit] = useState<TimeUnit>("monthly");
  const [currentPeriod, setCurrentPeriod] = useState<Date>(new Date());
  const [initialData, setInitialData] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Load dummy data once
  useEffect(() => {
    const fetchData = async () => {
      const data = generateDummyData();
      setInitialData(data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  // Reset period when timeUnit changes
  useEffect(() => {
    setCurrentPeriod(new Date());
  }, [timeUnit]);

  // Apply filters when dependencies change
  const filteredData = useMemo(() => {
    if (!initialData.length) return defaultFilterResults;
    if (!filter) return defaultFilterResults;
    setIsLoading(true);
    const result = applyFilters({
      data: initialData,
      filter,
      timeUnit,
      currentPeriod,
    });
    setIsLoading(false);
    return result;
  }, [initialData, filter, timeUnit, currentPeriod]);

  return {
    timeUnit,
    setTimeUnit,
    currentPeriod,
    setCurrentPeriod,
    data: filteredData,
    isLoading,
    selectedSeries,
    setSelectedSeries,
  };
};
