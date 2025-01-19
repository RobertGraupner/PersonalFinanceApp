'use client';

import { useTransactions } from '@/hooks/useTransactions';
import { TransactionsTable } from './components/TransactionsTable';
import { TransactionsHeader } from './components/TransactionsHeader';
import { LoadingPage } from '@/components/Ui/LoadingPage';
import { ErrorPage } from '@/components/Ui/ErrorPage';
import { EmptyDataPage } from '@/components/Ui/EmptyDataPage';
import { ContentCard } from '@/components/Ui/ContentCard';
import { Pagination } from './components/Pagination';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

export default function TransactionsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { data, isLoading, error } = useTransactions();

  if (isLoading) return <LoadingPage />;

  if (error) {
    return (
      <ErrorPage
        title="Oops! Something went wrong"
        description={error.message}
      />
    );
  }

  if (!data?.data) return <EmptyDataPage viewType="transactions" />;

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    const searchQuery = searchParams.get('search');
    if (searchQuery) {
      params.set('search', searchQuery);
    }
    router.push(`/transactions?${params.toString()}`);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-preset-1">Transactions</h1>
      <ContentCard>
        <TransactionsHeader />
        <TransactionsTable transactions={data.data} />
        {data.pagination && (
          <Pagination
            currentPage={data.pagination.currentPage}
            totalPages={data.pagination.pages}
            onPageChange={handlePageChange}
          />
        )}
      </ContentCard>
    </div>
  );
}
