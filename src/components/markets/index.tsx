'use client';
import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import Navbar from '../navbar';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import MarketCard, { MarketTag } from '../cards/market-card';
import LazyMarketCard from '../cards/market-card/LazyMarketCard';
import MarketCardSkeleton from '../cards/market-card/MarketCardSkeleton';
import {
  SearchIcon,
  FilterIcon,
  BookmarkIcon,
  BookmarkedIcon,
} from '@/assets/svg';
import { RootState } from '@/redux/store';
import { Market } from '@/redux/slice/bookmarkSlice';
import { useMarkets } from '@/hooks/useMarkets';

const Markets: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const tabs = [
    'All Markets',
    'Live',
    'Crypto',
    'Sports',
    'Politics',
    'Companies',
    'Entertainment',
    'Finance',
    'Climate',
  ];

  const activeTab = useMemo(() => {
    const category = searchParams.get('category');
    if (category) {
      const formattedCategory =
        category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();
      if (tabs.includes(formattedCategory)) {
        return formattedCategory;
      }
    }

    const pathCategory = pathname.split('/').pop();
    if (pathCategory && pathCategory !== '' && pathCategory !== 'markets') {
      const formattedCategory =
        pathCategory.charAt(0).toUpperCase() +
        pathCategory.slice(1).toLowerCase();
      if (tabs.includes(formattedCategory)) {
        return formattedCategory;
      }
    }

    return 'All Markets';
  }, [pathname, searchParams]);

  const handleTabClick = (tab: string) => {
    if (tab === 'All Markets') {
      router.push('/');
    } else {
      router.push(`/markets/${tab.toLowerCase()}`);
    }
  };

  const { data: markets = [], isLoading, error } = useMarkets();

  const bookmarkedMarkets = useSelector(
    (state: RootState) => state.bookmarks.bookmarkedMarkets,
  );

  const [showBookmarked, setShowBookmarked] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const categoryFiltered =
    activeTab === 'All Markets'
      ? markets
      : markets.filter(
          (market) => market.tags.includes(activeTab.toLowerCase() as any), // Adjusted primarily for lower case tags from API
        );

  const bookmarkedFiltered = bookmarkedMarkets.filter(
    (market) =>
      activeTab === 'All Markets' ||
      market.tags.includes(activeTab as MarketTag),
  );

  const baseMarkets = showBookmarked ? bookmarkedFiltered : categoryFiltered;

  const displayedMarkets = baseMarkets.filter((market: Market) =>
    market.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const hasSidebar = activeTab === 'Crypto' || activeTab === 'Sports';

  let sidebarContent = null;
  if (activeTab === 'Crypto') {
    sidebarContent = (
      <div className="markets-category-sidebar">
        <ul className="sub-categories">
          <li className="active">
            All <div>33</div>
          </li>
          <li>
            15 Mins <div>03</div>
          </li>
          <li>
            Hourly <div>03</div>
          </li>
          <li>
            4 Hours <div>03</div>
          </li>
          <li>
            Daily <div>03</div>
          </li>
        </ul>

        <ul className="sub-categories coins">
          <li>
            Bitcoin <div>03</div>
          </li>
          <li>
            Ethereum <div>03</div>
          </li>
          <li>
            Solana <div>03</div>
          </li>
          <li>
            BNB <div>03</div>
          </li>
          <li>
            ZCash <div>03</div>
          </li>
        </ul>
      </div>
    );
  } else if (activeTab === 'Sports') {
    sidebarContent = (
      <div className="markets-category-sidebar">
        <ul className="sub-categories">
          <li className="active">
            All <div>33</div>
          </li>
          <li>
            Live <div>33</div>
          </li>
          <li>
            Premier League <div>03</div>
          </li>
          <li>
            NBA <div>03</div>
          </li>
          <li>
            NFL <div>03</div>
          </li>
          <li>
            MLB <div>03</div>
          </li>
          <li>
            UCL <div>03</div>
          </li>
        </ul>
      </div>
    );
  }

  const renderEmptyState = () => {
    if (showBookmarked && baseMarkets.length === 0) {
      return (
        <div className="empty-state">
          You haven't bookmarked any markets yet.
        </div>
      );
    } else if (searchQuery && displayedMarkets.length === 0) {
      return (
        <div className="empty-state">No results found for "{searchQuery}".</div>
      );
    } else if (error) {
      return (
        <div className="empty-state">
          Error loading markets. Please try again.
        </div>
      );
    } else {
      return <div className="empty-state">No markets available.</div>;
    }
  };

  return (
    <>
      <Navbar />
      <div className="markets-container">
        <div className="markets-header">
          <div className="market-tabs">
            {tabs.map((tab) => (
              <button
                key={tab}
                className={`market-tab ${activeTab === tab ? 'active' : ''}`}
                onClick={() => handleTabClick(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="divider"></div>

          <div className="search-bar">
            <div className="search">
              <div className="search-icon">
                <SearchIcon />
              </div>
              <input
                type="text"
                className="search-input"
                placeholder="Search markets..."
                value={searchQuery || ''}
                onChange={(e) => setSearchQuery(e.target.value || '')}
              />
            </div>
            <div className="btn filter">
              <FilterIcon />
            </div>
            <button
              className={`btn bookmark ${showBookmarked ? 'active' : ''}`}
              onClick={() => setShowBookmarked(!showBookmarked)}
            >
              {showBookmarked ? <BookmarkedIcon /> : <BookmarkIcon />}
            </button>
          </div>
        </div>

        <div className="markets-body flex">
          {sidebarContent}
          <div
            className={`market-cards-grid ${hasSidebar ? 'flex-1' : 'w-full'}`}
          >
            {isLoading ? (
              // Show 6 skeleton cards during loading
              <>
                {Array.from({ length: 6 }).map((_, index) => (
                  <MarketCardSkeleton key={`skeleton-${index}`} />
                ))}
              </>
            ) : displayedMarkets.length > 0 ? (
              displayedMarkets.map((market: Market, index: number) => (
                <LazyMarketCard key={index} {...market} />
              ))
            ) : (
              renderEmptyState()
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Markets;
