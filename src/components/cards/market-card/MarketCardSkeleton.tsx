'use client';
import React from 'react';

const MarketCardSkeleton: React.FC = () => {
  return (
    <div className="market-card market-card-skeleton">
      <div className="market-card-header">
        <div className="title">
          <div className="skeleton-title"></div>
        </div>
        <div className="market-card-meta">
          <div className="skeleton-meta"></div>
        </div>
      </div>
      <div className="market-card-content">
        <div className="skeleton-content"></div>
        <div className="skeleton-content"></div>
      </div>
    </div>
  );
};

export default MarketCardSkeleton;
