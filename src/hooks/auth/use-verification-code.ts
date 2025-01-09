import { useCallback, useEffect, useRef } from 'react';
import { useAuthStore } from '@/store/auth/auth-store';

export function useVerificationCode() {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const { verification, setVerificationCode } = useAuthStore();

  const handleKeyDown = useCallback((index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !verification.code[index]) {
      const prevInput = inputRefs.current[index - 1];
      if (prevInput) {
        prevInput.focus();
        setVerificationCode(index - 1, '');
      }
      return;
    }
  }, [verification.code, setVerificationCode]);

  const handleInput = useCallback((index: number, value: string) => {
    const sanitizedValue = value.replace(/\D/g, '').slice(0, 1);
    setVerificationCode(index, sanitizedValue);

    if (sanitizedValue && index < 3) {
      const nextInput = inputRefs.current[index + 1];
      if (nextInput) {
        nextInput.focus();
      }
    }
  }, [setVerificationCode]);

  return {
    inputRefs,
    handleKeyDown,
    handleInput,
    code: verification.code,
  };
}