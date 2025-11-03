"use client";

import DynamicStatisticsChart from "@/components/UI/Charts/DynamicStatisticsChart";
import StatCardItem from "@/components/UI/StatCardItem";
// import InstructorsTable from "@/components/UI/tables/InstructorsTable";
import WeeklySalesTable from "../../components/tables/WeeklySalesTable";
import { useInstructorCourse } from "@/hooks/useInstructorCourse";
import { useAdminCoursesOverview } from "@/hooks/useAdminCoursesOverview";
import {
  BookOpen,
  MoveUpRight,
  UserCog,
  Users,
  UsersRound,
  CheckCircle2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import Loading from "@/components/loading/loading";
import { Badge } from "@/components/UI/badge";

const exampleData = {
  custom: {
    Sales: [
      { date: "2023-01-01", value: 100 },
      { date: "2023-01-02", value: 150 },
      { date: "2023-01-03", value: 200 },
      { date: "2023-01-04", value: 120 },
      { date: "2023-01-05", value: 180 },
    ],
    Students: [
      { date: "2023-01-01", count: 50 },
      { date: "2023-01-02", count: 70 },
      { date: "2023-01-03", count: 60 },
      { date: "2023-01-05", count: 90 },
    ],
    Courses: [
      { date: "2023-01-01", count: 5 },
      { date: "2023-01-03", count: 8 },
      { date: "2023-01-04", count: 6 },
    ],
    Instructors: [
      { date: "2023-01-02", count: 3 },
      { date: "2023-01-04", count: 4 },
      { date: "2023-01-05", count: 5 },
    ],
  },
};

export default function OverviewCoursesPage() {
  const { courses, getCourses } = useInstructorCourse();
  const { overview, weeklySales, loading } = useAdminCoursesOverview(true);

  useEffect(() => {
    getCourses();
  }, [getCourses]);

  if (loading || !overview) {
    return <Loading />;
  }

  const stats = [
    {
      id: 1,
      title: "Total Courses",
      value: overview.totalCourses.toString(),
      change: `${overview.newCoursesThisMonth} new this month`,
      icon: <BookOpen size={20} />,
      bgColor: "#E4F8FFE5",
      textColor: "#55BEE6",
    },
    {
      id: 2,
      title: "New Courses",
      value: overview.newCoursesThisMonth.toString(),
      change: "this month",
      icon: <UsersRound size={20} />,
      bgColor: "#E4F8FFE5",
      textColor: "#55BEE6",
    },
    {
      id: 3,
      title: "Total Enrollments",
      value: overview.totalEnrollments.toString(),
      change: "",
      icon: <Users size={20} />,
      bgColor: "#DCFCE7",
      textColor: "#008236",
    },
    {
      id: 4,
      title: "Completion Rate",
      value: `${overview.completionRate}%`,
      change: "",
      icon: <CheckCircle2 size={20} />,
      bgColor: "#FCE7F3",
      textColor: "#F6339A",
    },
  ];
  return (
    <div>
      <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatCardItem key={stat.id} {...stat} />
        ))}
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-9">
        <div className="col-span-1 md:col-span-6">
          <div className="mb-4 overflow-hidden">
            <DynamicStatisticsChart
              data={exampleData}
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
              chartTitle="Courses Statistics"
            />
          </div>
          <div>
            <div className="mb-4 flex justify-between items-center">
              <h2 className="font-medium text-lg">Top Courses by Enrollment</h2>
              <div className="flex gap-2">
                <Badge className="bg-blue-100 text-blue-800">
                  {overview.totalEnrollments} Total Enrollments
                </Badge>
                <Badge className="bg-green-100 text-green-800">
                  {overview.completionRate}% Avg Completion
                </Badge>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {overview.topCourses.map((course, index) => (
                <div
                  key={course.id}
                  className="flex items-center justify-between p-4 rounded-lg border border-gray-200 bg-white hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 font-semibold text-green-700">
                      #{index + 1}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{course.name}</h3>
                      <div className="flex items-center gap-4 mt-1">
                        <span className="text-xs text-gray-600">
                          <Users className="inline h-3 w-3 mr-1" />
                          {course.enrollments} enrollments
                        </span>
                        <span className="text-xs text-gray-600">
                          <CheckCircle2 className="inline h-3 w-3 mr-1" />
                          {course.completionRate}% completion
                        </span>
                      </div>
                    </div>
                  </div>
                  <Link
                    href={`/admin/courses/${course.id}`}
                    className="flex items-center gap-1 rounded-full bg-green-600 px-4 py-2 text-xs text-white hover:bg-green-700"
                  >
                    View <MoveUpRight size={12} />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="col-span-1 md:col-span-3">
          <div className="mb-4">
            <div className="rounded-lg border border-gray-200 bg-white p-4">
              <h2 className="mb-3 text-lg font-semibold">Weekly Sales</h2>
              <WeeklySalesTable weeklySales={weeklySales} />
            </div>
          </div>
          {/* <div className="mb-4">
            <InstructorsTable />
          </div> */}
          <div className="rounded-lg border border-gray-200 bg-white p-4">
            <h2 className="mb-3 text-lg font-semibold">All Courses</h2>
            <ul className="flex flex-col gap-6">
              {courses.slice(0, 5).map((course) => {
                return (
                  <li
                    className="relative border-b last-of-type:border-b-0"
                    key={course.id}
                  >
                    <div className="flex gap-4 px-3 py-5 pb-6">
                      <div className="max-h-[100px] max-w-[200px] overflow-hidden rounded-lg lg:max-h-[60px] lg:max-w-[100px]">
                        <Image
                          className="h-full w-full object-cover"
                          src={course.courseImage}
                          alt={course.name}
                          width={200}
                          height={200}
                        />
                      </div>
                      <div className="w-full">
                        <span className="text-xs">Course</span>
                        <h2 className="text-sm font-semibold">
                          {course.name}
                        </h2>
                        <span className="text-muted-foreground text-xs">
                          {course.studentCount || 0} learners
                        </span>
                        <Link
                          href={`/admin/courses/${course.id}`}
                          className="absolute right-2 bottom-2 flex items-center gap-1 rounded-full bg-green-600 px-3 py-1 text-xs text-white hover:bg-green-700"
                        >
                          Details <MoveUpRight size={12} />
                        </Link>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
