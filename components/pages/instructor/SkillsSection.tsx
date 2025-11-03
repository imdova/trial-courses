"use client";

import React, { useEffect, useState, useCallback, useMemo } from "react";
import { IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@/components/FormModal/fields/TextField";
import { useSession } from "next-auth/react";
import { useProfile } from "@/hooks/useProfile";

// Types
type SkillData = {
  id: string;
  name: string;
};

// (legacy) UserProfile type no longer used here

function debounce<T extends (...args: unknown[]) => void>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timer: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
}

const SkillsSection: React.FC = () => {
  const { data: session } = useSession();
  const { profile, getProfile, saveProfile } = useProfile();
  const [skills, setSkills] = useState<SkillData[]>([]);
  const [value, setValue] = useState("");
  const [isShake, setIsShake] = useState<string | null>(null);
  // Your init function

  const init = useCallback((data?: SkillData[]) => {
    if (data) {
      setSkills(data);
    }
  }, []);

  const debouncedInit = useMemo(() => {
    return debounce(
      ((data?: SkillData[]) => {
        init(data);
      }) as (...args: unknown[]) => void,
      500
    );
  }, [init]);

  // Load skills from profile metadata
  useEffect(() => {
    const userId = session?.user?.id as string | undefined;
    if (userId && !profile) {
      getProfile(userId);
    }
  }, [session, profile, getProfile]);

  useEffect(() => {
    if (!profile?.metadata) return;
    try {
      const metadata =
        typeof profile.metadata === "string"
          ? JSON.parse(profile.metadata)
          : profile.metadata;
      const list: string[] = Array.isArray(metadata?.skills)
        ? metadata.skills
        : [];
      const mapped: SkillData[] = list.map((name, idx) => ({
        id: String(idx),
        name: String(name),
      }));
      debouncedInit(mapped);
    } catch {
      debouncedInit([]);
    }
  }, [profile, debouncedInit]);

  const addSkill = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (value.trim() && skills.length < 12) {
      const isDuplicated = skills.find((skill) => skill.name === value);
      if (isDuplicated) {
        return shake(isDuplicated.name);
      }

      const skill: SkillData = {
        id: Math.random().toString(36).substring(2, 9),
        name: value,
      };

      const newSkills = [...skills, skill];
      setSkills(newSkills);
      setValue("");

      // Persist to profile metadata
      const userId = session?.user?.id as string | undefined;
      if (!userId) return;
      const existingMetadata = profile?.metadata
        ? (typeof profile.metadata === "string"
            ? JSON.parse(profile.metadata)
            : profile.metadata)
        : {};
      const names = newSkills.map((s) => s.name);
      const updatedMetadata = { ...existingMetadata, skills: names };
      await saveProfile(userId, { metadata: updatedMetadata });
    }
  };

  const onDelete = async (id: string) => {
    const newSkills = skills.filter((x) => x.id !== id);
    setSkills(newSkills);

    const userId = session?.user?.id as string | undefined;
    if (!userId) return;
    const existingMetadata = profile?.metadata
      ? (typeof profile.metadata === "string"
          ? JSON.parse(profile.metadata)
          : profile.metadata)
      : {};
    const names = newSkills.map((s) => s.name);
    const updatedMetadata = { ...existingMetadata, skills: names };
    await saveProfile(userId, { metadata: updatedMetadata });
  };

  function shake(name: string) {
    setIsShake(name);
    setTimeout(() => setIsShake(null), 500);
  }

  // Always render; hide add/delete controls if needed in future

  return (
    <div className="mt-5 w-full rounded-lg border border-gray-200 bg-white p-4 ">
      <div className="flex flex-col items-center justify-between md:flex-row">
        <h3 className="text-xl font-semibold text-main">Skills</h3>

        <form className="flex gap-2" onSubmit={addSkill}>
          <TextField
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="m-0 outline-none"
            placeholder={
              skills.length >= 12 ? "Maximum Entry 12 skills" : "Enter skill"
            }
            disabled={skills.length >= 12}
          />
          <IconButton type="submit" disabled={skills.length >= 12}>
            <AddIcon />
          </IconButton>
        </form>
      </div>

      <div className="mt-3 flex flex-wrap">
        {skills.map((item) => (
          <div
            key={item.id}
            className={`pr-4 ${
              isShake === item.name
                ? "animate-shake border-red-400"
                : "border-green-200"
            } mb-2 mr-2 flex gap-2 items-center rounded-full border bg-green-50 px-3 py-1 text-primary`}
          >
            <span className="text-sm">{item.name}</span>
            <IconButton
              size="small"
              className="ml-2 text-sm"
              onClick={() => onDelete(item.id)}
            >
              <CloseIcon className="h-2 w-2 text-primary" />
            </IconButton>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsSection;
