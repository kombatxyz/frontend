import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import copyLink from '@/assets/images/icons/copy-link.svg';
import { CloseIcon } from '@/assets/svg';
import Image from 'next/image';

interface ShareLinkModalProps {
  closeModal: () => void;
}

const ShareLinkModal: React.FC<ShareLinkModalProps> = ({ closeModal }) => {
  const [isCopied, setIsCopied] = useState(false);
  const link = 'https://kombat.kxy';

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(link);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <div className="modal-container">
      <div className="modal-content">
        <div className="title">Invite your friends</div>
        <div className="share-link">
          <p>Share the link to your friends</p>

          <div className="link-container">
            <div className="link">{link}</div>
            <div className="btn" onClick={copyToClipboard}>
              {isCopied ? (
                <span>Copied!</span>
              ) : (
                <Image src={copyLink} alt="Copy link" />
              )}
            </div>
          </div>
        </div>

        <div className="scan-qrcode">
          <p>Or Scan the QR Code</p>
          <div className="qr-code-wrapper">
            <QRCodeSVG
              value={link}
              size={200}
              bgColor="#ffffff"
              fgColor="#000000"
              level="H"
              includeMargin={true}
            />
          </div>
        </div>

        <div className="close-modal-btn" onClick={closeModal}>
          close
          <CloseIcon />
        </div>
      </div>
    </div>
  );
};

export default ShareLinkModal;
