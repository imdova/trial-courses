"use client";
import { useEffect } from "react";
// import DynamicStatisticsChart from "@/components/UI/Charts/DynamicStatisticsChart";
// import OptionsDropdown from "@/components/UI/OptionsDropdown";
// import CountryExamTable from "@/components/UI/tables/CountryExamTable";
import StudentQuizAttemptsTable from "@/components/UI/tables/StudentQuizAttemptsTable";
import { Quiz } from "@/types/quiz";
import { useQuiz } from "../../../hooks/useQuiz";
import {
  Award,
  // Edit,
  Eye,
  // SquarePen,
  // Trash,
  UsersRound,
} from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";

export default function OverviewPanel({ quiz }: { quiz: Quiz }) {
  const { quizStudents, getQuizStudents } = useQuiz();

  useEffect(() => {
    if (quiz?.id) {
      getQuizStudents(quiz.id);
    }
  }, [quiz?.id, getQuizStudents]);

  // Get last 10 students
  const recentStudents = quizStudents?.data?.slice(-10) || [];

  return (
    <div>
      <div className="relative flex justify-between p-4 rounded-lg border bg-white shadow-sm mb-4">
        <div className="w-full flex flex-col-reverse gap-3 md:flex-col">
          {/* quiz Details  */}
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex flex-col md:flex-row items-center gap-2 mb-4">
              <h1 className="text-2xl font-bold max-w-[400px] ">
                {quiz.title}
              </h1>
              <div className="flex items-center gap-3">
                <span className="px-2 py-1 text-xs rounded-full text-white bg-primary">
                  Puplished
                </span>
              </div>
            </div>
            <div>
              {/* <div className="flex flex-col items-center gap-3 justify-between xl:flex-row mb-4">
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
              </div> */}
            </div>
          </div>
          <div className="flex flex-col md:items-start items-center">
            <div className="flex flex-col md:flex-row md:items-start items-center gap-3 mb-4">
              {/* <Image
                className="rounded-lg object-cover w-[70px] h-[70px] "
                src={quiz.instructor.avatar || "/images/default-avatar.png"}
                alt="quiz image"
                width={300}
                height={300}
              /> */}
              <div className="flex flex-col items-center md:items-start">
                <span className="text-sm text-muted-foreground">Instructor</span>
                <h2 className="text-sm font-semibold mb-4">
                  {/* {quiz.instructor.name || "Not found"} */}
                </h2>
              </div>
            </div>
            <div>
              <div className="flex flex-col sm:flex-row gap-8">
                <div className="text-center md:text-start">
                  <span className="text-gray-500 font-medium text-sm">
                    Questions
                  </span>
                  <div className="text-main text-base font-semibold">
                    {quiz?.questions?.length ?? 0}{" "}
                    {quiz?.questions?.length === 1 ? "Question" : "Questions"}
                  </div>
                </div>

                <div className="text-center md:text-start">
                  <span className="text-gray-500 font-medium text-sm">
                    Passing Score
                  </span>
                  <div className="text-main text-base font-semibold">
                    {quiz?.passingScore != null
                      ? `${quiz.passingScore}%`
                      : "Not found"}
                  </div>
                </div>

                <div className="text-center md:text-start">
                  <span className="text-gray-500 font-medium text-sm">
                    Take Time
                  </span>
                  <div className="text-main text-base font-semibold">
                    {quiz?.takeTime ? quiz.takeTime : "Not found"}
                  </div>
                </div>

                <div className="text-center md:text-start">
                  <span className="text-gray-500 font-medium text-sm">
                    Questions Order
                  </span>
                  <div className="text-main text-base font-semibold capitalize">
                    {quiz?.questionsOrder ? quiz.questionsOrder : "Not found"}
                  </div>
                </div>
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
            <span className="block text-sm">Total Students</span>
            <h1 className="font-bold">{quiz?.totalStudents ?? 0}</h1>
            {/* <span className="block text-xs text-primary">
              +12% from last month
            </span> */}
          </div>
        </div>
        <div className="flex items-center gap-4 p-4 border rounded-lg bg-white shadow-sm">
          <div className="flex justify-center items-center rounded-md w-16 h-16 bg-purple-100 text-purple-700">
            <Eye size={20} />
          </div>
          <div>
            <span className="block text-sm">Enrollments</span>
            <h1 className="font-bold">{quiz?.enrollments ?? 0}</h1>
            {/* <span className="block text-xs text-primary">
              +8% from last month
            </span> */}
          </div>
        </div>
        <div className="flex items-center gap-4 p-4 border rounded-lg bg-white shadow-sm">
          <div className="flex justify-center items-center rounded-md w-16 h-16 bg-[#FCE7F3] text-[#F6339A]">
            <Award size={20} />
          </div>
          <div>
            <span className="block text-sm">Avarage Score</span>
            <h1 className="font-bold">{quiz?.averageScore ?? 0}%</h1>
            {/* <span className="block text-xs text-primary">
              +3% from last month
            </span> */}
          </div>
        </div>
        <div className="flex items-center gap-4 p-4 border rounded-lg bg-white shadow-sm">
          <div className="flex justify-center items-center rounded-md w-16 h-16 bg-[#FCE7F3] text-[#F6339A]">
            <Award size={20} />
          </div>
          <div>
            <span className="block text-sm">Avarage Time</span>
            <h1 className="font-bold">{quiz?.averageTime ?? 0}%</h1>
            {/* <span className="block text-xs text-primary">
              +3% from last month
            </span> */}
          </div>
        </div>
      </div>
      {/* <div className="grid lg:grid-cols-10 gap-4 mb-4">
        <div className="lg:col-span-7 p-4 rounded-lg border bg-white shadow-sm overflow-hidden ">
           <DynamicStatisticsChart
            data={dummyExamData}
            chartTitle="Exam Taken Time"
            metrics={[
              {
                key: "activeExams",
                label: "Active Exams",
                icon: <BookOpen size={20} />,
                color: "#6366F1", // Purple
              },
              {
                key: "examTakers",
                label: "Exam Takers",
                icon: <Users size={20} />,
                color: "#2BA149", // Green
              },
            ]}
          />
        </div>
        <div className="lg:col-span-3  rounded-lg border bg-white shadow-sm">
          <CountryExamTable />
        </div>
      </div> */}
      <div className="flex flex-col border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
        <h2 className="text-xl font-bold mb-3">Recent Students</h2>
        {/* Students Table  */}
        <StudentQuizAttemptsTable data={recentStudents} />
      </div>
    </div>
  );
}
