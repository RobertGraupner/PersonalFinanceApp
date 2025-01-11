'use client';

import { useOverviewData } from '@/hooks/useOverviewData';
import { StatsCards } from './components/StatsCard';
import { PotsList } from './components/PotsList';
import { TransactionsList } from './components/TransactionsList';
import { ErrorPage } from '@/components/Ui/ErrorPage';

export default function OverviewPage() {
  const { data, isLoading, error } = useOverviewData();

  if (isLoading) return <div>Loading...</div>;
  if (error)
    return (
      <ErrorPage
        title="Oops! Something went wrong"
        description={error.message}
      />
    );
  if (!data) return null;

  return (
    <div className="space-y-6">
      <StatsCards stats={data.stats} />

      {/* Placeholder dla pozostałych sekcji */}
      <div className="grid gap-6 lg:grid-cols-5">
        <div className="space-y-6 lg:col-span-3">
          <PotsList pots={data.pots} />
          <TransactionsList transactions={data.transactions} />
        </div>
        <div className="space-y-6 lg:col-span-2">
          {/* Tu będzie BudgetDonut */}
          {/* Tu będzie RecurringBills */}
        </div>
      </div>
    </div>
  );
}
