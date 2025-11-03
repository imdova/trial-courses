import { useState, useRef, useEffect } from "react";
import { CheckCircle, RotateCw, ArrowRight } from "lucide-react";
import { useVerification } from "@/context/VerificationContext";

const OTPVerification = () => {
  const {
    email,
    phone,
    verificationMethod,
    setAuthOtp,
    incrementAuthAttempts,
    completeAuthVerification,
    setAuthStep,
  } = useVerification();

  const [otpDigits, setOtpDigits] = useState<string[]>(Array(6).fill(""));
  const [activeInput, setActiveInput] = useState(0);
  const [isVerifying, setIsVerifying] = useState(false);
  const [timer, setTimer] = useState(30);
  const [error, setError] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value.replace(/\D/g, "");

    if (value) {
      const newOtp = [...otpDigits];
      newOtp[index] = value.substring(value.length - 1);
      setOtpDigits(newOtp);

      if (index < 5) {
        setActiveInput(index + 1);
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !otpDigits[index] && index > 0) {
      const newOtp = [...otpDigits];
      newOtp[index - 1] = "";
      setOtpDigits(newOtp);
      setActiveInput(index - 1);
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasteData = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .substring(0, 6);
    if (pasteData.length === 6) {
      const newOtp = pasteData.split("");
      setOtpDigits(newOtp);
      setActiveInput(5);
      inputRefs.current[5]?.focus();
    }
  };

  const resendOTP = async () => {
    setError("");
    try {
      // Simulate API call to resend OTP
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setTimer(30);
      setOtpDigits(Array(6).fill(""));
      setActiveInput(0);
      inputRefs.current[0]?.focus();
    } catch (err) {
      setError("Failed to resend OTP. Please try again.");
      console.log(err);
    }
  };

  const verifyOTP = async () => {
    const otpString = otpDigits.join("");
    if (otpString.length !== 6) {
      setError("Please enter a valid 6-digit code");
      return;
    }

    setIsVerifying(true);
    setError("");
    incrementAuthAttempts();
    setAuthOtp(otpString);

    try {
      // Simulate API verification
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // In a real app, you would check the response from your API
      const isValid = true; // Simulate successful verification

      if (isValid) {
        setIsVerified(true);
        completeAuthVerification();
        setTimeout(() => {
          setAuthStep("complete");
        }, 1000);
      } else {
        setError("Invalid verification code. Please try again.");
      }
    } catch (err) {
      setError("Verification failed. Please try again.");
      console.log(err);
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">
        Verify Your {verificationMethod === "email" ? "Email" : "Phone"}
      </h2>
      <p className="text-gray-600 mb-8 text-center">
        Weve sent a 6-digit code to{" "}
        <span className="font-medium text-gray-800">
          {verificationMethod === "email" ? email : phone}
        </span>
      </p>

      {isVerified ? (
        <div className="flex flex-col items-center justify-center py-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Verified!
          </h3>
          <p className="text-gray-500">Redirecting...</p>
        </div>
      ) : (
        <>
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Enter verification code
            </label>
            <div className="flex justify-between space-x-2">
              {Array.from({ length: 6 }).map((_, index) => (
                <input
                  key={index}
                  ref={(el) => {
                    inputRefs.current[index] = el;
                  }}
                  type="text"
                  value={otpDigits[index]}
                  onChange={(e) => handleChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  onPaste={handlePaste}
                  onFocus={() => setActiveInput(index)}
                  maxLength={1}
                  className={`w-10 h-12 md:w-12 md:h-14 text-2xl text-center border-2 rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 ${
                    activeInput === index
                      ? "border-green-500 ring-green-200"
                      : otpDigits[index]
                      ? "border-green-400"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                  inputMode="numeric"
                  pattern="[0-9]*"
                />
              ))}
            </div>
          </div>

          {error && (
            <div className="mb-6 text-center">
              <p className="text-red-500 text-sm">{error}</p>
            </div>
          )}

          <button
            onClick={verifyOTP}
            disabled={isVerifying || otpDigits.join("").length !== 6}
            className="w-full py-3 px-6 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg shadow-md hover:from-green-600 hover:to-green-700 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center"
          >
            {isVerifying ? "Verifying..." : "Verify"}
            <ArrowRight className="w-5 h-5 ml-2" />
          </button>

          <div className="mt-6 text-center">
            {timer > 0 ? (
              <p className="text-sm text-gray-500">
                Resend code in{" "}
                <span className="font-medium text-gray-700">
                  {String(Math.floor(timer / 60)).padStart(2, "0")}:
                  {String(timer % 60).padStart(2, "0")}
                </span>
              </p>
            ) : (
              <button
                onClick={resendOTP}
                className="text-green-600 hover:text-green-800 text-sm font-medium flex items-center justify-center mx-auto"
              >
                <RotateCw className="w-4 h-4 mr-2" />
                Resend Code
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default OTPVerification;
