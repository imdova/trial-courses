"use client";
import { useState } from "react";
import ProfileImage from "@/components/UI/ProfileImage";
import { Verified } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/UI/Avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/UI/Tooltip";
import { Academy } from "@/types/academy";

const AcademyHeader: React.FC<{ academy: Academy }> = ({ academy }) => {
  const [image, setImage] = useState<string | null>(null);

  const updateImage = async (file: File) => {
    setImage(URL.createObjectURL(file));
  };

  if (!academy) return null; // safety check

  return (
    <div className="rounded-base bg-[url('/images/jobs-background.jpg')] bg-cover bg-center">
      <div className="from-secondary/70 to-primary/80 shadow-soft relative rounded-lg bg-gradient-to-b">
        <div className="flex h-fit min-h-[180px] w-full flex-col items-center gap-12 p-5 lg:flex-row">
          <ProfileImage
            currentImageUrl={image ? image : academy.image || ""}
            alt={`${academy.name} academy image`}
            size="xLarge"
            onImageUpdate={updateImage}
          />
          <div className="space-y-2">
            <h5 className="flex items-center text-xl font-bold text-white">
              {academy.name}
              <Verified className="ml-2 inline-block h-5 w-5 fill-blue-500 stroke-blue-500 [&>path:nth-child(2)]:stroke-white" />
            </h5>
            <div className="text-primary-foreground">
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-sm font-medium">{academy.keyWords?.[0]}</p>
                <span className="text-sm">|</span>
                <p className="text-sm font-medium">{academy.type}</p>
                <span className="text-sm">|</span>
                <p className="text-sm font-medium">
                  Founded {academy.foundedYear}
                </p>
                <span className="text-sm">|</span>
                <p className="text-sm font-medium">
                  {academy.studentsCount} Students
                </p>
              </div>

              <address className="text-sm font-medium">
                {academy.city?.name}, {academy.country?.name} —{" "}
                {academy.address}
              </address>
            </div>
            <div className="flex -space-x-1">
              {academy.instructors?.map((instructor, idx) => (
                <Tooltip key={idx}>
                  <TooltipTrigger>
                    <Avatar className="size-6 transition-all hover:z-10 hover:scale-150">
                      <AvatarImage src={instructor.photoUrl} />
                      <AvatarFallback>{instructor.name}</AvatarFallback>
                    </Avatar>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{instructor.name}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcademyHeader;
