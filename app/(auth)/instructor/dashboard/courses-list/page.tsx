import CoursesTable from "@/components/UI/tables/CoursesTable";
import { courseData } from "@/constants/VideosData.data";
import { Suspense } from "react";

const CoursesList: React.FC = () => {
  return (
    <div>
      <Suspense>
        <CoursesTable courses={courseData} />
      </Suspense>
    </div>
  );
};
export default CoursesList;
