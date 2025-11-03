"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/UI/Table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/UI/card";
import { Button } from "@/components/UI/button";
import { Badge } from "@/components/UI/badge";
import { Edit, Trash2 } from "lucide-react";
import { Switch } from "@/components/UI/switch";

export interface InstructorSetting {
  id: string;
  name: string;
  value: string;
  type: "degree" | "category" | "specialization" | "language" | "proficiencyLevel";
  priority: number;
  isActive: boolean;
  parentId?: string;
  parentName?: string;
}

interface InstructorSettingsTableProps {
  settings: InstructorSetting[];
  onEdit: (setting: InstructorSetting) => void;
  onDelete: (setting: InstructorSetting) => void;
  onToggleStatus: (setting: InstructorSetting) => void;
}

export default function InstructorSettingsTable({
  settings,
  onEdit,
  onDelete,
  onToggleStatus,
}: InstructorSettingsTableProps) {
  const [typeFilter, setTypeFilter] = useState<"all" | "degree" | "category" | "specialization" | "language" | "proficiencyLevel">("all");

  const filteredSettings = settings
    .filter((s) => typeFilter === "all" || s.type === typeFilter)
    .sort((a, b) => a.priority - b.priority);

  const getTypeLabel = (type: InstructorSetting["type"]) => {
    const labels = {
      degree: "Degree",
      category: "Category",
      specialization: "Specialization",
      language: "Language",
      proficiencyLevel: "Proficiency Level",
    };
    return labels[type];
  };

  const getTypeBadgeVariant = (type: InstructorSetting["type"]) => {
    const variants = {
      degree: "info",
      category: "premium",
      specialization: "default",
      language: "secondary",
      proficiencyLevel: "outline",
    };
    return variants[type];
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle>Instructor Settings</CardTitle>
            <CardDescription>
              Manage degrees, categories, specializations, languages, and proficiency levels
            </CardDescription>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={typeFilter === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setTypeFilter("all")}
            >
              All
            </Button>
            <Button
              variant={typeFilter === "degree" ? "default" : "outline"}
              size="sm"
              onClick={() => setTypeFilter("degree")}
            >
              Degrees
            </Button>
            <Button
              variant={typeFilter === "category" ? "default" : "outline"}
              size="sm"
              onClick={() => setTypeFilter("category")}
            >
              Categories
            </Button>
            <Button
              variant={typeFilter === "specialization" ? "default" : "outline"}
              size="sm"
              onClick={() => setTypeFilter("specialization")}
            >
              Specializations
            </Button>
            <Button
              variant={typeFilter === "language" ? "default" : "outline"}
              size="sm"
              onClick={() => setTypeFilter("language")}
            >
              Languages
            </Button>
            <Button
              variant={typeFilter === "proficiencyLevel" ? "default" : "outline"}
              size="sm"
              onClick={() => setTypeFilter("proficiencyLevel")}
            >
              Proficiency Levels
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Priority</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Display Name</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Parent</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSettings.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center">
                    No settings found
                  </TableCell>
                </TableRow>
              ) : (
                filteredSettings.map((setting) => (
                  <TableRow key={setting.id}>
                    <TableCell className="font-medium">{setting.priority}</TableCell>
                    <TableCell>
                      <Badge variant={getTypeBadgeVariant(setting.type) as "default" | "info" | "premium" | "secondary" | "outline"}>
                        {getTypeLabel(setting.type)}
                      </Badge>
                    </TableCell>
                    <TableCell>{setting.name}</TableCell>
                    <TableCell>
                      <code className="rounded bg-gray-100 px-2 py-1 text-xs">
                        {setting.value}
                      </code>
                    </TableCell>
                    <TableCell>
                      {setting.parentName ? (
                        <Badge variant="outline" className="text-xs">
                          {setting.parentName}
                        </Badge>
                      ) : (
                        <span className="text-gray-400 text-xs">—</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={setting.isActive}
                          onCheckedChange={() => onToggleStatus(setting)}
                        />
                        <Badge variant={setting.isActive ? "success" : "destructive"}>
                          {setting.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => onEdit(setting)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => onDelete(setting)}
                          className="text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

