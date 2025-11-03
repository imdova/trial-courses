import Image from "next/image";
import { FileVideo, SquareChartGantt, Star, UsersRound } from "lucide-react";
import { instructor } from "@/types/courses";

const InstructorsSlice: React.FC<instructor> = ({
  name,
  job,
  rating,
  reviews,
  students,
  courses,
  image,
  description,
}) => {
  return (
    <div className="">
      <div className="mb-4">
        <h2 className="text-2xl font-semibold">{name}</h2>
        <span className="text-muted-foreground">{job}</span>
      </div>
      <div className="flex gap-5 mb-5">
        <div>
          <Image
            className="w-24 h-24 object-cover rounded-full"
            src={image}
            alt="Avater"
            width={500}
            height={500}
          />
        </div>
        <ul>
          <li className="flex items-center gap-2 font-semibold mb-2">
            <Star size={16} />
            <span className="text-sm">{rating} Instructor Rating</span>
          </li>
          <li className="flex items-center gap-2 font-semibold mb-2">
            <SquareChartGantt size={16} />
            <span className="text-sm">{reviews} Reviews</span>
          </li>
          <li className="flex items-center gap-2 font-semibold mb-2">
            <UsersRound size={16} />
            <span className="text-sm">{students} Students</span>
          </li>
          <li className="flex items-center gap-2 font-semibold mb-2">
            <FileVideo size={16} />
            <span className="text-sm">{courses} Course</span>
          </li>
        </ul>
      </div>
      <p className="text-muted-foreground mb-3">{description}</p>
    </div>
  );
};
export default InstructorsSlice;
