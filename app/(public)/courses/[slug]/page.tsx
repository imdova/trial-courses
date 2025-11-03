import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/UI/Tabs";
import { Card } from "@/components/UI/card";
import { ScrollArea, ScrollBar } from "@/components/UI/scroll-area";
import CourseSidebar from "./course_sidebar";
import { getCourseBySlug } from "@/lib/actions/courses.actions";
import { notFound } from "next/navigation";
import YouTubePlayer from "@/components/UI/youtube-video-player";
import CourseOverviewTab from "../components/CourseOverviewTab";
import CoursesSlide from "@/components/UI/CoursesSlide";
import { courseData } from "@/constants/VideosData.data";
import ReviewTab from "../components/ReviewTab";
import InstructorTab from "../components/InstructorTab";
import { Badge } from "@/components/UI/badge";
import {
  Blocks,
  Book,
  Calendar,
  Earth,
  Star,
  Video,
} from "lucide-react";
import { formatDate } from "@/util";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/UI/Avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/UI/Tooltip";
import CertificationCard from "../components/CertificationCard";

const getBadgeIcon = (type: string): React.ReactNode => {
  switch (type) {
    case "live":
      return <Earth />;
    case "offline":
      return <Video />;
    case "recorded":
      return <Video />;
    default:
      return "";
  }
};

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const data = await getCourseBySlug(slug);

  if (!data.data || !data.success) {
    return notFound();
  }
  const course = data?.data;
  const hasMoreThanOneInstructor = course.academyInstructors.length > 1;

  return (
    <main className="container mx-auto space-y-2 px-5 lg:max-w-[1170px]">
      <h1 className="text-center text-2xl font-bold md:text-start md:text-3xl">
        {course.name}
      </h1>
      <div className="flex items-center gap-2">
        <Badge variant="ghost" size="lg">
          <Calendar className="text-primary" />
          {formatDate(course.created_at)}
        </Badge>
        <div className="mb-1 flex items-center gap-2">
          {!hasMoreThanOneInstructor ? (
            course.academy?.id ? (
              <>
                <Avatar className="size-9">
                  <AvatarImage
                    src={course.academyInstructors?.[0]?.photoUrl || ""}
                  />
                  <AvatarFallback>
                    {course.academyInstructors?.[0]?.name?.charAt(0) || ""}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="truncate text-xs">
                    {course.academyInstructors?.[0]?.name || ""}
                  </p>
                </div>
              </>
            ) : (
              <>
                <Avatar className="size-9">
                  <AvatarImage src={course.instructor?.photoUrl || ""} />
                  <AvatarFallback>
                    {course.instructor?.fullName?.charAt(0) || ""}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="truncate text-xs">
                    {course.instructor?.fullName || ""}
                  </p>
                </div>
              </>
            )
          ) : (
            <div className="flex -space-x-2">
              {course.academyInstructors.map((instructor, idx) => (
                <Tooltip key={idx}>
                  <TooltipTrigger>
                    <Avatar className="ring-background size-8 ring-2 transition-all hover:z-10 hover:scale-150">
                      <AvatarImage src={instructor.photoUrl} />
                      <AvatarFallback className="text-muted-foreground text-xs">
                        {instructor.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{instructor.name}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          )}
        </div>

        <Badge variant="ghost" size="lg">
          <Blocks className="text-violet-600" />
          {course.category?.name}
        </Badge>
        {course.subCategory?.name && (
          <Badge variant="ghost" size="lg">
            <Book className="text-amber-400" />
            {course.subCategory?.name}
          </Badge>
        )}
        <Badge variant="success" size="lg">
          {getBadgeIcon(course.type)}
          <span className="font-semibold">{course.type}</span>
        </Badge>
        <div className="text-muted-foreground flex items-center gap-2 text-sm">
          <Star className="size-4 text-orange-300" />
          <span>({course.averageRating} Reviews)</span>
        </div>
      </div>
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="flex-1 space-y-4">
          <YouTubePlayer
            videoUrl={course.previewVideo}
            autoPlay
            priority
            className="aspect-video h-auto w-full"
          />
          <div>
            <Tabs defaultValue="Overview">
              <Card className="p-0">
                <ScrollArea className="grid max-w-full p-0">
                  <TabsList>
                    <TabsTrigger value="Overview">Overview</TabsTrigger>
                    <TabsTrigger value="Instructors">Instructors</TabsTrigger>
                    <TabsTrigger value="Reviews">Reviews</TabsTrigger>
                    <TabsTrigger value="Certification">
                      Certification
                    </TabsTrigger>
                  </TabsList>
                  <ScrollBar orientation="horizontal" />
                </ScrollArea>
              </Card>

              <TabsContent value="Overview">
                <CourseOverviewTab course={course} />
              </TabsContent>
              <TabsContent value="Instructors">
                <InstructorTab course={course} />
              </TabsContent>
              <TabsContent value="Reviews">
                <ReviewTab course={course} />
              </TabsContent>
              <TabsContent value="Certification">
                <CertificationCard />
              </TabsContent>
            </Tabs>
          </div>
        </div>
        <CourseSidebar course={course} />
      </div>
      <CoursesSlide courses={courseData} />
    </main>
  );
};

export default page;
