"use client";

import { Edit, LocationOnOutlined } from "@mui/icons-material";
import experiencesImage from "@/components/icons/briefcase.png";
import Image from "next/image";
import { formatLocation } from "@/util/general";
import { getDuration } from "@/util";
import OpenModalButton from "@/components/FormModal/buttons/openModalButton";
import { ExperienceItemData } from "@/types";
import ExperienceModal from "./modals/experience-modal";

export function formatDate(
  date: string | Date,
  options?: {
    year?: boolean;
    month?: boolean;
    day?: boolean;
    locale?: string;
  }
): string {
  if (!date) return "";

  const parsedDate = typeof date === "string" ? new Date(date) : date;

  const {
    year = true,
    month = true,
    day = true,
    locale = "en-US",
  } = options || {};

  const formatOptions: Intl.DateTimeFormatOptions = {
    ...(year && { year: "numeric" }),
    ...(month && { month: "short" }),
    ...(day && { day: "2-digit" }),
  };

  return parsedDate.toLocaleDateString(locale, formatOptions);
}

const ExperienceItem: React.FC<{
  item: ExperienceItemData;
  isMe: boolean;
  index: number;
  seekerId: string;
  title?: string | null;
  length: number;
}> = ({ item, isMe, index, title, seekerId, length }) => {
  const isLastItem = index === length - 1;
  const isOddLength = length % 2 !== 0;
  const spanTwoCols = isOddLength && isLastItem;

  const location = item?.location ? formatLocation(item.location) : "";
  const duration = getDuration({
    startDate: item.startDate,
    endDate: item.isPresent ? undefined : item.endDate,
  });

  return (
    <div
      className={`${
        spanTwoCols ? "col-span-2" : "col-span-1"
      } flex items-start gap-3 rounded-base border border-gray-200 p-2`}
    >
      <Image src={experiencesImage} alt="Experience" width={60} height={60} />
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h6 className="font-semibold leading-tight text-main">
            {item.company || "Unnamed Company"}
          </h6>
          {isMe && (
            <OpenModalButton
              ModalComponent={ExperienceModal}
              componentProps={{
                seekerId,
                seekerTitle: title,
                initialValues: item,
              }}
              size="small"
              title="Edit Experience"
            >
              <Edit className="w-5" />
            </OpenModalButton>
          )}
        </div>

        <p className="text-sm text-muted-foreground">
          {item.title || "Untitled Role"}
        </p>

        <p className="text-sm text-muted-foreground">
          {item.startDate
            ? formatDate(item.startDate, {
                year: true,
                month: true,
                day: false,
              })
            : "Unknown"}
          {" - "}
          {item.isPresent
            ? "Now"
            : item.endDate
            ? formatDate(item.endDate, {
                year: true,
                month: true,
                day: false,
              })
            : "Unknown"}{" "}
          {duration}
        </p>

        {location && (
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <LocationOnOutlined className="text-base" />
            <span>{location}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExperienceItem;
