"use client";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

type Testimonial = {
  id: number;
  quote: string;
  number: number;
};

type TestimonialsProps = {
  testimonials: Testimonial[];
};

const TestimonialCard: React.FC<TestimonialsProps> = ({ testimonials }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const { quote, number } = testimonials[currentIndex];

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* Card */}
      <div className=" box-content w-full ">
        <Quote size={30} className=" text-secondary" />
        <p className="text-gray-700 p-6">{quote}</p>
        <span className="block text-center w-full text-muted-foreground">
          {number}
        </span>
      </div>

      {/* Navigation */}
      <div className="flex space-x-2">
        <button
          onClick={handlePrev}
          className="bg-white border border-gray-400 rounded p-2 hover:bg-gray-100">
          <ChevronLeft className="text-black" />
        </button>
        <button
          onClick={handleNext}
          className="bg-secondary text-white rounded p-2 hover:bg-secondary">
          <ChevronRight />
        </button>
      </div>
    </div>
  );
};

export default TestimonialCard;
