# Market Cards Lazy Loading Implementation

## Overview

Implemented lazy loading for market cards to improve performance by only rendering cards when they come into the viewport.

## Implementation Details

### Components Created/Modified

1. **MarketCardSkeleton Component** (`/src/components/cards/market-card/MarketCardSkeleton.tsx`)

   - Reusable skeleton loader component that mimics the structure of MarketCard
   - Animated shimmer effect for visual feedback
   - Used in both lazy loading and initial data fetching states

2. **LazyMarketCard Component** (`/src/components/cards/market-card/LazyMarketCard.tsx`)

   - Wraps the MarketCard component with Intersection Observer API
   - Only renders the actual MarketCard when it enters the viewport
   - Displays MarketCardSkeleton while the card is not yet visible
   - Configuration options:
     - `threshold`: Visibility threshold (default: 0.1)
     - `rootMargin`: Margin around viewport to trigger loading (default: '50px')

3. **Markets Component** (`/src/components/markets/index.tsx`)
   - Updated to use `LazyMarketCard` instead of `MarketCard`
   - Shows 6 skeleton cards during initial data fetching (replaces "Loading markets..." text)
   - All market cards in the grid are now lazy-loaded

## Benefits

- **⚡ Improved Initial Load Performance**: Only renders cards that are visible or near the viewport
- **🎨 Professional Loading Experience**: Skeleton cards show during initial data fetch instead of plain text
- **🧠 Reduced Memory Usage**: Fewer DOM nodes on initial render
- **✨ Better User Experience**: Smooth skeleton loading animation provides visual continuity
- **📈 Optimized for Large Lists**: Particularly beneficial when displaying many market cards
- **🔄 Dual Loading States**: Skeleton loaders used for both API fetching and lazy loading

## How It Works

1. When a card is added to the DOM, it initially renders a skeleton placeholder
2. An Intersection Observer watches when the card enters the viewport (or gets within 50px of it)
3. Once visible, the actual MarketCard component is rendered
4. The observer is disconnected to free up resources
5. The card remains rendered even if it scrolls out of view (no unmounting)

## Configuration

You can adjust the lazy loading behavior by modifying the default props in `LazyMarketCard.tsx`:

- `threshold`: Controls how much of the element needs to be visible (0.0 to 1.0)
- `rootMargin`: Pre-loads cards before they enter the viewport (e.g., '100px' loads cards 100px before they're visible)
