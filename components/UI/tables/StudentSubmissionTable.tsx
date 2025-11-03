/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import * as React from "react";
import { useParams } from "next/navigation";
import { useAssignments } from "@/app/(auth)/instructor/assignments/hooks/useAssignments";
import { StudentSubmissionFilters } from "@/store/slices/assignmentsSlice";
import DynamicTable from "@/components/UI/tables/DTable";
import DynamicTableFilter from "@/components/UI/DynamicTableFilter";
import {
  FileText,
  // Timer,
  Percent,
  Eye,
  Layers,
  // Smartphone,
  ChartNoAxesColumnIncreasing,
  Send,
  Edit,
  CheckCircle2,
  XCircle,
  Clock,
  Download
} from "lucide-react";
import { FilterConfigTable } from "@/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
// import { StudentsData } from "@/constants/students.data";

type TableData = {
  studentName: string;
  studentEmail: string;
  studentImage: string;
  score: number | null;
  totalPoints: number;
  status: "submitted" | "graded" | "late" | "missing";
  submissionDate: string;
  timeSpent: string;
  attempts: number;
  device?: string;
};

// Move the filters state inside the component
const StudentSubmissionTable: React.FC = () => {
  const [filters, setFilters] = React.useState<StudentSubmissionFilters>({
    status: undefined,
    startDate: '',
    endDate: '',
    minScore: undefined,
    maxScore: undefined,
    page: 1,
    limit: 10
  });
  
  const router = useRouter();
  const params = useParams();
  const { getAssignmentStudents, studentSubmissions, studentSubmissionsMeta, loading } = useAssignments();
  const [submissions, setSubmissions] = React.useState<TableData[]>([]);
  const [currentPage, setCurrentPage] = React.useState(1);

  // Fetch students when component mounts or filters change
  React.useEffect(() => {
    if (params.slug) {
      getAssignmentStudents(params.slug as string, {
        status: filters.status,
        startDate: filters.startDate,
        endDate: filters.endDate,
        minScore: filters.minScore,
        maxScore: filters.maxScore,
        page: currentPage,
        limit: 10
      });
    }
  }, [params.slug, getAssignmentStudents, currentPage, filters]);

  // Transform API data to table format
  React.useEffect(() => {
    if (studentSubmissions) {
      const submissionData = studentSubmissions.map((submission: any) => ({
        studentName: submission.student.name,
        studentEmail: submission.student.email,
        studentImage: submission.student.avatar || '/default-avatar.png',
        score: submission.score,
        totalPoints: submission.totalPoints,
        status: submission.status,
        submissionDate: submission.submissionDate,
        timeSpent: submission.timeSpent,
        attempts: submission.attempts || 1,
      }));
      setSubmissions(submissionData);
    }
  }, [studentSubmissions]);

  // Handle filter changes
  const handleFilterChange = (filterId: string, value: string) => {
    const newFilters = { ...filters };
    
    switch (filterId) {
      case 'status':
        // Only set allowed status values
        newFilters.status = value as 'submitted' | 'graded' | undefined;
        break;
      case 'score':
        const [min, max] = value.split('-').map(Number);
        newFilters.minScore = min;
        newFilters.maxScore = max;
        break;
      case 'submissionDate':
        const now = new Date();
        switch (value) {
          case 'today':
            newFilters.startDate = now.toISOString().split('T')[0];
            newFilters.endDate = now.toISOString().split('T')[0];
            break;
          case 'week':
            const weekAgo = new Date(now.setDate(now.getDate() - 7));
            newFilters.startDate = weekAgo.toISOString().split('T')[0];
            newFilters.endDate = new Date().toISOString().split('T')[0];
            break;
        }
        break;
    }
    
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page when filters change
  };

  const clearFilters = () => {
    setFilters({
      status: undefined,
      startDate: '',
      endDate: '',
      minScore: undefined,
      maxScore: undefined,
      page: 1,
      limit: 10
    });
    setCurrentPage(1);
  };

  // Update the filter config to use the new handler
  const filterConfig: FilterConfigTable[] = [
    {
      id: "status",
      label: "Status",
      options: [
        { value: "graded", label: "Graded" },
        { value: "submitted", label: "Submitted" },
        { value: "late", label: "Late" },
        { value: "missing", label: "Missing" },
      ],
      placeholder: "Select status",
      icon: Eye,
      onChange: (value) => handleFilterChange("status", value),
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
      onChange: (value) => handleFilterChange("score", value),
    },
    {
      id: "submissionDate",
      label: "Submission Date",
      options: [
        { value: "today", label: "Today" },
        { value: "week", label: "This Week" },
        { value: "month", label: "This Month" },
        { value: "older", label: "Older" },
      ],
      placeholder: "Select date range",
      icon: Layers,
      onChange: (value) => handleFilterChange("submissionDate", value),
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
      key: "submissionDate" as keyof TableData,
      header: "Submitted",
      sortable: true,
      render: (row: TableData) => (
        <span className="text-sm">
          {row.submissionDate
            ? new Date(row.submissionDate).toLocaleDateString()
            : "-"}
        </span>
      ),
    },
    {
      key: "score" as keyof TableData,
      header: "Score",
      sortable: true,
      render: (row: TableData) => (
        <div className="flex items-center gap-2">
          {row.score !== null ? (
            <span
              className={`px-2 py-1 rounded-lg font-medium ${
                row.score >= 70
                  ? "text-green-600 bg-green-50"
                  : "text-red-600 bg-red-50"
              }`}
            >
              <div className="flex items-center gap-2 text-xs">
                <ChartNoAxesColumnIncreasing size={14} /> {row.score}/
                {row.totalPoints}
              </div>
            </span>
          ) : (
            <span className="text-sm text-gray-500">-</span>
          )}
        </div>
      ),
    },
    {
      key: "status" as keyof TableData,
      header: "Status",
      sortable: true,
      render: (row: TableData) => {
        const statusConfig = {
          graded: {
            icon: <CheckCircle2 size={14} className="text-green-500" />,
            text: "Graded",
            bg: "bg-green-100",
            textColor: "text-green-800",
          },
          submitted: {
            icon: <Clock size={14} className="text-blue-500" />,
            text: "Submitted",
            bg: "bg-blue-100",
            textColor: "text-blue-800",
          },
          late: {
            icon: <Clock size={14} className="text-orange-500" />,
            text: "Late",
            bg: "bg-orange-100",
            textColor: "text-orange-800",
          },
          missing: {
            icon: <XCircle size={14} className="text-red-500" />,
            text: "Missing",
            bg: "bg-red-100",
            textColor: "text-red-800",
          },
        };

        const config = statusConfig[row.status];

        return (
          <div className="flex items-center gap-2">
            {config.icon}
            <span
              className={`text-xs px-2 py-0.5 rounded-full font-semibold ${config.bg} ${config.textColor}`}
            >
              {config.text}
            </span>
          </div>
        );
      },
    },
    {
      key: "result",
      header: "View",
      actions: {
        primaryActions: [
          {
            label: "View",
            icon: <div className="flex items-center gap-1">
              <Eye size={15}  />
              <Download size={15} />
            </div>,
            onClick: () => router.replace("/instructor/assignments/results/1"),
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
            label: "Grade",
            icon: <Edit size={14} />,
            onClick: () => console.log("Grade clicked"),
          },
          {
            label: "Give Feedback",
            icon: <FileText size={14} />,
            onClick: () => console.log("Feedback clicked"),
          },
          {
            label: "Send Reminder",
            icon: <Send size={14} />,
            onClick: () => console.log("Reminder clicked"),
          },
          {
            label: "Mark Missing",
            icon: <XCircle size={14} />,
            onClick: () => console.log("Mark Missing clicked"),
            className: "text-red-600",
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
          onClearAll={() => {
            clearFilters();
          }}
        />
      </React.Suspense>
      <DynamicTable<TableData>
        data={submissions}
        columns={columns}
        pagination={true}
        itemsPerPage={10}
        currentPage={currentPage}
        totalItems={studentSubmissionsMeta?.total || 0}
        onPageChange={setCurrentPage}
        loading={loading}
        className="border border-gray-200 rounded-lg"
        headerClassName="bg-gray-100 text-gray-700"
        rowClassName="hover:bg-gray-50 border-b"
        cellClassName="p-3"
        emptyMessage="No submissions found"
        selectable
      />
    </div>
  );
};

export default StudentSubmissionTable;
