"use client";
import NotFoundPage from "@/app/not-found";
import EnrollmentChart from "@/components/UI/Charts/EnrollmentChart";
import OptionsDropdown from "@/components/UI/OptionsDropdown";
import CountriesTable from "@/components/UI/tables/CountriesTable";
import StudentOverviewTable from "@/components/UI/tables/StudentOverviewTable";
import { courseData } from "@/constants/VideosData.data";
import { Award, DollarSign, Edit, Eye, SquarePen, Trash, UsersRound } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { use } from "react";

interface SingleCourseOverviewProps {
  params: Promise<{ slug: string }>;
}

export default function SingleCourseOverview({
  params,
}: SingleCourseOverviewProps) {
  const { slug } = use(params);
  const course = courseData.find((course) => course.id === slug);

  if (!course) return <NotFoundPage />;

  return (
    <div>
      <div className="relative flex justify-between p-4 rounded-lg border bg-white shadow-sm mb-4">
        {/* Course Details  */}
        <div className="flex flex-col items-center gap-6 w-full md:flex-row">
          <Image
            className="w-full h-[250px] rounded-lg object-cover md:w-[150px] md:h-[120px] "
            src={course.image}
            alt="course image"
            width={300}
            height={300}
          />
          <div className="flex-1">
            <div className="flex flex-col items-center gap-3 justify-between xl:flex-row mb-4">
              <div className="flex items-center gap-3">
                <h1 className="text-xl font-bold max-w-[400px]">
                  {course.title}
                </h1>
                <span className="px-2 py-1 text-xs rounded-full text-white bg-primary">
                  {course.status}
                </span>
              </div>
              <div className="flex justify-end items-start h-full gap-3">
                <Link
                  className="flex items-center gap-1 p-3 w-fit text-sm bg-white border rounded-lg"
                  href={"#"}
                >
                  <SquarePen size={12} />
                  Edit
                </Link>
                <Link
                  className="flex items-center gap-1 p-3 w-fit text-sm bg-white border rounded-lg"
                  href={"#"}
                >
                  <Eye size={12} />
                  Preview
                </Link>
                <OptionsDropdown
                  actions={[
                    {
                      label: "View",
                      icon: <Eye className="w-4 h-4" />,
                      onClick: () => console.log("View clicked"),
                    },
                    {
                      label: "Edit",
                      icon: <Edit className="w-4 h-4" />,
                      onClick: () => console.log("Edit clicked"),
                    },
                    {
                      label: "Delete",
                      icon: <Trash className="w-4 h-4" />,
                      onClick: () => console.log("Delete clicked"),
                      danger: true,
                    },
                  ]}
                />
              </div>
            </div>

            <div className="flex flex-col gap-5 sm:flex-row">
              <div className="flex text-center flex-col md:text-start">
                <span className="text-muted-foreground font-semibold text-sm">
                  Category
                </span>
                <span className="text-main text-sm">{course.category}</span>
              </div>
              <div className="flex text-center flex-col md:text-start">
                <span className="text-muted-foreground font-semibold text-sm">
                  Price
                </span>
                <span className="text-main text-sm">${course.price}</span>
              </div>
              <div className="flex text-center flex-col md:text-start">
                <span className="text-muted-foreground font-semibold text-sm">
                  Level
                </span>
                <span className="text-main text-sm">{course.level}</span>
              </div>
              <div className="flex text-center flex-col md:text-start">
                <span className="text-muted-foreground font-semibold text-sm">
                  Category
                </span>
                <span className="text-main  text-sm">{course.category}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 mb-4">
        <div className="flex items-center gap-4 p-4 border rounded-lg bg-white shadow-sm">
          <div className="flex justify-center items-center rounded-md w-16 h-16 bg-[#E4F8FFE5] text-[#55BEE6]">
            <UsersRound size={20} />
          </div>
          <div>
            <span className="block text-sm">Total Enrollments</span>
            <h1 className="font-bold">1,245</h1>
            <span className="block text-xs text-primary">
              +12% from last month
            </span>
          </div>
        </div>
        <div className="flex items-center gap-4 p-4 border rounded-lg bg-white shadow-sm">
          <div className="flex justify-center items-center rounded-md w-16 h-16 bg-[#DCFCE7] text-[#008236]">
            <DollarSign size={20} />
          </div>
          <div>
            <span className="block text-sm">Course Revenue</span>
            <h1 className="font-bold">12,450</h1>
            <span className="block text-xs text-primary">
              +8% from last month
            </span>
          </div>
        </div>
        <div className="flex items-center gap-4 p-4 border rounded-lg bg-white shadow-sm">
          <div className="flex justify-center items-center rounded-md w-16 h-16 bg-[#F3E8FF] text-[#AD46FF]">
            <Eye size={20} />
          </div>
          <div>
            <span className="block text-sm">Total Views</span>
            <h1 className="font-bold">5,678</h1>
            <span className="block text-xs text-primary">
              +15% from last month
            </span>
          </div>
        </div>
        <div className="flex items-center gap-4 p-4 border rounded-lg bg-white shadow-sm">
          <div className="flex justify-center items-center rounded-md w-16 h-16 bg-[#FCE7F3] text-[#F6339A]">
            <Award size={20} />
          </div>
          <div>
            <span className="block text-sm">Completion Rate</span>
            <h1 className="font-bold">78%</h1>
            <span className="block text-xs text-primary">
              +3% from last month
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 xl:flex-row mb-4">
        <div className="flex-1 p-4 rounded-lg border bg-white shadow-sm">
          {/* Enrollment And Views Over Time Chart  */}
          <EnrollmentChart />
        </div>
        <div className="xl:w-[450px] p-4 rounded-lg border bg-white shadow-sm">
          {/* Countries Table  */}
          <CountriesTable />
        </div>
      </div>
      <div>
        {/* Students Table  */}
        <StudentOverviewTable />
      </div>
    </div>
  );
}
