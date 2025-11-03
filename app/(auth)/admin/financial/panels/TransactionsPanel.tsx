"use client";
import { useState } from "react";
import Image from "next/image";
import { Download, Eye, ListFilter } from "lucide-react";
import SearchBar from "@/components/UI/form/search-Input";
import DynamicTable from "@/components/UI/tables/DTable";
import Link from "next/link";
import { Instructor, StudentProfile } from "@/types/courses";
import { generatePrefixId } from "@/util/user";

type StudentsTransactions = {
  id: string;
  student: StudentProfile;
  instructor: Instructor;
  course: string;
  date: string;
  invoice: number;
  amount: number;
  method: string;
  view_url: string;
};

type InstructorTransactions = {
  id: string;
  student: StudentProfile;
  instructor: Instructor;
  course: string;
  date: string;
  invoice: number;
  amount: number;
  method: string;
  view_url: string;
};

const studentTransactions: StudentsTransactions[] = [
  {
    id: "1",
    student: {
      id: "1",
      name: "Ahmed Mohamed",
      email: "ahmed.m@student.edu",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      phone: "",
      country: "",
      joinDate: "",
      type: "",
      enrolledCourses: 0,
      completedCourses: 0,
      gradeAverage: "",
      accountManager: "",
      isActive: false,
      isTopPerformer: false,
      info: "",
      education: "",
      age: 0,
      status: "",
      certificates: [],
      specializations: [],
      languages: [],
      yearOfStudy: 0,
      details: "",
      performanceReviews: [],
      gender: "male",
      studentId: generatePrefixId(),
      state: "",
      speciality: "",
      category: "",
    },
    course: "Cardiology Basics",
    instructor: {
      id: "1",
      name: "Dr. Sarah Johnson",
      email: "s.johnson@medacademy.edu",
      avatar: "https://randomuser.me/api/portraits/women/65.jpg",
      info: "",
      phone: "",
      country: "",
      joinDate: "",
      type: "",
      courses: 0,
      students: 0,
      revenu: "",
      accountManager: "",
      isActive: false,
      isTop: false,
      education: "",
      age: 0,
      status: "",
      reviews: 0,
      sales: 0,
      details: "",
      qualifications: [],
      certificates: [],
      languages: [],
      experience: 0,
      reviews_content: [],
    },
    date: "2024-09-03",
    invoice: 1001,
    amount: 200,
    method: "Credit Card",
    view_url: "/invoices/1001",
  },
  {
    id: "2",
    student: {
      id: "1",
      name: "Ahmed Mohamed",
      email: "ahmed.m@student.edu",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      phone: "",
      country: "",
      joinDate: "",
      type: "",
      enrolledCourses: 0,
      completedCourses: 0,
      gradeAverage: "",
      accountManager: "",
      isActive: false,
      isTopPerformer: false,
      info: "",
      education: "",
      age: 0,
      status: "",
      certificates: [],
      specializations: [],
      languages: [],
      yearOfStudy: 0,
      details: "",
      performanceReviews: [],
      gender: "male",
      studentId: generatePrefixId(),
      state: "",
      speciality: "",
      category: "",
    },
    course: "Medical Ethics",
    instructor: {
      id: "1",
      name: "Dr. Sarah Johnson",
      email: "s.johnson@medacademy.edu",
      avatar: "https://randomuser.me/api/portraits/women/65.jpg",
      info: "",
      phone: "",
      country: "",
      joinDate: "",
      type: "",
      courses: 0,
      students: 0,
      revenu: "",
      accountManager: "",
      isActive: false,
      isTop: false,
      education: "",
      age: 0,
      status: "",
      reviews: 0,
      sales: 0,
      details: "",
      qualifications: [],
      certificates: [],
      languages: [],
      experience: 0,
      reviews_content: [],
    },
    date: "2024-09-03",
    invoice: 1002,
    amount: 150,
    method: "PayPal",
    view_url: "/invoices/1002",
  },
];

