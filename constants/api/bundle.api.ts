import { API_URL } from ".";

export const API_BASE = API_URL + "/api";

// ==========================
// Bundles
// ==========================
export const API_BUNDLES = API_BASE + "/bundles";
export const API_CREATE_BUNDLE = API_BUNDLES; // POST - Create a new bundle
export const API_GET_BUNDLES = API_BUNDLES; // GET - Get all bundles
export const API_GET_BUNDLE_BY_ID = API_BUNDLES + "/"; // GET + {id} - Get a single bundle by ID
export const API_UPDATE_BUNDLE = API_BUNDLES + "/"; // PATCH + {id} - Update a bundle
export const API_DELETE_BUNDLE = API_BUNDLES + "/"; // DELETE + {id} - Soft delete a bundle

// ==========================
// Student Bundles
// ==========================
export const API_STUDENT_BUNDLES = API_BASE + "/student/bundles";
export const API_GET_STUDENT_BUNDLES = API_STUDENT_BUNDLES; // GET - Get all available bundles for a student
export const API_ENROLL_STUDENT_BUNDLE = API_STUDENT_BUNDLES + "/{id}/enroll"; // POST - Enroll student into a bundle
