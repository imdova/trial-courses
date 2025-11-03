"use client";

import { useState, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/UI/card";
import { Input } from "@/components/UI/input";
import { Label } from "@/components/UI/label";
import { Button } from "@/components/UI/button";
import { Textarea } from "@/components/UI/textarea";
import { Plus, FileSpreadsheet } from "lucide-react";

interface TagSetupFormProps {
  onSubmit: (data: { name: string; slug: string; description: string; color: string }) => void;
  onExcelUpload?: (file: File) => void;
}

const TAG_COLORS = [
  { name: "Blue", value: "#3B82F6" },
  { name: "Green", value: "#10B981" },
  { name: "Red", value: "#EF4444" },
  { name: "Yellow", value: "#F59E0B" },
  { name: "Purple", value: "#8B5CF6" },
  { name: "Pink", value: "#EC4899" },
  { name: "Indigo", value: "#6366F1" },
  { name: "Orange", value: "#F97316" },
];

export default function TagSetupForm({ onSubmit, onExcelUpload }: TagSetupFormProps) {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState(TAG_COLORS[0].value);
  const excelInputRef = useRef<HTMLInputElement>(null);

  const handleNameChange = (value: string) => {
    setName(value);
    // Auto-generate slug from name
    const generatedSlug = value
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
    setSlug(generatedSlug);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, slug, description, color });
    // Reset form
    setName("");
    setSlug("");
    setDescription("");
    setColor(TAG_COLORS[0].value);
  };

  const handleExcelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onExcelUpload) {
      onExcelUpload(file);
      e.target.value = ""; // Reset input
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle>Add New Tag</CardTitle>
            <CardDescription>
              Create tags to help organize and categorize courses
            </CardDescription>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => excelInputRef.current?.click()}
            className="gap-2"
          >
            <FileSpreadsheet className="h-4 w-4" />
            Upload Excel
          </Button>
        </div>
        
        {/* Hidden Excel file input */}
        <input
          ref={excelInputRef}
          type="file"
          accept=".xlsx,.xls"
          onChange={handleExcelChange}
          className="hidden"
        />
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="tag-name">Tag Name *</Label>
              <Input
                id="tag-name"
                value={name}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="e.g., Advanced, Beginner Friendly"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tag-slug">Slug *</Label>
              <Input
                id="tag-slug"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="e.g., advanced"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tag-description">Description</Label>
            <Textarea
              id="tag-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief description of this tag"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label>Tag Color *</Label>
            <div className="flex flex-wrap gap-2">
              {TAG_COLORS.map((colorOption) => (
                <button
                  key={colorOption.value}
                  type="button"
                  onClick={() => setColor(colorOption.value)}
                  className={`w-12 h-12 rounded-lg border-2 transition-all ${
                    color === colorOption.value
                      ? "border-gray-900 scale-110"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                  style={{ backgroundColor: colorOption.value }}
                  title={colorOption.name}
                />
              ))}
            </div>
            {color && (
              <div className="flex items-center gap-2 mt-2">
                <span className="text-sm text-gray-600">Selected:</span>
                <div
                  className="px-3 py-1 rounded-full text-white text-sm font-medium"
                  style={{ backgroundColor: color }}
                >
                  {name || "Sample Tag"}
                </div>
              </div>
            )}
          </div>

          <Button type="submit" className="w-full md:w-auto">
            <Plus className="w-4 h-4 mr-2" />
            Add Tag
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

