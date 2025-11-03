import { API_URL } from ".";

export const API_QUIZZES_BASE = API_URL + "/api/quizzes";

export const API_CREATE_QUIZ = API_QUIZZES_BASE;
export const API_GET_QUIZZES = API_QUIZZES_BASE;
export const API_GET_QUIZ_OVERVIEW_BY_ID = API_QUIZZES_BASE + "/{quizId}/overview";
export const API_UPDATE_QUIZ = API_QUIZZES_BASE + "/{quizId}/with-questions"
export const API_DELETE_QUIZ = API_QUIZZES_BASE + "/{quizId}";
export const API_GET_QUIZ_STUDENTS = API_QUIZZES_BASE + "/{quizId}/stats/students";
export const API_GET_QUIZ_QUESTIONS_STATS = API_QUIZZES_BASE + "/{quizId}/questions/stats";
export const API_GET_QUIZ_COUNTRY= API_QUIZZES_BASE + "/{quizId}/stats/country";
export const API_GET_QUIZ_BY_ID_WITH_QUESTIONS = API_QUIZZES_BASE + "/{quizId}";


export const API_CREATE_QUIZ_WITH_QUESTIONS = API_QUIZZES_BASE + "/with-questions";

export const API_GET_LATEST_QUIZZES = API_QUIZZES_BASE + "/latest-for-student";