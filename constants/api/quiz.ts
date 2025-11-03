import { API_URL } from ".";

export const API_VERSION_BASE = API_URL + "/api";

// Quizzes
export const QUIZZES = API_VERSION_BASE + "/quizzes";
export const API_CREATE_QUIZ = QUIZZES; // POST
export const API_GET_QUIZZES = QUIZZES; // GET
export const API_CREATE_QUIZ_WITH_QUESTIONS = QUIZZES + "/with-questions"; // POST
export const API_SUBMIT_QUIZ_ATTEMPT = QUIZZES + "/{quizId}/attempts"; // POST
export const API_GET_QUIZ_SCORES = QUIZZES + "/{quizId}/score"; // GET
export const API_GET_QUIZ_BY_ID = QUIZZES + "/{id}"; // GET
export const API_UPDATE_QUIZ_BY_ID = QUIZZES + "/{id}"; // PATCH
export const API_DELETE_QUIZ_BY_ID = QUIZZES + "/{id}"; // DELETE (soft)

// Quiz Questions
export const API_CREATE_QUESTION = QUIZZES + "/{quizId}/questions"; // POST
export const API_GET_QUESTIONS = QUIZZES + "/{quizId}/questions"; // GET
export const API_BULK_CREATE_QUESTIONS = QUIZZES + "/{quizId}/questions/bulk"; // POST
export const API_UPDATE_QUESTION =
  QUIZZES + "/{quizId}/questions/{quizQuestionId}"; // PATCH
export const API_DELETE_QUESTION =
  QUIZZES + "/{quizId}/questions/{quizQuestionId}"; // DELETE
