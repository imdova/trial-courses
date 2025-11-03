import Image from "next/image";
import { Add } from "@mui/icons-material";
import EducationModal from "./modals/education-modal";
import EducationItem from "./EducationItem";
import OpenModalButton from "@/components/FormModal/buttons/openModalButton";
import ClampedList from "@/components/UI/ClampedList";
import { useEffect, useMemo } from "react";
import { useSession } from "next-auth/react";
import { useProfile } from "@/hooks/useProfile";

interface EducationsSectionProps {
  seekerId?: string;
  isMe?: boolean;
}
const INITIAL_VISIBLE_ITEMS = 2;

const EducationsSection = () => {
  const { data: session } = useSession();
  const { profile, getProfile } = useProfile();
  const seekerId = session?.user?.id as string | undefined;

  useEffect(() => {
    if (seekerId && !profile) {
      getProfile(seekerId);
    }
  }, [seekerId, profile, getProfile]);

  type ApiEducation = {
    institute?: string;
    programName?: string;
    degreeAwarded?: string;
    finalGrade?: string;
    yearOfAdmission?: number | string;
    yearOfGraduation?: number | string;
  };

  const educations: EducationItemData[] = useMemo(() => {
    if (!profile?.metadata) return [];
    try {
      const metadata = typeof profile.metadata === "string" ? JSON.parse(profile.metadata) : profile.metadata;
      const list = Array.isArray(metadata?.education) ? (metadata.education as ApiEducation[]) : [];
      return list.map((ed: ApiEducation, idx: number): EducationItemData => ({
        id: String(idx),
        inistitute: ed?.institute || "",
        degree: ed?.degreeAwarded || "",
        program: ed?.programName || "",
        grade: ed?.finalGrade || "",
        startYear: Number(ed?.yearOfAdmission) || 0,
        endYear: ed?.yearOfGraduation ? Number(ed?.yearOfGraduation) : undefined,
        location: undefined,
      }));
    } catch {
      return [];
    }
  }, [profile]);

  return (
    <div className="mt-5 rounded-base border border-gray-200 bg-white p-3 shadow-soft md:p-5">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-xl font-semibold text-main">Educations</h3>
          <OpenModalButton
            componentProps={{
              seekerId: seekerId,
            }}
            ModalComponent={EducationModal}
            className="rounded border border-solid border-gray-200 p-2"
            title="Add Education"
          >
            <Add />
          </OpenModalButton>
      </div>
      {educations.length > 0 ? (
        <ClampedList
          className="mt-2 grid grid-cols-1 gap-2"
          Component={EducationItem}
          componentProps={{}}
          data={educations}
          type="Education"
          initialVisibleItems={INITIAL_VISIBLE_ITEMS}
        />

      ) : (
        <EducationEmptyCard seekerId={seekerId} />
      )}

    </div>
  );
};

export default EducationsSection;

const EducationEmptyCard: React.FC<EducationsSectionProps> = ({ seekerId }) => {
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
      <p className="mb-2 text-muted-foreground">Your Educations will appear here.</p>
      <OpenModalButton
        variant="contained"
        btnVariant="button"
        componentProps={{
          seekerId,
        }}
        ModalComponent={EducationModal}
      >
        Add Education
      </OpenModalButton>
    </div>
  );
};
