import { API_URL } from ".";

export const API_VERSION_BASE = API_URL + "/api";

// Users
export const USERS = API_VERSION_BASE + "/users";
export const API_REGISTER_USER = USERS + "/register"; // POST
export const API_GET_USERS = USERS; // GET
export const API_GET_USER_BY_ID = USERS + "/{userId}/profile"; // GET
export const API_UPDATE_USER_BY_ID = USERS + "/{userId}"; // PATCH
export const API_DELETE_USER_BY_ID = USERS + "/{userId}"; // DELETE
export const API_FORGOT_PASSWORD = USERS + "/forgot-password"; // POST
export const API_VERIFY_RESET_TOKEN = USERS + "/verify-reset-token"; // POST
export const API_RESET_PASSWORD = USERS + "/reset-password"; // POST
export const API_GET_CATEGORIES = USERS + "/profile-categories"; // GET

// User Email Verification
export const API_RESEND_VERIFICATION = USERS + "/resend-verification"; // POST
export const API_VERIFY_EMAIL = USERS + "/verify-email?token="; // GET

export const API_VERIFY_IDENTITY = USERS + "/verify/identity"; // POST

// Authentication
export const AUTH = API_VERSION_BASE + "/auth";
export const API_LOGIN = AUTH + "/login"; // POST
export const API_REFRESH_TOKEN = AUTH + "/refresh?token={token}"; // POST
export const API_LOGOUT = AUTH + "/logout"; // GET
export const API_GOOGLE_LOGIN = AUTH + "/google"; // GET
export const API_GOOGLE_LOGIN_REDIRECT = AUTH + "/google/redirect"; // GET
export const API_FACEBOOK_LOGIN = AUTH + "/facebook"; // GET
export const API_FACEBOOK_LOGIN_REDIRECT = AUTH + "/facebook/redirect"; // GET
