"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/UI/Tabs";
import { Card } from "@/components/UI/card";
import ManagePlans from "@/components/admin/ManagePlans";
import PlansList from "@/components/admin/lists/PlansList";
import PlansOverView from "@/components/admin/overviews/PlansOverView";
import { Building2, LayoutList } from "lucide-react";

const page = () => {
  return (
    <Tabs defaultValue="over-view" className="my-8 w-full px-5">
      <Card className="flex w-full items-center justify-between gap-3 space-y-0 p-2">
        <TabsList>
          <TabsTrigger value="over-view">
            <LayoutList className="h-5 w-5" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="plan-list">
            <Building2 className="h-5 w-5" />
            Plans List
          </TabsTrigger>
          <TabsTrigger value="manage-plans">
            <Building2 className="h-5 w-5" />
            Manage Plans
          </TabsTrigger>
        </TabsList>
      </Card>
      <TabsContent value="over-view">
        <PlansOverView />
      </TabsContent>
      <TabsContent value="plan-list">
        <PlansList />
      </TabsContent>
      <TabsContent value="manage-plans">
        <ManagePlans />
      </TabsContent>
    </Tabs>
  );
};

export default page;
