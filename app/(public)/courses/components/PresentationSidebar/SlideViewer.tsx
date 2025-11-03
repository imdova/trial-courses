import { useEffect } from "react";

type SlideViewerProps = {
  slide: {
    id: string;
    title: string;
    content: string;
  };
  zoomLevel: number;
  slideContainerRef: React.RefObject<HTMLDivElement | null>;
};

export default function SlideViewer({
  slide,
  zoomLevel,
  slideContainerRef,
}: SlideViewerProps) {
  useEffect(() => {
    if (slideContainerRef.current) {
      slideContainerRef.current.style.transform = `scale(${zoomLevel})`;
      slideContainerRef.current.style.transformOrigin = "center center";
    }
  }, [zoomLevel, slideContainerRef]);

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      <div
        ref={slideContainerRef}
        className="w-full h-[220px] bg-white shadow-sm rounded-lg overflow-hidden border border-gray-200 transition-transform duration-200"
      >
        <div className="h-10 bg-gray-100 border-b border-gray-200 flex items-center px-4">
          <h3 className="text-sm font-medium text-gray-700 truncate">
            {slide.title}
          </h3>
        </div>
        <div
          className="p-8 h-[560px] overflow-auto"
          dangerouslySetInnerHTML={{ __html: slide.content }}
        />
      </div>
    </div>
  );
}
