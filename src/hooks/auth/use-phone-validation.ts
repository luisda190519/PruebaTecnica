import { useState, useCallback } from 'react';
import { useAuthStore } from '@/store/auth/auth-store';

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
    setPhone(cleanNumber as PhoneNumber);
    return true;
  }, [setPhone]);

  const formatNumber = useCallback((input: string) => {
    // Remove all non-digits first
    const cleanNumber = input.replace(/\D/g, '');
    
    // Early return for empty input
    if (cleanNumber.length === 0) return '';
    
    // Add the country code if not present
    const withCountryCode = cleanNumber.startsWith('57') ? cleanNumber : `57${cleanNumber}`;
    
    // Format the number in groups
    const groups = [
      '+57',
      withCountryCode.slice(2, 5),
      withCountryCode.slice(5, 8),
      withCountryCode.slice(8, 12)
    ];
    
    // Join only non-empty groups with spaces
    return groups.filter(Boolean).join(' ');
  }, []);

  const handleSetValue = useCallback((input: string) => {
    const formatted = formatNumber(input);
    setValue(formatted);
    
    // Only validate complete numbers
    if (formatted.replace(/\s+/g, '').length >= 12) {
      validate(formatted);
    } else {
      setError(null);
    }
  }, [formatNumber, validate]);

  return {
    value,
    setValue: handleSetValue,
    error,
    validate,
    isValid: !error && value.replace(/\s+/g, '').length >= 12
  };
}