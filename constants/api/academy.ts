import { API_URL } from ".";

export const API_ACADEMIES = API_URL + "/api/academies";

export const API_CREATE_ACADEMY = API_ACADEMIES; // POST
export const API_GET_ACADEMIES = API_ACADEMIES; // GET
export const API_GET_ACADEMY_BY_ID = API_ACADEMIES + "/"; // GET + [id]
export const API_UPDATE_ACADEMY_BY_ID = API_ACADEMIES + "/"; // PATCH + [id]
export const API_DELETE_ACADEMY_BY_ID = API_ACADEMIES + "/"; // DELETE + [id]
export const API_GET_ACADEMY_BY_SLUG = API_ACADEMIES + "/slug/"; // GET + [slug]
export const API_ADD_ACADEMY_USER = API_ACADEMIES + "/{academyId}/users"; // POST
export const API_GET_ACADEMY_USERS = API_ACADEMIES + "/{academyId}/users"; // GET
export const API_ADD_ACADEMY_INSTRUCTOR =
  API_ACADEMIES + "/{academyId}/instructors"; // POST
export const API_GET_ACADEMY_INSTRUCTORS =
  API_ACADEMIES + "/{academyId}/instructors"; // GET
export const API_UPDATE_ACADEMY_INSTRUCTOR =
  API_ACADEMIES + "/{academyId}/instructors/"; // PATCH + [instructorId]
export const API_DELETE_ACADEMY_INSTRUCTOR =
  API_ACADEMIES + "/{academyId}/instructors/"; // DELETE + [instructorId]
export const API_GET_ONE_ACADEMY_INSTRUCTOR =
  API_ACADEMIES + "/{academyId}/instructors/"; // GET + [instructorId]

export const API_CREATE_ACADEMY_KEYWORD = API_ACADEMIES + "/keywords"; // POST
export const API_GET_ACADEMY_KEYWORDS = API_ACADEMIES + "/keywords"; // GET
