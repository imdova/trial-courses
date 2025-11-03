import { API_URL } from ".";

export const API_ASSIGNMENTS_BASE = API_URL + "/api/assignments";

// Assignment CRUD operations
export const API_CREATE_ASSIGNMENT = API_ASSIGNMENTS_BASE; // POST - Create a new assignment (instructors, academy content creator & admins)
export const API_GET_ASSIGNMENTS = API_ASSIGNMENTS_BASE; // GET - List assignments (instructors: their own, academy content creators: their academy; admins: all)
export const API_GET_ASSIGNMENT_BY_ID = API_ASSIGNMENTS_BASE + "/{id}/overview"; // GET + {id} - Get assignment by ID (instructors: only their own; academy content creators: same academy; admins: any)
export const API_UPDATE_ASSIGNMENT = API_ASSIGNMENTS_BASE + "/"; // PATCH + {id} - Update assignment (instructors: only their own; academy content creators: same academy; admins: any)
export const API_DELETE_ASSIGNMENT = API_ASSIGNMENTS_BASE + "/"; // DELETE + {id} - Delete assignment (instructors: only their own; academy content creators: same academy; admins: any)
export const API_SEND_REMINDER = API_ASSIGNMENTS_BASE + "/{id}/remind"; // POST + {id} - Send reminder (instructors: only their own; academy content creators: same academy; admins: any)
export const API_GET_ASSIGNMENT_STUDENTS = API_ASSIGNMENTS_BASE + "/{id}/stats/students"; // GET + {id} - Get assignment students (instructors: only their own; academy content creators: same academy; admins: any)
