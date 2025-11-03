import { API_URL } from ".";

export const API_ANSWER_QUIZ = API_URL + "/api/courses/{courseId}/items/{itemId}/progress";
export const API_SINGLE_COURSE = API_URL + "/api/student/courses"

export const API_SINGLE_COURSE_BY_ID = API_SINGLE_COURSE + "/{id}";

export const API_SINGLE_COURSE_BY_SLUG = API_SINGLE_COURSE + "/slug/{slug}";
