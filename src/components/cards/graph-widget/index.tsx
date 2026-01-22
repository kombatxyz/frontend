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

/**
 * Generate realistic price history data based on current prices
 * Uses random walk with mean reversion to simulate market movements
 */
const generateRealisticData = (
  currentPrices: number[], 
  timeRange: string,
  optionNames?: string[]
) => {
  const data = [];
  
  // Configure data points and volatility based on time range
  const config: { [key: string]: { points: number; volatility: number; format: (i: number) => string } } = {
    '1H': { 
      points: 12, 
      volatility: 0.5,
      format: (i) => `${(60 - i * 5)}m ago`
    },
    '6H': { 
      points: 24, 
      volatility: 1,
      format: (i) => `${(6 - Math.floor(i / 4))}h ago`
    },
    '1D': { 
      points: 24, 
      volatility: 1.5,
      format: (i) => {
        const hour = (new Date().getHours() - 24 + i) % 24;
        return `${hour}:00`;
      }
    },
    '1W': { 
      points: 14, 
      volatility: 2.5,
      format: (i) => {
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const dayIndex = (new Date().getDay() - 7 + i) % 7;
        return days[dayIndex >= 0 ? dayIndex : dayIndex + 7];
      }
    },
    '1M': { 
      points: 30, 
      volatility: 3,
      format: (i) => {
        const date = new Date();
        date.setDate(date.getDate() - 30 + i);
        return `${date.getMonth() + 1}/${date.getDate()}`;
      }
    },
    'ALL': { 
      points: 60, 
      volatility: 4,
      format: (i) => {
        const date = new Date();
        date.setDate(date.getDate() - 60 + i);
        return `${date.getMonth() + 1}/${date.getDate()}`;
      }
    },
  };
  
  const { points, volatility, format } = config[timeRange] || config['ALL'];
  
  // Work backwards from current prices to generate history
  const priceHistory: number[][] = currentPrices.map(price => {
    const history = [price];
    let currentPrice = price;
    
    // Generate history going backwards (so last point = current price)
    for (let i = 1; i < points; i++) {
      // Random walk with slight mean reversion to 50%
      const drift = (50 - currentPrice) * 0.02; // Mean reversion
      const noise = (Math.random() - 0.5) * volatility * 2;
      currentPrice = Math.max(1, Math.min(99, currentPrice - drift - noise));
      history.unshift(currentPrice);
    }
    
    return history;
  });
  
  // Build data array for chart
  for (let i = 0; i < points; i++) {
    const point: any = { 
      time: i,
      timeLabel: format(i)
    };
    
    priceHistory.forEach((history, index) => {
      point[`value${index}`] = Math.round(history[i] * 10) / 10;
      if (optionNames && optionNames[index]) {
        point[`name${index}`] = optionNames[index];
      }
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

  // Get current prices from options
  const currentPrices = React.useMemo(() => {
    if (isBinary) {
      return [percentage || 50];
    }
    return displayOptions.map(opt => opt.percentage || 50);
  }, [isBinary, percentage, displayOptions]);

  const optionNames = React.useMemo(() => {
    if (isBinary) return ['Yes'];
    return displayOptions.map(opt => opt.name || `Option ${displayOptions.indexOf(opt) + 1}`);
  }, [isBinary, displayOptions]);

  useEffect(() => {
    setData(generateRealisticData(currentPrices, timeRange, optionNames));
  }, [timeRange, currentPrices.join(','), optionNames.join(',')]);

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
              dataKey="timeLabel"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#9ca3af', fontSize: 11 }}
              interval={Math.floor(data.length / 6)}
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
