import { create } from 'zustand';
import { AuthState, AuthStep } from '@/types/auth';

interface AuthStore extends AuthState {
  setStep: (step: AuthStep) => void;
  setPhone: (value: string) => void;
  setVerificationCode: (index: number, value: string) => void;
  startVerificationTimer: () => void;
  resetVerificationTimer: () => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error?: string) => void;
  reset: () => void;
}

const INITIAL_STATE: AuthState = {
  step: 'landing',
  phone: {
    value: '',
    isValid: false,
  },
  verification: {
    code: Array(4).fill(''),
    timeRemaining: 120,
    attempts: 0,
    canResend: false,
  },
  isLoading: false,
};

export const useAuthStore = create<AuthStore>((set, get) => ({
  ...INITIAL_STATE,

  setStep: (step) => set({ step }),
  
  setPhone: (value) => set((state) => ({
    phone: {
      value,
      isValid: /^\+57\s?3\d{2}\s?\d{3}\s?\d{4}$/.test(value.trim()),
      error: undefined,
    }
  })),

  setVerificationCode: (index, value) => set((state) => ({
    verification: {
      ...state.verification,
      code: state.verification.code.map((c, i) => i === index ? value : c)
    }
  })),

  startVerificationTimer: () => {
    const timer = setInterval(() => {
      const { timeRemaining } = get().verification;
      if (timeRemaining <= 0) {
        clearInterval(timer);
        set((state) => ({
          verification: {
            ...state.verification,
            canResend: true
          }
        }));
        return;
      }

      set((state) => ({
        verification: {
          ...state.verification,
          timeRemaining: state.verification.timeRemaining - 1
        }
      }));
    }, 1000);

    return () => clearInterval(timer);
  },

  resetVerificationTimer: () => set((state) => ({
    verification: {
      ...state.verification,
      timeRemaining: 120,
      canResend: false
    }
  })),

  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  reset: () => set(INITIAL_STATE)
}));