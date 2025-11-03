"use client";
import NotFoundPage from "@/app/not-found";
import OptionsDropdown from "@/components/UI/OptionsDropdown";
import { Edit, Eye, ListOrdered, SquarePen, Trash, View } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { use, useState } from "react";
import OverviewInstructor from "./panels/OverviewInstructor";
import { instructors } from "@/constants/instructors.data";
import CoursesList from "./panels/CoursesList";
import { courseData } from "@/constants/VideosData.data";
import QuizesList from "./panels/QuizesList";
import StudentOverviewTable from "@/components/UI/tables/StudentOverviewTable";

interface SingleinstructorOverviewProps {
  params: Promise<{ slug: string }>;
}

export default function SingleinstructorOverview({
  params,
}: SingleinstructorOverviewProps) {
  const { slug } = use(params);
  const instructor = instructors.find((instructor) => instructor.id === slug);
  const [activeTab, setActiveTab] = useState("instructorsOverview");

  if (!instructor) return <NotFoundPage />;

  return (
    <div className="p-4">
      {/* Tab Buttons */}
      <div className="flex space-y-3 md:space-x-3 md:space-y-0 flex-wrap mb-4">
        <button
          onClick={() => setActiveTab("instructorsOverview")}
          className={`flex items-center gap-1 py-2 px-4 rounded-lg text-sm transition ${
            activeTab === "instructorsOverview"
              ? "bg-primary text-white"
              : "text-muted-foreground"
          }`}
        >
          <View size={15} />
          Instructors Overview
        </button>
        <button
          onClick={() => setActiveTab("coursesList")}
          className={`flex items-center gap-1 py-2 px-4 rounded-lg text-sm transition  ${
            activeTab === "coursesList"
              ? "bg-primary text-white"
              : "text-muted-foreground"
          }`}
        >
          <ListOrdered size={15} />
          Course List
        </button>
        <button
          onClick={() => setActiveTab("quizesList")}
          className={`flex items-center gap-1 py-2 px-4 rounded-lg text-sm transition  ${
            activeTab === "quizesList"
              ? "bg-primary text-white"
              : "text-muted-foreground"
          }`}
        >
          <ListOrdered size={15} />
          Quize List
        </button>
        <button
          onClick={() => setActiveTab("studentList")}
          className={`flex items-center gap-1 py-2 px-4 rounded-lg text-sm transition  ${
            activeTab === "studentList"
              ? "bg-primary text-white"
              : "text-muted-foreground"
          }`}
        >
          <ListOrdered size={15} />
          Student List
        </button>
      </div>
      <div className="relative flex justify-between p-4 rounded-lg border bg-white shadow-sm mb-4">
        {/* instructor Details  */}
        <div className="flex flex-col items-center gap-6 w-full lg:flex-row">
          <Image
            className="h-[250px] max-w-[250px] rounded-lg object-cover lg:w-[150px] lg:h-[120px] "
            src={instructor.avatar}
            alt="instructor image"
            width={300}
            height={300}
          />
          <div className="flex-1">
            <div className="flex flex-col items-center gap-3 justify-between lg:flex-row mb-4">
              <div>
                <div className="flex flex-col items-center gap-3 lg:flex-row mb-4">
                  <h1 className="text-xl font-bold max-w-[400px]">
                    {instructor.name}
                  </h1>
                  <span className="px-2 py-1 text-xs rounded-full text-white bg-primary capitalize">
                    {instructor.status}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground text-sm">
                    {instructor.info}
                  </span>
                </div>
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
                  href={`/admin/instructors/profile/${instructor.id}`}
                >
                  <Eye size={12} />
                  View Profile
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
                <span className="text-muted-foreground  text-sm">Country</span>
                <span className="text-main text-sm font-semibold">
                  {instructor.country}
                </span>
              </div>
              <div className="flex text-center flex-col md:text-start">
                <span className="text-muted-foreground text-sm">Age</span>
                <span className="text-main text-sm font-semibold">
                  {instructor.age} Years
                </span>
              </div>
              <div className="flex text-center flex-col md:text-start">
                <span className="text-muted-foreground text-sm">Education</span>
                <span className="text-main text-sm font-semibold">
                  {instructor.education}
                </span>
              </div>
              <div className="flex text-center flex-col md:text-start">
                <span className="text-muted-foreground text-sm">Join Date</span>
                <span className="text-main text-sm font-semibold">
                  {instructor.joinDate}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {activeTab === "instructorsOverview" && <OverviewInstructor />}
      {activeTab === "coursesList" && <CoursesList courses={courseData} />}
      {activeTab === "quizesList" && <QuizesList />}
      {activeTab === "studentList" && (
        <div className="overflow-hidden">
          {/* Students Table  */}
          <StudentOverviewTable />
        </div>
      )}
    </div>
  );
}
