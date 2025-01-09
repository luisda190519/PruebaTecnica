export type AuthStep = 'landing' | 'phone-input' | 'verification' | 'complete';

export interface PhoneState {
  value: string;
  isValid: boolean;
  error?: string;
}

export interface VerificationState {
  code: string[];
  timeRemaining: number;
  attempts: number;
  canResend: boolean;
}

export interface AuthState {
  step: AuthStep;
  phone: PhoneState;
  verification: VerificationState;
  isLoading: boolean;
  error?: string;
}