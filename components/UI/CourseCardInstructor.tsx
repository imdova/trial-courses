"use client";
import Image from "next/image";
import { Earth, GraduationCap, SquarePen, Star, Video } from "lucide-react";
import Link from "next/link";
import { CourseContentProps } from "@/types/courses";

const CourseCardInstructor: React.FC<CourseContentProps> = ({
  id,
  image,
  title,
  rating,
  students,
  type,
  description,
}) => {
  return (
    <>
      {/* Course Card */}
      <div className="bg-white border rounded-xl relative overflow-hidden">
        <Link href={`/instructor/courses/${id}`}>
          {type === "Live" && (
            <span className="absolute top-7 left-7 flex items-center gap-3 px-3 py-2 rounded-full bg-gray-100 z-10">
              <Earth size={18} />
              <span className="text-xs font-semibold">Online</span>
            </span>
          )}
          {type === "Recorded" && (
            <span className="absolute top-7 left-7 flex items-center gap-3 px-3 py-2 rounded-full bg-gray-100">
              <Video size={18} />
              <span className="text-xs font-semibold">Recorded</span>
            </span>
          )}
          <div className="w-full overflow-hidden  mb-3 h-56">
            <Image
              className="w-full h-full object-cover"
              src={image}
              alt="Course Thumbnail"
              width={400}
              height={400}
            />
          </div>
          <div className="p-4">
            <div className="mb-4">
              <h1 className="mb-2 font-semibold">{title}</h1>
              <p className="text-sm text-muted-foreground">{description}</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Star size={15} className="text-primary" />
                {rating}
                <span className="text-muted-foreground text-sm">(865)</span>
              </div>
              <div className="flex items-center gap-2">
                <GraduationCap size={15} className="text-primary" />
                {students}
                <span className="text-muted-foreground text-sm">Students</span>
              </div>
            </div>
          </div>
        </Link>
        <div className="flex justify-between w-full mb-3 p-4">
          <div className="flex justify-end gap-2 w-full">
            <Link
              href={`/instructor/courses/edit/${id}`}
              className="flex items-center p-2 border border-primary text-primary  px-4 gap-2  bg-white hover:bg-primary hover:text-white rounded-md transition"
            >
              <SquarePen size={15} />
            </Link>
            <Link
              href={`/instructor/courses/${id}`}
              className="flex items-center p-2 px-4 gap-2 text-white bg-primary hover:bg-black rounded-md transition"
            >
              View
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseCardInstructor;
