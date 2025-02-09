import { Suspense } from 'react';
import { OverviewContent } from './components/OverviewContent';
import { LoadingPage } from '@/components/Ui/LoadingPage';

export default function OverviewPage() {
  return (
    <Suspense fallback={<LoadingPage />}>
      <OverviewContent />
    </Suspense>
  );
}
