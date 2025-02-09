'use client';

import { useOverviewData } from '@/hooks/useOverviewData';
import { StatsCards } from './StatsCard';
import { PotsList } from './PotsList';
import { TransactionsList } from './TransactionsList';
import { BudgetDiagram } from './BudgetDiagram';
import { RecurringList } from './RecurringList';
import { ErrorPage } from '@/components/Ui/ErrorPage';
import { EmptyDataPage } from '@/components/Ui/EmptyDataPage';
import { OverviewSkeleton } from './OverviewSkeleton';
export function OverviewContent() {
  const { data, error, isLoading } = useOverviewData();

  if (error) {
    return (
      <ErrorPage
        title="Oops! Something went wrong"
        description={error.message}
      />
    );
  }

  if (isLoading) {
    return <OverviewSkeleton />;
  }

  if (
    !data ||
    (data.budgets.length === 0 &&
      data.pots.length === 0 &&
      data.transactions.length === 0 &&
      data.recurring.length === 0)
  )
    return <EmptyDataPage viewType="overview" />;

  return (
    <div className="space-y-6">
      <StatsCards stats={data.stats} />
      <div className="grid gap-6 xl:grid-cols-5">
        <div className="grid w-full auto-rows-min gap-6 xl:col-span-3">
          {data.pots.length > 0 && <PotsList pots={data.pots} />}
          {data.transactions.length > 0 && (
            <TransactionsList transactions={data.transactions} />
          )}
        </div>
        <div className="grid auto-rows-[1fr_auto] gap-6 xl:col-span-2">
          {data.budgets.length > 0 && (
            <BudgetDiagram budgets={data.budgets} spent={data.spent} />
          )}
          {data.recurring.length > 0 && (
            <RecurringList recurring={data.recurring} />
          )}
        </div>
      </div>
    </div>
  );
}
