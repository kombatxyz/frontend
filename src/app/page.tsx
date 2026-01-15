'use client';
import Markets from '@/components/markets';
import Onboarding from '@/components/onboarding';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import {
  markOnboardingComplete,
  initializeOnboardingState,
} from '@/redux/slice/onboardingSlice';
import React, { Suspense, useEffect, useState } from 'react';

export default function Home() {
  const dispatch = useDispatch();
  const hasSeenOnboarding = useSelector(
    (state: RootState) => state.onboarding.hasSeenOnboarding,
  );
  const [isMounted, setIsMounted] = useState(false);

  // Initialize onboarding state from localStorage on mount
  useEffect(() => {
    dispatch(initializeOnboardingState());
    setIsMounted(true);
  }, [dispatch]);

  const handleOnboardingComplete = () => {
    dispatch(markOnboardingComplete());
  };

  return (
    <div>
      <Suspense fallback={<div>Loading markets...</div>}>
        <Markets />
      </Suspense>
      {isMounted && !hasSeenOnboarding && (
        <Onboarding onComplete={handleOnboardingComplete} />
      )}
    </div>
  );
}
