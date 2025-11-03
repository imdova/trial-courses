"use client";
import { DocumentType } from "@/types/verification-types";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

// Verification types
type AuthFlow = "register" | "login";
type AuthStep = "credentials" | "verify" | "complete";
type VerificationStep = "email" | "phone" | "identity" | "complete";
type VerificationMethod = "email" | "phone";

interface VerificationStatus {
  email: boolean;
  phone: boolean;
  identity: boolean;
}

interface VerificationState {
  // Auth properties
  authFlow: AuthFlow;
  authStep: AuthStep;
  email: string;
  phone: string;
  password: string;
  name: string;
  authOtp: string;
  verificationMethod: VerificationMethod | null;
  verificationAttempts: number;
  isAuthVerified: boolean;

  // Verification properties
  verificationStep: VerificationStep;
  country: string;
  documentType: DocumentType | null;
  frontDocument: File | null;
  backDocument: File | null;
  verificationOtp: string;
  isIdentityVerified: boolean;
  verificationStatus: VerificationStatus;
}

interface VerificationContextType extends VerificationState {
  // Auth methods
  setAuthFlow: (flow: AuthFlow) => void;
  setAuthStep: (step: AuthStep) => void;
  setEmail: (email: string) => void;
  setPhone: (phone: string) => void;
  setPassword: (password: string) => void;
  setName: (name: string) => void;
  setAuthOtp: (otp: string) => void;
  setVerificationMethod: (method: VerificationMethod) => void;
  incrementAuthAttempts: () => void;
  completeAuthVerification: () => void;
  resetAuth: () => void;

  // Verification methods
  setVerificationStep: (step: VerificationStep) => void;
  setCountry: (country: string) => void;
  setDocumentType: (type: DocumentType) => void;
  setFrontDocument: (file: File) => void;
  setBackDocument: (file: File) => void;
  setVerificationOtp: (otp: string) => void;
  incrementVerificationAttempts: () => void;
  completeIdentityVerification: () => void;
  resetVerification: () => void;
  updateVerificationStatus: (status: Partial<VerificationStatus>) => void;

  // Verification methods
  getApiData: () => Record<string, any>;
  resetAll: () => void;
}

const VerificationContext = createContext<VerificationContextType | undefined>(
  undefined
);

