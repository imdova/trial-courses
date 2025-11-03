"use client";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ExamCard from "./ExamCard";
import { Exams } from "@/types/exams";
type SlideProps = {
  ExamData: Exams[];
};
export default function InstructorsSlide({ ExamData }: SlideProps) {
  const [current, setCurrent] = useState(0);
  // State to store the selected filter category
  const [filter, setFilter] = useState<
    | "All"
    | "Doctors"
    | "Dentists"
    | "Physiotherapists"
    | "Pharmacists"
    | "Nurses"
    | "Technicians"
  >("All");

  // Filter exams based on the selected category
  const filteredExams =
    filter === "All"
      ? ExamData
      : ExamData.filter((exam) => exam.category.title === filter);

  // Number of cards visible at a time
  const visibleCards = 6;

  // Calculate total slides needed for pagination
  const totalSlides = Math.max(filteredExams.length - (visibleCards - 1), 1);

  // Disable buttons if no exams are available
  const isDisabled = filteredExams.length < visibleCards;

  // Function to move to the next slide
  const nextSlide = () => {
    if (!isDisabled) {
      setCurrent((prev) => (prev + 1) % totalSlides);
    }
  };

  // Function to move to the previous slide
  const prevSlide = () => {
    if (!isDisabled) {
      setCurrent((prev) => (prev - 1 + totalSlides) % totalSlides);
    }
  };
  return (
    <div className="relative mb-4 w-full overflow-hidden rounded-2xl p-4">
      <div className="flex flex-col items-center justify-between lg:flex-row">
        <div className="mb-8 flex w-full flex-col items-center justify-between gap-2 lg:flex-row">
          <div className="flex w-full flex-col gap-2 lg:w-fit lg:flex-row">
            {[
              "All",
              "Doctors",
              "Dentists",
              "Physiotherapists",
              "Pharmacists",
              "Nurses",
              "Technicians",
            ].map((category) => (
              <button
                key={category}
                onClick={() =>
                  setFilter(
                    category as
                      | "All"
                      | "Doctors"
                      | "Dentists"
                      | "Physiotherapists"
                      | "Pharmacists"
                      | "Nurses"
                      | "Technicians",
                  )
                }
                className={`w-full flex-1 rounded-md border px-4 py-2 text-sm ${
                  filter === category ? "bg-primary text-white" : "bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        <div className="mb-8 flex gap-3">
          <button
            onClick={prevSlide}
            className={`text-primary border-primary hover:bg-primary flex h-10 w-10 items-center justify-center rounded-full border hover:text-white ${
              isDisabled
                ? "hover:text-muted-foreground hover:border-secondary cursor-not-allowed hover:bg-white"
                : ""
            }`}
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextSlide}
            className={`text-primary border-primary hover:bg-primary flex h-10 w-10 items-center justify-center rounded-full border hover:text-white ${
              isDisabled
                ? "hover:text-muted-foreground hover:border-secondary cursor-not-allowed hover:bg-white"
                : ""
            }`}
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>

      <div className="min-h-[300px] w-full">
        <div className="grid w-full grid-cols-1 gap-3 px-4 sm:grid-cols-2 md:grid-cols-3">
          {filteredExams.slice(current, current + visibleCards).map((exam) => (
            <ExamCard
              key={exam.id}
              id={exam.id}
              images={exam.images}
              title={exam.title}
              category={exam.category}
              authority={exam.authority}
              qustions={exam.qustions}
              exam_date={exam.exam_date}
              providers={exam.providers}
              price={exam.price}
            />
          ))}
        </div>
        {filteredExams.length === 0 ? (
          <p className="text-muted-foreground text-center">Not Found Exams</p>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
