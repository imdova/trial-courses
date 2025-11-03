"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";

const slides = [
  {
    date: "18.22 NOV, 2025",
    title: "Digital Marketing Meetup 2025",
    image: "/images/events.jpg",
    button: {
      title: "Book your set",
      url: "#",
    },
  },
  {
    date: "10 DEC, 2025",
    title: "Tech Innovators Conference",
    image: "/images/events.jpg",
    button: {
      title: "Book your set",
      url: "#",
    },
  },
  {
    date: "05 JAN, 2026",
    title: "AI & Future of Work Summit",
    image: "/images/events.jpg",
    button: {
      title: "Book your set",
      url: "#",
    },
  },
];

export default function EventSlider() {
  const [current, setCurrent] = useState(0);
  const [animate, setAnimate] = useState(false);

  const changeSlide = (newIndex: number) => {
    setAnimate(false); // reset animation
    setTimeout(() => {
      setCurrent(newIndex);
      setAnimate(true); // re-trigger animation
    }, 50);
  };

  const prevSlide = () => {
    changeSlide(current === 0 ? slides.length - 1 : current - 1);
  };

  const nextSlide = () => {
    changeSlide(current === slides.length - 1 ? 0 : current + 1);
  };

  return (
    <div className="relative h-screen w-full overflow-hidden md:h-[650px]">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center brightness-50 transition-all duration-700"
        style={{ backgroundImage: `url(${slides[current].image})` }}
      />

      {/* Gradient overlay */}
      <div className="from-primary to-primary absolute inset-0 bg-gradient-to-br via-transparent opacity-30" />

      {/* Content */}
      <div className="z-10 flex h-full flex-col justify-center p-6">
        <div className="relative container mx-auto px-6 lg:max-w-[1170px]">
          <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
            <div className="flex flex-col items-center gap-1 sm:items-start">
              <h4
                className={`font-semibold text-white duration-300 ${
                  animate ? "animate-in" : ""
                }`}
              >
                {slides[current].date}
              </h4>
              <h1
                className={`max-w-sm text-center text-5xl leading-tight font-bold text-white duration-300 sm:text-start lg:max-w-lg ${
                  animate ? "animate-in delay-150" : ""
                }`}
              >
                {slides[current].title}
              </h1>
              <Link
                className={`mt-4 flex w-fit items-center gap-2 rounded-xl border border-white bg-transparent px-5 py-3 text-sm font-medium text-white uppercase transition-colors duration-300 hover:bg-white hover:text-gray-800 ${animate ? "animate-in delay-150" : ""}`}
                href={slides[current].button.url}
              >
                {slides[current].button.title}
                <ArrowUpRight size={15} />
              </Link>
            </div>
            <div className="mt-8 flex gap-2 sm:mt-0 sm:flex-col">
              {/* Arrows */}
              <button
                type="button"
                onClick={prevSlide}
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white/40 text-white transition-colors hover:scale-110 hover:bg-white hover:text-gray-800"
              >
                <ArrowLeft size={16} />
              </button>
              <button
                type="button"
                onClick={nextSlide}
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white/40 text-white transition-colors hover:scale-110 hover:bg-white hover:text-gray-800"
              >
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
