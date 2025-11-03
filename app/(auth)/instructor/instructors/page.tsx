"use client";
import InstructorCard from "@/components/UI/InstructorCard";
import Pagination from "@/components/UI/Pagination/Pagination";
import { instructorsData } from "@/constants/students.data";
import { useState } from "react";

export default function Instructors() {
  const [currentPage, setCurrentPage] = useState(1);
  const showPageNum = 10;
  // Pagination Logic
  const indexOfLastinstructor = currentPage * showPageNum;
  const indexOfFirstinstructor = indexOfLastinstructor - showPageNum;
  const currentinstructors = instructorsData.slice(
    indexOfFirstinstructor,
    indexOfLastinstructor
  );
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {currentinstructors.map((instructor, index) => {
          return (
            <InstructorCard
              key={index}
              name={instructor.name}
              image={instructor.image}
              rating={instructor.rating}
              coursesType={instructor.coursesType}
              achievement={instructor.achievement}
              certificate={instructor.certificate}
            />
          );
        })}
      </div>
      {/* Pagination Component */}
      <div className="my-6">
        <Pagination
          total={instructorsData.length}
          PerPage={showPageNum}
          paginate={setCurrentPage}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
}
