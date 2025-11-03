"use client";
import React from "react";
import DynamicTable from "@/components/UI/tables/DTable";
import { WeeklySale } from "@/store/slices/admin-courses-overview.slice";
import { BookOpen } from "lucide-react";

interface WeeklySalesTableProps {
  weeklySales?: WeeklySale[];
}

type TableData = {
  id: string;
  name: string;
  sale: number;
};

const WeeklySalesTable: React.FC<WeeklySalesTableProps> = ({ weeklySales = [] }) => {
  const data: TableData[] = weeklySales.map((sale) => ({
    id: sale.courseId,
    name: sale.courseName,
    sale: sale.totalSales,
  }));

  const columns = [
    {
      key: "name",
      header: "Course",
      sortable: true,
      render: (item: TableData) => (
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
            <BookOpen className="h-5 w-5 text-green-700" />
          </div>
          <div className="text-sm font-medium">{item.name}</div>
        </div>
      ),
    },
    {
      key: "sale",
      header: "Total Sales",
      sortable: true,
      align: "center" as const,
      render: (item: TableData) => (
        <div className="flex items-center justify-center rounded-lg bg-[#CCEABB40] p-2 text-sm font-semibold text-[#84B99E]">
          {item.sale}
        </div>
      ),
    },
  ];

  return (
    <DynamicTable
      data={data}
      columns={columns}
      minWidth="400px "
      pagination={false}
      className="rounded-md border  border-gray-200"
      headerClassName="bg-gray-100 text-gray-700"
      rowClassName="hover:bg-gray-50"
      cellClassName="py-4 px-6"
    />
  );
};

export default WeeklySalesTable;
