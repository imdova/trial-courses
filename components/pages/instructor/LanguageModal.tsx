"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/UI/dialog";
import { Button } from "@/components/UI/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/UI/select";
import { Trash2, X } from "lucide-react";

interface Language {
  name: string;
  proficiency: string;
}

interface LanguageModalProps {
  isOpen: boolean;
  onClose: () => void;
  languages: Language[];
  onSave: (languages: Language[]) => void;
}

const proficiencyLevels = [
  { value: "beginner", label: "Beginner" },
  { value: "elementary", label: "Elementary" },
  { value: "intermediate", label: "Intermediate" },
  { value: "upper-intermediate", label: "Upper Intermediate" },
  { value: "advanced", label: "Advanced" },
  { value: "proficient", label: "Proficient" },
  { value: "native", label: "Native" },
];

const availableLanguages = [
  "Arabic", "English", "French", "German", "Spanish", "Italian", 
  "Portuguese", "Russian", "Chinese", "Japanese", "Korean", 
  "Hindi", "Turkish", "Dutch", "Swedish", "Norwegian", "Danish",
  "Finnish", "Polish", "Czech", "Hungarian", "Romanian", "Greek",
  "Hebrew", "Thai", "Vietnamese", "Indonesian", "Malay", "Urdu"
];

const LanguageModal: React.FC<LanguageModalProps> = ({
  isOpen,
  onClose,
  languages,
  onSave,
}) => {
  const [localLanguages, setLocalLanguages] = useState<Language[]>([]);

  useEffect(() => {
    if (isOpen) {
      // Initialize with existing languages or default ones
      if (languages.length > 0) {
        setLocalLanguages([...languages]);
      } else {
        setLocalLanguages([{ name: "", proficiency: "" }]);
      }
    }
  }, [isOpen, languages]);

  const handleLanguageChange = (index: number, field: keyof Language, value: string) => {
    const updatedLanguages = [...localLanguages];
    updatedLanguages[index] = { ...updatedLanguages[index], [field]: value };
    setLocalLanguages(updatedLanguages);
  };

  const addLanguage = () => {
    setLocalLanguages([...localLanguages, { name: "", proficiency: "" }]);
  };

  const removeLanguage = (index: number) => {
    if (localLanguages.length > 1) {
      const updatedLanguages = localLanguages.filter((_, i) => i !== index);
      setLocalLanguages(updatedLanguages);
    }
  };

  const handleSave = () => {
    // Filter out empty languages
    const validLanguages = localLanguages.filter(
      (lang) => lang.name.trim() !== "" && lang.proficiency !== ""
    );
    onSave(validLanguages);
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[80vh] overflow-y-auto">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle className="text-lg font-semibold">
            Edit Your Languages
          </DialogTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-6 w-6 rounded-full"
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {localLanguages.map((language, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-foreground">
                  {language.name || `Language ${index + 1}`}
                </h3>
                {localLanguages.length > 1 && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeLanguage(index)}
                    className="h-6 w-6 text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>

              <div className="space-y-3">
                <Select
                  value={language.name}
                  onValueChange={(value) =>
                    handleLanguageChange(index, "name", value)
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Language" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableLanguages.map((lang) => (
                      <SelectItem key={lang} value={lang}>
                        {lang}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select
                  value={language.proficiency}
                  onValueChange={(value) =>
                    handleLanguageChange(index, "proficiency", value)
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Proficiency Level" />
                  </SelectTrigger>
                  <SelectContent>
                    {proficiencyLevels.map((level) => (
                      <SelectItem key={level.value} value={level.value}>
                        {level.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          ))}

          <div className="pt-2">
            <Button
              variant="outline"
              onClick={addLanguage}
              className="w-full"
              type="button"
            >
              Add Language
            </Button>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button variant="outline" onClick={handleCancel}>
            CANCEL
          </Button>
          <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
            SAVE
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LanguageModal;