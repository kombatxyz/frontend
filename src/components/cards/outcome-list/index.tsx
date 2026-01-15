'use client';
import React from 'react';
import { MarketOption } from '../market-card';

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

interface OutcomeListProps {
  options: MarketOption[];
  volume: string;
  onSelect: (option: MarketOption, side: 'yes' | 'no') => void;
  activeOptionName?: string;
  activeSide?: 'yes' | 'no';
}

const OutcomeList: React.FC<OutcomeListProps> = ({
  options,
  volume,
  onSelect,
  activeOptionName,
  activeSide,
}) => {
  return (
    <div className="outcome-list">
      <div className="header">
        <span className="outcome-title">OUTCOME</span>
        <span className="chance-title">CHANCE</span>
      </div>
      <div className="outcome-rows">
        {options.map((option, index) => {
          const isActiveOption = option.name === activeOptionName;
          const optionVolume = calculateOptionVolume(volume, option.percentage);
          return (
            <div key={index} className="outcome-row">
              <div className="option-info">
                {option.photo && (
                  <img src={option.photo} alt={option.name} className="photo" />
                )}
                <div className="name-vol">
                  <span className="name">{option.name}</span>
                  <span className="vol">
                    <span>Vol:</span>
                    {optionVolume}
                  </span>
                </div>
              </div>
              <div className="chance">
                <span className="percentage">{option.percentage}%</span>
                <span className="label">Chance</span>
              </div>
              <div className="buttons">
                <button
                  className={`yes ${
                    isActiveOption && activeSide === 'yes' ? 'active' : ''
                  }`}
                  onClick={() => onSelect(option, 'yes')}
                >
                  Yes {option.percentage.toFixed(1)}¢
                </button>
                <button
                  className={`no ${
                    isActiveOption && activeSide === 'no' ? 'active' : ''
                  }`}
                  onClick={() => onSelect(option, 'no')}
                >
                  No {(100 - option.percentage).toFixed(1)}¢
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OutcomeList;
