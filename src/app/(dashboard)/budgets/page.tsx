'use client';

import { Suspense } from 'react';
import { BudgetsContent } from './components/BudgetsContent';
import { LoadingPage } from '@/components/Ui/LoadingPage';

export default function BudgetsPage() {
  return (
    <Suspense fallback={<LoadingPage />}>
      <BudgetsContent />
    </Suspense>
  );
}
