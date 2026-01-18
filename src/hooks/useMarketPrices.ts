'use client';
import { useState, useEffect } from 'react';
import { usePublicClient } from 'wagmi';
import { CONTRACTS, PM_EXCHANGE_ABI } from '@/lib/contracts';

/**
 * Fetch market prices from PMExchange contract
 */
export function useMarketPrices(conditionId: string | undefined) {
  const publicClient = usePublicClient();
  const [probability, setProbability] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!conditionId || !publicClient) {
      setProbability(null);
      return;
    }

    const fetchPrices = async () => {
      setLoading(true);
      try {
        const result = await publicClient.readContract({
          address: CONTRACTS.PM_EXCHANGE as `0x${string}`,
          abi: PM_EXCHANGE_ABI,
          functionName: 'getMarketPrices',
          args: [conditionId as `0x${string}`]
        });

        const [yesPrice] = result as [bigint, bigint, bigint];
        // Convert from basis points (0-10000) to percentage (0-100)
        const yesProbability = Number(yesPrice) / 100;
        setProbability(yesProbability);
      } catch (err) {
        console.error('[MarketPrices] Fetch error:', err);
        setProbability(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPrices();
    
    // Refresh every 10 seconds
    const interval = setInterval(fetchPrices, 10000);
    return () => clearInterval(interval);
  }, [conditionId, publicClient]);

  return { probability, loading };
}
