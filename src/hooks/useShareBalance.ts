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
 * Formula (from CTHelpers.sol):
 *   collectionId = keccak256(abi.encodePacked(conditionId, indexSet)) // when parentCollectionId = 0
 *   positionId = uint256(keccak256(abi.encodePacked(collateralToken, collectionId)))
 */
function computePositionId(conditionId: string, indexSet: number): bigint {
  // collectionId = keccak256(conditionId, indexSet)
  const collectionId = keccak256(
    encodePacked(
      ['bytes32', 'uint256'],
      [conditionId as `0x${string}`, BigInt(indexSet)]
    )
  );
  
  // positionId = keccak256(collateralToken, collectionId)
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
