"use client";
import { useState, useRef, useEffect } from "react";
import {
  Play,
  ArrowRight,
  X,
  RecycleIcon,
  Handshake,
  Phone,
} from "lucide-react";
import Image from "next/image";

const VideoSection = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const videoRef = useRef<HTMLDivElement>(null);

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        videoRef.current &&
        !videoRef.current.contains(event.target as Node)
      ) {
        setIsVideoOpen(false);
      }
    };

    if (isVideoOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden"; // Prevent scrolling when modal is open
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "unset";
    };
  }, [isVideoOpen]);

  return (
    <div className="bg-white px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
      <div className="container mx-auto px-6 lg:max-w-[1170px]">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Video Thumbnail */}
          <div className="flex w-full justify-center">
            <div
              onClick={() => setIsVideoOpen(true)}
              className="group relative h-[300px] w-[300px] cursor-pointer pt-6 pl-6 transition-all duration-500 hover:scale-105 lg:h-[500px] lg:w-[600px]"
            >
              <div className="absolute inset-0 overflow-hidden">
                <Image
                  src="/images/event3.png"
                  width={400}
                  height={400}
                  alt="video thumbnail"
                  className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/90 shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:bg-white">
                  <Play className="fill-secondary text-secondary h-8 w-8 transition-transform duration-300 group-hover:scale-110" />
                </div>
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="space-y-4">
            <span className="border-primary text-primary bg-primary-foreground mb-2 block w-fit rounded-md border px-4 py-2 text-xs font-medium uppercase">
              About This meetup
            </span>
            <h3 className="max-w-[350px] text-3xl font-bold text-slate-800 capitalize">
              Why you should join our event program
            </h3>
            <p className="leading-relaxed">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem ipsum has been the industrys standard dummy text
              ever since the 1500s.
            </p>
            <div className="mt-2 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="space-y-2">
                <span className="bg-primary-foreground text-primary flex w-fit items-center justify-center rounded-md p-2">
                  <RecycleIcon className="h-10 w-10" />
                </span>
                <p className="text-lg font-semibold capitalize">
                  6,00+ peopels in person meet-up
                </p>
              </div>
              <div className="space-y-2">
                <span className="bg-primary-foreground text-primary flex w-fit items-center justify-center rounded-md p-2">
                  <Handshake className="h-10 w-10" />
                </span>
                <p className="text-lg font-semibold capitalize">
                  Connect with industry leaders
                </p>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-gray-700">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem ipsum has been the industrys standard dummy text
              ever since the 1500s.
            </p>
            <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
              <button className="bg-primary flex cursor-pointer items-center gap-3 rounded-md px-6 py-3 text-sm text-white transition-all duration-300 hover:scale-105 hover:gap-4 hover:shadow-lg">
                Start Free Trial <ArrowRight size={15} />
              </button>
              <div className="flex gap-2">
                <span className="bg-secondary flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-white">
                  <Phone className="h-5 w-5" />
                </span>
                <div>
                  <span className="mb-2 text-xs text-gray-700">Call Us:</span>
                  <p className="text-xs font-semibold">+1(432)-544-432</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {isVideoOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/25 p-4 backdrop-blur-sm transition-opacity duration-300">
          <div
            ref={videoRef}
            className="animate-in fade-in-90 zoom-in-90 relative w-full max-w-4xl scale-95 transform overflow-hidden rounded-xl bg-black shadow-2xl transition-transform duration-300"
          >
            <button
              onClick={() => setIsVideoOpen(false)}
              className="absolute -top-12 right-0 z-10 text-white transition-colors duration-200 hover:text-gray-300"
              aria-label="Close video"
            >
              <X size={32} />
            </button>

            <div className="relative pt-[56.25%]">
              {/* 16:9 Aspect Ratio */}
              <iframe
                className="absolute inset-0 h-full w-full"
                src="https://www.youtube.com/embed/LXb3EKWsInQ?autoplay=1"
                title="About Us Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

            <div className="bg-black p-4">
              <h3 className="text-xl font-semibold text-white">
                About Our Courses
              </h3>
              <p className="text-slate-400">
                Discover how our platform can transform your learning experience
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoSection;
