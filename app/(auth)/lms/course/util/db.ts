import { openDB, type DBSchema, type IDBPDatabase } from "idb";
import { Step1FormData, Step2FormData, Step3FormData } from "./course.schema";
import { CourseItem } from "@/types/courses";

interface CourseDB extends DBSchema {
  courses: {
    key: string;
    value: {
      courseId: string | null;
      duplicateId: string | null;
      currentStep: number;
      courseInfo: Step1FormData | null;
      courseDetails: Step2FormData | null;
      courseCurriculum: Step3FormData | null;
      completedSteps: number[];
      status: CourseItem["status"];
      lastSaved: number | null;
    };
  };
}

const DB_NAME = "course-creator-db";
const STORE_NAME = "courses";
const COURSE_KEY = "current-course";

let dbInstance: IDBPDatabase<CourseDB> | null = null;

async function getDB() {
  if (dbInstance) return dbInstance;

  dbInstance = await openDB<CourseDB>(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    },
  });

  return dbInstance;
}

export async function saveCourseToIndexedDB(
  data: CourseDB["courses"]["value"],
) {
  const db = await getDB();
  await db.put(STORE_NAME, data, COURSE_KEY);
}

export async function loadCourseFromIndexedDB() {
  const db = await getDB();
  return await db.get(STORE_NAME, COURSE_KEY);
}

export async function clearCourseFromIndexedDB() {
  const db = await getDB();
  await db.delete(STORE_NAME, COURSE_KEY);
}
