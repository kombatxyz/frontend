'use client';
import { useAccount, useReadContract } from 'wagmi';
import { CONTRACTS } from '@/lib/contracts';

const CONDITIONAL_TOKENS_ABI = [
  {
    name: 'balanceOf',
    type: 'function',
    inputs: [
      { name: 'owner', type: 'address' },
      { name: 'positionId', type: 'uint256' }
    ],
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view'
  }
] as const;

/**
 * Hook to fetch user's share balances for a market
 */
export function useShareBalance(yesTokenId?: string, noTokenId?: string) {
  const { address } = useAccount();

  const { data: yesBalance, refetch: refetchYes } = useReadContract({
    address: CONTRACTS.CONDITIONAL_TOKENS as `0x${string}`,
    abi: CONDITIONAL_TOKENS_ABI,
    functionName: 'balanceOf',
    args: address && yesTokenId ? [address, BigInt(yesTokenId)] : undefined,
    query: {
      enabled: !!address && !!yesTokenId,
    }
  });

  const { data: noBalance, refetch: refetchNo } = useReadContract({
    address: CONTRACTS.CONDITIONAL_TOKENS as `0x${string}`,
    abi: CONDITIONAL_TOKENS_ABI,
    functionName: 'balanceOf',
    args: address && noTokenId ? [address, BigInt(noTokenId)] : undefined,
    query: {
      enabled: !!address && !!noTokenId,
    }
  });

  const refetch = () => {
    refetchYes();
    refetchNo();
  };

  return {
    yesBalance: yesBalance ? Number(yesBalance) / 1e6 : 0, // Convert from 6 decimals
    noBalance: noBalance ? Number(noBalance) / 1e6 : 0,
    refetch
  };
}
