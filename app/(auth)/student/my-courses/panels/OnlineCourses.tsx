import DynamicTable from "@/components/UI/tables/DTable";
import {
  BookOpen,
  Clock,
  Award,
  FileText,
  Calendar,
  CheckCircle,
  PlayCircle,
  Upload,
  Eye,
  ChevronRight,
  Bookmark,
  HelpCircle,
  Check,
  GraduationCap,
  Hourglass,
  Radio,
  Search,
  Notebook,
} from "lucide-react";
import { ReactNode } from "react";
import { ProgressCard, StatsCard } from "../components/StatsCards";
import Image from "next/image";
import StreakTracker from "../components/StreakTracker";
import { CourseType } from "@/types/courses";
import { courseData } from "@/constants/VideosData.data";

// Type definitions
type ProgressCardProps = {
  title: string;
  subtitle: string;
  percentage: number;
  status: string;
  color: string;
};

type StatItemType = {
  icon: ReactNode;
  iconBg: string;
  title: string;
  value: number;
  progress: number;
  color: string;
};

// Data for the progress card
const progressData: ProgressCardProps = {
  title: "Overall performance",
  subtitle: "Course completion rate",
  percentage: 80,
  status: "PRO LEARNER",
  color: "#2ba149",
};

// Data for stats cards
const statsData: StatItemType[] = [
  {
    icon: <GraduationCap className="w-3 h-3 text-primary" />,
    iconBg: "bg-green-100",
    title: "Total enroll courses",
    value: 50,
    progress: 50,
    color: "#2ba149",
  },
  {
    icon: <Check className="w-3 h-3 text-purple-600" />,
    iconBg: "bg-purple-100",
    title: "Course completed",
    value: 1,
    progress: 100,
    color: "#8b5cf6",
  },
  {
    icon: <Hourglass className="w-3 h-3 text-orange-600" />,
    iconBg: "bg-orange-100",
    title: "Hours spent",
    value: 1,
    progress: 100,
    color: "#f97316",
  },
];

const activityData: StatItemType[] = [
  {
    icon: <Radio className="w-3 h-3 text-orange-600" />,
    iconBg: "bg-orange-100",
    title: "Live Class Attended",
    value: 50,
    progress: 50,
    color: "#f97316",
  },
  {
    icon: <Search className="w-3 h-3 text-purple-600" />,
    iconBg: "bg-purple-100",
    title: "Quiz Practised",
    value: 20,
    progress: 100,
    color: "#8b5cf6",
  },
  {
    icon: <Notebook className="w-3 h-3 text-blue-600" />,
    iconBg: "bg-blue-100",
    title: "Assignment done",
    value: 1,
    progress: 100,
    color: "#2563eb",
  },
];

