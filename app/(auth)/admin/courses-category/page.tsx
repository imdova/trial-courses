"use client";

import CoursesCategoryTable from "./CoursesCategoryTable";

export default function InstructorsPage() {
  return (
    <div>
      <h2 className="my-6 text-2xl font-bold">Courses Category</h2>
      <div className="box-content">
        <CoursesCategoryTable />
      </div>
    </div>
  );
}
