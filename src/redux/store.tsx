import { configureStore } from '@reduxjs/toolkit';
import bookmarkReducer from './slice/bookmarkSlice';
import userReducer from './slice/userSlice';
import onboardingReducer from './slice/onboardingSlice';

export const store = configureStore({
  reducer: {
    bookmarks: bookmarkReducer,
    user: userReducer,
    onboarding: onboardingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
