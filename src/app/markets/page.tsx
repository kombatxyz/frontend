import React, { Suspense } from 'react';
import Markets from '@/components/markets';

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Markets />
    </Suspense>
  );
}
