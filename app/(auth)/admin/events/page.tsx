"use client";
import { Building2, LayoutList } from "lucide-react";
import { Card } from "@/components/UI/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/UI/Tabs";
import ListEvents from "./panels/ListEvents";
import OverviewEvent from "./panels/OverviewEvent";
const EventsPage: React.FC = () => {
  return (
    <div className="px-2">
      <Tabs defaultValue="overview" className="w-full">
        <Card className="p-1">
          <TabsList>
            <TabsTrigger value="overview">
              <LayoutList />
              Overview
            </TabsTrigger>
            <TabsTrigger value="event-list">
              <Building2 />
              Event List
            </TabsTrigger>
          </TabsList>
        </Card>
        <TabsContent value="overview">
          <OverviewEvent />
        </TabsContent>
        <TabsContent value="event-list">
          <ListEvents />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EventsPage;
