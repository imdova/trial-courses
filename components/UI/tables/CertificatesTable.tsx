"use client";

import Link from "next/link";
import { Download, Eye } from "lucide-react";
import { ColumnConfig } from "@/types";
import DataTable from "../data-table";
import { Certificates } from "@/types/courses";

const fileIcons: Record<string, React.ReactNode> = {
  pdf: "📄",
  doc: "📝",
  default: "📦",
};

interface Props {
  certificates: Certificates[];
  handleView: (id: string | number) => void;
}

export default function CertificatesTable({ certificates, handleView }: Props) {
  const columns: ColumnConfig<Certificates>[] = [
    {
      header: "Certificate",
      key: "name",
      render: (item) => (
        <div className="flex items-center gap-1">
          <span>{fileIcons[item.fileType] || fileIcons.default}</span>
          <Link
            href={item.downloadUrl}
            className="hover:text-primary max-w-[120px] truncate hover:underline"
          >
            {item.name}
          </Link>
        </div>
      ),
    },
    { header: "Program", key: "program" },
    { header: "Grade", key: "grade" },
    {
      header: "Issued",
      key: "issue_date",
      render: (item) =>
        new Date(item.issue_date).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
    },
    { header: "Serial", key: "serial" },
    {
      header: "View",
      render: (item) => (
        <button
          onClick={() => handleView(item.id)}
          className="rounded p-1 text-green-600 transition-colors hover:bg-green-50 hover:text-green-800"
          title="View"
        >
          <Eye size={14} />
        </button>
      ),
    },
    {
      header: "Download",
      render: (item) => (
        <button
          onClick={() => console.log("downloaded", item.id)}
          className="rounded p-1 text-green-600 transition-colors hover:bg-green-50 hover:text-green-800"
          title="Download"
        >
          <Download size={14} />
        </button>
      ),
    },
  ];

  return (
    <div className="rounded-xl border bg-white p-4 shadow-sm">
      <h1 className="text-lg font-bold text-gray-800">Earned Certificates</h1>
      <p className="mb-4 text-xs text-gray-600">
        You can view or download your earned certificates
      </p>

      <DataTable<Certificates>
        data={certificates}
        columns={columns}
        noDataMessage={{
          title: "No certificates found",
          description: "You haven’t earned any certificates yet.",
        }}
      />
    </div>
  );
}