const instructorTransactions: InstructorTransactions[] = [
  {
    id: "1",
    instructor: {
      id: "1",
      name: "Dr. Sarah Johnson",
      email: "s.johnson@medacademy.edu",
      avatar: "https://randomuser.me/api/portraits/women/65.jpg",
      info: "",
      phone: "",
      country: "",
      joinDate: "",
      type: "",
      courses: 0,
      students: 0,
      revenu: "",
      accountManager: "",
      isActive: false,
      isTop: false,
      education: "",
      age: 0,
      status: "",
      reviews: 0,
      sales: 0,
      details: "",
      qualifications: [],
      certificates: [],
      languages: [],
      experience: 0,
      reviews_content: [],
    },
    course: "Cardiology Basics",
    student: {
      id: "1",
      name: "Ahmed Mohamed",
      email: "ahmed.m@student.edu",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      phone: "",
      country: "",
      joinDate: "",
      type: "",
      enrolledCourses: 0,
      completedCourses: 0,
      gradeAverage: "",
      accountManager: "",
      isActive: false,
      isTopPerformer: false,
      info: "",
      education: "",
      age: 0,
      status: "",
      certificates: [],
      specializations: [],
      languages: [],
      yearOfStudy: 0,
      details: "",
      performanceReviews: [],
      gender: "male",
      studentId: generatePrefixId(),
      state: "",
      speciality: "",
      category: "",
    },
    date: "2024-09-03",
    invoice: 1001,
    amount: 200,
    method: "Credit Card",
    view_url: "/invoices/1001",
  },
  {
    id: "2",
    instructor: {
      id: "1",
      name: "Dr. Sarah Johnson",
      email: "s.johnson@medacademy.edu",
      avatar: "https://randomuser.me/api/portraits/women/65.jpg",
      info: "",
      phone: "",
      country: "",
      joinDate: "",
      type: "",
      courses: 0,
      students: 0,
      revenu: "",
      accountManager: "",
      isActive: false,
      isTop: false,
      education: "",
      age: 0,
      status: "",
      reviews: 0,
      sales: 0,
      details: "",
      qualifications: [],
      certificates: [],
      languages: [],
      experience: 0,
      reviews_content: [],
    },
    course: "Medical Ethics",
    student: {
      id: "1",
      name: "Ahmed Mohamed",
      email: "ahmed.m@student.edu",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      phone: "",
      country: "",
      joinDate: "",
      type: "",
      enrolledCourses: 0,
      completedCourses: 0,
      gradeAverage: "",
      accountManager: "",
      isActive: false,
      isTopPerformer: false,
      info: "",
      education: "",
      age: 0,
      status: "",
      certificates: [],
      specializations: [],
      languages: [],
      yearOfStudy: 0,
      details: "",
      performanceReviews: [],
      gender: "male",
      studentId: generatePrefixId(),
      state: "",
      speciality: "",
      category: "",
    },
    date: "2024-09-03",
    invoice: 1002,
    amount: 150,
    method: "PayPal",
    view_url: "/invoices/1002",
  },
];

