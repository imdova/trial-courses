"use client";

import React, { useEffect, useState, useCallback, useMemo } from "react";
import { IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@/components/FormModal/fields/TextField";

// Types
type SkillData = {
  id: string;
  name: string;
};

type UserProfile = {
  id: string;
  userName: string;
};

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

// Mock Hooks
const useUpdateApi = () => {
  return {
    update: async (
      url: string,
      options: { method: string; body?: SkillData }
    ) => {
      console.log("API Called:", url, options);
    },
  };
};

const dummySkills: SkillData[] = [
  { id: "1", name: "React" },
  { id: "2", name: "TypeScript" },
  { id: "3", name: "Node.js" },
];

const SkillsSection: React.FC<{
  user: UserProfile;
  isMe: boolean;
}> = ({ isMe }) => {
  const { update } = useUpdateApi();
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

  useEffect(() => {
    debouncedInit(dummySkills);
  }, [debouncedInit]);

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

      setSkills((prev) => [...prev, skill]);
      setValue("");
      await update("FAKE_API_CREATE", { method: "POST", body: skill });
    }
  };

  const onDelete = async (id: string) => {
    setSkills((prev) => prev.filter((x) => x.id !== id));
    await update("FAKE_API_DELETE/" + id, { method: "DELETE" });
  };

  function shake(name: string) {
    setIsShake(name);
    setTimeout(() => setIsShake(null), 500);
  }

  if (!isMe && skills.length === 0) return null;

  return (
    <div className="mt-5 w-full rounded-lg border border-gray-200 bg-white p-4 ">
      <div className="flex flex-col items-center justify-between md:flex-row">
        <h3 className="text-xl font-semibold text-main">Skills</h3>

        {isMe && (
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
        )}
      </div>

      <div className="mt-3 flex flex-wrap">
        {skills.map((item) => (
          <div
            key={item.id}
            className={`${isMe ? "" : "pr-4"} ${
              isShake === item.name
                ? "animate-shake border-red-400"
                : "border-green-200"
            } mb-2 mr-2 flex gap-2 items-center rounded-full border bg-green-50 px-3 py-1 text-primary`}
          >
            <span className="text-sm">{item.name}</span>
            {isMe && (
              <IconButton
                size="small"
                className="ml-2 text-sm"
                onClick={() => onDelete(item.id)}
              >
                <CloseIcon className="h-2 w-2 text-primary" />
              </IconButton>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const DemoPage = ({ user, isMe }: { user: UserProfile; isMe: boolean }) => {
  return (
    <div>
      <SkillsSection user={user} isMe={isMe} />
    </div>
  );
};

export default DemoPage;
