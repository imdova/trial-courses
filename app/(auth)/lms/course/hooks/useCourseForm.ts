"use client";
import { CourseItem } from "@/types/courses";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import {
  Step1FormData,
  Step2FormData,
  Step3FormData,
  Step5SEOFormData,
} from "../util/course.schema";

export interface Lecture {
  title: string;
}

export interface Module {
  title: string;
  description: string;
  lectures: Lecture[];
}

export interface CourseFormState {
  courseId: string | null;
  duplicateId: string | null;
  currentStep: number;
  courseInfo: Step1FormData | null;
  courseDetails: Step2FormData | null;
  courseCurriculum: Step3FormData | null;
  seo: Step5SEOFormData | null;
  status: CourseItem["status"];
  isSaving: boolean;
  lastSaved: number | null;
  hasUnsavedChanges: boolean;
  completedSteps: number[];
}

const initialState: CourseFormState = {
  courseId: null,
  duplicateId: null,
  currentStep: 0,
  courseInfo: null,
  courseDetails: null,
  courseCurriculum: null,
  seo: null,
  status: "draft",
  isSaving: false,
  lastSaved: null,
  hasUnsavedChanges: false,
  completedSteps: [],
};

interface CourseFormStore extends CourseFormState {
  // 🔹 Sync actions
  setCurrentStep: (step: number) => void;
  setCourseInfo: (info: Step1FormData) => void;
  setCourseDetails: (details: Step2FormData) => void;
  setCourseCurriculum: (curriculum: Step3FormData) => void;
  setSEO: (seo: Step5SEOFormData) => void;
  setCourseId: (id: string) => void;
  setDuplicateId: (id: string) => void;
  restoreFromIndexedDB: (data: Partial<CourseFormState>) => void;
  resetForm: () => void;
  setIsSaving: (value: boolean) => void;
  setLastSaved: (timestamp: number) => void;
  setUnsavedChanges: (value: boolean) => void;
  setInitialized: (value: boolean) => void;
  setCompletedSteps: (value: number[]) => void;

  // 🔹 Async thunks
  createCourse: (data: Step1FormData) => Promise<void>;
  updateCourse: (courseId: string, data: CourseItem) => Promise<void>;
  publishCourse: (courseId: string, data: CourseItem) => Promise<void>;
}

export const useCourseForm = create<CourseFormStore>()(
  devtools((set, get) => ({
    ...initialState,

    // ---------------------------
    // 🔹 Sync Actions
    // ---------------------------
    setCurrentStep: (step) => set({ currentStep: step }),

    setCourseInfo: (info) => set({ courseInfo: info }),

    setCourseDetails: (details) => set({ courseDetails: details }),

    setCourseCurriculum: (curriculum) => set({ courseCurriculum: curriculum }),

    setSEO: (seo) => set({ seo: seo }),

    setCourseId: (id) => set({ courseId: id }),
    setDuplicateId: (id) => set({ duplicateId: id }),

    restoreFromIndexedDB: (data) =>
      set({
        ...get(),
        ...data,
        hasUnsavedChanges: false,
      }),

    resetForm: () => set(initialState),
    setIsSaving: (value) => set({ isSaving: value }),
    setLastSaved: (timestamp) => set({ lastSaved: timestamp }),

    setUnsavedChanges: (value) => set({ hasUnsavedChanges: value }),
    setCompletedSteps: (value) => set({ completedSteps: value }),
    // ---------------------------
    // 🔹 Async Actions (Thunks)
    // ---------------------------
    createCourse: async (data) => {
      console.log("🚀 ~ data:", data);
      //   const res = await createCourse(data);
      //   set({ courseId: res.courseId });
    },

    updateCourse: async (courseId, data) => {
      console.log("🚀 ~ courseId, data:", courseId, data);
      //   await updateCourse(courseId, data);
    },

    publishCourse: async (courseId, data) => {
      console.log("🚀 ~ courseId, data:", courseId, data);
      //   await publishCourse(courseId, data);
      //   set({ status: "published", hasUnsavedChanges: false });
    },
  })),
);
