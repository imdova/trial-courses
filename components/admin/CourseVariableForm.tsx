"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/UI/card";
import { Input } from "@/components/UI/input";
import { Label } from "@/components/UI/label";
import { Button } from "@/components/UI/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/UI/select";
import { Plus } from "lucide-react";

interface CourseVariableFormProps {
  onSubmit: (data: { 
    name: string; 
    value: string; 
    type: "courseType" | "programType" | "currency" | "language" | "courseLevel";
    priority: number;
  }) => void;
}

export default function CourseVariableForm({ onSubmit }: CourseVariableFormProps) {
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [type, setType] = useState<"courseType" | "programType" | "currency" | "language" | "courseLevel">("courseType");
  const [priority, setPriority] = useState(1);

  const handleValueChange = (nameValue: string) => {
    setName(nameValue);
    // Auto-generate value from name (lowercase, replace spaces with underscores)
    const generatedValue = nameValue
      .toLowerCase()
      .replace(/\s+/g, "_")
      .replace(/[^a-z0-9_]/g, "");
    setValue(generatedValue);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, value, type, priority });
    // Reset form
    setName("");
    setValue("");
    setType("courseType");
    setPriority(1);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add Course Variable</CardTitle>
        <CardDescription>
          Add new course types, program types, currencies, languages, or course levels
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="variable-type">Variable Type *</Label>
              <Select
                value={type}
                onValueChange={(value) => setType(value as "courseType" | "programType" | "currency" | "language" | "courseLevel")}
              >
                <SelectTrigger id="variable-type">
                  <SelectValue placeholder="Select variable type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="courseType">Course Type</SelectItem>
                  <SelectItem value="programType">Program Type</SelectItem>
                  <SelectItem value="currency">Currency</SelectItem>
                  <SelectItem value="language">Language</SelectItem>
                  <SelectItem value="courseLevel">Course Level</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority">Priority *</Label>
              <Input
                id="priority"
                type="number"
                min="1"
                value={priority}
                onChange={(e) => setPriority(Number(e.target.value))}
                placeholder="e.g., 1"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="variable-name">Display Name *</Label>
              <Input
                id="variable-name"
                value={name}
                onChange={(e) => handleValueChange(e.target.value)}
                placeholder="e.g., Recorded, Live, Hybrid"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="variable-value">Value *</Label>
              <Input
                id="variable-value"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="e.g., recorded, live, hybrid"
                required
              />
              <p className="text-xs text-gray-500">
                Auto-generated from name (editable)
              </p>
            </div>
          </div>

          <Button type="submit" className="w-full md:w-auto">
            <Plus className="mr-2 h-4 w-4" />
            Add Variable
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}


