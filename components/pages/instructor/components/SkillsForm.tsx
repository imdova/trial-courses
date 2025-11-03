"use client";

import FormModal from "@/components/FormModal/FormModal";
import IconButton from "@/components/UI/Buttons/IconButton";
import { FieldConfig } from "@/types/forms";
import { Plus, X } from "lucide-react"; // Removed Star as proficiency is removed
import { useState, useEffect } from "react";

interface SkillsFormProps {
  skills: string[]; // Changed to string array
  isMe: boolean;
}

const SkillsForm: React.FC<SkillsFormProps> = ({ skills, isMe }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // currentSkills now stores an array of strings
  const [currentSkills, setCurrentSkills] = useState<string[]>(skills || []);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  // Effect to update currentSkills if the skills prop changes externally
  useEffect(() => {
    setCurrentSkills(skills || []);
  }, [skills]);

  // Skill fields for the modal are simplified to just the skill name
  const skillFields: FieldConfig[] = [
    {
      name: "skillName", // Changed name to avoid conflict with 'name' property if Skill was an object
      type: "text",
      label: "Skill Name*",
      required: true,
      textFieldProps: {
        placeholder: "e.g. JavaScript, Public Speaking",
      },
    },
    // Proficiency field is removed
  ];

  // handleAddOrUpdateSkill now expects a string for the skill
  const handleAddOrUpdateSkill = (formData: { skillName: string }) => {
    setIsLoading(true);
    const skillToAdd = formData.skillName;

    if (editingIndex !== null) {
      // Update existing skill
      const updated = [...currentSkills];
      updated[editingIndex] = skillToAdd;
      setCurrentSkills(updated);
    } else {
      // Add new skill
      setCurrentSkills([...currentSkills, skillToAdd]);
    }
    setEditingIndex(null);
    setIsModalOpen(false);
    setIsLoading(false); // End loading after update
  };

  const handleDeleteSkill = (index: number) => {
    const updated = currentSkills.filter((_, i) => i !== index);
    setCurrentSkills(updated);
  };

  // renderProficiencyStars is no longer relevant and is removed

  return (
    <div className="w-full">
      <div className="border bg-white rounded-xl p-4 mb-4 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Skills</h2>
          {isMe && currentSkills.length > 0 && (
            <IconButton
              className="!text-gray-500 border border-gray-200 !rounded-md"
              Icon={Plus}
              onClick={() => {
                setEditingIndex(null);
                setIsModalOpen(true);
              }}
              aria-label="Add new skill"
            />
          )}
        </div>

        {currentSkills.length > 0 ? (
          <ul className="flex gap-3 flex-wrap">
            {currentSkills.map((skill, index) => (
              <li
                key={index}
                className="flex gap-2 bg-green-50 items-center border border-green-200 justify-between w-fit p-2 rounded-lg" // Adjusted styling for simpler display
              >
                <div className="flex-1">
                  <h3 className="font-semibold text-xs md:text-sm">{skill}</h3>{" "}
                  {/* Displaying just the skill name */}
                </div>
                {isMe && (
                  <div className="flex gap-2">
                    {/* Trash2 icon import is missing, assuming it's available or will be added */}
                    <button
                      onClick={() => handleDeleteSkill(index)}
                      className="text-green-500 hover:text-green-700"
                      aria-label="Delete skill"
                    >
                      <X size={16} />
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        ) : isMe ? (
          <div className="flex flex-col items-center justify-center py-8">
            <IconButton
              className="!text-gray-500 border border-gray-200 !rounded-md mb-4"
              Icon={Plus}
              onClick={() => {
                setEditingIndex(null);
                setIsModalOpen(true);
              }}
              aria-label="Add first skill"
            />
            <p className="text-gray-500 text-xs">No skills added yet</p>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            No skills available
          </div>
        )}
      </div>

      <FormModal
        open={isModalOpen}
        loading={isLoading}
        onClose={() => {
          setIsModalOpen(false);
          setEditingIndex(null);
        }}
        onSubmit={handleAddOrUpdateSkill}
        fields={skillFields}
        title={editingIndex !== null ? "Edit Skill" : "Add New Skill"}
        initialValues={{
          skillName: editingIndex !== null ? currentSkills[editingIndex] : "", // Initial value is just the skill string
        }}
      />
    </div>
  );
};

export default SkillsForm;
