"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/UI/button";
import { Input } from "@/components/UI/input";
import { Label } from "@/components/UI/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/UI/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/UI/select";
import { Loader2 } from "lucide-react";
import { CourseVariable } from "./CourseVariableTable";

interface CourseVariableEditModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  variable: CourseVariable | null;
  loading?: boolean;
  onSubmit?: (data: {
    name: string;
    value: string;
    type: "courseType" | "programType" | "currency" | "language" | "courseLevel";
    priority: number;
  }) => void;
}

export default function CourseVariableEditModal({
  open,
  onOpenChange,
  variable,
  loading,
  onSubmit,
}: CourseVariableEditModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    value: "",
    type: "courseType" as "courseType" | "programType" | "currency" | "language" | "courseLevel",
    priority: 1,
  });

  useEffect(() => {
    if (variable) {
      setFormData({
        name: variable.name || "",
        value: variable.value || "",
        type: variable.type || "courseType",
        priority: variable.priority || 1,
      });
    }
  }, [variable]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(formData);
  };

  const handleInputChange = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNameChange = (nameValue: string) => {
    setFormData((prev) => ({
      ...prev,
      name: nameValue,
      value: nameValue
        .toLowerCase()
        .replace(/\s+/g, "_")
        .replace(/[^a-z0-9_]/g, ""),
    }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Edit Course Variable
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="type">
                Variable Type <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.type}
                onValueChange={(value) => handleInputChange("type", value)}
              >
                <SelectTrigger id="type" className="h-12">
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
              <Label htmlFor="priority">
                Priority <span className="text-red-500">*</span>
              </Label>
              <Input
                id="priority"
                type="number"
                min="1"
                placeholder="Enter priority"
                value={formData.priority}
                onChange={(e) => handleInputChange("priority", Number(e.target.value))}
                required
                className="h-12"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">
                Display Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                placeholder="e.g., Recorded, Live"
                value={formData.name}
                onChange={(e) => handleNameChange(e.target.value)}
                required
                className="h-12"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="value">
                Value <span className="text-red-500">*</span>
              </Label>
              <Input
                id="value"
                placeholder="e.g., recorded, live"
                value={formData.value}
                onChange={(e) => handleInputChange("value", e.target.value)}
                required
                className="h-12"
              />
              <p className="text-xs text-gray-500">
                Auto-generated from name (editable)
              </p>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-3 border-t pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-green-600 hover:bg-green-700"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                "Update Variable"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}