const columnsStudents = [
  { key: "id", header: "ID", sortable: true },
  {
    key: "name",
    header: "Name",
    render: (student: StudentsTransactions) => (
      <Link
        href={`/admin/students/${student.student.id}`}
        className="flex items-center gap-2"
      >
        <Image
          className="h-8 w-8 rounded-full object-cover"
          src={student.student.avatar}
          width={200}
          height={200}
          alt={student.student.name}
        />
        <div>
          <h2 className="text-sm">{student.student.name}</h2>
          <p className="text-muted-foreground text-xs">
            {student.student.email}
          </p>
        </div>
      </Link>
    ),
  },
  { key: "course", header: "Course" },
  {
    key: "instructor",
    header: "Instructor",
    render: (student: StudentsTransactions) => (
      <Link
        href={`/admin/instructors/${student.instructor.id}`}
        className="flex items-center gap-2"
      >
        <Image
          className="h-8 w-8 rounded-full object-cover"
          src={student.instructor.avatar}
          width={200}
          height={200}
          alt={student.instructor.name}
        />
        <h2 className="text-sm">{student.instructor.name}</h2>
      </Link>
    ),
  },
  { key: "date", header: "Date" },
  { key: "invoice", header: "Invoice", sortable: true },
  {
    key: "amount",
    header: "Amount",
    render: (student: StudentsTransactions) => {
      return <span>{student.amount} EGP</span>;
    },
  },
  {
    key: "method",
    header: "Method",
  },
  {
    key: "view_url",
    header: "View",
    render: (student: StudentsTransactions) => (
      <Link
        href={student.view_url}
        className="flex justify-center text-green-600 hover:text-green-800 hover:underline"
      >
        <Eye size={20} />
      </Link>
    ),
  },
];

const columnsInstructors = [
  { key: "id", header: "ID", sortable: true },
  {
    key: "name",
    header: "Name",
    render: (instructor: InstructorTransactions) => (
      <Link
        href={`/admin/instructors/${instructor.instructor.id}`}
        className="flex items-center gap-2"
      >
        <Image
          className="h-8 w-8 rounded-full object-cover"
          src={instructor.instructor.avatar}
          width={200}
          height={200}
          alt={instructor.instructor.name}
        />
        <div>
          <h2 className="text-sm">{instructor.instructor.name}</h2>
          <p className="text-muted-foreground text-xs">
            {instructor.instructor.email}
          </p>
        </div>
      </Link>
    ),
  },
  { key: "course", header: "Course" },
  {
    key: "student",
    header: "Student",
    render: (instructor: InstructorTransactions) => (
      <Link
        href={`/admin/students/${instructor.student.id}`}
        className="flex items-center gap-2"
      >
        <Image
          className="h-8 w-8 rounded-full object-cover"
          src={instructor.student.avatar}
          width={200}
          height={200}
          alt={instructor.student.name}
        />
        <h2 className="text-sm">{instructor.student.name}</h2>
      </Link>
    ),
  },
  { key: "date", header: "Date" },
  { key: "invoice", header: "Invoice", sortable: true },
  {
    key: "amount",
    header: "Amount",
    render: (instructor: InstructorTransactions) => {
      return <span>{instructor.amount} EGP</span>;
    },
  },
  {
    key: "method",
    header: "Method",
  },
  {
    key: "view_url",
    header: "View",
    render: (instructor: InstructorTransactions) => (
      <Link
        href={instructor.view_url}
        className="flex justify-center text-green-600 hover:text-green-800 hover:underline"
      >
        <Eye size={20} />
      </Link>
    ),
  },
];

