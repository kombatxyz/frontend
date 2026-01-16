import React from 'react';
import liveIcon from '@/assets/images/icons/live.png';
import plusIcon from '@/assets/images/icons/plus.svg';
import arrowIcon from '@/assets/images/icons/arrow-right.svg';
import youImage from '@/assets/images/icons/you.png';
import userImage from '@/assets/images/icons/ken.png';
import Image from 'next/image';
import Link from 'next/link';
import { PlusIcon, ButtonBg, VSIcon } from '../SVG';

interface LiveBet {
  id: number;
  opponent: string;
  timeLeft: string;
  stake: string;
}

interface LiveBetsProps {
  setLiveBetsCount?: (count: number) => void;
}

const LiveBets: React.FC<LiveBetsProps> = ({ setLiveBetsCount }) => {

  const liveBets: LiveBet[] = [
    // Uncomment to test with live bets:
    // {
    //   id: 1,
    //   opponent: 'Ken',
    //   timeLeft: '2h 30m',
    //   stake: '100 USDC'
    // }
  ];

  return (
    <main className="live-bets-container">
      <div className="livebets">
        {liveBets.length === 0 ? (
          <div className="no-live-bets">
            <VSIcon />
            <p>
              No kombat is currently live, click the button below to enter the
              Arena
            </p>
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
        ) : (
          liveBets.map((livebet) => {
            return (
              <div className="livebet" key={livebet.id}>
                <div className="players-info">
                  <div className="player">
                    <Image src={youImage} alt="" />
                    <p>You</p>
                  </div>

                  <span>VS</span>

                  <div className="player">
                    <Image src={userImage} alt="" />
                    <p>{livebet.opponent}</p>
                  </div>
                </div>

                <div className="details">
                  <p id="title">Who will win the ballon d'or?</p>
                  <p id="time-left">{livebet.timeLeft}</p>
                </div>
                <div className="stake">
                  <p id="title">Kombat Stake:</p>
                  <p id="value">{livebet.stake}</p>
                </div>

                <div className="cta">
                  <button className="arrowButton" title="arrow">
                    <Image src={arrowIcon} alt="" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </main>
  );
};

export default LiveBets;
