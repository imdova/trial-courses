"use client";
import DynamicStatisticsChart from "@/components/UI/Charts/DynamicStatisticsChart";
import DynamicTable from "@/components/UI/tables/DTable";
import { dummyRevenueData } from "@/constants/charts/chart.data";
import { instructors } from "@/constants/instructors.data";
import { StudentsData } from "@/constants/students.data";
import { Instructor, StudentProfile } from "@/types/courses";
import { generatePrefixId } from "@/util/user";
import {
  ArrowUp,
  BookOpen,
  DollarSign,
  Eye,
  UserCog,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type StudentsTransactions = {
  id: string;
  student: StudentProfile;
  instructor: Instructor;
  course: string;
  date: string;
  invoice: number;
  amount: number;
  methoud: string;
  view_url: string;
};

type InstructorTransactions = {
  id: string;
  course: string;
  student: StudentProfile;
  instructor: Instructor;
  date: string;
  invoice: number;
  amount: number;
  methoud: string;
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
    methoud: "Credit Card",
    view_url: "/invoices/1001",
  },
  {
    id: "2",
    student: {
      id: "2",
      name: "Yuki Tanaka",
      email: "y.tanaka@techstudent.jp",
      avatar: "https://randomuser.me/api/portraits/women/28.jpg",
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
    methoud: "PayPal",
    view_url: "/invoices/1002",
  },
  {
    id: "3",
    student: {
      id: "3",
      name: "Carlos Mendez",
      email: "c.mendez@langstudent.mx",
      avatar: "https://randomuser.me/api/portraits/men/68.jpg",
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
    course: "Anatomy & Physiology",
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
    date: "2024-09-02",
    invoice: 1003,
    amount: 180,
    methoud: "Bank Transfer",
    view_url: "/invoices/1003",
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
    methoud: "Credit Card",
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
    methoud: "PayPal",
    view_url: "/invoices/1002",
  },
  {
    id: "3",
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
    course: "Anatomy & Physiology",
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
    date: "2024-09-02",
    invoice: 1003,
    amount: 180,
    methoud: "Bank Transfer",
    view_url: "/invoices/1003",
  },
];

const columnsStudents = [
  { key: "id", header: "ID", sortable: true },
  {
    key: "name",
    header: "Name",
    render: (student: StudentsTransactions) => (
      <Link
        href={`/admin/students/profile/${student.student.id}`}
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
    render: (instructor: StudentsTransactions) => (
      <Link
        href={`/admin/instructors/profile/${instructor.instructor.id}`}
        className="flex items-center gap-2"
      >
        <Image
          className="h-8 w-8 rounded-full object-cover"
          src={instructor.instructor.avatar}
          width={200}
          height={200}
          alt={instructor.instructor.name}
        />
        <h2 className="text-sm">{instructor.instructor.name}</h2>
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
    key: "methoud",
    header: "Methoud",
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
        href={`/admin/instructors/profile/${instructor.instructor.id}`}
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
    render: (student: InstructorTransactions) => (
      <Link
        href={`/admin/students/profile/${student.student.id}`}
        className="flex items-center gap-2"
      >
        <Image
          className="h-8 w-8 rounded-full object-cover"
          src={student.student.avatar}
          width={200}
          height={200}
          alt={student.student.name}
        />
        <h2 className="text-sm">{student.student.name}</h2>
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
    key: "methoud",
    header: "Methoud",
  },
  {
    key: "view_url",
    header: "View",
    render: (student: InstructorTransactions) => (
      <Link
        href={student.view_url}
        className="flex justify-center text-green-600 hover:text-green-800 hover:underline"
      >
        <Eye size={20} />
      </Link>
    ),
  },
];

export default function OverviewPanel() {
  const [tab, setTab] = useState<"students" | "instructors">("students");
  const [tabTable, setTabTable] = useState<"students" | "instructors">(
    "students",
  );
  const data = tab === "students" ? StudentsData : instructors;
  return (
    <div>
      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        <div className="flex items-center gap-4 rounded-lg border bg-white p-4 shadow-sm">
          <div className="flex h-16 w-16 items-center justify-center rounded-md bg-[#DCFCE7] text-[#008236]">
            <DollarSign size={20} />
          </div>
          <div>
            <span className="block text-sm">Total Sales</span>
            <h1 className="font-bold">$24,563.00</h1>
            <span className="text-primary block text-xs">
              Lifetime earnings
            </span>
          </div>
        </div>
        <div className="flex items-center gap-4 rounded-lg border bg-white p-4 shadow-sm">
          <div className="flex h-16 w-16 items-center justify-center rounded-md bg-[#FEF3C6] text-[#FD9A00]">
            <DollarSign size={20} />
          </div>
          <div>
            <span className="block text-sm">Instructor Revenue</span>
            <h1 className="font-bold">$1,250.00</h1>
            <span className="text-primary block text-xs">
              Lifetime earnings
            </span>
          </div>
        </div>
        <div className="flex items-center gap-4 rounded-lg border bg-white p-4 shadow-sm">
          <div className="flex h-16 w-16 items-center justify-center rounded-md bg-[#DBEAFE] text-[#2B7FFF]">
            <DollarSign size={20} />
          </div>
          <div>
            <span className="block text-sm">Total Taxes</span>
            <h1 className="font-bold">$3,428.50</h1>
            <span className="text-primary block text-xs">
              Lifetime earnings
            </span>
          </div>
        </div>
        <div className="flex items-center gap-4 rounded-lg border bg-white p-4 shadow-sm">
          <div className="flex h-16 w-16 items-center justify-center rounded-md bg-[#DCFCE7] text-[#008236]">
            <ArrowUp size={20} />
          </div>
          <div>
            <span className="block text-sm">Total Net Income</span>
            <h1 className="font-bold">$2,845.00</h1>
            <span className="text-primary block text-xs">
              +18.2% from last month
            </span>
          </div>
        </div>
      </div>
      <div className="mb-4 flex flex-col gap-4 xl:flex-row">
        <div className="flex-1 rounded-lg border bg-white shadow-sm">
          {/* Revenue Growth Chart */}
          <div className="mb-4 overflow-hidden">
            <DynamicStatisticsChart
              data={dummyRevenueData}
              chartTitle="Sales Statistics"
              metrics={[
                {
                  key: "courses",
                  label: "Courses",
                  icon: <BookOpen size={20} />,
                  color: "#EC4899",
                },
                {
                  key: "students",
                  label: "Students",
                  icon: <Users size={20} />,
                  color: "#FFB543",
                },
                {
                  key: "instructors",
                  label: "Instructors",
                  icon: <UserCog size={20} />,
                  color: "#6366F1",
                },
              ]}
            />
          </div>
        </div>
        <div className="rounded-lg border bg-white p-4 shadow-sm xl:w-[400px]">
          <div>
            <div className="mb-6 flex items-center justify-between">
              <div className="flex space-x-4 font-medium">
                <button
                  className={`rounded-md px-4 py-2 text-sm ${
                    tab === "students"
                      ? "bg-primary text-white"
                      : "text-muted-foreground bg-gray-200"
                  }`}
                  onClick={() => setTab("students")}
                >
                  Top Students
                </button>
                <button
                  className={`rounded-md px-3 py-2 text-sm ${
                    tab === "instructors"
                      ? "bg-primary text-white"
                      : "text-muted-foreground bg-gray-200"
                  }`}
                  onClick={() => setTab("instructors")}
                >
                  Top Instructors
                </button>
              </div>

              <button className="text-sm font-medium text-green-500">
                View All
              </button>
            </div>

            <ul className="space-y-4">
              {data.map((user) => (
                <li key={user.id} className="flex items-center justify-between">
                  <Link
                    href={`/admin/${
                      tab === "students" ? "students" : "instructors"
                    }/${user.id}`}
                    className="flex items-center space-x-3"
                  >
                    <Image
                      src={user.avatar}
                      alt={user.name}
                      width={300}
                      height={300}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-gray-400">{user.joinDate}</p>
                    </div>
                  </Link>
                  <span className="text-sm font-semibold">{user.amount}$</span>
                </li>
              ))}
            </ul>
          </div>
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
            data={studentTransactions}
          />
        ) : (
          <DynamicTable
            selectable={true}
            columns={columnsInstructors}
            data={instructorTransactions}
          />
        )}
      </div>
    </div>
  );
}
