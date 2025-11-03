import { FileVideo, SquareChartGantt, Star, UsersRound } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/UI/Avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/UI/card";
import { useProfile } from "@/hooks/useProfile";
import { useEffect } from "react";
import { useSession } from "next-auth/react";

const InstructorsTab = () => {
  const { data: session } = useSession();
  const user = session?.user;
  const { getProfile, profile: instructor } = useProfile();

  useEffect(() => {
    const targetUserId = user?.id;

    if (targetUserId) {
      getProfile(targetUserId);
    }
  }, [getProfile, user?.id]);

  if (!instructor) {
    return <div>Loading...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {instructor.firstName + " " + instructor.lastName}
        </CardTitle>
        <CardDescription>{"TODO: title here"}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-5">
          <Avatar className="size-24">
            <AvatarImage src={instructor.photoUrl || undefined} />
            <AvatarFallback>
              {instructor.firstName?.charAt(0).toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>
          <ul>
            <li className="mb-2 flex items-center gap-2 font-semibold">
              <Star size={16} />
              <span className="text-sm">{0} Instructor Rating</span>
            </li>
            <li className="mb-2 flex items-center gap-2 font-semibold">
              <SquareChartGantt size={16} />
              <span className="text-sm">{12} Reviews</span>
            </li>
            <li className="mb-2 flex items-center gap-2 font-semibold">
              <UsersRound size={16} />
              <span className="text-sm">{23} Students</span>
            </li>
            <li className="mb-2 flex items-center gap-2 font-semibold">
              <FileVideo size={16} />
              <span className="text-sm">{40} Course</span>
            </li>
          </ul>
        </div>
        <p className="text-muted-foreground text-sm">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </CardContent>
    </Card>
  );
};
export default InstructorsTab;
