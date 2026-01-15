import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { useDynamicContext } from '@dynamic-labs/sdk-react-core';
import { CloseIcon, LinkIcon } from '@/assets/svg';

interface FundWalletModalProps {
  closeModal: () => void;
}

const FundWalletModal: React.FC<FundWalletModalProps> = ({ closeModal }) => {
  const { primaryWallet } = useDynamicContext();
  const [isCopied, setIsCopied] = useState(false);

  // Use the actual wallet address if available, otherwise fallback to placeholder
  const walletAddress = primaryWallet?.address || '0xhdjd3232ninvd999dcdcdpump';

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(walletAddress);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <div className="modal-container">
      <div className="modal-content">
        <div className="title">Fund your wallet</div>
        <div className="share-link">
          <p>Only send supported tokens to this address</p>

          <div className="link-container">
            <div className="link">
              {walletAddress.slice(0, 10)}...{walletAddress.slice(-10)}
            </div>
            <div
              className="btn"
              onClick={copyToClipboard}
              style={{ cursor: 'pointer' }}
            >
              {isCopied ? (
                <span style={{ fontSize: '12px', color: '#21d148' }}>
                  Copied!
                </span>
              ) : (
                <LinkIcon />
              )}
            </div>
          </div>
        </div>

        <div className="scan-qrcode">
          <p>Or Scan the QR Code</p>
          <div
            className="qr-wrapper"
            style={{
              background: '#fff',
              padding: '12px',
              borderRadius: '12px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <QRCodeSVG
              value={walletAddress}
              size={180}
              level="H"
              includeMargin={false}
            />
          </div>
        </div>

        <div className="close-modal-btn" onClick={closeModal}>
          close
          <span>
            <CloseIcon />
          </span>
        </div>
      </div>
    </div>
  );
};

export default FundWalletModal;
