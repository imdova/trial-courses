"use client";
import { useEffect } from "react";
import { CourseFormState, useCourseForm } from "./useCourseForm";
import { saveCourseToIndexedDB } from "../util/db";
import debounce from "lodash.debounce";

export function useAutosave({
  isDirty,
  values,
  reset,
  preventSaving = false,
}: {
  isDirty: boolean;
  preventSaving: boolean;
  values: Partial<CourseFormState>;
  reset: () => void;
}) {
  const {
    setIsSaving,
    setLastSaved,
    setUnsavedChanges,
    courseId,
    duplicateId,
    currentStep,
    courseInfo,
    courseDetails,
    courseCurriculum,
    status,
    completedSteps,
  } = useCourseForm();

  const saveToIndexDB = async (data: Partial<CourseFormState>) => {
    setIsSaving(true);
    const lastSaved = Date.now();
    setLastSaved(lastSaved);
    await saveCourseToIndexedDB({
      courseId: courseId,
      duplicateId: duplicateId,
      currentStep: currentStep,
      courseInfo: courseInfo,
      courseDetails: courseDetails,
      courseCurriculum: courseCurriculum,
      completedSteps: completedSteps,
      status: status,
      lastSaved: lastSaved,
      ...data,
    });
    setIsSaving(false);
    reset();
    setUnsavedChanges(false);
  };

  const debouncedSave = debounce(() => {
    if (isDirty) saveToIndexDB(values);
  }, 4000); // 2 seconds

  useEffect(() => {
    if (preventSaving) return debouncedSave.cancel;
    if (isDirty) debouncedSave();
    return debouncedSave.cancel;
  }, [debouncedSave, isDirty, values, preventSaving]);

  useEffect(() => {
    setUnsavedChanges(isDirty);
  }, [isDirty, setUnsavedChanges]);

  return {
    saveToIndexDB,
  };
}
