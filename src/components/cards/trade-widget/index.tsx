'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { PlusIcon, ArrowRightIcon } from '@/assets/svg';
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { CONTRACTS, PM_ROUTER_ABI } from '@/lib/contracts';
import { parseUnits } from 'viem';
import { useShareBalance } from '@/hooks/useShareBalance';

interface TradeWidgetProps {
  outcome: {
    name: string;
    photo: string;
    yesPrice: number;
    noPrice: number;
    conditionId?: string;
    yesTokenId?: string;
    noTokenId?: string;
  };
  initialSide?: 'yes' | 'no';
  onSideChange?: (side: 'yes' | 'no') => void;
  onClose?: () => void;
  marketType?:
    | 'multiple-choice'
    | 'binary'
    | 'binary-buttons'
    | 'match-outcome-buttons';
}
const TradeWidget: React.FC<TradeWidgetProps> = ({
  outcome,
  initialSide,
  onSideChange,
  onClose,
  marketType,
}) => {
  const [activeTab, setActiveTab] = useState<'buy' | 'sell'>('buy');
  const [orderType, setOrderType] = useState<'limit' | 'market'>('limit');
  const [selectedOutcome, setSelectedOutcome] = useState<'yes' | 'no'>(
    initialSide || 'yes',
  );

  // Sync internal state when initialSide prop changes
  useEffect(() => {
    if (initialSide) {
      setSelectedOutcome(initialSide);
    }
  }, [initialSide]);
  
  const [limitPrice, setLimitPrice] = useState<number>(
    Math.round(initialSide === 'no' ? outcome.noPrice : outcome.yesPrice),
  );
  const [amountUSDC, setAmountUSDC] = useState<number>(15); // User inputs USDC amount

  // Update limit price when outcome selection changes
  useEffect(() => {
    setLimitPrice(
      Math.round(selectedOutcome === 'yes' ? outcome.yesPrice : outcome.noPrice),
    );
  }, [selectedOutcome, outcome.yesPrice, outcome.noPrice]);
  
  const [showExpiryOptions, setShowExpiryOptions] = useState<boolean>(false);

  // Trading hooks
  const { writeContract, data: hash, isPending, isError, isSuccess: writeSuccess } = useWriteContract();
  const { isSuccess: txSuccess } = useWaitForTransactionReceipt({ hash });
  
  // Fetch user's share balances (uses conditionId to compute positionIds if tokenIds not available)
  const { yesBalance, noBalance, refetch: refetchBalances } = useShareBalance(
    outcome.yesTokenId,
    outcome.noTokenId,
    outcome.conditionId
  );

  // Refetch balances when transaction succeeds
  useEffect(() => {
    if (txSuccess) {
      refetchBalances();
    }
  }, [txSuccess, refetchBalances]);

  // Calculate trade details based on dollar amount input
  const calculateTradeDetails = () => {
    const pricePerShare = limitPrice / 100; // Convert cents to dollars
    
    if (activeTab === 'buy') {
      // BUYING: User specifies USDC to spend, we calculate shares
      const sharesReceived = pricePerShare > 0 ? amountUSDC / pricePerShare : 0;
      const potentialPayout = sharesReceived * 1.0; // Each share pays $1 if correct
      const profit = potentialPayout - amountUSDC;
      const multiplier = amountUSDC > 0 ? potentialPayout / amountUSDC : 0;
      
      return {
        shares: sharesReceived.toFixed(2),
        profit: profit.toFixed(2),
        multiplier: multiplier.toFixed(1) + 'x'
      };
    } else {
      // SELLING: User specifies shares to sell, calculates USDC received
      // For now, keep amount as shares for sell orders
      const revenue = amountUSDC * pricePerShare;
      const opportunityCost = amountUSDC * (1.0 - pricePerShare);
      
      return {
        shares: revenue.toFixed(2), // USDC received
        profit: opportunityCost.toFixed(2),
        multiplier: '0x'
      };
    }
  };

  const tradeDetails = calculateTradeDetails();
  const totalShares = tradeDetails.shares;
  const profit = tradeDetails.profit;
  const multiplier = tradeDetails.multiplier;


  const handleDecrementPrice = () =>
    setLimitPrice((prev) => Math.max(1, Math.round(prev) - 1));
  const handleIncrementPrice = () => 
    setLimitPrice((prev) => Math.min(99, Math.round(prev) + 1));
  const handleDecrementAmount = () =>
    setAmountUSDC((prev) => Math.max(0, prev - 1));
  const handleIncrementAmount = () => setAmountUSDC((prev) => prev + 1);

  const buttonText = `${
    activeTab.charAt(0).toUpperCase() + activeTab.slice(1)
  } ${selectedOutcome.charAt(0).toUpperCase() + selectedOutcome.slice(1)}`;

  // Execute trade
  const executeTrade = () => {
    if (!outcome.conditionId) {
      console.error('[Trade] No conditionId provided');
      return;
    }

    const conditionId = outcome.conditionId as `0x${string}`;
    
    if (orderType === 'market') {
      // Market orders
      const shares = parseUnits(amountUSDC.toString(), 6); // USDC amount
      
      if (activeTab === 'buy') {
        const functionName = selectedOutcome === 'yes' ? 'marketBuyYes' : 'marketBuyNo';
        const minShares = (shares * BigInt(95)) / BigInt(100); // 5% slippage
        
        writeContract({
          address: CONTRACTS.PM_ROUTER as `0x${string}`,
          abi: PM_ROUTER_ABI,
          functionName,
          args: [conditionId, minShares]
        });
      } else {
        // Sell
        const functionName = selectedOutcome === 'yes' ? 'marketSellYes' : 'marketSellNo';
        const minCost = (shares * BigInt(95)) / BigInt(100); // 5% slippage
        
        writeContract({
          address: CONTRACTS.PM_ROUTER as `0x${string}`,
          abi: PM_ROUTER_ABI,
          functionName,
          args: [conditionId, shares, minCost]
        });
      }
    } else {
      // Limit orders
      const tick = Math.round(limitPrice); // Convert cents to tick (0-100)
      const size = parseUnits(amountUSDC.toString(), 6); // USDC amount
      
      if (activeTab === 'buy') {
        const functionName = selectedOutcome === 'yes' ? 'limitBuyYes' : 'limitBuyNo';
        
        writeContract({
          address: CONTRACTS.PM_ROUTER as `0x${string}`,
          abi: PM_ROUTER_ABI,
          functionName,
          args: [conditionId, tick, size]
        });
      } else {
        // Sell
        const functionName = selectedOutcome === 'yes' ? 'limitSellYes' : 'limitSellNo';
        
        writeContract({
          address: CONTRACTS.PM_ROUTER as `0x${string}`,
          abi: PM_ROUTER_ABI,
          functionName,
          args: [conditionId, tick, size]
        });
      }
    }
  };

  return (
    <div className="trade-widget">
      {onClose && (
        <button className="close-btn" onClick={onClose}>
          ×
        </button>
      )}
      <div className="trade-header">
        <div className="buy-sell-tabs">
          <button
            className={`tab ${activeTab === 'buy' ? 'active' : ''}`}
            onClick={() => setActiveTab('buy')}
          >
            Buy
          </button>
          <button
            className={`tab ${activeTab === 'sell' ? 'active' : ''}`}
            onClick={() => setActiveTab('sell')}
          >
            Sell
          </button>
        </div>

        <div className={`order-types ${orderType}`}>
          <span className="slider" />

          <button
            className={`order-toggle ${orderType === 'limit' ? 'active' : ''}`}
            onClick={() => setOrderType('limit')}
          >
            Limit
          </button>

          <button
            className={`order-toggle ${orderType === 'market' ? 'active' : ''}`}
            onClick={() => setOrderType('market')}
          >
            Market
          </button>
        </div>
      </div>

      {(marketType === 'multiple-choice' ||
        marketType === 'match-outcome-buttons') && (
        <div className="outcome-info">
          {outcome.photo && (
            <Image
              src={outcome.photo}
              alt={outcome.name}
              className="outcome-photo"
              width={40}
              height={40}
            />
          )}
          <span className="outcome-name">{outcome.name}</span>
        </div>
      )}

      <div className="trade-form">
        <div className="outcome-select">
          <label>Outcome</label>
          <div className="outcome-buttons">
            <button
              className={`outcome-button yes ${
                selectedOutcome === 'yes' ? 'selected' : ''
              }`}
              onClick={() => {
                setSelectedOutcome('yes');
                onSideChange?.('yes');
              }}
            >
              Yes {Math.round(outcome.yesPrice)}¢
            </button>
            <button
              className={`outcome-button no ${
                selectedOutcome === 'no' ? 'selected' : ''
              }`}
              onClick={() => {
                setSelectedOutcome('no');
                onSideChange?.('no');
              }}
            >
              No {Math.round(outcome.noPrice)}¢
            </button>
          </div>
        </div>

        {orderType === 'limit' && (
          <>
            <div className="input-section">
              <label>Limit Price</label>
              <div className="input-group">
                <button onClick={handleDecrementPrice}>
                  <div className="minus"></div>
                </button>
                <input
                  type="text"
                  value={Math.round(limitPrice)}
                  onChange={(e) => {
                    const value = parseInt(e.target.value, 10);
                    if (!isNaN(value) && value >= 1 && value <= 99) {
                      setLimitPrice(value);
                    } else if (e.target.value === '') {
                      setLimitPrice(1);
                    }
                  }}
                  title="limit price"
                />
                <button onClick={handleIncrementPrice}>
                  <PlusIcon />
                </button>
              </div>
            </div>
          </>
        )}
        <div className="input-section">
          <label>Amount</label>
          <div className="input-group">
            <button onClick={handleDecrementAmount}>
              <div className="minus"></div>
            </button>
            <input
              type="text"
              value={amountUSDC}
              onChange={(e) => {
                const value = parseInt(e.target.value, 10);
                if (!isNaN(value) && value >= 0) {
                  setAmountUSDC(value);
                }
              }}
              title="USDC amount"
            />
            <button onClick={handleIncrementAmount}>
              <PlusIcon />
            </button>
          </div>
        </div>

        <div className="total-section">
          <label>{activeTab === 'buy' ? 'Shares' : 'You Receive'}</label>
          <span>{totalShares}</span>
        </div>
      </div>
      <div className="expiry-section">
        <label>Order Expiry</label>
        <button
          className="expiry-toggle"
          onClick={() => setShowExpiryOptions(!showExpiryOptions)}
        >
          Until Cancelled <ArrowRightIcon />
        </button>
      </div>

      <div className="to-win-section">
        <label>{activeTab === 'buy' ? 'Potential Profit' : 'Opportunity Cost'}</label>
        <span className="profit">
          ${profit} {activeTab === 'buy' && `(${multiplier})`}
        </span>
      </div>
      {orderType === 'market' && <div className="amm-placeholder"></div>}

      {/* User's current holdings */}
      <div className="balance-display">
        <span className="balance-label">Your holdings:</span>
        <span className="balance-value">
          {yesBalance.toFixed(2)} YES / {noBalance.toFixed(2)} NO
        </span>
      </div>

      <button 
        className="action-button" 
        onClick={executeTrade}
        disabled={isPending || !outcome.conditionId}
      >
        {isPending && 'Confirming...'}
        {txSuccess && '✓ Success!'}
        {!isPending && !txSuccess && buttonText}
      </button>

      {showExpiryOptions && (
        <div className="expiry-modal">
          <button>12 hours</button>
          <button>24 hours</button>
          <button>06/03/2024</button>
        </div>
      )}
    </div>
  );
};

export default TradeWidget;
