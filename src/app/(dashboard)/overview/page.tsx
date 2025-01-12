'use client';

import { useOverviewData } from '@/hooks/useOverviewData';
import { StatsCards } from './components/StatsCard';
import { PotsList } from './components/PotsList';
import { TransactionsList } from './components/TransactionsList';
import { BudgetDiagram } from './components/BudgetDiagram';
import { RecurringList } from './components/RecurringList';
import { ErrorPage } from '@/components/Ui/ErrorPage';
import { LoadingPage } from '@/components/Ui/LoadingPage';
import { EmptyDataPage } from '@/components/Ui/EmptyDataPage';

export default function OverviewPage() {
  const { data, isLoading, error } = useOverviewData();

  if (isLoading) return <LoadingPage />;

  if (error)
    return (
      <ErrorPage
        title="Oops! Something went wrong"
        description={error.message}
      />
    );

  if (!data) return <EmptyDataPage viewType="overview" />;

  return (
    <div className="space-y-6">
      <StatsCards stats={data.stats} />
      <div className="grid gap-6 lg:grid-cols-5">
        <div className="grid auto-rows-min gap-6 lg:col-span-3">
          <PotsList pots={data.pots} />
          <TransactionsList transactions={data.transactions} />
        </div>
        <div className="grid auto-rows-[1fr_auto] gap-6 lg:col-span-2">
          <BudgetDiagram budgets={data.budgets} />
          <RecurringList transactions={data.transactions} />
        </div>
      </div>
    </div>
  );
}
