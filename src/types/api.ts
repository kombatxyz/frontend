export interface ApiMarketOption {
  index: number;
  name: string;
  shortName: string | null;
  imageUrl: string | null;
  probability: number;
  conditionId: string | null;
  exchangeAddress: string | null;
  yesTokenId: string | null;
  noTokenId: string | null;
  isWinner: boolean;
}

export interface ApiMarket {
  id: number;
  marketId: string;
  conditionId: string | null;
  questionId: string | null;
  title: string;
  description: string;
  type: 'multi' | 'binary' | 'binary-buttons' | 'match-outcome-buttons';
  category: string;
  imageUrl: string;
  endTime: string;
  endTimeISO: string;
  volume: string;
  liquidity: string;
  status: string;
  outcome: string | null;
  yesTokenId: string | null;
  noTokenId: string | null;
  creatorAddress: string | null;
  createdAt: string;
  tags: string[];
  options: ApiMarketOption[] | null;
}

export interface MarketsResponse {
  markets: ApiMarket[];
  count: number;
}
