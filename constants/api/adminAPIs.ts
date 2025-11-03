import { API_URL } from ".";

export const API_ADMIN_BASE = API_URL + "/api/admin";

// ==========================
// Admin APIs
// ==========================
export const API_ADMIN_GET_INSTRUCTORS = API_ADMIN_BASE + "/instructors";
export const API_ADMIN_GET_DASHBOARD = API_ADMIN_BASE + "/dashboard";
export const API_ADMIN_GET_QUIZZES = API_ADMIN_BASE + "/quizzes";
export const API_ADMIN_GET_STUDENTS_OVERVIEW = API_ADMIN_BASE + "/students/overview";
export const API_ADMIN_GET_STUDENTS_GEO_STATS = API_ADMIN_BASE + "/students/geo-stats";
export const API_ADMIN_GET_STUDENTS_LIST = API_ADMIN_BASE + "/students-information";
export const API_ADMIN_GET_COURSES_OVERVIEW = API_ADMIN_BASE + "/courses/overview";
export const API_ADMIN_GET_COURSES_WEEKLY_SALES = API_ADMIN_BASE + "/courses/weekly-sales";
export const API_ADMIN_GET_ENROLLMENTS_OVERVIEW = API_ADMIN_BASE + "/enrollments/overview";
export const API_ADMIN_GET_ENROLLMENTS_INFORMATION = API_ADMIN_BASE + "/enrollments-information";
export const API_ADMIN_CREATE_STUDENT = API_ADMIN_BASE + "/students";

