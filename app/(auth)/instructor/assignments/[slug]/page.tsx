/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import NotFoundPage from "@/app/not-found";
import DynamicStatisticsChart from "@/components/UI/Charts/DynamicStatisticsChart";
import OptionsDropdown from "@/components/UI/OptionsDropdown";
import CountriesTable from "@/components/UI/tables/CountriesTable";
import StudentSubmissionTable from "@/components/UI/tables/StudentSubmissionTable";
import { dummyRevenueData } from "@/constants/charts/chart.data";
// import { assignmentData } from "@/constants/courses.data";
import { useEffect } from "react";
import {
  Award,
  BookOpen,
  Clock,
  Edit,
  Eye,
  ShoppingCart,
  SquarePen,
  Trash,
  UsersRound,
} from "lucide-react";
import Link from "next/link";
import { use } from "react";
import { useAssignments } from "../hooks/useAssignments";
import { Assignment } from "@/types/courses";
import { PayloadAction, SerializedError } from "@reduxjs/toolkit";

interface SingleAssignmentOverviewProps {
  params: Promise<{ slug: string }>;
}

export default function SingleAssignmentOverview({
  params,
}: SingleAssignmentOverviewProps) {
  const { slug } = use(params);
  const { getAssignmentById, currentAssignment } = useAssignments();

  useEffect(() => {
    if (slug) {
      getAssignmentById(slug);
    }
  }, [slug, getAssignmentById]);

  console.log(currentAssignment, "currentAssignment");


  return (
    <div className="px-4">
      <div className="relative mb-4 flex justify-between rounded-lg border bg-white p-4 shadow-sm">
        {/* Assignment Details  */}
        <div className="flex w-full flex-col items-center gap-6 md:flex-row">
          <div className="flex-1">
            <div className="mb-4 flex flex-col items-center justify-between gap-3 xl:flex-row">
              <div className="flex items-center gap-3">
                <h1 className="max-w-[400px] text-xl font-bold">
                  {currentAssignment?.name}
                </h1>
                <span className="bg-primary rounded-full px-2 py-1 text-xs text-white">
                  {currentAssignment?.status || "N/A"}
                </span>
              </div>
              <div className="flex h-full items-start justify-end gap-3">
                <Link
                  className="flex w-fit items-center gap-1 rounded-lg border bg-white p-3 text-sm"
                  href={"#"}
                >
                  <SquarePen size={12} />
                  Edit
                </Link>
                <OptionsDropdown
                  actions={[
                    {
                      label: "View",
                      icon: <Eye className="h-4 w-4" />,
                      onClick: () => console.log("View clicked"),
                    },
                    {
                      label: "Edit",
                      icon: <Edit className="h-4 w-4" />,
                      onClick: () => console.log("Edit clicked"),
                    },
                    {
                      label: "Delete",
                      icon: <Trash className="h-4 w-4" />,
                      onClick: () => console.log("Delete clicked"),
                      danger: true,
                    },
                  ]}
                />
              </div>
            </div>

            <div className="flex flex-col gap-5 sm:flex-row">
              <div className="flex flex-col text-center md:text-start">
                <span className="text-muted-foreground text-sm font-semibold">
                  Course
                </span>
                <span className="text-main text-sm">{currentAssignment?.course || "N/A"}</span>
              </div>
              <div className="flex flex-col text-center md:text-start">
                <span className="text-muted-foreground text-sm font-semibold">
                  Points
                </span>
                <span className="text-main text-sm">{currentAssignment?.totalPoints || "N/A"}</span>
              </div>
              <div className="flex flex-col text-center md:text-start">
                <span className="text-muted-foreground text-sm font-semibold">
                  Due Date
                </span>
                <span className="text-main text-sm">{currentAssignment?.dueDate?.split("T")[0] ? new Date(currentAssignment?.dueDate).toLocaleDateString() : "N/A"}</span>
              </div>
              <div className="flex flex-col text-center md:text-start">
                <span className="text-muted-foreground text-sm font-semibold">
                  Questions
                </span>
                <span className="text-main text-sm">
                  {currentAssignment?.numberOfQuestions || "N/A"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols- md:grid-cols-2 xl:grid-cols-3">
        <div className="flex items-center gap-4 rounded-lg border bg-white p-4 shadow-sm">
          <div className="flex h-16 w-16 items-center justify-center rounded-md bg-[#E4F8FFE5] text-[#55BEE6]">
            <UsersRound size={20} />
          </div>
          <div>
            <span className="block text-sm">Total Submissions</span>
            <h1 className="font-bold">{currentAssignment?.studentsSubmitted}</h1>
            {/* <span className="text-primary block text-xs">
              +12% from last month
            </span> */}
          </div>
        </div>
        <div className="flex items-center gap-4 rounded-lg border bg-white p-4 shadow-sm">
          <div className="flex h-16 w-16 items-center justify-center rounded-md bg-[#DCFCE7] text-[#008236]">
            <Award size={20} />
          </div>
          <div>
            <span className="block text-sm">Average Score</span>
            <h1 className="font-bold">{currentAssignment?.averageScore || 0}%</h1>
            {/* <span className="text-primary block text-xs">
              +5% from last month
            </span> */}
          </div>
        </div>
        {/* <div className="flex items-center gap-4 rounded-lg border bg-white p-4 shadow-sm">
          <div className="flex h-16 w-16 items-center justify-center rounded-md bg-[#F3E8FF] text-[#AD46FF]">
            <Clock size={20} />
          </div>
          <div>
            <span className="block text-sm">Avg Time Spent</span>
            <h1 className="font-bold">45 min</h1>
            <span className="text-primary block text-xs">
              +2 min from last month
            </span>
          </div>
        </div> */}
        <div className="flex items-center gap-4 rounded-lg border bg-white p-4 shadow-sm">
          <div className="flex h-16 w-16 items-center justify-center rounded-md bg-[#FCE7F3] text-[#F6339A]">
            <Award size={20} />
          </div>
          <div>
            <span className="block text-sm">Submission Rate</span>
            <h1 className="font-bold">{currentAssignment?.submissionRate || 0}%</h1>
            {/* <span className="text-primary block text-xs"> 
              +3% from last month
            </span> */}
          </div>
        </div>
      </div>
      {/* <div className="mb-4 flex flex-col gap-4 xl:flex-row">
        <div className="flex-1 rounded-lg border bg-white p-4 shadow-sm">
          <DynamicStatisticsChart
            data={dummyRevenueData}
            metrics={[
              {
                key: "revenue",
                label: "Revenue",
                icon: <ShoppingCart size={20} />,
                color: "#2BA149",
              },
              {
                key: "courses",
                label: "Courses",
                icon: <BookOpen size={20} />,
                color: "#EC4899",
              },
            ]}
            chartTitle="Platform Submittion Overview"
          />{" "}
        </div>
        <div className="rounded-lg border bg-white p-4 shadow-sm xl:w-[450px]">
          <CountriesTable />
        </div>
      </div> */}
      <div>
        {/* Student Submissions Table  */}
        <StudentSubmissionTable />
      </div>
    </div>
  );
}