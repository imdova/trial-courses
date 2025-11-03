"use client";
// import { useState } from "react";
import { Mail, Phone, FileText, CheckCircle, Lock } from "lucide-react";
// import {
//   VerificationStep,
//   VerificationStatus,
// } from "@/types/verification-types";

const AccountVerification = () => {
  // const [showVerificationModal, setShowVerificationModal] = useState(false);

  const steps = [
    {
      step: "email",
      icon: Mail,
      label: "Confirm email address",
      completed: false,
      disabled: false,
    },
    {
      step: "phone",
      icon: Phone,
      label: "Confirm phone number",
      description: "Make your account more secure",
      completed: false,
      disabled: false,
    },
    {
      step: "identity",
      icon: FileText,
      label: "Verify your identity",
      description: "Verify residential address",
      completed: false,
      disabled: false,
    },
  ];

  const completedSteps = steps.filter((step) => step.completed).length;

  // const handleCompleteStep = (step: VerificationStep) => {
  //   // setVerificationStep(step);
  //   // setShowVerificationModal(true);
  // };

  // const handleVerificationComplete = (status: Partial<VerificationStatus>) => {
  //   // updateVerificationStatus(status);
  //   // setShowVerificationModal(false);
  // };

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
      {/* Account Status Header */}
      <div className="border-b border-gray-200 p-6">
        <h1 className="mb-2 text-xl font-semibold text-gray-800">Account</h1>
        <div className="mb-4 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
          <div className="flex items-center">
            <span
              className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${
                completedSteps === steps.length
                  ? "bg-green-100 text-green-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {completedSteps === steps.length ? "Verified" : "Not verified"}
            </span>
            <span className="ml-2 text-sm text-gray-600">
              {completedSteps}/{steps.length} steps complete
            </span>
          </div>
          <button
            // onClick={() => {
            //   // const firstIncomplete = steps.find(
            //   //   (step) =>
            //   //     !verificationStatus[step.step as keyof VerificationStatus]
            //   // );
            //   // setVerificationStep(
            //   //   (firstIncomplete?.step as VerificationStep) || "email"
            //   // );
            //   setShowVerificationModal(true);
            // }}
            className="rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
          >
            {completedSteps === 0 ? "Verify Now" : "Complete Verification"}
          </button>
        </div>
      </div>

      {/* Verification Steps */}
      <div className="p-6">
        <h2 className="mb-4 text-lg font-medium text-gray-800">
          Verification steps
        </h2>
        <div className="space-y-4">
          {steps.map((step) => (
            <div
              key={step.step}
              className={`flex items-start justify-between ${
                step.disabled ? "opacity-75" : ""
              }`}
            >
              <div className="flex flex-1 items-start">
                <div
                  className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full ${
                    step.completed
                      ? "bg-green-100"
                      : step.disabled
                        ? "bg-gray-100"
                        : "bg-green-50"
                  }`}
                >
                  {step.disabled && !step.completed ? (
                    <Lock className="h-5 w-5 text-gray-400" />
                  ) : (
                    <step.icon
                      className={`h-5 w-5 ${
                        step.completed
                          ? "text-green-600"
                          : step.disabled
                            ? "text-gray-400"
                            : "text-green-600"
                      }`}
                    />
                  )}
                </div>
                <div className="ml-4">
                  <h3
                    className={`text-sm font-medium ${
                      step.completed
                        ? "text-green-600"
                        : step.disabled
                          ? "text-gray-500"
                          : "text-gray-700"
                    }`}
                  >
                    {step.label}
                  </h3>
                  <p className="text-sm text-gray-500">{step.description}</p>
                  {/* {step.step === "email" && (
                    <p className="text-sm text-gray-500">{email}</p>
                  )} */}
                </div>
              </div>
              {!step.completed ? (
                <button
                  // onClick={() =>
                  //   handleCompleteStep(step.step as VerificationStep)
                  // }
                  disabled={step.disabled}
                  className={`ml-4 rounded-md px-3 py-1 text-xs font-medium transition-colors ${
                    step.disabled
                      ? "cursor-not-allowed bg-gray-100 text-gray-400"
                      : "bg-green-600 text-white hover:bg-green-700"
                  }`}
                >
                  {step.disabled ? "Locked" : "Complete"}
                </button>
              ) : (
                <div className="ml-4 flex items-center text-xs text-green-600">
                  <CheckCircle className="mr-1 h-4 w-4" />
                  Verified
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Verification Modal */}
      {/* {showVerificationModal && (
        <VerificationModal
          onClose={() => setShowVerificationModal(false)}
          onComplete={handleVerificationComplete}
          initialStatus={verificationStatus}
        />
      )} */}
    </div>
  );
};

export default AccountVerification;
