/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import graduationImg from "@/assets/images/graduation.png";
import PlansImage from "@/assets/images/planss.png";
import Link from "next/link";
import {
  ChevronRight,
  Download,
  Eye,
  HelpCircle,
  MoveUpRight,
  PlayCircle,
  CheckCircle2,
  XCircle,
  Clock,
  BookOpen,
  Heart,
} from "lucide-react";
import { useQuiz } from "@/app/(auth)/instructor/quizzes/hooks/useQuiz";
import { useEnrolledCourses } from "./hooks/useEnrolledCourses";
import { useFavoriteCourses } from "@/app/(auth)/student/favorite/hooks/useFavoriteCourses";
import LimitedCounterOffer from "@/components/UI/LimitedCounterOffer";
import WalletCard from "@/components/UI/WalletCard";
import SolidTabs from "@/components/UI/SolidTabs";
import RecordedCourses from "./panels/RecordedCourses";
import OnlineCourses from "./panels/OnlineCourses";
import OfflineCourses from "./panels/OfflineCourses";
import Calendar from "@/components/calendar/Calendar";
import EventList from "@/components/calendar/EventList";
import { events } from "@/constants/events.data";
import { courseData } from "@/constants/VideosData.data";
import StudentCard from "../dashboard/components/StudentCard";
type FileType = "pdf" | "jpg" | "png" | "docx";

type Certificate = {
  id: string;
  name: string;
  program: string;
  grade: string;
  issue_date: string;
  serial: string;
  fileType: FileType;
  downloadUrl: string;
};

// File type icons mapping
const fileIcons = {
  pdf: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5 text-red-600"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M6 2a2 2 0 0 0-2 2v16c0 1.103.897 2 2 2h12a2 2 0 0 0 2-2V8l-6-6H6zm7 1.5L18.5 9H13V3.5zM8 12h1v4H8v-4zm3 .5c0-.276.224-.5.5-.5H13a.5.5 0 0 1 .5.5v1H13v-1h-1v3h1v-1h.5v1a.5.5 0 0 1-.5.5h-1.5a.5.5 0 0 1-.5-.5v-3zm4 .5h1a.5.5 0 0 1 .5.5v1h-1v-1h-.5v1.5H16v-1a.5.5 0 0 1 .5-.5H18v2h-1v-.5h-.5v.5a.5.5 0 0 1-.5.5H15v-3z" />
    </svg>
  ),
  docx: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5 text-blue-600"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M6 2a2 2 0 0 0-2 2v16c0 1.103.897 2 2 2h13a2 2 0 0 0 2-2V8l-6-6H6zm7 1.5L18.5 9H13V3.5zM9 12h1l1 4 1-4h1l1 4 1-4h1l-1.5 5h-1l-1-4-1 4h-1L9 12z" />
    </svg>
  ),
  xlsx: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5 text-green-600"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M4 2h13l3 3v15a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4c0-1.103.897-2 2-2zm1 5v10h2v-4h1.5l2 3h1.5l-2.5-3 2.5-3H10.5l-2 3H7V7H5zm10 13a1 1 0 0 0 1-1V9h-4V4H5a1 1 0 0 0-1 1v15h11z" />
    </svg>
  ),
  pptx: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5 text-green-600"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M4 2h13l3 3v15a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4c0-1.103.897-2 2-2zm1 5v10h2v-4h1.5l2 3h1.5l-2.5-3 2.5-3H10.5l-2 3H7V7H5zm10 13a1 1 0 0 0 1-1V9h-4V4H5a1 1 0 0 0-1 1v15h11z" />
    </svg>
  ),
  zip: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5 text-amber-500"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M6 2a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V8l-6-6H6zm7 1.5L18.5 9H13V3.5zM9 7h1v1H9V7zm0 2h1v1H9V9zm0 2h1v1H9v-1zm2 0h1v1h-1v-1zm2 0h1v1h-1v-1zm-4 2h6v6H9v-6zm1 1v4h4v-4h-4z" />
    </svg>
  ),
  default: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5 text-gray-500"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M6 2a2 2 0 0 0-2 2v16c0 1.103.897 2 2 2h12a2 2 0 0 0 2-2V8l-6-6H6zm7 1.5L18.5 9H13V3.5zM8 13h8v2H8v-2zm0 4h8v2H8v-2z" />
    </svg>
  ),
};

const certificatesList: Certificate[] = [
  {
    id: "1",
    name: "Digital Marketing Masterclass",
    program: "Digital Marketing",
    grade: "Excellent",
    issue_date: "January 5, 2025",
    serial: "DMM5421562",
    fileType: "pdf",
    downloadUrl: "#",
  },
];

