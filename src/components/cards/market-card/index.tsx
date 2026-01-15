'use client';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { BookmarkIcon, BookmarkedIcon } from '@/assets/svg';
import { toggleBookmark } from '@/redux/slice/bookmarkSlice';
import { RootState } from '@/redux/store';
import { getMarketSlug } from '@/lib/markets';

export type MarketOption = {
  name: string;
  percentage: number;
  shortName?: string;
  photo?: string;
};

export type MarketCardType =
  | 'multiple-choice'
  | 'binary'
  | 'binary-buttons'
  | 'match-outcome-buttons';

export type MarketTag =
  | 'Live'
  | 'Crypto'
  | 'Sports'
  | 'Politics'
  | 'Companies'
  | 'Entertainment'
  | 'Finance'
  | 'Climate';

export type MarketCardProps = {
  id: number;
  createdAt: string;
  title: string;
  timeRemaining: string;
  volume: string;
  type: MarketCardType;
  tags?: MarketTag[];
  options?: MarketOption[];
  mainOption?: string;
  percentage?: number;
  leftLogo?: string;
  rightLogo?: string;
  image?: string;
};

const MarketCard: React.FC<MarketCardProps> = ({
  id,
  createdAt,
  title,
  timeRemaining,
  volume,
  type,
  tags = [],
  options = [],
  mainOption,
  percentage,
  leftLogo,
  rightLogo,
  image,
}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const bookmarkedMarkets = useSelector(
    (state: RootState) => state.bookmarks.bookmarkedMarkets,
  );
  const isBookmarked = bookmarkedMarkets.some((m) => m.title === title);
  const slug = getMarketSlug({
    id,
    createdAt,
    title,
    timeRemaining,
    volume,
    type,
    tags,
    mainOption,
    options,
    percentage,
    leftLogo,
    rightLogo,
  });

  const handleCardClick = (
    e?: React.MouseEvent,
    outcome?: string,
    side?: 'yes' | 'no',
  ) => {
    e?.stopPropagation();
    const params = new URLSearchParams();
    if (outcome) params.set('outcome', outcome);
    if (side) params.set('side', side);
    const queryString = params.toString();
    router.push(`/event/${slug}${queryString ? `?${queryString}` : ''}`);
  };
  const handleToggleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(
      toggleBookmark({
        id,
        createdAt,
        title,
        timeRemaining,
        volume,
        type,
        tags,
        options,
        mainOption,
        percentage,
        leftLogo,
        rightLogo,
      }),
    );
  };
  const home = options[0];
  const away = options[1];

  const renderMultipleChoice = () => (
    <div className="market-card-options">
      {options.map((option, index) => (
        <div
          key={index}
          className="market-option"
          onClick={(e) => handleCardClick(e, option.name, 'yes')}
        >
          <div
            className="option-background"
            style={{ width: `${option.percentage}%` }}
          ></div>
          <span className="option-name">{option.name}</span>
          <div className="option-right">
            <span className="option-percentage">{option.percentage}%</span>
            <div className="hover-badges">
              <span
                className="badge badge-yes"
                onClick={(e) => handleCardClick(e, option.name, 'yes')}
              >
                YES
              </span>
              <span
                className="badge badge-no"
                onClick={(e) => handleCardClick(e, option.name, 'no')}
              >
                NO
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderBinary = () => (
    <div className="market-card-binary">
      <div className="binary-header">
        <div
          className="option-background"
          style={{ width: `${options[0]?.percentage || 0}%` }}
        ></div>
        <span className="binary-name">{mainOption}</span>
        <div className="binary-badges">
          <span
            className="badge badge-yes"
            onClick={(e) => handleCardClick(e, undefined, 'yes')}
          >
            YES
          </span>
          <span
            className="badge badge-no"
            onClick={(e) => handleCardClick(e, undefined, 'no')}
          >
            NO
          </span>
        </div>
      </div>
      <div className="market-card-options">
        {options.map((option, index) => (
          <div key={index} className="market-option">
            <span className="option-name">{option.name}</span>
            <span className="option-percentage">{option.percentage}%</span>
          </div>
        ))}
      </div>
    </div>
  );

  const renderBinaryButtons = () => (
    <div className="market-card-binary-buttons">
      <div className="percentage-display">
        <div
          className="option-background"
          style={{ width: `${percentage}%` }}
        ></div>
        <span className="percentage-value">
          {percentage}% <span className="text">Chance</span>
        </span>
      </div>
      <div className="binary-actions">
        <button
          className="btn btn-yes"
          onClick={(e) => handleCardClick(e, undefined, 'yes')}
        >
          <span>YES</span>
        </button>
        <button
          className="btn btn-no"
          onClick={(e) => handleCardClick(e, undefined, 'no')}
        >
          <span>NO</span>
        </button>
      </div>
    </div>
  );

  const renderMatchOutcomeButtons = () => {
    if (options.length !== 2) {
      return null;
    }
    const homeShort = home?.shortName || home?.name;
    const awayShort = away?.shortName || away?.name;
    return (
      <div className="match-outcome">
        <div className="match-options">
          <div className="match-option-container">
            <div
              className="option-background"
              style={{ width: `${home?.percentage || 0}%` }}
            ></div>
            <div className="match-option">
              <span className="option-name">{home?.name}</span>
              <span className="option-percentage">{home?.percentage}%</span>
            </div>
          </div>

          <div className="match-option-container">
            <div
              className="option-background"
              style={{ width: `${away?.percentage || 0}%` }}
            ></div>
            <div className="match-option">
              <span className="option-name">{away?.name}</span>
              <span className="option-percentage">{away?.percentage}%</span>
            </div>
          </div>
        </div>
        <div className="match-buttons">
          <button
            className="btn btn-home"
            onClick={(e) => handleCardClick(e, homeShort, 'yes')}
          >
            {homeShort}
          </button>
          <button
            className="btn btn-draw"
            onClick={(e) => handleCardClick(e, 'Draw', 'yes')}
          >
            Draw
          </button>
          <button
            className="btn btn-away"
            onClick={(e) => handleCardClick(e, awayShort, 'yes')}
          >
            {awayShort}
          </button>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (type) {
      case 'multiple-choice':
        return renderMultipleChoice();
      case 'binary':
        return renderBinary();
      case 'binary-buttons':
        return renderBinaryButtons();
      case 'match-outcome-buttons':
        return renderMatchOutcomeButtons();
      default:
        return renderMultipleChoice();
    }
  };

  return (
    <div
      className="market-card"
      data-tags={tags.join(',')}
      onClick={() => handleCardClick()}
    >
      <div className="market-card-header">
        {leftLogo && rightLogo && home && away && (
          <div className="header-logos">
            <div className="team-info team-info-home">
              <h3 className="team-name">{home?.shortName || home?.name}</h3>
              <img src={leftLogo} alt="Home team" className="team-logo" />
            </div>

            <span className="vs">vs</span>

            <div className="team-info">
              <img src={rightLogo} alt="Away team" className="team-logo" />
              <h3 className="team-name">{away?.shortName || away?.name}</h3>
            </div>
          </div>
        )}
        <div className="title">
          {image && !leftLogo && !rightLogo && (
            <img src={image} alt="" className="market-image" />
          )}
          <h3
            className="market-card-title"
            style={{ display: leftLogo && rightLogo ? 'none' : 'block' }}
          >
            {title}
          </h3>
        </div>
        <div className="market-card-meta">
          <span className="time-remaining">{timeRemaining}</span>
          <div className="meta-right">
            <span className="volume">Vol: {volume}</span>
            <button
              className="bookmark-btn"
              title="Bookmark"
              onClick={handleToggleBookmark}
            >
              {isBookmarked ? <BookmarkedIcon /> : <BookmarkIcon />}
            </button>
          </div>
        </div>
      </div>
      <div className="market-card-content">{renderContent()}</div>
    </div>
  );
};

export default MarketCard;
