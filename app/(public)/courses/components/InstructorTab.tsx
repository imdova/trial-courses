import { getInstructorByUserName } from "@/lib/actions/instructor.actions";
import InstructorsCard from "./InstructorsTab";
import { CourseItem } from "@/types/courses";
import { AcademyInstructor } from "@/types/academy";

const InstructorTab = async ({ course }: { course: CourseItem }) => {
  if (course.academy?.id) {
    return <AcademyInstructorsCard instructors={course.academyInstructors} />;
  }

  const data = await getInstructorByUserName(course.instructor?.userName || "");
  if (!data.data || !data.success) {
    return null;
  }
  const instructor = data.data;
  if (!instructor) return null;
  return (
    <InstructorsCard
      name={instructor.firstName + " " + instructor.lastName}
      photo={instructor.photoUrl || ""}
      studentCount={0}
      rating={0}
      courseCount={0}
      reviewCount={0}
    />
  );
};

const AcademyInstructorsCard = ({
  instructors,
}: {
  instructors: AcademyInstructor[];
}) => {
  return (
    <div className="space-y-2">
      {instructors.map((instructor) => (
        <InstructorsCard
          key={instructor.id}
          name={instructor.name}
          photo={instructor.photoUrl || ""}
          studentCount={0}
          rating={0}
          courseCount={0}
          reviewCount={0}
          description={instructor.biography}
        />
      ))}
    </div>
  );
};

export default InstructorTab;
