export type VerificationStep = "email" | "phone" | "identity" | "complete";
export type VerificationStatus = {
  email: boolean;
  phone: boolean;
  identity: boolean;
};

export type DocumentType =
  | "passport"
  | "driver_license"
  | "id_card"
  | "residence_permit";

// Define the full shape of the simulated response object
export interface ApiResponse<T> {
  data: T;
  // Potentially other properties like status, message etc.
}

export interface VerificationState {
  currentStep: VerificationStep;
  email: string;
  phone: string;
  country: string;
  documentType: DocumentType | null;
  frontDocument: File | null;
  backDocument: File | null;
  otp: string;
  verificationAttempts: number;
  isVerified: boolean;
  verificationStatus: VerificationStatus;
}
