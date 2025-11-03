import { useState, useCallback } from "react";
import { FileText, Upload, Check, X, ChevronDown } from "lucide-react";
import { useVerification } from "@/context/VerificationContext";
import Image from "next/image";
import { DocumentType } from "@/types/verification-types";

interface IdentityVerificationProps {
  onComplete: () => void;
}

const IdentityVerification = ({ onComplete }: IdentityVerificationProps) => {
  const {
    country,
    setCountry,
    documentType,
    setDocumentType,
    setFrontDocument,
    setBackDocument,
  } = useVerification();

  const [frontFile, setFrontFile] = useState<File | null>(null);
  const [backFile, setBackFile] = useState<File | null>(null);
  const [frontPreview, setFrontPreview] = useState<string | null>(null);
  const [backPreview, setBackPreview] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [frontExit, setFrontExit] = useState(false);
  const [backExit, setBackExit] = useState(false);

  const documentTypes = [
    { value: "passport", label: "Passport" },
    { value: "driver_license", label: "Driver's License" },
    { value: "id_card", label: "ID Card" },
    { value: "residence_permit", label: "Residence Permit" },
  ];

  const countries = [
    { value: "US", label: "United States" },
    { value: "CA", label: "Canada" },
    { value: "GB", label: "United Kingdom" },
    { value: "EG", label: "Egypt" },
    { value: "DE", label: "Germany" },
    { value: "FR", label: "France" },
    { value: "AU", label: "Australia" },
    { value: "JP", label: "Japan" },
  ];

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, side: "front" | "back") => {
      const file = e.target.files?.[0];
      if (!file) return;

      const validTypes = ["image/jpeg", "image/png", "application/pdf"];
      if (!validTypes.includes(file.type)) {
        setError("Please upload a JPEG, PNG, or PDF file.");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        setError("File size should not exceed 5MB.");
        return;
      }

      setError("");

      const reader = new FileReader();
      reader.onload = () => {
        if (side === "front") {
          setFrontFile(file);
          setFrontDocument(file); // Update context
          setFrontPreview(
            file.type.includes("image") ? (reader.result as string) : null
          );
          setFrontExit(false);
        } else {
          setBackFile(file);
          setBackDocument(file); // Update context
          setBackPreview(
            file.type.includes("image") ? (reader.result as string) : null
          );
          setBackExit(false);
        }
      };
      reader.readAsDataURL(file);
    },
    [setFrontDocument, setBackDocument]
  );

  // Update the removeFile function to handle null properly
  const removeFile = (side: "front" | "back") => {
    if (side === "front") {
      setFrontExit(true);
      setTimeout(() => {
        setFrontFile(null);
        // Use type assertion if your context accepts null
        setFrontDocument(null as unknown as File); // Temporary workaround
        setFrontPreview(null);
        setFrontExit(false);
      }, 300);
    } else {
      setBackExit(true);
      setTimeout(() => {
        setBackFile(null);
        // Use type assertion if your context accepts null
        setBackDocument(null as unknown as File); // Temporary workaround
        setBackPreview(null);
        setBackExit(false);
      }, 300);
    }
    setError("");
  };

  const handleSubmit = async () => {
    if (!country) {
      setError("Please select your country.");
      return;
    }
    if (!documentType) {
      setError("Please select your document type.");
      return;
    }
    if (!frontFile) {
      setError("Please upload the front of your document.");
      return;
    }
    if (documentType !== "passport" && !backFile) {
      setError("Please upload the back of your document.");
      return;
    }

    setError("");

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      onComplete();
    } catch (err) {
      setError("Failed to upload documents. Please try again.");
      console.log(err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-3xl shadow-sm border border-gray-200 transform transition-all duration-300">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-4 text-center">
        Verify Your Identity
      </h2>
      <p className="text-lg text-gray-700 mb-8 text-center max-w-md mx-auto">
        Please upload a clear photo or scan of your identity document.
      </p>

      <div className="grid grid-cols-1 gap-8 mb-10">
        <div className="relative group">
          <label
            htmlFor="country"
            className="block text-sm font-semibold text-gray-800 mb-2"
          >
            1. Country/Region of Issuance
          </label>
          <div className="relative">
            <select
              id="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full px-5 py-3 border outline-none border-gray-300 rounded-xl appearance-none bg-white shadow-sm text-gray-800 font-medium pr-10 transition-all duration-200 cursor-pointer"
            >
              <option value="">Select country</option>
              {countries.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none transition-colors duration-200" />
          </div>
        </div>

        <div className="relative group">
          <label
            htmlFor="documentType"
            className="block text-sm font-semibold text-gray-800 mb-2"
          >
            2. Type of Identity Document
          </label>
          <div className="relative">
            <select
              id="documentType"
              value={documentType || ""}
              onChange={(e) => setDocumentType(e.target.value as DocumentType)}
              className="w-full px-5 py-3 border outline-none border-gray-300 rounded-xl appearance-none bg-white shadow-sm text-gray-800 font-medium pr-10 transition-all duration-200 cursor-pointer"
            >
              <option value="">Select document type</option>
              {documentTypes.map((d) => (
                <option key={d.value} value={d.value}>
                  {d.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none transition-colors duration-200" />
          </div>
        </div>
      </div>

      <div className="mb-10">
        <h3 className="text-lg font-bold text-gray-800 mb-5">
          3. Upload Your Document Photos
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative bg-white rounded-2xl shadow-sm border border-gray-200 flex flex-col items-center justify-center min-h-[250px] overflow-hidden transition-all duration-300">
            {frontPreview ? (
              <div
                className={`absolute inset-0 flex flex-col items-center justify-center p-4 ${
                  frontExit ? "animate-file-exit" : "animate-file-enter"
                }`}
              >
                {frontFile?.type.includes("image") ? (
                  <Image
                    width={300}
                    height={300}
                    src={frontPreview}
                    alt="Front of document preview"
                    className="w-full h-full object-cover rounded-2xl"
                  />
                ) : (
                  <div className="flex flex-col items-center text-gray-600 p-4 bg-white rounded-lg shadow-md">
                    <FileText className="w-16 h-16 text-green-500 mb-2" />
                    <p className="text-sm font-medium truncate w-full px-4 text-center">
                      {frontFile?.name}
                    </p>
                  </div>
                )}
                <button
                  onClick={() => removeFile("front")}
                  className="absolute top-4 right-4 bg-red-500 flex items-center justify-center text-white w-6 h-6 rounded-full p-2 shadow-md hover:bg-red-600 transition-colors duration-200 z-10"
                  aria-label="Remove front file"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <label className="cursor-pointer flex flex-col items-center justify-center w-full h-full p-4">
                <div className="p-4 bg-green-50 rounded-full mb-3">
                  <Upload className="w-10 h-10 text-green-600" />
                </div>
                <p className="text-sm font-semibold text-gray-800 mb-1">
                  Upload Front Side
                </p>
                <p className="text-sm text-gray-600 text-center">
                  JPEG, PNG, or PDF (max 5MB)
                </p>
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={(e) => handleFileChange(e, "front")}
                  className="hidden"
                />
              </label>
            )}
          </div>

          {documentType !== "passport" && (
            <div className="relative bg-white rounded-2xl shadow-sm border border-gray-200 flex flex-col items-center justify-center min-h-[250px] overflow-hidden transition-all duration-300">
              {backPreview ? (
                <div
                  className={`absolute inset-0 flex flex-col items-center justify-center p-4 ${
                    backExit ? "animate-file-exit" : "animate-file-enter"
                  }`}
                >
                  {backFile?.type.includes("image") ? (
                    <Image
                      width={300}
                      height={300}
                      src={backPreview}
                      alt="Back of document preview"
                      className="w-full h-full object-cover rounded-2xl"
                    />
                  ) : (
                    <div className="flex flex-col items-center text-gray-600 p-4 bg-white rounded-lg shadow-md">
                      <FileText className="w-16 h-16 text-green-500 mb-2" />
                      <p className="text-sm font-medium truncate w-full px-4 text-center">
                        {backFile?.name}
                      </p>
                    </div>
                  )}
                  <button
                    onClick={() => removeFile("back")}
                    className="absolute top-4 right-4 bg-red-500 flex items-center justify-center text-white w-6 h-6 rounded-full p-2 shadow-md hover:bg-red-600 transition-colors duration-200 z-10"
                    aria-label="Remove back file"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <label className="cursor-pointer flex flex-col items-center justify-center w-full h-full p-4">
                  <div className="p-4 bg-green-50 rounded-full mb-3">
                    <Upload className="w-10 h-10 text-green-600" />
                  </div>
                  <p className="text-sm font-semibold text-gray-800 mb-1">
                    Upload Back Side
                  </p>
                  <p className="text-sm text-gray-600 text-center">
                    JPEG, PNG, or PDF (max 5MB)
                  </p>
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={(e) => handleFileChange(e, "back")}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="bg-green-50 p-6 rounded-xl shadow-inner mb-8 border border-green-200">
        <h4 className="text-base font-bold text-green-800 mb-4">
          Document Requirements
        </h4>
        <ul className="text-base text-gray-700 space-y-2">
          <li className="flex items-start">
            <Check className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
            <span>Photo is clear, sharp, and well-lit.</span>
          </li>
          <li className="flex items-start">
            <Check className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
            <span>All details (text, numbers) are clearly readable.</span>
          </li>
          <li className="flex items-start">
            <Check className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
            <span>High-resolution image or scan for optimal quality.</span>
          </li>
          <li className="flex items-start">
            <Check className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
            <span>Ensure all four corners of the document are visible.</span>
          </li>
        </ul>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg relative mb-6 text-center shadow-sm">
          <p className="font-medium">{error}</p>
        </div>
      )}

      <button
        onClick={handleSubmit}
        disabled={
          !country ||
          !documentType ||
          !frontFile ||
          (documentType !== "passport" && !backFile)
        }
        className="w-full px-8 py-4 bg-gradient-to-r from-green-600 to-green-800 text-white font-bold rounded-md shadow-lg hover:from-green-700 hover:to-green-900 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transform transition-all duration-300 text-lg tracking-wide"
      >
        Submit Documents
      </button>
    </div>
  );
};

export default IdentityVerification;
