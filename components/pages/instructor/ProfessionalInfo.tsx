/* eslint-disable @typescript-eslint/no-unused-vars */
import AboutInstructor from "./AboutInstructor";
import ActivitiesAchievementsSection from "./ActivitiesAchievementsSection";
import CoursesSection from "./CoursesSection";
import EducationsSection from "./EducationsSection";
import InstructorExperienceSection from "./ExperienceSection";
import SkillsSection from "./SkillsSection";

const ProfessionalInfo = () => (
  <div className="space-y-2">
    <AboutInstructor />
    {/* <InstructorExperienceSection /> */}
    <EducationsSection/>
    <CoursesSection  />
    <SkillsSection  />
    <ActivitiesAchievementsSection  />
  </div>
);

export default ProfessionalInfo;
