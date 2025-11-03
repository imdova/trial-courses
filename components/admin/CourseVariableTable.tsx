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

export interface CourseVariable {
  id: string;
  name: string;
  value: string;
  type: "courseType" | "programType" | "currency" | "language" | "courseLevel";
  priority: number;
  isActive: boolean;
}

interface CourseVariableTableProps {
  variables: CourseVariable[];
  onEdit: (variable: CourseVariable) => void;
  onDelete: (variable: CourseVariable) => void;
  onToggleStatus: (variable: CourseVariable) => void;
}

export default function CourseVariableTable({
  variables,
  onEdit,
  onDelete,
  onToggleStatus,
}: CourseVariableTableProps) {
  const [typeFilter, setTypeFilter] = useState<"all" | "courseType" | "programType" | "currency" | "language" | "courseLevel">("all");

  const filteredVariables = variables
    .filter((v) => typeFilter === "all" || v.type === typeFilter)
    .sort((a, b) => a.priority - b.priority);

  const getTypeLabel = (type: CourseVariable["type"]) => {
    const labels = {
      courseType: "Course Type",
      programType: "Program Type",
      currency: "Currency",
      language: "Language",
      courseLevel: "Course Level",
    };
    return labels[type];
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle>Course Variables</CardTitle>
            <CardDescription>
              Manage course types, program types, currencies, languages, and course levels
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
              variant={typeFilter === "courseType" ? "default" : "outline"}
              size="sm"
              onClick={() => setTypeFilter("courseType")}
            >
              Course Types
            </Button>
            <Button
              variant={typeFilter === "programType" ? "default" : "outline"}
              size="sm"
              onClick={() => setTypeFilter("programType")}
            >
              Program Types
            </Button>
            <Button
              variant={typeFilter === "currency" ? "default" : "outline"}
              size="sm"
              onClick={() => setTypeFilter("currency")}
            >
              Currencies
            </Button>
            <Button
              variant={typeFilter === "language" ? "default" : "outline"}
              size="sm"
              onClick={() => setTypeFilter("language")}
            >
              Languages
            </Button>
            <Button
              variant={typeFilter === "courseLevel" ? "default" : "outline"}
              size="sm"
              onClick={() => setTypeFilter("courseLevel")}
            >
              Course Levels
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
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredVariables.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    No course variables found
                  </TableCell>
                </TableRow>
              ) : (
                filteredVariables.map((variable) => (
                  <TableRow key={variable.id}>
                    <TableCell className="font-medium">{variable.priority}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={
                          variable.type === "courseType" ? "info" : 
                          variable.type === "programType" ? "premium" : 
                          variable.type === "currency" ? "default" :
                          variable.type === "language" ? "secondary" :
                          "outline"
                        }
                      >
                        {getTypeLabel(variable.type)}
                      </Badge>
                    </TableCell>
                    <TableCell>{variable.name}</TableCell>
                    <TableCell>
                      <code className="rounded bg-gray-100 px-2 py-1 text-xs">
                        {variable.value}
                      </code>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={variable.isActive}
                          onCheckedChange={() => onToggleStatus(variable)}
                        />
                        <Badge variant={variable.isActive ? "success" : "destructive"}>
                          {variable.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => onEdit(variable)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => onDelete(variable)}
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


