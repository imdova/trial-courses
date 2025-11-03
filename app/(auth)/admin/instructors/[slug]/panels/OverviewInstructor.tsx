import EnrollmentChart from "@/components/UI/Charts/EnrollmentChart";

import { courseData } from "@/constants/VideosData.data";
import {
  BookOpen,
  ChevronRight,
  Clock,
  DollarSign,
  Eye,
  Star,
  UsersRound,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type BestCourse = {
  name: string;
  students: number;
  studentsChange: number;
  revenue: string;
  revenueChange: number;
};
type Quiz = {
  name: string;
  date: string;
  questions: number;
};

const bestSallerCourses: BestCourse[] = [
  {
    name: "CPHQ Course",
    students: 1500,
    studentsChange: 3,
    revenue: "40K EGP",
    revenueChange: 2,
  },
  {
    name: "CPHQ Course",
    students: 1500,
    studentsChange: 3,
    revenue: "40K EGP",
    revenueChange: 2,
  },
  {
    name: "CPHQ Course",
    students: 1500,
    studentsChange: 3,
    revenue: "40K EGP",
    revenueChange: 2,
  },
  {
    name: "CPHQ Course",
    students: 1500,
    studentsChange: 3,
    revenue: "40K EGP",
    revenueChange: 2,
  },
  {
    name: "CPHQ Course",
    students: 1500,
    studentsChange: 3,
    revenue: "40K EGP",
    revenueChange: 2,
  },
  {
    name: "CPHQ Course",
    students: 1500,
    studentsChange: 3,
    revenue: "40K EGP",
    revenueChange: 2,
  },
  {
    name: "CPHQ Course",
    students: 1500,
    studentsChange: 3,
    revenue: "40K EGP",
    revenueChange: 2,
  },
];
const quizzes: Quiz[] = [
  { name: "Clinical quiz 1", date: "12/04/2025", questions: 40 },
  { name: "Clinical quiz 1", date: "12/04/2025", questions: 40 },
  { name: "Clinical quiz 1", date: "12/04/2025", questions: 40 },
  { name: "Clinical quiz 1", date: "12/04/2025", questions: 40 },
  { name: "Clinical quiz 1", date: "12/04/2025", questions: 40 },
  { name: "Clinical quiz 1", date: "12/04/2025", questions: 40 },
  { name: "Clinical quiz 1", date: "12/04/2025", questions: 40 },
];

export default function OverviewInstructor() {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 mb-4">
        <div className="flex items-center gap-4 p-4 border rounded-lg bg-white shadow-sm">
          <div className="flex justify-center items-center rounded-md w-16 h-16 bg-[#E4F8FFE5] text-[#55BEE6]">
            <UsersRound size={20} />
          </div>
          <div>
            <span className="block text-sm">Total Courses</span>
            <h1 className="font-bold">1,245</h1>
            <span className="block text-xs text-primary">
              +12% from last month
            </span>
          </div>
        </div>
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
            <span className="block text-sm">Total Sales</span>
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
            <span className="block text-sm">Total Courses View</span>
            <h1 className="font-bold">5,678</h1>
            <span className="block text-xs text-primary">
              +15% from last month
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 xl:flex-row mb-4">
        <div>
          <div className="grid grid-cols-1 flex-1 p-4 rounded-lg border bg-white shadow-sm overflow-hidden mb-4">
            {/* Enrollment And Views Over Time Chart  */}
            <EnrollmentChart />
          </div>
          <div className="p-4 border rounded-xl bg-white shadow-sm">
            {/* Recent Courses Table  */}
            <div className="flex justify-between items-center gap-3 my-4">
              <h2 className="text-lg font-semibold">Recent Courses</h2>
              <Link
                className="flex items-center gap-1 text-primary text-sm hover:underline"
                href={""}
              >
                View All
                <ChevronRight size={13} />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {courseData.map((course) => (
                <div
                  key={course.id}
                  className="bg-white border rounded-xl shadow-sm p-3"
                >
                  <Link href={`/admin/courses/${course.id}`}>
                    <Image
                      className="w-full h-[150px] rounded-xl object-cover mb-4"
                      src={course.image}
                      width={400}
                      height={400}
                      alt={course.title}
                    />
                    <h1 className="mb-3 font-semibold">{course.title}</h1>

                    <div className="flex items-center gap-2 mb-3">
                      <Image
                        className="w-9 h-9 object-cover rounded-full"
                        width={90}
                        height={90}
                        src={course.instructor.image}
                        alt="Instructor"
                      />
                      <span className="text-xs">{course.instructor.name}</span>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        {course.rating.toFixed(1)}{" "}
                        <Star className="text-orange-500" size={12} />
                      </span>
                    </div>
                    <div className="grid grid-cols-1 gap-3 mb-3 w-full">
                      <div className="flex gap-2">
                        <BookOpen className="text-muted-foreground" size={18} />
                        <span className="text-xs text-muted-foreground">
                          {course.lessons} Lessons
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <Clock className="text-muted-foreground" size={18} />
                        <span className="text-xs text-muted-foreground">
                          {course.duration}
                        </span>
                      </div>
                    </div>
                  </Link>

                  <div className="flex justify-end">
                    <Link
                      className="text-sm hover:text-primary hover:underline transition"
                      href={`/admin/courses/${course.id}`}
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="h-full min-w-[330px]">
          {/* best Saller Courses Table  */}
          <div className="rounded-xl border p-4 shadow-sm h-full mb-4">
            <h2 className="font-semibold mb-4">Best Seller Courses</h2>
            <div className="grid grid-cols-1 overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="py-4 px-2 text-gray-500 text-sm">Course</th>
                    <th className="py-4 px-2 text-gray-500 text-sm">
                      Students
                    </th>
                    <th className="py-4 px-2 text-gray-500 text-sm">Revenue</th>
                  </tr>
                </thead>
                <tbody>
                  {bestSallerCourses.map((course, idx) => (
                    <tr key={idx} className="border-b last:border-0">
                      <td className="py-4 px-2 text-sm">{course.name}</td>
                      <td className="py-4 px-2 text-sm">
                        {course.students}{" "}
                        <span className="text-green-500 ml-1 text-xs">
                          +{course.studentsChange}%
                        </span>
                      </td>
                      <td className="py-4 px-2 text-sm">
                        {course.revenue}{" "}
                        <span className="text-green-500 ml-1 text-xs">
                          +{course.revenueChange}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="rounded-xl border p-4 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold">Recent Quizzes</h2>
              <button className="text-green-600 text-sm font-medium">
                View All &gt;
              </button>
            </div>
            <div className="grid grid-cols-1 overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="py-4 px-2 text-gray-500 text-sm">Quiz</th>
                    <th className="py-4 px-2 text-gray-500 text-sm">Date</th>
                    <th className="py-4 px-2 text-gray-500 text-sm">
                      Questions
                    </th>
                    <th className="py-4 px-2 text-gray-500 text-sm">View</th>
                  </tr>
                </thead>
                <tbody>
                  {quizzes.map((quiz, idx) => (
                    <tr key={idx} className="border-b last:border-0">
                      <td className="py-4 px-2 text-sm">{quiz.name}</td>
                      <td className="py-4 px-2 text-sm">{quiz.date}</td>
                      <td className="py-4 px-2 text-sm">{quiz.questions} Qs</td>
                      <td className="py-4 px-2 text-sm">
                        <button className="bg-green-500 hover:bg-green-600 text-white text-xs px-3 py-1 rounded-full">
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
