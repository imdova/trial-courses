// utils/localStorage.ts

export function isLocalStorageAvailable(): boolean {
  try {
    if (typeof window === "undefined" || !window.localStorage) return false;
    const testKey = "__storage_test__";
    window.localStorage.setItem(testKey, "test");
    window.localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
}

export function setLocalStorage<T>(key: string, value: T): void {
  if (!isLocalStorageAvailable()) return;
  try {
    const serialized = JSON.stringify(value);
    window.localStorage.setItem(key, serialized);
  } catch (error) {
    console.error(`Error setting localStorage key "${key}":`, error);
  }
}

export function getLocalStorage<T>(key: string): T | null {
  if (!isLocalStorageAvailable()) return null;
  try {
    const item = window.localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : null;
  } catch (error) {
    console.error(`Error reading localStorage key "${key}":`, error);
    return null;
  }
}

export function deleteLocalStorage(key: string): void {
  if (!isLocalStorageAvailable()) return;
  try {
    window.localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error deleting localStorage key "${key}":`, error);
  }
}

export function clearLocalStorage(): void {
  if (!isLocalStorageAvailable()) return;
  try {
    window.localStorage.clear();
  } catch (error) {
    console.error("Error clearing localStorage:", error);
  }
}
