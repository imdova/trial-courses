import { useState, useEffect, useRef } from "react";
import { ArrowRight, RotateCw, CheckCircle } from "lucide-react";
import { useVerification } from "@/context/VerificationContext";

interface PhoneVerificationProps {
  onComplete: () => void;
}

const PhoneVerification = ({ onComplete }: PhoneVerificationProps) => {
  const { phone, setPhone, incrementAuthAttempts, setAuthOtp } =
    useVerification();

  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [activeInput, setActiveInput] = useState(0);
  const [isSending, setIsSending] = useState(false);
  const [timer, setTimer] = useState(0);
  const [error, setError] = useState("");
  const [maxAttemptsReached, setMaxAttemptsReached] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [isVerified, setIsVerified] = useState(false);
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [phoneInput, setPhoneInput] = useState(phone || "");
  const phoneInputRef = useRef<HTMLInputElement>(null);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else if (maxAttemptsReached) {
      setMaxAttemptsReached(false);
      setError("");
    }
  }, [timer, maxAttemptsReached]);

  const validatePhoneNumber = (phone: string) => {
    const phoneRegex = /^\+?[0-9]{10,15}$/;
    return phoneRegex.test(phone);
  };

  const sendOtp = async () => {
    if (!validatePhoneNumber(phoneInput)) {
      setError("Please enter a valid phone number");
      return;
    }

    setIsSending(true);
    setError("");
    try {
      setPhone(phoneInput);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setShowOtpInput(true);
      setTimer(30);
      setOtp(Array(6).fill(""));
      setActiveInput(0);
      inputRefs.current[0]?.focus();
    } catch (err) {
      setError("Failed to send OTP. Please try again.");
      console.log(err);
    } finally {
      setIsSending(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value.replace(/\D/g, "");

    if (value) {
      const newOtp = [...otp];
      newOtp[index] = value.substring(value.length - 1);
      setOtp(newOtp);

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
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const newOtp = [...otp];
      newOtp[index - 1] = "";
      setOtp(newOtp);
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
      setOtp(newOtp);
      setActiveInput(5);
      inputRefs.current[5]?.focus();
    }
  };

  const verifyOtp = async () => {
    const otpString = otp.join("");
    if (otpString.length !== 6) {
      setError("Please enter a valid 6-digit code");
      return;
    }

    incrementAuthAttempts();
    setAttempts((prev) => prev + 1);

    if (attempts + 1 > 2) {
      setMaxAttemptsReached(true);
      setTimer(60);
      setError("Maximum attempts reached. Please wait before trying again.");
      return;
    }

    setError("");
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const isValid = true; // Simulate success

      if (isValid) {
        setAuthOtp(otpString);
        setIsVerified(true);
        setTimeout(() => {
          onComplete();
        }, 1000);
      } else {
        setError("Invalid verification code. Please try again.");
      }
    } catch (err) {
      setError("Verification failed. Please try again.");
      console.log(err);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">
        {showOtpInput ? "Verify Your Phone" : "Enter Your Phone Number"}
      </h2>

      {isVerified ? (
        <div className="flex flex-col items-center justify-center py-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Verified!
          </h3>
          <p className="text-gray-500">Redirecting to next step...</p>
        </div>
      ) : showOtpInput ? (
        <>
          <p className="text-gray-600 mb-8">
            Weve sent a 6-digit code to{" "}
            <span className="font-medium text-gray-800">{phoneInput}</span>
          </p>

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
                  value={otp[index]}
                  onChange={(e) => handleChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  onPaste={handlePaste}
                  onFocus={() => setActiveInput(index)}
                  maxLength={1}
                  className={`w-10 h-12 md:w-12 md:h-14 text-2xl text-center border-2 rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 ${
                    activeInput === index
                      ? "border-green-500 ring-green-200"
                      : otp[index]
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
            onClick={verifyOtp}
            disabled={otp.join("").length !== 6 || maxAttemptsReached}
            className="w-full py-3 px-6 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg shadow-md hover:from-green-600 hover:to-green-700 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center"
          >
            Verify Phone
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
                onClick={sendOtp}
                disabled={isSending || maxAttemptsReached}
                className="text-green-600 hover:text-green-800 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium flex items-center justify-center mx-auto"
              >
                {isSending ? (
                  <>
                    <RotateCw className="w-4 h-4 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Didn't receive a code? Resend"
                )}
              </button>
            )}
          </div>
        </>
      ) : (
        <>
          <p className="text-gray-600 mb-8">
            We will send you a 6-digit verification code via SMS
          </p>

          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <input
              ref={phoneInputRef}
              type="tel"
              value={phoneInput}
              onChange={(e) => setPhoneInput(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none"
              placeholder="+1 (123) 456-7890"
              inputMode="tel"
            />
          </div>

          {error && (
            <div className="mb-6 text-center">
              <p className="text-red-500 text-sm">{error}</p>
            </div>
          )}

          <button
            onClick={sendOtp}
            disabled={isSending || !phoneInput}
            className="w-full py-3 px-6 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg shadow-md hover:from-green-600 hover:to-green-700 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center"
          >
            {isSending ? (
              <>
                <RotateCw className="w-5 h-5 mr-2 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                Send Verification Code
                <ArrowRight className="w-5 h-5 ml-2" />
              </>
            )}
          </button>
        </>
      )}
    </div>
  );
};

export default PhoneVerification;
