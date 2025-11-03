"use client";
import DataTable from "@/components/UI/data-table";
import Flag from "../flagitem";
import {
  MapPin,
  SignalHigh,
  User,
} from "lucide-react";
import { GeoStat } from "@/store/slices/admin-students.slice";

type CountryData = {
  id: string;
  country: string;
  countryCode: string;
  students?: number;
  percentage?: string;
};

interface CountriesTableProps {
  geoStats?: GeoStat[];
}

const CountriesTable = ({ geoStats = [] }: CountriesTableProps) => {
  // Transform API data to table format
  const data: CountryData[] = geoStats.length > 0 
    ? geoStats.map((stat) => ({
        id: stat.country.code,
        country: stat.country.name,
        countryCode: stat.country.code,
        students: stat.students,
        percentage: `${stat.percentage.toFixed(1)}%`,
      }))
    : [
    {
        id: "1",
        country: "Egypt",
        countryCode: "eg",
        students: 1500,
        percentage: "30%",
      },
    ];

  // Define columns for each table
  const countryColumns = [
    {
      header: "Country",
      key: "country" as keyof CountryData,
      sortable: true,
      render: (item: CountryData) => (
        <div className="flex items-center">
          <Flag
            code={item.countryCode.toLocaleLowerCase()}
            name={item.country}
            className="mr-2 inline"
          />
          <span className="text-sm font-medium text-gray-900">
            {item.country}
          </span>
        </div>
      ),
    },
    {
      header: "Students",
      key: "students" as keyof CountryData,
      sortable: true,
      render: (item: CountryData) => (
        <div className="flex items-center gap-1">
          <User size={14} />
          <span className="text-xs">{item.students?.toLocaleString()}</span>
        </div>
      ),
    },
    {
      header: "Percentage",
      key: "percentage" as keyof CountryData,
      sortable: true,
      render: (item: CountryData) => (
        <div className="flex items-center gap-1">
          <SignalHigh size={14} />
          <span className="text-xs">{item.percentage}</span>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="my-4 flex items-center gap-2 px-3">
        <MapPin size={16} className="text-gray-600" />
        <h3 className="text-sm font-semibold text-gray-900">Students by Country</h3>
      </div>
      <DataTable<CountryData>
        data={data}
        columns={countryColumns}
        isSelectable={false}
        hideTableHeader={false}
        className="rounded-lg border-none"
        cellClassName="p-3 text-sm"
        headerClassName="text-sm font-semibold"
      />
    </div>
  );
};

export default CountriesTable;
