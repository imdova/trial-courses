"use client";
import Image from "next/image";
import Link from "next/link";
import { CourseContentProps } from "@/types/courses";
import ToggleSwitch from "../ToggleSwitch";
import DynamicTable from "./DTable";
import DynamicTableFilter from "../DynamicTableFilter";
import { FilterConfigTable } from "@/types";
import {
  Layers,
  BookOpen,
  DollarSign,
  ToggleLeft,
  Trash2,
  Send,
  FileText,
  Edit,
  Archive,
  SquarePen,
} from "lucide-react";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import VideoCard from "../VideoCard";

interface CoursesTableProps {
  courses: CourseContentProps[];
}

const CoursesTable: React.FC<CoursesTableProps> = ({ courses }) => {
  const searchParams = useSearchParams();
  const viewMode = searchParams.get("view");
  const filterConfig: FilterConfigTable[] = [
    {
      id: "category",
      label: "Category",
      options: [
        { value: "development", label: "Development", count: 36 },
        { value: "design", label: "Design", count: 22 },
        { value: "marketing", label: "Marketing", count: 14 },
      ],
      placeholder: "Select category",
      icon: Layers,
      isSearchable: true,
    },
    {
      id: "type",
      label: "Course Type",
      options: [
        { value: "free", label: "Free", count: 12 },
        { value: "paid", label: "Paid", count: 48 },
      ],
      placeholder: "Select type",
      icon: BookOpen,
    },
    {
      id: "status",
      label: "Status",
      options: [
        { value: "active", label: "Active", count: 11 },
        { value: "inActive", label: "Inactive", count: 32 },
        { value: "published", label: "Published", count: 40 },
        { value: "draft", label: "Draft", count: 20 },
      ],
      placeholder: "Select status",
      icon: ToggleLeft,
    },
    {
      id: "revenue",
      label: "Revenue Range",
      options: [
        { value: "0-50", label: "$0 - $50" },
        { value: "50-200", label: "$50 - $200" },
        { value: "200-1000", label: "$200 - $1,000" },
        { value: "1000+", label: "$1,000+" },
      ],
      placeholder: "Select revenue",
      icon: DollarSign,
    },
  ];

  // Define columns for the DynamicTable
  const columns = [
    {
      key: "course" as keyof CourseContentProps,
      header: "Course",
      sortable: true,
      render: (course: CourseContentProps) => (
        <div className="flex items-center space-x-3">
          <Image
            className="object-cover w-14 h-14 rounded-lg"
            src={course.image}
            width={50}
            height={50}
            alt="Course Image"
          />
          <Link href={`/instructor/courses/${course.id}`}>
            <span className="text-sm">{course.title}</span>
          </Link>
        </div>
      ),
    },
    {
      key: "date" as keyof CourseContentProps,
      header: "Date",
      sortable: true,
      render: (course: CourseContentProps) => (
        <span className="text-sm">{course.date}</span>
      ),
    },
    {
      key: "category" as keyof CourseContentProps,
      header: "Category",
      sortable: true,
      render: (course: CourseContentProps) => (
        <span className="text-sm">{course.category}</span>
      ),
    },
    {
      key: "supCategory" as keyof CourseContentProps,
      header: "Sup Category",
      sortable: true,
      render: (course: CourseContentProps) => (
        <span className="text-sm">{course.supCategory}</span>
      ),
    },
    {
      key: "students" as keyof CourseContentProps,
      header: "Students",
      sortable: true,
      render: (course: CourseContentProps) => (
        <span className="text-sm">{course.students}</span>
      ),
    },
    {
      key: "revenue" as keyof CourseContentProps,
      header: "Revenue",
      sortable: true,
      render: (course: CourseContentProps) => (
        <span className="text-sm">{course.revenue}</span>
      ),
    },
    {
      key: "type" as keyof CourseContentProps,
      header: "Type",
      sortable: true,
      render: (course: CourseContentProps) => (
        <span className="text-sm">{course.type}</span>
      ),
    },
    {
      key: "status" as keyof CourseContentProps,
      header: "Status",
      sortable: true,
      render: (course: CourseContentProps) => (
        <span
          className={`px-3 py-1 rounded-lg text-sm ${
            course.status.toLowerCase() === "published"
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          {course.status}
        </span>
      ),
    },
    {
      key: "isActive" as keyof CourseContentProps,
      header: "Active",
      align: "center",
      render: (course: CourseContentProps) => (
        <ToggleSwitch
          checked={course.isActive}
          onChange={(value) => {
            console.log("New value:", value);
          }}
        />
      ),
    },
    {
      key: "actions",
      header: "Actions",
      align: "right",
      actions: {
        primaryActions: [
          {
            label: "Delete",
            icon: <Trash2 size={15} />,
            onClick: () => console.log("Delete clicked"),
            className: "text-red-600 hover:bg-red-50",
          },
          {
            label: "Editt",
            icon: <SquarePen size={15} />,
            onClick: () => console.log("Edit clicked"),
            className: "text-green-600 hover:bg-green-50",
          },
        ],
        dropdownActions: [
          {
            label: "Publish",
            icon: <Send size={14} />,
            onClick: () => console.log("Publish clicked"),
          },
          {
            label: "Quick Edit",
            icon: <FileText size={14} />,
            onClick: () => console.log("Quick Edit clicked"),
          },
          {
            label: "Edit",
            icon: <Edit size={14} />,
            onClick: () => console.log("Edit clicked"),
          },
          {
            label: "Archive",
            icon: <Archive size={14} />,
            onClick: () => console.log("Archive clicked"),
            className: "text-orange-600",
          },
        ],
      },
    },
  ];

  return (
    <div className="bg-white shadow-sm rounded-lg p-4 border border-gray-200">
      <Suspense>
        <DynamicTableFilter
          filters={filterConfig}
          columns={4}
          showSearch={true}
          showClearAll={true}
          className="mb-6"
          showViewModeToggle
          defaultViewMode="list"
        />
      </Suspense>
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <VideoCard
              key={course.id}
              id={course.id}
              image={course.image}
              title={course.title}
              rating={course.rating}
              instructor={course.instructor}
              lessons={course.lessons}
              time={course.duration}
              students={course.students}
              type={course.type}
              price={course.price}
              description={course.description}
            />
          ))}
        </div>
      ) : (
        <DynamicTable
          data={courses}
          columns={columns}
          pagination={true}
          itemsPerPage={5}
          className="relative"
          headerClassName="bg-gray-100 text-gray-700"
          rowClassName="border-b hover:bg-gray-50"
          cellClassName="p-3"
          emptyMessage="No courses found."
          rowIdKey="id"
          selectable
          showRowNumbers
        />
      )}
    </div>
  );
};

export default CoursesTable;
