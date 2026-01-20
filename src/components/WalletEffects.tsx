'use client';
import { useEffect } from 'react';
import { useAccount, useSwitchChain } from 'wagmi';
import { useAutoMintUSDC } from '@/hooks/useAutoMintUSDC';
import { MintNotification } from './MintNotification';

const MANTLE_SEPOLIA_CHAIN_ID = 5003;

/**
 * Component that handles wallet connection side effects
 */
export function WalletEffects() {
  const { isConnected, chainId } = useAccount();
  const { switchChain } = useSwitchChain();
  
  // Force switch to Mantle Sepolia on wallet connection
  useEffect(() => {
    if (isConnected && chainId && chainId !== MANTLE_SEPOLIA_CHAIN_ID) {
      console.log('[WalletEffects] Wrong chain detected:', chainId, '- switching to Mantle Sepolia');
      switchChain({ chainId: MANTLE_SEPOLIA_CHAIN_ID });
    }
  }, [isConnected, chainId, switchChain]);

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
