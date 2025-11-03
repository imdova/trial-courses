/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useProfile } from "@/hooks/useProfile";
import { Button } from "@/components/UI/button";
import { Card, CardContent, CardHeader, CardTitle, CardAction } from "@/components/UI/card";
import { Pen, Globe } from "lucide-react";
import LanguageModal from "./LanguageModal";

interface LanguageSectionProps {
  user?: InstructorData;
}

interface Language {
  name: string;
  proficiency: string;
}

const LanguageSection: React.FC<LanguageSectionProps> = ({ user }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [languages, setLanguages] = useState<Language[]>([]);
  const [isUpdating, setIsUpdating] = useState(false);

  const { data: session } = useSession();
  const { profile, saveProfile, updating, updateError } = useProfile();

  // Initialize languages from user prop or profile
  useEffect(() => {
    const userData = user || profile;
    if (userData?.languages) {
      // Map the API structure to the component structure
      const mappedLanguages = userData.languages.map((lang: any) => ({
        name: lang.language || lang.name,
        proficiency: (lang.level || lang.proficiency)?.toLowerCase() || "",
      }));
      setLanguages(mappedLanguages);
    } else {
      setLanguages([]);
    }
  }, [user, profile]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveLanguages = async (newLanguages: Language[]) => {
    try {
      setIsUpdating(true);

      if (session?.user?.id) {
        const userId = session.user.id;

        // Map the component structure back to API structure
        const apiLanguages = newLanguages.map((lang) => ({
          language: lang.name,
          level: lang.proficiency.charAt(0).toUpperCase() + lang.proficiency.slice(1),
        }));

        // Send only the languages data to the API
        const profileData = {
          languages: apiLanguages,
        };

        // Save to API
        await saveProfile(userId, profileData);

        // Update local state
        setLanguages(newLanguages);

        console.log("Languages updated successfully");
      }
    } catch (error) {
      console.error("Error updating languages:", error);
    } finally {
      setIsUpdating(false);
      setIsModalOpen(false);
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Languages</CardTitle>
          <CardAction>
            <Button
              size="icon"
              variant="outline"
              onClick={handleOpenModal}
              disabled={isUpdating || updating}
            >
              <Pen className="text-muted-foreground" />
            </Button>
          </CardAction>
        </CardHeader>

        <CardContent className="space-y-2">

          {languages.map((language, index) => (
              <div key={index} className="flex items-center">
                <Globe className="mr-2 size-5 inline-block text-primary" />
                <p className="text-muted-foreground text-sm">
                  <span className="font-semibold text-foreground">
                    {language.name}:
                  </span>{" "}
                  {language.proficiency.charAt(0).toUpperCase() + language.proficiency.slice(1)}
                </p>
              </div>
            ))}
        </CardContent>
      </Card>

      <LanguageModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        languages={languages}
        onSave={handleSaveLanguages}
      />
    </>
  );
};

export default LanguageSection;
