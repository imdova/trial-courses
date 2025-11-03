"use client";
import * as React from "react";
import DynamicTable from "@/components/UI/tables/DTable";
import DynamicTableFilter from "@/components/UI/DynamicTableFilter";
import {
  FileText,
  Timer,
  Percent,
  Eye,
  Layers,
  Smartphone,
  ChartNoAxesColumnIncreasing,
  Send,
  Edit,
  Archive,
} from "lucide-react";
import { FilterConfigTable } from "@/types";
import Image from "next/image";
import { useRouter } from "next/navigation";

type Student = {
  id: string;
  name: string;
  avatar: string;
  email: string;
};

type QuizAttempt = {
  id: string;
  studentId: string;
  score: number;
  totalQuestions: number;
  passingScore: number;
  status: "passed" | "failed";
  attemptDate: string;
  timeSpent: string;
  answers: { isCorrect: boolean }[];
};

type TableData = {
  studentName: string;
  studentEmail: string;
  studentImage: string;
  score: number;
  passingScore: number;
  status: "passed" | "failed";
  attemptDate: string;
  timeSpent: string;
  plays: number;
  device?: string; // optional
};

// Sample data
const students: Student[] = [
  {
    id: "s1",
    name: "Layla Ahmed",
    email: "layla.ahmed@example.com",
    avatar: "/avatars/4.jpg",
  },
  {
    id: "s2",
    name: "Omar Khaled",
    email: "omar.khaled@example.com",
    avatar: "/avatars/5.jpg",
  },
  {
    id: "s3",
    name: "Nour Hassan",
    email: "nour.hassan@example.com",
    avatar: "/avatars/6.jpg",
  },
  {
    id: "s4",
    name: "Youssef Nabil",
    email: "youssef.nabil@example.com",
    avatar: "/avatars/7.jpg",
  },
];

const quizAttempts: QuizAttempt[] = [
  {
    id: "a1",
    studentId: "s1",
    score: 85,
    totalQuestions: 10,
    passingScore: 70,
    status: "passed",
    attemptDate: "2023-10-15T09:30:00Z",
    timeSpent: "12:30",
    answers: Array(10).fill({ isCorrect: true }),
  },
  {
    id: "a2",
    studentId: "s1",
    score: 65,
    totalQuestions: 8,
    passingScore: 75,
    status: "failed",
    attemptDate: "2023-10-18T14:15:00Z",
    timeSpent: "08:45",
    answers: Array(5)
      .fill({ isCorrect: true })
      .concat(Array(3).fill({ isCorrect: false })),
  },
  {
    id: "a3",
    studentId: "s2",
    score: 92,
    totalQuestions: 10,
    passingScore: 70,
    status: "passed",
    attemptDate: "2023-10-16T11:20:00Z",
    timeSpent: "15:20",
    answers: Array(9)
      .fill({ isCorrect: true })
      .concat(Array(1).fill({ isCorrect: false })),
  },
  {
    id: "a4",
    studentId: "s3",
    score: 78,
    totalQuestions: 10,
    passingScore: 70,
    status: "passed",
    attemptDate: "2023-10-17T16:45:00Z",
    timeSpent: "10:15",
    answers: Array(8)
      .fill({ isCorrect: true })
      .concat(Array(2).fill({ isCorrect: false })),
  },
];

type QuizStudentData = {
  student_name: string;
  email: string;
  date: string;
  time_taken: number;
  score: number;
  plays: string;
  status: "passed" | "failed";
};

interface StudentQuizAttemptsTableProps {
  data?: QuizStudentData[];
}

