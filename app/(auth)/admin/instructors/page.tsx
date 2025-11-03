"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/UI/Tabs";
import Link from "next/link";
import { Plus } from "lucide-react";
import OverviewInstructorsPage from "./panels/OverviewInstructors";
import { instructors } from "@/constants/instructors.data";
import InstructorsList from "./panels/InstructorsList";
import { Card } from "@/components/UI/card";
import { Button } from "@/components/UI/button";
import { Input } from "@/components/UI/input";
import InstructorSettingsForm from "@/components/admin/InstructorSettingsForm";
import InstructorSettingsTable, { InstructorSetting } from "@/components/admin/InstructorSettingsTable";
import InstructorSettingsEditModal from "@/components/admin/InstructorSettingsEditModal";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/UI/alert-dialog";

export default function InstructorsPage() {
  // Instructor Settings states
  const [instructorSettings, setInstructorSettings] = useState<InstructorSetting[]>([
    // Degrees
    { id: "1", name: "Bachelor", value: "bachelor", type: "degree", priority: 1, isActive: true },
    { id: "2", name: "Master", value: "master", type: "degree", priority: 2, isActive: true },
    { id: "3", name: "PhD", value: "phd", type: "degree", priority: 3, isActive: true },
    { id: "4", name: "Diploma", value: "diploma", type: "degree", priority: 4, isActive: true },
    // Categories
    { id: "5", name: "Medicine", value: "medicine", type: "category", priority: 1, isActive: true },
    { id: "6", name: "Engineering", value: "engineering", type: "category", priority: 2, isActive: true },
    { id: "7", name: "Business", value: "business", type: "category", priority: 3, isActive: true },
    // Specializations
    { id: "8", name: "Cardiology", value: "cardiology", type: "specialization", priority: 1, isActive: true, parentId: "5", parentName: "Medicine" },
    { id: "9", name: "Neurology", value: "neurology", type: "specialization", priority: 2, isActive: true, parentId: "5", parentName: "Medicine" },
    { id: "10", name: "Software Engineering", value: "software_engineering", type: "specialization", priority: 1, isActive: true, parentId: "6", parentName: "Engineering" },
    // Languages
    { id: "11", name: "English", value: "english", type: "language", priority: 1, isActive: true },
    { id: "12", name: "Arabic", value: "arabic", type: "language", priority: 2, isActive: true },
    { id: "13", name: "French", value: "french", type: "language", priority: 3, isActive: true },
    { id: "14", name: "Spanish", value: "spanish", type: "language", priority: 4, isActive: true },
    // Proficiency Levels
    { id: "15", name: "Native", value: "native", type: "proficiencyLevel", priority: 1, isActive: true },
    { id: "16", name: "Fluent", value: "fluent", type: "proficiencyLevel", priority: 2, isActive: true },
    { id: "17", name: "Intermediate", value: "intermediate", type: "proficiencyLevel", priority: 3, isActive: true },
    { id: "18", name: "Beginner", value: "beginner", type: "proficiencyLevel", priority: 4, isActive: true },
  ]);
  
  const [selectedSetting, setSelectedSetting] = useState<InstructorSetting | null>(null);
  const [settingEditModalOpen, setSettingEditModalOpen] = useState(false);
  const [settingDeleteDialogOpen, setSettingDeleteDialogOpen] = useState(false);
  const [settingToDelete, setSettingToDelete] = useState<InstructorSetting | null>(null);
  const [deleteConfirmText, setDeleteConfirmText] = useState("");
  const [loading] = useState(false);

  // Get categories for specialization parent selection
  const categories = instructorSettings
    .filter((s) => s.type === "category")
    .map((s) => ({ id: s.id, name: s.name }));

  const handleSettingSubmit = (data: {
    name: string;
    value: string;
    type: "degree" | "category" | "specialization" | "language" | "proficiencyLevel";
    priority: number;
    parentId?: string;
  }) => {
    const newSetting: InstructorSetting = {
      id: Date.now().toString(),
      ...data,
      isActive: true,
      ...(data.parentId ? {
        parentId: data.parentId,
        parentName: categories.find((c) => c.id === data.parentId)?.name
      } : {})
    };
    setInstructorSettings([...instructorSettings, newSetting]);
  };

  const handleEditSetting = (setting: InstructorSetting) => {
    setSelectedSetting(setting);
    setSettingEditModalOpen(true);
  };

  const handleSettingEditModalSubmit = (data: {
    name: string;
    value: string;
    type: "degree" | "category" | "specialization" | "language" | "proficiencyLevel";
    priority: number;
    parentId?: string;
  }) => {
    if (!selectedSetting) return;

    setInstructorSettings(
      instructorSettings.map((s) =>
        s.id === selectedSetting.id
          ? {
              ...s,
              ...data,
              ...(data.parentId ? {
                parentId: data.parentId,
                parentName: categories.find((c) => c.id === data.parentId)?.name
              } : { parentId: undefined, parentName: undefined })
            }
          : s
      )
    );

    setSettingEditModalOpen(false);
    setSelectedSetting(null);
  };

  const handleDeleteSetting = (setting: InstructorSetting) => {
    setSettingToDelete(setting);
    setSettingDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (!settingToDelete) return;

    setInstructorSettings(instructorSettings.filter((s) => s.id !== settingToDelete.id));
    setSettingDeleteDialogOpen(false);
    setSettingToDelete(null);
    setDeleteConfirmText("");
  };

  const handleCancelDelete = () => {
    setSettingDeleteDialogOpen(false);
    setSettingToDelete(null);
    setDeleteConfirmText("");
  };

  const handleToggleSettingStatus = (setting: InstructorSetting) => {
    setInstructorSettings(
      instructorSettings.map((s) =>
        s.id === setting.id ? { ...s, isActive: !s.isActive } : s
      )
    );
  };

  return (
    <Tabs defaultValue="Instructors List" className="w-full space-y-3 px-4">
      <Card className="flex w-full flex-col items-center justify-between gap-3 space-y-0 p-2 md:flex-row">
        <TabsList>
          <TabsTrigger value="Instructors List">Instructors List</TabsTrigger>
          <TabsTrigger value="Instructors Overview">
            Instructors Overview
          </TabsTrigger>
          <TabsTrigger value="Instructors Settings">
            Instructors Settings
          </TabsTrigger>  
        </TabsList>
        <Button variant="outline" asChild>
          <Link href={"/lms/course/add"}>
            <Plus /> Add new Instructor
          </Link>
        </Button>
      </Card>

      <TabsContent value="Instructors Overview">
        <OverviewInstructorsPage />
      </TabsContent>
      <TabsContent value="Instructors List">
        <InstructorsList instructors={instructors} />
      </TabsContent>
      
      <TabsContent value="Instructors Settings" className="space-y-6">
        {/* Instructor Settings Form */}
        <InstructorSettingsForm 
          onSubmit={handleSettingSubmit}
          categories={categories}
        />

        {/* Instructor Settings Table */}
        <InstructorSettingsTable
          settings={instructorSettings}
          onEdit={handleEditSetting}
          onDelete={handleDeleteSetting}
          onToggleStatus={handleToggleSettingStatus}
        />

        {/* Setting Edit Modal */}
        <InstructorSettingsEditModal
          open={settingEditModalOpen}
          onOpenChange={setSettingEditModalOpen}
          setting={selectedSetting}
          loading={loading}
          onSubmit={handleSettingEditModalSubmit}
          categories={categories}
        />

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={settingDeleteDialogOpen} onOpenChange={setSettingDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Instructor Setting</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete the{" "}
                {settingToDelete?.type === "degree" ? "degree" :
                 settingToDelete?.type === "category" ? "category" :
                 settingToDelete?.type === "specialization" ? "specialization" :
                 settingToDelete?.type === "language" ? "language" :
                 settingToDelete?.type === "proficiencyLevel" ? "proficiency level" :
                 "setting"}{" "}
                <span className="font-semibold">&quot;{settingToDelete?.name}&quot;</span>?
                This action cannot be undone and may affect existing instructor profiles.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div className="px-6 py-4">
              <p className="text-sm text-gray-700 mb-2">
                Type <span className="font-bold text-red-600">DELETE</span> to confirm this action:
              </p>
              <Input
                value={deleteConfirmText}
                onChange={(e) => setDeleteConfirmText(e.target.value)}
                placeholder="Type DELETE"
                className="font-mono"
              />
            </div>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={handleCancelDelete} disabled={loading}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleConfirmDelete}
                disabled={loading || deleteConfirmText !== "DELETE"}
                className="bg-red-600 hover:bg-red-700"
              >
                {loading ? "Deleting..." : "Delete"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </TabsContent>
    </Tabs>
  );
}
