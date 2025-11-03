"use client";
import React, { use, useRef } from "react";
import Head from "next/head";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Undo2, Paperclip, SendHorizontal } from "lucide-react";
import Image from "next/image";
import { tickets } from "@/constants/tickets";
import { formatDate } from "date-fns";
import CustomSelect from "@/components/UI/form/CustomSelect";
import TextEditor from "@/components/UI/form/TextEditor";

interface SingleTicketProps {
  params: Promise<{ slug: string }>;
}

type Attachment = {
  id: string;
  name: string;
  size: string;
};

const dummyAttachments: Attachment[] = [
  { id: "1", name: "Report1.pdf", size: "45 KB" },
  { id: "2", name: "Image2.jpg", size: "38 KB" },
  { id: "3", name: "Presentation.pptx", size: "2.3 MB" },
];

export default function TicketDetailPage({ params }: SingleTicketProps) {
  const { slug } = use(params);
  const ticket = tickets.find((ticket) => ticket.id === slug);
  const ticketRef = useRef<HTMLDivElement>(null);

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "high":
        return "bg-red-600 ";
      case "medium":
        return "bg-yellow-600 ";
      case "low":
        return "bg-green-600 ";
      default:
        return "bg-gray-600 ";
    }
  };

  // helper to extract extension
  const getFileExtension = (filename: string) => {
    const parts = filename.split(".");
    return parts.length > 1 ? parts.pop()?.toUpperCase() : "";
  };

  if (!ticket) {
    return notFound();
  }
  
  return (
    <div className="min-h-screen">
      <Head>
        <title>Ticket {ticket.ticketId} - CRMS</title>
        <meta
          name="description"
          content={`Ticket details for ${ticket.ticketId}`}
        />
      </Head>
      <div className="mx-auto mt-6 mb-2 flex max-w-4xl space-x-4">
        <Link
          href={"/admin/tickets"}
          className="text-main flex items-center gap-2 rounded-md text-xs font-medium transition duration-200"
        >
          <Undo2 size={15} /> Back to Tickets
        </Link>
      </div>

      <div
        ref={ticketRef}
        className="ticket-container mx-auto max-w-4xl overflow-hidden rounded-md border border-gray-200 bg-white p-2 shadow-sm"
      >
        <div className="border border-gray-200">
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-gray-50 p-6">
            <div>
              <h1 className="text-lg font-bold text-gray-800">
                {ticket.ticketId} -{" "}
                <span className="text-lg text-gray-500">{ticket.subject}</span>
              </h1>
            </div>
            <CustomSelect
              value={"Newest"}
              onChange={(value) => console.log("Sort By:", value)}
              placeholder="Sort By"
              options={[
                { label: "Resolved", value: "Resolved" },
                { label: "Inprogress", value: "Inprogress" },
                { label: "Open", value: "Open" },
                { label: "Closed", value: "Closed" },
              ]}
            />
          </div>

          {/* Ticket Info */}
          <div className="p-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-5">
              <div>
                <p className="mb-2 text-xs font-medium">Created By</p>
                <Link
                  href={`/admin/contact/${ticket.assignee.id}`}
                  className="group flex items-center gap-2"
                >
                  <Image
                    src={ticket.assignee.avatar}
                    alt={ticket.assignee.name}
                    width={32}
                    height={32}
                    className="h-6 w-6 rounded-full object-cover"
                  />
                  <p className="group-hover:text-secondary text-xs font-medium transition-colors">
                    {ticket.assignee?.name}
                  </p>
                </Link>
              </div>
              <div>
                <p className="mb-1 text-xs font-medium">Priority</p>
                <span
                  className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium text-white ${getPriorityColor(
                    ticket.priority,
                  )}`}
                >
                  {ticket.priority.charAt(0).toUpperCase() +
                    ticket.priority.slice(1)}{" "}
                </span>
              </div>
              <div>
                <p className="mb-2 text-xs font-medium">Created at</p>
                <p className="text-xs font-medium text-gray-600">
                  {formatDate(ticket.createdOn, "MMM dd, yyyy ")}
                </p>
              </div>
              <div>
                <p className="mb-2 text-xs font-medium">Last Updated</p>
                <p className="text-xs font-medium text-gray-600">
                  {formatDate(ticket.lastUpdated, "MMM dd, yyyy ")}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="p-4">
          <h2 className="mb-1 text-sm font-bold text-gray-800">Description</h2>
          <p className="text-sm whitespace-pre-line text-gray-600">
            {ticket.description}
          </p>
        </div>

        {/* Attachments */}
        <div className="p-4">
          <h2 className="mb-1 text-sm font-bold text-gray-800">Attachments</h2>

          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {dummyAttachments.map((file) => {
              const ext = getFileExtension(file.name);

              return (
                <div
                  key={file.id}
                  className="flex items-center justify-between rounded-lg border border-gray-200 p-3"
                >
                  <div className="flex items-center gap-3">
                    {/* Badge for file type */}
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-md text-[10px] text-white ${ext === "PDF" ? "bg-red-500" : ""} ${ext === "JPG" || ext === "JPEG" ? "bg-blue-500" : ""} ${ext === "PPTX" ? "bg-orange-500" : ""} ${ext === "DOCX" ? "bg-sky-600" : ""} `}
                    >
                      {ext || <Paperclip size={16} />}
                    </div>

                    <div>
                      <p className="text-sm font-medium">{file.name}</p>
                      <p className="text-xs text-gray-500">{file.size}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Message */}
        <div className="p-4">
          <h2 className="mb-2 text-sm font-bold text-gray-800">Message</h2>
          <TextEditor onChange={() => console.log("changed")} />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mx-auto mt-6 flex max-w-4xl justify-end space-x-4">
        <button className="flex items-center gap-2 rounded-md bg-gray-600 px-4 py-2 text-xs font-medium text-white transition duration-200 hover:bg-gray-700">
          <Undo2 size={15} /> Back to Tickets
        </button>
        <button className="bg-secondary flex items-center gap-2 rounded-md px-4 py-2 text-xs font-medium text-white transition duration-200">
          <SendHorizontal size={15} /> Send Reply
        </button>
      </div>

      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .ticket-container,
          .ticket-container * {
            visibility: visible;
          }
          .ticket-container {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
          .no-print {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
