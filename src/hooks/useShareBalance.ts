'use client';
import { useAccount, useReadContract } from 'wagmi';
import { CONTRACTS } from '@/lib/contracts';
import { keccak256, encodePacked } from 'viem';

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
 * Compute positionId from conditionId and indexSet
 * Formula: positionId = keccak256(abi.encodePacked(collateralToken, keccak256(abi.encodePacked(parentCollectionId, conditionId, indexSet))))
 * For top-level positions, parentCollectionId = bytes32(0)
 */
function computePositionId(conditionId: string, indexSet: number): bigint {
  const parentCollectionId = '0x0000000000000000000000000000000000000000000000000000000000000000' as `0x${string}`;
  
  // Compute collectionId = keccak256(abi.encodePacked(parentCollectionId, conditionId, indexSet))
  const collectionId = keccak256(
    encodePacked(
      ['bytes32', 'bytes32', 'uint256'],
      [parentCollectionId, conditionId as `0x${string}`, BigInt(indexSet)]
    )
  );
  
  // Compute positionId = keccak256(abi.encodePacked(collateralToken, collectionId))
  const positionId = keccak256(
    encodePacked(
      ['address', 'bytes32'],
      [CONTRACTS.USDC as `0x${string}`, collectionId]
    )
  );
  
  return BigInt(positionId);
}

/**
 * Hook to fetch user's share balances for a market
 */
export function useShareBalance(yesTokenId?: string, noTokenId?: string, conditionId?: string) {
  const { address } = useAccount();

  // Compute position IDs if not provided but conditionId is available
  let yesPositionId: bigint | undefined;
  let noPositionId: bigint | undefined;

  if (yesTokenId) {
    yesPositionId = BigInt(yesTokenId);
  } else if (conditionId) {
    yesPositionId = computePositionId(conditionId, 1); // indexSet 1 = YES (binary: 0b01)
  }

  if (noTokenId) {
    noPositionId = BigInt(noTokenId);
  } else if (conditionId) {
    noPositionId = computePositionId(conditionId, 2); // indexSet 2 = NO (binary: 0b10)
  }

  const { data: yesBalance, refetch: refetchYes } = useReadContract({
    address: CONTRACTS.CONDITIONAL_TOKENS as `0x${string}`,
    abi: CONDITIONAL_TOKENS_ABI,
    functionName: 'balanceOf',
    args: address && yesPositionId ? [address, yesPositionId] : undefined,
    query: {
      enabled: !!address && !!yesPositionId,
    }
  });

  const { data: noBalance, refetch: refetchNo } = useReadContract({
    address: CONTRACTS.CONDITIONAL_TOKENS as `0x${string}`,
    abi: CONDITIONAL_TOKENS_ABI,
    functionName: 'balanceOf',
    args: address && noPositionId ? [address, noPositionId] : undefined,
    query: {
      enabled: !!address && !!noPositionId,
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
