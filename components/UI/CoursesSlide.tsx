"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { CourseContentProps } from "@/types/courses";
import CourseCard from "./CourseCard";
type courseProps = {
  courses: CourseContentProps[];
};
export default function CoursesSlide({ courses }: courseProps) {
  const [current, setCurrent] = useState(0);

  const visibleCards = 3;

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % (courses.length - (visibleCards - 1)));
  };

  const prevSlide = () => {
    setCurrent(
      (prev) =>
        (prev - 1 + (courses.length - (visibleCards - 1))) %
        (courses.length - (visibleCards - 1))
    );
  };

  return (
    <div className="group relative w-full overflow-hidden rounded-2xl mb-4">
      <div className="flex flex-col items-center md:flex-row md:items-center justify-between">
        <h2 className="text-xl text-center font-semibold mb-4 w-full md:text-start">
          Learners who took in this course also enrolled in
        </h2>
        {/* Navigation Buttons */}
        <div className=" flex gap-3 justify-end mb-8 z-10  px-2">
          <button
            onClick={prevSlide}
            className="flex justify-center items-center w-10 h-10 text-primary bg-white border shadow-md rounded-full  transition"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextSlide}
            className="flex justify-center items-center w-10 h-10 text-primary bg-white border shadow-md rounded-full  transition"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
      {/* Slider */}
      <div className="flex items-center justify-center w-full min-h-[300px]">
        <div className="grid grid-cols-1  md:grid-cols-3  gap-4 w-full">
          {courses.length > 0 ? (
            courses
              .slice(current, current + visibleCards)
              .map((course) => <CourseCard key={course.id} {...course} />)
          ) : (
            <p className="text-gray-500 text-center col-span-4">
              No courses found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
