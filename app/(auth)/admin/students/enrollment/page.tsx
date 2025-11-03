"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/UI/Tabs";
import Link from "next/link";
import { Plus } from "lucide-react";
import OverviewEnrollmentsPage from "./panels/OverviewEnrollments";
import EnrollmentList from "./panels/EnrollmentList";
import { Card } from "@/components/UI/card";
import { Button } from "@/components/UI/button";

export default function EnrollmentPage() {
  return (
    <Tabs defaultValue="Enrollments List" className="px-3">
      <Card className="flex w-full flex-col items-center justify-between gap-3 space-y-0 p-2 md:flex-row">
        <TabsList>
          <TabsTrigger value="Enrollments List">Enrollments List</TabsTrigger>
          <TabsTrigger value="Enrollments Overview">Enrollments Overview</TabsTrigger>
          <TabsTrigger value="Enrollment Settings">Enrollment Settings</TabsTrigger>
        </TabsList>
        <Button variant="outline" asChild>
          <Link href={"/admin/students/enrollment/create"}>
            <Plus /> Add new Enrollment
          </Link>
        </Button>
      </Card>

      <TabsContent value="Enrollments Overview">
        <OverviewEnrollmentsPage />
      </TabsContent>
      <TabsContent value="Enrollments List">
        <EnrollmentList />
      </TabsContent>
      {/* <TabsContent value="Enrollment Settings">
        <div className="rounded-xl border bg-white p-4 shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Enrollment Settings</h3>
          <p className="text-gray-600">Enrollment configuration and settings will be available here.</p>
        </div>
      </TabsContent> */}
    </Tabs>
  );
}