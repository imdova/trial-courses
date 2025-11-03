"use client";
import { useState } from "react";
import EventCard from "./EventCard";
import { ArrowRight } from "lucide-react";

interface Event {
  id: number;
  title: string;
  image: string;
  location: string;
  time: string;
  description: string;
  day: string;
  topic: string;
  author: string;
  authorRole: string;
  price: number;
}

const EventSchedule = () => {
  const [activeDay, setActiveDay] = useState<string>("Day-01");

  const events: Event[] = [
    {
      id: 1,
      title:
        "Innovate 2025 Your Pathway To Business Transformation Energy Save",
      location: "Apple Upper West Side, Brooklyn",
      time: "18:15 a.m. – 07:15 a.m.",
      description:
        "When An Unknown Printer Took A Gallery Of Type And Scrambled It To Make A Type Specimen Book! Has Survived Not Only Fine Centuries, But Also The Leap Into Electronic.",
      day: "Day-01",
      topic: "Digital Marketing",
      author: "Partner Roben",
      authorRole: "Author: Cleaner",
      price: 49,
      image:
        "https://img.freepik.com/free-photo/aged-senior-businesswoman-giving-presentation-multiracial-group-office-meeting_1163-4881.jpg?t=st=1758028765~exp=1758032365~hmac=4ef1f3359c760124a069fdcbfa048b2ea0963a3ded2659171852c7a3621ac4bd&w=1060",
    },
    {
      id: 2,
      title: "Modern Marketing Strategies for Digital Age",
      location: "Tech Hub Campus, Manhattan",
      time: "14:00 p.m. – 18:00 p.m.",
      description:
        "Learn how to leverage modern digital platforms to create effective marketing campaigns that resonate with today's consumers.",
      day: "Day-02",
      topic: "Marketing Strategy",
      author: "Sarah Johnson",
      authorRole: "Marketing Director",
      price: 59,
      image:
        "https://img.freepik.com/free-photo/aged-senior-businesswoman-giving-presentation-multiracial-group-office-meeting_1163-4881.jpg?t=st=1758028765~exp=1758032365~hmac=4ef1f3359c760124a069fdcbfa048b2ea0963a3ded2659171852c7a3621ac4bd&w=1060",
    },
    {
      id: 3,
      title: "Future Trends in Digital Advertising",
      location: "Innovation Center, Queens",
      time: "10:30 a.m. – 16:45 p.m.",
      description:
        "Explore the latest trends in digital advertising including AI-driven campaigns, immersive experiences, and privacy-first approaches.",
      day: "Day-03",
      topic: "Modern Trend of Marketing",
      author: "Michael Chen",
      authorRole: "Digital Strategist",
      price: 69,
      image:
        "https://img.freepik.com/free-photo/aged-senior-businesswoman-giving-presentation-multiracial-group-office-meeting_1163-4881.jpg?t=st=1758028765~exp=1758032365~hmac=4ef1f3359c760124a069fdcbfa048b2ea0963a3ded2659171852c7a3621ac4bd&w=1060",
    },
    {
      id: 4,
      title: "Data-Driven Marketing Decisions",
      location: "Business District, Bronx",
      time: "09:00 a.m. – 17:00 p.m.",
      description:
        "How to collect, analyze, and utilize data to make informed marketing decisions that drive growth and engagement.",
      day: "Day-01",
      topic: "Digital Marketing",
      author: "Lisa Rodriguez",
      authorRole: "Data Analyst",
      price: 54,
      image:
        "https://img.freepik.com/free-photo/aged-senior-businesswoman-giving-presentation-multiracial-group-office-meeting_1163-4881.jpg?t=st=1758028765~exp=1758032365~hmac=4ef1f3359c760124a069fdcbfa048b2ea0963a3ded2659171852c7a3621ac4bd&w=1060",
    },
    {
      id: 5,
      title: "Brand Storytelling in Digital Era",
      location: "Creative Space, Staten Island",
      time: "13:00 p.m. – 19:00 p.m.",
      description:
        "Master the art of brand storytelling across digital platforms to create emotional connections with your audience.",
      day: "Day-02",
      topic: "Marketing Strategy",
      author: "David Wilson",
      authorRole: "Content Strategist",
      price: 62,
      image:
        "https://img.freepik.com/free-photo/aged-senior-businesswoman-giving-presentation-multiracial-group-office-meeting_1163-4881.jpg?t=st=1758028765~exp=1758032365~hmac=4ef1f3359c760124a069fdcbfa048b2ea0963a3ded2659171852c7a3621ac4bd&w=1060",
    },
  ];

  const days = ["Day-01", "Day-02", "Day-03"];
  const filteredEvents = events.filter((event) => event.day === activeDay);

  return (
    <section className="from-primary-foreground to-primary-foreground relative bg-white bg-gradient-to-r via-transparent px-4 py-16 sm:px-6 lg:px-8">
      <div className="container mx-auto px-6 lg:max-w-[1170px]">
        <span className="border-primary text-primary bg-primary-foreground mx-auto mb-2 block w-fit rounded-md border px-4 py-2 text-xs font-medium uppercase">
          Events Schedule
        </span>
        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="mb-6 text-4xl font-bold text-slate-800">
            Our Events Schedule Plan
          </h1>
          <p className="mx-auto max-w-3xl text-lg text-slate-600">
            Like Previous Year This Year We Are Arranging World Marketing Summit
            2024. Its The Gathering Of All The Big
          </p>
        </div>

        {/* Day Navigation */}
        <div className="mb-12 flex justify-center">
          <div className="inline-flex flex-col gap-6 rounded-xl bg-white p-1 shadow-md sm:flex-row sm:gap-2">
            {days.map((day) => (
              <button
                key={day}
                onClick={() => setActiveDay(day)}
                className={`relative cursor-pointer rounded-lg px-6 py-3 text-sm font-medium transition-all duration-300 ${
                  activeDay === day
                    ? "bg-primary text-white shadow-md"
                    : "hover:text-primary text-slate-600"
                }`}
              >
                <span className="border-primary absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full border bg-white px-2 py-1 text-xs text-gray-900">
                  {day}
                </span>
                {day === "Day-01" && "Digital Marketing"}
                {day === "Day-02" && "Marketing Strategy"}
                {day === "Day-03" && "Modern Trend of Marketing"}
              </button>
            ))}
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 gap-6">
          {filteredEvents.map((event) => (
            <EventCard
              key={event.id}
              {...event}
              onBuy={(id) => alert(`Ticket purchased for event #${id}`)}
            />
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-12 text-center">
          <button className="border-primary text-primary hover:bg-primary inline-flex cursor-pointer items-center rounded-lg border px-6 py-3 font-medium transition-colors duration-300 hover:text-white">
            View All Events
            <ArrowRight size={15} className="ml-2" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default EventSchedule;
