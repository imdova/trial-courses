import { API_URL } from ".";

export const API_BASE = API_URL + "/api";

// ==========================
// Courses
// ==========================
export const API_COURSES = API_BASE + "/courses";
export const API_CREATE_COURSE = API_COURSES; // POST
export const API_GET_COURSES = API_COURSES; // GET

export const API_GET_PUBLIC_COURSES = API_COURSES + "/public";
export const API_GET_PUBLIC_COURSES_BY_INSTRUCTOR =
  API_GET_PUBLIC_COURSES + "?instructorId="; // GET
export const API_GET_PUBLIC_COURSES_BY_ACADEMY =
  API_GET_PUBLIC_COURSES + "?academyId="; // GET

export const API_GET_COURSE_BY_ID = API_COURSES + "/"; // GET + [id]
export const API_UPDATE_COURSE = API_COURSES + "/"; // PATCH + [id]
export const API_DELETE_COURSE = API_COURSES + "/"; // DELETE + [id]
export const API_GET_COURSE_BY_SLUG = API_COURSES + "/slug/"; // GET + [slug]
export const API_GET_COURSE_TAGS = API_COURSES + "/tags"; // GET
export const API_GET_COURSE_STUDENTS =
  API_COURSES + "/{courseId}/students/progress"; // GET

// ==========================
// Student Courses
// ==========================
export const API_STUDENT_COURSES = API_BASE + "/student/courses";
export const API_ENROLL_COURSE =
  API_STUDENT_COURSES + "/{id}/enroll"; // POST
export const API_PURCHASE_COURSE =
  API_STUDENT_COURSES + "/{id}/purchase"; // POST
export const API_GET_STUDENT_ENROLLED_COURSES =
  API_STUDENT_COURSES + "/enrolled"; // GET
export const API_GET_AVAILABLE_STUDENT_COURSES = API_STUDENT_COURSES; // GET
export const API_GET_STUDENT_COURSE_BY_ID =
  API_STUDENT_COURSES + "/"; // GET + [id]
export const API_DROP_COURSE =
  API_STUDENT_COURSES + "/{id}/drop"; // DELETE

// ==========================
// Course Pricing
// ==========================
export const API_COURSE_PRICING = API_COURSES + "/{courseId}/pricing";
export const API_ADD_COURSE_PRICING = API_COURSE_PRICING; // POST
export const API_GET_COURSE_PRICING = API_COURSE_PRICING; // GET
export const API_UPDATE_COURSE_PRICING =
  API_COURSE_PRICING + "/{pricingId}"; // PATCH
export const API_DELETE_COURSE_PRICING =
  API_COURSE_PRICING + "/{pricingId}"; // DELETE

// ==========================
// Course Sections
// ==========================
export const API_COURSE_SECTIONS =
  API_COURSES + "/{courseId}/course-sections";
export const API_CREATE_COURSE_SECTION = API_COURSE_SECTIONS; // POST
export const API_GET_COURSE_SECTIONS = API_COURSE_SECTIONS; // GET
export const API_CREATE_COURSE_SECTIONS_BULK =
  API_COURSE_SECTIONS + "/with-items/bulk"; // POST
export const API_UPDATE_COURSE_SECTIONS_BULK_WITH_ITEMS =
  API_COURSE_SECTIONS + "/with-items/bulk"; // PATCH
export const API_UPDATE_COURSE_SECTION =
  API_COURSE_SECTIONS + "/{sectionId}"; // PATCH
export const API_DELETE_COURSE_SECTION =
  API_COURSE_SECTIONS + "/{sectionId}"; // DELETE

// ==========================
// Course Section Items
// ==========================
export const API_SECTION_ITEMS =
  API_BASE + "/course-sections/{sectionId}/items";
export const API_ADD_SECTION_ITEM = API_SECTION_ITEMS; // POST
export const API_ADD_SECTION_ITEMS_BULK =
  API_SECTION_ITEMS + "/bulk"; // POST
export const API_UPDATE_SECTION_ITEM =
  API_SECTION_ITEMS + "/{itemId}"; // PATCH
export const API_DELETE_SECTION_ITEM =
  API_SECTION_ITEMS + "/{itemId}"; // DELETE

// ==========================
// Course Progress
// ==========================
export const API_COURSE_PROGRESS =
  API_COURSES + "/{courseId}/items/progress";
export const API_SUBMIT_ITEM_PROGRESS =
  API_COURSES + "/{courseId}/items/{itemId}/progress"; // POST
export const API_GET_COURSE_PROGRESS = API_COURSE_PROGRESS; // GET

// ==========================
// Course Categories
// ==========================
export const API_COURSE_CATEGORIES = API_BASE + "/course-categories";
export const API_CREATE_COURSE_CATEGORY = API_COURSE_CATEGORIES; // POST
export const API_GET_COURSE_CATEGORIES = API_COURSE_CATEGORIES; // GET
export const API_GET_COURSE_CATEGORY_BY_ID =
  API_COURSE_CATEGORIES + "/"; // GET + [id]
export const API_UPDATE_COURSE_CATEGORY =
  API_COURSE_CATEGORIES + "/"; // PATCH + [id]
export const API_DELETE_COURSE_CATEGORY =
  API_COURSE_CATEGORIES + "/"; // DELETE + [id]
