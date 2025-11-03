"use client";

import { useState } from "react";
import AdvancedDataTable from "../AdvancedDataTable";
import { Quiz } from "@/types/quiz";
import { instructors } from "@/constants/instructors.data";
import { generateQuizesColumns } from "@/components/columns/quizesColumns";

interface QuizzesTableProps {
  pagination?: boolean;
  isList?: boolean;
}

export default function QuizzesTable({
  pagination = false,
  isList = false,
}: QuizzesTableProps) {
  // Sample quiz data
  const [quizzes] = useState<Quiz[]>([
    {
      id: "QZ001",
      title: "JavaScript Fundamentals",
      instructor: instructors[0],
      date: "2023-10-15",
      questionsNum: 20,
      downloadLink: "#",
      viewLink: "/quizzes/QZ001",
      instructions: "",
      randomizeQuestions: false,
      immediateFeedback: false,
      feedbackByEmail: false,
      timeLimit: 0,
      passingScore: 0,
      retakeNumbers: 0,
      questions: [],
      avarageScore: 0,
      takeTime: "",
      questionsOrder: "",
    },
    {
      id: "QZ002",
      title: "Advanced CSS",
      instructor: instructors[0],
      date: "2024-02-20",
      questionsNum: 15,
      downloadLink: "#",
      viewLink: "/quizzes/QZ002",
      instructions: "",
      randomizeQuestions: false,
      immediateFeedback: false,
      feedbackByEmail: false,
      timeLimit: 0,
      passingScore: 0,
      retakeNumbers: 0,
      questions: [],
      avarageScore: 0,
      takeTime: "",
      questionsOrder: "",
    },
    {
      id: "QZ003",
      title: "React Basics",
      instructor: instructors[1],
      date: "2023-11-05",
      questionsNum: 18,
      downloadLink: "#",
      viewLink: "/quizzes/QZ003",
      instructions: "",
      randomizeQuestions: false,
      immediateFeedback: false,
      feedbackByEmail: false,
      timeLimit: 0,
      passingScore: 0,
      retakeNumbers: 0,
      questions: [],
      avarageScore: 0,
      takeTime: "",
      questionsOrder: "",
    },
    {
      id: "QZ004",
      title: "TypeScript Essentials",
      instructor: instructors[2],
      date: "2024-01-12",
      questionsNum: 22,
      downloadLink: "#",
      viewLink: "/quizzes/QZ004",
      instructions: "",
      randomizeQuestions: false,
      immediateFeedback: false,
      feedbackByEmail: false,
      timeLimit: 0,
      passingScore: 0,
      retakeNumbers: 0,
      questions: [],
      avarageScore: 0,
      takeTime: "",
      questionsOrder: "",
    },
    {
      id: "QZ005",
      title: "HTML5 Deep Dive",
      instructor: instructors[3],
      date: "2023-12-01",
      questionsNum: 10,
      downloadLink: "#",
      viewLink: "/quizzes/QZ005",
      instructions: "",
      randomizeQuestions: false,
      immediateFeedback: false,
      feedbackByEmail: false,
      timeLimit: 0,
      passingScore: 0,
      retakeNumbers: 0,
      questions: [],
      avarageScore: 0,
      takeTime: "",
      questionsOrder: "",
    },
    {
      id: "QZ006",
      title: "Node.js Intro",
      instructor: instructors[4],
      date: "2024-03-15",
      questionsNum: 25,
      downloadLink: "#",
      viewLink: "/quizzes/QZ006",
      instructions: "",
      randomizeQuestions: false,
      immediateFeedback: false,
      feedbackByEmail: false,
      timeLimit: 0,
      passingScore: 0,
      retakeNumbers: 0,
      questions: [],
      avarageScore: 0,
      takeTime: "",
      questionsOrder: "",
    },
    {
      id: "QZ007",
      title: "Database Design",
      instructor: instructors[1],
      date: "2023-09-10",
      questionsNum: 17,
      downloadLink: "#",
      viewLink: "/quizzes/QZ007",
      instructions: "",
      randomizeQuestions: false,
      immediateFeedback: false,
      feedbackByEmail: false,
      timeLimit: 0,
      passingScore: 0,
      retakeNumbers: 0,
      questions: [],
      avarageScore: 0,
      takeTime: "",
      questionsOrder: "",
    },
    {
      id: "QZ008",
      title: "Git & GitHub Workflow",
      instructor: instructors[0],
      date: "2024-04-01",
      questionsNum: 12,
      downloadLink: "#",
      viewLink: "/quizzes/QZ008",
      instructions: "",
      randomizeQuestions: false,
      immediateFeedback: false,
      feedbackByEmail: false,
      timeLimit: 0,
      passingScore: 0,
      retakeNumbers: 0,
      questions: [],
      avarageScore: 0,
      takeTime: "",
      questionsOrder: "",
    },
    {
      id: "QZ009",
      title: "UX Design Principles",
      instructor: instructors[2],
      date: "2023-08-22",
      questionsNum: 19,
      downloadLink: "#",
      viewLink: "/quizzes/QZ009",
      instructions: "",
      randomizeQuestions: false,
      immediateFeedback: false,
      feedbackByEmail: false,
      timeLimit: 0,
      passingScore: 0,
      retakeNumbers: 0,
      questions: [],
      avarageScore: 0,
      takeTime: "",
      questionsOrder: "",
    },
    {
      id: "QZ010",
      title: "Web Performance Optimization",
      instructor: instructors[0],
      date: "2024-05-05",
      questionsNum: 14,
      downloadLink: "#",
      viewLink: "/quizzes/QZ010",
      instructions: "",
      randomizeQuestions: false,
      immediateFeedback: false,
      feedbackByEmail: false,
      timeLimit: 0,
      passingScore: 0,
      retakeNumbers: 0,
      questions: [],
      avarageScore: 0,
      takeTime: "",
      questionsOrder: "",
    },
  ]);

  // Convert ColumnConfig to ColumnDef for AdvancedDataTable
  const columns = generateQuizesColumns();

  return (
    <div className="relative grid grid-cols-1 rounded-lg border border-gray-200 p-3">
      {/* Header Controls */}
      <div className="gap-4 border-b border-gray-200 p-2 pb-3 md:flex-row">
        <h2 className="mb-1 text-2xl font-semibold">Quizzes</h2>
        <p className="text-xs text-gray-600">List of all students</p>
      </div>

      <div className="py-3">
        {/* Advanced Data Table */}
        <AdvancedDataTable<Quiz>
          data={quizzes}
          columns={columns}
          hidePagination={!pagination}
          hideSearch={!isList} // We have our own search bar
          hideExport={!isList}
          hideColumnManager={!isList}
          initialPagination={{
            pageIndex: 0,
            pageSize: 10,
          }}
          cellClassName="p-3 text-sm"
          headerClassName="text-sm uppercase text-gray-500 bg-gray-100"
          tableClassName="rounded-lg border"
        />

        {/* Note: The AdvancedDataTable component handles pagination internally */}
        {pagination && (
          <div className="mt-4 text-center text-sm text-gray-500">
            <p>
              Pagination is handled internally by the AdvancedDataTable
              component
            </p>
            <p>Total quizzes: {quizzes.length}</p>
          </div>
        )}
      </div>
    </div>
  );
}
