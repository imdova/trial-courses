import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

// Sections
import CountdownTimer from "./components/CountdownTimer";
import EventFeatures from "./components/EventFeatures";
import EventSchedule from "./components/EventSchedule";
import EventSlider from "./components/EventSlider";
import VideoSection from "./components/VideoSection";
import SpeakersSection from "./components/SpeakersSection";
import PricingSection from "./components/PricingSection";
import TestimonialsSection from "./components/TestimonialsSection";
import SponsorsSection from "./components/SponsorsSection";

export default function Events() {
  return (
    <>
      {/* Hero Section: Slider + Countdown */}
      <section className="relative">
        <EventSlider />
        <CountdownTimer />
      </section>

      {/* Event Features */}
      <section className="bg-primary">
        <EventFeatures />
      </section>

      {/* Video Introduction */}
      <section className="bg-white py-16">
        <VideoSection />
      </section>

      {/* Event Schedule */}
      <section>
        <EventSchedule />
      </section>

      {/* Call-to-Action Section with background image */}
      <section>
        <div className="relative h-[500px]">
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center brightness-30 transition-all duration-700"
            style={{ backgroundImage: `url("images/event5.jpg")` }}
          />

          {/* Gradient Overlay */}
          <div className="from-primary to-primary absolute inset-0 bg-gradient-to-br via-transparent opacity-60" />

          {/* Content */}
          <div className="relative container mx-auto h-full px-6 lg:max-w-[1170px]">
            <div className="flex h-full items-center gap-3">
              <div className="flex w-full flex-col items-center gap-1 sm:items-start">
                <h4 className="rounded-md bg-white/10 px-2 py-1 font-semibold text-white uppercase">
                  Get Experience
                </h4>
                <h1 className="max-w-sm text-center text-5xl leading-tight font-bold text-white capitalize duration-300 sm:text-start lg:max-w-lg">
                  Get the best experience in business objective
                </h1>

                {/* Button Link */}
                <Link
                  href="#"
                  className="mt-4 flex w-fit items-center gap-2 rounded-xl border border-white bg-transparent px-5 py-3 text-sm font-medium text-white uppercase transition-colors duration-300 hover:bg-white hover:text-gray-800"
                >
                  See Event details
                  <ArrowUpRight size={15} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Speakers Section */}
      <section>
        <SpeakersSection />
      </section>

      {/* Pricing Section */}
      <section>
        <PricingSection />
      </section>

      {/* Testimonials */}
      <section>
        <TestimonialsSection />
      </section>

      {/* Sponsors */}
      <section>
        <SponsorsSection />
      </section>
    </>
  );
}
