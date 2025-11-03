"use client";

import { useState } from "react";
import { User2 } from "lucide-react";
import { ColumnConfig } from "@/types";
import DataTable from "../data-table";

type Tab = "Instructor" | "Category" | "Course";

type Instructor = {
  id: string;
  name: string;
  courses: number;
  students: number;
  growth: number;
};

type Category = {
  id: string;
  name: string;
  courses: number;
  students: number;
};

type Course = {
  id: string;
  name: string;
  instructor: string;
  students: number;
};

type TableData = Instructor | Category | Course;

// Helper function to determine the type of data
const isInstructor = (data: TableData): data is Instructor => {
  return "growth" in data;
};

const isCategory = (data: TableData): data is Category => {
  return "courses" in data && !("instructor" in data);
};

const isCourse = (data: TableData): data is Course => {
  return "instructor" in data;
};

export default function InstructorsTable() {
  const [activeTab, setActiveTab] = useState<Tab>("Instructor");
  const [selected, setSelected] = useState<(string | number)[]>([]);

  const instructors: Instructor[] = [
    { id: "1", name: "Dr Ahmed", courses: 10, students: 120, growth: 2 },
    { id: "2", name: "Dr Sara", courses: 8, students: 95, growth: 1.5 },
    { id: "3", name: "Dr John", courses: 12, students: 150, growth: 3 },
  ];

  const categories: Category[] = [
    { id: "1", name: "Design", courses: 20, students: 450 },
    { id: "2", name: "Marketing", courses: 15, students: 380 },
    { id: "3", name: "Programming", courses: 30, students: 600 },
  ];

  const courses: Course[] = [
    { id: "1", name: "UI/UX Basics", instructor: "Dr Ahmed", students: 80 },
    { id: "2", name: "SEO Masterclass", instructor: "Dr Sara", students: 60 },
    { id: "3", name: "React Development", instructor: "Dr John", students: 90 },
  ];

  // Define columns for each tab using a more generic approach
  const getColumns = (tab: Tab): ColumnConfig<TableData>[] => {
    switch (tab) {
      case "Instructor":
        return [
          {
            header: "Instructor",
            key: "name",
            sortable: true,
            render: (item) => (
              <div className="flex items-center gap-2">
                <User2 className="text-green-500" size={16} />
                <span className="text-xs font-semibold">
                  {isInstructor(item) ? item.name : ""}
                </span>
              </div>
            ),
          },
          {
            header: "Courses",
            key: "courses",
            sortable: true,
            render: (item) => (
              <span className="text-xs font-semibold">
                {isInstructor(item) || isCategory(item) ? item.courses : ""}
              </span>
            ),
          },
          {
            header: "Students",
            key: "students",
            sortable: true,
            render: (item) => (
              <span className="text-xs font-semibold">
                {item.students}
                {isInstructor(item) && (
                  <span className="text-xs font-semibold text-green-500">
                    +{item.growth}%
                  </span>
                )}
              </span>
            ),
          },
        ];

      case "Category":
        return [
          {
            header: "Category",
            key: "name",
            sortable: true,
            render: (item) => (
              <span className="text-xs font-semibold">
                {isCategory(item) ? item.name : ""}
              </span>
            ),
          },
          {
            header: "Courses",
            key: "courses",
            sortable: true,
            render: (item) => (
              <span className="text-xs font-semibold">
                {isCategory(item) ? item.courses : ""}
              </span>
            ),
          },
          {
            header: "Students",
            key: "students",
            sortable: true,
            render: (item) => (
              <span className="text-xs font-semibold">
                {isCategory(item) ? item.students : ""}
              </span>
            ),
          },
        ];

      case "Course":
        return [
          {
            header: "Course",
            key: "name",
            sortable: true,
            render: (item) => (
              <span className="text-xs font-semibold">
                {isCourse(item) ? item.name : ""}
              </span>
            ),
          },
          {
            header: "Instructor",
            key: "instructor",
            sortable: true,
            render: (item) => (
              <span className="text-xs font-semibold">
                {isCourse(item) ? item.instructor : ""}
              </span>
            ),
          },
          {
            header: "Students",
            key: "students",
            sortable: true,
            render: (item) => (
              <span className="text-xs font-semibold">
                {isCourse(item) ? item.students : ""}
              </span>
            ),
          },
        ];

      default:
        return [];
    }
  };

  // Get current data based on active tab
  const getCurrentData = (): TableData[] => {
    switch (activeTab) {
      case "Instructor":
        return instructors;
      case "Category":
        return categories;
      case "Course":
        return courses;
      default:
        return instructors;
    }
  };

  return (
    <div className="rounded-lg border bg-white p-3">
      {/* Tabs */}
      <div className="flex flex-wrap justify-center gap-2 border-b pb-4">
        {(["Instructor", "Category", "Course"] as Tab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-xs font-medium ${
              activeTab === tab
                ? "bg-primary rounded-md text-white"
                : "text-gray-500"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Data Table */}
      <div className="mt-4">
        <DataTable<TableData>
          data={getCurrentData()}
          columns={getColumns(activeTab)}
          selected={selected}
          setSelected={setSelected}
          isSelectable={false}
          cellClassName="p-3 text-xs"
          headerClassName="text-xs uppercase text-gray-500 bg-gray-50"
          hideTableHeader={false}
          noDataMessage={{
            title: "No data available",
            description: `No ${activeTab.toLowerCase()} data found`,
          }}
        />
      </div>
    </div>
  );
}
