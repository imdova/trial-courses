"use client";

import { ArrowRight } from "lucide-react";
import SpeakerCard from "./SpeakerCard";

interface Speaker {
  id: number;
  name: string;
  role: string;
  image: string;
  socialLinks: {
    twitter?: string;
    linkedin?: string;
    instagram?: string;
    facebook?: string;
  };
}

const SpeakersSection = () => {
  const speakers: Speaker[] = [
    {
      id: 1,
      name: "Eather Howard",
      role: "Marketing Manager",
      image:
        "https://img.freepik.com/free-photo/beautiful-woman-silk-jacket-smiling-pink-background_197531-15028.jpg?t=st=1758033516~exp=1758037116~hmac=6f1d9cd90b3125ac9945fcc0b34d1d01abc97f2b0884abe3ec0e9cb9cfe3142c&w=1060",
      socialLinks: {
        twitter: "#",
        linkedin: "#",
        instagram: "#",
        facebook: "#",
      },
    },
    {
      id: 2,
      name: "Cody Fisher",
      role: "Digital Researcher",
      image:
        "https://img.freepik.com/free-photo/beautiful-woman-silk-jacket-smiling-pink-background_197531-15028.jpg?t=st=1758033516~exp=1758037116~hmac=6f1d9cd90b3125ac9945fcc0b34d1d01abc97f2b0884abe3ec0e9cb9cfe3142c&w=1060",
      socialLinks: {
        twitter: "#",
        linkedin: "#",
        instagram: "#",
        facebook: "#",
      },
    },
    {
      id: 3,
      name: "Cody Fisher",
      role: "St. Software Engineer",
      image:
        "https://img.freepik.com/free-photo/beautiful-woman-silk-jacket-smiling-pink-background_197531-15028.jpg?t=st=1758033516~exp=1758037116~hmac=6f1d9cd90b3125ac9945fcc0b34d1d01abc97f2b0884abe3ec0e9cb9cfe3142c&w=1060",
      socialLinks: {
        twitter: "#",
        linkedin: "#",
        instagram: "#",
        facebook: "#",
      },
    },
    {
      id: 4,
      name: "Cody Fisher",
      role: "St. Software Engineer",
      image:
        "https://img.freepik.com/free-photo/beautiful-woman-silk-jacket-smiling-pink-background_197531-15028.jpg?t=st=1758033516~exp=1758037116~hmac=6f1d9cd90b3125ac9945fcc0b34d1d01abc97f2b0884abe3ec0e9cb9cfe3142c&w=1060",
      socialLinks: {
        twitter: "#",
        linkedin: "#",
        instagram: "#",
        facebook: "#",
      },
    },
    {
      id: 5,
      name: "Eather Howard",
      role: "Marketing Manager",
      image:
        "https://img.freepik.com/free-photo/beautiful-woman-silk-jacket-smiling-pink-background_197531-15028.jpg?t=st=1758033516~exp=1758037116~hmac=6f1d9cd90b3125ac9945fcc0b34d1d01abc97f2b0884abe3ec0e9cb9cfe3142c&w=1060",
      socialLinks: {
        twitter: "#",
        linkedin: "#",
        instagram: "#",
        facebook: "#",
      },
    },
    {
      id: 6,
      name: "Cody Fisher",
      role: "Digital Researcher",
      image:
        "https://img.freepik.com/free-photo/beautiful-woman-silk-jacket-smiling-pink-background_197531-15028.jpg?t=st=1758033516~exp=1758037116~hmac=6f1d9cd90b3125ac9945fcc0b34d1d01abc97f2b0884abe3ec0e9cb9cfe3142c&w=1060",
      socialLinks: {
        twitter: "#",
        linkedin: "#",
        instagram: "#",
        facebook: "#",
      },
    },
    {
      id: 7,
      name: "Cody Fisher",
      role: "St. Software Engineer",
      image:
        "https://img.freepik.com/free-photo/beautiful-woman-silk-jacket-smiling-pink-background_197531-15028.jpg?t=st=1758033516~exp=1758037116~hmac=6f1d9cd90b3125ac9945fcc0b34d1d01abc97f2b0884abe3ec0e9cb9cfe3142c&w=1060",
      socialLinks: {
        twitter: "#",
        linkedin: "#",
        instagram: "#",
        facebook: "#",
      },
    },
    {
      id: 8,
      name: "Cody Fisher",
      role: "St. Software Engineer",
      image:
        "https://img.freepik.com/free-photo/beautiful-woman-silk-jacket-smiling-pink-background_197531-15028.jpg?t=st=1758033516~exp=1758037116~hmac=6f1d9cd90b3125ac9945fcc0b34d1d01abc97f2b0884abe3ec0e9cb9cfe3142c&w=1060",
      socialLinks: {
        twitter: "#",
        linkedin: "#",
        instagram: "#",
        facebook: "#",
      },
    },
  ];

  return (
    <section className="bg-slate-50 px-4 py-16 sm:px-6 lg:px-8">
      <div className="container mx-auto px-6 lg:max-w-[1170px]">
        <span className="border-primary text-primary bg-primary-foreground mx-auto mb-2 block w-fit rounded-md border px-4 py-2 text-xs font-medium uppercase">
          Learn from Speakers
        </span>
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-slate-800">
            Our Amazing & Learned Event Speakers
          </h1>
          <p className="mx-auto max-w-3xl text-lg text-slate-600">
            Meet our industry experts who will share their knowledge and
            experience at the event
          </p>
        </div>

        {/* Speakers Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {speakers.map((speaker) => (
            <SpeakerCard key={speaker.id} speaker={speaker} />
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-12 text-center">
          <button className="hover:border-primary hover:text-primary hover:bg-primary-foreground inline-flex cursor-pointer items-center rounded-lg border border-slate-200 bg-white px-6 py-3 font-medium text-slate-700 transition-colors duration-300">
            View All Speakers
            <ArrowRight size={15} className="ml-2" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default SpeakersSection;
