"use client";

import Image from "next/image";
import { Add } from "@mui/icons-material";
import EducationModal from "./Modals/education-modal";
import EducationItem from "./EducationItem";
import OpenModalButton from "@/components/FormModal/buttons/openModalButton";
import ClampedList from "@/components/UI/ClampedList";

interface EducationsSectionProps {
  user: UserProfile;
  isMe: boolean;
}
const INITIAL_VISIBLE_ITEMS = 2;

const EducationsSection = ({ user, isMe }: EducationsSectionProps) => {
  const educations: EducationItemData[] = [];

  return (
    <div className="mt-5 rounded-base border border-gray-200 bg-white p-3 shadow-soft md:p-5">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-xl font-semibold text-main">Educations</h3>
        {isMe && (
          <OpenModalButton
            componentProps={{
              seekerId: user.id,
            }}
            ModalComponent={EducationModal}
            className="rounded border border-solid border-gray-200 p-2"
            title="Add Education"
          >
            <Add />
          </OpenModalButton>
        )}
      </div>
      {educations.length > 0 ? (
        <ClampedList
          className="mt-2 grid grid-cols-1 gap-2"
          Component={EducationItem}
          componentProps={{ isMe }}
          data={educations}
          type="Education"
          initialVisibleItems={INITIAL_VISIBLE_ITEMS}
        />
      ) : isMe ? (
        <EducationEmptyCard user={user} isMe={isMe} />
      ) : null}
    </div>
  );
};

export default EducationsSection;

const EducationEmptyCard: React.FC<EducationsSectionProps> = ({ user }) => {
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
          seekerId: user.id,
        }}
        ModalComponent={EducationModal}
      >
        Add Education
      </OpenModalButton>
    </div>
  );
};
