"use client";
import NotFoundPage from "@/app/not-found";
import { use } from "react";
import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  EllipsisVertical,
} from "lucide-react";
import YouTubePlayer from "@/components/UI/YouTubePlayer";
import ProgressTabs from "@/components/UI/ProgressTabs";
import Progress from "@/components/UI/Progress";
import Image from "next/image";
import { question, replies } from "@/types/courses";
import PDF from "@/assets/icons/pdf.svg";
import DOCX from "@/assets/icons/docx.svg";
import VideoFile from "@/assets/icons/video.svg";
import Link from "next/link";
import { courseData } from "@/constants/VideosData.data";
interface SingleCourseProps {
  params: Promise<{ videoID: string }>;
}

export default function OfflineVideo({ params }: SingleCourseProps) {
  const { videoID } = use(params);
  const [currentTab, setCurrentTab] = useState(0);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const handleSetCurrentVideo = (tabIndex: number, videoIndex: number) => {
    setCurrentTab(tabIndex);
    setCurrentVideoIndex(videoIndex);
  };
  const Video = courseData.find((video) => video.id === videoID);
  const [question, setQuestion] = useState("");
  const [reply, setReply] = useState("");
  const [replyIndex, setReplyIndex] = useState<string | null>(null);
  if (!Video) return <NotFoundPage />;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [questions, setQuestions] = useState<question[]>(Video.questions ?? []);

  const nextVideo = () => {
    if (
      (currentVideoIndex < Video.tabs.length - 1 && // Ensure it's not the last video
        !Video?.tabs?.[currentTab]?.items?.[currentVideoIndex + 1]?.locked) ||
      ""
    ) {
      setCurrentVideoIndex(currentVideoIndex + 1);
    }
  };

  const prevVideo = () => {
    if (
      (currentVideoIndex > 0 && // Ensure it's not the first video
        !Video?.tabs?.[currentTab]?.items?.[currentVideoIndex - 1]?.locked) ||
      ""
    ) {
      setCurrentVideoIndex(currentVideoIndex - 1);
    }
  };

  // handle Submit Qustions
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (question.trim()) {
      const newQuestion: question = {
        id: (questions.length + 1).toString(),
        user: Video.instructor,
        content: question,
        replies: [],
        timestamp: Date.now(),
        likes: 0,
        liked: false,
      };
      setQuestions([...questions, newQuestion]);
      setQuestion("");
    }
  };
  // handle Submit Reply Qustions
  const handleReplySubmit = (e: React.FormEvent, id: string) => {
    e.preventDefault();
    if (reply.trim()) {
      const newReply: replies = {
        id: `${id}-${Date.now()}`,
        user: Video.instructor,
        content: reply,
        timestamp: Date.now(),
        likes: 0,
        liked: false,
      };
      setQuestions(
        questions.map((q) =>
          q.id === id ? { ...q, replies: [...q.replies, newReply] } : q
        )
      );
      setReply("");
      setReplyIndex(null);
    }
  };
  // timestamp field to questions and replies and implemented
  const timeAgo = (timestamp: number) => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    const intervals = {
      year: 31536000,
      month: 2592000,
      day: 86400,
      hour: 3600,
      minute: 60,
    };
    for (const [key, value] of Object.entries(intervals)) {
      const count = Math.floor(seconds / value);
      if (count > 0) {
        return `${count} ${key}${count !== 1 ? "s" : ""} ago`;
      }
    }
    return "Just now";
  };

  return (
    <div>
      <h1 className="text-4xl font-bold mb-6">Offline Video</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-4">
        {/* Video Player Section */}
        <div className="shadow-halfShadow p-3 rounded-md md:col-span-2">
          <div className="flex justify-between items-center mb-3">
            <div className="mb-4">
              <h2 className="font-bold text-xl mb-3">{Video.title}</h2>
              <div className="flex gap-2 items-center ">
                <Image
                  className="w-8 h-8 rounded-full"
                  src={Video.instructor.image}
                  alt="avatar"
                  width={32}
                  height={32}
                />
                <span className="text-xs text-muted-foreground">
                  {Video.instructor.name}
                </span>
              </div>
            </div>
            <button className="text-muted-foreground">
              <EllipsisVertical size={18} />
            </button>
          </div>
          <div className="overflow-hidden relative">
            <YouTubePlayer
              videoUrl={
                Video?.tabs?.[currentTab]?.items?.[currentVideoIndex]?.url || ""
              }
              priority={true}
              height={450}
            />
          </div>
          <div className="flex justify-between mt-5">
            <button
              className="p-2 border rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
              onClick={prevVideo}
              disabled={currentVideoIndex === 0}
            >
              <ChevronLeft />
            </button>
            <button
              className="p-2 border rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
              onClick={nextVideo}
              disabled={currentVideoIndex === Video.tabs.length}
            >
              <ChevronRight />
            </button>
          </div>
        </div>
        {/* Progress Sidebar */}
        <div className="shadow-halfShadow p-3 rounded-md md:col-span-1">
          <div>
            <div className="flex justify-between items-center mb-3">
              <h2 className="font-semibold text-lg mb-3">Progress</h2>
              <button className="text-muted-foreground">
                <EllipsisVertical size={18} />
              </button>
            </div>
            <Progress value={50} />
            <div className="flex justify-between items-center mb-3">
              <p className="text-gray-500 text-xs my-3">Course Name here</p>
              <span className="text-xs text-muted-foreground">10/110</span>
            </div>
          </div>
          <ProgressTabs
            tabs={Video.tabs}
            currentTab={currentTab}
            currentVideoIndex={currentVideoIndex}
            setCurrentVideo={handleSetCurrentVideo}
            setCurrentTab={setCurrentTab}
          />
        </div>
      </div>
      <div>
        {/* Course Material content  */}
        <div>
          <div className="shadow-halfShadow p-3 rounded-md mb-4">
            <h2 className="text-xl font-bold mb-4">Course Material</h2>
            <ul>
              {Video?.materials?.map((material, index) => (
                <li
                  key={index}
                  className="flex items-center space-x-4 p-3 border-b last:border-b-0"
                >
                  <span className="text-lg">
                    <Image
                      width={30}
                      height={30}
                      src={
                        material.fileType === "pdf"
                          ? PDF
                          : material.fileType === "docx"
                          ? DOCX
                          : VideoFile
                      }
                      alt=""
                    />
                  </span>
                  <Link
                    href={material.downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary hover:underline"
                  >
                    {material.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="shadow-halfShadow p-3 rounded-md mb-4">
            <div className="">
              <h2 className="text-xl font-bold mb-4">Questions</h2>
              <ul className="space-y-4">
                {questions.length === 0 ? (
                  <p className="text-gray-500">No comments</p>
                ) : (
                  questions.map((q, index) => (
                    <li key={index} className="p-4 border rounded-lg mb-3">
                      <div className="flex items-center space-x-2 mb-2">
                        <Image
                          className="w-8 h-8 rounded-full"
                          src={q.user.image}
                          alt={q.user.name}
                          width={32}
                          height={32}
                        />
                        <span className="font-bold text-sm">{q.user.name}</span>
                        <div className="flex items-center gap-2">
                          <Clock className="text-muted-foreground" size={16} />
                          <span className="text-sm text-muted-foreground">
                            {timeAgo(q.timestamp)}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm">{q.content}</p>
                      <button
                        onClick={() => setReplyIndex(q.id)}
                        className="text-primary  mt-2"
                      >
                        Reply
                      </button>
                      {replyIndex === q.id && (
                        <form
                          onSubmit={(e) => handleReplySubmit(e, q.id)}
                          className="mt-2"
                        >
                          <textarea
                            className="w-full p-2 border rounded-lg resize-none h-[80px] outline-none"
                            placeholder="Add a reply..."
                            value={reply}
                            onChange={(e) => setReply(e.target.value)}
                          ></textarea>
                          <button
                            type="submit"
                            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-black link-smooth mt-2"
                          >
                            Add Reply
                          </button>
                        </form>
                      )}
                      <ul className="mt-3 space-y-1">
                        {q.replies.map((r) => (
                          <li
                            key={r.id}
                            className="p-2 border rounded-lg bg-[#f8f8f8] flex space-x-2 mb-3"
                          >
                            <Image
                              className="w-6 h-6 rounded-full"
                              src={r.user.image}
                              alt={r.user.name}
                              width={32}
                              height={32}
                            />
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-bold text-sm">
                                  {r.user.name}
                                </span>
                                <div className="flex items-center gap-2">
                                  <Clock className="text-muted-foreground" size={15} />
                                  <span className="text-xs text-muted-foreground">
                                    {timeAgo(r.timestamp)}
                                  </span>
                                </div>
                              </div>

                              <p className="text-sm">{r.content}</p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))
                )}
              </ul>
              <div className="mt-6">
                <h2 className="text-xl font-bold mb-4">Ask a Question</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <textarea
                    className="w-full p-2 border rounded-lg resize-none h-[150px] outline-none"
                    placeholder="What are you thoughts?"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                  ></textarea>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-black link-smooth"
                  >
                    Add Question
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
