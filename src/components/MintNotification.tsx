'use client';
import { useEffect, useState } from 'react';
import './MintNotification.css';

interface MintNotificationProps {
  show: boolean;
  status: 'minting' | 'success' | 'error';
  currentStep?: 'mint' | 'approve' | 'done';
  onClose: () => void;
}

export function MintNotification({ show, status, currentStep = 'mint', onClose }: MintNotificationProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setIsVisible(true);
      if (status === 'success') {
        // Auto-close after 5 seconds on success
        const timer = setTimeout(() => {
          setIsVisible(false);
          setTimeout(onClose, 300); // Wait for fade out
        }, 5000);
        return () => clearTimeout(timer);
      }
    } else {
      setIsVisible(false);
    }
  }, [show, status, onClose]);

  if (!show) return null;

  return (
    <div className={`mint-notification ${isVisible ? 'visible' : ''} ${status}`}>
      <div className="mint-notification-content">
        <div className="mint-icon">
          {status === 'minting' && (
            <div className="spinner"></div>
          )}
          {status === 'success' && (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"
                fill="currentColor"
              />
            </svg>
          )}
          {status === 'error' && (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"
                fill="currentColor"
              />
            </svg>
          )}
        </div>
        <div className="mint-message">
          <h4>
            {status === 'minting' && currentStep === 'mint' && 'Minting Test USDC...'}
            {status === 'minting' && currentStep === 'approve' && 'Approving Router...'}
            {status === 'success' && 'Setup Complete!'}
            {status === 'error' && 'Setup Failed'}
          </h4>
          <p>
            {status === 'minting' && currentStep === 'mint' && 'Step 1/2: Minting 10,000 USDC...'}
            {status === 'minting' && currentStep === 'approve' && 'Step 2/2: Enabling trading...'}
            {status === 'success' && '10,000 USDC minted & approved. You\'re ready to trade!'}
            {status === 'error' && 'Please try again or contact support'}
          </p>
        </div>
        <button className="close-btn" onClick={() => {
          setIsVisible(false);
          setTimeout(onClose, 300);
        }}>
          ×
        </button>
      </div>
    </div>
  );
}
