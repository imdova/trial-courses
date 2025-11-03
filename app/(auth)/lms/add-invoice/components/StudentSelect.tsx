"use client";

import React from "react";
import { ChevronDown, Check } from "lucide-react";
import {
  FieldValues,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
  Path,
  PathValue,
} from "react-hook-form";
import Image from "next/image";
import { StudentProfile } from "@/types/courses";

interface StudentSelectProps<TFormValues extends FieldValues> {
  name: Path<TFormValues>;
  register: UseFormRegister<TFormValues>;
  setValue: UseFormSetValue<TFormValues>;
  watch: UseFormWatch<TFormValues>;
  students: StudentProfile[];
  placeholder?: string;
}

const StudentSelect = <TFormValues extends FieldValues>({
  name,
  register,
  setValue,
  watch,
  students,
  placeholder = "Select a student",
}: StudentSelectProps<TFormValues>) => {
  const selectedStudent = watch(name) as StudentProfile | undefined;
  const [open, setOpen] = React.useState(false);

  return (
    <div className="relative w-full ">
      <input type="hidden" {...register(name)} />
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full border border-gray-200 rounded-lg p-2 flex justify-between items-center text-sm text-gray-700 shadow-xs "
      >
        <div className="flex items-center gap-3">
          <Image
            className="w-8 h-8 object-cover rounded-full"
            src={selectedStudent?.avatar ?? "/images/placeholder-avatar.svg"}
            width={200}
            height={200}
            alt={selectedStudent?.name ?? "student name"}
          />
          <div className="flex flex-col items-start ">
            <h2 className="text-sm font-semibold">
              {selectedStudent?.name || placeholder}
            </h2>
            <p className="text-xs text-muted-foreground">{selectedStudent?.email}</p>
          </div>
        </div>
        <ChevronDown className="w-4 h-4 text-gray-500" />
      </button>

      {open && (
        <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto">
          {students.map((student) => (
            <li
              key={student.id}
              onClick={() => {
                setValue(
                  name,
                  student as PathValue<TFormValues, Path<TFormValues>>
                );
                setOpen(false);
              }}
              className={`px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 flex justify-between ${
                student.id === selectedStudent?.id
                  ? "bg-gray-100 font-medium"
                  : ""
              }`}
            >
              <div className="flex items-center gap-2">
                <Image
                  className="w-8 h-8 object-cover rounded-full"
                  src={student.avatar}
                  width={200}
                  height={200}
                  alt={student.name}
                />
                <div>
                  <h2 className="text-sm font-semibold">{student.name}</h2>
                  <p className="text-xs text-muted-foreground">{student.email}</p>
                </div>
              </div>
              {student.id === selectedStudent?.id && (
                <Check className="w-4 h-4 text-green-600" />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default StudentSelect;
