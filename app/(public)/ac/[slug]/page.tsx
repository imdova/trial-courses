import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/UI/Tabs";
import { Card } from "@/components/UI/card";
import { auth } from "@/auth";
import AcademyPublicProfile from "@/components/pages/academy/public/Profile";
import AcademyPrivateProfile from "@/components/pages/academy/private/profile";
import AcademyVerificationTab from "@/components/pages/academy/private/AcademyVerificationTab";

const Page = async ({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const searchParam = await searchParams;
  const isPublic = searchParam?.isPublic === "true";
  const { slug } = await params;
  const { user } = (await auth()) || { user: null };
  const isMe = isPublic ? false : user?.academy?.slug === slug;

  return isMe ? (
    <Tabs defaultValue="profile" className="px-4">
      <Card className="p-0">
        <TabsList>
          <TabsTrigger value="profile">Academy Profile</TabsTrigger>
          <TabsTrigger value="verify">Verify</TabsTrigger>
        </TabsList>
      </Card>
      <TabsContent value="profile">
        <AcademyPrivateProfile />
      </TabsContent>
      <TabsContent value="verify">
        <AcademyVerificationTab />
      </TabsContent>
    </Tabs>
  ) : (
    <AcademyPublicProfile slug={slug} />
  );
};

export default Page;
