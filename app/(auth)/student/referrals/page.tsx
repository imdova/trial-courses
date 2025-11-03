"use client";

import * as React from "react";
import DynamicTable from "@/components/UI/tables/DTable";
import {
  Copy,
  Link as LinkIcon,
  Euro,
  DollarSign,
  LucideIcon,
  Wallet,
} from "lucide-react";

interface Referral {
  id: string;
  name: string;
  url: string;
  visits: number;
  earned: number;
}

export interface Stat {
  title: string;
  value: string;
  change: string;
  details: string;
  color: "blue" | "green" | "purple" | "red" | "yellow" | string;
  icon: LucideIcon;
}

const ReferralsPage = () => {
  // Dummy data for referrals
  const referrals: Referral[] = [
    {
      id: "#REF010",
      name: "Thompson Hicks",
      url: "https://dreamsimscourse.com/reffer/?refid=345re667877k960",
      visits: 10,
      earned: 160,
    },
    {
      id: "#REF009",
      name: "Jennifer Tovar",
      url: "https://dreamsimscourse.com/reffer/?refid=345re667877k960",
      visits: 8,
      earned: 180,
    },
    {
      id: "#REF008",
      name: "James Schulte",
      url: "https://dreamsimscourse.com/reffer/?refid=345re667877k960",
      visits: 12,
      earned: 200,
    },
    {
      id: "#REF007",
      name: "Kristy Cardona",
      url: "https://dreamsimscourse.com/reffer/?refid=345re667877k960",
      visits: 17,
      earned: 220,
    },
    {
      id: "#REF006",
      name: "William Aragon",
      url: "https://dreamsimscourse.com/reffer/?refid=345re667877k960",
      visits: 9,
      earned: 170,
    },
    {
      id: "#REF005",
      name: "Shirley Lis",
      url: "https://dreamsimscourse.com/reffer/?refid=345re667877k960",
      visits: 15,
      earned: 150,
    },
    {
      id: "#REF004",
      name: "John Brewer",
      url: "https://dreamsimscourse.com/reffer/?refid=345re667877k960",
      visits: 13,
      earned: 130,
    },
    {
      id: "#REF003",
      name: "Doris Hughes",
      url: "https://dreamsimscourse.com/reffer/?refid=345re667877k960",
      visits: 17,
      earned: 190,
    },
    {
      id: "#REF002",
      name: "Sarah Martinez",
      url: "https://dreamsimscourse.com/reffer/?refid=345re667877k960",
      visits: 8,
      earned: 140,
    },
    {
      id: "#REF001",
      name: "Sarah Martinez",
      url: "https://dreamsimscourse.com/reffer/?refid=345re667877k960",
      visits: 11,
      earned: 110,
    },
  ];

  const referralLink = "https://dreamsimscourse.com/refer/?refid=345re667877k9";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    // You might want to add a toast notification here
  };

  // Stats data for the cards
  const stats: Stat[] = [
    {
      title: "Total Earnings",
      value: "$12,000",
      change: "+12%",
      details: "Earning this month",
      color: "green",
      icon: DollarSign,
    },
    {
      title: "Balance",
      value: "$1,200",
      change: "+5%",
      details: "In the Wallet",
      color: "red",
      icon: Wallet,
    },
    {
      title: "No of Referrals",
      value: "24",
      change: "-2%",
      details: "In this month",
      color: "purple",
      icon: Wallet,
    },
  ];

  const columns = [
    {
      key: "id" as keyof Referral,
      header: "Reference ID",
      sortable: true,
      render: (referral: Referral) => (
        <span className="text-sm font-medium text-gray-700">{referral.id}</span>
      ),
    },
    {
      key: "name" as keyof Referral,
      header: "Referrals",
      sortable: true,
      render: (referral: Referral) => (
        <span className="text-sm text-gray-700">{referral.name}</span>
      ),
    },
    {
      key: "url" as keyof Referral,
      header: "URL",
      sortable: false,
      render: (referral: Referral) => (
        <div className="flex items-center gap-2">
          <LinkIcon className="w-4 h-4 text-blue-500" />
          <a
            href={referral.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-500 hover:underline truncate max-w-xs"
          >
            {referral.url}
          </a>
        </div>
      ),
    },
    {
      key: "visits" as keyof Referral,
      header: "Visits",
      sortable: true,
      render: (referral: Referral) => (
        <div className="flex items-center gap-1">
          <span className="text-sm text-gray-700">{referral.visits}</span>
        </div>
      ),
    },
    {
      key: "earned" as keyof Referral,
      header: "Total Earned",
      sortable: true,
      render: (referral: Referral) => (
        <div className="flex items-center gap-1">
          <Euro className="w-4 h-4 text-green-600" />
          <span className="text-sm font-medium text-green-600">
            ${referral.earned}
          </span>
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-6 px-4 bg-white rounded-lg shadow-sm">
      {/* Header Section */}
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Referrals</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;

            // Map your color key to Tailwind classes
            const bgColorMap: Record<string, string> = {
              blue: "bg-blue-100 text-blue-600",
              green: "bg-green-100 text-green-600",
              purple: "bg-[#F0EBFD] text-[#5625E8]",
              red: "bg-[#FFEDF0] text-[#FF4667]",
              yellow: "bg-yellow-100 text-yellow-600",
              gray: "bg-gray-100 text-gray-600",
            };

            const iconColorClass = bgColorMap[stat.color] || bgColorMap["gray"];

            return (
              <div
                key={index}
                className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm"
              >
                <div className="flex justify-between items-start">
                  <div className="flex gap-4 items-center">
                    {/* Icon container with dynamic background and text color */}
                    <div
                      className={`flex justify-center items-center w-20 h-20 rounded-lg ${iconColorClass}`}
                    >
                      {Icon && <Icon className="w-10 h-10" />}
                    </div>

                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        {stat.title}
                      </p>
                      <p className="text-2xl font-semibold text-gray-800 mt-1">
                        {stat.value}
                      </p>
                      <p className="text-sm font-medium text-gray-500 mt-1">
                        {stat.details}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Referral Link Section */}
      <div className="grid lg:grid-cols-2 gap-4">
        <div className="flex flex-col gap-4 p-6 bg-gray-50 rounded-lg border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-700">
            Your Referral Link
          </h2>
          <p className="text-sm text-gray-600">
            You can earn easily money by copy and share
          </p>

          <div className="flex flex-col items-center gap-2 md:flex-row">
            <div className="flex-1 p-2 px-3 bg-white border border-gray-300 rounded-md text-sm text-gray-700 overflow-x-auto">
              {referralLink}
            </div>
            <button
              onClick={copyToClipboard}
              className="flex px-3 py-1.5 rounded-md items-center gap-2 bg-green-600 hover:bg-green-700 text-white"
            >
              <Copy className="w-4 h-4" />
              <span>Copy link</span>
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-4 p-6 bg-gray-50 rounded-lg border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-700">
            Withdraw Money
          </h2>
          <p className="text-sm text-gray-600">
            Withdraw securely to your bank account. Commision is $25 per
            transaction under $10,000
          </p>

          <div className="flex items-center gap-2">
            <button
              onClick={copyToClipboard}
              className="flex px-3 py-1.5 rounded-md items-center gap-2 bg-green-600 hover:bg-green-700 text-white"
            >
              <Copy className="w-4 h-4" />
              <span>Copy link</span>
            </button>
          </div>
        </div>
      </div>

      {/* Referrals Table */}
      <div className="mt-4">
        <DynamicTable<Referral>
          data={referrals}
          columns={columns}
          pagination={true}
          itemsPerPage={10}
          className="border border-gray-200 rounded-lg"
          headerClassName="bg-gray-100 text-gray-700"
          rowClassName="hover:bg-gray-50 border-b"
          cellClassName="p-3"
          emptyMessage="No referrals found"
          rowIdKey="id"
          showRowNumbers={false}
        />
      </div>
    </div>
  );
};

export default ReferralsPage;
