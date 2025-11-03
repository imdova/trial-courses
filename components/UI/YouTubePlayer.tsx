"use client";
import React, { useState, useMemo } from "react";
import Image from "next/image";
import { Play } from "lucide-react";

interface YouTubePlayerProps {
  videoUrl: string;
  priority?: boolean;
  height?: number;
}

const YouTubePlayer: React.FC<YouTubePlayerProps> = ({
  videoUrl,
  priority,
  height,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

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
    <div className="relative h-[400px] w-full overflow-hidden rounded-md">
      {!isPlaying ? (
        <div
          className="group relative cursor-pointer h-[400px]"
          onClick={() => setIsPlaying(true)}
        >
          <Image
            src={thumbnailUrl}
            alt="YouTube video thumbnail"
            width={450}
            height={400}
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
      ) : (
        <iframe
          src={embedUrl}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          height={height}
          className="relative top-0 left-0 w-full"
        />
      )}
    </div>
  );
};

export default YouTubePlayer;
