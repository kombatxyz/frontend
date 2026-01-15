import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface OnboardingState {
  hasSeenOnboarding: boolean;
}

// Check localStorage for persisted state (client-side only)
const getInitialState = (): OnboardingState => {
  if (typeof window !== 'undefined') {
    const persisted = localStorage.getItem('kombat_onboarding_complete');
    if (persisted === 'true') {
      return { hasSeenOnboarding: true };
    }
  }
  return { hasSeenOnboarding: false };
};

const initialState: OnboardingState = {
  hasSeenOnboarding: false,
};

const onboardingSlice = createSlice({
  name: 'onboarding',
  initialState,
  reducers: {
    markOnboardingComplete: (state) => {
      state.hasSeenOnboarding = true;
      // Persist to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('kombat_onboarding_complete', 'true');
      }
    },
    resetOnboarding: (state) => {
      state.hasSeenOnboarding = false;
      if (typeof window !== 'undefined') {
        localStorage.removeItem('kombat_onboarding_complete');
      }
    },
    initializeOnboardingState: (state) => {
      // Called on mount to sync with localStorage
      if (typeof window !== 'undefined') {
        const persisted = localStorage.getItem('kombat_onboarding_complete');
        state.hasSeenOnboarding = persisted === 'true';
      }
    },
  },
});

export const {
  markOnboardingComplete,
  resetOnboarding,
  initializeOnboardingState,
} = onboardingSlice.actions;
export default onboardingSlice.reducer;
