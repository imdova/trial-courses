"use client";

import { CourseType } from "@/types/courses";
import Image from "next/image";
import Link from "next/link";

interface EnrolledCourseCardProps {
  course: CourseType;
}

const EnrolledCourseCard: React.FC<EnrolledCourseCardProps> = ({ course }) => {
  return (
    <Link
      href={`/admin/courses/${course.id}`}
      key={course.id}
      className="flex min-h-80 flex-col overflow-hidden rounded-lg border border-gray-200 bg-white p-2"
    >
      {/* Course image */}
      <Image
        className="h-[140px] w-full rounded-lg object-cover"
        src={course.image}
        alt={course.title}
        width={300}
        height={300}
      />

      {/* Category section */}
      <p className="text-primary mt-2 w-fit rounded-full bg-green-50 px-3 py-1 text-xs font-medium">
        {course.category}
      </p>

      {/* Content section */}
      <div className="flex flex-1 flex-col p-4">
        <h3 className="mb-2 line-clamp-2 text-lg font-bold text-gray-800">
          {course.title}
        </h3>

        {/* Progress bar */}
        <div className="mt-auto mb-4">
          <div className="h-2 w-full rounded-full bg-gray-200">
            <div
              className="h-2 rounded-full bg-green-600 transition-all"
              style={{ width: `50%` }}
            ></div>
          </div>
          <p className="mt-1 text-xs text-gray-500">50% completed</p>
        </div>

        {/* Instructor info */}
        <div className="flex items-center gap-2">
          <Image
            className="h-8 w-8 rounded-full object-cover"
            src={course.instructor.image}
            alt={course.instructor.name}
            width={32}
            height={32}
          />
          <p className="text-sm text-gray-600">Dr/ {course.instructor.name}</p>
        </div>
      </div>
    </Link>
  );
};

export default EnrolledCourseCard;