const StudentQuizAttemptsTable: React.FC<StudentQuizAttemptsTableProps> = ({ data }) => {
  const router = useRouter();
  const [studentAttempts, setStudentAttempts] = React.useState<TableData[]>([]);

  React.useEffect(() => {
    // Use real data if provided, otherwise use dummy data
    if (data && data.length > 0) {
      const attempts = data.map((attempt, index) => ({
        studentName: attempt.student_name,
        studentEmail: attempt.email,
        studentImage: "/avatars/4.jpg", // Default avatar
        score: attempt.score,
        passingScore: 70, // Default passing score
        status: attempt.status,
        attemptDate: attempt.date,
        timeSpent: `${attempt.time_taken.toFixed(1)} mins`,
        plays: parseInt(attempt.plays),
        device: index % 2 === 0 ? "Mobile" : "Desktop",
      }));
      setStudentAttempts(attempts);
    } else {
      // Fallback to dummy data
      const attempts = quizAttempts.map((attempt, index) => {
        const student = students.find((s) => s.id === attempt.studentId)!;

        return {
          studentName: student.name,
          studentEmail: student.email,
          studentImage: student.avatar,
          score: attempt.score,
          passingScore: attempt.passingScore,
          status: attempt.status,
          attemptDate: attempt.attemptDate,
          timeSpent: attempt.timeSpent,
          plays: Math.floor(Math.random() * 3) + 1,
          device: index % 2 === 0 ? "Mobile" : "Desktop",
        };
      });
      setStudentAttempts(attempts);
    }
  }, [data]);

  const filterConfig: FilterConfigTable[] = [
    {
      id: "status",
      label: "Status",
      options: [
        { value: "passed", label: "Passed", count: 18 },
        { value: "failed", label: "Failed", count: 5 },
        { value: "incomplete", label: "Incomplete", count: 2 },
      ],
      placeholder: "Select status",
      icon: Eye,
    },
    {
      id: "quiz",
      label: "Quiz Title",
      options: [
        { value: "quiz1", label: "World Capitals", count: 8 },
        { value: "quiz2", label: "Basic Mathematics", count: 6 },
        { value: "quiz3", label: "History of Science", count: 4 },
      ],
      placeholder: "Select quiz",
      icon: FileText,
      isSearchable: true,
    },
    {
      id: "score",
      label: "Score Range",
      options: [
        { value: "0-50", label: "0% - 50%" },
        { value: "51-70", label: "51% - 70%" },
        { value: "71-90", label: "71% - 90%" },
        { value: "91-100", label: "91% - 100%" },
      ],
      placeholder: "Select score range",
      icon: Percent,
    },
    {
      id: "attemptDate",
      label: "Attempt Date",
      options: [
        { value: "today", label: "Today" },
        { value: "week", label: "This Week" },
        { value: "month", label: "This Month" },
        { value: "older", label: "Older" },
      ],
      placeholder: "Select date range",
      icon: Layers,
    },
    {
      id: "timeSpent",
      label: "Time Spent",
      options: [
        { value: "fast", label: "< 5 mins" },
        { value: "average", label: "5-15 mins" },
        { value: "slow", label: "15+ mins" },
      ],
      placeholder: "Select time spent",
      icon: Timer,
    },
  ];

  const columns = [
    {
      key: "studentName" as const,
      header: "Student",
      sortable: true,
      render: (row: TableData) => (
        <div className="flex items-center gap-3">
          <Image
            src={row.studentImage}
            alt={row.studentName}
            width={40}
            height={40}
            className="rounded-full"
          />
          <div>
            <h3 className="text-sm font-medium">{row.studentName}</h3>
            <p className="text-xs text-gray-500">{row.studentEmail}</p>
          </div>
        </div>
      ),
    },
    {
      key: "attemptDate" as keyof TableData,
      header: "Date",
      sortable: true,
      render: (row: TableData) => (
        <span className="text-sm">
          {new Date(row.attemptDate).toLocaleDateString()}
        </span>
      ),
    },
    {
      key: "timeSpent" as keyof TableData,
      header: "Time Taken",
      sortable: true,
      render: (row: TableData) => (
        <div className="flex items-center gap-1">
          <Timer className="w-4 h-4 text-gray-500" />
          <span className="text-sm">{row.timeSpent}</span>
        </div>
      ),
    },
    {
      key: "score" as keyof TableData,
      header: "Score",
      sortable: true,
      render: (row: TableData) => (
        <div className="flex items-center gap-2">
          <span
            className={`px-2 py-1 rounded-lg font-medium ${
              row.status === "passed"
                ? "text-green-600 bg-green-50"
                : "text-red-600 bg-red-50"
            }`}
          >
            <div className="flex items-center gap-2 text-xs">
              <ChartNoAxesColumnIncreasing size={14} /> {row.score}%
            </div>
          </span>
        </div>
      ),
    },
    {
      key: "plays" as keyof TableData,
      header: "Plays",
      sortable: true,
      render: (row: TableData) => (
        <span className="text-sm text-gray-700">{row.plays}</span>
      ),
    },
    {
      key: "status" as keyof TableData,
      header: "Status",
      sortable: true,
      render: (row: TableData) => (
        <span
          className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
            row.status === "passed"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {row.status === "passed" ? "Passed" : "Failed"}
        </span>
      ),
    },
    {
      key: "device" as keyof TableData,
      header: "Device",
      sortable: false,
      render: (row: TableData) => (
        <div className="flex items-center gap-1 text-sm text-gray-600">
          <Smartphone className="w-4 h-4 text-gray-500" />
          {row.device || "Unknown"}
        </div>
      ),
    },
    {
      key: "result",
      header: "Result",
      actions: {
        primaryActions: [
          {
            label: "View",
            icon: <Eye size={15} />,
            onClick: () => router.replace("/instructor/quizzes/results/1"),
            className: "text-blue-600 hover:bg-blue-50",
          },
        ],
      },
    },
    {
      key: "actions",
      header: "Actions",
      actions: {
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
    <div>
      <React.Suspense fallback={<div>Loading...</div>}>
        <DynamicTableFilter
          filters={filterConfig}
          columns={4}
          showSearch={true}
          showClearAll={true}
          className="mb-6"
        />
      </React.Suspense>
      <DynamicTable<TableData>
        data={studentAttempts}
        columns={columns}
        pagination={true}
        itemsPerPage={10}
        className="border border-gray-200 rounded-lg"
        headerClassName="bg-gray-100 text-gray-700"
        rowClassName="hover:bg-gray-50 border-b"
        cellClassName="p-3"
        emptyMessage="No quiz attempts found"
        selectable
      />
    </div>
  );
};

export default StudentQuizAttemptsTable;
