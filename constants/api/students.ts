import { API_URL } from ".";

export const BASE = API_URL + "/api/v1.0.0/seeker";
export const API_STUDENT_SOCKET = API_URL + "/seekers-socket";

// User Profiles
export const PROFILES = BASE + "/profile";
export const API_GET_STUDENT_BY_USERNAME = PROFILES + "/username/"; // GET + [username]
export const API_GET_STUDENT_BY_ID = PROFILES + "/"; // GET + [id]
export const API_GET_STUDENTS = PROFILES; // GET
export const API_SEARCH_STUDENTS = PROFILES + "/search"; // GET
export const API_FILTER_SEARCH_STUDENTS = PROFILES + "/filters"; // GET
export const API_UPDATE_STUDENT = PROFILES; // PATCH + [id]
export const API_DELETE_STUDENT = PROFILES + "/"; // DELETE + [id]
export const API_RECALCULATE_COMPLETENESS = PROFILES + "/"; // GET + [id]
export const API_STUDENT_REQUEST_PHONE_CHANGE =
  PROFILES + "/request-phone-change"; // POST id, phone
export const API_STUDENT_PHONE_CHANGE = PROFILES + "/phone-change"; // POST id, otp

// User Skills
export const SKILLS = BASE + "/skills";
export const API_GET_STUDENT_SKILLS = SKILLS + "/seeker/"; // GET + [seekerId]
export const API_GET_STUDENT_SKILL_BY_ID = SKILLS + "/"; // GET + [id]
export const API_CREATE_STUDENT_SKILL = SKILLS; // POST
export const API_UPDATE_STUDENT_SKILL = SKILLS; // PATCH + [id]
export const API_DELETE_STUDENT_SKILL = SKILLS + "/"; // DELETE + [id]
export const API_GET_ALL_STUDENT_SKILLS = SKILLS; // GET

// User Experience
export const EXPERIENCE = BASE + "/experience";
export const API_CREATE_STUDENT_EXPERIENCE = EXPERIENCE; // POST
export const API_UPDATE_STUDENT_EXPERIENCE = EXPERIENCE; // PATCH + [id]
export const API_GET_STUDENT_EXPERIENCE = EXPERIENCE + "/student/"; // GET + [STUDENTId]
export const API_GET_STUDENT_EXPERIENCE_BY_ID = EXPERIENCE + "/"; // GET + [id]
export const API_DELETE_STUDENT_EXPERIENCE = EXPERIENCE + "/"; // DELETE + [id]

// User Education
export const EDUCATION = BASE + "/education";
export const API_CREATE_STUDENT_EDUCATION = EDUCATION; // POST
export const API_UPDATE_STUDENT_EDUCATION = EDUCATION; // PATCH + [id]
export const API_GET_STUDENT_EDUCATION = EDUCATION + "/student/"; // GET + [studentId]
export const API_GET_STUDENT_EDUCATION_BY_ID = EDUCATION + "/"; // GET + [id]
export const API_DELETE_STUDENT_EDUCATION = EDUCATION + "/"; // DELETE + [id]

// User Courses
export const COURSES = BASE + "/courses";
export const API_CREATE_STUDENT_COURSE = COURSES; // POST
export const API_UPDATE_STUDENT_COURSE = COURSES; // PATCH + [id]
export const API_GET_STUDENT_COURSES = COURSES + "/student/"; // GET + [studentId]
export const API_GET_STUDENT_COURSE_BY_ID = COURSES + "/"; // GET + [id]
export const API_DELETE_STUDENT_COURSE = COURSES + "/"; // DELETE + [id]

// Career Preferences
export const PREFERENCES = BASE + "/career-preference";
export const API_CREATE_CAREER_PREFERENCE = PREFERENCES; // POST
export const API_UPDATE_CAREER_PREFERENCE = PREFERENCES + "/"; // PATCH + [id]
export const API_GET_CAREER_PREFERENCES_BY_SEEKER_ID =
  PREFERENCES + "/student/"; // GET + [seekerId]
export const API_GET_CAREER_PREFERENCE_BY_ID = PREFERENCES + "/"; // GET + [id]
export const API_DELETE_CAREER_PREFERENCE = PREFERENCES + "/"; // DELETE + [id]

