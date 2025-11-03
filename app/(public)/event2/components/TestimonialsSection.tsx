"use client";
import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, Play, X, Star } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  rating: number;
  content: string;
}

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const videoRef = useRef<HTMLDivElement>(null);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Jane Cooper",
      role: "CEO Manager Pro",
      rating: 5,
      content:
        "When An Unknown Printer Took A Gleisly Offer Type And Scrambled Made Type Specimens Bootstrap Survived Not Only Five Centuries But Also The Long-Ins Spectrents.",
    },
    {
      id: 2,
      name: "Robert Fox",
      role: "Marketing Director",
      rating: 5,
      content:
        "The event was incredibly well-organized with insightful speakers. I gained valuable knowledge that I've already implemented in my business with great results.",
    },
    {
      id: 3,
      name: "Emily Johnson",
      role: "Product Designer",
      rating: 4,
      content:
        "As a first-time attendee, I was blown away by the quality of content and networking opportunities. Looking forward to next year's event!",
    },
    {
      id: 4,
      name: "Michael Chen",
      role: "Software Engineer",
      rating: 5,
      content:
        "The workshops were practical and immediately applicable. The speakers were knowledgeable and engaging throughout the entire conference.",
    },
  ];

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
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "unset";
    };
  }, [isVideoOpen]);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1,
    );
  };

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial();
    }, 5000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="bg-secondary relative">
      <div className="container mx-auto px-6 lg:max-w-[1170px]">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          {/* Testimonial Content */}
          <div className="relative min-h-[500px] py-10 pr-4">
            <div className="p-8 text-white">
              <span className="text-secondary mb-2 block w-fit rounded-md border bg-white px-4 py-1 text-xs font-medium uppercase">
                Testimonial
              </span>
              <h1 className="mb-6 text-4xl font-semibold capitalize">
                What our attendees are saying?
              </h1>
              {/* Rating */}
              <div className="mb-3 flex justify-start">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < testimonials[currentIndex].rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>

              {/* Content */}
              <p className="mb-6 text-sm leading-relaxed italic">
                {testimonials[currentIndex].content}
              </p>

              {/* Author */}
              <div>
                <h4 className="text-lg font-bold">
                  {testimonials[currentIndex].name}
                </h4>
                <p className="text-sm">{testimonials[currentIndex].role}</p>
              </div>
            </div>

            {/* Navigation Arrows */}
            <div className="flex justify-end space-x-4">
              <button
                onClick={prevTestimonial}
                className="cursor-pointer rounded-full bg-white p-2 shadow-sm transition-colors duration-300 hover:bg-slate-100"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="text-primary h-4 w-4" />
              </button>
              <button
                onClick={nextTestimonial}
                className="cursor-pointer rounded-full bg-white p-2 shadow-sm transition-colors duration-300 hover:bg-slate-100"
                aria-label="Next testimonial"
              >
                <ChevronRight className="text-primary h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Static Video */}
          <div className="absolute right-0 hidden h-full w-1/2 lg:flex">
            <div
              style={{ backgroundImage: `url("images/event6.jpg")` }}
              className="absolute right-0 flex h-full w-full justify-center bg-cover bg-center brightness-50"
            />
            <div
              onClick={() => setIsVideoOpen(true)}
              className="group relative w-full cursor-pointer"
            >
              <div className="aspect-video overflow-hidden rounded-2xl">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:bg-white">
                    <Play className="fill-secondary text-secondary h-8 w-8 transition-transform duration-300 group-hover:scale-110" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Video Modal */}
        {isVideoOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4 backdrop-blur-sm transition-opacity duration-300">
            <div
              ref={videoRef}
              className="animate-in fade-in-90 zoom-in-90 bg-blackshadow-2xl relative w-full max-w-4xl scale-95 transform overflow-hidden rounded-xl transition-transform duration-300"
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
                  title="Event Highlights Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>

              <div className="bg-black p-4">
                <h3 className="text-xl font-semibold text-white">
                  Event Highlights
                </h3>
                <p className="text-slate-400">
                  Watch the best moments from our latest event
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default TestimonialsSection;
