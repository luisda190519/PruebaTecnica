import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { usePhoneValidation } from '@/hooks/auth/use-phone-validation';
import { vi } from 'vitest';

vi.mock('@/store/auth/auth-store', () => ({
  useAuthStore: () => ({
    setPhone: vi.fn()
  })
}));

describe('usePhoneValidation', () => {
  it('should initialize with empty values', () => {
    const { result } = renderHook(() => usePhoneValidation());
    expect(result.current.value).toBe('');
    expect(result.current.error).toBeNull();
  });

  it('should format phone number correctly', () => {
    const { result } = renderHook(() => usePhoneValidation());
    
    act(() => {
      result.current.setValue('573211234567');
    });

    expect(result.current.value).toBe('+57 321 123 4567');
  });

  it('should validate correct Colombian number', () => {
    const { result } = renderHook(() => usePhoneValidation());
    
    act(() => {
      result.current.setValue('573211234567');
    });

    expect(result.current.error).toBeNull();
    expect(result.current.isValid).toBe(true);
  });

  it('should show error for invalid number', () => {
    const { result } = renderHook(() => usePhoneValidation());
    
    act(() => {
      result.current.setValue('571234567890');
    });

    expect(result.current.error).toBe('Ingresa un número celular válido');
    expect(result.current.isValid).toBe(false);
  });
});