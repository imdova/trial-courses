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

interface InstructorSettingsFormProps {
  onSubmit: (data: { 
    name: string; 
    value: string; 
    type: "degree" | "category" | "specialization" | "language" | "proficiencyLevel";
    priority: number;
    parentId?: string;
  }) => void;
  categories?: Array<{ id: string; name: string }>;
}

export default function InstructorSettingsForm({ onSubmit, categories = [] }: InstructorSettingsFormProps) {
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [type, setType] = useState<"degree" | "category" | "specialization" | "language" | "proficiencyLevel">("degree");
  const [priority, setPriority] = useState(1);
  const [parentId, setParentId] = useState("");

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
    onSubmit({ 
      name, 
      value, 
      type, 
      priority,
      ...(type === "specialization" && parentId ? { parentId } : {})
    });
    // Reset form
    setName("");
    setValue("");
    setType("degree");
    setPriority(1);
    setParentId("");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add Instructor Setting</CardTitle>
        <CardDescription>
          Add new degrees, categories, specializations, languages, or proficiency levels
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="setting-type">Setting Type *</Label>
              <Select
                value={type}
                onValueChange={(value) => {
                  setType(value as typeof type);
                  setParentId(""); // Reset parent when type changes
                }}
              >
                <SelectTrigger id="setting-type">
                  <SelectValue placeholder="Select setting type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="degree">Degree</SelectItem>
                  <SelectItem value="category">Category</SelectItem>
                  <SelectItem value="specialization">Specialization</SelectItem>
                  <SelectItem value="language">Language</SelectItem>
                  <SelectItem value="proficiencyLevel">Proficiency Level</SelectItem>
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

          {type === "specialization" && (
            <div className="space-y-2">
              <Label htmlFor="parent-category">Parent Category *</Label>
              <Select value={parentId} onValueChange={setParentId} required>
                <SelectTrigger id="parent-category">
                  <SelectValue placeholder="Select a category first" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="setting-name">Display Name *</Label>
              <Input
                id="setting-name"
                value={name}
                onChange={(e) => handleValueChange(e.target.value)}
                placeholder="e.g., Bachelor, Medicine, English"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="setting-value">Value *</Label>
              <Input
                id="setting-value"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="e.g., bachelor, medicine, english"
                required
              />
              <p className="text-xs text-gray-500">
                Auto-generated from name (editable)
              </p>
            </div>
          </div>

          <Button type="submit" className="w-full md:w-auto">
            <Plus className="mr-2 h-4 w-4" />
            Add Setting
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

