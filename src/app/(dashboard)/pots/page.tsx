'use client';

import { Suspense } from 'react';
import { PotsContent } from './components/PotsContent';
import { LoadingPage } from '@/components/Ui/LoadingPage';

export default function PotsPage() {
  return (
    <Suspense fallback={<LoadingPage />}>
      <PotsContent />
    </Suspense>
  );
}
