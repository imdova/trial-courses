/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import NotFoundPage from "@/app/not-found";
import { use, useEffect } from "react";
import { useState } from "react";
import { Layers, Loader2 } from "lucide-react";
import YouTubePlayer from "@/components/UI/YouTubePlayer";
import { question, replies } from "@/types/courses";
import { courseData } from "@/constants/VideosData.data";
import QuizPreview from "./components/QuizPreview";
import ProgressSidebar from "./components/ProgressSidebar";
import MaterialViewer from "./components/MaterialViewer";
import { useSingleCourse } from "./hooks/useSingleCourse";
import TabsCourse from "./components/TabsCourse";
import RelatedCourses from "./components/RelatedCourses";
import {SingleCourseSection} from "@/types/courses";
import { CourseType } from "@/types/courses";
import { useEnrolledCourses } from "@/app/(auth)/student/my-courses/hooks/useEnrolledCourses";
import { submitProgress } from "./api/api";
import { useSession } from "next-auth/react";
interface SingleCourseProps {
  params: Promise<{ videoID: string }>;
}

export default function OfflineVideo({ params }: SingleCourseProps) {
  const { videoID } = use(params);
  const Video = courseData.find((video) => video.id === videoID);
  const [currentTab, setCurrentTab] = useState(0);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [currentItemId, setCurrentItemId] = useState<string | undefined>(undefined);
  const [questionText, setQuestionText] = useState("");
  const [reply, setReply] = useState("");
  const [replyIndex, setReplyIndex] = useState<string | null>(null);
  const [selectedMaterial, setSelectedMaterial] = useState<null | {
    id: string;
    name: string;
    date: string;
    fileType: string;
    downloadUrl: string;
    courseId: string;
  }>(null);
  const [isSubmittingProgress, setIsSubmittingProgress] = useState(false);

  const defaultUser = { name: "Anonymous", image: "/images/default-avatar.png" };
  
  const [questions, setQuestions] = useState<question[]>(
    (Video?.questions ?? []).map((q) => ({
      ...q,
      likes: q.likes || 0,
      liked: q.liked || false,
      replies: q.replies.map((r) => ({
        ...r,
        likes: r.likes || 0,
        liked: r.liked || false,
      })),
    })),
  );

  const { course, loading, error, getSingleCourse } = useSingleCourse(videoID);
  const { courseItemsProgress, loadingItemsProgress, getCourseItemsProgress } = useEnrolledCourses();
  const { data: session } = useSession();
  const token = session?.user?.accessToken;
  
  useEffect(() => {
    getSingleCourse();
  }, [getSingleCourse]);

  // Fetch course items progress when course loads
  useEffect(() => {
    if (course?.id) {
      getCourseItemsProgress(course.id);
    }
  }, [course?.id, getCourseItemsProgress]);

  // Helper function to check if an item is completed
  const isItemCompleted = (itemId: string): boolean => {
    if (!courseItemsProgress?.items) return false;
    const progressItem = courseItemsProgress.items.find(item => item.id === itemId);
    return progressItem?.completed || false;
  };

  // Helper function to submit lecture progress
  const submitLectureProgress = async (itemId: string) => {
    if (!course?.id || !token) return;
    
    setIsSubmittingProgress(true);
    try {
      await submitProgress(course.id, itemId, token, {});
      // Refresh progress data after submission
      await getCourseItemsProgress(course.id);
    } catch (error) {
      console.error("Failed to submit lecture progress:", error);
    } finally {
      setIsSubmittingProgress(false);
    }
  };

  // Set initial selected item when course loads
  useEffect(() => {
    if (course?.sections && course.sections.length > 0 && !currentItemId) {
      const firstSection = course.sections[0];
      if (firstSection?.items && firstSection.items.length > 0) {
        setCurrentItemId(firstSection.items[0].id);
      }
    }
  }, [course, currentItemId]);

  // console.log(currentItemId, "course");
  // if (!Video) return <NotFoundPage />;

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="text-center space-y-6">
          {/* Animated Spinner */}
          <div className="relative">
            <div className="w-24 h-24 mx-auto">
              <div className="absolute inset-0 border-4 border-blue-200 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-transparent border-t-blue-600 rounded-full animate-spin"></div>
              <div className="absolute inset-2 border-4 border-purple-200 rounded-full"></div>
              <div className="absolute inset-2 border-4 border-transparent border-t-purple-600 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1s' }}></div>
              <Loader2 className="absolute inset-0 m-auto h-8 w-8 text-blue-600 animate-pulse" />
            </div>
          </div>

          {/* Loading Text */}
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-gray-800 animate-pulse">
              Loading Course
            </h2>
            <p className="text-gray-600 animate-pulse">
              Please wait while we prepare your learning experience...
            </p>
          </div>

          {/* Loading Progress Dots */}
          <div className="flex justify-center space-x-2">
            <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-3 h-3 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-white to-orange-50">
        <div className="text-center space-y-6 max-w-md mx-auto p-8">
          {/* Error Icon */}
          <div className="w-24 h-24 mx-auto bg-red-100 rounded-full flex items-center justify-center">
            <svg className="w-12 h-12 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>

          {/* Error Text */}
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-gray-800">
              Failed to Load Course
            </h2>
            <p className="text-gray-600">
              {error || "An error occurred while loading the course. Please try again."}
            </p>
          </div>

          {/* Retry Button */}
          <button
            onClick={() => getSingleCourse()}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Handler for when an item is clicked in the sidebar
  const handleItemClick = (sectionIndex: number, itemIndex: number, itemId: string) => {
    setCurrentTab(sectionIndex);
    setCurrentVideoIndex(itemIndex);
    setCurrentItemId(itemId);
  };

  // Get current item from API data
  const getCurrentItemFromAPI = () => {
    if (!course?.sections || !currentItemId) return null;
    
    for (const section of course.sections) {
      const item = section.items.find(i => i.id === currentItemId);
      if (item) return { section, item };
    }
    return null;
  };

  // Get current section from API data
  const getCurrentSection = () => {
    return course?.sections?.[currentTab] || null;
  };

  const currentAPIData = getCurrentItemFromAPI();
  const currentAPISection = getCurrentSection();
  const currentAPIItem = currentAPIData?.item;

  // Find next item in API sections
  const getNextItemFromAPI = () => {
    if (!course?.sections || !currentItemId) return null;

    let foundCurrent = false;
    for (const section of course.sections) {
      for (const item of section.items) {
        if (foundCurrent) {
          return { section, item };
        }
        if (item.id === currentItemId) {
          foundCurrent = true;
        }
      }
    }
    return null;
  };

  // Find previous item in API sections
  const getPrevItemFromAPI = () => {
    if (!course?.sections || !currentItemId) return null;

    let prevItem: { section: SingleCourseSection; item: SingleCourseSection['items'][0] } | null = null;
    
    for (const section of course.sections) {
      for (const item of section.items) {
        if (item.id === currentItemId) {
          return prevItem;
        }
        prevItem = { section, item };
      }
    }
    return null;
  };

  const nextVideo = async () => {
    // Submit progress for current lecture if it's not completed
    if (currentAPIItem && currentItemId) {
      const isLecture = currentAPIItem.curriculumType === "lecture";
      const isCompleted = isItemCompleted(currentItemId);
      
      if (isLecture && !isCompleted) {
        await submitLectureProgress(currentItemId);
      }
    }

    // Move to next item
    const nextItem = getNextItemFromAPI();
    if (nextItem) {
      const sectionIndex = course?.sections?.findIndex(s => s.id === nextItem.section.id) ?? 0;
      const itemIndex = nextItem.section.items.findIndex(i => i.id === nextItem.item.id);
      handleItemClick(sectionIndex, itemIndex, nextItem.item.id);
    }
  };

  const prevVideo = () => {
    const prevItem = getPrevItemFromAPI();
    if (prevItem) {
      const sectionIndex = course?.sections?.findIndex(s => s.id === prevItem.section.id) ?? 0;
      const itemIndex = prevItem.section.items.findIndex(i => i.id === prevItem.item.id);
      handleItemClick(sectionIndex, itemIndex, prevItem.item.id);
    }
  };

  // Get next and previous items for display
  const getNextItem = () => {
    const next = getNextItemFromAPI();
    return next?.item || null;
  };

  const getPrevItem = () => {
    const prev = getPrevItemFromAPI();
    return prev?.item || null;
  };

  // Helper to get item title
  const getItemTitle = (item: SingleCourseSection['items'][0] | null) => {
    if (!item) return null;
    if (item.curriculumType === 'lecture' && item.lecture) {
      return item.lecture.title;
    } else if (item.curriculumType === 'quiz' && item.quiz) {
      return item.quiz.title;
    } else if (item.curriculumType === 'assignment' && item.assignment) {
      return item.assignment.name;
    }
    return 'Untitled';
  };

  // Navigate back to previous lecture/video item
  const handleBackToCourse = () => {
    if (!course?.sections) return;

    // Find the previous lecture item
    const prevLecture = getPrevItemFromAPI();
    
    if (prevLecture) {
      // Navigate to the previous lecture
      const sectionIndex = course.sections.findIndex(s => s.id === prevLecture.section.id) ?? 0;
      const itemIndex = prevLecture.section.items.findIndex(i => i.id === prevLecture.item.id);
      handleItemClick(sectionIndex, itemIndex, prevLecture.item.id);
    } else {
      // If no previous item, try to find the first lecture in the course
      for (let i = 0; i < course.sections.length; i++) {
        const section = course.sections[i];
        const lectureItem = section.items.find(item => item.curriculumType === 'lecture');
        if (lectureItem) {
          const itemIndex = section.items.findIndex(i => i.id === lectureItem.id);
          handleItemClick(i, itemIndex, lectureItem.id);
          return;
        }
      }
    }
  };

  // Remove unused handler (kept for compatibility if needed)
  const handleSetCurrentVideo = (tabIndex: number, videoIndex: number) => {
    setCurrentTab(tabIndex);
    setCurrentVideoIndex(videoIndex);
  };

  // Qustions Area
  // handle Submit Questions
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (questionText.trim()) {
      const newQuestion: question = {
        id: (questions.length + 1).toString(),
        user: Video?.instructor || defaultUser,
        content: questionText,
        replies: [],
        timestamp: Date.now(),
        likes: 0,
        liked: false,
      };
      setQuestions([...questions, newQuestion]);
      setQuestionText("");
    }
  };

  // handle Submit Reply Questions
  const handleReplySubmit = (e: React.FormEvent, id: string) => {
    e.preventDefault();
    if (reply.trim()) {
      const newReply: replies = {
        id: `${id}-${Date.now()}`,
        user: Video?.instructor || defaultUser,
        content: reply,
        timestamp: Date.now(),
        likes: 0,
        liked: false,
      };
      setQuestions(
        questions.map((q) =>
          q.id === id ? { ...q, replies: [...q.replies, newReply] } : q,
        ),
      );
      setReply("");
      setReplyIndex(null);
    }
  };

  // Handle like for questions
  const handleQuestionLike = (questionId: string) => {
    setQuestions(
      questions.map((q) => {
        if (q.id === questionId) {
          return {
            ...q,
            likes: q.liked ? q.likes - 1 : q.likes + 1,
            liked: !q.liked,
          };
        }
        return q;
      }),
    );
  };

  // Handle like for replies
  const handleReplyLike = (questionId: string, replyId: string) => {
    setQuestions(
      questions.map((q) => {
        if (q.id === questionId) {
          return {
            ...q,
            replies: q.replies.map((r) => {
              if (r.id === replyId) {
                return {
                  ...r,
                  likes: r.liked ? r.likes - 1 : r.likes + 1,
                  liked: !r.liked,
                };
              }
              return r;
            }),
          };
        }
        return q;
      }),
    );
  };

  // View action handler
  const handleView = (materialId: string) => {
    // First try to find in Video materials (dummy data)
    let material = Video?.materials?.find((m) => m.id === materialId);
    
    // If not found, extract from API course data
    if (!material && course?.sections) {
      for (const section of course.sections) {
        const item = section.items.find((item) => item.id === materialId);
        if (item?.lecture?.materialUrl) {
          const urlParts = item.lecture.materialUrl.split('.');
          const fileExtension = urlParts[urlParts.length - 1].split('?')[0];
          
          material = {
            id: item.id,
            name: item.lecture.title || "Untitled Material",
            date: item.created_at,
            fileType: fileExtension.toUpperCase(),
            downloadUrl: item.lecture.materialUrl,
          };
          break;
        }
      }
    }
    
    if (material) {
      setSelectedMaterial({
        ...material,
        courseId: videoID,
      });
    }
  };

  // Download action handler
  const handleDownload = (url: string, fileName: string) => {
    // Create a temporary anchor element to trigger download
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.target = '_blank'; // Open in new tab if direct download fails
    link.rel = 'noopener noreferrer';
    
    // Append to body, click, and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    console.log(`Downloading ${fileName} from ${url}`);
  };

  return (
    <div>
      <div>
        <div className="mb-4 grid grid-cols-1 gap-3 lg:grid-cols-8">
          <div className="col-span-1 mt-11 h-fit w-full p-3 lg:col-span-2">
            <ProgressSidebar
              sections={course?.sections || []}
              currentTab={currentTab}
              currentItemId={currentItemId}
              onItemClick={handleItemClick}
              progressData={courseItemsProgress}
              onClose={() => {
                /* handle close */
              }}
            />
          </div>
          {/* Video/Quiz Player Section */}
          <div className="lg:col-span-6">
            <h1 className="my-3 text-xl font-bold">{Video?.title}</h1>
            <div className="grid w-full gap-3 md:grid-cols-12">
              <div className="mb-6 rounded-xl border p-3 shadow-sm md:col-span-12">
                <div className="mb-4">
                  {currentAPIItem && currentAPISection ? (
                    <>
                      <h2 className="mb-2 p-2 text-xl font-bold">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="mb-2 flex items-center gap-2 text-sm font-semibold">
                              <Layers className="text-primary" size={15} />
                              Section {currentTab + 1} :
                            </span>
                            <span className="mb-2 flex items-center gap-2 text-sm font-semibold">
                              {currentAPISection.name}
                            </span>
                          </div>
                          <span className="text-muted-foreground mb-2 flex items-center gap-2 text-sm font-semibold">
                            {getItemTitle(currentAPIItem)}
                          </span>
                        </div>
                      </h2>
                    </>
                  ) : (
                    <div className="p-4 text-lg font-semibold">
                      {loading ? "Loading course..." : "Select an item to begin"}
                    </div>
                  )}
                </div>

                {/* Conditional rendering based on content type */}
                {currentAPIItem?.curriculumType === "quiz" ? (
                  <QuizPreview 
                    quizData={currentAPIItem.quiz} 
                    courseId={course?.id}
                    itemId={currentItemId}
                    onBackToCourse={handleBackToCourse}
                  />
                ) : currentAPIItem?.curriculumType === "lecture" && currentAPIItem.lecture ? (
                  <>
                    <div className="relative overflow-hidden">
                      <YouTubePlayer
                        videoUrl={currentAPIItem.lecture.videoUrl || ""}
                        priority={true}
                        height={400}
                      />
                    </div>

                    {/* Control Buttons */}
                    <div className="my-5 flex justify-around">
                      {/* Previous Button */}
                      <div className="group flex flex-col items-center gap-3">
                        <button
                          className="relative flex items-center gap-3 rounded-xl bg-gradient-to-r from-green-500 to-green-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed disabled:scale-100 disabled:shadow-none overflow-hidden"
                          onClick={prevVideo}
                          disabled={!getPrevItem()}
                        >
                          {/* Animated Background */}
                          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                          
                          {/* Icon */}
                          <svg 
                            className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                          </svg>
                          
                          <span className="relative z-10">Previous</span>
                        </button>
                        
                        {/* Item Title Preview */}
                        <div className="hidden sm:block max-w-[180px]">
                          {getPrevItem() ? (
                            <div className="flex items-start gap-2 rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 p-3 shadow-sm border border-gray-200">
                              <div className="flex-shrink-0 mt-0.5">
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                              </div>
                              <p className="text-xs font-medium text-gray-700 line-clamp-2">
                                {getItemTitle(getPrevItem())}
                              </p>
                            </div>
                          ) : (
                            <p className="text-xs text-gray-400 italic">No previous item</p>
                          )}
                        </div>
                      </div>

                      {/* Next Button */}
                      <div className="group flex flex-col items-center gap-3">
                        <button
                          className="relative flex items-center gap-3 rounded-xl bg-gradient-to-r from-green-500 to-green-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed disabled:scale-100 disabled:shadow-none overflow-hidden"
                          onClick={nextVideo}
                          disabled={!getNextItem() || isSubmittingProgress}
                        >
                          {/* Animated Background */}
                          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                          
                          <span className="relative z-10">
                            {isSubmittingProgress ? "Saving..." : "Next"}
                          </span>
                          
                          {/* Icon */}
                          {isSubmittingProgress ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                          ) : (
                            <svg 
                              className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" 
                              fill="none" 
                              stroke="currentColor" 
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                            </svg>
                          )}
                        </button>
                        
                        {/* Item Title Preview */}
                        <div className="hidden sm:block max-w-[180px]">
                          {getNextItem() ? (
                            <div className="flex items-start gap-2 rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 p-3 shadow-sm border border-gray-200">
                              <div className="flex-shrink-0 mt-0.5">
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                              </div>
                              <p className="text-xs font-medium text-gray-700 line-clamp-2">
                                {getItemTitle(getNextItem())}
                              </p>
                            </div>
                          ) : (
                            <p className="text-xs text-gray-400 italic">No next item</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </>
                ) : currentAPIItem?.curriculumType === "assignment" ? (
                  <div className="p-8 text-center">
                    <h3 className="text-lg font-semibold">Assignment</h3>
                    <p className="text-muted-foreground mt-2">
                      Assignment viewer coming soon...
                    </p>
                  </div>
                ) : null}
              </div>
              {/* Sidebar */}
              {/* <div className="md:col-span-4">
                <PresentationSidebar />
              </div> */}
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-6">
              <TabsCourse
                Video={Video || ({} as unknown as CourseType)}
                courseData={course}
                currentItem={currentAPIItem}
                currentSection={currentAPISection || undefined}
                handleSubmit={handleSubmit}
                questionText={questionText}
                setQuestionText={setQuestionText}
                handleQuestionLike={handleQuestionLike}
                questions={questions}
                replyIndex={replyIndex}
                setReplyIndex={setReplyIndex}
                setReply={setReply}
                handleReplySubmit={handleReplySubmit}
                handleView={handleView}
                handleDownload={handleDownload}
                handleReplyLike={handleReplyLike}
                reply={reply}
              />
              <RelatedCourses relatedCourses={course?.relatedCourses} />
            </div>
          </div>
        </div>
      </div>
      {selectedMaterial && (
        <MaterialViewer
          isOpen={!!selectedMaterial}
          onClose={() => setSelectedMaterial(null)}
          material={selectedMaterial}
        />
      )}
    </div>
  );
}
