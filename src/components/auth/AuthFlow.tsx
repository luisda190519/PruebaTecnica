import { useEffect } from 'react';
import { useAuthStore } from '@/store/auth/auth-store';
import LoginLanding from './LoginLanding';
import PhoneInput from './PhoneInput';
import VerificationCode from './VerificationCode';
import LoadingScreen from './LoadingScreen';

export default function AuthFlow() {
  const { step, isLoading } = useAuthStore();
  
  // Reset auth state when component unmounts
  useEffect(() => {
    return () => {
      useAuthStore.getState().reset();
    };
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  switch (step) {
    case 'landing':
      return <LoginLanding />;
    case 'phone-input':
      return <PhoneInput />;
    case 'verification':
      return <VerificationCode />;
    default:
      return null;
  }
}
