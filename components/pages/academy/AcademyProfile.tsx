"use client";
import ContactInfoSection from "@/components/pages/instructor/ContactInfoSection";
// import SocialMediaSection from "@/components/pages/instructor/SocialMediaSection";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/UI/Tabs";
import CompetenceCard from "@/components/pages/instructor/InstructorComplete";
import AcademyInfoForm from "./AcademyInfoForm";
import { Card } from "@/components/UI/card";
import AcademyHeaderCard from "./public/Header";
import { useAcademy } from "@/hooks/useAcademy";
import { useEffect } from "react";
import Loading from "@/components/loading/loading";
import { notFound } from "next/navigation";

const AcademyProfile = () => {
  const { academy, getAcademy, status } = useAcademy();
  console.log("🔍 ~  ~ medicova-courses/components/pages/academy/AcademyProfile.tsx:16 ~ status:", status);

  useEffect(() => {
    getAcademy();
  }, [getAcademy]);

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
          <AcademyHeaderCard academy={academy} />
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
              {/* <AcademyCourses academy={academy} /> */}
            </TabsContent>
          </Tabs>
        </div>
        {/* Right Sections */}
        <div className="hidden max-w-80 min-w-80 space-y-2 md:block">
          <CompetenceCard percentage={50} />
          <ContactInfoSection />
          {/* <SocialMediaSection user={academy} /> */}
        </div>
      </div>
    </div>
  );
};

export default AcademyProfile;
