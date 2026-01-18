'use client';
import { useAutoMintUSDC } from '@/hooks/useAutoMintUSDC';
import { MintNotification } from './MintNotification';

/**
 * Component that handles wallet connection side effects
 */
export function WalletEffects() {
  // Auto-mint USDC to new users
  const { showNotification, notificationStatus, currentStep, closeNotification } = useAutoMintUSDC();

  return (
    <MintNotification
      show={showNotification}
      status={notificationStatus}
      currentStep={currentStep}
      onClose={closeNotification}
    />
  );
}
