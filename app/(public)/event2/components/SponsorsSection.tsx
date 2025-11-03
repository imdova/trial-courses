"use client";

import Image from "next/image";

// Sponsor interface
interface Sponsor {
  id: number;
  name: string;
  logo: string;
  tier: "platinum" | "gold" | "silver";
}

// Blog post interface
interface BlogPost {
  id: number;
  title: string;
  date: string;
  comments: number;
  category: string;
  image: string;
}

const SponsorsSection = () => {
  // Sponsors data
  const sponsors: Sponsor[] = [
    { id: 1, name: "Boltax", logo: "/sponsors/boltax.png", tier: "platinum" },
    { id: 2, name: "Versa", logo: "/sponsors/versa.png", tier: "gold" },
    { id: 3, name: "Gedel", logo: "/sponsors/gedel.png", tier: "gold" },
    { id: 4, name: "Oklae", logo: "/sponsors/oklae.png", tier: "silver" },
    { id: 5, name: "Majaeo", logo: "/sponsors/majaeo.png", tier: "silver" },
    { id: 6, name: "JACKOE", logo: "/sponsors/jackoe.png", tier: "platinum" },
    { id: 7, name: "Makton", logo: "/sponsors/makton.png", tier: "gold" },
    { id: 8, name: "Wowex", logo: "/sponsors/wowex.png", tier: "gold" },
    {
      id: 9,
      name: "PROPOSITIO",
      logo: "/sponsors/propositio.png",
      tier: "platinum",
    },
  ];

  // Blog posts data
  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: "Civil Litigation Papers Of Conference",
      image:
        "https://img.freepik.com/free-photo/people-taking-part-business-event_23-2149333683.jpg?t=st=1758039264~exp=1758042864~hmac=a4a36be217dc18f202d2fdb040f277b6387239f9f862a5270256c7c44d912960&w=1060",
      date: "28 Jan, 2024",
      comments: 12,
      category: "CONFERENCE",
    },
    {
      id: 2,
      title: "Reinventing Experiences Of Creativity",
      date: "28 Jan, 2024",
      comments: 12,
      category: "REINVESTING",
      image:
        "https://img.freepik.com/free-photo/people-taking-part-business-event_23-2149333683.jpg?t=st=1758039264~exp=1758042864~hmac=a4a36be217dc18f202d2fdb040f277b6387239f9f862a5270256c7c44d912960&w=1060",
    },
    {
      id: 3,
      title: "The Save Soil, Save World Projects In 2024",
      date: "28 Jan, 2024",
      comments: 12,
      category: "CONFERENCE",
      image:
        "https://img.freepik.com/free-photo/people-taking-part-business-event_23-2149333683.jpg?t=st=1758039264~exp=1758042864~hmac=a4a36be217dc18f202d2fdb040f277b6387239f9f862a5270256c7c44d912960&w=1060",
    },
  ];

  return (
    <section>
      <div className="container mx-auto px-6 py-14 lg:max-w-[1170px]">
        {/* Sponsors Section */}
        <div className="mb-20">
          {/* Header */}
          <div className="mb-12 text-center">
            <span className="border-primary text-primary bg-primary-foreground mx-auto mb-2 block w-fit rounded-md border px-4 py-2 text-xs font-medium uppercase">
              Sponsors
            </span>
            <h3 className="mb-6 text-2xl font-semibold">
              Official Sponsors & Partners
            </h3>
            <p className="mx-auto max-w-3xl text-slate-500">
              Like Previous Year This Year Re Arranging World Marketing Summit
              Its The Gathering
            </p>
          </div>

          {/* Sponsors Grid */}
          <div className="mb-16 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {sponsors.map((sponsor) => (
              <div
                key={sponsor.id}
                className={`flex items-center rounded-lg border-2 border-gray-300 bg-gray-50 p-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg`}
              >
                <div className="flex items-center gap-2">
                  <div className="from-primary to-secondary flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r text-sm font-bold text-white">
                    {sponsor.name.charAt(0)}
                  </div>
                  <span className="font-semibold text-slate-800">
                    {sponsor.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Conference Insights Section */}
      <div className="from-primary-foreground to-primary-foreground bg-gradient-to-r via-white py-14">
        <div className="container mx-auto px-6 lg:max-w-[1170px]">
          {/* Header */}
          <div className="mb-12 text-center">
            <span className="bg-primary mx-auto mb-2 block w-fit rounded-md border px-4 py-2 text-xs font-medium text-white uppercase">
              Blog post
            </span>
            <h2 className="mb-6 text-3xl font-bold text-slate-800">
              Insights From Business Experts Meetup
            </h2>
            <p className="mx-auto max-w-3xl text-slate-500">
              Like Previous Year This Year We Are Arranging World Marketing
              Summit 2024. Its The Gathering Of All The Big
            </p>
          </div>

          {/* Blog Posts Grid */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {blogPosts.map((post) => (
              <div
                key={post.id}
                className="overflow-hidden rounded-lg bg-slate-50 shadow-sm transition-all duration-300 hover:-translate-y-1"
              >
                {/* Image placeholder */}
                <div className="relative h-48">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-4 left-4">
                    <span className="text-primary rounded-full bg-white/90 px-3 py-1 text-xs font-semibold">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="mb-4 line-clamp-2 text-xl font-bold text-slate-800">
                    {post.title}
                  </h3>
                  <div className="flex items-center justify-between text-sm text-slate-500">
                    <span>{post.date}</span>
                    <span>{post.comments} Comments</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SponsorsSection;
