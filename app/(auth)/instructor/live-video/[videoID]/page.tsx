"use client";
import NotFoundPage from "@/app/not-found";
import { use } from "react";
import { useState } from "react";
import { EllipsisVertical } from "lucide-react";
import ProgressTabs from "@/components/UI/ProgressTabs";
import Progress from "@/components/UI/Progress";
import Image from "next/image";
import YouTubeLivePlayer from "@/components/UI/YouTubeLiverPlayer";
import ChatLive from "@/components/UI/ChatLive";
import { courseData } from "@/constants/VideosData.data";

interface SingleCourseProps {
  params: Promise<{ videoID: string }>;
}

export default function LiveVideo({ params }: SingleCourseProps) {
  const { videoID } = use(params);
  const [currentTab, setCurrentTab] = useState(0);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const handleSetCurrentVideo = (tabIndex: number, videoIndex: number) => {
    setCurrentTab(tabIndex);
    setCurrentVideoIndex(videoIndex);
  };
  const Video = courseData.find((video) => video.id === videoID);

  if (!Video) return <NotFoundPage />;

  return (
    <div>
      <h1 className="text-4xl font-bold mb-6">Live Video</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-4">
        {/* Video Player Section */}
        <div className="box-content md:col-span-2 ">
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
            <YouTubeLivePlayer
              views={Video?.views ?? []}
              videoUrl={
                Video?.tabs?.[currentTab]?.items?.[currentVideoIndex]?.url || ""
              }
            />
          </div>
        </div>

        {/* Progress Sidebar */}
        <div className="box-content md:col-span-1">
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
          <div>
            <ChatLive
              name={Video.instructor.name}
              image={Video.instructor.image}
              Messages={Video?.messages ?? []}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
