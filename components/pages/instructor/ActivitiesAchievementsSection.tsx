import Image from "next/image";
import { Add } from "@mui/icons-material";
import ActivityItem from "./ActivityItem";
import OpenModalButton from "@/components/FormModal/buttons/openModalButton";
import ClampedList from "@/components/UI/ClampedList";
import ActivityModal from "./modals/activity-modal";
import { useEffect, useMemo } from "react";
import { useSession } from "next-auth/react";
import { useProfile } from "@/hooks/useProfile";

interface ActivitySectionProps {
  seekerId?: string;
}
const INITIAL_VISIBLE_ITEMS = 2;

interface Activity {
  id: string;
  title: string;
  provider: string;
  date: string;
}
const ActivitySection = () => {
  const { data: session } = useSession();
  const { profile, getProfile } = useProfile();
  const seekerId = session?.user?.id as string | undefined;

  useEffect(() => {
    if (seekerId && !profile) {
      getProfile(seekerId);
    }
  }, [seekerId, profile, getProfile]);

  type ApiActivity = {
    activityTitle?: string;
    organizationInstitution?: string;
    activityDate?: string;
  };

  const activities: Activity[] = useMemo(() => {
    if (!profile?.metadata) return [];
    try {
      const metadata = typeof profile.metadata === "string" ? JSON.parse(profile.metadata) : profile.metadata;
      const list = Array.isArray(metadata?.activities) ? (metadata.activities as ApiActivity[]) : [];
      return list.map((a: ApiActivity, idx: number): Activity => ({
        id: String(idx),
        title: a?.activityTitle || "",
        provider: a?.organizationInstitution || "",
        date: a?.activityDate || "",
      }));
    } catch {
      return [];
    }
  }, [profile]);

  return (
    <div className="mt-5 rounded-base border border-gray-200 bg-white p-3 shadow-soft md:p-5">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-xl font-semibold text-main">
          Activity & Achievements
        </h3>
        <OpenModalButton
          componentProps={{
            seekerId: seekerId,
          }}
          ModalComponent={ActivityModal}
          className="rounded border border-solid border-gray-200 p-2"
          title="Add Activity"
        >
          <Add />
        </OpenModalButton>
      </div>
      {activities.length > 0 ? (
        <ClampedList
          className="mt-2 grid grid-cols-1 gap-2"
          Component={ActivityItem}
          componentProps={{}}
          data={activities}
          type="Activity"
          initialVisibleItems={INITIAL_VISIBLE_ITEMS}
        />
      ) : (
        <ActivityEmptyCard seekerId={seekerId} />
      )}
    </div>
  );
};

export default ActivitySection;

const ActivityEmptyCard: React.FC<ActivitySectionProps> = ({ seekerId }) => {
  return (
    <div className="flex w-full flex-col items-center justify-center text-center">
      {/* Image */}
      <Image
        src={"/images/activities.png"}
        alt={"Add Activity"}
        width={180}
        height={180}
      />
      {/* Description */}
      <p className="mb-2 text-muted-foreground">Your Activity will appear here.</p>
      <OpenModalButton
        variant="contained"
        btnVariant="button"
        componentProps={{
          seekerId,
        }}
        ModalComponent={ActivityModal}
      >
        Add Activity
      </OpenModalButton>
    </div>
  );
};
