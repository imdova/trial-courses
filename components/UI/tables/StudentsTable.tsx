"use client";
import * as React from "react";
import DynamicTable from "@/components/UI/tables/DTable";
import Image from "next/image";
import DynamicTableFilter from "@/components/UI/DynamicTableFilter";
import {
  UserCheck,
  GraduationCap,
  CalendarDays,
  Languages,
  DollarSign,
  Trash2,
  SquarePen,
  Send,
  FileText,
  Edit,
  Archive,
} from "lucide-react";
import { FilterConfigTable } from "@/types";

interface Students {
  id: number;
  Name: string;
  image: string;
  MobileNumber: string;
  Email: string;
  Location: string;
  JoinDate: string;
  CourseNumber: number;
  Revenue: string;
  [key: string]: string | number;
}

const students: Students[] = [
  {
    id: 1,
    Name: "Said Ahmed",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
    MobileNumber: "010234567890",
    Email: "info@example.com",
    Location: "Cairo, Egypt",
    JoinDate: "1 - 2 - 2020",
    CourseNumber: 25,
    Revenue: "1220EGP",
  },
  // ... rest of the Students data
];

const StudentsTable: React.FC = () => {
  const filterConfig: FilterConfigTable[] = [
    {
      id: "enrollmentStatus",
      label: "Enrollment Status",
      options: [
        { value: "active", label: "Active", count: 128 },
        { value: "inactive", label: "Inactive", count: 35 },
        { value: "completed", label: "Completed", count: 62 },
      ],
      placeholder: "Select status",
      icon: UserCheck,
    },
    {
      id: "course",
      label: "Course",
      options: [
        { value: "development", label: "Development", count: 54 },
        { value: "design", label: "Design", count: 32 },
        { value: "marketing", label: "Marketing", count: 27 },
      ],
      placeholder: "Select course",
      icon: GraduationCap,
      isSearchable: true,
    },
    {
      id: "joinDate",
      label: "Join Year",
      options: [
        { value: "2025", label: "2025", count: 40 },
        { value: "2024", label: "2024", count: 80 },
        { value: "2023", label: "2023", count: 45 },
      ],
      placeholder: "Select year",
      icon: CalendarDays,
    },
    {
      id: "language",
      label: "Preferred Language",
      options: [
        { value: "english", label: "English", count: 75 },
        { value: "arabic", label: "Arabic", count: 35 },
        { value: "french", label: "French", count: 12 },
      ],
      placeholder: "Select language",
      icon: Languages,
    },
    {
      id: "spent",
      label: "Total Spent",
      options: [
        { value: "0-50", label: "$0 - $50" },
        { value: "50-200", label: "$50 - $200" },
        { value: "200-1000", label: "$200 - $1,000" },
        { value: "1000+", label: "$1,000+" },
      ],
      placeholder: "Select amount",
      icon: DollarSign,
    },
  ];
  const columns = [
    {
      key: "Name",
      header: "Name",
      sortable: true,
      render: (Students: Students) => (
        <div className="flex h-full items-center gap-2">
          <Image
            src={Students.image}
            alt={Students.Name}
            width={40}
            height={40}
            className="rounded-lg mr-2"
          />
          <div>
            <h3 className="mb-2 text-sm">{Students.Name}</h3>
          </div>
        </div>
      ),
    },
    {
      key: "MobileNumber",
      header: "Mobile Number",
      sortable: true,
      render: (Students: Students) => (
        <span className="text-sm">{Students.MobileNumber}</span>
      ),
    },
    {
      key: "Email",
      header: "Email",
      sortable: true,
      render: (Students: Students) => (
        <span className="text-sm">{Students.Email}</span>
      ),
    },
    {
      key: "Location",
      header: "Location",
      sortable: true,
      render: (Students: Students) => (
        <span className="text-sm">{Students.Location}</span>
      ),
    },
    {
      key: "JoinDate",
      header: "Join Date",
      sortable: true,
      render: (Students: Students) => (
        <span className="text-sm">{Students.JoinDate}</span>
      ),
    },
    {
      key: "CourseNumber",
      header: "Course Number",
      sortable: true,
      render: (Students: Students) => (
        <span className="text-sm">{Students.CourseNumber}</span>
      ),
    },
    {
      key: "Revenue",
      header: "Revenue",
      sortable: true,
      render: (Students: Students) => (
        <span className="text-sm">{Students.Revenue}</span>
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
    <div className="flex flex-col  border border-gray-200 rounded-lg p-4 bg-white shadow-sm ">
      <React.Suspense fallback={<div>Loading...</div>}>
        <DynamicTableFilter
          filters={filterConfig}
          columns={5}
          showSearch={true}
          showClearAll={true}
          className="mb-6"
        />
      </React.Suspense>
      <DynamicTable<Students>
        data={students}
        columns={columns}
        pagination={true}
        itemsPerPage={5}
        className="border border-gray-200 rounded-lg"
        headerClassName="bg-gray-100 text-gray-700"
        rowClassName="hover:bg-gray-50 border-b"
        cellClassName="p-3 text-center"
        emptyMessage="No students found"
        rowIdKey="id"
        selectable
        showRowNumbers
      />
    </div>
  );
};

export default StudentsTable;
