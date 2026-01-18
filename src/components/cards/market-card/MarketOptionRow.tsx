'use client';
import { useMarketPrices } from '@/hooks/useMarketPrices';

interface MarketOptionRowProps {
  option: {
    name: string;
    percentage: number;
    conditionId?: string;
  };
  onClick: (e: React.MouseEvent, name: string, side: 'yes' | 'no') => void;
}

export function MarketOptionRow({ option, onClick }: MarketOptionRowProps) {
  // Fetch real-time probability from contract
  const { probability, loading } = useMarketPrices(option.conditionId);
  
  // Use contract probability if available, otherwise use stored value
  const displayPercentage = probability !== null ? Math.round(probability) : option.percentage;

  return (
    <div
      className="market-option"
      onClick={(e) => onClick(e, option.name, 'yes')}
    >
      <div
        className="option-background"
        style={{ width: `${displayPercentage}%` }}
      />
      <span className="option-name">{option.name}</span>
      <div className="option-right">
        <span className="option-percentage">
          {loading ? '...' : `${displayPercentage}%`}
        </span>
        <div className="hover-badges">
          <span
            className="badge badge-yes"
            onClick={(e) => onClick(e, option.name, 'yes')}
          >
            YES
          </span>
          <span
            className="badge badge-no"
            onClick={(e) => onClick(e, option.name, 'no')}
          >
            NO
          </span>
        </div>
      </div>
    </div>
  );
}
