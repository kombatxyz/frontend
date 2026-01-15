import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import { CloseIcon, EmptyNotificationIcon } from '@/assets/svg';

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationModal: React.FC<NotificationModalProps> = ({
  isOpen,
  onClose,
}) => {
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const renderNotificationContent = () => {
    return (
      <div className="empty-state">
        <EmptyNotificationIcon />
        <p>No notifications available</p>
      </div>
    );
  };

  return (
    <div className="notification-modal">
      <div className="notification-modal-content" ref={modalRef}>
        <main>
          <div className="title">
            <h3>Notifications</h3>
            <button title="Close" onClick={onClose}>
              <CloseIcon />
            </button>
          </div>
          <div className="notifications-list">
            {renderNotificationContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default NotificationModal;
