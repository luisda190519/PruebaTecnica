import { describe, it, expect, beforeEach } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '@/tests/utils';
import { PhoneInput } from '@/components/auth';
import { useAuthStore } from '@/store/auth/auth-store';

// Test utility to reset store between tests
const resetStore = () => {
  useAuthStore.getState().reset();
};

describe('PhoneInput', () => {
  beforeEach(() => {
    resetStore();
  });

  it('validates and formats phone number correctly', async () => {
    renderWithProviders(<PhoneInput />);
    
    const input = screen.getByPlaceholderText('+57 XXX XXX XXXX');
    const user = userEvent.setup();
    
    // Test input formatting
    await user.type(input, '3211234567');
    expect(input).toHaveValue('+57 321 123 4567');
    
    // Test validation
    const continueButton = screen.getByText('Continuar');
    await user.click(continueButton);
    
    // Verify store was updated
    expect(useAuthStore.getState().phone.value).toBe('+573211234567');
    expect(useAuthStore.getState().step).toBe('verification');
  });

  it('shows error for invalid phone number', async () => {
    renderWithProviders(<PhoneInput />);
    
    const input = screen.getByPlaceholderText('+57 XXX XXX XXXX');
    const user = userEvent.setup();
    
    // Test invalid number
    await user.type(input, '1234567890');
    
    const continueButton = screen.getByText('Continuar');
    await user.click(continueButton);
    
    // Verify error message
    expect(screen.getByText('El número debe comenzar con +57')).toBeInTheDocument();
  });
});