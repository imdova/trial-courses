import CardCourse from "../CardCourse";
import { getAcademyPublicCourses } from "@/lib/actions/courses.actions";

const CoursesList = async ({ id }: { id: string }) => {
  const courses = await getAcademyPublicCourses(id);
  if (!courses.success)
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <p className="text-muted-foreground text-sm">No Courses Found</p>
      </div>
    );
  return (
    <div className="grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-3">
      {courses.data?.data.map((course) => (
        <CardCourse key={course.id} course={course} isOwner={true} />
      ))}
    </div>
  );
};

export default CoursesList;
