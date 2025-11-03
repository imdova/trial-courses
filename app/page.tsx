"use client";

import {
  ArrowRight,
  Calendar,
  ChevronRight,
  Clock,
  GraduationCap,
  Play,
  SearchIcon,
  Star,
} from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import Thumbnail from "@/assets/images/thumbnail.jpg";
import { courseData } from "@/constants/VideosData.data";
import CourseCard from "@/components/UI/CourseCard";
import Link from "next/link";
import Carousel, { CategoryCard } from "@/components/UI/Carousel";
import { categories } from "@/constants/categories.data";
import { Ellipse6, IdeaIcon } from "@/components/icons/icons";
import { CourseContentProps } from "@/types/courses";
interface Testimonial {
  id: number;
  name: string;
  subject: string;
  rating: string;
  comment: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Haniye G.",
    subject: "English",
    rating: "4.8",
    comment:
      "As a busy professional, I appreciate the flexible learning options. The quality of instruction is outstanding.",
  },
  {
    id: 2,
    name: "John D.",
    subject: "Math",
    rating: "4.9",
    comment:
      "Excellent tutor with great teaching methods. My grades have improved significantly.",
  },
  {
    id: 3,
    name: "Sarah M.",
    subject: "Science",
    rating: "4.7",
    comment:
      "Very knowledgeable and patient. Makes complex topics easy to understand.",
  },
  {
    id: 4,
    name: "Michael T.",
    subject: "History",
    rating: "4.6",
    comment:
      "Engaging lessons that make history come alive. Highly recommended!",
  },
  {
    id: 5,
    name: "Emily R.",
    subject: "Art",
    rating: "4.9",
    comment:
      "Creative and inspiring approach to teaching art. My skills have improved dramatically.",
  },
  {
    id: 6,
    name: "David K.",
    subject: "Music",
    rating: "4.8",
    comment:
      "Talented musician and excellent teacher. Lessons are always fun and productive.",
  },
];
const newsItems = [
  {
    title: "Tool Name",
    date: "November 16, 2014",
    excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image: "/images/hero.png",
  },
  {
    title: "Trial Name",
    date: "November 16, 2014",
    excerpt:
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image: "/images/hero.png",
  },
  {
    title: "Trial Name",
    date: "November 16, 2014",
    excerpt: "Ut enim ad minim veniam, quis nostrud exercitation ullamco.",
    image: "/images/hero.png",
  },
];

const programTags = [
  "Healthcare Quality",
  "Nursing",
  "Pharmacy",
  "Infection Control",
  "Healthcare Marketing",
  "Hospital Management",
  "Nutrition",
  "Healthcare HR Management",
];

