"use client";
import { Building2, LayoutList, Settings } from "lucide-react";
import TeamList from "@/components/admin/lists/TeamList";
import RolesTab from "@/components/settings/RolesTab";
import DepartmentTab from "@/components/settings/DepartmentsTab";
import { Card } from "@/components/UI/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/UI/Tabs";

const EmployeesPage: React.FC = () => {
  return (
    <div className="my-8 space-y-3 px-4">
      <Tabs defaultValue="employees-list" className="w-full">
        <Card className="p-1">
          <TabsList>
            <TabsTrigger value="employees-list">
              <LayoutList />
              Employees List
            </TabsTrigger>
            <TabsTrigger value="departments">
              <Building2 />
              Departments
            </TabsTrigger>
            <TabsTrigger value="roles">
              <Settings />
              Roles
            </TabsTrigger>
          </TabsList>
        </Card>
        <TabsContent value="employees-list">
          <TeamList />
        </TabsContent>
        <TabsContent value="departments">
          <DepartmentTab />
        </TabsContent>
        <TabsContent value="roles">
          <RolesTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EmployeesPage;
