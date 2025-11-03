"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/UI/Tabs";
import { Card, CardAction, CardHeader, CardTitle } from "@/components/UI/card";
import { useAcademy } from "@/hooks/useAcademy";
import { useEffect } from "react";
import Loading from "@/components/loading/loading";
import { notFound } from "next/navigation";
import AcademyInfoForm from "../AcademyInfoForm";
import AcademyPrivateHeaderCard from "./Header";
import { useInstructorCourse } from "@/hooks/useInstructorCourse";
import AboutAcademy from "./AboutAcademy";
import CardCourse from "../CardCourse";
import SocialMediaCard from "./SocialMediaCard";
import { Button } from "@/components/UI/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import PrivateContactInfoCard from "./ContactInfoCard";
import AcademyPublicUrlCard from "./AcademyPublicUrl";
import AcademyCompetenceCard from "./AcademyComplete";

const AcademyPrivateProfile = () => {
  const { academy, getAcademy, status } = useAcademy();
  const { courses, getCourses } = useInstructorCourse();

  useEffect(() => {
    getAcademy();
    getCourses();
  }, [getAcademy, getCourses]);

  if (status === "fetching" || status === "idle") {
    return <Loading className="h-[60vh]" />;
  }

  if (!academy) {
    return notFound();
  }

  return (
    <div className="w-full">
      <div className="flex gap-2">
        {/* Left + Center Sections */}
        <div className="flex-1 space-y-2">
          {/* Header Section */}
          <AcademyPrivateHeaderCard academy={academy} />
          {/* About Section */}
          <Tabs defaultValue="academy-info">
            <Card className="p-0">
              <TabsList>
                <TabsTrigger value="academy-info">Information</TabsTrigger>
                <TabsTrigger value="courses">Courses</TabsTrigger>
              </TabsList>
            </Card>

            <TabsContent value="academy-info">
              <AcademyInfoForm />
            </TabsContent>
            <TabsContent value="courses">
              <div className="space-y-2">
                <AboutAcademy about={academy.about || ""} />

                <Card>
                  <CardHeader className="flex items-center justify-between">
                    <CardTitle>Academy Courses</CardTitle>
                    <CardAction>
                      <Button asChild size="icon" variant="outline">
                        <Link href="/lms/course/add">
                          <Plus className="text-muted-foreground" />
                        </Link>
                      </Button>
                    </CardAction>
                  </CardHeader>
                </Card>

                <div className="grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-3">
                  {courses.map((course) => (
                    <CardCourse
                      key={course.id}
                      course={course}
                      isOwner={true}
                    />
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        {/* Right Sections */}
        <div className="hidden max-w-80 min-w-80 space-y-2 md:block">
          <AcademyCompetenceCard
            percentage={academy.completionPercentage || 0}
          />
          <PrivateContactInfoCard
            email={academy.contactEmail}
            phone={academy.phone}
          />
          <AcademyPublicUrlCard slug={academy.slug} />
          <SocialMediaCard academy={academy} />
        </div>
      </div>
    </div>
  );
};

export default AcademyPrivateProfile;