export default function TransactionsPanel() {
  const [tabTable, setTabTable] = useState<"students" | "instructors">(
    "students",
  );
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filters, setFilters] = useState({
    course: "",
    method: "",
    dateRange: "",
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const filteredStudents = studentTransactions.filter((s) => {
    const matchSearch = s.student.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchCourse = filters.course ? s.course === filters.course : true;
    const matchDate = filters.dateRange ? s.date === filters.dateRange : true;
    const matchMethod = filters.method ? s.method === filters.method : true;

    return matchSearch && matchCourse && matchDate && matchMethod;
  });

  const filteredInstructors = instructorTransactions.filter((s) => {
    const matchSearch = s.instructor.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchCourse = filters.course ? s.course === filters.course : true;
    const matchDate = filters.dateRange ? s.date === filters.dateRange : true;
    const matchMethod = filters.method ? s.method === filters.method : true;

    return matchSearch && matchCourse && matchDate && matchMethod;
  });

  const getUniqueValues = <
    K extends keyof StudentsTransactions | keyof InstructorTransactions,
  >(
    key: K,
  ) => {
    const data =
      tabTable === "students" ? studentTransactions : instructorTransactions;
    return Array.from(
      new Set(
        data.map((item) => {
          if (tabTable === "students") {
            return (item as StudentsTransactions)[
              key as keyof StudentsTransactions
            ];
          } else {
            return (item as InstructorTransactions)[
              key as keyof InstructorTransactions
            ];
          }
        }),
      ),
    ) as (
      | StudentsTransactions[K & keyof StudentsTransactions]
      | InstructorTransactions[K & keyof InstructorTransactions]
    )[];
  };

  return (
    <div className="relative w-full rounded-lg border bg-white p-4 shadow-sm">
      {/* Header Controls */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-800">
          All Transactions
        </h2>
        <p className="text-sm text-gray-500">
          View and manage all your course transactions
        </p>
      </div>
      {/* Filter Dropdowns*/}
      <div className="mb-4 flex flex-col justify-between gap-4 xl:flex-row">
        <SearchBar
          parentClassName="w-full"
          placeholder="Search Transactions"
          onSearch={handleSearch}
        />
        <div className="flex w-full flex-col items-center justify-between gap-3 sm:flex-row">
          <select
            className="w-full rounded-md border px-2 py-2 outline-none"
            value={filters.course}
            onChange={(e) => setFilters({ ...filters, course: e.target.value })}
          >
            <option value="">All Course</option>
            {getUniqueValues("course").map((c: string) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <div className="flex w-full items-center gap-2">
            <select
              className="w-full rounded-md border px-2 py-2 outline-none"
              value={filters.dateRange}
              onChange={(e) =>
                setFilters({ ...filters, dateRange: e.target.value })
              }
            >
              <option value="">Date Range</option>
              {getUniqueValues("date")
                .sort()
                .map((date: string) => (
                  <option key={date} value={date}>
                    {date}
                  </option>
                ))}
            </select>
            <button className="text-muted-foreground rounded-md border p-3">
              <ListFilter size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Filter Dropdowns */}
      <div className="mb-4 flex flex-col-reverse items-start justify-between gap-3 lg:flex-row lg:items-center">
        <div className="flex w-full flex-col items-center justify-end gap-3 lg:flex-row">
          <select
            className="w-full rounded-md border px-2 py-2 outline-none sm:w-[200px]"
            value={filters.method}
            onChange={(e) => setFilters({ ...filters, method: e.target.value })}
          >
            <option value="">Method</option>
            {getUniqueValues("method").map((m: string) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
          <button className="flex w-full items-center justify-center gap-2 rounded-md border p-2 lg:w-fit">
            <Download size={15} />
            Export CSV
          </button>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border p-3 shadow-sm">
        {/* Recent Transactions Table */}
        <div className="mb-6 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
          <div className="flex space-x-4 font-medium">
            <button
              className={`rounded-md px-4 py-2 text-sm ${
                tabTable === "students"
                  ? "bg-primary text-white"
                  : "text-muted-foreground bg-gray-200"
              }`}
              onClick={() => setTabTable("students")}
            >
              Students Transactions
            </button>
            <button
              className={`rounded-md px-3 py-2 text-sm ${
                tabTable === "instructors"
                  ? "bg-primary text-white"
                  : "text-muted-foreground bg-gray-200"
              }`}
              onClick={() => setTabTable("instructors")}
            >
              Instructors Transactions
            </button>
          </div>
          <button className="font-medium text-green-500">View All</button>
        </div>

        {tabTable === "students" ? (
          <DynamicTable
            selectable={true}
            columns={columnsStudents}
            data={filteredStudents}
            defaultSort={{ key: "date", direction: "desc" }}
          />
        ) : (
          <DynamicTable
            selectable={true}
            columns={columnsInstructors}
            data={filteredInstructors}
            defaultSort={{ key: "date", direction: "desc" }}
            pagination
          />
        )}
      </div>
    </div>
  );
}
