import SocialMediaCard from "./SocialMediaCard";
import AboutSection from "./About";
import { Card, CardHeader, CardTitle } from "@/components/UI/card";
import CoursesList from "./CoursesList";
import { getAcademyBySlug } from "@/lib/actions/academy.actions";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import Loading from "@/components/loading/loading";
import AcademyHeaderCard from "./Header";
import PublicContactInfoSection from "./ContactInfoSection";

const AcademyPublicProfile = async ({ slug }: { slug: string }) => {
  const data = await getAcademyBySlug(slug);
  const academy = data.data;
  if (!academy) {
    return notFound();
  }
  return (
    <div className="w-full px-4">
      <div className="flex gap-2">
        {/* Left + Center Sections */}
        <div className="flex-1 space-y-2">
          {/* Header Section */}
          <AcademyHeaderCard academy={academy} />
          {/* About Section */}
          <AboutSection academy={academy} />

          <Card>
            <CardHeader>
              <CardTitle>Academy Courses</CardTitle>
            </CardHeader>
          </Card>
          <Suspense fallback={<Loading className="h-[200px]" />}>
            <CoursesList id={academy.id} />
          </Suspense>
        </div>
        {/* Right Sections */}
        <div className="hidden max-w-72 min-w-72 space-y-2 md:block">
          <PublicContactInfoSection
            email={academy.contactEmail || academy.email}
            phone={academy.phone}
          />
          <SocialMediaCard academy={academy} />
        </div>
      </div>
    </div>
  );
};

export default AcademyPublicProfile;
