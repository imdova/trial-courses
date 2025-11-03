"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/UI/dialog";
import { Input } from "@/components/UI/input";
import { Label } from "@/components/UI/label";
import { Button } from "@/components/UI/button";
import { Textarea } from "@/components/UI/textarea";
import { Tag } from "./TagsTable";

interface TagEditModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tag: Tag | null;
  loading?: boolean;
  onSubmit: (data: { name: string; slug: string; description: string; color: string }) => void;
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

export default function TagEditModal({
  open,
  onOpenChange,
  tag,
  loading,
  onSubmit,
}: TagEditModalProps) {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState(TAG_COLORS[0].value);

  useEffect(() => {
    if (tag) {
      setName(tag.name);
      setSlug(tag.slug);
      setDescription(tag.description);
      setColor(tag.color);
    }
  }, [tag]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, slug, description, color });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Tag</DialogTitle>
          <DialogDescription>
            Update the tag information below
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="edit-tag-name">Tag Name *</Label>
              <Input
                id="edit-tag-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Advanced"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-tag-slug">Slug *</Label>
              <Input
                id="edit-tag-slug"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="e.g., advanced"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-tag-description">Description</Label>
            <Textarea
              id="edit-tag-description"
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
                <span className="text-sm text-gray-600">Preview:</span>
                <div
                  className="px-3 py-1 rounded-full text-white text-sm font-medium"
                  style={{ backgroundColor: color }}
                >
                  {name || "Sample Tag"}
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Updating..." : "Update Tag"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

