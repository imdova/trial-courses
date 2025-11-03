"use client";

import StatCardItem from "@/components/UI/StatCardItem";
import { CircleQuestionMark, UsersRound, BookOpen } from "lucide-react";
import { useAdminQuizzes } from "@/hooks/useAdminQuizzes";
import AdvancedDataTable from "@/components/UI/AdvancedDataTable";
import { generateAdminQuizesColumns } from "@/components/columns/adminQuizesColumns";
import { AdminQuiz } from "@/store/slices/admin-quizzes.slice";
import Loading from "@/components/loading/loading";

export default function QuizzesOverviewPage() {
  const { quizzes, stats, loading } = useAdminQuizzes(true, 10);

  if (loading && quizzes.length === 0) {
    return <Loading />;
  }

  const statsData = [
    {
      id: 1,
      title: "Total Quizzes",
      value: stats.totalQuizzes.toString(),
      change: "",
      icon: <BookOpen size={20} />,
      bgColor: "#E4F8FFE5",
      textColor: "#55BEE6",
    },
    {
      id: 2,
      title: "Total Enrollments",
      value: stats.totalEnrollments.toString(),
      change: "",
      icon: <UsersRound size={20} />,
      bgColor: "#E4F8FFE5",
      textColor: "#55BEE6",
    },
    {
      id: 3,
      title: "Total Questions",
      value: stats.totalQuestions.toString(),
      change: "",
      icon: <CircleQuestionMark size={20} />,
      bgColor: "#E4F8FFE5",
      textColor: "#55BEE6",
    },
  ];

  const columns = generateAdminQuizesColumns();

  return (
    <div>
      <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {statsData.map((stat) => (
          <StatCardItem key={stat.id} {...stat} />
        ))}
      </div>
      <div className="relative grid grid-cols-1 rounded-lg border border-gray-200 p-3">
        <div className="gap-4 border-b border-gray-200 p-2 pb-3 md:flex-row">
          <h2 className="mb-1 text-2xl font-semibold">Latest Quizzes</h2>
          <p className="text-xs text-gray-600">Last 10 quizzes</p>
        </div>
        <div className="py-3">
          <AdvancedDataTable<AdminQuiz>
            data={quizzes}
            columns={columns}
            hidePagination={true}
            hideSearch={true}
            hideExport={true}
            hideColumnManager={true}
            initialPagination={{
              pageIndex: 0,
              pageSize: 10,
            }}
            cellClassName="p-3 text-sm"
            headerClassName="text-sm uppercase text-gray-500 bg-gray-100"
            tableClassName="rounded-lg border"
          />
        </div>
      </div>
    </div>
  );
}
