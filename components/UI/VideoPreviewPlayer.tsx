"use client";
import React, { useState, useMemo } from "react";
import Image from "next/image";
import { Play, X } from "lucide-react";

interface VideoPreviewPlayerProps {
  videoUrl: string;
  priority?: boolean;
  height: number;
}

const VideoPreviewPlayer: React.FC<VideoPreviewPlayerProps> = ({
  videoUrl,
  priority,
  height,
}) => {
  const [showModal, setShowModal] = useState(false);

  // Extract YouTube video ID
  const videoId = useMemo(() => {
    try {
      const url = new URL(videoUrl);
      let id = url.searchParams.get("v"); // Standard YouTube URL (e.g., ?v=VIDEO_ID)

      if (!id) {
        // Handle direct embed or shortened URLs
        const paths = url.pathname.split("/");
        id = paths[paths.length - 1]; // Extract the last segment as video ID
      }

      return id;
    } catch {
      return null;
    }
  }, [videoUrl]);

  if (!videoId) {
    return <div className="h-[300px] text-red-500">Invalid YouTube URL</div>;
  }

  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&modestbranding=1&rel=0`;
  const thumbnailUrl = `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`;

  return (
    <>
      <div className="relative h-full w-full overflow-hidden">
        <div
          className="group relative cursor-pointer"
          onClick={() => setShowModal(true)}
        >
          <Image
            src={thumbnailUrl}
            alt="YouTube video thumbnail"
            width={450}
            height={height}
            priority={priority}
            className="w-full object-cover"
          />
          <div className="bg-opacity-40 group-hover:bg-opacity-50 absolute inset-0 flex items-center justify-center bg-black transition-all">
            <Play
              size={64}
              className="text-white opacity-80 transition-opacity group-hover:opacity-100"
            />
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
          <div className="relative aspect-video w-full max-w-4xl">
            <button
              onClick={() => setShowModal(false)}
              className="absolute -top-10 right-0 text-white transition-colors hover:text-gray-300"
              aria-label="Close video"
            >
              <X size={24} />
            </button>
            <iframe
              src={embedUrl}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="h-full w-full"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default VideoPreviewPlayer;
