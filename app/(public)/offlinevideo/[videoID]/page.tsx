"use client";
import NotFoundPage from "@/app/not-found";
import { use } from "react";
import { useState } from "react";
import { ChevronLeft, ChevronRight, EllipsisVertical } from "lucide-react";
import YouTubePlayer from "@/components/UI/YouTubePlayer";
import ProgressTabs from "@/components/UI/ProgressTabs";
import Progress from "@/components/UI/Progress";
import Image from "next/image";

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

  if (!Video) return <NotFoundPage />;

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

  return (
    <div className="mx-auto px-6 lg:max-w-[1170px] my-10">
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
              disabled={currentVideoIndex === 0}>
              <ChevronLeft />
            </button>
            <button
              className="p-2 border rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
              onClick={nextVideo}
              disabled={currentVideoIndex === Video.tabs.length}>
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
          ;
        </div>
      </div>
    </div>
  );
}
