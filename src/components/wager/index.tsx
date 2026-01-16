'use client';
import Link from 'next/link';
import { useState } from 'react';
import Navbar from '../navbar';
import liveIcon from '@/assets/images/icons/live.png';
import Image from 'next/image';
import LiveBets from './live-bets';
import History from './history';
import {
  CornerSVGTopLeft,
  CornerSVGTopRight,
  CornerSVGBottomLeft,
  CornerSVGBottomRight,
  RectangleLeftSVG,
  RectangleRightSVG,
  StatBgOverview,
  PlusIcon,
  ButtonBg,
} from './SVG';
import P2PBackgroundGrid from '@/assets/images/p2p-background-grid.svg';

const Overview = () => {
  const [activeTab, setActiveTab] = useState<'live' | 'history'>('live');
  const [totalLiveBets, setTotalLiveBets] = useState<number>(0);
  const [totalCompletedBets, setTotalCompletedBets] = useState<number>(0);
  const [won, setWon] = useState('0');
  const [totalStake, setTotalStake] = useState('0');

  const handleTabSwitch = (tab: 'live' | 'history') => {
    setActiveTab(tab);
  };
  return (
    <div className="overview-container">
      <Navbar />

      <div className="overview-content">
        <div className="dashboard-stats">
          <CornerSVGTopLeft className="corner-top-left" />
          <CornerSVGBottomLeft className="corner-bottom-left" />
          <CornerSVGBottomRight className="corner-bottom-right" />
          <CornerSVGTopRight className="corner-top-right" />

          <RectangleLeftSVG className="rectangle-left" />
          <RectangleRightSVG className="rectangle-right" />
          <div className="stats">
            <div className="title">
              Live kombats <Image src={liveIcon} alt="" />
            </div>
            <div className="value">00</div>
          </div>

          <div className="stats">
            <div className="title">Completed</div>
            <div className="value">00</div>
          </div>

          <div className="stats">
            <div className="title">Total Stake</div>
            <div className="value">$0</div>
          </div>
          <div className="stats">
            <div className="title">Won</div>
            <div className="value">$000</div>
          </div>
        </div>

        <div className="tabs-container">
          <div className="tabs">
            <div
              className={`tab ${activeTab === 'live' ? 'tab-active' : ''}`}
              onClick={() => handleTabSwitch('live')}
              id="live-bet"
            >
              Live kombats <Image src={liveIcon} alt="" />
            </div>
            <div
              className={`tab ${activeTab === 'history' ? 'tab-active' : ''}`}
              onClick={() => handleTabSwitch('history')}
            >
              History
            </div>
          </div>

          <Link href="./new-kombat" id="new-kombat-btn">
            <button>
              <div className="btn-text">
                New Kombat
                <PlusIcon />
              </div>
              <div className="bg">
                <ButtonBg />
              </div>
            </button>
          </Link>
        </div>
      </div>
      {activeTab === 'live' ? (
        <LiveBets setLiveBetsCount={setTotalLiveBets} />
      ) : (
        <History setCompletedBetsCount={setTotalCompletedBets} />
      )}

      <Image src={P2PBackgroundGrid} alt="" className="p2p-background-grid" />
    </div>
  );
};

export default Overview;
