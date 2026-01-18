'use client';
import { useState, useEffect } from 'react';
import { usePublicClient } from 'wagmi';
import { CONTRACTS, PM_EXCHANGE_ABI } from '@/lib/contracts';

export interface OrderBookEntry {
  price: number; // Price in cents (0-99)
  shares: number; // Size in USDC (human readable)
  total: number; // Running total
  percentage: number; // For bar chart (0-100)
}

export interface OrderBookData {
  yesBids: OrderBookEntry[];
  yesAsks: OrderBookEntry[];
  noBids: OrderBookEntry[];
  noAsks: OrderBookEntry[];
  yesPrice: number;
  noPrice: number;
}

/**
 * Fetch orderbook depth from PMExchange contract
 */
export function useOrderBookDepth(conditionId: string | undefined, depth: number = 10) {
  const publicClient = usePublicClient();
  const [data, setData] = useState<OrderBookData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!conditionId || !publicClient) {
      setData(null);
      return;
    }

    const fetchOrderBook = async () => {
      setLoading(true);
      setError(null);

      try {
        // Fetch YES book depth
        const yesDepth = await publicClient.readContract({
          address: CONTRACTS.PM_EXCHANGE as `0x${string}`,
          abi: PM_EXCHANGE_ABI,
          functionName: 'getOrderBookDepth',
          args: [conditionId as `0x${string}`, depth]
        });

        // Fetch NO book depth
        const noDepth = await publicClient.readContract({
          address: CONTRACTS.PM_EXCHANGE as `0x${string}`,
          abi: PM_EXCHANGE_ABI,
          functionName: 'getNoBookDepth',
          args: [conditionId as `0x${string}`, depth]
        });

        // Fetch current prices
        const prices = await publicClient.readContract({
          address: CONTRACTS.PM_EXCHANGE as `0x${string}`,
          abi: PM_EXCHANGE_ABI,
          functionName: 'getMarketPrices',
          args: [conditionId as `0x${string}`]
        });

        // Parse YES book
        const [yesBidTicks, yesBidSizes, yesAskTicks, yesAskSizes] = yesDepth as [number[], bigint[], number[], bigint[]];
        const [noBidTicks, noBidSizes, noAskTicks, noAskSizes] = noDepth as [number[], bigint[], number[], bigint[]];
        const [yesPrice, noPrice] = prices as [bigint, bigint, bigint];

        // Convert to human-readable format (USDC has 6 decimals)
        const toUsdc = (amount: bigint) => Number(amount) / 1e6;
        
        // Calculate max size for percentage bars
        const allSizes = [
          ...yesBidSizes.map(toUsdc),
          ...yesAskSizes.map(toUsdc),
          ...noBidSizes.map(toUsdc),
          ...noAskSizes.map(toUsdc)
        ];
        const maxSize = Math.max(...allSizes, 1);

        // Helper to create entries
        const createEntries = (ticks: number[], sizes: bigint[]): OrderBookEntry[] => {
          let runningTotal = 0;
          return ticks.map((tick, i) => {
            const shares = toUsdc(sizes[i]);
            runningTotal += shares;
            return {
              price: tick,
              shares,
              total: runningTotal,
              percentage: (shares / maxSize) * 100
            };
          });
        };

        setData({
          yesBids: createEntries(yesBidTicks, yesBidSizes),
          yesAsks: createEntries(yesAskTicks, yesAskSizes),
          noBids: createEntries(noBidTicks, noBidSizes),
          noAsks: createEntries(noAskTicks, noAskSizes),
          yesPrice: Number(yesPrice) / 100, // Convert from bps to cents
          noPrice: Number(noPrice) / 100
        });
      } catch (err) {
        console.error('[OrderBook] Fetch error:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch orderbook');
      } finally {
        setLoading(false);
      }
    };

    fetchOrderBook();
    
    // Refresh every 10 seconds
    const interval = setInterval(fetchOrderBook, 10000);
    return () => clearInterval(interval);
  }, [conditionId, depth, publicClient]);

  return { data, loading, error };
}
