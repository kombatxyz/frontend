import React from 'react';
import Navbar from '../navbar';
import liveIcon from '@/assets/images/icons/live.png';
import Image from 'next/image';
import LiveBets from './live-bets';
import {
  CornerSVGTopLeft,
  CornerSVGTopRight,
  CornerSVGBottomLeft,
  CornerSVGBottomRight,
  RectangleLeftSVG,
  RectangleRightSVG,
  StatBgOverview,
} from './SVG';
const Overview = () => {
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

        <LiveBets />
      </div>
    </div>
  );
};

export default Overview;
