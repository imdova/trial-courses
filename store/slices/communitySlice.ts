/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { 
  CommunityPost, 
  CommunityPostResponse, 
  CreateCommunityPostRequest, 
  UpdateCommunityPostRequest,
  LikePostResponse,
  CommunityState 
} from '@/types/community';
import { COMMUNITY_API } from '@/constants/api/community';
import { getAuthHeaders } from "@/util/getAuthHeader";

// Initial state
const initialState: CommunityState = {
  posts: [],
  loading: false,
  error: null,
  creating: false,
  updating: false,
  deleting: false,
  liking: false,
};

// Helper function to transform API response to local format
const transformPostResponse = (response: CommunityPostResponse): CommunityPost => ({
  ...response,
  edited: response.createdAt !== response.updatedAt,
  replies: response.replies?.map(transformPostResponse) || [],
});

// Async thunks
export const fetchCommunityPosts = createAsyncThunk(
  'community/fetchPosts',
  async ({ courseId, token }: { courseId: string; token: string }, { rejectWithValue }) => {
    try {
      const response = await fetch(COMMUNITY_API.GET_COURSE_COMMUNITY(courseId), {
        method: 'GET',
        headers: getAuthHeaders(token),
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch community posts: ${response.statusText}`);
      }

      const data: CommunityPostResponse[] = await response.json();
      return data.map(transformPostResponse);
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch community posts');
    }
  }
);

export const createCommunityPost = createAsyncThunk(
  'community/createPost',
  async ({ courseId, data, token }: { courseId: string; data: CreateCommunityPostRequest; token: string }, { rejectWithValue }) => {
    try {
      const response = await fetch(COMMUNITY_API.CREATE_POST(courseId), {
        method: 'POST',
        headers: getAuthHeaders(token),
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Failed to create post: ${response.statusText}`);
      }

      const result: CommunityPostResponse = await response.json();
      return transformPostResponse(result);
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to create post');
    }
  }
);

