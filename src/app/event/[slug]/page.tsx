'use client';
import React, { Suspense } from 'react';
import Event from '@/components/event';

const EventPage: React.FC = () => {
  return (
    <Suspense fallback={<div className="loading-state">Loading event...</div>}>
      <Event />
    </Suspense>
  );
};

export default EventPage;
