import { Avatar, AvatarFallback, AvatarImage } from "@/components/UI/Avatar";
import { Instructor } from "@/types/courses";
import { Award, CirclePlay, GraduationCap, MapPin, Star } from "lucide-react";
import Link from "next/link";

const InstructorCard: React.FC<{ Instructor: Instructor }> = ({
  Instructor,
}) => {
  return (
    <div>
      <div className="flex h-full flex-col rounded-base border border-gray-300 p-4 shadow-soft">
        <div className="flex-1">
          {/* Header with Square Avatar */}
          <Link
            href={`/in/${Instructor.id}`}
            className="flex items-center gap-2"
          >
            <Avatar className="w-20 h-20">
              <AvatarImage src={Instructor.avatar} />
              <AvatarFallback className="text-xs bg-primary/10">
                {Instructor.name.slice(0, 2)}
              </AvatarFallback>
            </Avatar>

            <div>
              <h6 className="font-bold text-main">{Instructor.name}</h6>
              <p className="max-w-fit rounded-bas text-xs text-muted-foreground">
                {Instructor.info}
              </p>
            </div>
          </Link>

          {/* Details */}
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center gap-1">
              <MapPin size={15} className="text-muted-foreground" />
              <p className="text-sm text-muted-foreground">{Instructor.country}</p>
            </div>
            <div className="flex items-center gap-1">
              <Award size={15} className="text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                {Instructor.experience} Years Experience
              </p>
            </div>
            <p className="flex items-center gap-2 text-sm text-muted-foreground">
              <CirclePlay size={15} className="text-muted-foreground" />{" "}
              {Instructor.courses} Courses
            </p>
            <p className="flex items-center gap-2 text-sm text-muted-foreground">
              <GraduationCap size={15} className="text-muted-foreground" />{" "}
              {Instructor.students} Students
            </p>
            <p className="flex items-center gap-2 text-sm text-muted-foreground">
              <Star size={15} className="text-muted-foreground" /> {Instructor.reviews}{" "}
              Reviews
            </p>
          </div>

          {/* View Full Profile Link */}
          <div className="mt-2 text-right">
            <Link
              href={`/in/${Instructor.id}`}
              className="text-sm font-semibold text-primary underline hover:no-underline"
            >
              View full profile
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorCard;