const OnlineCourses = () => {
  const coursesColumns = [
    {
      key: "name",
      header: "Course name",
      render: (item: CourseType) => (
        <div className="font-medium">
          <div className="flex items-center">
            <Bookmark className="w-4 h-4 mr-2 text-green-600" />
            {item.title}
          </div>
          <div className="text-xs text-gray-500">{item.title}</div>
        </div>
      ),
    },
    {
      key: "progress",
      header: "Progress",
      align: "center",
      width: "w-24",
      render: () => (
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-green-600 h-2.5 rounded-full"
            style={{ width: "80%" }}
          ></div>
        </div>
      ),
    },
    {
      key: "score",
      header: "Overall score",
      align: "center",
      width: "w-24",
      render: () => (
        <div className="flex items-center justify-center">
          <Award className="w-4 h-4 mr-1 text-yellow-500" />
          80%
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (item: CourseType) => (
        <span
          className={`px-3 py-1 rounded-full text-xs flex items-center ${
            item.status === "Completed"
              ? "bg-green-100 text-green-800"
              : "bg-green-100 text-green-800"
          }`}
        >
          {item.status === "Completed" ? (
            <CheckCircle className="w-3 h-3 mr-1" />
          ) : (
            <PlayCircle className="w-3 h-3 mr-1" />
          )}
          {item.status}
        </span>
      ),
      align: "center",
      width: "w-24",
    },
  ];

  return (
    <div>
      <div>
        {/* Top Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <ProgressCard {...progressData} />
          <StatsCard title="Learning Stats" items={statsData} />
          <StatsCard title="Activities" items={activityData} />
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-6 gap-4 mb-6">
        <div className="lg:col-span-3">
          {" "}
          {/* Upcoming classes */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200  transition-shadow">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-green-600" />
              Upcoming classes
            </h2>

            <div className="space-y-4">
              {courseData.slice(0, 2).map((coures) => {
                return (
                  <div
                    key={coures.id}
                    className="p-4 border border-gray-200 rounded-lg hover:border-green-200 hover:bg-green-50 transition-colors"
                  >
                    <div className="flex justify-between items-center gap-4">
                      <Image
                        className="w-16 h-16 rounded-md object-cover"
                        src={coures.image}
                        width={200}
                        height={200}
                        alt={coures.title}
                      />
                      <div>
                        <h2 className="text-sm font-semibold mb-1">
                          {coures.title}
                        </h2>
                        <span className="block text-xs w-fit px-2 py-1 rounded-md bg-green-50 text-primary mb-2">
                          Physics 1
                        </span>
                        <p className="text-muted-foreground text-xs">
                          by {coures.instructor.name}
                        </p>
                      </div>
                      <button className="flex items-center gap-2 text-white bg-primary px-3 py-2 rounded-lg text-sm">
                        <PlayCircle size={15} /> Play
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          {/* Pending quizzes */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mt-4 transition-shadow">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <HelpCircle className="w-5 h-5 mr-2 text-green-600" />
              Pending quizzes
            </h2>

            <div className="space-y-3">
              {/* Quiz 1 */}
              <div className="p-4 border border-gray-200 rounded-lg hover:border-green-200 hover:bg-green-50 transition-colors flex justify-between items-center">
                <div>
                  <div className="font-medium flex items-center">
                    <PlayCircle className="w-4 h-4 mr-2 text-green-600" />
                    Vector division
                  </div>
                  <div className="text-xs text-gray-500 ml-6">
                    ● 10 question ● 15 min
                  </div>
                </div>
                <button className="text-sm bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded flex items-center transition-colors">
                  Start <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Quiz 2 */}
              <div className="p-4 border border-gray-200 rounded-lg hover:border-green-200 hover:bg-green-50 transition-colors flex justify-between items-center">
                <div>
                  <div className="font-medium flex items-center">
                    <PlayCircle className="w-4 h-4 mr-2 text-green-600" />
                    Vector division
                  </div>
                  <div className="text-xs text-gray-500 ml-6">
                    ● 10 question ● 15 min
                  </div>
                </div>
                <button className="text-sm bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded flex items-center transition-colors">
                  Start <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:col-span-3">
          <StreakTracker />
          {/* Assignments */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200  transition-shadow mt-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <FileText className="w-5 h-5 mr-2 text-green-600" />
              Assignment
            </h2>

            <div className="p-4 border border-gray-200 rounded-lg hover:border-green-200 hover:bg-green-50 transition-colors">
              <div className="font-medium flex items-center">
                <BookOpen className="w-4 h-4 mr-2 text-green-600" />
                Advanced problem solving math
              </div>
              <div className="text-sm text-gray-600 mb-2 ml-6">H. math 1</div>
              <div className="text-xs text-gray-500 mb-3 ml-6">
                Assignment 5
              </div>
              <div className="flex justify-between items-center flex-wrap gap-2 ml-6">
                <div className="text-xs text-gray-500 flex items-center">
                  <Clock className="w-3 h-3 mr-1" />
                  Submit before: 15th Oct, 2024 ; 12:00PM
                </div>
                <div className="flex space-x-2">
                  <button className="text-sm text-green-600 hover:text-green-800 flex items-center">
                    <Eye className="w-4 h-4 mr-1" /> View{" "}
                  </button>
                  <button className="text-sm text-green-600 hover:text-green-800 flex items-center">
                    <Upload className="w-4 h-4 mr-1" /> Upload
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Courses Table */}
      <div className=" bg-white p-6 rounded-xl shadow-sm border border-gray-200  transition-shadow">
        <DynamicTable
          data={courseData}
          columns={coursesColumns}
          className="rounded-lg"
          headerClassName="bg-gray-50 text-gray-700"
          rowClassName="hover:bg-gray-50"
          cellClassName="py-4 px-4"
          minWidth="100%"
        />
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6"></div>
    </div>
  );
};

export default OnlineCourses;
