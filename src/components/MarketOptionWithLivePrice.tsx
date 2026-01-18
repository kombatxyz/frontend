'use client';
import { useMarketPrices } from '@/hooks/useMarketPrices';
import { MarketOption as BaseMarketOption } from '@/redux/slice/bookmarkSlice';

interface MarketOptionWithLivePriceProps {
  option: BaseMarketOption;
  children: (percentage: number, loading: boolean) => React.ReactNode;
}

/**
 * Wrapper component that fetches live probability for an option
 */
export function MarketOptionWithLivePrice({ option, children }: MarketOptionWithLivePriceProps) {
  const { probability, loading } = useMarketPrices(option.conditionId);
  
  // Use live probability if available, otherwise fall back to stored percentage
  const displayPercentage = probability !== null ? Math.round(probability) : option.percentage;
  
  return <>{children(displayPercentage, loading)}</>;
}
