import CourseForm from "../components/CourseForm";
import { getFullCourseByID } from "@/lib/actions/courses.actions";
import { auth } from "@/auth";
import { CourseItem } from "@/types/courses";

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const params = await searchParams;
  const duplicate = params.duplicate as string | undefined;
  const session = await auth();
  const user = session?.user;
  const data = duplicate
    ? await getFullCourseByID(duplicate, user?.accessToken)
    : null;
  const courseData = data?.data?.course || ({} as CourseItem);
  const sections = data?.data?.sections || [];

  const { id, ...course } = courseData;

  return (
    <CourseForm course={{ ...course, modules: sections }} duplicateId={id} />
  );
};

export default page;
