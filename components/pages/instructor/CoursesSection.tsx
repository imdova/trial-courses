import Image from "next/image";
import { Add } from "@mui/icons-material";
import CourseModal from "./modals/course-modal";
import CourseItem from "./CourseItem";
import OpenModalButton from "@/components/FormModal/buttons/openModalButton";
import ClampedList from "@/components/UI/ClampedList";
import { CourseType } from "@/types/courses";
import { useEffect, useMemo } from "react";
import { useSession } from "next-auth/react";
import { useProfile } from "@/hooks/useProfile";

interface CoursesSectionProps {
  seekerId?: string;
}
const INITIAL_VISIBLE_ITEMS = 2;
const CoursesSection = () => {
  const { data: session } = useSession();
  const { profile, getProfile } = useProfile();
  const seekerId = session?.user?.id as string | undefined;

  useEffect(() => {
    if (seekerId && !profile) {
      getProfile(seekerId);
    }
  }, [seekerId, profile, getProfile]);

  type ApiCourse = {
    courseTitle?: string;
    courseDescription?: string;
    certificateUrl?: string;
    issuedBy?: string;
    issueDate?: string;
  };

  const courses: CourseType[] = useMemo(() => {
    if (!profile?.metadata) return [];
    try {
      const metadata = typeof profile.metadata === "string" ? JSON.parse(profile.metadata) : profile.metadata;
      const list = Array.isArray(metadata?.courses) ? (metadata.courses as ApiCourse[]) : [];
      return list.map((c: ApiCourse, idx: number): CourseType => ({
        id: String(idx),
        title: c?.courseTitle || "",
        description: c?.courseDescription || "",
        certificateUrl: c?.certificateUrl,
        issuedBy: c?.issuedBy,
        issueDate: c?.issueDate,
      } as unknown as CourseType));
    } catch {
      return [];
    }
  }, [profile]);

  return (
    <div className="mt-5 rounded-base border border-gray-200 bg-white p-3 shadow-soft md:p-5">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-xl font-semibold text-main">
          Courses and Certificates
        </h3>
        <OpenModalButton
          componentProps={{
            seekerId: seekerId,
          }}
          ModalComponent={CourseModal}
          className="rounded border border-solid border-gray-200 p-2"
          title="Add Course"
        >
          <Add />
        </OpenModalButton>

      </div>
      {courses.length > 0 ? (
        <ClampedList
          className="mt-2 grid grid-cols-1 gap-2"
          Component={CourseItem}
          componentProps={{}}
          data={courses}
          type="Course"
          initialVisibleItems={INITIAL_VISIBLE_ITEMS}
        />
      ) : (
        <CourseEmptyCard seekerId={seekerId} />
      )}
    </div>
  );
};

export default CoursesSection;

const CourseEmptyCard: React.FC<CoursesSectionProps> = ({ seekerId }) => {
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
          seekerId,
        }}
        ModalComponent={CourseModal}
      >
        Add Course
      </OpenModalButton>
    </div>
  );
};
