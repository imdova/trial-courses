/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { courseData } from "@/constants/VideosData.data";
import {
  BookOpen,
  Calendar,
  Check,
  CheckCircle,
  Clock,
  Eye,
  FileText,
  MoveUpRight,
  PlayCircle,
  Upload,
  Loader2,
} from "lucide-react";
import { useEnrolledCourses } from "../hooks/useEnrolledCourses";
import { InstructorAvatar } from "../../favorite/InstructorAvatar";

type Instructor = {
  name: string;
  avatar: string;
};

type StudentCourse = {
  id: string;
  title: string;
  image: string;
  isComplete: boolean;
  category: string;
  instructor: Instructor;
  lastActive: string;
  progress: number;
};


const RecordedCourses = () => {
  const { 
    courses, 
    latestCourses, 
    loading, 
    loadingLatest, 
    error, 
    getEnrolledCourses,
    getLatestCourses 
  } = useEnrolledCourses();

  useEffect(() => {
    getEnrolledCourses();
    getLatestCourses();
  }, [getEnrolledCourses, getLatestCourses]);

  console.log("Enrolled courses data:", courses);
  console.log("Latest courses data:", latestCourses);
  console.log("Loading latest:", loadingLatest);
  console.log("Error:", error);

  // Loading State
  if (loading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="h-12 w-12 text-blue-600 animate-spin mx-auto" />
          <p className="text-gray-600">Loading your courses...</p>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center">
            <FileText className="h-8 w-8 text-red-600" />
          </div>
          <p className="text-gray-600">{error}</p>
          <button
            onClick={getEnrolledCourses}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Ensure courses is an array
  const coursesArray = Array.isArray(courses) ? courses : [];
  const latestCoursesArray = Array.isArray(latestCourses) ? latestCourses : [];

  // Empty State
  if (coursesArray.length === 0) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="text-center space-y-4">
          <BookOpen className="h-16 w-16 text-gray-400 mx-auto" />
          <h3 className="text-xl font-semibold text-gray-700">No Courses Yet</h3>
          <p className="text-gray-600">You haven't enrolled in any courses yet.</p>
          <Link
            href="/courses"
            className="inline-block px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Browse Courses
          </Link>
        </div>
      </div>
    );
  }

  // Get the latest course from the API (most recently studied)
  const latestCourseData = latestCoursesArray.length > 0 ? latestCoursesArray[0] : null;
  
  console.log("Latest course data:", latestCourseData);
  console.log("Latest courses array:", latestCoursesArray);
  
  // Format the last studied date
  const formatLastStudied = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins} minutes ago`;
    if (diffHours < 24) return `${diffHours} hours ago`;
    if (diffDays === 1) return 'Yesterday';
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  return (
    <div>
      <div>
        <div className="col-span-1 lg:col-span-6">
          <div>
            <div className="mb-4 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
              {/* Continue Learning - Latest Course */}
              <div className="divide-y divide-gray-200">
                {loadingLatest ? (
                  <div className="p-6 flex items-center justify-center">
                    <div className="text-center space-y-2">
                      <Loader2 className="h-8 w-8 text-green-600 animate-spin mx-auto" />
                      <p className="text-sm text-gray-600">Loading your progress...</p>
                    </div>
                  </div>
                ) : error ? (
                  <div className="p-6 text-center">
                    <p className="text-sm text-red-600">Error loading latest course: {error}</p>
                  </div>
                ) : latestCourseData ? (
                  <div key={latestCourseData.course.id} className="p-6">
                    <div className="mb-3 flex items-center gap-2">
                      <PlayCircle className="h-5 w-5 text-green-600" />
                      <h3 className="text-sm font-semibold text-gray-700">Continue Learning</h3>
                    </div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-8">
                      <div className="col-span-1 flex flex-col items-center gap-4 pr-7 sm:col-span-5 md:flex-row">
                        <Image
                          className="h-[130px] w-[130px] rounded-xl object-cover"
                          src={latestCourseData.course.courseImage}
                          width={300}
                          height={300}
                          alt={latestCourseData.course.name}
                        />
                        <div className="flex flex-col items-center md:items-start w-full">
                          <h2 className="mb-2 text-center text-lg font-semibold text-gray-800 md:text-start">
                            {latestCourseData.course.name}
                          </h2>

                          {latestCourseData.totalProgress < 100 && (
                            <div className="mb-3 w-full">
                              <div className="h-2.5 w-full rounded-full bg-gray-200">
                                <div
                                  className="h-2.5 rounded-full bg-green-600"
                                  style={{ width: `${latestCourseData.totalProgress}%` }}
                                ></div>
                              </div>
                              <span className="mt-1 text-xs text-gray-500">
                                {latestCourseData.totalProgress}% complete
                              </span>
                            </div>
                          )}

                          {/* Latest Item Info */}
                          {latestCourseData.latestItem && (
                            <div className="mb-3 rounded-md bg-blue-50 border border-blue-200 p-2 w-full">
                              <div className="flex items-start gap-2">
                                {latestCourseData.latestItem.type === "video" && <PlayCircle className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />}
                                {latestCourseData.latestItem.type === "quiz" && <FileText className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />}
                                {latestCourseData.latestItem.type === "assignment" && <Upload className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />}
                                {latestCourseData.latestItem.type === "lecture" && <BookOpen className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />}
                                <div className="flex-1">
                                  <p className="text-xs font-medium text-blue-900 line-clamp-1">
                                    {latestCourseData.latestItem.sectionName}
                                  </p>
                                  <p className="text-xs text-blue-700 flex items-center gap-1 mt-1">
                                    <Clock className="h-3 w-3" />
                                    Last studied {formatLastStudied(latestCourseData.latestItem.lastStudiedAt)}
                                  </p>
                                </div>
                              </div>
                            </div>
                          )}

                          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                            {latestCourseData.course.tags.slice(0, 2).map((tag, index) => (
                              <span 
                                key={index}
                                className="border-primary text-primary rounded-md border bg-green-50 px-2 py-1 text-xs font-semibold"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="col-span-1 flex items-center justify-center sm:col-span-3 sm:border-l">
                        <div className="flex items-center justify-center md:justify-between">
                          {latestCourseData.totalProgress >= 100 ? (
                            <span className="flex items-center gap-1 text-sm text-green-800">
                              <Check size={15} />
                              Completed
                            </span>
                          ) : (
                            <Link 
                              href={`/courses/view/${latestCourseData.course.id}`}
                              className="flex w-[250px] flex-col items-center justify-center md:items-end"
                            >
                              <button className="w-full items-center rounded-t border border-transparent bg-green-600 px-3 py-2 text-xs font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none">
                                Continue Learning
                              </button>
                              <span className="w-full rounded-b bg-green-200 text-center text-sm py-2">
                                {latestCourseData.course.totalHours ? (
                                  <>
                                    <b>{Math.floor(latestCourseData.course.totalHours)}</b> hrs{" "}
                                    <b>{Math.round((latestCourseData.course.totalHours % 1) * 60)}</b> mins total
                                  </>
                                ) : (
                                  "Continue from where you left"
                                )}
                              </span>
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-6 text-center">
                    <div className="space-y-2">
                      <BookOpen className="h-12 w-12 text-gray-400 mx-auto" />
                      <p className="text-sm text-gray-600">No recent course activity found</p>
                      <p className="text-xs text-gray-500">Start learning to see your progress here</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-col-reverse gap-4 xl:flex-row">
              <div>
                <h2 className="mb-3 text-xl font-bold">My Courses ({coursesArray.length})</h2>
                {/* Courses cards */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {coursesArray.map((course) => {
                    const isComplete = (course.progressPercentage || course.progress || 0) >= 100;
                    return (
                      <Link
                        href={`/courses/view/${course.id}`}
                        key={course.id}
                        className="flex flex-col justify-between rounded-xl border bg-white p-3 shadow-sm hover:shadow-md transition-shadow"
                      >
                        <Image
                          className="mb-2 h-[150px] w-full rounded-xl object-cover"
                          src={course.courseImage}
                          alt={course.name}
                          width={300}
                          height={300}
                        />
                        <span className="mb-4 block w-fit rounded-full bg-[#2BA14933] px-3 py-1 text-xs text-[#2BA149]">
                          {course.category?.name || course.tags[0] || "Course"}
                        </span>
                        <h1 className="mb-4 font-semibold line-clamp-2">{course.name}</h1>
                        <div className="mb-4 w-full">
                          <div className="relative h-1 w-full rounded-full bg-gray-200">
                            {/* Progress line */}
                            <div
                              className="absolute top-0 left-0 h-1 rounded-full bg-green-500 transition-all duration-300"
                              style={{ width: `${course.progressPercentage || 0}%` }}
                            ></div>
                          </div>
                          <span className="mt-1 text-xs text-gray-500">
                            {course.progressPercentage || 0}% complete
                          </span>
                        </div>
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-2 p-2">
                            <InstructorAvatar
                              name={course.instructor.fullName || "Unknown Instructor"}
                              imageUrl={course.instructor.photoUrl || ""}
                            />
                            <span className="text-sm">
                              {course.instructor.fullName}
                            </span>
                          </div>
                          {isComplete && (
                            <span className="flex items-center gap-1 text-xs text-green-800">
                              <CheckCircle size={15} />
                              Completed
                            </span>
                          )}
                        </div>
                      </Link>
                    );
                  })}
                </div>
                <div className="m-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                  {/* Upcoming classes */}
                  <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow">
                    <h2 className="mb-4 flex items-center text-lg font-semibold text-gray-800">
                      <Calendar className="mr-2 h-5 w-5 text-green-600" />
                      Upcoming classes
                    </h2>

                    <div className="space-y-4">
                      {courseData.slice(0, 2).map((coures) => {
                        return (
                          <div
                            key={coures.id}
                            className="rounded-lg border border-gray-200 p-4 transition-colors hover:border-green-200 hover:bg-green-50"
                          >
                            <div className="flex items-center justify-between gap-4">
                              <Image
                                className="h-16 w-16 rounded-md object-cover"
                                src={coures.image}
                                width={200}
                                height={200}
                                alt={coures.title}
                              />
                              <div>
                                <h2 className="mb-1 text-sm font-semibold">
                                  {coures.title}
                                </h2>
                                <span className="text-primary mb-2 block w-fit rounded-md bg-green-50 px-2 py-1 text-xs">
                                  Physics 1
                                </span>
                                <p className="text-muted-foreground text-xs">
                                  by {coures.instructor.name}
                                </p>
                              </div>
                              <button className="bg-primary flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-white">
                                <PlayCircle size={15} /> Play
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  {/* Assignments */}
                  <div className="mt-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow">
                    <h2 className="mb-4 flex items-center text-lg font-semibold text-gray-800">
                      <FileText className="mr-2 h-5 w-5 text-green-600" />
                      Assignment
                    </h2>

                    <div className="rounded-lg border border-gray-200 p-4 transition-colors hover:border-green-200 hover:bg-green-50">
                      <div className="flex items-center font-medium">
                        <BookOpen className="mr-2 h-4 w-4 text-green-600" />
                        Advanced problem solving math
                      </div>
                      <div className="mb-2 ml-6 text-sm text-gray-600">
                        H. math 1
                      </div>
                      <div className="mb-3 ml-6 text-xs text-gray-500">
                        Assignment 5
                      </div>
                      <div className="ml-6 flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center text-xs text-gray-500">
                          <Clock className="mr-1 h-3 w-3" />
                          Submit before: 15th Oct, 2024 ; 12:00PM
                        </div>
                        <div className="flex space-x-2">
                          <button className="flex items-center text-sm text-green-600 hover:text-green-800">
                            <Eye className="mr-1 h-4 w-4" /> View{" "}
                          </button>
                          <button className="flex items-center text-sm text-green-600 hover:text-green-800">
                            <Upload className="mr-1 h-4 w-4" /> Upload
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default RecordedCourses;
