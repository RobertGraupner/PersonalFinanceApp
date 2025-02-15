'use client';

import { useState } from 'react';
import {
  useTransactions,
  useAddTransaction,
  useEditTransaction,
  useDeleteTransaction,
} from '@/hooks/useTransactions';
import { TransactionsTable } from './TransactionsTable';
import { TransactionsHeader } from './TransactionsHeader';
import { ErrorPage } from '@/components/Ui/ErrorPage';
import { EmptyDataPage } from '@/components/Ui/EmptyDataPage';
import { ContentCard } from '@/components/Ui/ContentCard';
import { Pagination } from './Pagination';
import { TransactionsSkeleton } from './TransactionsSkeleton';
import { PageHeader } from '@/components/Ui/PageHeader';
import { TransactionFormModal } from './TransactionFormModal';
import { EmptyTableState } from '@/components/Ui/EmptyTableState';
import { DeleteModal } from '@/components/Ui/DeleteModal';
import { useSearchParams } from 'next/navigation';
import type { TransactionFormData } from '@/types/transactions';
import type { ITransaction } from '@/lib/models/Transaction';
import type { ModalState } from '@/types/transactions';

export function TransactionsContent() {
  const [modalState, setModalState] = useState<ModalState>({
    type: null,
    transaction: null,
  });

  const searchParams = useSearchParams();
  const { data, isLoading, error } = useTransactions();
  const addTransaction = useAddTransaction();
  const editTransaction = useEditTransaction();
  const deleteTransaction = useDeleteTransaction();

  const hasFilters = searchParams.toString().length > 0;

  function openFormModal(type: 'add' | 'edit', transaction?: ITransaction) {
    setModalState({ type, transaction: transaction || null });
  }

  function openDeleteModal(transaction: ITransaction) {
    setModalState({ type: 'delete', transaction });
  }

  function handleAction(type: 'delete' | 'edit', transaction: ITransaction) {
    if (type === 'delete') {
      openDeleteModal(transaction);
    } else if (type === 'edit') {
      openFormModal('edit', transaction);
    }
  }

  const handleFormSubmit = async (formData: TransactionFormData) => {
    try {
      if (modalState.type === 'edit' && modalState.transaction?._id) {
        await editTransaction.mutateAsync({
          id: modalState.transaction._id,
          ...formData,
          amount: parseFloat(formData.amount.replace(',', '.')),
        });
      } else {
        await addTransaction.mutateAsync(formData);
      }
      handleCloseModal();
    } catch (error) {
      console.error('Failed to save transaction:', error);
    }
  };

  const handleDeleteTransaction = async () => {
    if (!modalState.transaction?._id) return;
    try {
      await deleteTransaction.mutateAsync(modalState.transaction._id);
      handleCloseModal();
    } catch (error) {
      console.error('Failed to delete transaction:', error);
    }
  };

  const handleCloseModal = () => {
    setModalState({ type: null, transaction: null });
  };

  const isEditMode = modalState.type === 'edit';
  const isFormModalOpen = modalState.type === 'add' || isEditMode;

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
          onAddClick={() => openFormModal('add')}
        />
        <ContentCard>
          <TransactionsHeader />
          <TransactionsSkeleton />
        </ContentCard>
      </div>
    );
  }

  if (!data?.data || (data.data.length === 0 && !hasFilters)) {
    return (
      <>
        <EmptyDataPage
          viewType="transactions"
          onAddClick={() => openFormModal('add')}
        />
        <TransactionFormModal
          isOpen={isFormModalOpen}
          onClose={handleCloseModal}
          onSubmit={handleFormSubmit}
          isLoading={
            isEditMode ? editTransaction.isPending : addTransaction.isPending
          }
          type={isEditMode ? 'edit' : 'add'}
          transaction={modalState.transaction}
        />
      </>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Transactions"
        addButtonLabel="+ Add New Transaction"
        onAddClick={() => openFormModal('add')}
      />
      <ContentCard>
        <TransactionsHeader />
        {data?.data && data.data.length > 0 ? (
          <>
            <TransactionsTable
              transactions={data.data}
              onAction={(type, transaction) => handleAction(type, transaction)}
            />
            {data.pagination && (
              <Pagination
                currentPage={data.pagination.currentPage!}
                totalPages={data.pagination.pages!}
              />
            )}
          </>
        ) : (
          <EmptyTableState
            title="No transactions found"
            description="Try changing the search criteria or filters"
          />
        )}
      </ContentCard>

      <DeleteModal
        isOpen={modalState.type === 'delete'}
        onClose={handleCloseModal}
        onConfirm={handleDeleteTransaction}
        isDeleting={deleteTransaction.isPending}
        itemName={modalState.transaction?.name || ''}
        itemType="transaction"
      />

      <TransactionFormModal
        isOpen={isFormModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleFormSubmit}
        isLoading={
          isEditMode ? editTransaction.isPending : addTransaction.isPending
        }
        type={isEditMode ? 'edit' : 'add'}
        transaction={modalState.transaction}
      />
    </div>
  );
}
