'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { PlusIcon, ArrowRightIcon } from '@/assets/svg';

interface TradeWidgetProps {
  outcome: {
    name: string;
    photo: string;
    yesPrice: number;
    noPrice: number;
  };
  initialSide?: 'yes' | 'no';
  onSideChange?: (side: 'yes' | 'no') => void;
  onClose?: () => void;
  marketType?:
    | 'multiple-choice'
    | 'binary'
    | 'binary-buttons'
    | 'match-outcome-buttons';
}
const TradeWidget: React.FC<TradeWidgetProps> = ({
  outcome,
  initialSide,
  onSideChange,
  onClose,
  marketType,
}) => {
  const [activeTab, setActiveTab] = useState<'buy' | 'sell'>('buy');
  const [orderType, setOrderType] = useState<'limit' | 'market'>('limit');
  const [selectedOutcome, setSelectedOutcome] = useState<'yes' | 'no'>(
    initialSide || 'yes',
  );

  // Sync internal state when initialSide prop changes
  useEffect(() => {
    if (initialSide) {
      setSelectedOutcome(initialSide);
    }
  }, [initialSide]);
  const [limitPrice, setLimitPrice] = useState<number>(
    initialSide === 'no' ? outcome.noPrice : outcome.yesPrice,
  );
  const [amountShares, setAmountShares] = useState<number>(33);

  // Update limit price when outcome selection changes
  useEffect(() => {
    setLimitPrice(
      selectedOutcome === 'yes' ? outcome.yesPrice : outcome.noPrice,
    );
  }, [selectedOutcome, outcome.yesPrice, outcome.noPrice]);
  const [showExpiryOptions, setShowExpiryOptions] = useState<boolean>(false);

  const totalCost = (amountShares * (limitPrice / 100)).toFixed(2);
  const profit = (amountShares * (1 - limitPrice / 100)).toFixed(2);
  const multiplier = (100 / limitPrice).toFixed(1);

  const handleDecrementPrice = () =>
    setLimitPrice((prev) => Math.max(0.1, prev - 0.1));
  const handleIncrementPrice = () => setLimitPrice((prev) => prev + 0.1);
  const handleDecrementAmount = () =>
    setAmountShares((prev) => Math.max(0, prev - 1));
  const handleIncrementAmount = () => setAmountShares((prev) => prev + 1);

  const buttonText = `${
    activeTab.charAt(0).toUpperCase() + activeTab.slice(1)
  } ${selectedOutcome.charAt(0).toUpperCase() + selectedOutcome.slice(1)}`;

  return (
    <div className="trade-widget">
      {onClose && (
        <button className="close-btn" onClick={onClose}>
          ×
        </button>
      )}
      <div className="trade-header">
        <div className="buy-sell-tabs">
          <button
            className={`tab ${activeTab === 'buy' ? 'active' : ''}`}
            onClick={() => setActiveTab('buy')}
          >
            Buy
          </button>
          <button
            className={`tab ${activeTab === 'sell' ? 'active' : ''}`}
            onClick={() => setActiveTab('sell')}
          >
            Sell
          </button>
        </div>

        <div className={`order-types ${orderType}`}>
          <span className="slider" />

          <button
            className={`order-toggle ${orderType === 'limit' ? 'active' : ''}`}
            onClick={() => setOrderType('limit')}
          >
            Limit
          </button>

          <button
            className={`order-toggle ${orderType === 'market' ? 'active' : ''}`}
            onClick={() => setOrderType('market')}
          >
            Market
          </button>
        </div>
      </div>

      {(marketType === 'multiple-choice' ||
        marketType === 'match-outcome-buttons') && (
        <div className="outcome-info">
          {outcome.photo && (
            <Image
              src={outcome.photo}
              alt={outcome.name}
              className="outcome-photo"
              width={40}
              height={40}
            />
          )}
          <span className="outcome-name">{outcome.name}</span>
        </div>
      )}

      <div className="trade-form">
        <div className="outcome-select">
          <label>Outcome</label>
          <div className="outcome-buttons">
            <button
              className={`outcome-button yes ${
                selectedOutcome === 'yes' ? 'selected' : ''
              }`}
              onClick={() => {
                setSelectedOutcome('yes');
                onSideChange?.('yes');
              }}
            >
              Yes {outcome.yesPrice.toFixed(1)}¢
            </button>
            <button
              className={`outcome-button no ${
                selectedOutcome === 'no' ? 'selected' : ''
              }`}
              onClick={() => {
                setSelectedOutcome('no');
                onSideChange?.('no');
              }}
            >
              No {outcome.noPrice.toFixed(1)}¢
            </button>
          </div>
        </div>

        {orderType === 'limit' && (
          <>
            <div className="input-section">
              <label>Limit Price</label>
              <div className="input-group">
                <button onClick={handleDecrementPrice}>
                  <div className="minus"></div>
                </button>
                <input
                  type="text"
                  value={limitPrice.toFixed(1)}
                  onChange={(e) => {
                    const value = parseFloat(e.target.value);
                    if (!isNaN(value) && value >= 0) {
                      setLimitPrice(value);
                    }
                  }}
                  title="limit price"
                />
                <button onClick={handleIncrementPrice}>
                  <PlusIcon />
                </button>
              </div>
            </div>
          </>
        )}
        <div className="input-section">
          <label>Amount</label>
          <div className="input-group">
            <button onClick={handleDecrementAmount}>
              <div className="minus"></div>
            </button>
            <input
              type="text"
              value={amountShares}
              onChange={(e) => {
                const value = parseInt(e.target.value, 10);
                if (!isNaN(value) && value >= 0) {
                  setAmountShares(value);
                }
              }}
              title="shares"
            />
            <button onClick={handleIncrementAmount}>
              <PlusIcon />
            </button>
          </div>
        </div>

        <div className="total-section">
          <label>Total</label>
          <span>${totalCost}</span>
        </div>
      </div>
      <div className="expiry-section">
        <label>Order Expiry</label>
        <button
          className="expiry-toggle"
          onClick={() => setShowExpiryOptions(!showExpiryOptions)}
        >
          Until Cancelled <ArrowRightIcon />
        </button>
      </div>

      <div className="to-win-section">
        <label>To Win</label>
        <span className="profit">
          ${profit} ({multiplier}x)
        </span>
      </div>
      {orderType === 'market' && <div className="amm-placeholder"></div>}

      <button className="action-button">{buttonText}</button>

      {showExpiryOptions && (
        <div className="expiry-modal">
          <button>12 hours</button>
          <button>24 hours</button>
          <button>06/03/2024</button>
        </div>
      )}
    </div>
  );
};

export default TradeWidget;
