'use client';

import { useTransactions } from '@/hooks/useTransactions';
import { TransactionsTable } from './TransactionsTable';
import { TransactionsHeader } from './TransactionsHeader';
import { ErrorPage } from '@/components/Ui/ErrorPage';
import { EmptyDataPage } from '@/components/Ui/EmptyDataPage';
import { ContentCard } from '@/components/Ui/ContentCard';
import { Pagination } from './Pagination';
import { TransactionsSkeleton } from './TransactionsSkeleton';
import { PageHeader } from '@/components/Ui/PageHeader';

export function TransactionsContent() {
  const { data, isLoading, error } = useTransactions();

  if (error) {
    return (
      <ErrorPage
        title="Oops! Something went wrong"
        description={error.message}
      />
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <h1 className="text-preset-1">Transactions</h1>
        <ContentCard>
          <TransactionsHeader />
          <TransactionsSkeleton />
        </ContentCard>
      </div>
    );
  }

  if (!data?.data || data.data.length === 0) {
    return <EmptyDataPage viewType="transactions" />;
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Transactions"
        addButtonLabel="+ Add New Transaction"
        onAddClick={() => console.log('+ Add new transaction')}
      />
      <ContentCard>
        <TransactionsHeader />
        <TransactionsTable transactions={data.data} />
        {data.pagination && (
          <Pagination
            currentPage={data.pagination.currentPage!}
            totalPages={data.pagination.pages!}
          />
        )}
      </ContentCard>
    </div>
  );
}
