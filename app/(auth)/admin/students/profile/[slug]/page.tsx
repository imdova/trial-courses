"use client";
import NotFoundPage from "@/app/not-found";
import CourseCard from "@/components/UI/CourseCard";
import Pagination from "@/components/UI/Pagination/Pagination";
import Rating from "@/components/UI/Rating";
import ShowMoreText from "@/components/UI/ShowMoreText";
import { StudentsData } from "@/constants/students.data";
import { courseData } from "@/constants/VideosData.data";
import {
  Award,
  BookOpen,
  Clock,
  Languages,
  MapPin,
  Pen,
  Plus,
  Share2,
  Star,
  GraduationCap,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { use, useState } from "react";

interface SingleStudentProfileProps {
  params: Promise<{ slug: string }>;
}

export default function SingleStudentProfile({
  params,
}: SingleStudentProfileProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const { slug } = use(params);
  const student = StudentsData.find((student) => student.id === slug);

  const showPageNum = 6;
  const [filter, setFilter] = useState<
    "All" | "Medical" | "Technology" | "Language" | "Law"
  >("All");

  // Handle filter courses
  const filteredCourses =
    filter === "All"
      ? courseData
      : courseData.filter((course) => course.category === filter);

  // Pagination Logic
  const indexOfLastCourse = currentPage * showPageNum;
  const indexOfFirstCourse = indexOfLastCourse - showPageNum;
  const currentCourses = filteredCourses.slice(
    indexOfFirstCourse,
    indexOfLastCourse
  );

  if (!student) return <NotFoundPage />;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-7 gap-3  p-3">
      {/* Student information */}
      <div className="col-span-1 lg:col-span-5">
        <div className="relative mb-12">
          <div className="h-[400px] overflow-hidden rounded-xl border lg:h-[200px]">
            <Image
              className="absolute left-0 top-0 h-full w-full rounded-lg object-cover"
              src={
                "https://img.freepik.com/free-photo/group-diverse-graduates-throwing-caps-up-sky_53876-95847.jpg"
              }
              width={400}
              height={200}
              alt="background"
            />
            <div className="absolute left-0 top-0 h-full w-full rounded-lg bg-[#47b162ea]"></div>
            <div className="absolute right-5 top-5 flex flex-col gap-6 z-10">
              <button className="text-white">
                <Pen size={23} />
              </button>
              <button className="text-white">
                <Share2 size={23} />
              </button>
            </div>
            <div className="relative flex h-full flex-col items-center justify-center gap-6 p-6 text-white lg:flex-row lg:items-end lg:justify-between">
              <div className="hidden w-[140px] lg:block"></div>
              <div className="text-center lg:text-start">
                <h2 className="font-semibold">{student.name}</h2>
                <span className="text-xs">{student.info}</span>
              </div>
              <div className="flex gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-14">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full border">
                      <GraduationCap size={25} />
                    </div>
                  </div>
                  <div>
                    <h2 className="text-sm">{student.completedCourses}</h2>
                    <span className="text-sm">Completed</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-14">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full border">
                      <BookOpen size={25} />
                    </div>
                  </div>
                  <div>
                    <h2 className="text-sm">{student.enrolledCourses}</h2>
                    <span className="text-sm">Enrolled</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Image
            src={student.avatar}
            width={200}
            height={200}
            alt={student.name}
            className="absolute -bottom-8 left-1/2 h-[140px] w-[140px] -translate-x-1/2 rounded-full shadow-md border-4 border-white object-cover lg:left-6 lg:-translate-x-0"
          />
        </div>

        {/* About Me Section */}
        <div className="border bg-white rounded-xl p-4 mb-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold">About </h1>
            <Link
              className="flex justify-center items-center w-10 h-10 border rounded-md "
              href={"#"}
            >
              <Pen size={15} />
            </Link>
          </div>
          <div className="py-4">
            <ShowMoreText text={student.details} maxChars={250} />
          </div>
        </div>

        {/* Enrolled Courses Section */}
        <div className="border bg-white rounded-xl p-4 mb-4 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-semibold">
              Courses{" "}
              <span className="text-xl">({student.enrolledCourses})</span>
            </h1>
            <Link
              className="flex justify-center items-center w-10 h-10 border rounded-md "
              href={"#"}
            >
              <Plus size={15} />
            </Link>
          </div>
          <div className="flex flex-col w-full lg:w-fit lg:flex-row gap-2 bg-gray-100 p-1 rounded-lg mb-4">
            {["All", "Medical", "Technology", "Language", "Law"].map(
              (category) => (
                <button
                  key={category}
                  onClick={() =>
                    setFilter(
                      category as
                        | "All"
                        | "Medical"
                        | "Technology"
                        | "Language"
                        | "Law"
                    )
                  }
                  className={`p-2 lg:w-[150px] flex-1 rounded-lg text-sm ${
                    filter === category
                      ? "bg-white text-primary"
                      : "bg-gray-100 text-muted-foreground"
                  }`}
                >
                  {category}
                </button>
              )
            )}
          </div>
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {currentCourses.map((course) => {
                return <CourseCard key={course.id} {...course} />;
              })}
            </div>
            {currentCourses.length === 0 ? (
              <p className="text-center p-4 text-muted-foreground text-sm">{`No courses in ${filter} category!`}</p>
            ) : (
              ""
            )}
            <div className="my-6">
              <Pagination
                total={filteredCourses.length}
                PerPage={showPageNum}
                paginate={setCurrentPage}
                currentPage={currentPage}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="col-span-1 lg:col-span-2">
        {/* Performance Reviews */}
        <div className="border bg-white rounded-xl p-4 mb-4 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Performance Reviews</h2>
            <Link
              className="flex justify-center items-center w-10 h-10 border rounded-md "
              href={"#"}
            >
              <Pen size={15} />
            </Link>
          </div>
          <ul>
            {student.performanceReviews.map((review, index) => {
              return (
                <li className="p-3 border rounded-lg mb-3" key={index}>
                  <div className="flex gap-2">
                    <div className="w-12">
                      <Image
                        className="w-12 h-12 rounded-full object-cover"
                        src={review.instructor.image}
                        alt="Instructor avatar"
                        width={200}
                        height={200}
                      />
                    </div>
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold mb-1">
                        {review.instructor.name}
                      </h4>
                      <Rating rating={review.rating} size={9} />
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{review.content}</p>
                </li>
              );
            })}
            <li className="flex justify-center py-3">
              <Link className="text-center text-primary" href={"#"}>
                View All Reviews
              </Link>
            </li>
          </ul>
        </div>

        {/* Certificates & Achievements */}
        <div className="border bg-white rounded-xl p-4 mb-4 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold max-w-[200px]">
              Certificates & Achievements
            </h2>
            <Link
              className="flex justify-center items-center w-10 h-10 border rounded-md "
              href={"#"}
            >
              <Pen size={15} />
            </Link>
          </div>
          <ul>
            {student.certificates.map((certificate, index) => {
              return (
                <li key={index} className="flex items-center gap-2 mb-4">
                  <Award size={23} />
                  <div>
                    <h4 className="text-sm font-semibold">
                      {certificate.title}
                    </h4>
                    <span className="block text-sm text-muted-foreground">
                      {certificate.source}
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Student Info */}
        <div className="border bg-white rounded-xl p-4 mb-4 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold max-w-[200px]">
              Student Info
            </h2>
            <Link
              className="flex justify-center items-center w-10 h-10 border rounded-md "
              href={"#"}
            >
              <Pen size={15} />
            </Link>
          </div>
          <ul>
            <li className="flex items-center gap-2 mb-4">
              <MapPin size={23} />
              <h4 className="text-sm font-semibold">{student.country}</h4>
            </li>
            <li className="flex items-center gap-2 mb-4">
              <Languages size={23} />
              <h4 className="text-sm font-semibold">
                {student.languages.join(", ")}
              </h4>
            </li>
            <li className="flex items-center gap-2 mb-4">
              <GraduationCap size={23} />
              <h4 className="text-sm font-semibold">{student.education}</h4>
            </li>
            <li className="flex items-center gap-2 mb-4">
              <Clock size={23} />
              <h4 className="text-sm font-semibold">
                Year {student.yearOfStudy} Student
              </h4>
            </li>
            <li className="flex items-center gap-2 mb-4">
              <Star size={23} />
              <h4 className="text-sm font-semibold">
                GPA: {student.gradeAverage}
              </h4>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="border bg-white rounded-xl p-4 mb-4 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold max-w-[200px]">Contact</h2>
            <Link
              className="flex justify-center items-center w-10 h-10 border rounded-md "
              href={"#"}
            >
              <Pen size={15} />
            </Link>
          </div>
          <ul className="flex flex-col gap-1 text-sm text-gray-700">
            <li className="flex items-center gap-2 p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              <span>{student.email}</span>
            </li>
            <li className="flex items-center gap-2 p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              <span>{student.phone}</span>
            </li>
            <li className="w-fit p-2 py-1">
              <Link
                href="https://linkedin.com/in/username"
                target="_blank"
                className="flex items-center space-x-2 hover:text-blue-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M4.98 3.5C4.98 4.61 4.09 5.5 2.98 5.5S1 4.61 1 3.5 1.89 1.5 3 1.5 4.98 2.39 4.98 3.5zM.5 8.5H5V24H.5V8.5zM7.5 8.5h4.2v2.1h.06c.58-1.1 2-2.25 4.14-2.25 4.43 0 5.25 2.91 5.25 6.69V24h-4.5v-7.5c0-1.79-.03-4.11-2.5-4.11-2.5 0-2.89 1.95-2.89 3.97V24H7.5V8.5z" />
                </svg>
                <span className="block mt-1">LinkedIn</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
