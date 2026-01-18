'use client';
import { useReadContract } from 'wagmi';
import { CONTRACTS } from '@/lib/contracts';

const ERC20_ABI = [
  {
    name: 'balanceOf',
    type: 'function',
    inputs: [{ name: 'account', type: 'address' }],
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    name: 'decimals',
    type: 'function',
    inputs: [],
    outputs: [{ name: '', type: 'uint8' }],
    stateMutability: 'view'
  }
] as const;

/**
 * Hook to fetch USDC balance for an address
 */
export function useUSDCBalance(address?: string) {
  const { data: balance, refetch } = useReadContract({
    address: CONTRACTS.USDC as `0x${string}`,
    abi: ERC20_ABI,
    functionName: 'balanceOf',
    args: address ? [address as `0x${string}`] : undefined,
    query: {
      enabled: !!address,
      refetchInterval: 10000, // Refetch every 10 seconds
    }
  });

  return {
    balance: balance ? Number(balance) / 1e6 : 0, // USDC has 6 decimals
    formatted: balance ? (Number(balance) / 1e6).toFixed(2) : '0.00',
    refetch
  };
}
