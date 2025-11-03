"use client";
import * as React from "react";
import DynamicTable from "@/components/UI/tables/DTable";
import DynamicTableFilter from "@/components/UI/DynamicTableFilter";
import {
  User,
  Clock,
  CheckCircle,
  XCircle,
  MapPin,
  MessageSquare,
  Edit,
} from "lucide-react";
import Link from "next/link";

interface Student {
  id: string;
  name: string;
  course: string;
  status: "active" | "completed" | "dropped";
  location: string;
  lastActivity: string;
}

const EnrollmentsStudentsTable: React.FC = () => {
  // Dummy data for students
  const students: Student[] = [
    {
      id: "1",
      name: "Ahmed Mohamed",
      course: "Advanced Cardiology",
      status: "active",
      location: "Cairo, Egypt",
      lastActivity: "2 days ago",
    },
    {
      id: "2",
      name: "Wei Zhang",
      course: "AI Fundamentals",
      status: "completed",
      location: "Beijing, China",
      lastActivity: "1 week ago",
    },
    {
      id: "3",
      name: "Carlos Rodriguez",
      course: "Spanish for Medical Professionals",
      status: "active",
      location: "Mexico City, Mexico",
      lastActivity: "1 day ago",
    },
    {
      id: "4",
      name: "Ama Mensah",
      course: "Public Health Certification",
      status: "dropped",
      location: "Accra, Ghana",
      lastActivity: "3 weeks ago",
    },
    {
      id: "5",
      name: "Elena Kowalska",
      course: "EU Law Fundamentals",
      status: "active",
      location: "Warsaw, Poland",
      lastActivity: "5 hours ago",
    },
  ];

  const columns = [
    {
      key: "name" as const,
      header: "Student",
      sortable: true,
      render: (student: Student) => (
        <div className="flex items-center gap-3">
          <div className="bg-green-100 p-2 rounded-lg">
            <User className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <Link
              href={`/students/${student.id}`}
              className="text-sm font-medium hover:underline"
            >
              {student.name}
            </Link>
            <p className="text-xs text-gray-500 flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {student.location}
            </p>
          </div>
        </div>
      ),
    },
    {
      key: "course" as const,
      header: "Course Name",
      sortable: true,
      render: (student: Student) => (
        <div>
          <span className="text-xs text-muted-foreground">{student.course}</span>
        </div>
      ),
    },
    {
      key: "status" as const,
      header: "Status",
      sortable: true,
      render: (student: Student) => {
        const statusConfig = {
          active: {
            icon: Clock,
            color: "text-blue-600 bg-blue-50",
            label: "Active",
          },
          completed: {
            icon: CheckCircle,
            color: "text-green-600 bg-green-50",
            label: "Completed",
          },
          dropped: {
            icon: XCircle,
            color: "text-red-600 bg-red-50",
            label: "Dropped",
          },
        };

        const { icon: Icon, color, label } = statusConfig[student.status];

        return (
          <span
            className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium ${color}`}
          >
            <Icon className="w-3 h-3" />
            {label}
          </span>
        );
      },
    },
    {
      key: "actions",
      header: "",
      align: "right",
      actions: {
        dropdownActions: [
          {
            label: "View Profile",
            icon: <User size={14} />,
            onClick: (student: Student) =>
              window.open(`/students/${student.id}`, "_blank"),
          },
          {
            label: "Send Message",
            icon: <MessageSquare size={14} />,
            onClick: (student: Student) =>
              console.log(`Message ${student.name}`),
          },
          {
            label: "Edit Record",
            icon: <Edit size={14} />,
            onClick: (student: Student) => console.log(`Edit ${student.name}`),
          },
        ],
      },
    },
  ];

  return (
    <div className="flex flex-col border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-xl font-bold text-gray-900">
            Recent Enrollments
          </h1>
        </div>
      </div>

      <React.Suspense>
        <DynamicTableFilter
          showSort
          columns={2}
          showSearch={true}
          className="mb-4"
        />
      </React.Suspense>

      <DynamicTable<Student>
        data={students}
        columns={columns}
        pagination={true}
        itemsPerPage={5}
        className="border border-gray-200 rounded-lg"
        headerClassName="bg-gray-100 text-gray-700"
        rowClassName="hover:bg-gray-50 border-b"
        cellClassName="p-3"
        rowIdKey="id"
        minWidth="600px"
      />
    </div>
  );
};

export default EnrollmentsStudentsTable;
