'use client';
import React, { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { LinkIcon } from '@/assets/svg';

interface GraphWidgetProps {
  marketType?: string;
  options?: any[];
  percentage?: number;
  title: string;
  volume: string;
  timeLeft: string;
  logo?: string;
}

const COLORS = ['#d97706', '#84cc16', '#f87171', '#3b82f6', '#8b5cf6'];

const generateMockData = (count: number = 2) => {
  const data = [];
  const startPrices = Array.from(
    { length: count },
    () => Math.random() * 40 + 30,
  );
  let currentPrices = [...startPrices];

  for (let i = 0; i < 20; i++) {
    const point: any = { time: i };
    currentPrices = currentPrices.map((price) => {
      const change = (Math.random() - 0.5) * 10;
      return Math.max(0, Math.min(100, price + change));
    });

    currentPrices.forEach((price, index) => {
      point[`value${index}`] = price;
    });

    data.push(point);
  }
  return data;
};

const GraphWidget: React.FC<GraphWidgetProps> = ({
  marketType,
  options,
  percentage,
  title,
  volume,
  timeLeft,
  logo,
}) => {
  const [timeRange, setTimeRange] = useState('ALL');
  const [showCopied, setShowCopied] = useState(false);

  const isBinary =
    marketType === 'binary' ||
    marketType === 'binary-buttons' ||
    marketType === 'match-outcome-buttons';

  const displayOptions = React.useMemo(() => {
    if (isBinary || !options) return [];
    return [...options].sort((a, b) => b.percentage - a.percentage).slice(0, 4);
  }, [options, isBinary]);

  const optionCount = isBinary ? 1 : displayOptions.length;
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    setData(generateMockData(optionCount));
  }, [optionCount]);

  const ranges = ['1H', '6H', '1D', '1W', '1M', 'ALL'];

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setShowCopied(true);
    setTimeout(() => setShowCopied(false), 2000);
  };

  return (
    <div className="graph-widget">
      <div className="widget-header">
        <div className="event-info-section">
          <div className="info-content">
            {logo && <img src={logo} alt="event logo" className="event-logo" />}
            <h1 className="event-title">{title}</h1>
          </div>
          <div className="actions">
            <button className="copy-link-btn" onClick={handleCopyLink}>
              <LinkIcon />
              {showCopied && <span className="copied-tooltip">Copied!</span>}
            </button>
          </div>
        </div>

        <div className="event-stats">
          <span className="timer">{timeLeft}</span>
          <span className="volume">Vol: {volume}</span>
        </div>
      </div>

      {isBinary && (
        <div className="probability-header">
          <div className="outcome-label">Yes</div>
          <div className="probability-value">{percentage || 50}% chance</div>
        </div>
      )}
      {/* For multiple choice, show the legend/filter */}
      {!isBinary && options && (
        <div className="options-legend">
          {displayOptions.map((opt, i) => (
            <div key={i} className="legend-item">
              <span
                className="dot"
                style={{
                  backgroundColor: COLORS[i % COLORS.length],
                }}
              />
              <span className="name">{opt.name}</span>
            </div>
          ))}
        </div>
      )}

      <div className="time-selector">
        {ranges.map((range) => (
          <button
            key={range}
            className={`time-btn ${timeRange === range ? 'active' : ''}`}
            onClick={() => setTimeRange(range)}
          >
            {range}
          </button>
        ))}
      </div>

      <div className="chart-container">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#2d3748"
            />
            <XAxis
              dataKey="time"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#9ca3af', fontSize: 12 }}
              tickFormatter={(val: number) =>
                val % 5 === 0 ? `Oct ${12 + val}` : ''
              }
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#9ca3af', fontSize: 12 }}
              tickFormatter={(val: number) => `${val}%`}
              domain={[0, 100]}
              ticks={[0, 25, 50, 75, 100]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1f2937',
                border: 'none',
                borderRadius: '8px',
              }}
              itemStyle={{ color: '#fff' }}
            />
            {isBinary ? (
              <Line
                type="monotone"
                dataKey="value0"
                stroke={COLORS[0]}
                strokeWidth={1}
                dot={false}
                activeDot={{ r: 4 }}
              />
            ) : (
              Array.from({ length: optionCount }).map((_, i) => (
                <Line
                  key={i}
                  type="monotone"
                  dataKey={`value${i}`}
                  stroke={COLORS[i % COLORS.length]}
                  strokeWidth={1}
                  dot={false}
                  activeDot={{ r: 4 }}
                />
              ))
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default GraphWidget;
