import React from "react";
import { ColumnDefinition } from "@/types";
import DynamicTable from "./DTable";

// Define the data type for our table
type CountryExamData = {
  id: string;
  country: string;
  score: number;
  time: string; // Time taken to complete exam
  students: number;
  passRate: number;
};

// Dummy data for country-wise exam performance
const countryExamData: CountryExamData[] = [
  {
    id: "1",
    country: "United States",
    score: 85,
    time: "45 min",
    students: 1250,
    passRate: 92,
  },
  {
    id: "2",
    country: "Germany",
    score: 89,
    time: "42 min",
    students: 980,
    passRate: 95,
  },
  {
    id: "3",
    country: "Japan",
    score: 87,
    time: "48 min",
    students: 1100,
    passRate: 94,
  },
  {
    id: "4",
    country: "United Kingdom",
    score: 83,
    time: "50 min",
    students: 1050,
    passRate: 90,
  },
  {
    id: "5",
    country: "Canada",
    score: 84,
    time: "47 min",
    students: 920,
    passRate: 91,
  },
  {
    id: "6",
    country: "Australia",
    score: 82,
    time: "52 min",
    students: 850,
    passRate: 89,
  },
  {
    id: "7",
    country: "France",
    score: 81,
    time: "55 min",
    students: 790,
    passRate: 88,
  },
  {
    id: "8",
    country: "South Korea",
    score: 88,
    time: "44 min",
    students: 1020,
    passRate: 93,
  },
  {
    id: "9",
    country: "Brazil",
    score: 78,
    time: "60 min",
    students: 680,
    passRate: 82,
  },
  {
    id: "10",
    country: "India",
    score: 80,
    time: "58 min",
    students: 1500,
    passRate: 85,
  },
];

// Column definitions
const columns: ColumnDefinition<CountryExamData>[] = [
  {
    key: "country" as keyof CountryExamData,
    header: "Country",
    width: "25%",
    sortable: true,
    sortFn: (a, b) => a.country.localeCompare(b.country),
  },
  {
    key: "score" as keyof CountryExamData,
    header: "Average Score",
    width: "20%",
    align: "center",
    sortable: true,
    sortFn: (a, b) => a.score - b.score,
    render: (item) => (
      <span className="font-medium text-sm">{item.score}%</span>
    ),
  },
  {
    key: "time" as keyof CountryExamData,
    header: "Average Time",
    width: "20%",
    align: "center",
    sortable: true,
    sortFn: (a, b) => {
      const aTime = parseInt(a.time);
      const bTime = parseInt(b.time);
      return aTime - bTime;
    },
    render: (item) => <span className="font-medium text-sm">{item.time}</span>,
  },
];

const CountryExamTable = () => {
  return (
    <div>
      <DynamicTable
        data={countryExamData}
        columns={columns}
        headerClassName="bg-gray-100 text-gray-700"
        rowClassName="hover:bg-gray-50"
        cellClassName="py-3 px-4 text-sm"
        minWidth="250px"
      />
    </div>
  );
};

export default CountryExamTable;
