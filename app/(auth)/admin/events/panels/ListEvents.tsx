"use client";
import { Calendar, MapPin, Ticket } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { eventsData } from "@/constants/events.data";
import { EventType } from "@/types/courses";
import Link from "next/link";
import { Card } from "@/components/UI/card";

const ListEvents = () => {
  const [events, setEvents] = useState<EventType[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<EventType[]>([]);
  const [activeTab, setActiveTab] = useState<"active" | "draft" | "past">(
    "active",
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [timeFilter, setTimeFilter] = useState("This Month");
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 5;

  // Generate dummy data
  useEffect(() => {
    setEvents(eventsData);
    setFilteredEvents(eventsData);
  }, []);

  // Apply filters
  useEffect(() => {
    let result = events.filter((event) => event.status === activeTab);

    if (searchQuery) {
      result = result.filter(
        (event) =>
          event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          event.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
          event.category.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    if (selectedCategory !== "All") {
      result = result.filter((event) => event.category === selectedCategory);
    }

    if (timeFilter === "This Month") {
      // Simplified filter for demo purposes
      result = result.filter(
        (event) => event.date.includes("May") || event.date.includes("June"),
      );
    }

    setFilteredEvents(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [events, activeTab, searchQuery, selectedCategory, timeFilter]);

  // Get current events for pagination
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = filteredEvents.slice(
    indexOfFirstEvent,
    indexOfLastEvent,
  );
  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);

  const categories = [
    "All Category",
    "Outdoor & Adventure",
    "Food & Culinary",
    "Music",
    "Fashion",
    "Art & Design",
    "Technology",
  ];
  const timeFilters = ["This Month", "Next Month", "All Upcoming"];

  return (
    <Card className="p-4">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Events</h1>
        <p className="text-gray-600">View and manage all your Events</p>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-col flex-wrap gap-4 rounded-lg bg-gray-50 p-3 md:flex-row md:items-center md:justify-between">
        {/* Tabs */}
        <div className="flex flex-1 space-x-4">
          <button
            className={`rounded-lg px-4 py-2 text-sm sm:min-w-[100px] ${
              activeTab === "active" ? "bg-primary text-white" : "bg-white"
            }`}
            onClick={() => setActiveTab("active")}
          >
            Active{" "}
            <span className="text-xs">
              ({events.filter((e) => e.status === "active").length})
            </span>
          </button>
          <button
            className={`rounded-lg px-4 py-2 text-sm sm:min-w-[100px] ${
              activeTab === "draft" ? "bg-primary text-white" : "bg-white"
            }`}
            onClick={() => setActiveTab("draft")}
          >
            Draft{" "}
            <span className="text-xs">
              ({events.filter((e) => e.status === "draft").length})
            </span>
          </button>
          <button
            className={`rounded-lg px-4 py-2 text-sm sm:min-w-[100px] ${
              activeTab === "past" ? "bg-primary text-white" : "bg-white"
            }`}
            onClick={() => setActiveTab("past")}
          >
            Past{" "}
            <span className="text-xs">
              ({events.filter((e) => e.status === "past").length})
            </span>
          </button>
        </div>
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search event, location, etc"
            className="w-full rounded-lg border py-2 pr-4 pl-10 outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <svg
            className="absolute top-2.5 left-3 h-5 w-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>

        <div className="flex flex-1 flex-col gap-4 sm:flex-row md:justify-end">
          <select
            className="rounded-lg border px-4 py-2 outline-none"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          <select
            className="rounded-lg border px-4 py-2 outline-none"
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value)}
          >
            {timeFilters.map((filter) => (
              <option key={filter} value={filter}>
                {filter}
              </option>
            ))}
          </select>

          <div className="flex w-fit overflow-hidden rounded-lg border">
            <button
              className={`px-4 py-2 ${
                viewMode === "grid" ? "bg-gray-200" : "bg-white"
              }`}
              onClick={() => setViewMode("grid")}
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                ></path>
              </svg>
            </button>
            <button
              className={`px-4 py-2 ${
                viewMode === "list" ? "bg-gray-200" : "bg-white"
              }`}
              onClick={() => setViewMode("list")}
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Events List */}
      {viewMode === "list" ? (
        <div className="mb-8 grid grid-cols-1 space-y-6 overflow-x-auto">
          {currentEvents.length > 0 ? (
            currentEvents.map((event) => (
              <Link href={`/admin/events/${event.id}`} key={event.id}>
                <div className="min-w-[900px] rounded-lg border p-3 transition-shadow hover:shadow-sm md:p-5">
                  <div className="flex items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                      <div>
                        <Image
                          className="h-[90px] w-[140px] rounded-xl object-cover md:h-[120px] md:w-[180px]"
                          src={event.image}
                          alt={event.title}
                          width={200}
                          height={200}
                        />
                      </div>
                      <div className="max-w-sm">
                        <span className="mb-3 block w-fit rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                          {event.category}
                        </span>
                        <h3 className="mb-2 text-lg font-bold md:text-xl">
                          {event.title}
                        </h3>
                        <p className="mb-4 line-clamp-3 text-xs text-gray-600 md:text-sm">
                          {event.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex w-full flex-1 items-center justify-between gap-4">
                      {" "}
                      <div className="max-w-sm">
                        <p className="mb-2 flex items-center gap-2 text-xs text-gray-500">
                          <MapPin size={14} /> {event.location}
                        </p>
                        <p className="flex items-center gap-2 text-xs text-gray-500">
                          <span>
                            <Calendar size={14} />
                          </span>
                          {event.date} - {event.time}
                        </p>
                      </div>
                      <div className="flex items-center justify-between gap-6">
                        <div>
                          <div className="mb-2 h-2 w-32 rounded-full bg-gray-200">
                            <div
                              className="h-2 rounded-full bg-green-600"
                              style={{
                                width: `${event.ticketSoldPercentage}%`,
                              }}
                            ></div>
                          </div>
                          <p className="text-sm text-gray-700">
                            <span className="mr-1 text-lg text-black md:text-xl">
                              {event.ticketSoldPercentage}%
                            </span>
                            Ticket Sold
                          </p>
                        </div>
                        <button className="transitio flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100 text-gray-600 hover:bg-green-100 hover:text-green-600">
                          <Ticket size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="py-12 text-center text-gray-500">
              No events found matching your criteria
            </div>
          )}
        </div>
      ) : (
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {currentEvents.length > 0 ? (
            currentEvents.map((event) => (
              <Link
                href={`/admin/events/${event.id}`}
                key={event.id}
                className="rounded-lg border p-4 transition-shadow hover:shadow-sm"
              >
                <div className="relative mb-4 w-full">
                  <Image
                    className="h-[220px] w-full rounded-xl object-cover"
                    src={event.image}
                    alt={event.title}
                    width={200}
                    height={200}
                  />
                  <div className="absolute top-2 flex w-full items-center justify-between px-2">
                    <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-green-600 capitalize shadow-sm">
                      {event.category}
                    </span>
                    <span
                      className={`flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium capitalize ${
                        event.status === "active"
                          ? "bg-green-100 text-green-600"
                          : event.status === "draft"
                            ? "bg-gray-100 text-gray-500"
                            : "bg-red-100 text-red-600"
                      }`}
                    >
                      <span
                        className={`block h-2 w-2 rounded-full ${
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
                </div>
                <p className="text-gray-500">
                  {event.date} - {event.time}
                </p>
                <h3 className="my-2 text-xl font-bold">{event.title}</h3>
                <p className="mb-4 flex items-center gap-1 text-gray-700">
                  <MapPin size={15} /> {event.location}
                </p>
                <div className="mb-2">
                  <div className="h-2.5 w-full rounded-full bg-gray-200">
                    <div
                      className="h-2.5 rounded-full bg-green-600"
                      style={{ width: `${event.ticketSoldPercentage}%` }}
                    ></div>
                  </div>
                  <p className="mt-1 text-right text-xs text-gray-700">
                    {event.ticketSoldPercentage}% Ticket Sold
                  </p>
                </div>
                <div className="text-primary text-lg font-semibold">
                  ${event.price}
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-3 py-12 text-center text-gray-500">
              No events found matching your criteria
            </div>
          )}
        </div>
      )}

      {/* Pagination */}
      <div className="flex flex-col items-center justify-between md:flex-row">
        <p className="mb-4 text-gray-600 md:mb-0">
          Showing {indexOfFirstEvent + 1}-
          {Math.min(indexOfLastEvent, filteredEvents.length)} of{" "}
          {filteredEvents.length} events
        </p>
        <div className="flex space-x-2">
          <button
            className="rounded-lg border px-4 py-2 disabled:opacity-50"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              className={`rounded-lg border px-4 py-2 ${
                currentPage === page ? "bg-green-500 text-white" : ""
              }`}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          ))}
          <button
            className="rounded-lg border px-4 py-2 disabled:opacity-50"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </Card>
  );
};

export default ListEvents;
