import { Suspense } from "react";
import CourseView from "./components/CourseView";
import CustomPagination from "@/components/UI/CustomPagination";
import FilterContent from "@/components/Layout/filter/filter";
import courseFilter from "@/constants/filters/courseFilter";
import Loading from "@/components/loading/loading";
// import { CourseType } from "@/types/courses";
import ViewControls from "./components/ViewControls";
import FilterControls from "./components/FilterControls";
import { courseData } from "@/constants/VideosData.data";

// async function getCourses() {
//   try {
//     const response = await fetch(`http://localhost:3000/api/courses`, {
//       method: "GET",
//       cache: "no-store",
//     });

//     if (!response.ok) {
//       throw new Error("Failed to fetch courses");
//     }

//     return (await response.json()) as CourseType[];
//   } catch (error) {
//     console.error("Error fetching courses:", error);
//     return [];
//   }
// }

export default async function CoursesPage() {
  // Server-side data fetching
  // const data = await getCourses();
  if (!courseData || courseData.length === 0) {
    return <div className="text-center py-8">No courses found</div>;
  }

  return (
    <main className="relative mb-8">
      <div className="flex justify-between gap-6">
        <Suspense fallback={<Loading />}>
          <FilterContent sections={courseFilter} />
        </Suspense>
        <div className="flex-1">
          <h1 className="text-4xl md:text-5xl font-bold my-6 md:text-start text-center">
            All Courses
          </h1>
          <Suspense>
            <ViewControls />
          </Suspense>
          <Suspense>
            <FilterControls />
          </Suspense>
          <Suspense fallback={<Loading />}>
            <CourseView courses={courseData} />
            <CustomPagination totalItems={courseData.length} />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
