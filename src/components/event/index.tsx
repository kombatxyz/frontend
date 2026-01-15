import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import Navbar from '@/components/navbar';
import { getMarketSlug, Market } from '@/lib/markets';
import { useMarkets } from '@/hooks/useMarkets';
import MarketCard from '@/components/cards/market-card';
import TradeWidget from '../cards/trade-widget';
import { MarketOption } from '@/components/cards/market-card';
import OutcomeList from '../cards/outcome-list';
import OrderBook, { OrderBookOption } from '../cards/order-book';
import { BackIcon } from '@/assets/svg';

import GraphWidget from '../cards/graph-widget';
import VersusWidget from '../cards/versus-widget';

// Helper function to calculate volume for an option based on its percentage
const calculateOptionVolume = (
  totalVolume: string,
  percentage: number,
): string => {
  // Parse the volume string (e.g., "$322.1m" -> 322.1)
  const match = totalVolume.match(/\$?([\d.]+)([kmb])?/i);
  if (!match) return totalVolume;

  const value = parseFloat(match[1]);
  const suffix = match[2]?.toLowerCase() || '';

  // Calculate the option's share of volume
  const optionValue = value * (percentage / 100);

  // Format the result
  if (optionValue >= 1) {
    return `$${optionValue.toFixed(1)}${suffix}`;
  } else {
    // Convert to smaller unit if value is less than 1
    if (suffix === 'm') {
      return `$${(optionValue * 1000).toFixed(0)}k`;
    } else if (suffix === 'b') {
      return `$${(optionValue * 1000).toFixed(1)}m`;
    }
    return `$${optionValue.toFixed(2)}${suffix}`;
  }
};

