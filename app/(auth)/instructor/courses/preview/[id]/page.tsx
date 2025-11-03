"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/UI/Tabs";
import { Card } from "@/components/UI/card";
import { ScrollArea, ScrollBar } from "@/components/UI/scroll-area";
import YouTubePlayer from "@/components/UI/youtube-video-player";
import { use, useEffect } from "react";
import { useInstructorCourse } from "@/hooks/useInstructorCourse";
import CourseOverviewTab from "../../components/CourseOverviewTab";
import InstructorsTab from "../../components/InstructorsTab";
import ReviewTab from "@/app/(public)/courses/components/ReviewTab";
import CourseSidebar from "@/app/(public)/courses/[slug]/course_sidebar";

const CoursePreview = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  const { getPreviewedCourse, previewCourse } = useInstructorCourse();

  useEffect(() => {
    if (id && previewCourse?.id !== id) {
      getPreviewedCourse(id);
    }
  }, [getPreviewedCourse, previewCourse, id]);

  if (!previewCourse) {
    return <div>Loading...</div>;
  }
  const course = previewCourse;

  return (
    <main className="container mx-auto space-y-8 px-5 lg:max-w-[1170px]">
      <h1 className="text-center text-2xl font-bold md:text-start md:text-3xl">
        {course.name}
      </h1>
      <div className="my-8 flex flex-col gap-4 md:flex-row">
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
                <InstructorsTab />
              </TabsContent>
              <TabsContent value="Reviews">
                <ReviewTab course={course} />
              </TabsContent>
              <TabsContent value="Certification">certification</TabsContent>
            </Tabs>
          </div>
        </div>
        <CourseSidebar course={course} />
      </div>
    </main>
  );
};

export default CoursePreview;
