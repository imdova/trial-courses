"use client";
import Image from "next/image";
import { Edit } from "@mui/icons-material";
import education from "@/components/icons/education.png";
import { formatDate } from "@/util";
import OpenModalButton from "@/components/FormModal/buttons/openModalButton";
import ActivityModal from "./modals/activity-modal";

type ActivityData = {
  id: string;
  title: string;
  provider: string;
  date: string;
};

const ActivityItem: React.FC<{ item: ActivityData }> = ({
  item,
}) => {
  return (
    <div className="flex items-start gap-3 rounded-base border p-2">
      <Image
        src={education}
        alt="Experience"
        width={70}
        height={70}
        className=""
      />
      <div className="flex-1">
        <h6 className="text-lg font-semibold text-main">{item.title}</h6>
        <p className="text-sm text-muted-foreground">{item.provider}</p>
        <p className="text-sm text-muted-foreground">{formatDate(item.date)}</p>
      </div>

      <OpenModalButton
        ModalComponent={ActivityModal}
        componentProps={{
          initialValues: item,
        }}
        size="small"
        // className="rounded border border-solid border-gray-200 p-2"
        title="Edit Activity"
      >
        <Edit className="w-5" />
      </OpenModalButton>
    </div>
  );
};

export default ActivityItem;
