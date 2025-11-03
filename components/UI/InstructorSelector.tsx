"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/UI/input";
import { Label } from "@/components/UI/label";
import { Search, User, Loader2 } from "lucide-react";
import { useInstructors } from "@/hooks/useInstructors";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/UI/Avatar";
import { Instructor } from "@/store/slices/instructors.slice";

interface InstructorSelectorProps {
  label?: string;
  value?: string;
  onChange?: (value: string) => void;
  required?: boolean;
  className?: string;
}

export default function InstructorSelector({
  label = "Instructor",
  value,
  onChange,
  required = false,
  className = ""
}: InstructorSelectorProps) {
  const [instructorSearch, setInstructorSearch] = useState("");
  const [showInstructorList, setShowInstructorList] = useState(false);
  const [selectedInstructor, setSelectedInstructor] = useState<Instructor | null>(null);

  const { instructors, loading, searchInstructors } = useInstructors();

  // If value is provided (editing mode), try to find the instructor
  useEffect(() => {
    if (value && !selectedInstructor) {
      const instructor = instructors.find((inst) => inst.id === value);
      if (instructor) {
        setSelectedInstructor(instructor);
        setInstructorSearch(`${instructor.profile.firstName} ${instructor.profile.lastName}`);
      }
    }
  }, [value, instructors, selectedInstructor]);

  // Debounced search
  useEffect(() => {
    if (instructorSearch.length >= 2 && !selectedInstructor) {
      const timer = setTimeout(() => {
        searchInstructors(instructorSearch, 20);
        setShowInstructorList(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [instructorSearch, searchInstructors, selectedInstructor]);

  const handleInstructorSelect = (instructor: Instructor) => {
    const instructorId = instructor.id;
    const instructorName = `${instructor.profile.firstName} ${instructor.profile.lastName}`;
    setSelectedInstructor(instructor);
    onChange?.(instructorId);
    setShowInstructorList(false);
    setInstructorSearch(instructorName);
  };

  const handleClear = () => {
    onChange?.("");
    setInstructorSearch("");
    setSelectedInstructor(null);
    setShowInstructorList(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setShowInstructorList(false);
    };
    if (showInstructorList) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [showInstructorList]);

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center gap-2">
        <User className="h-5 w-5 text-gray-600" />
        <h3 className="text-lg font-semibold text-gray-900">Instructor Assignment</h3>
      </div>
      
      <div className="space-y-4">
        <Label className="text-sm font-medium text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </Label>
        
        {/* Instructor Search */}
        <div className="relative" onClick={(e) => e.stopPropagation()}>
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
          <Input
            placeholder="Search instructors by name..."
            value={instructorSearch}
            onChange={(e) => setInstructorSearch(e.target.value)}
            onFocus={() => instructorSearch.length >= 2 && setShowInstructorList(true)}
            className="pl-10"
            disabled={!!selectedInstructor}
          />
          
          {/* Instructor Search Results */}
          {showInstructorList && instructorSearch.length >= 2 && (
            <div className="absolute z-10 mt-1 w-full rounded-md border border-gray-200 bg-white shadow-lg max-h-80 overflow-y-auto">
              {loading ? (
                <div className="flex items-center justify-center p-4">
                  <Loader2 className="h-5 w-5 animate-spin text-gray-400" />
                  <span className="ml-2 text-sm text-gray-500">Searching...</span>
                </div>
              ) : instructors.length > 0 ? (
                <div>
                  {instructors.map((instructor) => (
                    <button
                      key={instructor.id}
                      type="button"
                      onClick={() => handleInstructorSelect(instructor)}
                      className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center gap-3 border-b last:border-b-0"
                    >
                      <Avatar className="h-10 w-10">
                        <AvatarImage 
                          src={instructor.profile.photoUrl} 
                          alt={`${instructor.profile.firstName} ${instructor.profile.lastName}`}
                        />
                        <AvatarFallback className="bg-purple-100 text-purple-700">
                          {instructor.profile.firstName[0]}{instructor.profile.lastName[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">
                          {instructor.profile.firstName} {instructor.profile.lastName}
                        </div>
                        <div className="text-xs text-gray-500">
                          @{instructor.profile.userName}
                        </div>
                        <div className="text-xs text-gray-400">
                          {instructor.email}
                        </div>
                      </div>
                      {instructor.profile.averageRating > 0 && (
                        <div className="text-xs text-amber-600">
                          ★ {instructor.profile.averageRating.toFixed(1)}
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="p-4 text-center text-sm text-gray-500">
                  No instructors found
                </div>
              )}
            </div>
          )}
        </div>
        
        {/* Selected Instructor Display */}
        {selectedInstructor && (
          <div className="mt-2 rounded-lg border border-gray-200 bg-gray-50 p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage 
                    src={selectedInstructor.profile.photoUrl} 
                    alt={`${selectedInstructor.profile.firstName} ${selectedInstructor.profile.lastName}`}
                  />
                  <AvatarFallback className="bg-purple-100 text-purple-700">
                    {selectedInstructor.profile.firstName[0]}{selectedInstructor.profile.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="text-sm font-medium text-gray-900">
                    {selectedInstructor.profile.firstName} {selectedInstructor.profile.lastName}
                  </div>
                  <div className="text-xs text-gray-500">
                    @{selectedInstructor.profile.userName}
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={handleClear}
                className="text-sm font-medium text-red-600 hover:text-red-700"
              >
                Clear
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
