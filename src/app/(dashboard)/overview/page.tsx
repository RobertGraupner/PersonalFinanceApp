'use client';

import { useOverviewData } from '@/hooks/useOverviewData';
import { StatsCards } from './components/StatsCard';
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
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-6">
          {/* Tu będzie PotsList */}
          {/* Tu będzie TransactionsList */}
        </div>
        <div className="space-y-6">
          {/* Tu będzie BudgetDonut */}
          {/* Tu będzie RecurringBills */}
        </div>
      </div>
    </div>
  );
}