// User Activities
export const ACTIVITIES = BASE + "/activities";
export const API_CREATE_STUDENT_ACTIVITY = ACTIVITIES; // POST
export const API_UPDATE_STUDENT_ACTIVITY = ACTIVITIES; // PATCH + [id]
export const API_GET_STUDENT_ACTIVITIES = ACTIVITIES + "/STUDENT/"; // GET + [studentId]
export const API_GET_STUDENT_ACTIVITY_BY_ID = ACTIVITIES + "/"; // GET + [id]
export const API_DELETE_STUDENT_ACTIVITY = ACTIVITIES + "/"; // DELETE + [id]

// Folders
export const FOLDERS = BASE + "/folders";
export const API_CREATE_FOLDER = FOLDERS + "/create"; // POST
export const API_UPDATE_FOLDER = FOLDERS; // PATCH
export const API_SET_FOLDER_FAVORITES = FOLDERS + "/favorite-status"; // PUT
export const API_ADD_STUDENT_TO_FOLDER = FOLDERS + "/add-single-student"; // POST
export const API_ADD_STUDENTS_TO_FOLDER = FOLDERS + "/add-multiple-students"; // POST
export const API_GET_FOLDERS = FOLDERS + "/read-by-company?id="; // GET + [companyId]
export const API_GET_FOLDER_STUDENTS = FOLDERS + "/get-students-profiles"; // GET + [folderId]
export const API_GET_FOLDER_BY_ID = FOLDERS + "/"; // GET + [id]
export const API_DELETE_FOLDER_BY_ID = FOLDERS + "/"; // DELETE + [id]
export const API_GET_FOLDER_BY_STUDENT_AND_COMPANY =
  FOLDERS + "/{studentId}/company/{companyId}"; // GET

export const FOLDER_FILTER = FOLDERS + "/get-folder-student-filters/"; // + [id]
export const API_SEARCH_FOLDER_STUDENTS = FOLDERS + "/search-folder-students"; // GET

// Saved Jobs
export const SAVED_JOBS = BASE + "/saved-jobs";
export const API_CREATE_SAVED_JOB = SAVED_JOBS; // POST
export const API_CREATE_BULK_SAVED_JOBS = SAVED_JOBS + "/bulk"; // POST
export const API_GET_SAVED_JOBS_BY_STUDENT_ID = SAVED_JOBS + "/student/"; // GET + [id]
export const API_GET_SAVED_JOB_BY_ID = SAVED_JOBS + "/"; // GET + [id]
export const API_DELETE_SAVED_JOB_BY_ID = SAVED_JOBS + "/"; // DELETE + [id]

export const STUDENT_NOTIFICATIONS = BASE + "/notifications";
export const API_GET_STUDENT_NOTIFICATIONS = STUDENT_NOTIFICATIONS; // GET - Get paginated/filtered notifications for a STUDENT
export const API_DELETE_STUDENT_NOTIFICATIONS = STUDENT_NOTIFICATIONS; // DELETE - Delete notifications by their IDs
export const API_MARK_STUDENT_NOTIFICATIONS_READ =
  STUDENT_NOTIFICATIONS + "/mark-read"; // PATCH - Mark notifications as read by their IDs "ids": []
export const API_MARK_STUDENT_NOTIFICATIONS_UNREAD =
  STUDENT_NOTIFICATIONS + "/mark-unread"; // PATCH - Mark notifications as unread by their IDs
export const API_MARK_ALL_STUDENT_NOTIFICATIONS_READ =
  STUDENT_NOTIFICATIONS + "/"; // PATCH + {id}/mark-all-read - Mark all notifications as read for a STUDENT
export const API_MARK_ALL_STUDENT_NOTIFICATIONS_UNREAD =
  STUDENT_NOTIFICATIONS + "/"; // PATCH + {id}/mark-all-unread - Mark all notifications as unread for a STUDENT
export const API_DELETE_ALL_STUDENT_NOTIFICATIONS = STUDENT_NOTIFICATIONS + "/"; // DELETE + {id} - Delete all notifications for a seeker
