"use client";

import CourseCard from "@/components/UI/CourseCard";
import CourseCardList from "@/components/UI/CourseCardList";
import { CourseType } from "@/types/courses";
import { useSearchParams } from "next/navigation";

interface CourseViewProps {
  courses: CourseType[];
}

export default function CourseView({ courses }: CourseViewProps) {
  const searchParams = useSearchParams();
  const viewMode = searchParams.get("view") || "grid";
  if (courses.length === 0) {
    return (
      <div className="text-center text-muted-foreground text-lg">
        No Courses Found!
      </div>
    );
  }

  return viewMode === "grid" ? (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
      {courses.map((course) => (
        <CourseCard key={course.id} {...course} />
      ))}
    </div>
  ) : (
    <div className="grid grid-cols-1 overflow-auto">
      <div className="flex flex-col gap-4 min-w-[800px]">
        {courses.map((course) => (
          <CourseCardList key={course.id} {...course} />
        ))}
      </div>
    </div>
  );
}
