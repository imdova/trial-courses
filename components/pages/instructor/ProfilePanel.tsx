"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import HeaderSection from "@/components/pages/instructor/HeaderSection";
import PublicProfile from "@/components/pages/instructor/PublicProfile";
import Resume from "@/components/pages/instructor/Resume";
import ContactInfoSection from "@/components/pages/instructor/ContactInfoSection";
import SocialMediaSection from "@/components/pages/instructor/SocialMediaSection";
import LanguageSection from "@/components/pages/instructor/LanguageSection";
import { ProfileInfoForm } from "@/components/pages/instructor/ProfileInfoForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/UI/Tabs";
import CompetenceCard from "@/components/pages/instructor/InstructorComplete";
import ProfessionalInfo from "@/components/pages/instructor/ProfessionalInfo";
import { Card } from "@/components/UI/card";
import { useProfile } from "@/hooks/useProfile";

const ProfilePage = () => {
  const { data: session } = useSession();
  const user = session?.user;
  const { getProfile, profile, loading, error } = useProfile();
  const [currentInstructor, setCurrentInstructor] =
    useState<InstructorData | null>();

  useEffect(() => {
    const targetUserId = user?.id;

    if (targetUserId) {
      getProfile(targetUserId);
    }
  }, [getProfile, user?.id]);

  useEffect(() => {
    // Update current instructor when profile data is fetched
    if (profile) {
      // Map UserProfile to InstructorData if needed
      const mappedInstructor: InstructorData = {
        id: profile.id,
        created_at: profile.created_at,
        updated_at: profile.updated_at,
        deleted_at: profile.deleted_at,
        firstName: profile.firstName || "",
        lastName: profile.lastName || "",
        userName: profile.userName,
        photoUrl: profile.avatar,
        phoneNumber: profile.phone,
        hasWhatsapp: !!profile.whatsapp,
        phoneNumbertForWhatsapp: profile.whatsapp,
        dateOfBirth: profile.birthDate,
        gender: profile.gender,
        nationality: profile.nationality,
        maritalStatus: profile.maritalStatus as
          | "single"
          | "married"
          | "divorced"
          | "widowed"
          | null,
        hasDrivingLicense: profile.hasDrivingLicence || false,
        resumePath: profile.resumePath,
        contactEmail: profile.user.email,
        linkedinUrl: profile.socialLinks?.linkedin || null,
        languages: profile.languages
          ? profile.languages.map((lang) => ({
              name: lang.language,
              proficiency: lang.level,
            }))
          : null,
        metadata: {
          experience: [],
          courses: [],
          skills: [],
          education: [],
          activities: [],
        },
        isPublic: profile.isPublic,
        user: {
          id: profile.id,
          created_at: profile.created_at,
          updated_at: profile.updated_at,
          deleted_at: profile.deleted_at,
          email: profile.email || "",
          role: profile.type as
            | "student"
            | "instructor"
            | "admin"
            | "unverified",
        },
        category: null,
        speciality: null,
        about: profile.about,
        country: profile.country,
        state: profile.state,
        completionPercentage: profile.completionPercentage,
      };
      setCurrentInstructor(mappedInstructor);
    }
  }, [profile]);

  // Loading state
  if (loading && !currentInstructor) {
    return (
      <div className="flex h-64 w-full items-center justify-center">
        <div className="text-center">
          <div className="border-primary h-8 w-8 animate-spin rounded-full border-4 border-t-transparent"></div>
          <p className="text-muted-foreground mt-2 text-sm">
            Loading profile...
          </p>
        </div>
      </div>
    );
  }

  // Error state
  if (error && !currentInstructor) {
    return (
      <div className="flex h-64 w-full items-center justify-center">
        <div className="text-center">
          <p className="text-sm text-red-500">Error loading profile: {error}</p>
          <button
            onClick={() => {
              const targetUserId = user?.id;
              if (targetUserId) {
                getProfile(targetUserId);
              }
            }}
            className="bg-primary hover:bg-primary/90 mt-2 rounded px-4 py-2 text-sm text-white"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // No data state
  if (!currentInstructor) {
    return (
      <div className="flex h-64 w-full items-center justify-center">
        <p className="text-muted-foreground text-sm">
          No profile data available
        </p>
      </div>
    );
  }

  return (
    <div className="flex gap-2">
      {/* Left + Center Sections */}
      <div className="flex-1 space-y-2">
        {/* Header Section */}
        <HeaderSection user={currentInstructor} />
        {/* About Section */}
        <Tabs defaultValue="personal-info">
          <Card className="p-0">
            <TabsList>
              <TabsTrigger value="personal-info">Personal Info</TabsTrigger>
              <TabsTrigger value="professional">Professional Info</TabsTrigger>
            </TabsList>
          </Card>
          <TabsContent value="personal-info">
            <ProfileInfoForm />
          </TabsContent>
          <TabsContent value="professional">
            <ProfessionalInfo />
          </TabsContent>
        </Tabs>
      </div>
      {/* Right Sections */}
      <div className="hidden w-3xs space-y-2 md:block">
        <CompetenceCard percentage={currentInstructor.completionPercentage} />
        <PublicProfile user={currentInstructor} />
        <Resume user={currentInstructor} />
        <ContactInfoSection />
        <SocialMediaSection user={currentInstructor} />
        <LanguageSection user={currentInstructor} />
      </div>
    </div>
  );
};

export default ProfilePage;