const SearchSection = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Initialize state from URL params
  useEffect(() => {
    const query = searchParams.get("q") || "";
    const tags = searchParams.get("tags")?.split(",") || [];

    setSearchQuery(query);
    setSelectedTags(tags);
  }, [searchParams]);

  const toggleTag = (tag: string) => {
    const newTags = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag];

    updateUrl(searchQuery, newTags);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateUrl(searchQuery, selectedTags);
  };

  const updateUrl = (query: string, tags: string[]) => {
    const params = new URLSearchParams();

    if (query) params.set("q", query);
    if (tags.length > 0) params.set("tags", tags.join(","));

    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <form onSubmit={handleSearch} className="mb-8 flex items-center gap-4">
        <div className="relative flex flex-1 items-center overflow-hidden rounded-2xl border shadow-sm">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Find Expert Led Courses to boost your career in Healthcare Management"
            className="w-full px-6 py-3 pr-12 text-gray-700 placeholder:text-sm focus:outline-none"
          />
          <div className="absolute right-0 mr-4 text-gray-500">
            <SearchIcon className="h-6 w-6" />
          </div>
        </div>
        <button
          type="submit"
          className="bg-primary rounded-2xl px-5 py-3 text-white transition hover:bg-green-700"
        >
          Search Programs
        </button>
      </form>
      {/* skills Tags */}
      <div className="mb-8 flex flex-wrap justify-center gap-3">
        {programTags.map((tag) => (
          <button
            key={tag}
            onClick={() => toggleTag(tag)}
            className={`rounded-full border px-5 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100`}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
};

const HomePage = () => {
  const [selectedFilter, setSelectedFilter] = useState<string | null>(
    "Best Seller",
  );
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const cardsPerPage = 3;
  const totalSlides = Math.ceil(testimonials.length / cardsPerPage);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const visibleTestimonials = testimonials.slice(
    currentSlide * cardsPerPage,
    (currentSlide + 1) * cardsPerPage,
  );
  const filterOptions = [
    "Best Seller",
    "Healthcare Management",
    "Healthcare Quality",
    "Infection Control",
    "Nutrition",
    "Pharmaceutical",
    "Pharmaceutical",
    "Pharmaceutical",
  ];
  const steps = [
    {
      title: "Find Your Tutor",
      description:
        "Well Connect You With A Tutor Who Will Motivate, Challenge, And Inspire You.",
      image: "/images/about-1.png",
    },
    {
      title: "Start Learning",
      description:
        "Your Tutor Will Guide The Way Through Your First Lesson And Help You Plan Your Next Steps.",
      image: "/images/about-2.png",
    },
    {
      title: "Start Learning",
      description:
        "Your Tutor Will Guide The Way Through Your First Lesson And Help You Plan Your Next Steps.",
      image: "/images/about-3.png",
    },
  ];

  const stats = [
    { title: "Active Students", value: "45K+" },
    { title: "Faculty Courses", value: "79+" },
    { title: "Best Professors", value: "156K" },
    { title: "Award Achieved", value: "42K" },
  ];

  // Handle filter
  // Get top 8 best selling courses (sorted by sales descending)
  const getBestSellers = (
    courses: CourseContentProps[],
  ): CourseContentProps[] => {
    return [...courses]
      .sort((a, b) => (b.sales ?? 0) - (a.sales ?? 0))
      .slice(0, 8);
  };

  const handleFilterToggle = (filter: string | null) => {
    setSelectedFilter(filter === selectedFilter ? null : filter);
  };

  const filteredCourses =
    selectedFilter === "Best Seller"
      ? getBestSellers(courseData)
      : courseData.filter((course) => course.category === selectedFilter);

  return (
    <div>
      <div className="container mx-auto px-6 lg:max-w-[1170px]">
        <h2 className="mx-auto my-8 flex max-w-6xl flex-col gap-2 text-center text-4xl leading-relaxed font-bold lg:text-6xl">
          <span className="text-primary text-4xl lg:text-6xl">
            Online Courses and Diplomas{" "}
          </span>
          For Healthcare Providers
        </h2>
        <Suspense
          fallback={
            <div className="mx-auto max-w-4xl px-4 py-8">Loading search...</div>
          }
        >
          <SearchSection />
        </Suspense>
        <div>
          <div className="my-4 flex justify-center">
            <Image
              src="/images/avatars.png"
              width={700}
              height={400}
              alt="avatars image"
            />
          </div>
          <div className="my-8">
            <h2 className="mx-auto w-fit border-b pb-4 text-4xl font-semibold">
              Most{" "}
              <span className="text-secondary text-4xl">Popular Courses</span>
            </h2>
            <div className="my-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
              <div className="flex w-full flex-wrap items-center justify-center gap-3 lg:justify-start">
                {filterOptions.map((filter, index) => (
                  <button
                    key={index}
                    onClick={() => handleFilterToggle(filter)}
                    className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                      (selectedFilter === null && filter === "All") ||
                      selectedFilter === filter
                        ? "bg-green-600 text-white"
                        : "border bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
              <Link
                className="bg-secondary flex h-10 w-10 items-center justify-center rounded-full text-white"
                href={""}
              >
                <ArrowRight size={15} />
              </Link>
            </div>
            <div className="grid min-h-[200px] grid-cols-1 items-center gap-4 md:grid-cols-2 lg:grid-cols-4">
              {filteredCourses.length > 0 ? (
                filteredCourses.map((course) => (
                  <CourseCard key={course.id} {...course} />
                ))
              ) : (
                <p className="col-span-1 mt-8 text-center text-gray-500 md:col-span-2 lg:col-span-4">
                  No courses found for this category.
                </p>
              )}
            </div>
            <div className="flex justify-center pt-8">
              <Link
                className="text-primary font-semibold hover:underline"
                href="/courses"
              >
                View All Courses
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#0B2342] px-4 py-6 text-white">
        <div className="ner mx-auto flex flex-col items-center justify-between gap-6 px-6 lg:max-w-[1170px] lg:flex-row">
          {/* Trustpilot Section */}
          <div className="flex items-center gap-3 border-white/20 pr-6 lg:border-r">
            <div className="flex items-center">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg
                  key={i}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill={i < 3 ? "#00B67A" : "#D1D5DB"}
                  className="h-5 w-5"
                >
                  <path d="M12 .587l3.668 7.431L24 9.75l-6 5.847 1.42 8.282L12 19.896 4.58 23.879 6 15.597 0 9.75l8.332-1.732z" />
                </svg>
              ))}
            </div>
            <span className="text-sm font-medium text-[#00B67A]">
              Trustpilot
            </span>
          </div>

          {/* Stats */}
          <div className="flex flex-col items-center gap-6 text-center text-xs sm:flex-row lg:text-base">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold lg:text-base">45K+</span>
              Learners
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold lg:text-base">25K+</span>
              Graduates
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold lg:text-base">54</span>
              Countries
            </div>
          </div>
        </div>
      </div>
      {/* explore courses by category */}
      <div className="bg-opacity-10 bg-[url('/images/specialty-bg.png')] bg-cover bg-center">
        <div className="bg-neutral-100/60">
          <div className="container mx-auto p-2 pt-16 lg:max-w-[1170px]">
            <div className="mb-12">
              <h2 className="text-secondary mb-6 text-center text-2xl leading-none font-bold md:text-4xl">
                <span className="text-main text-4xl font-bold md:text-4xl">
                  Explore Courses
                </span>{" "}
                By Categories
              </h2>
              <p className="text-muted-foreground mx-auto mb-16 max-w-[700px] text-center md:text-lg">
                Lorem Ipsumis simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry&apos;s standard
                dummy
              </p>
              <div className="mb-6 grid grid-cols-1 grid-rows-1">
                <div className="z-[1] col-start-1 row-start-1 w-full rounded-full bg-gray-50 p-4">
                  <div className="flex items-center">
                    <Carousel
                      navigationButtonClassName=" !bg-secondary !text-white hover:!bg-primary"
                      items={categories}
                      CustomCard={CategoryCard}
                      responsive={[
                        { breakpoint: 640, itemsToShow: 1 }, // Extra small screens
                        { breakpoint: 1024, itemsToShow: 3 }, // Small screens
                        { breakpoint: Infinity, itemsToShow: 6 }, // Medium screens
                      ]}
                    />
                  </div>
                </div>
                <div className="bg-primary z-0 col-start-1 row-start-1 h-full w-full translate-y-2 rounded-full"></div>
              </div>
            </div>
            <div>
              <h2 className="mb-3 text-center text-2xl font-semibold lg:text-4xl">
                Advance Your Career. Learn In-demand Skills.
              </h2>
              <p className="text-muted-foreground mb-12 text-center">
                Upskill in Healthcare Management, Infection Control, Healthcare
                Quality, Pharmaceutical
              </p>
              {/* skills Tags */}
              <div className="mx-auto mb-8 flex max-w-4xl flex-wrap justify-center gap-4">
                {programTags.map((tag) => (
                  <button
                    key={tag}
                    className={`rounded-full border bg-white px-5 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
              <div className="flex justify-center py-4">
                <Link
                  className="text-primary font-semibold hover:underline"
                  href="#"
                >
                  View More Tags
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative flex min-h-[200px] items-center overflow-hidden">
        <div className="absolute top-0 left-0 flex h-full w-full justify-between">
          <div className="w-full bg-[#E5F1D7]"></div>
          <div className="relative w-full bg-[#D2E7BB]">
            <span className="absolute -top-32 -left-32 h-[200px] w-[200px] rotate-45 bg-[#E5F1D7]"></span>
          </div>
        </div>
        <div className="container mx-auto h-full px-6 lg:max-w-[1170px]">
          <div className="relative flex h-full flex-col items-center justify-between gap-8 p-4 sm:flex-row">
            <div className="flex flex-col items-center sm:items-start">
              <h2 className="text-2xl font-semibold">
                Join Our Team as Instructor
              </h2>
              <p className="mb-8">Tech your students as you want.</p>
              <Link
                href="#"
                className="bg-primary rounded-xl px-4 py-2 text-white transition hover:bg-green-700"
              >
                Sign Up as Instructor Now !
              </Link>
            </div>
            <div className="flex flex-col items-center sm:items-start">
              <h2 className="text-2xl font-semibold">
                Get hired for your dream job!
              </h2>
              <p className="mb-8">Build your free resumé in minutes!</p>
              <Link
                href="#"
                className="bg-primary rounded-xl px-4 py-2 text-white transition hover:bg-green-700"
              >
                Create My Professional Resumé
              </Link>
            </div>
          </div>
        </div>
      </div>
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="container mx-auto px-6 lg:max-w-[1170px]">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Video Thumbnail */}
            <div className="flex w-full justify-center">
              <div
                onClick={() => setIsVideoOpen(true)}
                className="border-primary relative h-[300px] w-[300px] cursor-pointer rounded-full border-2 border-dotted pt-6 pl-6 lg:h-[500px] lg:w-[500px]"
              >
                <Image
                  className="rounded-full"
                  src={Thumbnail}
                  width={500}
                  height={500}
                  alt="Thumbnail Image"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-opacity-80 group-hover:bg-opacity-100 flex h-16 w-16 items-center justify-center rounded-full bg-white transition-all">
                    <Play className="h-8 w-8 text-red-600" />
                  </div>
                </div>
              </div>
            </div>
            {/* Text Content */}
            <div className="space-y-6">
              <span className="bg-primary rounded-full px-4 py-2 text-white">
                Get More About Us
              </span>
              <h3 className="max-w-[350px] text-3xl font-bold">
                Thousand Of Top{" "}
                <span
                  className="bg-primary px-6 py-3 text-xl text-white"
                  style={{
                    borderRadius: "92% 8% 93% 7% / 10% 86% 14% 90%",
                    display: "inline-block",
                  }}
                >
                  Courses
                </span>{" "}
                Now in One Place
              </h3>
              <p className="text-muted-foreground">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem ipsum has been the industrys standard dummy text
                ever since the 1500s.
              </p>
              <ul className="my-4 space-y-4">
                <li className="flex items-center gap-3">
                  <div className="w-8">
                    <span className="bg-primary flex h-7 w-7 items-center justify-center rounded-full text-white">
                      <ChevronRight size={16} />
                    </span>
                  </div>
                  <span className="text-lg font-semibold">
                    The Most World Class Instructors
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-8">
                    <span className="bg-primary flex h-7 w-7 items-center justify-center rounded-full text-white">
                      <ChevronRight size={16} />
                    </span>
                  </div>
                  <span className="text-lg font-semibold">
                    Access Your Class anywhere
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-8">
                    <span className="bg-primary flex h-7 w-7 items-center justify-center rounded-full text-white">
                      <ChevronRight size={16} />
                    </span>
                  </div>
                  <span className="text-lg font-semibold">
                    Flexible Course Plan
                  </span>
                </li>
              </ul>
              <button className="flex items-center gap-3 rounded-full bg-green-600 px-6 py-3 text-white transition-colors hover:bg-green-700">
                Start Free Trial <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </div>
        {/* Video Modal */}
        {isVideoOpen && (
          <div className="bg-opacity-75 fixed inset-0 z-50 flex items-center justify-center bg-black p-4">
            <div className="relative w-full max-w-4xl">
              <button
                onClick={() => setIsVideoOpen(false)}
                className="absolute -top-10 right-0 text-white hover:text-gray-300"
                aria-label="Close video"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              <div className="aspect-w-16 aspect-h-9">
                {/* Replace with your actual video here */}
                <iframe
                  className="h-full w-full rounded-lg"
                  src="https://www.youtube.com/embed/YOUR_VIDEO_ID?autoplay=1"
                  title="About Us Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        )}
      </section>
      <section className="from-primary to-secondary bg-gradient-to-tr">
        <div className="bg-opacity-10 bg-[url('/images/honey.svg')] bg-contain bg-center">
          <div className="container mx-auto px-2 lg:max-w-[1170px]">
            <div className="grid grid-cols-1">
              <div className="flex items-center justify-center py-12 text-center md:my-12 md:justify-start md:text-left">
                <h2 className="text-primary-foreground mb-4 text-[30px] leading-snug font-semibold lg:text-[60px]">
                  Want to stay
                  <br />
                  <span className="text-main text-[30px] font-semibold lg:text-[60px]">
                    informed
                  </span>{" "}
                  about new
                  <span className="text-main text-[30px] font-semibold lg:text-[60px]">
                    <br />
                    courses &study?
                  </span>{" "}
                </h2>
              </div>
              <div className="relative z-0 hidden md:block">
                <Image
                  src="/images/doc-woman.png"
                  alt="doc"
                  width={500}
                  height={600}
                  className="absolute right-40 bottom-0 h-[420px] w-[450px] object-cover"
                />
                <Image
                  src="/images/doc.png"
                  alt="doc"
                  width={500}
                  height={500}
                  className="absolute right-0 bottom-0 h-[500px] w-[500px] object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-[url('/images/jobs-background.jpg')] bg-cover bg-center">
        <div className="bg-white/80 px-4 py-16 sm:px-6 lg:px-8">
          <div className="container mx-auto px-2 text-center lg:max-w-[1170px]">
            <h2 className="mb-6 text-4xl font-bold text-gray-900">
              How Tutor <span className="text-secondary text-4xl">Works</span>
            </h2>

            <div className="mb-16 space-y-2 text-gray-600">
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </p>
              <p>Lorem Ipsum has been the industrys standard dummy</p>
            </div>

            {/* Steps with connecting lines */}
            <div className="relative mb-20">
              <div className="flex flex-col gap-8 md:flex-row">
                {steps.map((step, index) => (
                  <div
                    key={index}
                    className="z-10 flex flex-1 flex-col items-center lg:[&:nth-child(2)]:mt-28"
                  >
                    <div className="relative">
                      <Image
                        className="rounded-full"
                        src={step.image}
                        width={200}
                        height={200}
                        alt=""
                      />
                      <div className="bg-primary absolute top-5 right-3 flex h-8 w-8 items-center justify-center rounded-full text-white">
                        {index + 1}
                      </div>
                    </div>
                    <h3 className="mb-4 text-2xl font-bold text-gray-900">
                      {step.title}
                    </h3>
                    <p className="leading-relaxed text-gray-600">
                      {step.description}
                    </p>
                  </div>
                ))}
                <Image
                  className="absolute bottom-40 left-72 hidden h-40 w-72 lg:block"
                  src={"/images/Ellipse1.png"}
                  width={200}
                  height={200}
                  alt=""
                />
                <Image
                  className="absolute right-64 bottom-44 hidden h-40 w-80 lg:block"
                  src={"/images/Ellipse2.png"}
                  width={200}
                  height={200}
                  alt=""
                />
              </div>
            </div>
            {/* Stats */}
            <div className="flex flex-col items-center justify-between rounded-2xl bg-[#4CAF50] p-4 shadow-md sm:flex-row">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="flex flex-1 flex-grow flex-col items-center justify-center border-[#ffffff4b] p-8 text-4xl text-white last-of-type:border-none sm:border-r"
                >
                  <h2 className="text-5xl font-medium text-white">
                    {stat.value}
                  </h2>
                  <span className="block text-xs text-white">{stat.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="from-primary to-secondary bg-gradient-to-tr px-4 py-16">
        <div className="mx-auto max-w-7xl">
          <h2 className="mx-auto mb-4 max-w-2xl text-center text-4xl font-bold text-white">
            Our Top Class & Expert Instructors in One Place
          </h2>
          <div className="relative my-12 overflow-hidden">
            {/* Cards Container */}
            <div className="grid grid-cols-1 justify-center gap-6 p-2 transition-transform duration-300 lg:grid-cols-3">
              {visibleTestimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="w-full transition-all duration-300 ease-in-out"
                >
                  <div className="flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-md">
                    <div className="flex flex-col gap-3 p-3 sm:flex-row">
                      <div className="relative">
                        <Image
                          src="/images/doc.png"
                          alt="testimonial"
                          width={200}
                          height={200}
                          className="h-[200px] w-full overflow-hidden rounded-xl bg-gray-200 object-cover sm:h-[100px] sm:w-[100px]"
                        />
                      </div>
                      <div>
                        <h2 className="my-4 text-xl font-semibold">
                          {testimonial.name}
                        </h2>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex items-center gap-1 text-sm">
                            <GraduationCap size={15} className="text-primary" />
                            {testimonial.subject}
                          </div>
                          <div className="flex items-center gap-1 text-sm">
                            <Clock size={15} className="text-primary" />
                            Online
                          </div>
                          <div className="flex items-center gap-1">
                            <Star size={15} className="text-primary" />
                            <span className="text-muted-foreground text-sm">
                              ({testimonial.rating} Ratings)
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex h-full flex-col justify-between px-3">
                      <p className="text-muted-foreground my-4 text-sm">
                        {testimonial.comment}
                      </p>
                      <button className="bg-primary mb-2 ml-auto rounded-lg px-4 py-2 text-white transition hover:bg-green-700">
                        Book trial lesson
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Navigation Controls */}
            <div className="mt-8 flex justify-center gap-4">
              <div className="flex items-center gap-2">
                {Array.from({ length: totalSlides }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`h-3 w-3 rounded-full transition-all ${
                      currentSlide === index ? "w-8 bg-white" : "bg-gray-600"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3 md:flex-row">
            <div className="card relative flex w-full overflow-hidden rounded-[16px] bg-white md:h-[215px] md:w-[570px]">
              <Ellipse6 className="text-secondary absolute -bottom-5 -left-5 z-0 h-20 w-32 md:h-auto md:w-auto" />
              <IdeaIcon className="absolute top-0 left-3 z-0 md:top-3 md:left-9" />
              <Image
                src="/images/doc.png"
                alt="doc"
                width={213}
                height={260}
                className="z-[1] w-1/3 object-cover md:w-auto"
              />
              <div className="px-4 py-6">
                <h6 className="text-main text-2xl font-semibold">
                  Dr, Adam mark
                </h6>
                <p className="text-muted-foreground text-lg font-semibold">
                  Specialist
                </p>
                <p className="text-muted-foreground my-6">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry&apos;s
                  standard dummy
                </p>
              </div>
            </div>
            <div className="card relative flex w-full overflow-hidden rounded-[16px] bg-white md:h-[215px] md:w-[570px]">
              <Ellipse6 className="text-secondary absolute -bottom-5 -left-5 z-0 h-20 w-32 md:h-auto md:w-auto" />
              <IdeaIcon className="absolute top-0 left-3 z-0 md:top-3 md:left-9" />
              <Image
                src="/images/doc.png"
                alt="doc"
                width={213}
                height={260}
                className="z-[1] w-1/3 object-cover md:w-auto"
              />
              <div className="px-4 py-6">
                <h6 className="text-main text-2xl font-semibold">
                  Dr, Adam mark
                </h6>
                <p className="text-muted-foreground text-lg font-semibold">
                  Specialist
                </p>
                <p className="text-muted-foreground my-6">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry&apos;s
                  standard dummy
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* news  */}
      <section className="bg-[url('/images/jobs-background.jpg')] bg-cover bg-center">
        <div className="bg-white/80 px-4 py-16 sm:px-6 lg:px-8">
          <div className="container mx-auto px-2 text-center lg:max-w-[1170px]">
            {" "}
            {/* Section Header */}
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-4xl font-bold text-gray-900">
                Our Latest <span className="text-secondary text-4xl">News</span>
              </h2>
              <div className="mx-auto max-w-2xl space-y-1 text-gray-600">
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry.
                </p>
                <p>Lorem Ipsum has read the industrys standard dummy</p>
              </div>
            </div>
            {/* News Cards Grid */}
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {newsItems.map((item, index) => (
                <div
                  key={index}
                  className="relative overflow-hidden rounded-2xl border bg-white p-3 shadow-sm transition-shadow duration-300 hover:shadow-md"
                >
                  {/* Image */}
                  <div className="relative h-48 rounded-lg bg-gray-200">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  {/* Card Content */}
                  <div className="p-6">
                    <span className="flex items-center gap-2 text-sm text-gray-500">
                      <Calendar className="text-primary" size={17} />{" "}
                      {item.date}
                    </span>
                    <p className="mt-4 text-gray-600">{item.excerpt}</p>
                  </div>
                  <span className="bg-primary absolute top-4 left-4 rounded-full px-4 py-2 text-xs text-white">
                    Trail Name
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
