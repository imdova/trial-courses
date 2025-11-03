// Community API endpoints
import { API_URL } from ".";
export const COMMUNITY_API = {
  // Get all community posts and replies for a course
  GET_COURSE_COMMUNITY: (courseId: string) => `${API_URL}/api/courses/${courseId}/community`,
  
  // Create a new community post or comment
  CREATE_POST: (courseId: string) => `${API_URL}/api/courses/${courseId}/community`,
  
  // Get a specific community post or comment
  GET_POST: (courseId: string, postId: string) => `${API_URL}/api/courses/${courseId}/community/${postId}`,
  
  // Update a community post or comment
  UPDATE_POST: (courseId: string, postId: string) => `${API_URL}/api/courses/${courseId}/community/${postId}`,
  
  // Delete a community post or comment
  DELETE_POST: (courseId: string, postId: string) => `${API_URL}/api/courses/${courseId}/community/${postId}`,
  
  // Like a community comment
  LIKE_POST: (courseId: string, postId: string) => `${API_URL}/api/courses/${courseId}/community/${postId}/like`,
} as const;
