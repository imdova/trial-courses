import { CourseItem } from "@/types/courses";
import CardCourse from "./CardCourse";

const AcademyCoursesList: React.FC = () => {
  const courses: CourseItem[] = [];
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
      {courses.map((course) => (
        <CardCourse key={course.id} course={course} isOwner={true} />
      ))}
    </div>
  );
};

export default AcademyCoursesList;
