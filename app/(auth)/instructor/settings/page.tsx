import PayoutSettings from "./panels/PayoutSettings";
import SecuritySettings from "./panels/SecuritySettings ";
import CommunicationSettings from "./panels/CommunicationSettings";
import { Bell, CreditCard, Shield } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/UI/Tabs";
import { ScrollArea, ScrollBar } from "@/components/UI/scroll-area";
import { Card } from "@/components/UI/card";

const SettingsPage = () => {
  return (
    <Tabs defaultValue="security" className="px-5">
      <Card className="p-0">
        <ScrollArea className="grid max-w-full p-0">
          <TabsList>
            <TabsTrigger value="security">
              <Shield />
              Security Settings
            </TabsTrigger>
            <TabsTrigger value="communication">
              <Bell />
              Communication Settings
            </TabsTrigger>
            <TabsTrigger value="payout">
              <CreditCard />
              Payout Settings
            </TabsTrigger>
          </TabsList>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </Card>
      <TabsContent value="security">
        <SecuritySettings />
      </TabsContent>
      <TabsContent value="communication">
        <CommunicationSettings />
      </TabsContent>
      <TabsContent value="payout">
        <PayoutSettings />
      </TabsContent>
    </Tabs>
  );
};

export default SettingsPage;
