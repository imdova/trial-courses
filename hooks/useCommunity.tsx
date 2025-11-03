import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { 
  fetchCommunityPosts,
  createCommunityPost,
  updateCommunityPost,
  deleteCommunityPost,
  likeCommunityPost,
  getCommunityPost,
  clearError,
  clearPosts
} from '@/store/slices/communitySlice';
import { 
  CreateCommunityPostRequest, 
  UpdateCommunityPostRequest,
  UseCommunityReturn 
} from '@/types/community';
import { useSession } from 'next-auth/react';

export const useCommunity = (): UseCommunityReturn => {
  const dispatch = useAppDispatch();
  const {
    posts,
    loading,
    error,
    creating,
    updating,
    deleting,
    liking
  } = useAppSelector((state) => state.community);

  const { data: session } = useSession();
  const token = session?.user?.accessToken;

  // Get community posts for a course
  const getCommunityPosts = useCallback(async (courseId: string) => {
    await dispatch(fetchCommunityPosts({ courseId, token: token || '' }));
  }, [dispatch, token]);

  // Create a new post or reply
  const createPost = useCallback(async (courseId: string, data: CreateCommunityPostRequest) => {
    const result = await dispatch(createCommunityPost({ courseId, data, token: token || '' }));
    if (createCommunityPost.fulfilled.match(result)) {
      return result.payload;
    }
    return null;
  }, [dispatch, token]);

  // Update a post or reply
  const updatePost = useCallback(async (courseId: string, postId: string, data: UpdateCommunityPostRequest) => {
    const result = await dispatch(updateCommunityPost({ courseId, postId, data, token: token || '' }));
    if (updateCommunityPost.fulfilled.match(result)) {
      return result.payload.post;
    }
    return null;
  }, [dispatch, token]);

  // Delete a post or reply
  const deletePost = useCallback(async (courseId: string, postId: string) => {
    const result = await dispatch(deleteCommunityPost({ courseId, postId, token: token || '' }));
    return deleteCommunityPost.fulfilled.match(result);
  }, [dispatch, token]);

  // Like/unlike a post or reply
  const likePost = useCallback(async (courseId: string, postId: string) => {
    const result = await dispatch(likeCommunityPost({ courseId, postId, token: token || '' }));
    if (likeCommunityPost.fulfilled.match(result)) {
      return result.payload;
    }
    return null;
  }, [dispatch, token]);

  // Get a specific post
  const getPost = useCallback(async (courseId: string, postId: string) => {
    const result = await dispatch(getCommunityPost({ courseId, postId, token: token || '' }));
    if (getCommunityPost.fulfilled.match(result)) {
      return result.payload;
    }
    return null;
  }, [dispatch, token]);

  // Clear error
  const clearErrorHandler = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  // Clear posts
  const clearPostsHandler = useCallback(() => {
    dispatch(clearPosts());
  }, [dispatch]);

  return {
    posts,
    loading,
    error,
    creating,
    updating,
    deleting,
    liking,
    getCommunityPosts,
    createPost,
    updatePost,
    deletePost,
    likePost,
    getPost,
    clearError: clearErrorHandler,
    clearPosts: clearPostsHandler,
  };
};
