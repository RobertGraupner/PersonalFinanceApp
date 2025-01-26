import { Suspense } from 'react';
import { RecurringContent } from './components/RecurringContent';
import { LoadingPage } from '@/components/Ui/LoadingPage';

export default function TransactionsPage() {
  return (
    <Suspense fallback={<LoadingPage />}>
      <RecurringContent />
    </Suspense>
  );
}
