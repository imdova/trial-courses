"use client";

import { useState } from "react";
import { Download, Eye, Banknote, CreditCard } from "lucide-react";
import SearchBar from "@/components/UI/form/search-Input";
type WithdrawalMethod = {
  id: number;
  type: string;
  label: string;
  details: string;
  isDefault: boolean;
};

const withdrawalMethods: WithdrawalMethod[] = [
  {
    id: 1,
    type: "Bank Transfer",
    label: "Bank Transfer",
    details: "****6789",
    isDefault: true,
  },
  {
    id: 2,
    type: "Instapay",
    label: "Instapay",
    details: "john.doe@example.com",
    isDefault: false,
  },
  {
    id: 3,
    type: "Mobile Wallet",
    label: "Mobile Wallet",
    details: "+1 (555) 123-4567",
    isDefault: false,
  },
];

const withdrawalData = [
  {
    date: "April 5, 2025",
    amount: "$89.99",
    method: "Credit Card",
    reference: "WD78945612",
    status: "Pending",
  },
  {
    date: "April 5, 2025",
    amount: "$89.99",
    method: "Credit Card",
    reference: "WD78945612",
    status: "Paid",
  },
  {
    date: "April 5, 2025",
    amount: "$89.99",
    method: "Credit Card",
    reference: "WD78945612",
    status: "Rejected",
  },
  {
    date: "April 5, 2025",
    amount: "$89.99",
    method: "Credit Card",
    reference: "Credit Card",
    status: "Pending",
  },
  {
    date: "April 5, 2025",
    amount: "$89.99",
    method: "Credit Card",
    reference: "Credit Card",
    status: "Paid",
  },
  {
    date: "April 5, 2025",
    amount: "$89.99",
    method: "Credit Card",
    reference: "Credit Card",
    status: "Rejected",
  },
];

export default function WalletPanel() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState("");
  const handleSearch = (query: string) => {
    setSearchQuery(query); // Update the search query state
  };

  const filteredData = withdrawalData.filter(
    (d) =>
      d.method.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (statusFilter ? d.status === statusFilter : true)
  );

  return (
    <div className="p-4 space-y-6">
      {/* Wallet Summary + Methods */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Wallet Summary */}
        <div className="border rounded-lg p-4">
          <h2 className="font-semibold text-lg">Wallet Summary</h2>
          <p className="text-sm text-gray-500">
            Your current balance and withdrawal status
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 my-7">
            <div>
              <p className="text-gray-500 text-sm">Current Balance</p>
              <p className="text-2xl font-semibold">1,245.00</p>
              <p className="text-xs text-gray-400">Updated just now</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Pending Balance</p>
              <p className="text-2xl font-semibold">$1,250.00</p>
              <p className="text-xs text-gray-400">Available in 30 days</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Current Balance</p>
              <p className="text-2xl font-semibold">1,245.00</p>
              <p className="text-xs text-gray-400">Updated just now</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Pending Balance</p>
              <p className="text-2xl font-semibold">$1,250.00</p>
              <p className="text-xs text-gray-400">Available in 30 days</p>
            </div>
          </div>
          <button className="bg-green-600 text-white text-sm px-4 py-2 rounded flex items-center justify-center gap-2 w-full">
            <Banknote size={15} /> Request Withdrawal
          </button>
        </div>

        {/* Withdrawal Methods */}
        <div className="border rounded-lg p-4">
          <h2 className="font-semibold text-lg">Withdrawal Methods</h2>
          <p className="text-sm text-gray-500 mb-4">
            Manage your payout options
          </p>
          <div className="space-y-2">
            {withdrawalMethods.map((method) => (
              <div
                key={method.id}
                className="border rounded-md px-4 py-2 flex justify-between items-center"
              >
                <div className="flex items-center gap-2">
                  <CreditCard size={20} />
                  <div>
                    <span className="block font-semibold">{method.label}</span>
                    <span className="block text-muted-foreground text-sm">
                      {method.details}
                    </span>
                  </div>
                </div>
                {method.isDefault ? (
                  <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">
                    Default
                  </span>
                ) : (
                  <button className="text-xs text-gray-500">Set Default</button>
                )}
              </div>
            ))}
          </div>
          <button className="w-full text-center text-sm border rounded-md py-2 mt-4">
            Add New Payment Method
          </button>
        </div>
      </div>

      {/* Withdrawal History */}
      <div className="border rounded-lg p-4">
        <h2 className="font-semibold text-lg ">Withdrawals History</h2>
        <p className="text-sm text-gray-500 mb-4">
          Track all your withdrawal requests
        </p>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-3 mb-4">
          <SearchBar
            parentClassName="w-full"
            placeholder="Search for students"
            onSearch={handleSearch}
          />{" "}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border px-3 py-2 rounded-md w-full md:w-[200px] outline-none"
          >
            <option value="">Status</option>
            <option value="Pending">Pending</option>
            <option value="Paid">Paid</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] text-sm">
            <thead>
              <tr className="text-left bg-gray-100">
                <th className="p-3">Date</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Method</th>
                <th className="p-3">Reference ID</th>
                <th className="p-3">Status</th>
                <th className="p-3">Receipt</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item, i) => (
                <tr key={i} className="border-t hover:bg-gray-50">
                  <td className="p-3">{item.date}</td>
                  <td className="p-3">{item.amount}</td>
                  <td className="p-3">{item.method}</td>
                  <td className="p-3">{item.reference}</td>
                  <td className="p-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        item.status === "Pending"
                          ? "bg-orange-100 text-orange-600"
                          : item.status === "Paid"
                          ? "bg-green-100 text-green-600"
                          : item.status === "Rejected"
                          ? "bg-red-100 text-red-600"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="p-3">
                    <div className="flex gap-3 items-center">
                      <Eye className="w-4 h-4 cursor-pointer text-gray-600" />
                      <Download className="w-4 h-4 cursor-pointer text-gray-600" />
                    </div>
                  </td>
                </tr>
              ))}
              {filteredData.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-4 text-gray-500">
                    No data found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
