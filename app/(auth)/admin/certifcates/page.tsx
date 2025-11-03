"use client";
import CertifcatesOverviewPage from "./panels/CertifcatesOverview";
import CertifcatesListPage from "./panels/CertifcateList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/UI/Tabs";
import { Card } from "@/components/UI/card";
import { ScrollArea, ScrollBar } from "@/components/UI/scroll-area";

export default function CertificatesPage() {
  return (
    <Tabs defaultValue="Certificates Overview" className="px-4">
      <Card className="p-0">
        <ScrollArea className="grid max-w-full p-0">
          <TabsList>
            <TabsTrigger value="Certificates Overview">
              Certificates Overview
            </TabsTrigger>
            <TabsTrigger value="Certificates List">
              Certificates List
            </TabsTrigger>
            <TabsTrigger value="Certificates Settings">
              Certificates Settings
            </TabsTrigger>
          </TabsList>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </Card>
      <TabsContent value="Certificates Overview">
        <CertifcatesOverviewPage />
      </TabsContent>
      <TabsContent value="Certificates List">
        <CertifcatesListPage />
      </TabsContent>
      <TabsContent value="Certificates Settings">
        Certificates Settings
      </TabsContent>
    </Tabs>
  );
}
