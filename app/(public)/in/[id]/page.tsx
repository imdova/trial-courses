import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/UI/Tabs";
import ProfilePanel from "@/components/pages/instructor/ProfilePanel";
import VerificationPanel from "@/components/pages/instructor/VerificationPanel";
import { Card } from "@/components/UI/card";

const InstructorProfile = () => {
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
export default InstructorProfile;
