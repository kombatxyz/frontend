import React from 'react';
import liveIcon from '@/assets/images/icons/live.png';
import plusIcon from '@/assets/images/icons/plus.svg';
import arrowIcon from '@/assets/images/icons/arrow-right.svg';
import youImage from '@/assets/images/icons/you.png';
import userImage from '@/assets/images/icons/ken.png';
import Image from 'next/image';
import Link from 'next/link';
const LiveBets = () => {
  const liveBets = [
    {
      id: 1,
      opponent: 'Kendrick',
      timeLeft: '2d : 3h : 23m',
      stake: '$12,000',
    },
    {
      id: 2,
      opponent: 'k,f,t,...',
      timeLeft: '2d : 3h : 23m',
      stake: '$12,000',
    },
    {
      id: 3,
      opponent: 'Kendrick',
      timeLeft: '2d : 3h : 23m',
      stake: '$12,000',
    },
  ];
  return (
    <main className="live-bets-container">
      <div className="title">
        <h3>
          Live kombats <Image src={liveIcon} alt="" />
        </h3>
        <Link href="./new-kombat">
          <button>
            New Kombat
            <Image src={plusIcon} alt="" />
          </button>
        </Link>
      </div>

      <div className="livebets">
        {liveBets.map((livebet) => {
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
        })}
      </div>
    </main>
  );
};

export default LiveBets;
