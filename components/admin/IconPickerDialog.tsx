"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/UI/dialog";
import { Button } from "@/components/UI/button";
import { Input } from "@/components/UI/input";
import { ScrollArea } from "@/components/UI/scroll-area";
import * as Icons from "lucide-react";

// Popular icons for categories
const CATEGORY_ICONS = [
  "BookOpen",
  "GraduationCap",
  "Library",
  "School",
  "Award",
  "Brain",
  "Briefcase",
  "Building",
  "Calendar",
  "Camera",
  "ChartBar",
  "CheckCircle",
  "Clock",
  "Code",
  "Coffee",
  "Compass",
  "Computer",
  "CreditCard",
  "Database",
  "FileText",
  "Film",
  "Flag",
  "FolderOpen",
  "Gift",
  "Globe",
  "Heart",
  "Home",
  "Image",
  "Info",
  "Laptop",
  "Layers",
  "Layout",
  "Lightbulb",
  "Link",
  "List",
  "Lock",
  "Mail",
  "Map",
  "MessageCircle",
  "Monitor",
  "Music",
  "Package",
  "Palette",
  "PenTool",
  "Phone",
  "PieChart",
  "Play",
  "Printer",
  "Radio",
  "Rocket",
  "Search",
  "Settings",
  "Share",
  "ShoppingBag",
  "ShoppingCart",
  "Smartphone",
  "Speaker",
  "Star",
  "Tag",
  "Target",
  "Terminal",
  "TrendingUp",
  "Trophy",
  "Truck",
  "Tv",
  "Umbrella",
  "Upload",
  "User",
  "Users",
  "Video",
  "Wallet",
  "Watch",
  "Wifi",
  "Zap",
];

interface IconPickerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectIcon: (iconName: string) => void;
  currentIcon?: string;
}

export default function IconPickerDialog({
  open,
  onOpenChange,
  onSelectIcon,
  currentIcon,
}: IconPickerDialogProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredIcons = CATEGORY_ICONS.filter((iconName) =>
    iconName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectIcon = (iconName: string) => {
    onSelectIcon(iconName);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Select an Icon</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Search Input */}
          <Input
            placeholder="Search icons..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {/* Icons Grid */}
          <ScrollArea className="h-96 w-full rounded-md border p-4">
            <div className="grid grid-cols-8 gap-2">
              {filteredIcons.map((iconName) => {
                const IconComponent = Icons[iconName as keyof typeof Icons] as React.ComponentType<{ className?: string }>;
                const isSelected = currentIcon === iconName;

                return (
                  <Button
                    key={iconName}
                    type="button"
                    variant={isSelected ? "default" : "outline"}
                    className="h-16 w-16 p-2"
                    onClick={() => handleSelectIcon(iconName)}
                    title={iconName}
                  >
                    {IconComponent && <IconComponent className="h-6 w-6" />}
                  </Button>
                );
              })}
            </div>
          </ScrollArea>

          {/* Selected Icon Display */}
          {currentIcon && (
            <div className="flex items-center gap-2 rounded-md border p-3">
              <span className="text-sm text-gray-600">Current Icon:</span>
              {(() => {
                const IconComponent = Icons[currentIcon as keyof typeof Icons] as React.ComponentType<{ className?: string }>;
                return IconComponent ? <IconComponent className="h-5 w-5" /> : null;
              })()}
              <span className="text-sm font-medium">{currentIcon}</span>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

