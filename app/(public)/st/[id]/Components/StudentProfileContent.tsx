"use client";
import { useEffect, useState, Suspense } from "react";
import { useSession } from "next-auth/react";
import { notFound } from "next/navigation";
import { useProfile } from "@/hooks/useProfile";
import HeaderSection from "./HeaderSection";
import ExperienceSection from "./ExperienceSection";
import EducationsSection from "./EducationsSection";
import CoursesSection from "./CoursesSection";
import SkillsSection from "./SkillsSection";
import ActivitiesAchievementsSection from "./ActivitiesAchievementsSection";
import PublicProfile from "./PublicProfile";
import Resume from "./Resume";
import ContactInfoSection from "./ContactInfoSection";
import SocialMediaSection from "./SocialMediaSection";
import LanguageSection from "./LanguageSection";
import ExperienceSkeleton from "@/components/loading/skeleton-experince";
import StudentComplete from "./StudentComplete";
import ProfileNavigation from "./ProfileNavigation";
import { ProfileInfoForm } from "./ProfileInfoForm";
import AboutStudent from "./AboutStudent";

interface StudentProfileContentProps {
  userId: string;
  tab: ProfileTabs;
}

const StudentProfileContent = ({ userId, tab }: StudentProfileContentProps) => {
  const { data: session } = useSession();
  const { getProfile, profile, loading, error } = useProfile();
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [isNotFound, setIsNotFound] = useState(false);

  // Check if viewing own profile
  const isMe = session?.user?.id === session?.user?.id;

  useEffect(() => {
    if (session?.user?.id) {
      getProfile(session?.user?.id);
    }
  }, [getProfile, session?.user?.id]);

  useEffect(() => {
    // Update current user when profile data is fetched
    if (profile) {
      // Map profile data to UserProfile format
      const mappedUser: UserProfile = {
        id: profile.id,
        userName: profile.userName,
        phone: profile.phone || "",
        email: profile.user?.email || profile.email || "",
        firstName: profile.firstName || "",
        lastName: profile.lastName || "",
        avatar: profile.avatar || profile.photoUrl || "",
        birthDate: profile.birthDate || profile.dateOfBirth || "",
        type: profile.type || "student",
        active: true,
        bio: profile.bio || profile.about || "",
        title: profile.title || "",
        languages: profile.languages?.map(lang => ({
          name: lang.language,
          proficiency: lang.level
        })) || [],
        resume: profile.resume || profile.resumePath || "",
        socialLinks: profile.socialLinks || {
          facebook: profile.facebookUrl || "",
          linkedin: profile.linkedinUrl || "",
          twitter: profile.twitterUrl || "",
        },
        whatsapp: profile.whatsapp || profile.phoneNumbertForWhatsapp || "",
        nationality: profile.nationality || "",
        maritalStatus: (profile.maritalStatus as MaritalStatus) || null,
        qualifications: [],
        hasDrivingLicence: profile.hasDrivingLicence || profile.hasDrivingLicense || false,
        country: profile.country || { code: "", name: "" },
        state: profile.state || { code: "", name: "" },
        city: profile.city || "",
        isPublic: profile.isPublic || false,
        created_at: profile.created_at || "",
        updated_at: profile.updated_at || "",
        deleted_at: profile.deleted_at || null,
        _version: profile._version || 0,
        isLocked: false,
        gender: (profile.gender as "male" | "female" | "other") || null,
        certificates: [],
        experience: 0,
        reviews: "",
        rating: 0,
        students: 0,
        shortcuts: [],
        skills: [],
      };
      setCurrentUser(mappedUser);

      // Check if profile should be accessible
      if (!isMe && !profile.isPublic) {
        setIsNotFound(true);
      }
    }
  }, [profile, isMe]);

  // Show not found if profile is private and not owned by user
  if (isNotFound) {
    notFound();
  }

  // Loading state
  if (loading && !currentUser) {
    return (
      <div className="flex h-64 w-full items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="mt-2 text-sm text-muted-foreground">Loading profile...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error && !currentUser) {
    return (
      <div className="flex h-64 w-full items-center justify-center">
        <div className="text-center">
          <p className="text-sm text-red-500">Error loading profile: {error}</p>
          <button
            onClick={() => getProfile(userId)}
            className="mt-2 rounded bg-primary px-4 py-2 text-sm text-white hover:bg-primary/90"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // No data state
  if (!currentUser) {
    return (
      <div className="flex h-64 w-full items-center justify-center">
        <p className="text-sm text-muted-foreground">No profile data available</p>
      </div>
    );
  }

  const isLocked = !isMe;

  return (
    <div className="w-full px-4 md:px-5">
      <div className="flex gap-5">
        {/* Left + Center Sections */}
        <div className="flex-1 space-y-2">
          {/* Header Section */}
          <HeaderSection user={currentUser} isMe={isMe} />
          
          {/* About Section */}
          {isMe && <ProfileNavigation tab={tab} />}
          
          {tab === "professional" && (
            <ProfessionalInfo user={currentUser} isMe={isMe} />
          )}
          
          {isMe && tab === "personal-info" && <ProfileInfoForm user={currentUser} />}
        </div>
        
        {/* Right Sections */}
        <div className="hidden max-w-80 min-w-80 space-y-2 md:block">
          {/* Public user Section */}
          {isMe && (
            <>
              <StudentComplete user={currentUser} />
              {/* Public user Section */}
              <PublicProfile user={currentUser} />
            </>
          )}
          {/* Resume Section */}
          <Resume isMe={isMe} user={currentUser} isLocked={isLocked} />
          {/* Contact Info Section */}
          <ContactInfoSection
            isMe={isMe}
            user={currentUser}
            companyId={"ddfs"}
            isLocked={isLocked}
          />
          {/* Socialmedia Section */}
          <SocialMediaSection
            isMe={isMe}
            user={currentUser}
            isLocked={isLocked}
            type="student"
          />
          {/* Language Section */}
          <LanguageSection isMe={isMe} user={currentUser} />
        </div>
      </div>
    </div>
  );
};

const ProfessionalInfo: React.FC<{
  user: UserProfile;
  isMe: boolean;
}> = ({ user, isMe }) => (
  <>
    <AboutStudent user={user} isMe={isMe} />
    <Suspense fallback={<ExperienceSkeleton />}>
      <ExperienceSection user={user} isMe={isMe} />
    </Suspense>
    <Suspense fallback={null}>
      <EducationsSection user={user} isMe={isMe} />
    </Suspense>
    <Suspense fallback={null}>
      <CoursesSection user={user} isMe={isMe} />
    </Suspense>
    <Suspense fallback={null}>
      <SkillsSection user={user} isMe={isMe} />
    </Suspense>
    <ActivitiesAchievementsSection user={user} isMe={isMe} />
  </>
);

export default StudentProfileContent;

