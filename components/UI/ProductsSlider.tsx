"use client";
import { useRef, useState, useEffect, ReactNode } from "react";
import { useSwipeable } from "react-swipeable";
import { motion } from "framer-motion";
import { Exams } from "@/types/exams";
type ProductsSliderProps = {
  children: ReactNode;
  exams: Exams[];
};

const ProductsSlider: React.FC<ProductsSliderProps> = ({ children, exams }) => {
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  // Handle scroll to update arrow visibility
  const handleScroll = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth);
    }
  };

  // Handle next button click
  const handleNext = () => {
    if (sliderRef.current) {
      const cardWidth = sliderRef.current.scrollWidth / exams?.length;
      const visibleCards = Math.floor(
        sliderRef.current.clientWidth / cardWidth,
      );
      sliderRef.current.scrollBy({
        left: cardWidth * visibleCards,
        behavior: "smooth",
      });
    }
  };

  // Handle previous button click
  const handlePrev = () => {
    if (sliderRef.current) {
      const cardWidth = sliderRef.current.scrollWidth / exams?.length;
      const visibleCards = Math.floor(
        sliderRef.current.clientWidth / cardWidth,
      );
      sliderRef.current.scrollBy({
        left: -cardWidth * visibleCards,
        behavior: "smooth",
      });
    }
  };

  // Swipe handlers
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => handleNext(),
    onSwipedRight: () => handlePrev(),
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  const buttonVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
    hover: { scale: 1.1, backgroundColor: "rgba(255,255,255,0.9)" },
  };

  // Initialize scroll position and arrows
  useEffect(() => {
    handleScroll();
    const currentRef = sliderRef.current;
    currentRef?.addEventListener("scroll", handleScroll);

    return () => {
      currentRef?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="relative w-full">
      <div className="overflow-hidden">
        {/* Slider container */}
        <div {...swipeHandlers} className="relative w-full">
          <div
            ref={sliderRef}
            className="hide-scrollbar flex w-full gap-6 overflow-x-auto scroll-smooth py-2"
            style={{ scrollbarWidth: "none" }}
          >
            {children}
          </div>
        </div>

        {/* Navigation arrows */}
        {showLeftArrow && (
          <motion.button
            onClick={handlePrev}
            className="absolute top-1/2 left-2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white/80 shadow-sm hover:bg-white/90 md:flex"
            aria-label="Previous categories"
            variants={buttonVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            style={{ backdropFilter: "blur(4px)" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </motion.button>
        )}

        {showRightArrow && (
          <motion.button
            onClick={handleNext}
            className="absolute top-1/2 right-2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white/80 shadow-sm hover:bg-white/90 md:flex"
            aria-label="Next categories"
            variants={buttonVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            style={{ backdropFilter: "blur(4px)" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </motion.button>
        )}
      </div>

      {/* Hide scrollbar styles */}
      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default ProductsSlider;
