import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type MarketTag =
  | 'Live'
  | 'Crypto'
  | 'Sports'
  | 'Politics'
  | 'Companies'
  | 'Entertainment'
  | 'Finance'
  | 'Climate';

export interface MarketOption {
  name: string;
  percentage: number;
  shortName?: string;
  photo?: string;
  conditionId?: string; // For fetching orderbook depth
  yesTokenId?: string;
  noTokenId?: string;
}

export interface Market {
  id: number;
  createdAt: string;
  title: string;
  timeRemaining: string;
  volume: string;
  type:
    | 'multiple-choice'
    | 'binary'
    | 'binary-buttons'
    | 'match-outcome-buttons';
  tags: MarketTag[];
  mainOption?: string;
  options?: MarketOption[];
  percentage?: number;
  leftLogo?: string;
  rightLogo?: string;
}

interface BookmarkState {
  bookmarkedMarkets: Market[];
}

const initialState: BookmarkState = {
  bookmarkedMarkets: [],
};

export const bookmarkSlice = createSlice({
  name: 'bookmarks',
  initialState,
  reducers: {
    toggleBookmark: (state, action: PayloadAction<Market>) => {
      const index = state.bookmarkedMarkets.findIndex(
        (m) => m.title === action.payload.title,
      );
      if (index >= 0) {
        state.bookmarkedMarkets.splice(index, 1);
      } else {
        state.bookmarkedMarkets.push(action.payload);
      }
    },
  },
});

export const { toggleBookmark } = bookmarkSlice.actions;

export default bookmarkSlice.reducer;
