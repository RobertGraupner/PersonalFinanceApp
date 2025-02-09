'use client';

import { useState } from 'react';
import { useTransactions, useAddTransaction } from '@/hooks/useTransactions';
import { TransactionsTable } from './TransactionsTable';
import { TransactionsHeader } from './TransactionsHeader';
import { ErrorPage } from '@/components/Ui/ErrorPage';
import { EmptyDataPage } from '@/components/Ui/EmptyDataPage';
import { ContentCard } from '@/components/Ui/ContentCard';
import { Pagination } from './Pagination';
import { TransactionsSkeleton } from './TransactionsSkeleton';
import { PageHeader } from '@/components/Ui/PageHeader';
import { TransactionFormModal } from './TransactionFormModal';
import type { TransactionFormData } from '@/types/transactions';

export function TransactionsContent() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, isLoading, error } = useTransactions();
  const addTransaction = useAddTransaction();

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleAddTransaction = async (data: TransactionFormData) => {
    try {
      await addTransaction.mutateAsync(data);
      handleCloseModal();
    } catch (error) {
      console.error('Failed to add transaction:', error);
    }
  };

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
        <PageHeader
          title="Transactions"
          addButtonLabel="+ Add New Transaction"
          onAddClick={handleOpenModal}
        />
        <ContentCard>
          <TransactionsHeader />
          <TransactionsSkeleton />
        </ContentCard>
      </div>
    );
  }

  if (!data?.data || data.data.length === 0) {
    return (
      <>
        <EmptyDataPage viewType="transactions" onAddClick={handleOpenModal} />
        <TransactionFormModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSubmit={handleAddTransaction}
          isLoading={addTransaction.isPending}
        />
      </>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Transactions"
        addButtonLabel="+ Add New Transaction"
        onAddClick={handleOpenModal}
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

      <TransactionFormModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleAddTransaction}
        isLoading={addTransaction.isPending}
      />
    </div>
  );
}
