'use client';

import { useRecurringBills } from '@/hooks/useRecurring';
import { RecurringTable } from './RecurringTable';
import { RecurringHeader } from './RecurringHeader';
import { ErrorPage } from '@/components/Ui/ErrorPage';
import { EmptyDataPage } from '@/components/Ui/EmptyDataPage';
import { ContentCard } from '@/components/Ui/ContentCard';
import { SummaryCard } from './SummaryCard';
import { TotalBillsCard } from './TotalBillsCard';
import { RecurringSkeleton } from './RecurringSkeleton';
import { EmptyTableState } from '@/components/Ui/EmptyTableState';
import { useSearchParams } from 'next/navigation';
export function RecurringContent() {
  const { data, isLoading, error } = useRecurringBills();
  const searchParams = useSearchParams();

  const hasFilters = searchParams.toString().length > 0;

  if (error) {
    return (
      <ErrorPage
        title="Oops! Something went wrong"
        description={error.message}
      />
    );
  }

  if (isLoading) {
    return <RecurringSkeleton />;
  }

  if (!data?.data || (data.data.length === 0 && !hasFilters)) {
    return (
      <>
        <EmptyDataPage viewType="recurring" />
        <EmptyTableState
          title="No recurring bills found"
          description="Try adding a new recurring bill"
        />
      </>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-preset-1">Recurring Bills</h1>
      <div className="grid gap-6 xl:grid-cols-3">
        <div className="grid w-full auto-rows-min gap-6 md:grid-cols-2 xl:grid-cols-1">
          <TotalBillsCard total={data.stats.total} />
          <SummaryCard items={data.stats.summary} />
        </div>
        <div className="xl:col-span-2">
          <ContentCard>
            <RecurringHeader />
            {data?.data && data.data.length > 0 ? (
              <>
                <RecurringTable transactions={data.data} />
              </>
            ) : (
              <EmptyTableState
                title="No recurring bills found"
                description="Try adding a new recurring bill"
              />
            )}
          </ContentCard>
        </div>
      </div>
    </div>
  );
}
