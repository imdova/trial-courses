"use client";
import Image from "next/image";
import { Edit } from "@mui/icons-material";
import CourseModal from "./Modals/course-modal";
import OpenModalButton from "@/components/FormModal/buttons/openModalButton";
import { CourseType } from "@/types/courses";

const CourseItem: React.FC<{ item: CourseType; isMe: boolean }> = ({
  item,
  isMe,
}) => {
  return (
    <div className="flex items-start gap-3 rounded-base border p-2">
      <Image
        src={"/images/certificate.svg"}
        alt="Experience"
        width={60}
        height={60}
        className="rounded-full"
      />
      <div className="flex-1">
        <h6 className="text-lg font-semibold text-main">{item.title}</h6>
        <p className="text-sm text-muted-foreground">{item.description} </p>
        {item.description && (
          <p className="mt-2 text-sm text-muted-foreground">
            {" "}
            <strong className="text-sm text-main">Description:- </strong>{" "}
            {item.description}
          </p>
        )}
      </div>
      {isMe && (
        <OpenModalButton
          ModalComponent={CourseModal}
          componentProps={{
            initialValues: item,
          }}
          size="small"
          // className="rounded border border-solid border-gray-200 p-2"
          title="Edit Course"
        >
          <Edit className="w-5" />
        </OpenModalButton>
      )}
    </div>
  );
};

export default CourseItem;
