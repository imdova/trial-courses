"use client";
import Image from "next/image";
import { BookOpen, Clock, Earth, Star, Video } from "lucide-react";
import Link from "next/link";

type Instructor = {
  image: string;
  name: string;
};

type CardProps = {
  id: string;
  image: string;
  title: string;
  rating: number;
  instructor: Instructor;
  lessons: number;
  time: string;
  students: number;
  price: number;
  description: string;
  type: string;
};

const VideoCard: React.FC<CardProps> = ({
  id,
  image,
  title,
  rating,
  instructor,
  lessons,
  time,

  price,
  type,
}) => {
  return (
    <>
      {/* Course Card */}
      <div className="shadow-sm relative p-4 border rounded-lg">
        <Link href={`courses/${id}`}>
          {type.toLowerCase() === "live" && (
            <span className="absolute top-7 left-7 flex items-center gap-3 px-3 py-2 rounded-full bg-[#ffffffb9]">
              <Earth size={18} />
              <span className="text-xs font-semibold">Live</span>
            </span>
          )}
          {type.toLowerCase() === "offline" && (
            <span className="absolute top-7 left-7 flex items-center gap-3 px-3 py-2 rounded-full bg-[#ffffffb9]">
              <Video size={18} />
              <span className="text-xs font-semibold">Offline</span>
            </span>
          )}
          {type.toLowerCase() === "recorded" && (
            <span className="absolute top-7 left-7 flex items-center gap-3 px-3 py-2 rounded-full bg-[#ffffffb9]">
              <Video size={18} />
              <span className="text-xs font-semibold">Recorded</span>
            </span>
          )}
          <div className="w-full overflow-hidden rounded-md mb-3 h-40">
            <Image
              className="w-full h-full object-cover"
              src={image}
              alt="Course Thumbnail"
              width={400}
              height={400}
            />
          </div>
          <div className="flex justify-between items-center w-full ">
            <h1 className="mb-3 font-semibold">{title}</h1>
            <span className="flex items-center gap-1 font-semibold text-primary">
              ${price}
            </span>
          </div>
          <div className="flex items-center gap-2 mb-4">
            <Image
              className="w-9 h-9 rounded-full"
              width={90}
              height={90}
              src={instructor.image}
              alt="Instructor"
            />
            <span className="text-xs">{instructor.name}</span>
            <div className="flex items-center gap-1 ">
              <span className="text-[10px] text-muted-foreground">
                {rating.toFixed(1)}
              </span>
              <Star size={12} className="text-orange-400" />
            </div>
          </div>
          <div className="mb-3">
            <div className="flex gap-2">
              <BookOpen className="text-primary" size={18} />
              <span className="text-sm text-primary">{lessons} Lessons</span>
            </div>
          </div>
        </Link>
        <div className="flex justify-between w-full mb-3">
          <div className="flex gap-2">
            <Clock className="text-muted-foreground" size={18} />
            <span className="text-sm text-muted-foreground">{time}</span>
          </div>
          <Link
            className="text-sm hover:underline hover:text-primary link-smooth"
            href={`courses/${id}`}
          >
            Veiw Details
          </Link>
        </div>
      </div>
    </>
  );
};

export default VideoCard;
