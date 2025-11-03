import { useVerification } from "@/context/VerificationContext";
import { CheckCircle, Mail, Phone, FileText } from "lucide-react";

const VerificationComplete = ({ onClose }: { onClose: () => void }) => {
  const { email, phone } = useVerification();

  return (
    <div className="max-w-lg mx-auto p-8 bg-white rounded-3xl shadow-3xl transform transition-all duration-500 border border-gray-100 relative overflow-hidden">
      {/* Background subtle pattern/gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-purple-50/50 opacity-60 rounded-3xl z-0"></div>

      {/* Content */}
      <div className="relative z-10 text-center">
        {/* Success Icon Section */}
        <div className="mb-6">
          <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 shadow-xl mb-4 animate-scale-in">
            <CheckCircle className="h-12 w-12 text-white" />
          </div>
          <h2 className="text-4xl font-extrabold text-gray-900 mb-2 leading-tight tracking-tight">
            Verification Complete!
          </h2>
          <p className="text-xl text-gray-700 font-light max-w-sm mx-auto">
            Your account has been successfully verified. You now have full
            access to all features.
          </p>
        </div>

        {/* Verified Details Section */}
        <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl shadow-inner-lg mb-8 text-left border border-green-200 animate-fade-in-up delay-200">
          <h3 className="text-lg font-bold text-green-800 mb-6 border-b pb-4 border-green-200/70">
            Verified Account Details
          </h3>
          <div className="space-y-6">
            {/* Email Detail */}
            <div className="flex items-center p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.01] border border-gray-100">
              <Mail className="w-7 h-7 text-green-600 mr-5 flex-shrink-0" />
              <div>
                <p className="text-sm text-gray-500 font-medium">
                  Email Address
                </p>
                <p className="text-base font-semibold text-gray-800 break-words">
                  {email || "N/A"}
                </p>
              </div>
            </div>
            {/* Phone Detail */}
            <div className="flex items-center p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.01] border border-gray-100">
              <Phone className="w-7 h-7 text-green-600 mr-5 flex-shrink-0" />
              <div>
                <p className="text-sm text-gray-500 font-medium">
                  Phone Number
                </p>
                <p className="text-base font-semibold text-gray-800">
                  {phone || "N/A"}
                </p>
              </div>
            </div>
            {/* Identity Status */}
            <div className="flex items-center p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.01] border border-gray-100">
              <FileText className="w-7 h-7 text-green-600 mr-5 flex-shrink-0" />
              <div>
                <p className="text-sm text-gray-500 font-medium">
                  Identity Verification
                </p>
                <p className="text-base font-semibold text-gray-800">
                  Verified
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex flex-col gap-3 justify-center">
          <button
            onClick={onClose}
            className="px-10 py-4 bg-gradient-to-r from-green-700 to-green-900 text-white font-bold text-sm rounded-full shadow-sm hover:from-green-800 hover:to-green-950 focus:outline-none transform transition-all duration-300 active:scale-95 tracking-wide"
          >
            Back to Account
          </button>
        </div>
      </div>

      {/* Animation styles */}
      <style jsx>{`
        @keyframes scaleIn {
          from {
            transform: scale(0.8);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        .animate-scale-in {
          animation: scaleIn 0.6s ease-out forwards;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.7s ease-out forwards;
        }

        .delay-200 {
          animation-delay: 0.2s;
        }
      `}</style>
    </div>
  );
};

export default VerificationComplete;
