'use client';
import { useEffect, useState } from 'react';
import { useAccount, useWriteContract, useWaitForTransactionReceipt, useSwitchChain } from 'wagmi';
import { CONTRACTS } from '@/lib/contracts';

const MANTLE_SEPOLIA_CHAIN_ID = 5003;

const USDC_ABI = [
  {
    name: 'mint',
    type: 'function',
    inputs: [
      { name: 'to', type: 'address' },
      { name: 'amount', type: 'uint256' }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    name: 'approve',
    type: 'function',
    inputs: [
      { name: 'spender', type: 'address' },
      { name: 'amount', type: 'uint256' }
    ],
    outputs: [{ name: '', type: 'bool' }],
    stateMutability: 'nonpayable'
  }
] as const;

const MINT_AMOUNT = BigInt(10000) * BigInt(10) ** BigInt(6); // 10,000 USDC (6 decimals)
const MAX_APPROVAL = BigInt(2) ** BigInt(256) - BigInt(1); // Max uint256 for unlimited approval

/**
 * Hook that auto-mints test USDC and approves Router to spend it
 */
export function useAutoMintUSDC() {
  const { address, isConnected, chainId } = useAccount();
  const { switchChain } = useSwitchChain();
  const { writeContract, data: hash, isPending, isError, reset } = useWriteContract();
  const { isSuccess } = useWaitForTransactionReceipt({ hash });
  const [showNotification, setShowNotification] = useState(false);
  const [notificationStatus, setNotificationStatus] = useState<'minting' | 'success' | 'error'>('minting');
  const [currentStep, setCurrentStep] = useState<'mint' | 'approve' | 'done'>('mint');

  useEffect(() => {
    if (!isConnected || !address) return;

    // Check if we've already set up for this address
    const storageKey = `usdc-setup-${address}`;
    const alreadySetup = localStorage.getItem(storageKey);

    if (alreadySetup) {
      console.log('[AutoSetup] Already completed setup for', address);
      return;
    }

    // Check if on correct chain
    if (chainId !== MANTLE_SEPOLIA_CHAIN_ID) {
      console.log('[AutoSetup] Wrong chain, switching to Mantle Sepolia...');
      try {
        switchChain({ chainId: MANTLE_SEPOLIA_CHAIN_ID });
      } catch (error) {
        console.error('[AutoSetup] Failed to switch chain:', error);
      }
      return;
    }

    console.log('[AutoSetup] Starting USDC setup for', address, 'on chain', chainId);
    setShowNotification(true);
    setNotificationStatus('minting');
    setCurrentStep('mint');

    try {
      // Step 1: Mint USDC
      writeContract({
        address: CONTRACTS.USDC as `0x${string}`,
        abi: USDC_ABI,
        functionName: 'mint',
        args: [address, MINT_AMOUNT],
        chainId: MANTLE_SEPOLIA_CHAIN_ID, // Force chain ID
      });
    } catch (error) {
      console.error('[AutoSetup] Failed to mint USDC:', error);
      setNotificationStatus('error');
    }
  }, [address, isConnected, chainId, writeContract, switchChain]);

  useEffect(() => {
    if (isPending) {
      setNotificationStatus('minting');
    }
  }, [isPending]);

  useEffect(() => {
    if (isSuccess && address) {
      if (currentStep === 'mint') {
        console.log('[AutoSetup] Mint successful, now approving Router...');
        setCurrentStep('approve');
        
        // Step 2: Approve Router to spend USDC
        setTimeout(() => {
          reset(); // Reset the previous transaction state
          try {
            writeContract({
              address: CONTRACTS.USDC as `0x${string}`,
              abi: USDC_ABI,
              functionName: 'approve',
              args: [CONTRACTS.PM_ROUTER as `0x${string}`, MAX_APPROVAL],
              chainId: MANTLE_SEPOLIA_CHAIN_ID, // Force chain ID
            });
          } catch (error) {
            console.error('[AutoSetup] Failed to approve Router:', error);
            setNotificationStatus('error');
          }
        }, 500);
      } else if (currentStep === 'approve') {
        console.log('[AutoSetup] Setup complete!');
        const storageKey = `usdc-setup-${address}`;
        localStorage.setItem(storageKey, 'true');
        setNotificationStatus('success');
        setCurrentStep('done');
      }
    }
  }, [isSuccess, address, currentStep, writeContract, reset]);

  useEffect(() => {
    if (isError) {
      setNotificationStatus('error');
    }
  }, [isError]);

  return {
    showNotification,
    notificationStatus,
    currentStep,
    closeNotification: () => setShowNotification(false)
  };
}
