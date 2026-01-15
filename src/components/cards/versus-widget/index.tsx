import React from 'react';
import './style.scss';
import { MarketOption } from '@/components/cards/market-card';
import { LinkIcon, VersusIcon } from '@/assets/svg';

interface VersusWidgetProps {
  leftOption: MarketOption;
  rightOption: MarketOption;
  leftLogo?: string;
  rightLogo?: string;
  timeRemaining: string;
  volume: string;
}

const VersusWidget: React.FC<VersusWidgetProps> = ({
  leftOption,
  rightOption,
  leftLogo,
  rightLogo,
  timeRemaining,
  volume,
}) => {
  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      // Optional: Add toast notification
    }
  };

  return (
    <div className="versus-widget">
      <div className="team-section left">
        <img
          src={leftLogo || leftOption.photo}
          alt={leftOption.name}
          className="team-logo"
        />
        <span className="team-name">
          {leftOption.shortName || leftOption.name}
        </span>
      </div>

      <div className="center-section">
        <div className="vs-icon">
          <VersusIcon />
        </div>

        <div className="stats">
          <span className="timer">{timeRemaining}</span>
          <span className="volume">
            Vol:<span>{volume}</span>
          </span>
        </div>

        <button
          className="copy-link-btn"
          onClick={handleCopyLink}
          title="Copy Link"
        >
          <LinkIcon />
        </button>
      </div>

      <div className="team-section right">
        <img
          src={rightLogo || rightOption.photo}
          alt={rightOption.name}
          className="team-logo"
        />
        <span className="team-name">
          {rightOption.shortName || rightOption.name}
        </span>
      </div>
    </div>
  );
};

export default VersusWidget;
