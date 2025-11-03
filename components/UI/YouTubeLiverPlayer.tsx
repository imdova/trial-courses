"use client";
import React, { useState, useMemo, useRef } from "react";
import Image from "next/image";
import { Play, Mic, Video, Power } from "lucide-react";
import { views } from "@/types/courses";

interface YouTubeLivePlayerProps {
  videoUrl: string;
  views: views[];
}

const YouTubeLivePlayer: React.FC<YouTubeLivePlayerProps> = ({
  videoUrl,
  views,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRecordingVideo, setIsRecordingVideo] = useState(false);
  const [isRecordingAudio, setIsRecordingAudio] = useState(false);
  const videoRef = useRef<HTMLIFrameElement | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);

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
    return <div className="text-red-500 h-[300px]">Invalid YouTube URL</div>;
  }

  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&modestbranding=1&rel=0`;
  const thumbnailUrl = `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`;

  const handleVideoRecording = async () => {
    if (isRecordingVideo) {
      mediaRecorderRef.current?.stop();
      setIsRecordingVideo(false);
    } else {
      try {
        const stream = await navigator.mediaDevices.getDisplayMedia({
          video: true,
        });
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;

        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            recordedChunksRef.current.push(event.data);
          }
        };

        mediaRecorder.onstop = () => {
          const blob = new Blob(recordedChunksRef.current, {
            type: "video/webm",
          });
          recordedChunksRef.current = [];
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = "recorded-video.webm";
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        };

        mediaRecorder.start();
        setIsRecordingVideo(true);
      } catch (error) {
        console.error("Error accessing screen recording", error);
      }
    }
  };

  const handleAudioRecording = async () => {
    if (isRecordingAudio) {
      mediaRecorderRef.current?.stop();
      setIsRecordingAudio(false);
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;

        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            recordedChunksRef.current.push(event.data);
          }
        };

        mediaRecorder.onstop = () => {
          const blob = new Blob(recordedChunksRef.current, {
            type: "audio/webm",
          });
          recordedChunksRef.current = [];
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = "recorded-audio.webm";
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        };

        mediaRecorder.start();
        setIsRecordingAudio(true);
      } catch (error) {
        console.error("Error accessing audio recording", error);
      }
    }
  };

  return (
    <div className="relative w-full h-full overflow-hidden rounded-md">
      {!isPlaying ? (
        <div
          className="relative cursor-pointer group"
          onClick={() => setIsPlaying(true)}>
          <Image
            src={thumbnailUrl}
            alt="YouTube video thumbnail"
            width={450}
            height={450}
            className="w-full h-[450px] object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 transition-all group-hover:bg-opacity-50">
            <Play
              size={64}
              className="text-white opacity-80 transition-opacity group-hover:opacity-100"
            />
          </div>
        </div>
      ) : (
        <>
          <iframe
            ref={videoRef}
            src={embedUrl}
            title="YouTube live player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="relative left-0 top-0 w-full h-[450px]"
          />
        </>
      )}
      <div className="flex justify-between gap-2 mt-5">
        <div className="flex items-center -space-x-4 ">
          {views.slice(0, 4).map((view, index) => {
            return (
              <div className="flex items-center" key={index}>
                <Image
                  className="w-10 h-10 rounded-lg border-4 border-white object-cover"
                  src={view.image}
                  width={200}
                  height={200}
                  alt={""}
                />
              </div>
            );
          })}

          {views.length > 4 && (
            <div
              className="flex justify-center items-center w-11 h-11 rounded-lg border-4 border-white  bg-primary text-white"
              key="placeholder">
              +{views.length}
            </div>
          )}
        </div>
        <div className="flex gap-3">
          <button
            className={`p-2 rounded-md ${
              isRecordingAudio ? "bg-red-700" : "bg-primary"
            } text-white`}
            onClick={handleAudioRecording}>
            <Mic size={24} />
          </button>
          <button
            className={`p-2 rounded-md ${
              isRecordingVideo ? "bg-red-700" : "bg-primary"
            } text-white`}
            onClick={handleVideoRecording}>
            <Video size={24} />
          </button>
          <button
            className="p-2 rounded-md bg-red-500 text-white"
            onClick={() => setIsPlaying(false)}>
            <Power size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default YouTubeLivePlayer;