const Event = () => {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();
  const searchParams = useSearchParams();

  const { data: markets = [], isLoading } = useMarkets();
  const market = markets.find((m: Market) => getMarketSlug(m) === slug);
  const [selectedOutcome, setSelectedOutcome] = useState<{
    name: string;
    photo: string;
    yesPrice: number;
    noPrice: number;
  } | null>(null);
  const [initialSide, setInitialSide] = useState<'yes' | 'no'>('yes');

  // Handle query params for initial selection
  useEffect(() => {
    if (!market || !searchParams) return;

    const outcomeParam = searchParams.get('outcome');
    const sideParam = searchParams.get('side') as 'yes' | 'no';

    if (sideParam && (sideParam === 'yes' || sideParam === 'no')) {
      setInitialSide(sideParam);
    }

    if (outcomeParam && market.options) {
      const option = market.options.find(
        (o: MarketOption) =>
          o.name === outcomeParam ||
          o.shortName === outcomeParam ||
          (outcomeParam === 'Draw' && o.name === 'Draw'), // Handle Draw case if needed, though Draw usually isn't in options directly
      );

      // Special handling for Draw if it's not in options but valid for the market type
      if (outcomeParam === 'Draw' && market.type === 'match-outcome-buttons') {
        const drawPercentage = Math.max(
          16,
          100 - market.options[0].percentage - market.options[1].percentage,
        );
        setSelectedOutcome({
          name: 'Draw',
          photo: '',
          yesPrice: drawPercentage,
          noPrice: 100 - drawPercentage,
        });
      } else if (option) {
        setSelectedOutcome({
          name: option.name,
          photo:
            option.photo ||
            (market.type === 'match-outcome-buttons' &&
            option.name === market.options[0].name
              ? market.leftLogo
              : market.type === 'match-outcome-buttons' &&
                option.name === market.options[1].name
              ? market.rightLogo
              : '') ||
            '',
          yesPrice: option.percentage,
          noPrice: 100 - option.percentage,
        });
      }
    }
  }, [market, searchParams]);

  // Default outcome based on market
  const defaultOutcome = useMemo(() => {
    if (!market) return null;

    if (
      market.type === 'multiple-choice' &&
      market.options &&
      market.options.length > 0
    ) {
      const firstOption = market.options[0];
      return {
        name: firstOption.name,
        photo: firstOption.photo || '',
        yesPrice: firstOption.percentage,
        noPrice: 100 - firstOption.percentage,
      };
    } else if (
      market.type === 'match-outcome-buttons' &&
      market.options &&
      market.options.length >= 2
    ) {
      // For sports events, default to home team
      const homeOption = market.options[0];
      return {
        name: homeOption.shortName || homeOption.name,
        photo: market.leftLogo || '',
        yesPrice: homeOption.percentage,
        noPrice: 100 - homeOption.percentage,
      };
    } else {
      const yesP = market.percentage || 50;
      return {
        name: market.title,
        photo: '',
        yesPrice: yesP,
        noPrice: 100 - yesP,
      };
    }
  }, [market]);

  // Convert market options to OrderBook format
  const orderBookOptions: OrderBookOption[] = useMemo(() => {
    if (!market?.options) return [];
    return market.options.map((opt: MarketOption) => ({
      name: opt.name,
      photo: opt.photo,
      yesPrice: opt.percentage,
      noPrice: 100 - opt.percentage,
    }));
  }, [market?.options]);

  const currentOutcome = selectedOutcome || defaultOutcome;

  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="event-container">
          <div className="loading-state">Loading event...</div>
        </div>
      </>
    );
  }

  if (!market) {
    return (
      <>
        <Navbar />
        <div className="event-container">
          <div className="empty-state">Event not found.</div>
        </div>
      </>
    );
  }

  const handleSelectOutcome = (option: MarketOption, side: 'yes' | 'no') => {
    setSelectedOutcome({
      name: option.name,
      photo: option.photo || '',
      yesPrice: option.percentage,
      noPrice: 100 - option.percentage,
    });
    setInitialSide(side);
  };

  const handleOrderBookOptionSelect = (option: OrderBookOption) => {
    setSelectedOutcome({
      name: option.name,
      photo: option.photo || '',
      yesPrice: option.yesPrice,
      noPrice: option.noPrice,
    });
  };

  const handleOpenTrade = () => {
    const yesP = market.percentage || market.options?.[0]?.percentage || 50;
    setSelectedOutcome({
      name: market.title,
      photo: '',
      yesPrice: yesP,
      noPrice: 100 - yesP,
    });
    setInitialSide('yes');
  };

  return (
    <div className="event-container">
      <Navbar />
      <div className="back-btn">
        <button onClick={() => router.back()}>
          <BackIcon />
          Back
        </button>
      </div>
      <div className="event-content">
        <div className="left-panel">
          {market.type === 'match-outcome-buttons' &&
          market.options &&
          market.options.length >= 2 ? (
            <VersusWidget
              leftOption={market.options[0]}
              rightOption={market.options[1]}
              leftLogo={market.leftLogo}
              rightLogo={market.rightLogo}
              timeRemaining={market.timeRemaining}
              volume={market.volume}
            />
          ) : (
            <GraphWidget
              marketType={market.type}
              options={market.options}
              percentage={market.percentage}
              title={market.title}
              volume={market.volume}
              timeLeft={market.timeRemaining}
              logo={market.image || market.leftLogo}
            />
          )}
          <div className="event-card">
            {market.type === 'multiple-choice' && market.options ? (
              <OutcomeList
                options={market.options}
                volume={market.volume}
                onSelect={handleSelectOutcome}
                activeOptionName={selectedOutcome?.name}
                activeSide={initialSide}
              />
            ) : market.type === 'match-outcome-buttons' &&
              market.options &&
              market.options.length >= 2 ? (
              <div className="sport-outcome-widget">
                <div className="header">
                  <span className="outcome-title">OUTCOME</span>
                  <span className="chance-title">CHANCE</span>
                </div>
                <div className="outcome-rows">
                  {/* Home Team */}
                  <div className="outcome-row">
                    <div className="option-info">
                      {market.leftLogo && (
                        <img
                          src={market.leftLogo}
                          alt={market.options[0].name}
                          className="photo"
                        />
                      )}
                      <div className="name-vol">
                        <span className="name">
                          {market.options[0].shortName ||
                            market.options[0].name}
                        </span>
                        <span className="vol">
                          <span>Vol:</span>
                          {calculateOptionVolume(
                            market.volume,
                            market.options[0].percentage,
                          )}
                        </span>
                      </div>
                    </div>
                    <div className="chance">
                      <span className="percentage">
                        {market.options[0].percentage}%
                      </span>
                      <span className="label">Chance</span>
                    </div>
                    <div className="buttons">
                      <button
                        className={`yes ${
                          selectedOutcome?.name ===
                            (market.options[0].shortName ||
                              market.options[0].name) && initialSide === 'yes'
                            ? 'active'
                            : ''
                        }`}
                        onClick={() => {
                          setSelectedOutcome({
                            name:
                              market.options![0].shortName ||
                              market.options![0].name,
                            photo: market.leftLogo || '',
                            yesPrice: market.options![0].percentage,
                            noPrice: 100 - market.options![0].percentage,
                          });
                          setInitialSide('yes');
                        }}
                      >
                        Yes {market.options[0].percentage.toFixed(1)}¢
                      </button>
                      <button
                        className={`no ${
                          selectedOutcome?.name ===
                            (market.options[0].shortName ||
                              market.options[0].name) && initialSide === 'no'
                            ? 'active'
                            : ''
                        }`}
                        onClick={() => {
                          setSelectedOutcome({
                            name:
                              market.options![0].shortName ||
                              market.options![0].name,
                            photo: market.leftLogo || '',
                            yesPrice: market.options![0].percentage,
                            noPrice: 100 - market.options![0].percentage,
                          });
                          setInitialSide('no');
                        }}
                      >
                        No {(100 - market.options[0].percentage).toFixed(1)}¢
                      </button>
                    </div>
                  </div>

                  {/* Draw */}
                  <div className="outcome-row">
                    <div className="option-info">
                      <div className="draw-icon">X</div>
                      <div className="name-vol">
                        <span className="name">Draw</span>
                        <span className="vol">
                          <span>Vol:</span>
                          {calculateOptionVolume(
                            market.volume,
                            Math.max(
                              16,
                              100 -
                                market.options[0].percentage -
                                market.options[1].percentage,
                            ),
                          )}
                        </span>
                      </div>
                    </div>
                    <div className="chance">
                      <span className="percentage">
                        {Math.max(
                          16,
                          100 -
                            market.options[0].percentage -
                            market.options[1].percentage,
                        )}
                        %
                      </span>
                      <span className="label">Chance</span>
                    </div>
                    <div className="buttons">
                      <button
                        className={`yes ${
                          selectedOutcome?.name === 'Draw' &&
                          initialSide === 'yes'
                            ? 'active'
                            : ''
                        }`}
                        onClick={() => {
                          const drawPercentage = Math.max(
                            16,
                            100 -
                              market.options![0].percentage -
                              market.options![1].percentage,
                          );
                          setSelectedOutcome({
                            name: 'Draw',
                            photo: '',
                            yesPrice: drawPercentage,
                            noPrice: 100 - drawPercentage,
                          });
                          setInitialSide('yes');
                        }}
                      >
                        Yes{' '}
                        {Math.max(
                          16,
                          100 -
                            market.options[0].percentage -
                            market.options[1].percentage,
                        ).toFixed(1)}
                        ¢
                      </button>
                      <button
                        className={`no ${
                          selectedOutcome?.name === 'Draw' &&
                          initialSide === 'no'
                            ? 'active'
                            : ''
                        }`}
                        onClick={() => {
                          const drawPercentage = Math.max(
                            16,
                            100 -
                              market.options![0].percentage -
                              market.options![1].percentage,
                          );
                          setSelectedOutcome({
                            name: 'Draw',
                            photo: '',
                            yesPrice: drawPercentage,
                            noPrice: 100 - drawPercentage,
                          });
                          setInitialSide('no');
                        }}
                      >
                        No{' '}
                        {(
                          100 -
                          Math.max(
                            16,
                            100 -
                              market.options[0].percentage -
                              market.options[1].percentage,
                          )
                        ).toFixed(1)}
                        ¢
                      </button>
                    </div>
                  </div>

                  {/* Away Team */}
                  <div className="outcome-row">
                    <div className="option-info">
                      {market.rightLogo && (
                        <img
                          src={market.rightLogo}
                          alt={market.options[1].name}
                          className="photo"
                        />
                      )}
                      <div className="name-vol">
                        <span className="name">
                          {market.options[1].shortName ||
                            market.options[1].name}
                        </span>
                        <span className="vol">
                          <span>Vol:</span>
                          {calculateOptionVolume(
                            market.volume,
                            market.options[1].percentage,
                          )}
                        </span>
                      </div>
                    </div>
                    <div className="chance">
                      <span className="percentage">
                        {market.options[1].percentage}%
                      </span>
                      <span className="label">Chance</span>
                    </div>
                    <div className="buttons">
                      <button
                        className={`yes ${
                          selectedOutcome?.name ===
                            (market.options[1].shortName ||
                              market.options[1].name) && initialSide === 'yes'
                            ? 'active'
                            : ''
                        }`}
                        onClick={() => {
                          setSelectedOutcome({
                            name:
                              market.options![1].shortName ||
                              market.options![1].name,
                            photo: market.rightLogo || '',
                            yesPrice: market.options![1].percentage,
                            noPrice: 100 - market.options![1].percentage,
                          });
                          setInitialSide('yes');
                        }}
                      >
                        Yes {market.options[1].percentage.toFixed(1)}¢
                      </button>
                      <button
                        className={`no ${
                          selectedOutcome?.name ===
                            (market.options[1].shortName ||
                              market.options[1].name) && initialSide === 'no'
                            ? 'active'
                            : ''
                        }`}
                        onClick={() => {
                          setSelectedOutcome({
                            name:
                              market.options![1].shortName ||
                              market.options![1].name,
                            photo: market.rightLogo || '',
                            yesPrice: market.options![1].percentage,
                            noPrice: 100 - market.options![1].percentage,
                          });
                          setInitialSide('no');
                        }}
                      >
                        No {(100 - market.options[1].percentage).toFixed(1)}¢
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </div>

          <OrderBook
            options={orderBookOptions}
            selectedOption={currentOutcome}
            onOptionSelect={handleOrderBookOptionSelect}
          />
        </div>

        <TradeWidget
          outcome={currentOutcome!}
          initialSide={initialSide}
          onSideChange={setInitialSide}
          marketType={market.type}
        />
      </div>
    </div>
  );
};

export default Event;