export const updateCommunityPost = createAsyncThunk(
  'community/updatePost',
  async ({ courseId, postId, data, token }: { courseId: string; postId: string; data: UpdateCommunityPostRequest; token: string }, { rejectWithValue }) => {
    try {
      const response = await fetch(COMMUNITY_API.UPDATE_POST(courseId, postId), {
        method: 'PATCH',
        headers: getAuthHeaders(token),
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Failed to update post: ${response.statusText}`);
      }

      const result: CommunityPostResponse = await response.json();
      return { postId, post: transformPostResponse(result) };
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to update post');
    }
  }
);

export const deleteCommunityPost = createAsyncThunk(
  'community/deletePost',
  async ({ courseId, postId, token }: { courseId: string; postId: string; token: string }, { rejectWithValue }) => {
    try {
      const response = await fetch(COMMUNITY_API.DELETE_POST(courseId, postId), {
        method: 'DELETE',
        headers: getAuthHeaders(token),
      });

      if (!response.ok) {
        throw new Error(`Failed to delete post: ${response.statusText}`);
      }

      return postId;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to delete post');
    }
  }
);

export const likeCommunityPost = createAsyncThunk(
  'community/likePost',
  async ({ courseId, postId, token }: { courseId: string; postId: string; token: string }, { rejectWithValue }) => {
    try {
      const response = await fetch(COMMUNITY_API.LIKE_POST(courseId, postId), {
        method: 'POST',
        headers: getAuthHeaders(token),
      });

      if (!response.ok) {
        throw new Error(`Failed to like post: ${response.statusText}`);
      }

      const result: LikePostResponse = await response.json();
      return { postId, ...result };
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to like post');
    }
  }
);

export const getCommunityPost = createAsyncThunk(
  'community/getPost',
  async ({ courseId, postId, token }: { courseId: string; postId: string; token: string }, { rejectWithValue }) => {
    try {
      const response = await fetch(COMMUNITY_API.GET_POST(courseId, postId), {
        method: 'GET',
        headers: getAuthHeaders(token),
      });

      if (!response.ok) {
        throw new Error(`Failed to get post: ${response.statusText}`);
      }

      const result: CommunityPostResponse = await response.json();
      return transformPostResponse(result);
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to get post');
    }
  }
);

// Helper function to update post in nested structure
const updatePostInArray = (posts: CommunityPost[], postId: string, updates: Partial<CommunityPost>): CommunityPost[] => {
  return posts.map(post => {
    if (post.id === postId) {
      return { ...post, ...updates };
    }
    if (post.replies) {
      return { ...post, replies: updatePostInArray(post.replies, postId, updates) };
    }
    return post;
  });
};

// Helper function to remove post from nested structure
const removePostFromArray = (posts: CommunityPost[], postId: string): CommunityPost[] => {
  return posts
    .filter(post => post.id !== postId)
    .map(post => {
      if (post.replies) {
        return { ...post, replies: removePostFromArray(post.replies, postId) };
      }
      return post;
    });
};

// Slice
const communitySlice = createSlice({
  name: 'community',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearPosts: (state) => {
      state.posts = [];
    },
  },
  extraReducers: (builder) => {
    // Fetch posts
    builder
      .addCase(fetchCommunityPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCommunityPosts.fulfilled, (state, action: PayloadAction<CommunityPost[]>) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchCommunityPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Create post
    builder
      .addCase(createCommunityPost.pending, (state) => {
        state.creating = true;
        state.error = null;
      })
      .addCase(createCommunityPost.fulfilled, (state, action: PayloadAction<CommunityPost>) => {
        state.creating = false;
        const newPost = action.payload;
        
        // If it's a reply (has parentId), add it to the parent's replies
        if (newPost.parentId) {
          state.posts = updatePostInArray(state.posts, newPost.parentId, {
            replies: [...(state.posts.find(p => p.id === newPost.parentId)?.replies || []), newPost]
          });
        } else {
          // If it's a top-level post, add it to the beginning
          state.posts.unshift(newPost);
        }
      })
      .addCase(createCommunityPost.rejected, (state, action) => {
        state.creating = false;
        state.error = action.payload as string;
      });

    // Update post
    builder
      .addCase(updateCommunityPost.pending, (state) => {
        state.updating = true;
        state.error = null;
      })
      .addCase(updateCommunityPost.fulfilled, (state, action: PayloadAction<{ postId: string; post: CommunityPost }>) => {
        state.updating = false;
        const { postId, post } = action.payload;
        state.posts = updatePostInArray(state.posts, postId, post);
      })
      .addCase(updateCommunityPost.rejected, (state, action) => {
        state.updating = false;
        state.error = action.payload as string;
      });

    // Delete post
    builder
      .addCase(deleteCommunityPost.pending, (state) => {
        state.deleting = true;
        state.error = null;
      })
      .addCase(deleteCommunityPost.fulfilled, (state, action: PayloadAction<string>) => {
        state.deleting = false;
        const postId = action.payload;
        state.posts = removePostFromArray(state.posts, postId);
      })
      .addCase(deleteCommunityPost.rejected, (state, action) => {
        state.deleting = false;
        state.error = action.payload as string;
      });

    // Like post
    builder
      .addCase(likeCommunityPost.pending, (state) => {
        state.liking = true;
        state.error = null;
      })
      .addCase(likeCommunityPost.fulfilled, (state, action: PayloadAction<{ postId: string; liked: boolean; likes: number }>) => {
        state.liking = false;
        const { postId, liked, likes } = action.payload;
        state.posts = updatePostInArray(state.posts, postId, { liked, likes });
      })
      .addCase(likeCommunityPost.rejected, (state, action) => {
        state.liking = false;
        state.error = action.payload as string;
      });

    // Get single post
    builder
      .addCase(getCommunityPost.fulfilled, (state, action: PayloadAction<CommunityPost>) => {
        // This could be used to update a specific post in the list
        // For now, we'll just replace it if it exists
        const updatedPost = action.payload;
        const existingIndex = state.posts.findIndex(post => post.id === updatedPost.id);
        if (existingIndex !== -1) {
          state.posts[existingIndex] = updatedPost;
        }
      });
  },
});

export const { clearError, clearPosts } = communitySlice.actions;
export default communitySlice.reducer;
