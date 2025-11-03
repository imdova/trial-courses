"use client";

import Image from "next/image";
import { Edit, LocationOnOutlined } from "@mui/icons-material";
import education from "@/components/icons/education.png";
import EducationModal from "./Modals/education-modal";
import { formatLocation } from "@/util/general";
import OpenModalButton from "@/components/FormModal/buttons/openModalButton";

export const educationOptions = [
  { id: "high_school", label: "High School" },
  { id: "associate", label: "Associate Degree" },
  { id: "bachelor", label: "Bachelor's Degree" },
  { id: "master", label: "Master's Degree" },
  { id: "phd", label: "Ph.D." },
  { id: "diploma", label: "Diploma" },
  { id: "certificate", label: "Certificate" },
  { id: "other", label: "Other" },
];

const EducationItem: React.FC<{ item: EducationItemData; isMe: boolean }> = ({
  item,
  isMe,
}) => {
  const duration =
    item.endYear && item.startYear ? item.endYear - item.startYear : 0;

  const location = item.location ? formatLocation(item.location) : "";

  const degree =
    educationOptions.find((x) => x.id === item.degree)?.label || "";

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
        <h6 className="text-lg font-semibold text-main">{item.inistitute}</h6>
        <p className="text-sm text-muted-foreground">
          {degree}
          {item.program ? ` in ${item.program}` : ""}
          {item.grade ? ` - ${item.grade}` : ""}
        </p>
        <p className="text-sm text-muted-foreground">
          {item.startYear}
          {item.endYear ? ` - ${item.endYear}` : ""}
          {duration > 0 ? ` (${duration} y)` : ""}
        </p>
        {location && (
          <div className="flex text-sm text-muted-foreground">
            <LocationOnOutlined className="-ml-1 text-base" />
            <p className="text-sm text-muted-foreground">{location}</p>
          </div>
        )}
      </div>
      {isMe && (
        <OpenModalButton
          ModalComponent={EducationModal}
          componentProps={{
            initialValues: item,
          }}
          size="small"
          title="Edit Education"
        >
          <Edit className="w-5" />
        </OpenModalButton>
      )}
    </div>
  );
};

export default EducationItem;
