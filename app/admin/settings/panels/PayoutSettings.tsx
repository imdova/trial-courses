"use client";

import { formDataSettings } from "@/types/forms";
import { Check, DollarSign, Info } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Control, Controller, UseFormRegister } from "react-hook-form";

interface PayoutSettingsProps {
  register: UseFormRegister<formDataSettings>;
  control: Control<formDataSettings>;
  errors: {
    [K in keyof formDataSettings]?: { message?: string };
  };
}

const PayoutSettings: React.FC<PayoutSettingsProps> = ({
  register,
  control,
  errors,
}) => {
  const [payoutMethod, setPayoutMethod] = useState<
    "bank" | "instapay" | "mobile"
  >("bank");

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Payout Settings</h1>
      <p className="text-sm text-muted-foreground mb-6">
        Manage how and when you receive payments for your courses.
      </p>
      <div className="p-4 border rounded-lg my-10">
        <div className="flex flex-col gap-3 justify-between sm:flex-row mb-6">
          <div>
            <h1 className="text-xl font-bold text-gray-900 mb-1">
              Earning Summary
            </h1>
            <p className="text-sm text-muted-foreground mb-6">
              Quick over view of your earning
            </p>
          </div>
          <div>
            <Link
              className="flex items-center gap-1 p-2 w-fit bg-white border rounded-lg text-sm"
              href={"#"}
            >
              <DollarSign size={12} />
              View Full Earning
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          <div className="flex flex-col justify-center items-center gap-2 p-6 border rounded-lg sm:items-center">
            <span className="text-muted-foreground text-sm">Current Balance</span>
            <h3 className="text-lg font-bold">1,245.00</h3>
          </div>
          <div className="flex flex-col justify-center items-center gap-2 p-6 border rounded-lg sm:items-center">
            <span className="text-muted-foreground text-sm">Last Payout</span>
            <h3 className="text-lg font-bold">$980.50</h3>
            <span className="text-xs text-muted-foreground">April 1, 2025</span>
          </div>
          <div className="flex flex-col justify-center items-center gap-2 p-6 border rounded-lg sm:items-center">
            <span className="text-muted-foreground text-sm">Next Payout</span>
            <h3 className="text-lg font-bold">$1,245.00</h3>
            <span className="text-xs text-muted-foreground">May 1, 2025</span>
          </div>
        </div>
      </div>
      <div className="flex gap-3 mb-8 p-3 bg-yellow-50 border rounded-lg">
        <Info className="text-yellow-700" size={16} />
        <div>
          <p className="text-yellow-700 font-medium">Important</p>
          <p className="text-sm text-yellow-600">
            You must complete your payout setting to receive payments for your
            course.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-1">
            Payout Method
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            Select how you would like to receive your earnings:
          </p>

          <div className="space-y-4">
            <div className="p-3 border rounded-lg">
              <label
                htmlFor="bank-transfer"
                className="flex items-start gap-4 cursor-pointer"
              >
                <input
                  id="bank-transfer"
                  type="radio"
                  value="bank"
                  checked={payoutMethod === "bank"}
                  onChange={() => setPayoutMethod("bank")}
                  className="sr-only"
                />
                <div className="w-5">
                  <div
                    className={`h-5 w-5 flex items-center justify-center rounded-full border-2 transition-colors duration-200 ${
                      payoutMethod === "bank"
                        ? "bg-green-600 border-green-600 text-white"
                        : "border-gray-300 bg-white"
                    }`}
                  >
                    {payoutMethod === "bank" && (
                      <Check className="w-3 h-3 text-white" />
                    )}
                  </div>
                </div>

                <div className="text-sm text-gray-700 mb-3">
                  <span className="font-semibold">Bank Transfer</span>
                  <span className="block text-sm text-gray-500">
                    Receive payment directly to your bank account. Processing
                    time: 3-5 business days.
                  </span>
                </div>
              </label>

              <div className="ml-7 space-y-4">
                <div>
                  <label
                    htmlFor="accountHolderName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Account Holder Name
                  </label>
                  <input
                    id="accountHolderName"
                    type="text"
                    {...register("accountHolderName", {
                      required:
                        payoutMethod === "bank"
                          ? "Account holder name is required"
                          : false,
                    })}
                    className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none max-w-[400px] ${
                      errors.accountHolderName
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    placeholder="Enter your Name"
                  />
                  {errors.accountHolderName && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.accountHolderName.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="accountNumber"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Account Number
                  </label>
                  <input
                    id="accountNumber"
                    type="text"
                    {...register("accountNumber", {
                      required:
                        payoutMethod === "bank"
                          ? "Account number is required"
                          : false,
                      pattern: {
                        value: /^\d+$/,
                        message: "Account number must contain only numbers",
                      },
                    })}
                    className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none max-w-[400px] ${
                      errors.accountNumber
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    placeholder="XXXXXXXXXXXXXXXXXX"
                  />
                  {errors.accountNumber && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.accountNumber.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="routingNumber"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Routing Number
                  </label>
                  <input
                    id="routingNumber"
                    type="text"
                    {...register("routingNumber", {
                      required:
                        payoutMethod === "bank"
                          ? "Routing number is required"
                          : false,
                      pattern: {
                        value: /^\d+$/,
                        message: "Routing number must contain only numbers",
                      },
                    })}
                    className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none max-w-[400px] ${
                      errors.routingNumber
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    placeholder="XXXXXXXXXXX"
                  />
                  {errors.routingNumber && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.routingNumber.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="p-3 rounded-lg border">
              <label
                htmlFor="instapay"
                className="flex items-start gap-4 cursor-pointer"
              >
                <input
                  id="instapay"
                  type="radio"
                  value="instapay"
                  checked={payoutMethod === "instapay"}
                  onChange={() => setPayoutMethod("instapay")}
                  className="sr-only"
                />
                <div className="w-5">
                  <div
                    className={`h-5 w-5 flex items-center justify-center rounded-full border-2 transition-colors duration-200 ${
                      payoutMethod === "instapay"
                        ? "bg-green-600 border-green-600 text-white"
                        : "border-gray-300 bg-white"
                    }`}
                  >
                    {payoutMethod === "instapay" && (
                      <Check className="w-3 h-3 text-white" />
                    )}
                  </div>
                </div>
                <div className="text-sm text-gray-700 mb-3">
                  <span className="font-semibold">Instapay</span>
                  <span className="block text-sm text-gray-500">
                    Receive payments to your insidiary account. Processing time:
                    1-2 business days.
                  </span>
                </div>
              </label>
              <div className="ml-7">
                <label
                  htmlFor="instapayUsername"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  InstaPay userName
                </label>
                <input
                  id="instapayUsername"
                  type="text"
                  {...register("instapayUsername", {
                    required:
                      payoutMethod === "instapay"
                        ? "InstaPay username is required"
                        : false,
                  })}
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none max-w-[400px] ${
                    errors.instapayUsername
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  placeholder="example@instapay.com"
                />
                {errors.instapayUsername && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.instapayUsername.message}
                  </p>
                )}
              </div>
            </div>
            <div className="p-3 rounded-lg border">
              <label
                htmlFor="mobile-wallet"
                className="flex items-start gap-4 cursor-pointer"
              >
                <input
                  id="mobile-wallet"
                  type="radio"
                  value="mobile"
                  checked={payoutMethod === "mobile"}
                  onChange={() => setPayoutMethod("mobile")}
                  className="sr-only"
                />
                <div className="w-5">
                  <div
                    className={`h-5 w-5 flex items-center justify-center rounded-full border-2 transition-colors duration-200 ${
                      payoutMethod === "mobile"
                        ? "bg-green-600 border-green-600 text-white"
                        : "border-gray-300 bg-white"
                    }`}
                  >
                    {payoutMethod === "mobile" && (
                      <Check className="w-3 h-3 text-white" />
                    )}
                  </div>
                </div>
                <div className="text-sm text-gray-700 mb-3">
                  <span className="font-semibold">Mobile Wallet</span>
                  <span className="block text-sm text-gray-500">
                    Receive payments to your (Vedellene cash, Orange cash, We
                    cash) wallet. Processing time: 1-2 business days.
                  </span>
                </div>
              </label>

              <div className="ml-7">
                <label
                  htmlFor="walletNumber"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Wallet Number
                </label>
                <input
                  id="walletNumber"
                  type="tel"
                  {...register("walletNumber", {
                    required:
                      payoutMethod === "mobile"
                        ? "Wallet number is required"
                        : false,
                    pattern: {
                      value: /^\+?[\d\s]+$/,
                      message: "Please enter a valid phone number",
                    },
                  })}
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none max-w-[400px] ${
                    errors.walletNumber ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="+20 0123456789"
                />
                {errors.walletNumber && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.walletNumber.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            Payout Schedule
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            Choose how often you want to receive your earnings.
          </p>

          <Controller
            name="payoutSchedule"
            control={control}
            render={({ field }) => (
              <select
                {...field}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none max-w-[400px] ${
                  errors.country ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="monthly">Monthly (1st of each Month)</option>
                <option value="weekly">Weekly (Every Monday)</option>
                <option value="biweekly">Biweekly (Every 2 weeks)</option>
              </select>
            )}
          />
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Tax Information
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            Required for tax reporting purposes
          </p>

          <div className="space-y-4">
            <div>
              <label
                htmlFor="taxId"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Tax ID / SSN
              </label>
              <input
                id="taxId"
                type="text"
                {...register("taxId", { required: "Tax ID is required" })}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none max-w-[400px] ${
                  errors.taxId ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="XXXXXXXXXXX"
              />
              {errors.taxId && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.taxId.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="country"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Country of Tax Residence
              </label>
              <select
                id="country"
                {...register("country", { required: "Country is required" })}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none max-w-[400px] ${
                  errors.country ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">Select a country</option>
                <option value="Egypt">Egypt</option>
                <option value="United States">United States</option>
                <option value="United Kingdom">United Kingdom</option>
                {/* Add more countries as needed */}
              </select>
              {errors.country && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.country.message}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayoutSettings;
