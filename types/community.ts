// Community Types
export interface CommunityUser {
  id?: string;
  fullName?: string;
  userName?: string;
  photoUrl?: string;
  // Legacy compatibility
  name?: string;
  image?: string;
  info?: string;
}

export interface CommunityPost {
  id: string;
  content: string;
  parentId?: string;
  userId?: string;
  user: CommunityUser;
  courseId?: string;
  likes: number;
  liked: boolean;
  replies?: CommunityPost[];
  createdAt?: string;
  updatedAt?: string;
  edited?: boolean;
  // Legacy compatibility
  timestamp?: number;
}

// API Request/Response Types
export interface CreateCommunityPostRequest {
  content: string;
  parentId?: string;
}

export interface UpdateCommunityPostRequest {
  content: string;
  parentId?: string;
}

export interface CommunityPostResponse {
  id: string;
  content: string;
  parentId?: string;
  userId?: string;
  user: CommunityUser;
  courseId?: string;
  likes: number;
  liked: boolean;
  replies?: CommunityPostResponse[];
  createdAt?: string;
  updatedAt?: string;
}

export interface LikePostResponse {
  id: string;
  liked: boolean;
  likes: number;
}

// State Types
export interface CommunityState {
  posts: CommunityPost[];
  loading: boolean;
  error: string | null;
  creating: boolean;
  updating: boolean;
  deleting: boolean;
  liking: boolean;
}

// Hook Return Type
export interface UseCommunityReturn {
  posts: CommunityPost[];
  loading: boolean;
  error: string | null;
  creating: boolean;
  updating: boolean;
  deleting: boolean;
  liking: boolean;
  getCommunityPosts: (courseId: string) => Promise<void>;
  createPost: (courseId: string, data: CreateCommunityPostRequest) => Promise<CommunityPostResponse | null>;
  updatePost: (courseId: string, postId: string, data: UpdateCommunityPostRequest) => Promise<CommunityPostResponse | null>;
  deletePost: (courseId: string, postId: string) => Promise<boolean>;
  likePost: (courseId: string, postId: string) => Promise<LikePostResponse | null>;
  getPost: (courseId: string, postId: string) => Promise<CommunityPostResponse | null>;
  clearError: () => void;
  clearPosts: () => void;
}
