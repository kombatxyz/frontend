'use client';
import React, { useState, useRef, useEffect } from 'react';
import { ChevronDownIcon } from '@/assets/svg';

interface OrderEntry {
  price: number;
  shares: number;
  total: number;
  percentage: number;
}

export interface OrderBookOption {
  name: string;
  photo?: string;
  yesPrice: number;
  noPrice: number;
}

interface OrderBookProps {
  options?: OrderBookOption[];
  selectedOption?: OrderBookOption | null;
  onOptionSelect?: (option: OrderBookOption) => void;
}

// Sample data matching the design
const tradeNoData: OrderEntry[] = [
  { price: 4, shares: 12400.0, total: 12400.0, percentage: 100 },
  { price: 3, shares: 4000.9, total: 4000.9, percentage: 32 },
  { price: 7, shares: 23000.7, total: 23000.7, percentage: 85 },
  { price: 2, shares: 4000.9, total: 23000.7, percentage: 28 },
  { price: 2, shares: 23000.4, total: 23000.7, percentage: 22 },
  { price: 2, shares: 23000.4, total: 23000.7, percentage: 18 },
  { price: 2, shares: 23000.4, total: 23000.4, percentage: 14 },
];

const tradeYesData: OrderEntry[] = [
  { price: 4, shares: 12400.0, total: 12400.0, percentage: 100 },
  { price: 3, shares: 4000.9, total: 4000.9, percentage: 75 },
  { price: 7, shares: 23000.7, total: 23000.7, percentage: 55 },
  { price: 2, shares: 23000.4, total: 23000.4, percentage: 40 },
  { price: 2, shares: 0, total: 0, percentage: 25 },
  { price: 2, shares: 0, total: 0, percentage: 15 },
];

const formatNumber = (num: number): string => {
  if (num === 0) return '';
  return num.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

const OrderBook: React.FC<OrderBookProps> = ({
  options = [],
  selectedOption,
  onOptionSelect,
}) => {
  const [activeMainTab, setActiveMainTab] = useState<
    'orderBook' | 'resolutions'
  >('orderBook');
  const [activeTradeTab, setActiveTradeTab] = useState<'yes' | 'no'>('yes');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleOptionSelect = (option: OrderBookOption) => {
    onOptionSelect?.(option);
    setIsDropdownOpen(false);
  };

  const hasOptions = options.length > 0;
  const displayName = selectedOption?.name || (hasOptions ? options[0]?.name : 'Select Option');

  return (
    <div className="order-book-container">
      {/* Header Tabs */}
      <div className="order-book-header">
        <div className="header-tabs">
          <button
            className={`main-tab ${
              activeMainTab === 'orderBook' ? 'active' : ''
            }`}
            onClick={() => setActiveMainTab('orderBook')}
          >
            Order Book
          </button>
          <button
            className={`main-tab ${
              activeMainTab === 'resolutions' ? 'active' : ''
            }`}
            onClick={() => setActiveMainTab('resolutions')}
          >
            Resolutions
          </button>
        </div>

        {/* Option Dropdown */}
        {hasOptions && (
          <div className="option-dropdown" ref={dropdownRef}>
            <button
              className={`dropdown-trigger ${isDropdownOpen ? 'open' : ''}`}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              {selectedOption?.photo && (
                <img
                  src={selectedOption.photo}
                  alt={displayName}
                  className="dropdown-photo"
                />
              )}
              <span className="dropdown-label">{displayName}</span>
              <ChevronDownIcon />
            </button>

            {isDropdownOpen && (
              <div className="dropdown-menu">
                {options.map((option, index) => (
                  <button
                    key={index}
                    className={`dropdown-item ${
                      selectedOption?.name === option.name ? 'selected' : ''
                    }`}
                    onClick={() => handleOptionSelect(option)}
                  >
                    {option.photo && (
                      <img
                        src={option.photo}
                        alt={option.name}
                        className="dropdown-item-photo"
                      />
                    )}
                    <span className="dropdown-item-name">{option.name}</span>
                    <div className="dropdown-item-prices">
                      <span className="yes-price">{option.yesPrice.toFixed(1)}¢</span>
                      <span className="no-price">{option.noPrice.toFixed(1)}¢</span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {activeMainTab === 'orderBook' && (
        <>
          {/* Trade Yes/No Tabs */}
          <div className="trade-tabs">
            <button
              className={`trade-tab ${
                activeTradeTab === 'yes' ? 'active' : ''
              }`}
              onClick={() => setActiveTradeTab('yes')}
            >
              Trade Yes
            </button>
            <button
              className={`trade-tab ${activeTradeTab === 'no' ? 'active' : ''}`}
              onClick={() => setActiveTradeTab('no')}
            >
              Trade No
            </button>
          </div>

          {/* Trade NO Section */}
          <div className="order-section">
            <div className="section-header">
              <span className="section-label">TRADE NO</span>
              <span className="column-header">PRICE</span>
              <span className="column-header">SHARES</span>
              <span className="column-header">TOTAL</span>
            </div>
            <div className="order-rows">
              {tradeNoData.map((entry, index) => (
                <div key={`no-${index}`} className="order-row">
                  <div className="bar-cell">
                    <div
                      className="bar bar-no"
                      style={{ width: `${entry.percentage}%` }}
                    />
                  </div>
                  <span className="price-cell price-no">{entry.price}$</span>
                  <span className="shares-cell">
                    {formatNumber(entry.shares)}
                  </span>
                  <span className="total-cell">
                    {formatNumber(entry.total)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Trade YES Section */}
          <div className="order-section">
            <div className="section-header">
              <span className="section-label">TRADE YES</span>
              <span className="column-header">PRICE</span>
              <span className="column-header">SHARES</span>
              <span className="column-header">TOTAL</span>
            </div>
            <div className="order-rows">
              {tradeYesData.map((entry, index) => (
                <div key={`yes-${index}`} className="order-row">
                  <div className="bar-cell">
                    <div
                      className="bar bar-yes"
                      style={{ width: `${entry.percentage}%` }}
                    />
                  </div>
                  <span className="price-cell price-yes">{entry.price}$</span>
                  <span className="shares-cell">
                    {formatNumber(entry.shares)}
                  </span>
                  <span className="total-cell">
                    {formatNumber(entry.total)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {activeMainTab === 'resolutions' && (
        <div className="resolutions-content">
          <p>Resolutions content coming soon...</p>
        </div>
      )}
    </div>
  );
};

export default OrderBook;
