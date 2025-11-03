"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/UI/Tabs";
import { courseData } from "@/constants/VideosData.data";
import OverviewCoursesPage from "./panels/OverviewCourses";
import CoursesList from "./panels/CoursesList";
import { Card } from "@/components/UI/card";

export default function CoursesPage() {
  return (
    <Tabs defaultValue="Courses List" className="w-full space-y-3 px-4">
      <Card className="flex w-full items-center justify-between gap-3 space-y-0 p-0">
        <TabsList>
          <TabsTrigger value="Courses List">Courses List</TabsTrigger>
          <TabsTrigger value="Courses Overview">Courses Overview</TabsTrigger>
        </TabsList>
      </Card>
      <TabsContent value="Courses Overview">
        <OverviewCoursesPage />
      </TabsContent>
      <TabsContent value="Courses List">
        <CoursesList courses={courseData} />
      </TabsContent>
    </Tabs>
  );
}
