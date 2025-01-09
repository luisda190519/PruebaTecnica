import { useState, useCallback } from 'react';
import { useAuthStore } from '@/store/auth/auth-store';

// Improve the type safety
export type PhoneNumber = `+57${number}`;

export function usePhoneValidation() {
  const { setPhone } = useAuthStore();
  const [value, setValue] = useState('');
  const [error, setError] = useState<string | null>(null);

  const validate = useCallback((input: string): input is PhoneNumber => {
    const cleanNumber = input.replace(/\s+/g, '');
    
    if (!cleanNumber.startsWith('+57')) {
      setError('El número debe comenzar con +57');
      return false;
    }

    const numberWithoutCode = cleanNumber.slice(3);
    if (!/^3\d{9}$/.test(numberWithoutCode)) {
      setError('Ingresa un número celular válido');
      return false;
    }

    setError(null);
    // Update global state when validation passes
    setPhone(cleanNumber as PhoneNumber);
    return true;
  }, [setPhone]);

  const formatNumber = useCallback((input: string) => {
    const cleanNumber = input.replace(/\D/g, '');
    if (cleanNumber.length <= 0) return '';
    if (cleanNumber.length <= 2) return `+${cleanNumber}`;
    if (cleanNumber.length <= 5) return `+${cleanNumber.slice(0, 2)} ${cleanNumber.slice(2)}`;
    if (cleanNumber.length <= 8) return `+${cleanNumber.slice(0, 2)} ${cleanNumber.slice(2, 5)} ${cleanNumber.slice(5)}`;
    return `+${cleanNumber.slice(0, 2)} ${cleanNumber.slice(2, 5)} ${cleanNumber.slice(5, 8)} ${cleanNumber.slice(8, 10)}`;
  }, []);

  return {
    value,
    setValue: (input: string) => {
      const formatted = formatNumber(input);
      setValue(formatted);
      if (formatted.length >= 13) {
        validate(formatted);
      } else {
        setError(null);
      }
    },
    error,
    validate,
    isValid: !error && value.length >= 13
  };
}