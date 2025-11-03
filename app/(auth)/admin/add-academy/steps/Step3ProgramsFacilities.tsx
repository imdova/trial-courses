"use client";

import { AcademyFormData } from "@/types/forms";
import { Plus, X } from "lucide-react";
import {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";

interface Step3ProgramsFacilitiesProps {
  register: UseFormRegister<AcademyFormData>;
  errors: FieldErrors<AcademyFormData>;
  watch: UseFormWatch<AcademyFormData>;
  setValue: UseFormSetValue<AcademyFormData>;
  specialityInput: string;
  setSpecialityInput: (value: string) => void;
  programInput: string;
  setProgramInput: (value: string) => void;
  facilityInput: string;
  setFacilityInput: (value: string) => void;
  requirementInput: string;
  setRequirementInput: (value: string) => void;
}

export default function Step3ProgramsFacilities({
  register,
  errors,
  watch,
  setValue,
  specialityInput,
  setSpecialityInput,
  programInput,
  setProgramInput,
  facilityInput,
  setFacilityInput,
  requirementInput,
  setRequirementInput,
}: Step3ProgramsFacilitiesProps) {
  const specialities = watch("speciality");
  const programs = watch("programsOffered");
  const facilities = watch("facilities");
  const requirements = watch("admissionRequirements");

  const addSpeciality = () => {
    if (
      specialityInput.trim() &&
      !specialities.includes(specialityInput.trim())
    ) {
      setValue("speciality", [...specialities, specialityInput.trim()]);
      setSpecialityInput("");
    }
  };

  const removeSpeciality = (index: number) => {
    const updated = [...specialities];
    updated.splice(index, 1);
    setValue("speciality", updated);
  };

  const addProgram = () => {
    if (programInput.trim() && !programs.includes(programInput.trim())) {
      setValue("programsOffered", [...programs, programInput.trim()]);
      setProgramInput("");
    }
  };

  const removeProgram = (index: number) => {
    const updated = [...programs];
    updated.splice(index, 1);
    setValue("programsOffered", updated);
  };

  const addFacility = () => {
    if (facilityInput.trim() && !facilities.includes(facilityInput.trim())) {
      setValue("facilities", [...facilities, facilityInput.trim()]);
      setFacilityInput("");
    }
  };

  const removeFacility = (index: number) => {
    const updated = [...facilities];
    updated.splice(index, 1);
    setValue("facilities", updated);
  };

  const addRequirement = () => {
    if (
      requirementInput.trim() &&
      !requirements.includes(requirementInput.trim())
    ) {
      setValue("admissionRequirements", [
        ...requirements,
        requirementInput.trim(),
      ]);
      setRequirementInput("");
    }
  };

  const removeRequirement = (index: number) => {
    const updated = [...requirements];
    updated.splice(index, 1);
    setValue("admissionRequirements", updated);
  };

  return (
    <div className="space-y-6">
      <h2 className="border-b pb-2 text-xl font-semibold text-gray-800">
        Programs & Facilities
      </h2>

      <div>
        <label
          htmlFor="about"
          className="block text-sm font-medium text-gray-700"
        >
          About Academy *
        </label>
        <textarea
          id="about"
          rows={4}
          {...register("about")}
          className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm sm:text-sm"
        />
        {errors.about && (
          <p className="mt-1 text-xs text-red-600">{errors.about.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Specialities *
        </label>
        <div className="mt-1 flex gap-2">
          <input
            type="text"
            value={specialityInput}
            onChange={(e) => setSpecialityInput(e.target.value)}
            className="block w-full rounded-md border border-gray-300 p-2 shadow-sm sm:text-sm"
            placeholder="Add a speciality"
          />
          <button
            type="button"
            onClick={addSpeciality}
            className="bg-primary inline-flex items-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white shadow-sm focus:outline-none"
          >
            <Plus size={15} />
          </button>
        </div>
        {errors.speciality && (
          <p className="mt-1 text-xs text-red-600">
            {errors.speciality.message}
          </p>
        )}

        <div className="mt-2 flex flex-wrap gap-2">
          {specialities.map((spec: string, index: number) => (
            <span
              key={index}
              className="bg-primary-foreground text-primary border-primary inline-flex items-center rounded-md border px-3 py-2 text-xs font-medium"
            >
              {spec}
              <button
                type="button"
                onClick={() => removeSpeciality(index)}
                className="ml-1.5 flex-shrink-0 cursor-pointer rounded-full focus:outline-none"
              >
                <X size={15} />
              </button>
            </span>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Programs Offered *
        </label>
        <div className="mt-1 flex gap-2">
          <input
            type="text"
            value={programInput}
            onChange={(e) => setProgramInput(e.target.value)}
            className="block w-full rounded-md border border-gray-300 p-2 shadow-sm sm:text-sm"
            placeholder="Add a program"
          />
          <button
            type="button"
            onClick={addProgram}
            className="bg-primary inline-flex items-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white shadow-sm focus:outline-none"
          >
            <Plus size={15} />
          </button>
        </div>
        {errors.programsOffered && (
          <p className="mt-1 text-xs text-red-600">
            {errors.programsOffered.message}
          </p>
        )}

        <ul className="mt-2 list-inside list-disc">
          {programs.map((program: string, index: number) => (
            <li
              key={index}
              className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-3 text-sm"
            >
              {program}
              <button
                type="button"
                onClick={() => removeProgram(index)}
                className="cursor-pointer text-red-600 hover:text-red-800"
              >
                <X size={15} />
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Facilities *
        </label>
        <div className="mt-1 flex gap-2">
          <input
            type="text"
            value={facilityInput}
            onChange={(e) => setFacilityInput(e.target.value)}
            className="block w-full rounded-md border border-gray-300 p-2 shadow-sm sm:text-sm"
            placeholder="Add a facility"
          />
          <button
            type="button"
            onClick={addFacility}
            className="bg-primary inline-flex items-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white shadow-sm focus:outline-none"
          >
            <Plus size={15} />
          </button>
        </div>
        {errors.facilities && (
          <p className="mt-1 text-xs text-red-600">
            {errors.facilities.message}
          </p>
        )}

        <ul className="mt-2 list-inside list-disc">
          {facilities.map((facility: string, index: number) => (
            <li
              key={index}
              className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-3 text-sm"
            >
              {facility}
              <button
                type="button"
                onClick={() => removeFacility(index)}
                className="cursor-pointer text-red-600 hover:text-red-800"
              >
                <X size={15} />
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Admission Requirements *
        </label>
        <div className="mt-1 flex gap-2">
          <input
            type="text"
            value={requirementInput}
            onChange={(e) => setRequirementInput(e.target.value)}
            className="block w-full rounded-md border border-gray-300 p-2 shadow-sm sm:text-sm"
            placeholder="Add a requirement"
          />
          <button
            type="button"
            onClick={addRequirement}
            className="bg-primary inline-flex items-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white shadow-sm focus:outline-none"
          >
            <Plus size={15} />
          </button>
        </div>
        {errors.admissionRequirements && (
          <p className="mt-1 text-xs text-red-600">
            {errors.admissionRequirements.message}
          </p>
        )}

        <ul className="mt-2 list-inside list-disc">
          {requirements.map((requirement: string, index: number) => (
            <li
              key={index}
              className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-3 text-sm"
            >
              {requirement}
              <button
                type="button"
                onClick={() => removeRequirement(index)}
                className="cursor-pointer text-red-600 hover:text-red-800"
              >
                <X size={15} />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
