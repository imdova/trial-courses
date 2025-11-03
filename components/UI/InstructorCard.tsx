import Button from "@/components/UI/Buttons/Button";
import { InstructorType } from "@/types/courses";
import { Award, Ellipsis, FileBadge, Star } from "lucide-react";
import Image from "next/image";

const InstructorCard: React.FC<InstructorType> = ({
  name,
  image,
  rating,
  coursesType,
  achievement,
  certificate,
}) => {
  return (
    <div className="box-content relative">
      <button className="absolute top-2 right-2 text-muted-foreground">
        <Ellipsis size={18} />
      </button>
      <div className="flex justify-center mb-4">
        <Image
          className="w-28 h-28 rounded-2xl object-cover"
          src={image}
          width={200}
          height={200}
          alt="blog image"
        />
      </div>
      <h2 className="w-full text-center font-semibold mb-4">{name}</h2>
      <div className="flex gap-3 justify-center items-center mb-3">
        <span className="flex items-center gap-2 border-r pr-3 text-sm">
          {rating.toFixed(1)} <Star size={14} className="text-orange-400" />
        </span>
        <span className="text-muted-foreground text-sm">Review (1K)</span>
      </div>
      <div className="flex justify-center  gap-3 mb-4">
        {coursesType.map((course, index) => {
          return (
            <span key={index} className="bg-gray-100 p-2 rounded-md text-sm">
              {course}
            </span>
          );
        })}
      </div>
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex flex-col items-center justify-center w-full bg-gray-100 p-3">
          <span className="flex gap-2 items-center mb-1">
            <Award size={18} className="text-orange-300" />
            <span className="text-muted-foreground text-sm ">Achievement</span>
          </span>
          <h2 className="text-xl font-semibold">{achievement}</h2>
        </div>
        <div className="flex flex-col items-center justify-center w-full bg-gray-100 p-3">
          <span className="flex gap-2 items-center mb-1">
            <FileBadge size={18} className="text-orange-300" />
            <span className="text-muted-foreground text-sm ">Certificate</span>
          </span>
          <h2 className="text-xl font-semibold">{certificate}</h2>
        </div>
      </div>
      <Button className="w-full mt-4" variant="contained" color="success">
        View Class
      </Button>
    </div>
  );
};
export default InstructorCard;
