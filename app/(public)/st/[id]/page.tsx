// import HeaderSection from "./Components/HeaderSection";
// import ExperienceSection from "./Components/ExperienceSection";
// import EducationsSection from "./Components/EducationsSection";
// import CoursesSection from "./Components/CoursesSection";
// import SkillsSection from "./Components/SkillsSection";
// import ActivitiesAchievementsSection from "./Components/ActivitiesAchievementsSection";
// import PublicProfile from "./Components/PublicProfile";
// import Resume from "./Components/Resume";
// import ContactInfoSection from "./Components/ContactInfoSection";
// import SocialMediaSection from "./Components/SocialMediaSection";
// import LanguageSection from "./Components/LanguageSection";
// import { notFound } from "next/navigation";
// import { Suspense } from "react";
// import ExperienceSkeleton from "@/components/loading/skeleton-experince";
// import StudentComplete from "./Components/StudentComplete";
// import ProfileNavigation from "./Components/ProfileNavigation";
// import { ProfileInfoForm } from "./Components/ProfileInfoForm";
// import AboutStudent from "./Components/AboutStudent";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/UI/Tabs";
import ProfilePanel from "@/components/pages/instructor/ProfilePanel";
import VerificationPanel from "@/components/pages/instructor/VerificationPanel";
import { Card } from "@/components/UI/card";
const ProfilePage = async () => {
  // const searchParamsResults = await searchParams;
  // const user = dummyUser;
  // if (!user) return notFound();
  // const isMe = true;
  // const tab = isMe
  //   ? (searchParamsResults?.tab as ProfileTabs) || "personal-info"
  //   : "professional";
  // const isLocked = !isMe;

  // if (!isMe && !user.isPublic) {
  //   return notFound();
  // }

  return (
    <Tabs defaultValue="profile" className="px-4">
      <Card className="p-0">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="verify">Verify</TabsTrigger>
        </TabsList>
      </Card>
      <TabsContent value="profile">
        <ProfilePanel />
      </TabsContent>
      <TabsContent value="verify">
        <VerificationPanel />
      </TabsContent>
    </Tabs>
  );
};

export default ProfilePage;
// const ProfessionalInfo: React.FC<{
//   user: UserProfile;
//   isMe: boolean;
// }> = ({ user, isMe }) => (
//   <>
//     <AboutStudent user={user} isMe={isMe} />
//     <Suspense fallback={<ExperienceSkeleton />}>
//       <ExperienceSection user={user} isMe={isMe} />
//     </Suspense>
//     <Suspense fallback={null}>
//       <EducationsSection user={user} isMe={isMe} />
//     </Suspense>
//     <Suspense fallback={null}>
//       <CoursesSection user={user} isMe={isMe} />
//     </Suspense>
//     <Suspense fallback={null}>
//       <SkillsSection user={user} isMe={isMe} />
//     </Suspense>
//     <ActivitiesAchievementsSection user={user} isMe={isMe} />
//   </>
// );

