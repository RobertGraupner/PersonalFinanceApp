import { Suspense } from 'react';
import { TransactionsContent } from './components/TransactionsContent';
import { LoadingPage } from '@/components/Ui/LoadingPage';

export default function TransactionsPage() {
  return (
    <Suspense fallback={<LoadingPage />}>
      <TransactionsContent />
    </Suspense>
  );
}
