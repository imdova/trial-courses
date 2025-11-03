"use client";

import Image from "next/image";
import { Add } from "@mui/icons-material";
import CourseModal from "./Modals/course-modal";
import CourseItem from "./CourseItem";
import OpenModalButton from "@/components/FormModal/buttons/openModalButton";
import ClampedList from "@/components/UI/ClampedList";
import { CourseType } from "@/types/courses";

interface CoursesSectionProps {
  user: UserProfile;
  isMe: boolean;
}
const INITIAL_VISIBLE_ITEMS = 2;
const CoursesSection = ({ user, isMe }: CoursesSectionProps) => {
  const courses: CourseType[] = [];

  return (
    <div className="mt-5 rounded-base border border-gray-200 bg-white p-3 shadow-soft md:p-5">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-xl font-semibold text-main">
          Courses and Certificates
        </h3>
        {isMe && (
          <OpenModalButton
            componentProps={{
              seekerId: user.id,
            }}
            ModalComponent={CourseModal}
            className="rounded border border-solid border-gray-200 p-2"
            title="Add Course"
          >
            <Add />
          </OpenModalButton>
        )}
      </div>
      {courses.length > 0 ? (
        <ClampedList
          className="mt-2 grid grid-cols-1 gap-2"
          Component={CourseItem}
          componentProps={{ isMe }}
          data={courses}
          type="Course"
          initialVisibleItems={INITIAL_VISIBLE_ITEMS}
        />
      ) : isMe ? (
        <CourseEmptyCard user={user} isMe={isMe} />
      ) : null}
    </div>
  );
};

export default CoursesSection;

const CourseEmptyCard: React.FC<CoursesSectionProps> = ({ user }) => {
  return (
    <div className="flex w-full flex-col items-center justify-center text-center">
      {/* Image */}
      <Image
        src={"/images/activities.png"}
        alt={"Add Experience"}
        width={180}
        height={180}
      />
      {/* Description */}
      <p className="mb-2 text-muted-foreground">Your Courses will appear here.</p>
      <OpenModalButton
        variant="contained"
        btnVariant="button"
        componentProps={{
          seekerId: user.id,
        }}
        ModalComponent={CourseModal}
      >
        Add Course
      </OpenModalButton>
    </div>
  );
};
