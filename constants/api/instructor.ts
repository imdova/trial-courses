import { API_URL } from ".";

export const API_INSTRUCTOR_BASE = API_URL + "/api/public/profiles/instructor";
export const API_INSTRUCTORS_SOCKET = API_URL + "/instructor-socket";

// Public Instructor Profile
export const API_GET_PUBLIC_INSTRUCTOR_BY_USERNAME =
  API_INSTRUCTOR_BASE + "/username/{userName}"; // GET
export const API_MAKE_ALL_INSTRUCTOR_PROFILES_PRIVATE =
  API_URL + "/make-all-private"; // PATCH

export const INSTRUCTOR_PROFILES = API_INSTRUCTOR_BASE;
export const API_GET_INSTRUCTOR_BY_ID = INSTRUCTOR_PROFILES + "/"; // GET + [id]
export const API_UPDATE_INSTRUCTOR_PROFILE = INSTRUCTOR_PROFILES + "/"; // PATCH + [id]
export const API_GET_INSTRUCTOR_BY_USERNAME =
  INSTRUCTOR_PROFILES + "/username/"; // GET + [username]

// INSTRUCTOR Notifications
export const INSTRUCTOR_NOTIFICATIONS = API_INSTRUCTOR_BASE + "/notifications";
export const API_GET_INSTRUCTOR_NOTIFICATIONS = INSTRUCTOR_NOTIFICATIONS; // GET - Get paginated/filtered notifications for an INSTRUCTOR
export const API_DELETE_INSTRUCTOR_NOTIFICATIONS = INSTRUCTOR_NOTIFICATIONS; // DELETE - Delete notifications by their IDs
export const API_MARK_INSTRUCTOR_NOTIFICATIONS_READ =
  INSTRUCTOR_NOTIFICATIONS + "/mark-read"; // PATCH - Mark notifications as read by their IDs "ids": []
export const API_MARK_INSTRUCTOR_NOTIFICATIONS_UNREAD =
  INSTRUCTOR_NOTIFICATIONS + "/mark-unread"; // PATCH - Mark notifications as unread by their IDs
export const API_MARK_ALL_INSTRUCTOR_NOTIFICATIONS_READ =
  INSTRUCTOR_NOTIFICATIONS + "/"; // PATCH + {id}/mark-all-read - Mark all notifications as read for an INSTRUCTOR
export const API_MARK_ALL_INSTRUCTOR_NOTIFICATIONS_UNREAD =
  INSTRUCTOR_NOTIFICATIONS + "/"; // PATCH + {id}/mark-all-unread - Mark all notifications as unread for an INSTRUCTOR
export const API_DELETE_ALL_INSTRUCTOR_NOTIFICATIONS =
  INSTRUCTOR_NOTIFICATIONS + "/"; // DELETE + {id} - Delete all notifications for an INSTRUCTOR
