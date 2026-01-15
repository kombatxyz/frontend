'use client';
import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { CloseIcon, ArrowLeftIcon, ArrowRight2Icon } from '@/assets/svg';
import './style.scss';
import OnboardOne from '@/assets/images/onboard-1.png';
import OnboardTwo from '@/assets/images/onboard-2.png';
import OnboardThree from '@/assets/images/onboard-3.png';
import SkipBtn from '@/assets/images/skip-btn.svg';

interface OnboardingStep {
  id: number;
  title: string;
  description: string;
  highlightType: 'wallet' | 'market';
  onBoardBg: any;
}

const ONBOARDING_STEPS: OnboardingStep[] = [
  {
    id: 1,
    title: 'Your wallet. Your funds.',
    description:
      'Connect your wallet or signup with email. Funds stay non-custodial and are managed by smart contracts—no deposits.',
    highlightType: 'wallet',
    onBoardBg: OnboardOne,
  },
  {
    id: 2,
    title: 'Predict or Challenge',
    description:
      'Predict the outcomes of real-world events or challenge other users in trustless peer-to-peer wagers',
    highlightType: 'market',
    onBoardBg: OnboardTwo,
  },
  {
    id: 3,
    title: 'Stake, Resolve, Win',
    description:
      'Predict the outcomes of real-world events or challenge other users in trustless P2P wagers.',
    highlightType: 'market',
    onBoardBg: OnboardThree,
  },
];

interface OnboardingProps {
  onComplete: () => void;
}

const SLIDE_DURATION = 10000; 

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [timerKey, setTimerKey] = useState(0); // Used to reset timer

  const handleNext = useCallback(() => {
    if (currentStep < ONBOARDING_STEPS.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      // Last step - complete onboarding
      setIsVisible(false);
      onComplete();
    }
  }, [currentStep, onComplete]);

  const handlePrev = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
      setTimerKey((prev) => prev + 1); // Reset timer on manual navigation
    }
  }, [currentStep]);

  const handleManualNext = useCallback(() => {
    setTimerKey((prev) => prev + 1); // Reset timer on manual navigation
    handleNext();
  }, [handleNext]);

  const handleSkip = useCallback(() => {
    setIsVisible(false);
    onComplete();
  }, [onComplete]);

  // Auto-advance timer - 5 seconds per slide
  useEffect(() => {
    if (!isVisible) return;

    const timer = setTimeout(() => {
      handleNext();
    }, SLIDE_DURATION);

    return () => clearTimeout(timer);
  }, [currentStep, timerKey, isVisible, handleNext]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        handleManualNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'Escape') {
        handleSkip();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleManualNext, handlePrev, handleSkip]);

  if (!isVisible) return null;

  const step = ONBOARDING_STEPS[currentStep];

  return (
    <div className="onboarding-overlay">
      <div className="skip-tour-btn-container">
        <button className="skip-tour-btn" onClick={handleSkip}>
          <Image src={SkipBtn} alt="skip" />
          <span> Skip tour</span>
        </button>
      </div>
      <div className="step-dots">
        {ONBOARDING_STEPS.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentStep ? 'active' : ''}`}
          />
        ))}
      </div>

      {/* Main content container */}
      <div className="onboarding-content">
        {/* Highlight card */}

        {/* Navigation arrows */}
        <button
          className={`nav-arrow nav-arrow-left ${
            currentStep === 0 ? 'disabled' : ''
          }`}
          onClick={handlePrev}
          disabled={currentStep === 0}
          aria-label="Previous step"
        >
          <span>
            <ArrowRight2Icon />
          </span>
        </button>

        <button
          className="nav-arrow nav-arrow-right"
          onClick={handleManualNext}
          aria-label={
            currentStep === ONBOARDING_STEPS.length - 1
              ? 'Finish tour'
              : 'Next step'
          }
        >
          <span>
            <ArrowLeftIcon />
          </span>
        </button>

        {/* Step text content */}
        <div className="onboarding-step">
          <div className="onboarding-text">
            <h2 className="step-title">{step.title}</h2>
            <p className="step-description">{step.description}</p>
          </div>
          <Image
            src={step.onBoardBg}
            alt="onboarding"
            width={460}
            height={477}
          />
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
