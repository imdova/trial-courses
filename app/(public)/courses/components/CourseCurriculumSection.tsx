import { getCourseSectionsByID } from "@/lib/actions/courses.actions";
import { CourseItem } from "@/types/courses";
import CourseCurriculum from "./CourseCurriculum";

const CourseCurriculumSection = async ({ course }: { course: CourseItem }) => {
  const data = await getCourseSectionsByID(course.id);
  const sections = data?.data || [];

  return <CourseCurriculum sections={sections} />;
};

export default CourseCurriculumSection;
