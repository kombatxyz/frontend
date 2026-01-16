'use client';
import React, { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import FundWalletModal from '../modals/fund-wallet-modal';
import Image from 'next/image';
import Link from 'next/link';
import {
  DropdownIcon,
  LogoIcon,
  NavLinkIcon,
  WalletIcon,
  NotificationIcon,
  MenuIcon,
} from '@/assets/svg';
import NotificationModal from '../modals/notification';
import AvatarPlaceholder from '@/assets/images/avatar-placeholder.png';
import { useDynamicContext } from '@dynamic-labs/sdk-react-core';
import KombatLogo from '@/assets/images/Kombat.svg';
import { useBalance } from 'wagmi';


const Navbar: React.FC = () => {
  const { setShowAuthFlow, user, handleLogOut, primaryWallet } =
    useDynamicContext();
  const pathname = usePathname();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isNotificationModalOpen, setNotificationModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const { data: balanceData } = useBalance({
    address: primaryWallet?.address as `0x${string}`,
    chainId: 5003,
    query: {
      enabled: !!primaryWallet?.address,
    },
  });

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const notificationModalRef = useRef<HTMLDivElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const isActive = pathname === '/' || pathname.startsWith('/markets');

  const handleNotificationModalToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setNotificationModalOpen((prev) => !prev);
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const handleNotificationModalClickOutside = (event: MouseEvent) => {
      // ... existing code ...
      if (
        notificationModalRef.current &&
        !notificationModalRef.current.contains(event.target as Node)
      ) {
        setNotificationModalOpen(false);
      }
    };

    if (isNotificationModalOpen) {
      document.addEventListener(
        'mousedown',
        handleNotificationModalClickOutside,
      );
    }

    return () => {
      document.removeEventListener(
        'mousedown',
        handleNotificationModalClickOutside,
      );
    };
  }, [isNotificationModalOpen]);

  const handleDropdownToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDropdownOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleDropdownClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleDropdownClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleDropdownClickOutside);
    };
  }, [isDropdownOpen]);

  // ...

  return (
    <div className="navbar-container">
      <div className="navbar-content">
        <Link href="/">
          <Image src={KombatLogo} alt="" className="logo" />
        </Link>

        <div className="nav-links">
          <Link href="/markets" className={isActive ? 'active' : ''}>
            <NavLinkIcon />
            Markets
          </Link>
          <Link href="/p2p" className={pathname === '/p2p' ? 'active' : ''}>
            <NavLinkIcon />
            P2P
          </Link>
        </div>

        {isMounted && primaryWallet && (
          <div className="cta">
            <div
              className="wallet-balance"
              onClick={() => setIsModalOpen(true)}
            >
              <WalletIcon />
              <span>
                {balanceData && balanceData.value !== undefined
                  ? `${(
                      Number(balanceData.value) /
                      10 ** balanceData.decimals
                    ).toFixed(4)} ${balanceData.symbol}`
                  : '0.0000 MNT'}
              </span>
            </div>

            <div
              className="fund-wallet-btn"
              title="Notification"
              onClick={handleNotificationModalToggle}
            >
              <NotificationIcon />
            </div>

            <button
              className="profile-settings-dropdown"
              title="profile-settings"
              onClick={handleDropdownToggle}
            >
              <Image
                id="user-icon"
                src={AvatarPlaceholder}
                alt="Profile"
                width={42}
                height={42}
              />
              <DropdownIcon />
            </button>

            <button
              className="menu-icon"
              title="menu"
              onClick={handleDropdownToggle}
            >
              <MenuIcon />
            </button>
          </div>
        )}

        {isMounted && !primaryWallet && (
          <div className="authentication">
            <button id="login-btn" onClick={() => setShowAuthFlow(true)}>
              Login
            </button>
            <button id="signup-btn" onClick={() => setShowAuthFlow(true)}>
              Signup
            </button>
          </div>
        )}

        <NotificationModal
          isOpen={isNotificationModalOpen}
          onClose={() => setNotificationModalOpen(false)}
        />

        {isDropdownOpen && (
          <div className="notification-modal">
            <div className="notification-modal-content">
              <div ref={dropdownRef} className="profile-settings-modal">
                <div className="nav-links-mobile">
                  <Link
                    href="/overview"
                    className={pathname === '/' ? 'active' : ''}
                    onClick={() => setDropdownOpen(false)}
                  >
                    <NavLinkIcon />
                    Markets
                  </Link>
                  <Link
                    href="/wallet"
                    className={pathname === '/p2p' ? 'active' : ''}
                    onClick={() => setDropdownOpen(false)}
                  >
                    <NavLinkIcon />
                    P2P
                  </Link>
                </div>
                <Link
                  href={
                    primaryWallet?.address
                      ? `/profile/${primaryWallet.address}`
                      : '#'
                  }
                  onClick={() => setDropdownOpen(false)}
                >
                  <button>Profile</button>
                </Link>
                <Link href="/wallet" onClick={() => setDropdownOpen(false)}>
                  <button id="logout-btn">Wallet</button>
                </Link>
                <button onClick={() => setDropdownOpen(false)}>Support</button>

                <button
                  id="logout-btn"
                  onClick={() => {
                    handleLogOut();
                    setDropdownOpen(false);
                  }}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>


      {isModalOpen && <FundWalletModal closeModal={closeModal} />}
    </div>
  );
};

export default Navbar;
