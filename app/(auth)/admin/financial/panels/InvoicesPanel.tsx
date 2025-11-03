"use client";
import SearchBar from "@/components/UI/form/search-Input";
import {
  BadgeCheck,
  BadgeInfo,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Download,
  Info,
  SendHorizontal,
  SlidersHorizontal,
  SquarePen,
  SquareX,
} from "lucide-react";
import React, { useState } from "react";

type Invoice = {
  id: string;
  date: string;
  status: "Paid" | "Unpaid";
  customer: {
    name: string;
    address: string;
    email: string;
    phone: string;
  };
  items: {
    category: string;
    price: number;
    quantity: number;
    amount: number;
  }[];
  subtotal: number;
  tax: number;
  fee: number;
  total: number;
};

const InvoicePage = () => {
  const [selectedInvoice, setSelectedInvoice] = useState<string>("INV10012");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Dummy data for all invoices
  const invoices: Invoice[] = [
    {
      id: "INV10011",
      date: "Feb 15, 2029 10:30 AM",
      status: "Paid",
      customer: {
        name: "Alicia Smithson",
        address: "789 Main Street, Beverly Hills, CA, 90210",
        email: "alicia.smithson@gmail.com",
        phone: "+1-310-555-6789",
      },
      items: [
        { category: "Gold", price: 80, quantity: 1, amount: 80 },
        { category: "Silver", price: 50, quantity: 1, amount: 50 },
      ],
      subtotal: 130,
      tax: 13,
      fee: 5,
      total: 148,
    },
    {
      id: "INV10012",
      date: "Feb 16, 2029 03:45 PM",
      status: "Unpaid",
      customer: {
        name: "Alicia Smithson",
        address: "789 Main Street, Beverly Hills, CA, 90210",
        email: "alicia.smithson@gmail.com",
        phone: "+1-310-555-6789",
      },
      items: [
        { category: "Platinum", price: 120, quantity: 1, amount: 120 },
        { category: "Silver", price: 50, quantity: 2, amount: 100 },
      ],
      subtotal: 220,
      tax: 22,
      fee: 5,
      total: 247,
    },
    {
      id: "INV10013",
      date: "Feb 17, 2029 01:15 PM",
      status: "Paid",
      customer: {
        name: "Alicia Smithson",
        address: "789 Main Street, Beverly Hills, CA, 90210",
        email: "alicia.smithson@gmail.com",
        phone: "+1-310-555-6789",
      },
      items: [{ category: "Gold", price: 80, quantity: 3, amount: 240 }],
      subtotal: 240,
      tax: 24,
      fee: 5,
      total: 269,
    },
    {
      id: "INV10015",
      date: "Feb 18, 2029 05:30 PM",
      status: "Paid",
      customer: {
        name: "Alicia Smithson",
        address: "789 Main Street, Beverly Hills, CA, 90210",
        email: "alicia.smithson@gmail.com",
        phone: "+1-310-555-6789",
      },
      items: [{ category: "Platinum", price: 120, quantity: 2, amount: 240 }],
      subtotal: 240,
      tax: 24,
      fee: 5,
      total: 269,
    },
    {
      id: "INV10016",
      date: "Feb 19, 2029 12:00 PM",
      status: "Paid",
      customer: {
        name: "Alicia Smithson",
        address: "789 Main Street, Beverly Hills, CA, 90210",
        email: "alicia.smithson@gmail.com",
        phone: "+1-310-555-6789",
      },
      items: [{ category: "Silver", price: 50, quantity: 4, amount: 200 }],
      subtotal: 200,
      tax: 20,
      fee: 5,
      total: 225,
    },
    {
      id: "INV10017",
      date: "Feb 20, 2029 02:30 PM",
      status: "Unpaid",
      customer: {
        name: "Alicia Smithson",
        address: "789 Main Street, Beverly Hills, CA, 90210",
        email: "alicia.smithson@gmail.com",
        phone: "+1-310-555-6789",
      },
      items: [
        { category: "Platinum", price: 120, quantity: 1, amount: 120 },
        { category: "Gold", price: 80, quantity: 1, amount: 80 },
      ],
      subtotal: 200,
      tax: 20,
      fee: 5,
      total: 225,
    },
  ];

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };
  const filterInvoices = searchQuery.trim()
    ? invoices.filter(
        (invoice) => invoice.id.toLowerCase() === searchQuery.toLowerCase()
      )
    : invoices;
  const currentInvoice =
    invoices.find((inv) => inv.id === selectedInvoice) || invoices[1];
  return (
    <div className="grid grid-cols-1 lg:grid-cols-7 gap-4">
      <div className="col-span-1 lg:col-span-3">
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="p-3 bg-white border rounded-xl shadow-sm">
            <div className="flex justify-between items-center gap-2">
              <span className="text-sm text-muted-foreground">Paid</span>
              <BadgeCheck className="text-green-500" size={15} />
            </div>
            <h2 className="text-2xl font-semibold text-green-500">1,805</h2>
            <span className="text-sm text-muted-foreground">Last Month: 1,600</span>
          </div>
          <div className="p-3 bg-white border rounded-xl shadow-sm">
            <div className="flex justify-between items-center gap-2">
              <span className="text-sm text-muted-foreground">Unpaid</span>
              <SquareX className="text-green-500" size={15} />
            </div>
            <h2 className="text-2xl font-semibold text-green-500">535</h2>
            <span className="text-sm text-muted-foreground">Last Month: 615</span>
          </div>
          <div className="p-3 bg-white border rounded-xl shadow-sm">
            <div className="flex justify-between items-center gap-2">
              <span className="text-sm text-muted-foreground">Overdue</span>
              <BadgeInfo className="text-green-500" size={15} />
            </div>
            <h2 className="text-2xl font-semibold text-green-500">80</h2>
            <span className="text-sm text-muted-foreground">Last Month: 70</span>
          </div>
        </div>
        <div className="bg-white border rounded-xl shadow-sm p-4">
          <div className="flex items-center gap-3 mb-4">
            <SearchBar
              parentClassName="w-full"
              placeholder="Search Transactions"
              onSearch={handleSearch}
            />
            <div className="w-12">
              <button className="flex justify-center items-center w-12 h-12 bg-primary text-white rounded-full">
                <SlidersHorizontal size={16} />
              </button>
            </div>
            <button className="px-4 h-12 bg-primary text-white rounded-full">
              Add
            </button>
          </div>
          <div className="space-y-2">
            {filterInvoices.map((invoice: Invoice) => (
              <div
                key={invoice.id}
                className={`p-4 rounded-xl cursor-pointer ${
                  selectedInvoice === invoice.id
                    ? "bg-white border border-primary "
                    : "bg-gray-100"
                }`}
                onClick={() => {
                  setSelectedInvoice(invoice.id);
                }}
              >
                <h3 className="font-medium text-gray-800">{invoice.id}</h3>
                <div className="flex justify-between text-sm text-gray-600">
                  <span className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Calendar size={13} /> {invoice.date}
                  </span>
                  <div className="flex flex-col items-end">
                    <p className="text-primary font-semibold mb-2">
                      ${invoice.total}
                    </p>
                    <span
                      className={`font-medium px-4 py-2 rounded-xl ${
                        invoice.status === "Paid"
                          ? "bg-green-100 text-green-600"
                          : "bg-[#5562A2] text-white"
                      }`}
                    >
                      <span className="flex items-center gap-1 text-xs">
                        {invoice.status === "Paid" ? (
                          <BadgeCheck className="text-green-600" size={13} />
                        ) : (
                          <BadgeInfo className="text-white" size={13} />
                        )}
                        {invoice.status}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="col-span-1 lg:col-span-4  p-4 bg-white rounded-xl border shadow-sm">
        <div className="flex flex-col items-start justify-between gap-3 mb-4 sm:flex-row sm:items-center">
          <h1 className="text-2xl font-semibold">Invice Details</h1>
          <div className="flex items-center gap-3">
            <button className="flex item-center justify-center gap-2 border font-medium text-sm py-2 px-4 rounded-xl">
              <Download size={14} />
              Download
            </button>
            <div className="flex justify-between items-center gap-3">
              <button className="flex justify-center items-center w-10 h-10 border rounded-full bg-white">
                <ChevronLeft size={15} />
              </button>
              <button className="flex justify-center items-center w-10 h-10 border rounded-full bg-white">
                <ChevronRight size={15} />
              </button>
            </div>
          </div>
        </div>
        <div className="">
          {/* Header */}
          <div className="flex justify-between items-start p-3 border-t-4 border-primary rounded-2xl">
            <div>
              <h1 className="text-3xl font-bold text-primary">
                #{currentInvoice.id}
              </h1>
            </div>
            <p className="text-muted-foreground text-sm">
              Date:{" "}
              <span className="text-black text-sm">{currentInvoice.date}</span>
            </p>
          </div>
          <div className="flex mb-5">
            <span
              className={`font-medium px-4 py-2 rounded-xl ${
                currentInvoice.status === "Paid"
                  ? "bg-green-100 text-green-600"
                  : "bg-[#5562A2] text-white"
              }`}
            >
              <span className="flex items-center gap-1 text-xs">
                {currentInvoice.status === "Paid" ? (
                  <BadgeCheck className="text-green-600" size={13} />
                ) : (
                  <BadgeInfo className="text-white" size={13} />
                )}
                {currentInvoice.status}
              </span>
            </span>
          </div>
          <div>
            <div className="flex flex-col sm:flex-row">
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-700">
                  Event Management Co.
                </h2>
                <p className="text-gray-600">
                  123 Sunset Avenue, Los Angeles, CA, 90001
                </p>
                <p className="text-gray-600">billing@eventmgmt.com</p>
                <p className="text-gray-600">+1-800-555-1234</p>
              </div>
              {/* Customer Info */}
              <div className="p-4 text-right">
                <h2 className="text-xl font-semibold mb-2 text-gray-700">
                  {currentInvoice.customer.name}
                </h2>
                <p className="text-gray-600">
                  {currentInvoice.customer.address}
                </p>
                <p className="text-gray-600">{currentInvoice.customer.email}</p>
                <p className="text-gray-600">{currentInvoice.customer.phone}</p>
              </div>
            </div>

            {/* Ticket Details */}
            <div className="p-3 border rounded-2xl shadow-sm mb-4">
              <h2 className="text-xl font-semibold mb-4 text-gray-700">
                Ticket Details
              </h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                        Ticket Category
                      </th>
                      <th className="px-4 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                        Price
                      </th>
                      <th className="px-4 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                        Qty
                      </th>
                      <th className="px-4 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {currentInvoice.items.map((item, index) => (
                      <tr key={index}>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                          {item.category}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                          ${item.price}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                          {item.quantity}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                          ${item.amount}
                        </td>
                      </tr>
                    ))}
                    <tr>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                        Sub Total
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500"></td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500"></td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                        ${currentInvoice.subtotal}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                        Tax (10%)
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500"></td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500"></td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                        ${currentInvoice.tax}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                        Fee
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500"></td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500"></td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                        ${currentInvoice.fee}
                      </td>
                    </tr>
                    <tr className="border-t-2 border-gray-300">
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                        Total
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500"></td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500"></td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                        ${currentInvoice.total}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Note and Download Button */}
            <div>
              <div className=" p-4 rounded-lg">
                <span className="block text-sm text-muted-foreground mb-3">Note</span>
                <p className="text-sm text-gray-600">
                  Please make payment before the due date to avoid any penalties
                  or cancellation of your ticket. For any questions or concerns,
                  contact our support team at support@eventmgmt.com or call
                  +1-800-555-1234.
                </p>
              </div>
              <div className="flex flex-col justify-end gap-3 sm:flex-row">
                <button className="flex item-center justify-center gap-2 border font-medium text-sm py-2 px-4 rounded-xl">
                  <SquarePen size={14} />
                  Edit Invoice
                </button>
                <button className="flex item-center justify-center gap-2 border font-medium text-sm py-2 px-4 rounded-xl">
                  <SendHorizontal size={14} />
                  Send Invoice
                </button>
                <button className="flex item-center justify-center gap-2 border font-medium text-sm py-2 px-4 rounded-xl">
                  <Info size={14} />
                  Hold Invoice
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoicePage;
