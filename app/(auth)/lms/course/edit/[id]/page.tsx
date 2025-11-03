import CourseForm from "../../components/CourseForm";
import { getFullCourseByID } from "@/lib/actions/courses.actions";
import { notFound } from "next/navigation";
import { auth } from "@/auth";
import { CourseItem } from "@/types/courses";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const session = await auth();
  const user = session?.user;
  const data = await getFullCourseByID(id, user?.accessToken);
  const courseData = data?.data?.course;
  const sections = data?.data?.sections || [];
  if (!courseData) {
    return notFound();
  }
  const course: CourseItem = { ...courseData, modules: sections };
  return <CourseForm course={course} />;
};

export default page;
