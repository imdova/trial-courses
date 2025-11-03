import { CourseType, question } from "@/types/courses";
import { timeAgo } from "@/util/timeAgo";
import Image from "next/image";
import OptionsDropdown from "@/components/UI/OptionsDropdown";
import {
  Edit,
  Trash,
  ThumbsUp,
  MessageCircleMore,
  Reply,
  Loader2,
} from "lucide-react";
import { useCommunity } from "@/hooks/useCommunity";
import { CommunityPost, CreateCommunityPostRequest } from "@/types/community";
import { useEffect, useState } from "react";

interface CommunityProps {
  courseId: string;
  Video: CourseType;
  // Legacy props for backward compatibility (can be removed later)
  handleSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  questionText?: string;
  setQuestionText?: (text: string) => void;
  questions?: question[];
  handleQuestionLike?: (id: string) => void;
  setReplyIndex?: (index: string | null) => void;
  replyIndex?: string | null;
  handleReplySubmit?: (e: React.FormEvent<HTMLFormElement>, id: string) => void;
  reply?: string;
  handleReplyLike?: (questionId: string, replyId: string) => void;
  setReply?: (reply: string) => void;
}

const Community = ({
  courseId,
  Video,
  // Legacy props (kept for backward compatibility)
  questions,
}: CommunityProps) => {
  // API integration
  const {
    posts: apiPosts,
    loading,
    error,
    creating,
    updating,
    getCommunityPosts,
    createPost,
    updatePost,
    likePost,
    deletePost,
  } = useCommunity();

  // Local state for new posts and replies
  const [newPostText, setNewPostText] = useState("");
  const [replyText, setReplyText] = useState("");
  const [activeReplyId, setActiveReplyId] = useState<string | null>(null);
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");

  // Load community posts when component mounts
  useEffect(() => {
    if (courseId) {
      getCommunityPosts(courseId);
    }
  }, [courseId, getCommunityPosts]);

  // Handle creating a new post
  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostText.trim()) return;

    const postData: CreateCommunityPostRequest = {
      content: newPostText.trim(),
    };

    await createPost(courseId, postData);
    setNewPostText("");
  };

  // Handle creating a reply
  const handleCreateReply = async (e: React.FormEvent, parentId: string) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    const replyData: CreateCommunityPostRequest = {
      content: replyText.trim(),
      parentId,
    };

    await createPost(courseId, replyData);
    setReplyText("");
    setActiveReplyId(null);
  };

  // Handle liking a post
  const handleLikePost = async (postId: string) => {
    await likePost(courseId, postId);
  };

  // Handle deleting a post
  const handleDeletePost = async (postId: string) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      await deletePost(courseId, postId);
    }
  };

  // Handle edit post
  const handleEditPost = (postId: string, currentContent: string) => {
    setEditingPostId(postId);
    setEditText(currentContent);
  };

  // Handle save edit
  const handleSaveEdit = async (postId: string) => {
    if (!editText.trim()) return;

    await updatePost(courseId, postId, { content: editText.trim() });
    setEditingPostId(null);
    setEditText("");
  };

  // Handle cancel edit
  const handleCancelEdit = () => {
    setEditingPostId(null);
    setEditText("");
  };

  // Use API posts if available, otherwise fall back to legacy questions
  const displayPosts = apiPosts.length > 0 ? apiPosts : (questions || []);
  return (
    <div className="mb-4">
      {/* Error Display */}
      {error && (
        <div className="mb-4 rounded-lg bg-red-50 border border-red-200 p-4">
          <p className="text-red-800 text-sm">{error}</p>
        </div>
      )}

      {/* Create Post Form */}
      <div className="mb-6 rounded-lg border p-4">
        <form onSubmit={handleCreatePost} className="space-y-4">
          <textarea
            className="min-h-[50px] w-full resize-none p-2 outline-none"
            placeholder="Ask here to share with learners, experts and others."
            value={newPostText}
            onChange={(e) => setNewPostText(e.target.value)}
            required
            disabled={creating}
          />
          <button
            type="submit"
            disabled={creating || !newPostText.trim()}
            className="bg-primary ml-auto rounded-full px-4 py-2 text-white transition-colors hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {creating && <Loader2 className="h-4 w-4 animate-spin" />}
            Ask
          </button>
        </form>
      </div>
      {/* Loading State */}
      {loading && (
        <div className="flex justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        </div>
      )}

      {/* Posts List */}
      <ul className="space-y-4">
        {!loading && displayPosts.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No comments yet. Be the first to ask a question!</p>
        ) : (
          displayPosts.map((post, index) => {
            // Handle both API posts and legacy questions
            const isApiPost = 'user' in post && 'createdAt' in post;
            const postData: CommunityPost = isApiPost ? post as CommunityPost : {
              id: post.id,
              content: post.content,
              user: post.user,
              likes: post.likes || 0,
              liked: post.liked || false,
              replies: post.replies || [],
              createdAt: new Date(post.timestamp || Date.now()).toISOString(),
              edited: post.edited || false,
              timestamp: post.timestamp,
            };

            return (
            <li key={postData.id || index} className="relative mb-3 rounded-lg border">
              <div className="p-4">
                <div className="mb-2 flex space-x-2">
                  <Image
                    className="h-10 w-10 rounded-xl"
                    src={postData?.user?.photoUrl || postData?.user?.image || "/images/default-avatar.png"}
                    alt={postData?.user?.fullName || postData?.user?.name || "User"}
                    width={32}
                    height={32}
                  />
                  <div className="flex w-full items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold">{postData?.user?.fullName || postData?.user?.name || "User"}</span>
                      <span className="text-muted-foreground mb-1 max-w-[500px] text-xs">
                        {postData?.user?.userName || postData?.user?.info || "User"}
                      </span>
                      <div className="flex items-center gap-4">
                        <span className="text-xs">
                          {timeAgo(
                            postData.createdAt 
                              ? new Date(postData.createdAt).getTime()
                              : postData.timestamp || Date.now()
                          )}
                        </span>
                        {postData.edited && <span className="text-xs">edited</span>}
                      </div>
                    </div>
                    <div>
                      <OptionsDropdown
                        actions={[
                          {
                            label: "Edit",
                            icon: <Edit className="h-4 w-4" />,
                            onClick: () => handleEditPost(postData.id, postData.content),
                          },
                          {
                            label: "Delete",
                            icon: <Trash className="h-4 w-4" />,
                            onClick: () => handleDeletePost(postData.id),
                            danger: true,
                          },
                        ]}
                      />
                    </div>
                  </div>
                </div>
                
                {/* Post Content or Edit Form */}
                {editingPostId === postData.id ? (
                  <div className="my-4">
                    <textarea
                      className="w-full resize-none rounded-lg border p-3 outline-none min-h-[100px]"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      disabled={updating}
                    />
                    <div className="mt-2 flex gap-2">
                      <button
                        onClick={() => handleSaveEdit(postData.id)}
                        disabled={updating || !editText.trim()}
                        className="rounded-lg bg-green-600 px-4 py-2 text-sm text-white transition-colors hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                      >
                        {updating && <Loader2 className="h-4 w-4 animate-spin" />}
                        Save
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        disabled={updating}
                        className="rounded-lg bg-gray-200 px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-300 disabled:opacity-50"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="my-6 text-sm">{postData.content}</p>
                )}
                
                <div className="flex items-center gap-3">
                  {!(postData.replies?.length === 0) && postData.replies && (
                    <span className="text-muted-foreground mb-2 block text-sm">
                      {postData.replies.length} answer
                      {postData.replies.length !== 1 ? "s" : ""}
                    </span>
                  )}
                  {!(postData.likes === 0) && (
                    <span className="text-muted-foreground mb-2 block text-sm">
                      {postData.likes} like
                      {postData.likes !== 1 ? "s" : ""}
                    </span>
                  )}
                </div>
                <div className="flex gap-4 border-t px-3 pt-3">
                  <button
                    onClick={() => handleLikePost(postData.id)}
                    className={`hover:text-primary flex items-center gap-1 transition ${
                      postData.liked ? "text-primary" : ""
                    }`}
                  >
                    <ThumbsUp size={16} />
                    Like
                  </button>
                  <button
                    onClick={() =>
                      setActiveReplyId(activeReplyId === postData.id ? null : postData.id)
                    }
                    className="hover:text-primary focus:text-primary flex items-center gap-1 transition"
                  >
                    <MessageCircleMore size={16} /> Answer
                  </button>
                </div>
              </div>
              {/* Reply Form */}
              {activeReplyId === postData.id && (
                <form
                  onSubmit={(e) => handleCreateReply(e, postData.id)}
                  className="mt-2 flex gap-2 bg-[#F4F2EE] p-4"
                >
                  <Image
                    className="h-10 w-10 rounded-xl"
                    src={Video?.instructor?.image || "/images/default-avatar.png"}
                    alt={Video?.instructor?.name || "User"}
                    width={32}
                    height={32}
                  />
                  <div className="flex-1">
                    <textarea
                      className="h-[80px] w-full resize-none rounded-xl border p-2 outline-none"
                      placeholder="Add an answer..."
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      required
                      disabled={creating}
                    />
                    <div className="mt-2 flex gap-2">
                      <button
                        type="submit"
                        disabled={creating || !replyText.trim()}
                        className="rounded-lg bg-green-600 px-4 py-2 text-sm text-white transition-colors hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                      >
                        {creating && <Loader2 className="h-4 w-4 animate-spin" />}
                        Reply
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setActiveReplyId(null);
                          setReplyText("");
                        }}
                        className="rounded-lg bg-gray-200 px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-300"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </form>
              )}
              {/* Replies list */}
              {!(postData.replies?.length == 0) && postData.replies && (
                <div className="bg-[#F4F2EE] p-4">
                  <ul className="mt-3 space-y-1">
                    {postData.replies.map((reply) => (
                      <li key={reply.id} className="relative flex space-x-2 p-2">
                        <Image
                          className="h-10 w-10 rounded-xl"
                            src={reply?.user.photoUrl || reply?.user.image || "/images/default-avatar.png"}
                          alt={reply.user.fullName || reply.user.name || "User"}
                          width={32}
                          height={32}
                        />
                        <div className="flex-1">
                          <div className="mb-1 flex items-center justify-between gap-2">
                            <div className="flex flex-col">
                              <span className="text-sm font-bold">
                                {reply.user.fullName || reply.user.name || "User"}
                              </span>
                              <span className="text-muted-foreground mb-1 max-w-[500px] text-xs">
                                {reply.user.userName || reply.user.info || "User"}
                              </span>
                              <span className="text-xs">
                                {timeAgo(
                                  reply.createdAt 
                                    ? new Date(reply.createdAt).getTime()
                                    : reply.timestamp || Date.now()
                                )}
                              </span>
                            </div>
                            <OptionsDropdown
                              actions={[
                                {
                                  label: "Edit",
                                  icon: <Edit className="h-4 w-4" />,
                                  onClick: () => handleEditPost(reply.id, reply.content),
                                },
                                {
                                  label: "Delete",
                                  icon: <Trash className="h-4 w-4" />,
                                  onClick: () => handleDeletePost(reply.id),
                                  danger: true,
                                },
                              ]}
                            />
                          </div>
                          
                          {/* Reply Content or Edit Form */}
                          {editingPostId === reply.id ? (
                            <div className="my-3">
                              <textarea
                                className="w-full resize-none rounded-lg border p-3 outline-none min-h-[80px]"
                                value={editText}
                                onChange={(e) => setEditText(e.target.value)}
                                disabled={updating}
                              />
                              <div className="mt-2 flex gap-2">
                                <button
                                  onClick={() => handleSaveEdit(reply.id)}
                                  disabled={updating || !editText.trim()}
                                  className="rounded-lg bg-green-600 px-3 py-1.5 text-sm text-white transition-colors hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                >
                                  {updating && <Loader2 className="h-3 w-3 animate-spin" />}
                                  Save
                                </button>
                                <button
                                  onClick={handleCancelEdit}
                                  disabled={updating}
                                  className="rounded-lg bg-gray-200 px-3 py-1.5 text-sm text-gray-700 transition-colors hover:bg-gray-300 disabled:opacity-50"
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          ) : (
                            <p className="my-3 text-sm">{reply.content}</p>
                          )}
                          <div className="flex items-center justify-between">
                            <div className="flex gap-4">
                              <button
                                onClick={() => handleLikePost(reply.id)}
                                className={`hover:text-primary flex items-center gap-1 transition ${
                                  reply.liked ? "text-primary" : ""
                                }`}
                              >
                                <ThumbsUp size={15} />
                                Like
                              </button>
                              <button
                                onClick={() => {
                                  setActiveReplyId(postData.id);
                                  setReplyText(`@${reply.user.fullName || reply.user.name || "User"} `);
                                }}
                                className="hover:text-primary focus:text-primary flex items-center gap-1 transition"
                              >
                                <Reply size={15} /> Reply
                              </button>
                            </div>
                            {!(reply.likes === 0) && (
                              <span className="text-muted-foreground block text-sm">
                                {reply.likes} like
                                {reply.likes !== 1 ? "s" : ""}
                              </span>
                            )}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
            );
          })
        )}
      </ul>
    </div>
  );
};

export default Community;
