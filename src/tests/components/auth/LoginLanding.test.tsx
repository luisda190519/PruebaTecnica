import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { LoginLanding } from '@/components/auth';
import { renderWithProviders } from '@/tests/utils/test-utils';

describe('LoginLanding', () => {
  it('renders', () => {
    renderWithProviders(<LoginLanding />);
    expect(screen.getByText('Bienvenido')).toBeInTheDocument();
  });
});