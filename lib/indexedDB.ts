/* eslint-disable @typescript-eslint/no-explicit-any */
// utils/indexedDB.js
import { openDB } from "idb";
import { CourseItem } from "@/types/courses"; // Assuming CourseItem is defined in this path

const DB_NAME = "CourseDB";
const STORE_NAME = "courses";

export async function initDB(): Promise<any> {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id" });
      }
    },
  }) as Promise<any>; // Cast to any for now, can be more specific with IDBPDatabase
}

export async function saveCourse(course: CourseItem): Promise<void> {
  const db = await initDB();
  await db.put(STORE_NAME, course);
}

export async function getCourseById(
  id: string,
): Promise<CourseItem | undefined> {
  const db = await initDB();
  return await db.get(STORE_NAME, id);
}

export async function clearCoursesDB(): Promise<void> {
  const db = await initDB();
  await db.clear(STORE_NAME);
}
