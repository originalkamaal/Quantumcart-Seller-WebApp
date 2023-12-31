export interface LoginResponse {
  success: boolean;
  message?: string;
}

export interface RegisterResponse {
  success: boolean;
  message?: string;
  user?: User;
  token?: string;
}

export interface ApiResponse<T> {
  status: number;
  headers: Record<string, string>;
  data: T;
}

export interface ApiError {
  status: number;
  headers: Record<string, string>;
  data: { message: string };
}

// Define the response type
export interface OnboardingProgressResponse {
  success: boolean;
  message?: string;
  progress?: SectionItem[];
}

export interface User {
  id: number; // Assuming the user has an ID
  sellerId: number;
  email: string;
  name: string;
  phone: string;
  phoneVerified: boolean;
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface InputProps {
  id?: string;
  type: string;
  name?: string;
  placeholder?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  ifError?: string | null;
  maxLength?: number;
}
interface KeyItem {
  key: string;
  status: "NotStarted" | "Pending" | "Passed" | "Failed";
  weightage: number;
}

export interface SectionItem {
  title: string;
  keys: KeyItem[];
}

interface GSTData {
  lgnm: string;
  pradr: {
    addr: {
      adr: string;
      pncd: string;
    };
  };
  sts: string;
}

export interface GSTApiResponse {
  flag: boolean;
  data: GSTData;
}

export interface GSTVerificationResult {
  businessName: string;
  businessAddress: string;
  businessPincode: string;
  gstStatus: string;
}

export interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}

export interface UserData {
  name: string;
  phone: string;
  email: string;
  receiveWhatsAppUpdates: boolean;
  password: string;
  confirmPassword: string;
}

export interface OtpData {
  emailOtp: string;
  phoneOtp: string;
}

export interface UserDataErrors {
  name?: string;
  phone?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export interface OtpErrors {
  emailOtp?: string;
  phoneOtp?: string;
}

export interface LoginResponse {
  success: boolean;
  message?: string;
}
