import { useQuery } from '@tanstack/react-query';
import { ApiMarket, MarketsResponse } from '@/types/api';
import { marketData as mockData, Market } from '@/lib/markets';
import { MarketOption } from '@/components/cards/market-card';

const API_URL =
  'https://vigilant-walker-484020-m4.uc.r.appspot.com/api/markets';

async function fetchMarkets(): Promise<MarketsResponse> {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch markets');
  }
  return response.json();
}

// Helper to map API type to UI Market type
// Using 'any' deeply for now as the shapes might differ slightly and need careful mapping
// or we might need to update the UI components to accept ApiMarket
function mapApiToUiMarket(apiMarket: ApiMarket): Market {
  // Determine UI type based on API data and option count
  let uiType: Market['type'] = 'binary-buttons';
  const optionsCount = apiMarket.options?.length || 0;

  if (apiMarket.type === 'multi') {
    if (apiMarket.category === 'sports' && optionsCount === 2) {
      uiType = 'match-outcome-buttons';
    } else {
      uiType = 'multiple-choice';
    }
  } else if (apiMarket.type === 'binary') {
    uiType = 'binary-buttons';
  }

  // Handle options mapping
  let mappedOptions: MarketOption[] = [];
  if (apiMarket.options && apiMarket.options.length > 0) {
    mappedOptions = apiMarket.options.map((opt) => ({
      name: opt.name,
      shortName: opt.shortName || undefined,
      percentage: opt.probability ? Math.round(opt.probability * 100) : 0, // Use 0 if no probability yet
      photo: opt.imageUrl || undefined,
      conditionId: opt.conditionId || undefined, // Add conditionId for orderbook fetching
      yesTokenId: opt.yesTokenId || undefined,
      noTokenId: opt.noTokenId || undefined,
    }));
  } else if (apiMarket.type === 'binary') {
    // Default Yes/No for binary markets if no options provided - use market's conditionId
    mappedOptions = [
      { 
        name: 'Yes', 
        percentage: 50, 
        conditionId: apiMarket.conditionId || undefined,
        yesTokenId: apiMarket.yesTokenId || undefined,
        noTokenId: apiMarket.noTokenId || undefined,
      },
      { 
        name: 'No', 
        percentage: 50, 
        conditionId: apiMarket.conditionId || undefined,
        yesTokenId: apiMarket.yesTokenId || undefined,
        noTokenId: apiMarket.noTokenId || undefined,
      },
    ];
  }

  return {
    id: apiMarket.id,
    createdAt: new Date(Number(apiMarket.createdAt) * 1000)
      .toISOString()
      .split('T')[0],
    title: apiMarket.title,
    timeRemaining: calculateTimeRemaining(apiMarket.endTimeISO),
    volume: `$${apiMarket.volume || '0'}`,
    type: uiType,
    tags: apiMarket.tags as any[],
    image: apiMarket.imageUrl,
    options: mappedOptions,
    percentage: mappedOptions[0]?.percentage || 50,
    conditionId: apiMarket.conditionId || undefined, // Include conditionId for orderbook
    yesTokenId: apiMarket.yesTokenId || undefined,
    noTokenId: apiMarket.noTokenId || undefined,
  };
}

function calculateTimeRemaining(endTimeISO: string): string {
  const end = new Date(endTimeISO).getTime();
  const now = new Date().getTime();
  const diff = end - now;

  if (diff <= 0) return 'Ended';

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  return `${days}d:${hours}h:${minutes}m`;
}

export function useMarkets() {
  return useQuery({
    queryKey: ['markets'],
    queryFn: async () => {
      try {
        const data = await fetchMarkets();
        // Map the API data to the format our UI expects
        const markets = data.markets.map(mapApiToUiMarket);

        // Fetch real probabilities from contract for all markets
        // This will be done client-side using wagmi, but we need a publicClient
        // For now, return the mapped data and let individual components fetch probabilities
        // TODO: Enhance this with publicClient to fetch probabilities in batch
        
        return markets;
      } catch (error) {
        console.error('Error fetching markets:', error);
        // Fallback to mock data mixed with empty response handling or just return empty
        // For dev purposes, maybe we want to see real data.
        // Returning empty array will trigger empty state in UI
        throw error;
      }
    },
    // Start with some stale time to avoid refetching too often
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
