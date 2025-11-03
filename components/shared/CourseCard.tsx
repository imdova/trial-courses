"use client";
import Image from "next/image";
import { BookOpen, Earth, Star, Video } from "lucide-react";
import Link from "next/link";
import { CourseItem } from "@/types/courses";
import { Avatar, AvatarFallback, AvatarImage } from "../UI/Avatar";

interface CourseCardProps {
  course: CourseItem;
  isEnrolled?: boolean;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const {
    id,
    courseImage,
    name,
    rating,
    instructor,
    numberOfLectures,
    pricings,
    type,
  } = course;
  return (
    <>
      {/* Course Card */}
      <div className="relative rounded-lg border p-4 shadow-sm">
        <Link href={`courses/${id}`}>
          {type.toLowerCase() === "live" && (
            <span className="absolute top-7 left-7 flex items-center gap-3 rounded-full bg-[#ffffffb9] px-3 py-2">
              <Earth size={18} />
              <span className="text-xs font-semibold">Live</span>
            </span>
          )}
          {type.toLowerCase() === "offline" && (
            <span className="absolute top-7 left-7 flex items-center gap-3 rounded-full bg-[#ffffffb9] px-3 py-2">
              <Video size={18} />
              <span className="text-xs font-semibold">Offline</span>
            </span>
          )}
          {type.toLowerCase() === "recorded" && (
            <span className="absolute top-7 left-7 flex items-center gap-3 rounded-full bg-[#ffffffb9] px-3 py-2">
              <Video size={18} />
              <span className="text-xs font-semibold">Recorded</span>
            </span>
          )}
          <div className="mb-3 h-40 w-full overflow-hidden rounded-md">
            <Image
              className="h-full w-full object-cover"
              src={courseImage}
              alt="Course Thumbnail"
              width={400}
              height={400}
            />
          </div>
          <div className="flex w-full items-center justify-between">
            <h1 className="mb-3 font-semibold">{name}</h1>
            <span className="text-primary flex items-center gap-1 font-semibold">
              ${pricings?.[0]?.regularPrice}
            </span>
          </div>
          <div className="mb-4 flex items-center gap-2">
            <Avatar>
              <AvatarImage
                src={instructor?.photoUrl || undefined}
                alt={instructor?.fullName || ""}
              />
              <AvatarFallback>{instructor?.fullName?.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="text-xs">{instructor?.fullName}</span>
            <div className="flex items-center gap-1">
              <span className="text-muted-foreground text-[10px]">
                {rating?.toFixed(1)}
              </span>
              <Star size={12} className="text-orange-400" />
            </div>
          </div>
          <div className="mb-3">
            <div className="flex gap-2">
              <BookOpen className="text-primary" size={18} />
              <span className="text-primary text-sm">
                {numberOfLectures} Lessons
              </span>
            </div>
          </div>
        </Link>
        <div className="mb-3 flex w-full justify-between">
          {/* <div className="flex gap-2">
            <Clock className="text-muted-foreground" size={18} />
            <span className="text-muted-foreground text-sm">{time}</span>
          </div> */}
          <Link
            className="hover:text-primary link-smooth text-sm hover:underline"
            href={`courses/${id}`}
          >
            Veiw Details
          </Link>
        </div>
      </div>
    </>
  );
};

export default CourseCard;
