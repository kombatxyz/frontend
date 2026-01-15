'use client';
import React, { useEffect, useRef, useState } from 'react';
import MarketCard, { MarketCardProps } from './index';
import MarketCardSkeleton from './MarketCardSkeleton';

interface LazyMarketCardProps extends MarketCardProps {
  threshold?: number;
  rootMargin?: string;
}

const LazyMarketCard: React.FC<LazyMarketCardProps> = ({
  threshold = 0.1,
  rootMargin = '50px',
  ...marketCardProps
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasLoaded) {
            setIsVisible(true);
            setHasLoaded(true);
            // Once loaded, we can disconnect this specific observer
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold,
        rootMargin,
      },
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [threshold, rootMargin, hasLoaded]);

  return (
    <div ref={cardRef} className="lazy-market-card-wrapper">
      {isVisible ? <MarketCard {...marketCardProps} /> : <MarketCardSkeleton />}
    </div>
  );
};

export default LazyMarketCard;
