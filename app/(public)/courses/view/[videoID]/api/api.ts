import { API_ANSWER_QUIZ } from "@/constants/api/singleCourse";
import { getAuthHeaders } from "@/util/getAuthHeader";

export interface QuizAnswer {
  questionId: string;
  chosenOptionText: string;
  correct: boolean;
}

export interface AssignmentSubmission {
  notes: string;
  file_url: string;
}

export interface ProgressSubmissionPayload {
  answers?: QuizAnswer[]; // Optional - for quiz submissions
  timeTaken?: number; // Optional - in minutes
  assignmentSubmission?: AssignmentSubmission; // Optional - for assignment submissions
}

export interface QuizSubmissionResponse {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  completed: boolean;
  score: number;
}

export const submitProgress = async (
  courseId: string,
  itemId: string,
  token: string,
  payload: ProgressSubmissionPayload
): Promise<QuizSubmissionResponse> => {
  const url = API_ANSWER_QUIZ
    .replace("{courseId}", courseId)
    .replace("{itemId}", itemId);
    
  const response = await fetch(url, {
    method: "POST",
    headers: getAuthHeaders(token),
    // credentials: "include",
    body: JSON.stringify(payload),
  });
  return response.json();
};

// Backwards compatibility - keeping the old function name
export const answerQuiz = submitProgress;