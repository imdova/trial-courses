import { useState, useEffect } from "react";
import { Mail, Phone, FileText, CheckCircle, X } from "lucide-react";
import EmailVerification from "./EmailVerification";
import PhoneVerification from "./PhoneVerification";
import IdentityVerification from "./IdentityVerification";
import VerificationComplete from "./VerificationComplete";
import {
  VerificationStatus,
  VerificationStep,
} from "@/types/verification-types";
import { useVerification } from "@/context/VerificationContext";

interface VerificationModalProps {
  onClose: () => void;
  onComplete: (status: Partial<VerificationStatus>) => void;
  initialStatus?: VerificationStatus;
}

const VerificationModal = ({ onClose, onComplete }: VerificationModalProps) => {
  const {
    verificationStep,
    verificationStatus,
    setVerificationStep,
    updateVerificationStatus,
  } = useVerification();

  const [currentStep, setCurrentStep] = useState<VerificationStep>(
    verificationStep || "email"
  );

  // Sync with context step
  useEffect(() => {
    if (verificationStep) {
      setCurrentStep(verificationStep);
    }
  }, [verificationStep]);

  useEffect(() => {
    // Only update if currentStep doesn't match the desired step
    if (
      verificationStatus.email &&
      !verificationStatus.phone &&
      currentStep !== "phone"
    ) {
      setCurrentStep("phone");
      setVerificationStep("phone");
    } else if (
      verificationStatus.phone &&
      !verificationStatus.identity &&
      currentStep !== "identity"
    ) {
      setCurrentStep("identity");
      setVerificationStep("identity");
    } else if (
      verificationStatus.email &&
      verificationStatus.phone &&
      verificationStatus.identity &&
      currentStep !== "complete"
    ) {
      setCurrentStep("complete");
      setVerificationStep("complete");
    }
  }, [verificationStatus, currentStep, setVerificationStep]);

  const steps = [
    { step: "email", icon: Mail, label: "Email" },
    {
      step: "phone",
      icon: Phone,
      label: "Phone",
      locked: !verificationStatus.email,
    },
    {
      step: "identity",
      icon: FileText,
      label: "Identity",
      locked: !verificationStatus.email || !verificationStatus.phone,
    },
  ];

  const handleStepComplete = (step: keyof VerificationStatus) => {
    updateVerificationStatus({ [step]: true });

    // Determine next step
    if (step === "email") {
      setCurrentStep("phone");
      setVerificationStep("phone");
    } else if (step === "phone") {
      setCurrentStep("identity");
      setVerificationStep("identity");
    } else if (step === "identity") {
      setCurrentStep("complete");
      setVerificationStep("complete");
      setTimeout(() => onComplete({ [step]: true }), 2000);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case "email":
        return (
          <EmailVerification onComplete={() => handleStepComplete("email")} />
        );
      case "phone":
        return (
          <PhoneVerification onComplete={() => handleStepComplete("phone")} />
        );
      case "identity":
        return (
          <IdentityVerification
            onComplete={() => handleStepComplete("identity")}
          />
        );
      case "complete":
        return <VerificationComplete onClose={onClose} />;
      default:
        return <EmailVerification onComplete={() => {}} />;
    }
  };

  const getStepStatus = (step: keyof VerificationStatus) => {
    if (verificationStatus[step]) return "complete";
    if (currentStep === step) return "current";
    return "pending";
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header with Progress Indicator */}
        <div className="sticky top-0 bg-white z-10 p-6 border-b border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">
              Verify Your Account
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Step Progress Indicator */}
          <div className="relative max-w-xl mx-auto">
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-100 -translate-y-1/2 rounded-full"></div>
            <div className="flex justify-between relative z-10">
              {steps.map(({ step, icon: Icon, label, locked }) => {
                const status = getStepStatus(step as keyof VerificationStatus);
                return (
                  <div key={step} className="flex flex-col items-center">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-all ${
                        status === "complete"
                          ? "bg-green-100 text-green-600"
                          : status === "current"
                          ? "bg-green-100 text-green-600"
                          : locked
                          ? "bg-gray-100 text-gray-400"
                          : "bg-gray-100 text-gray-400"
                      }`}
                    >
                      {status === "complete" ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : locked ? (
                        <Icon className="w-5 h-5 opacity-50" />
                      ) : (
                        <Icon className="w-5 h-5" />
                      )}
                    </div>
                    <span
                      className={`text-xs font-medium ${
                        status === "complete"
                          ? "text-green-600"
                          : status === "current"
                          ? "text-green-600"
                          : locked
                          ? "text-gray-400"
                          : "text-gray-600"
                      }`}
                    >
                      {label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Current Step Content */}
        <div className="p-6">{renderStep()}</div>
      </div>
    </div>
  );
};

export default VerificationModal;
