import { Clock, Wallet } from "lucide-react";
import React from "react";

interface WalletCardProps {
  balance: number;
  currency?: string;
  appName?: string;
  className?: string;
}

const WalletCard: React.FC<WalletCardProps> = ({
  balance = 16200.62,
  currency = "$",
  appName = "My Wallet",
  className,
}) => {
  const formattedBalance = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(balance);

  return (
    <div className=" bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-sm overflow-hidden p-4 text-white">
      {/* App Logo/Name */}
      <div className="flex items-center mb-8">
        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mr-3">
          <span className="text-xl font-bold">
            <Wallet size={16} />
          </span>
        </div>
        <h1 className="text-2xl font-bold">{appName}</h1>
      </div>

      {/* Balance Section */}
      <div className="mb-8">
        <p className="text-sm opacity-80 mb-1">Your Balance</p>
        <h2 className="text-4xl font-bold">
          {currency}
          {formattedBalance}
        </h2>
      </div>

      {/* Action Buttons */}
      <div
        className={`flex flex-col justify-between gap-4 sm:flex-row ${className}`}
      >
        <button className="flex-1 bg-white/10 hover:bg-white/20 backdrop-blur-sm py-3 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 text-sm">
          <Clock size={15} />
          Withdraw
        </button>
      </div>
    </div>
  );
};

export default WalletCard;
