import { useState, useRef } from "react";
import { ZoomIn, ZoomOut, ChevronLeft, ChevronRight } from "lucide-react";
import SlideViewer from "./SlideViewer";

export type Slide = {
  id: string;
  title: string;
  content: string;
  notes?: string;
  thumbnail?: string;
  pptxSlideNumber?: number;
  pptxSlideImage?: string;
};

export default function PresentationSystem() {
  //   const [slides, setSlides] = useState<Slide[]>([
  //     {
  //       id: "1",
  //       title: "Welcome Slide",
  //       content: "<h1>Business Presentation</h1><p>Quarterly Review Q2 2023</p>",
  //     },
  //     {
  //       id: "2",
  //       title: "Agenda",
  //       content:
  //         "<h2>Agenda</h2><ul><li>Financial Overview</li><li>Project Updates</li><li>Team Performance</li></ul>",
  //     },
  //   ]);

  const slides = [
    {
      id: "1",
      title: "Welcome Slide",
      content: "<h1>Business Presentation</h1><p>Quarterly Review Q2 2023</p>",
    },
    {
      id: "2",
      title: "Agenda",
      content:
        "<h2>Agenda</h2><ul><li>Financial Overview</li><li>Project Updates</li><li>Team Performance</li></ul>",
    },
  ];
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);
  const slideContainerRef = useRef<HTMLDivElement>(null);

  //   const handlePowerPointUpload = async (file: File) => {
  //     setIsLoading(true);
  //     try {
  //       // Simulate processing delay
  //       await new Promise((resolve) => setTimeout(resolve, 2000));

  //       // In a real app, you would upload to your backend here
  //       // const formData = new FormData();
  //       // formData.append('file', file);
  //       // const response = await fetch('/api/upload-ppt', { method: 'POST', body: formData });
  //       // const data = await response.json();

  //       // Mock response - replace with actual API call
  //       const mockSlides: Slide[] = Array.from({ length: 5 }, (_, i) => ({
  //         id: `ppt-${i}`,
  //         title: `PowerPoint Slide ${i + 1}`,
  //         content: `<div style="text-align:center"><h1>Slide ${
  //           i + 1
  //         }</h1><p>Content from PowerPoint</p></div>`,
  //         pptxSlideNumber: i + 1,
  //         pptxSlideImage: `https://placehold.co/900x600?text=Slide+${i + 1}`,
  //       }));

  //       setSlides(mockSlides);
  //       setCurrentSlideIndex(0);
  //     } catch (error) {
  //       console.error("Error processing PowerPoint:", error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  const goToNextSlide = () => {
    setCurrentSlideIndex((prev) => Math.min(prev + 1, slides.length - 1));
    setZoomLevel(1);
  };

  const goToPrevSlide = () => {
    setCurrentSlideIndex((prev) => Math.max(prev - 1, 0));
    setZoomLevel(1);
  };

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.1, 2));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.1, 0.5));
  };

  return (
    <div>
      {/* Main presentation area */}
      <div className="flex-1 flex flex-col gap-3 overflow-hidden">
        {/* Slide viewer */}
        <div>
          <SlideViewer
            slide={slides[currentSlideIndex]}
            zoomLevel={zoomLevel}
            slideContainerRef={slideContainerRef}
          />
        </div>

        {/* Slide controls */}
        <div className="flex flex-col-reverse items-center gap-2  justify-between">
          <div className="flex justify-center items-center w-full">
            <div className="flex items-center space-x-2">
              <button
                onClick={handleZoomOut}
                disabled={zoomLevel <= 0.5}
                className={`p-2 rounded-lg ${
                  zoomLevel <= 0.5
                    ? "text-gray-400"
                    : "text-gray-700 hover:bg-gray-200"
                }`}
              >
                <ZoomOut className="w-5 h-5" />
              </button>
              <span className="text-xs text-gray-600">
                {Math.round(zoomLevel * 100)}%
              </span>
              <button
                onClick={handleZoomIn}
                disabled={zoomLevel >= 2}
                className={`p-2 rounded-lg ${
                  zoomLevel >= 2
                    ? "text-gray-400"
                    : "text-gray-700 hover:bg-gray-200"
                }`}
              >
                <ZoomIn className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={goToPrevSlide}
              disabled={currentSlideIndex === 0}
              className={`p-2 rounded-lg ${
                currentSlideIndex === 0
                  ? "text-gray-400"
                  : "text-gray-700 hover:bg-gray-200"
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-xs text-gray-600">
              Slide {currentSlideIndex + 1} of {slides.length}
            </span>
            <button
              onClick={goToNextSlide}
              disabled={currentSlideIndex === slides.length - 1}
              className={`p-2 rounded-lg ${
                currentSlideIndex === slides.length - 1
                  ? "text-gray-400"
                  : "text-gray-700 hover:bg-gray-200"
              }`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
