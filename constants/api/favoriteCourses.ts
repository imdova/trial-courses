export const API_URL = "https://medicova-courses-backend.vercel.app";
export const API_BASE = API_URL + "/api";

// ==========================
// Favorite Courses
// ==========================
// Add or remove a course from favorites (POST/DELETE to same endpoint)
export const API_ADD_OR_REMOVE_FAVORITE_COURSE = API_BASE + "/student/courses/{id}/favorite";
// Get all favorite courses for the authenticated student
export const API_GET_FAVORITE_COURSES = API_BASE + "/student/courses/favorites";