export const VerificationProvider = ({ children }: { children: ReactNode }) => {
  const getDefaultState = (): VerificationState => ({
    // Auth state
    authFlow: "register",
    authStep: "credentials",
    email: "",
    phone: "",
    password: "",
    name: "",
    authOtp: "",
    verificationMethod: null,
    verificationAttempts: 0,
    isAuthVerified: false,

    // Verification state
    verificationStep: "email",
    country: "",
    documentType: null,
    frontDocument: null,
    backDocument: null,
    verificationOtp: "",
    isIdentityVerified: false,
    verificationStatus: {
      email: false,
      phone: false,
      identity: false,
    },
  });

  // Load initial state from localStorage if available
  const loadInitialState = (): VerificationState => {
    if (typeof window === "undefined") {
      return getDefaultState();
    }

    const savedAuth = localStorage.getItem("auth_state");
    const savedVerification = localStorage.getItem("verification_state");

    const defaultState = getDefaultState();

    return {
      ...defaultState,
      ...(savedAuth ? JSON.parse(savedAuth) : {}),
      ...(savedVerification ? JSON.parse(savedVerification) : {}),
    };
  };

  const [state, setState] = useState<VerificationState>(loadInitialState);

  // Persist state to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      const {
        authFlow,
        authStep,
        email,
        phone,
        password,
        name,
        authOtp,
        verificationMethod,
        verificationAttempts,
        isAuthVerified,
      } = state;

      const authState = {
        authFlow,
        authStep,
        email,
        phone,
        password,
        name,
        authOtp,
        verificationMethod,
        verificationAttempts,
        isAuthVerified,
      };

      localStorage.setItem("auth_state", JSON.stringify(authState));

      const {
        verificationStep,
        country,
        documentType,
        frontDocument,
        backDocument,
        verificationOtp,
        isIdentityVerified,
        verificationStatus,
      } = state;

      const VerificationState = {
        verificationStep,
        country,
        documentType,
        frontDocument,
        backDocument,
        verificationOtp,
        isIdentityVerified,
        verificationStatus,
      };

      localStorage.setItem(
        "verification_state",
        JSON.stringify(VerificationState)
      );
    }
  }, [state]);

  // Auth methods
  const setAuthFlow = (authFlow: AuthFlow) => {
    setState((prev: VerificationState) => ({ ...prev, authFlow }));
  };

  const setAuthStep = (authStep: AuthStep) => {
    setState((prev: VerificationState) => ({ ...prev, authStep }));
  };

  const setEmail = (email: string) => {
    setState((prev: VerificationState) => ({ ...prev, email }));
  };

  const setPhone = (phone: string) => {
    setState((prev: VerificationState) => ({ ...prev, phone }));
  };

  const setPassword = (password: string) => {
    setState((prev: VerificationState) => ({ ...prev, password }));
  };

  const setName = (name: string) => {
    setState((prev: VerificationState) => ({ ...prev, name }));
  };

  const setAuthOtp = (authOtp: string) => {
    setState((prev: VerificationState) => ({ ...prev, authOtp }));
  };

  const setVerificationMethod = (verificationMethod: VerificationMethod) => {
    setState((prev: VerificationState) => ({ ...prev, verificationMethod }));
  };

  const incrementAuthAttempts = () => {
    setState((prev: VerificationState) => ({
      ...prev,
      verificationAttempts: prev.verificationAttempts + 1,
    }));
  };

  const completeAuthVerification = () => {
    setState((prev: VerificationState) => ({ ...prev, isAuthVerified: true }));
  };

  const resetAuth = () => {
    setState((prev: VerificationState) => ({
      ...prev,
      authFlow: "register",
      authStep: "credentials",
      password: "",
      name: "",
      authOtp: "",
      verificationMethod: null,
      verificationAttempts: 0,
      isAuthVerified: false,
    }));
  };

  // Verification methods
  const setVerificationStep = (verificationStep: VerificationStep) => {
    setState((prev: VerificationState) => ({ ...prev, verificationStep }));
  };

  const setCountry = (country: string) => {
    setState((prev: VerificationState) => ({ ...prev, country }));
  };

  const setDocumentType = (documentType: DocumentType) => {
    setState((prev: VerificationState) => ({ ...prev, documentType }));
  };

  const setFrontDocument = (frontDocument: File) => {
    setState((prev: VerificationState) => ({ ...prev, frontDocument }));
  };

  const setBackDocument = (backDocument: File) => {
    setState((prev: VerificationState) => ({ ...prev, backDocument }));
  };

  const setVerificationOtp = (verificationOtp: string) => {
    setState((prev: VerificationState) => ({ ...prev, verificationOtp }));
  };

  const incrementVerificationAttempts = () => {
    setState((prev: VerificationState) => ({
      ...prev,
      verificationAttempts: prev.verificationAttempts + 1,
    }));
  };

  const completeIdentityVerification = () => {
    setState((prev: VerificationState) => ({
      ...prev,
      isIdentityVerified: true,
    }));
  };

  const updateVerificationStatus = (status: Partial<VerificationStatus>) => {
    setState((prev: VerificationState) => ({
      ...prev,
      verificationStatus: {
        ...prev.verificationStatus,
        ...status,
      },
    }));
  };

  const resetVerification = () => {
    setState((prev: VerificationState) => ({
      ...prev,
      verificationStep: "email",
      country: "",
      documentType: null,
      frontDocument: null,
      backDocument: null,
      verificationOtp: "",
      isIdentityVerified: false,
      verificationStatus: {
        email: false,
        phone: false,
        identity: false,
      },
    }));
  };

  // Verification methods
  const getApiData = () => {
    return {
      email: state.email,
      phone: state.phone,
      name: state.name,
      password: state.password,
      country: state.country,
      documentType: state.documentType,
      isEmailVerified: state.verificationStatus.email,
      isPhoneVerified: state.verificationStatus.phone,
      isIdentityVerified: state.verificationStatus.identity,
    };
  };

  const resetAll = () => {
    setState(getDefaultState());
  };

  return (
    <VerificationContext.Provider
      value={{
        // State
        ...state,

        // Auth methods
        setAuthFlow,
        setAuthStep,
        setEmail,
        setPhone,
        setPassword,
        setName,
        setAuthOtp,
        setVerificationMethod,
        incrementAuthAttempts,
        completeAuthVerification,
        resetAuth,

        // Verification methods
        setVerificationStep,
        setCountry,
        setDocumentType,
        setFrontDocument,
        setBackDocument,
        setVerificationOtp,
        incrementVerificationAttempts,
        completeIdentityVerification,
        resetVerification,
        updateVerificationStatus,

        // Verification methods
        getApiData,
        resetAll,
      }}
    >
      {children}
    </VerificationContext.Provider>
  );
};

export const useVerification = () => {
  const context = useContext(VerificationContext);
  if (!context) {
    throw new Error(
      "useVerification must be used within a VerificationProvider"
    );
  }
  return context;
};