const tabs = [
  {
    label: "Recorded Courses",
    content: <RecordedCourses />,
  },
  {
    label: "Online Courses",
    content: <OnlineCourses />,
  },
  {
    label: "Offline Courses",
    content: <OfflineCourses />,
  },
];

const StudentCoursesPage = () => {
  const [activeTab, setActiveTab] = useState("courses");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [addingId, setAddingId] = useState<string | null>(null);
  const { latestQuizzes, loadingLatest, getLatestQuizzes } = useQuiz();
  const { relatedCourses, loadingRelated, getRelatedCourses } =
    useEnrolledCourses();
  const { addFavorite, removeFavorite, removingId } = useFavoriteCourses();
  const [favoritesState, setFavoritesState] = useState<Record<string, boolean>>({});

  useEffect(() => {
    getLatestQuizzes();
    getRelatedCourses();
  }, [getLatestQuizzes, getRelatedCourses]);

  // Initialize favorites state from API response
  useEffect(() => {
    if (relatedCourses && relatedCourses.length > 0) {
      const initialState = relatedCourses.reduce((acc, course) => {
        acc[course.id] = course.isFavorite;
        return acc;
      }, {} as Record<string, boolean>);
      setFavoritesState(initialState);
    }
  }, [relatedCourses]);

  // View action handler
  const handleView = (materialId: string) => {
    console.log(`Viewing material ${materialId}`);
  };

  // Download action handler
  const handleDownload = (_: string, fileName: string) => {
    console.log(`Downloading ${fileName}`);
  };

  // Favorite toggle handler
  const handleFavoriteToggle = async (courseId: string) => {
    const currentFavoriteState = favoritesState[courseId];
    
    if (currentFavoriteState) {
      setAddingId(courseId);
      const success = await removeFavorite(courseId);
      if (success) {
        setFavoritesState((prev) => ({ ...prev, [courseId]: false }));
      }
      setAddingId(null);
    } else {
      setAddingId(courseId);
      const success = await addFavorite(courseId);
      if (success) {
        setFavoritesState((prev) => ({ ...prev, [courseId]: true }));
      }
      setAddingId(null);
    }
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-[calc(100vh-150px)] w-full">
      <div className="grid grid-cols-1 gap-4 px-3 lg:grid-cols-8">
        <div className="col-span-1 lg:col-span-6">
          {/* <div className="flex flex-col justify-between items-center gap-4 bg-white border shadow-sm rounded-xl p-4 h-fit mb-4 md:flex-row md:items-end">
            <div>
              <h1 className="text-xl font-semibold p-2 mb-4">
                Ahmed s Dashboard - let s jump back in.
              </h1>
              <div className="flex space-y-3 md:space-x-3 md:space-y-0 flex-wrap ">
                <button
                  onClick={() => setActiveTab("courses")}
                  className={`flex items-center text-sm w-full rounded-full gap-1 py-3 px-4 font-medium md:w-fit md:rounded-none ${activeTab === "courses"
                    ? "border-b-0 border-green-500 text-white bg-primary  md:border-b-2 md:text-primary md:bg-transparent"
                    : "text-gray-500 hover:text-green-500 bg-gray-100 hover:bg-green-50 md:bg-transparent md:hover:bg-transparent"
                    }`}
                >
                  Courses
                </button>
                <button
                  onClick={() => setActiveTab("certificates")}
                  className={`flex items-center text-sm w-full rounded-full gap-1 py-3 px-4 font-medium md:w-fit md:rounded-none ${activeTab === "certificates"
                    ? "border-b-0 border-green-500 text-white bg-primary md:border-b-2 md:text-primary md:bg-transparent"
                    : "text-gray-500 hover:text-green-500 bg-gray-100 hover:bg-green-50 md:bg-transparent md:hover:bg-transparent"
                    }`}
                >
                  Certificates
                </button>
              </div>
            </div>
            <div>
              <Image
                className="w-[160px] object-cover"
                src={graduationImg}
                alt="graduation"
                width={300}
                height={300}
              />
            </div>
          </div> */}
          <StudentCard/>
          <div className="block lg:hidden">
            <WalletCard className="!flex-col" balance={16200.62} />

            <div className="mt-4 rounded-xl border border-gray-200 p-4 shadow-sm">
              <Calendar
                events={events}
                onDateSelect={setSelectedDate}
                selectedDate={selectedDate}
              />
              <EventList events={events} selectedDate={selectedDate} />
            </div>
          </div>
          {/* Courses Panel */}
          {activeTab === "courses" && (
            <div className="mt-4">
              <SolidTabs tabs={tabs} />
            </div>
          )}
          {/* Course Certificate Panel */}
          {activeTab === "certificates" && (
            <div className="rounded-xl border bg-white p-4 shadow-sm">
              <h1 className="text-lg font-bold text-gray-800">
                Earned Certificates
              </h1>
              <p className="mb-4 text-xs text-gray-600">
                You can view or download your earned certificates
              </p>
              <div className="overflow-x-auto rounded-lg">
                <table className="w-full divide-y divide-gray-200 text-xs">
                  <thead className="bg-primary text-white">
                    <tr>
                      <th className="px-4 py-6 text-left font-medium">
                        Certificate
                      </th>
                      <th className="px-4 py-6 text-left font-medium">
                        Program
                      </th>
                      <th className="px-4 py-6 text-left font-medium">Grade</th>
                      <th className="px-4 py-6 text-left font-medium">
                        Issued
                      </th>
                      <th className="px-4 py-6 text-left font-medium">
                        Serial
                      </th>
                      <th className="px-4 py-6 text-left font-medium">View</th>
                      <th className="px-4 py-6 text-left font-medium">
                        Download
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {certificatesList && certificatesList.length > 0 ? (
                      certificatesList.map((certificate) => (
                        <tr key={certificate.id} className="hover:bg-gray-50">
                          <td className="px-4 py-6 font-medium whitespace-nowrap text-gray-900">
                            <div className="flex items-center">
                              <span className="mr-1">
                                {fileIcons[
                                  certificate.fileType as keyof typeof fileIcons
                                ] || fileIcons.default}
                              </span>
                              <Link
                                href={certificate.downloadUrl}
                                className="hover:text-primary max-w-[100px] truncate hover:underline"
                              >
                                {certificate.name}
                              </Link>
                            </div>
                          </td>
                          <td className="max-w-[150px] truncate px-4 py-6 whitespace-nowrap text-gray-500">
                            {certificate.program}
                          </td>
                          <td className="px-4 py-6 whitespace-nowrap text-gray-500">
                            {certificate.grade}
                          </td>
                          <td className="px-4 py-6 whitespace-nowrap text-gray-500">
                            {new Date(
                              certificate.issue_date,
                            ).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </td>
                          <td className="px-2 py-6 whitespace-nowrap text-gray-500">
                            {certificate.serial}
                          </td>
                          <td className="px-2 py-6 whitespace-nowrap">
                            <div className="flex justify-center">
                              <button
                                onClick={() => handleView(certificate.id)}
                                className="rounded p-1 text-green-600 transition-colors hover:bg-green-50 hover:text-green-800"
                                title="View"
                              >
                                <Eye size={14} />
                              </button>
                            </div>
                          </td>
                          <td className="px-2 py-6 whitespace-nowrap">
                            <div className="flex justify-center">
                              <button
                                onClick={() =>
                                  handleDownload(
                                    certificate.downloadUrl,
                                    certificate.name,
                                  )
                                }
                                className="rounded p-1 text-green-600 transition-colors hover:bg-green-50 hover:text-green-800"
                                title="Download"
                              >
                                <Download size={14} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={7}
                          className="py-10 text-center text-sm text-gray-500"
                        >
                          No certificates found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
        <div className="col-span-1 hidden lg:col-span-2 lg:block">
          <div>
            {/* <WalletCard className="!flex-col" balance={16200.62} /> */}
            {/* Latest quizzes */}
            <div className="rounded-xl border border-gray-200 bg-white p-3 shadow-sm transition-shadow">
              <h2 className="mb-4 flex items-center text-lg font-semibold text-gray-800">
                <HelpCircle className="mr-2 h-5 w-5 text-green-600" />
                Latest Quizzes
              </h2>

              <div className="space-y-3">
                {loadingLatest ? (
                  <div className="py-8 text-center text-sm text-gray-500">
                    <div className="flex items-center justify-center gap-2">
                      <Clock className="h-4 w-4 animate-spin" />
                      Loading quizzes...
                    </div>
                  </div>
                ) : latestQuizzes && latestQuizzes.length > 0 ? (
                  latestQuizzes.map((quiz) => (
                    <div
                      key={quiz.quizId}
                      className={`rounded-lg border p-3 transition-colors ${
                        quiz.passed
                          ? "border-green-200 bg-green-50 hover:border-green-300"
                          : "border-red-200 bg-red-50 hover:border-red-300"
                      }`}
                    >
                      <div className="space-y-2">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="mb-1 flex items-center gap-2">
                              {quiz.passed ? (
                                <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-green-600" />
                              ) : (
                                <XCircle className="h-4 w-4 flex-shrink-0 text-red-600" />
                              )}
                              <h3 className="line-clamp-1 text-sm font-semibold text-gray-800">
                                {quiz.quizTitle}
                              </h3>
                            </div>
                            <p className="ml-6 line-clamp-1 text-xs text-gray-600">
                              {quiz.course.name}
                            </p>
                          </div>
                        </div>

                        <div className="ml-6 space-y-1">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-gray-600">Score:</span>
                            <span
                              className={`font-semibold ${
                                quiz.passed ? "text-green-700" : "text-red-700"
                              }`}
                            >
                              {quiz.score}% / {quiz.passingScore}%
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <span>Attempted:</span>
                            <span>{formatDate(quiz.attemptedAt)}</span>
                          </div>
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-gray-600">Status:</span>
                            <span
                              className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                                quiz.passed
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {quiz.passed ? "Passed" : "Failed"}
                            </span>
                          </div>
                        </div>

                        <Link
                          href={`/courses/view/${quiz.course.id}`}
                          className={`mt-2 flex w-full items-center justify-center gap-1 rounded px-3 py-1.5 text-xs font-medium text-white transition-colors ${
                            quiz.passed
                              ? "bg-green-600 hover:bg-green-700"
                              : "bg-red-600 hover:bg-red-700"
                          }`}
                        >
                          View Course <ChevronRight className="h-3 w-3" />
                        </Link>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="py-8 text-center text-sm text-gray-500">
                    No quiz attempts yet
                  </div>
                )}
              </div>
            </div>
            <div className="mt-4 rounded-xl border border-gray-200 p-4 shadow-sm">
              <Calendar
                events={events}
                onDateSelect={setSelectedDate}
                selectedDate={selectedDate}
              />
              <EventList events={events} selectedDate={selectedDate} />
            </div>
            <div className="mt-4 h-fit rounded-lg border border-gray-200 bg-white p-3 shadow-sm">
              <h2 className="mb-3 text-lg font-semibold">Related courses</h2>
              {loadingRelated ? (
                <div className="py-8 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <Clock className="h-4 w-4 animate-spin" />
                    <span className="text-sm text-gray-600">
                      Loading related courses...
                    </span>
                  </div>
                </div>
              ) : relatedCourses && relatedCourses.length > 0 ? (
                <ul className="flex flex-col gap-6">
                  {relatedCourses.slice(0, 5).map((course) => {
                    const isFavorited = favoritesState[course.id] ?? course.isFavorite;
                    const isLoading = addingId === course.id || removingId === course.id;

                    return (
                      <li
                        className="relative border-b last-of-type:border-b-0"
                        key={course.id}
                      >
                        <div className="flex gap-4 px-3 py-4">
                          <div className="max-h-[100px] max-w-[200px] overflow-hidden rounded-lg lg:max-w-[100px]">
                            <Image
                              className="h-full w-full object-cover"
                              src={course.courseImage}
                              alt={course.name}
                              width={200}
                              height={200}
                            />
                          </div>
                          <div className="flex w-full flex-col gap-1">
                            <span className="text-xs text-gray-500">
                              Course
                            </span>
                            <h2 className="line-clamp-2 text-sm font-semibold">
                              {course.name}
                            </h2>
                            <span className="text-muted-foreground text-xs">
                              {course.studentCount} learners
                            </span>
                            <div className="mt-2 flex items-center gap-2">
                              <Link
                                href={`/courses/view/${course.id}`}
                                className="flex w-fit items-center gap-1 rounded-full bg-green-600 px-3 py-1 text-xs text-white hover:bg-green-700"
                              >
                                Details <MoveUpRight size={12} />
                              </Link>
                              <button 
                                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                                onClick={() => handleFavoriteToggle(course.id)}
                                disabled={isLoading}
                                title={isFavorited ? "Remove from favorites" : "Add to favorites"}
                              >
                                <Heart 
                                  size={14} 
                                  className={`transition-colors ${
                                    isFavorited 
                                      ? "fill-red-500 text-red-500" 
                                      : "text-gray-400 hover:text-red-500"
                                  } ${isLoading ? "opacity-50" : ""}`}
                                />
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <div className="py-8 text-center">
                  <div className="space-y-2">
                    <BookOpen className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="text-sm text-gray-600">
                      No related courses found
                    </p>
                    <p className="text-xs text-gray-500">
                      Explore more courses to see recommendations
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="my-8">
            <Image
              className="w-full"
              src={PlansImage}
              alt="Plan image"
              width={150}
              height={150}
            />
          </div>
        </div>
      </div>
      <LimitedCounterOffer initialCount={400} duration={33} />
    </div>
  );
};
export default StudentCoursesPage;
