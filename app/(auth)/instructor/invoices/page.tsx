"use client";

import { Plus } from "lucide-react";
import Link from "next/link";
import InvoicesTable from "./components/InvoicesTable";
const InvoicesPage = () => {
  return (
    <div className="p-4 border rounded-lg bg-white shadow-sm mx-4 md:mx-5">
      <div className="flex flex-col items-center justify-between gap-4 mb-5 md:flex-row">
        <div className="text-center md:text-start">
          <h1 className="text-2xl font-bold mb-2">My Invoices</h1>
          <p className="text-sm text-muted-foreground">
            View, manage, and track all your course discount codes in one place.
          </p>
        </div>

        <Link
          className="flex items-center gap-2 bg-primary text-white px-3 py-2 rounded-md"
          href={"/lms/add-invoice"}
        >
          <Plus size={16} /> Add Invoice
        </Link>
      </div>
      <InvoicesTable />
    </div>
  );
};

export default InvoicesPage;
