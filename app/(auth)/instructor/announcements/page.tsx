"use client";

import * as React from "react";
import DynamicTable from "@/components/UI/tables/DTable";
import DynamicTableFilter from "@/components/UI/DynamicTableFilter";
import {
  Calendar,
  BookOpen,
  Send,
  FileText,
  Edit,
  Archive,
  Info,
} from "lucide-react";
import { FilterConfigTable } from "@/types";

interface Announcement {
  id: string;
  title: string;
  course: string;
  date: string;
  time: string;
  details?: string;
}

const announcements: Announcement[] = [
  {
    id: "1",
    title: "Live Q&A Session Next Week",
    course: "PHP Beginners - Become a PHP Master",
    date: "November 1, 2022",
    time: "10:01 am",
    details:
      "Join us for a live Q&A session next week to discuss your questions.",
  },
  {
    id: "2",
    title: "Midterms Start in 2 Weeks!",
    course: "Nutrition: Build Your Perfect Diet & Meal Plan",
    date: "October 26, 2022",
    time: "8:02 am",
    details:
      "Midterm exams will begin in two weeks. Please prepare accordingly.",
  },
  {
    id: "3",
    title: "Welcome!",
    course: "Complete Financial Analyst Course",
    date: "October 20, 2022",
    time: "9:15 am",
    details: "Welcome to the course! We're excited to have you join us.",
  },
];

const AnnouncementsPage: React.FC = () => {
  const filterConfig: FilterConfigTable[] = [
    {
      id: "course",
      label: "Courses",
      options: [
        {
          value: "All",
          label: "All",
          count: announcements.length,
        },
        {
          value: "PHP Beginners - Become a PHP Master",
          label: "PHP Beginners - Become a PHP Master",
          count: announcements.filter(
            (a) => a.course === "PHP Beginners - Become a PHP Master"
          ).length,
        },
        {
          value: "Nutrition: Build Your Perfect Diet & Meal Plan",
          label: "Nutrition: Build Your Perfect Diet & Meal Plan",
          count: announcements.filter(
            (a) => a.course === "Nutrition: Build Your Perfect Diet & Meal Plan"
          ).length,
        },
        {
          value: "Complete Financial Analyst Course",
          label: "Complete Financial Analyst Course",
          count: announcements.filter(
            (a) => a.course === "Complete Financial Analyst Course"
          ).length,
        },
      ],
      placeholder: "Select course",
      icon: BookOpen,
    },
    {
      id: "date",
      label: "Date",
      options: [
        {
          value: "DESC",
          label: "Newest first",
        },
        {
          value: "ASC",
          label: "Oldest first",
        },
      ],
      placeholder: "Sort by",
      icon: Calendar,
    },
  ];

  const columns = [
    {
      key: "date",
      header: "Date",
      sortable: true,
      render: (announcement: Announcement) => (
        <div className="flex flex-col">
          <span className="font-medium text-sm">{announcement.date}</span>
          <span className="text-xs text-gray-500">{announcement.time}</span>
        </div>
      ),
    },
    {
      key: "title",
      header: "Announcements",
      sortable: true,
      render: (announcement: Announcement) => (
        <div className="flex flex-col">
          <span className="font-medium text-sm">{announcement.title}</span>
          <span className="text-xs text-gray-500">
            Course: {announcement.course}
          </span>
        </div>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      sortable: false,
      actions: {
        primaryActions: [
          {
            label: "Details",
            icon: <Info size={14} />,
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
    <div className="flex flex-col gap-6 px-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Announcements</h1>
        <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
          Create Announcement
        </button>
      </div>

      <div className="flex flex-col border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
        <React.Suspense fallback={<div>Loading...</div>}>
          <DynamicTableFilter
            filters={filterConfig}
            columns={2}
            showSearch={true}
            showClearAll={true}
            className="mb-6"
          />
        </React.Suspense>
        <DynamicTable<Announcement>
          data={announcements}
          columns={columns}
          pagination={true}
          itemsPerPage={10}
          className="border border-gray-200 rounded-lg"
          headerClassName="bg-gray-100 text-gray-700"
          rowClassName="hover:bg-gray-50 border-b"
          cellClassName="p-4"
          emptyMessage="No announcements found"
          rowIdKey="id"
          selectable
          showRowNumbers
        />
      </div>
    </div>
  );
};

export default AnnouncementsPage;
