"use client";
import Link from "next/link";
import { Plus } from "lucide-react";
import QuizzesOverviewPage from "./panels/QuizzesOverview";
import QuizzesListPage from "./panels/QuizzesList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/UI/Tabs";
import { Card } from "@/components/UI/card";
import { Button } from "@/components/UI/button";

export default function QuizzesPage() {
  return (
    <Tabs defaultValue="Quiz List" className="w-full space-y-3 px-4">
      <Card className="flex w-full items-center justify-between gap-3 space-y-0 p-0">
        <TabsList>
          <TabsTrigger value="Quiz List">Quiz List</TabsTrigger>
          <TabsTrigger value="Quiz Overview">Quiz Overview</TabsTrigger>
          <TabsTrigger value="Quiz Settings">Quiz Settings</TabsTrigger>
        </TabsList>
        <Button variant="outline" asChild>
          <Link href={"/lms/quiz/create"}>
            <Plus /> Add new Quiz
          </Link>
        </Button>
      </Card>

      <TabsContent value="Quiz Overview">
        <QuizzesOverviewPage />
      </TabsContent>
      <TabsContent value="Quiz List">
        <QuizzesListPage />
      </TabsContent>
      <TabsContent value="Quiz Settings">settings</TabsContent>
    </Tabs>
  );
}
