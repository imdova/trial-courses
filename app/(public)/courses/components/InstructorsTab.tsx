import { FileVideo, SquareChartGantt, Star, UsersRound } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/UI/Avatar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/UI/card";

const InstructorsCard = ({
  name,
  photo,
  studentCount,
  rating,
  reviewCount,
  courseCount,
  description,
}: {
  name: string;
  photo: string;
  studentCount: number;
  rating: number;
  reviewCount: number;
  courseCount: number;
  description?: string;
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-5">
          <Avatar className="size-24">
            <AvatarImage src={photo || undefined} />
            <AvatarFallback>
              {name.charAt(0).toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>
          <ul>
            <li className="mb-2 flex items-center gap-2 font-semibold">
              <Star size={16} />
              <span className="text-sm">{rating} Instructor Rating</span>
            </li>
            <li className="mb-2 flex items-center gap-2 font-semibold">
              <SquareChartGantt size={16} />
              <span className="text-sm">{reviewCount} Reviews</span>
            </li>
            <li className="mb-2 flex items-center gap-2 font-semibold">
              <UsersRound size={16} />
              <span className="text-sm">{studentCount} Students</span>
            </li>
            <li className="mb-2 flex items-center gap-2 font-semibold">
              <FileVideo size={16} />
              <span className="text-sm">{courseCount} Course</span>
            </li>
          </ul>
        </div>
        {description && (
          <div className="text-muted-foreground line-clamp-2 text-sm">
            <div
              className="prose text-wrap"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};
export default InstructorsCard;
