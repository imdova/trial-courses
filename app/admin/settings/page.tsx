// app/settings/page.tsx
"use client";

import { useState } from "react";
import ProfileSettings from "./panels/ProfileSettings";
import PayoutSettings from "./panels/PayoutSettings";
import SecuritySettings from "./panels/SecuritySettings ";
import CommunicationSettings from "./panels/CommunicationSettings";
import {
  Bell,
  CreditCard,
  RotateCcw,
  Save,
  Shield,
  UserRoundCog,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { formDataSettings } from "@/types/forms";



const SettingsPage = () => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm<formDataSettings>({
    defaultValues: {
      // profile
      firstName: "",
      lastName: "",
      username: "",
      bio: "",
      website: "",
      //Communication
      newEnrollment: true,
      courseCompletion: true,
      studentQuestions: true,
      reviewNotifications: true,
      announcements: true,
      systemUpdates: true,
      weeklyReports: true,
      //Payout
      payoutMethod: "bank",
      accountHolderName: "",
      accountNumber: "",
      routingNumber: "",
      instapayUsername: "",
      walletNumber: "",
      taxId: "",
      country: "",
      payoutSchedule: "",
      // Security
      email: "",
      phone: "",
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });
  const [activeTab, setActiveTab] = useState("profile");
  const onSubmit = (data: formDataSettings) => {
    console.log(data);
    // Handle form submission
  };
  const handleReset = () => {
    // Reset the form to its initial values
    reset({
      // profile
      firstName: "",
      lastName: "",
      username: "",
      bio: "",
      website: "",
      //Communication
      newEnrollment: true,
      courseCompletion: true,
      studentQuestions: true,
      reviewNotifications: true,
      announcements: true,
      systemUpdates: true,
      weeklyReports: true,
      //Payout
      payoutMethod: "bank",
      accountHolderName: "",
      accountNumber: "",
      routingNumber: "",
      instapayUsername: "",
      walletNumber: "",
      taxId: "",
      country: "",
      payoutSchedule: "",
      // Security
      email: "",
      phone: "",
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
      className="min-h-screen bg-gray-50"
    >
      <div>
        <div>
          {/* Sidebar */}
          <div className="w-full mb-4">
            <div className="bg-white rounded-lg shadow p-2 border">
              <nav className="flex flex-wrap justify-center items-center gap-3 md:justify-start">
                <button
                  type="button"
                  onClick={() => setActiveTab("profile")}
                  className={`flex items-center gap-2 text-left px-3 py-2 rounded-md text-sm font-medium ${
                    activeTab === "profile"
                      ? "bg-primary text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <UserRoundCog size={15} />
                  Profile Information
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("communication")}
                  className={`flex items-center gap-2 text-left px-3 py-2 rounded-md text-sm font-medium ${
                    activeTab === "communication"
                      ? "bg-primary text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <Bell size={15} />
                  Communication Settings
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("payout")}
                  className={`flex items-center gap-2 text-left px-3 py-2 rounded-md text-sm font-medium ${
                    activeTab === "payout"
                      ? "bg-primary text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <CreditCard size={15} />
                  Payout Settings
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("security")}
                  className={`flex items-center gap-2 text-left px-3 py-2 rounded-md text-sm font-medium ${
                    activeTab === "security"
                      ? "bg-primary text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <Shield size={15} />
                  Security Settings
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 space-y-4 bg-white border rounded-lg shadow p-6">
            <div className={activeTab === "profile" ? "block" : "hidden"}>
              <ProfileSettings
                register={register}
                control={control}
                errors={errors}
              />
            </div>

            <div className={activeTab === "payout" ? "block" : "hidden"}>
              <PayoutSettings
                register={register}
                control={control}
                errors={errors}
              />
            </div>

            <div className={activeTab === "security" ? "block" : "hidden"}>
              <SecuritySettings
                register={register}
                watch={watch}
                errors={errors}
              />
            </div>

            <div className={activeTab === "communication" ? "block" : "hidden"}>
              <CommunicationSettings register={register} />
            </div>
            <div className="flex justify-end space-x-4 pt-4">
              <button
                onClick={handleReset}
                type="button"
                className="flex items-center gap-2 px-4 py-2 text-primary border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
              >
                <RotateCcw size={12} />
                Reset
              </button>
              <button
                type="submit"
                className="flex items-center gap-2 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none"
              >
                <Save size={12} />
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default SettingsPage;
