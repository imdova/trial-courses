"use client";
import { Bookmark, Calendar, CircleCheck, MapPin, Share2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import PlanMap from "@/assets/images/planMap.png";
import { use, useState } from "react";
import { eventsData } from "@/constants/events.data";
import NotFoundPage from "@/app/not-found";

interface EventDetailProps {
  params: Promise<{ slug: string }>;
}

export default function EventDetailPage({ params }: EventDetailProps) {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const { slug } = use(params);
  const event = eventsData.find((event) => event.id === slug);
  if (!event) return <NotFoundPage />;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-7 gap-4 px-4">
      <div className="col-span-1 lg:col-span-4">
        <div>
          {/* Event Header */}
          <section className="relative bg-white border rounded-xl shadow-sm overflow-hidden mb-4">
            <Image
              className="w-full h-[400px] object-cover"
              src={event.image}
              alt={event.title}
              width={200}
              height={200}
            />
            <div className="absolute top-2 flex justify-between items-center w-full px-2">
              <span className="font-medium text-green-600 bg-white px-3 py-1 rounded-full shadow-sm text-xs capitalize">
                {event.category}
              </span>
              <span
                className={`flex items-center gap-1 font-medium px-3 py-1 rounded-full capitalize text-xs ${
                  event.status === "active"
                    ? "text-green-600 bg-green-100"
                    : event.status === "draft"
                    ? "text-gray-500 bg-gray-100"
                    : "text-red-600 bg-red-100"
                }`}
              >
                <span
                  className={`block w-2 h-2 rounded-full ${
                    event.status === "active"
                      ? "bg-green-600"
                      : event.status === "draft"
                      ? "bg-gray-500"
                      : "bg-red-600"
                  }`}
                ></span>
                {event.status}
              </span>
            </div>
            <div className="p-4">
              <div className="flex justify-between items-center gap-3 mb-4">
                <h1 className="text-2xl font-semibold mb-2">{event.title}</h1>
                <div className="flex items-center gap-3">
                  <button className="flex justify-center items-center w-10 h-10 border rounded-full text-muted-foreground">
                    <Bookmark size={15} />
                  </button>
                  <button className="flex justify-center items-center w-10 h-10 border rounded-full text-muted-foreground">
                    <Share2 size={15} />
                  </button>
                </div>
              </div>
              <div className="flex flex-col justify-between gap-3 md:flex-row">
                <div>
                  <div className="flex items-center gap-2 text-muted-foreground mb-2">
                    <Calendar size={15} />
                    <span>
                      {event.date} - {event.time}
                    </span>
                  </div>
                  <Link
                    href={"#"}
                    className="flex items-center gap-2 text-muted-foreground mb-6 hover:underline"
                  >
                    <MapPin size={15} />
                    <span>{event.location}</span>
                  </Link>
                </div>
                {/* Tickets Sold */}
                <div>
                  <h3 className="font-semibold">Tickets Sold</h3>
                  <div className="flex items-center justify-between">
                    <span>
                      {event.ticketsSold.toLocaleString()} /{" "}
                      <span className="text-sm text-muted-foreground">
                        {event.totalTickets.toLocaleString()}
                      </span>
                    </span>
                  </div>
                </div>
                <div>
                  <span className="text-muted-foreground text-sm">Starts from</span>
                  <h2 className="text-xl text-primary font-semibold">
                    {
                      event.ticketCategories.reduce((minCat, cat) =>
                        cat.price < minCat.price ? cat : minCat
                      ).price
                    }
                    $
                  </h2>
                </div>
              </div>
              {/* About Event */}
              <div className="mb-8 border-t pt-4">
                <h2 className="text-xl font-semibold text-primary mb-2">
                  About Event
                </h2>
                <p className="text-muted-foreground">{event.description}</p>
              </div>
            </div>
          </section>
          {/* Terms & Conditions */}
          <section className="bg-white border rounded-xl shadow-sm p-4 overflow-hidden mb-4 overflow-y-auto">
            <div className="max-h-[450px]">
              <h2 className="text-xl font-semibold mb-4">Terms & Conditions</h2>
              {event.terms.map((term, index) => (
                <div key={index} className="mb-4">
                  <h3 className="font-medium mb-2">{term.title}</h3>
                  <ul className="list-disc pl-5 space-y-1 text-gray-700">
                    {term.items.map((item, itemIndex) => (
                      <li key={itemIndex}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
          {/* Merchandise content  */}
          <section className="bg-white border rounded-xl shadow-sm p-4 overflow-hidden mb-4">
            <h2 className="text-xl font-semibold mb-6">Official Merchandise</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {event.merchandise.map((item, index) => (
                <div
                  key={index}
                  className="border text-center rounded-lg p-6 hover:shadow-sm transition-shadow"
                >
                  <div className="bg-gray-100 h-40 mb-4 rounded-lg flex items-center justify-center overflow-hidden">
                    <Image
                      src={item.image}
                      width={200}
                      height={200}
                      alt={item.name}
                    />
                  </div>
                  <h3 className="font-bold mb-1">{item.name}</h3>
                  <p className="text-primary mb-4">{item.price}</p>
                </div>
              ))}
            </div>
          </section>
          {/* Partners */}
          <section className="bg-white border rounded-xl shadow-sm p-4 overflow-hidden mb-4">
            <h2 className="text-xl font-semibold mb-4">Our Partners</h2>
            <div className="flex flex-wrap gap-6">
              {event.partners.map((partner, index) => (
                <Link
                  href={partner.url}
                  key={index}
                  className="px-6 py-3 rounded-lg"
                >
                  <Image
                    className="w-[100px]"
                    src={partner.image}
                    width={200}
                    height={200}
                    alt="partner"
                  />
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>
      <div className="col-span-1 lg:col-span-3">
        {/* Seating Info */}
        <section className="bg-white border rounded-xl shadow-sm p-4 overflow-hidden mb-4">
          <h2 className="text-xl font-semibold mb-4">Seat Plan</h2>
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-end mb-4">
            <Image
              className="w-full col-span-1 md:col-span-3"
              src={PlanMap}
              width={400}
              height={400}
              alt="Plans map"
            />
            <ul className="col-span-1 md:col-span-3">
              {event.seat_plans.map((plan, index) => {
                return (
                  <li className="flex gap-2 mb-2" key={index}>
                    <div
                      style={{ backgroundColor: plan.color }}
                      className="w-4 h-4 rounded-md"
                    ></div>
                    <div>
                      <p className="flex items-center gap-2 text-sm">
                        {plan.name}{" "}
                        <span className="text-xs text-primary font-semibold">
                          ${plan.price}
                        </span>
                      </p>
                      <span className="text-muted-foreground text-xs">
                        ({plan.status})
                      </span>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="mb-6">
            <h2 className="mb-4 text-primary">Notes</h2>
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
              {event.seatingInfo.map((info, index) => (
                <li key={index}>{info}</li>
              ))}
            </ul>
          </div>
          {/* Ticket Benefits */}
          <div className="mb-8">
            <h2 className="mb-4 text-primary"> Ticket Category Benefits</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {event.ticketBenefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex flex-col justify-between border rounded-lg p-4"
                >
                  <h3 className="font-medium mb-3">{benefit.category}</h3>
                  <ul className="space-y-1 my-2">
                    {benefit.benefits.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start">
                        <svg
                          className="w-5 h-5 text-green-500 mr-2 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          ></path>
                        </svg>
                        <span className="text-muted-foreground text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <span className="font-semibold text-primary">
                    ${benefit.price}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="bg-white border rounded-xl shadow-sm p-4 overflow-hidden mb-4">
          <div>
            <h2 className="text-xl font-semibold mb-6">Ticket Packages</h2>
            <div className="flex flex-col gap-4">
              {event.ticketCategories.map((ticket, index) => (
                <div
                  key={index}
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    selectedPackage === ticket.name
                      ? "ring-2 ring-green-500 bg-green-50"
                      : "bg-gray-50 hover:shadow-sm"
                  }`}
                  onClick={() => setSelectedPackage(ticket.name)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold">{ticket.name}</h3>
                    <span className="text-green-600 font-semibold">
                      {ticket.price}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <p className="flex items-center gap-1 text-sm text-gray-600">
                      <CircleCheck size={15} />
                      {ticket.status}
                    </p>
                    <p className="flex items-center gap-1 text-sm text-gray-600">
                      {" "}
                      <CircleCheck size={15} />
                      {ticket.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
