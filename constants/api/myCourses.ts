import { API_URL } from ".";

export const API_MY_COURSES = API_URL + "/api/student/courses";
export const API_MY_COURSES_ENROLLED = API_MY_COURSES + "/enrolled";
export const API_MY_COURSES_RELATED = API_MY_COURSES_ENROLLED + "/related";
export const API_MY_COURSES_LATEST = API_MY_COURSES + "/latest";
export const API_MY_COURSES_ITEMS_PROGRESS =API_URL + "/api/courses/{courseId}/items/progress";


export const API_MY_COURSES_ACTIVITY = API_URL + "/api/student/courses/activity";
