'use client';

import { useState } from 'react';
import { useBudgets, useAddBudget, useEditBudget } from '@/hooks/useBudgets';
import { useDeleteBudget } from '@/hooks/useBudgets';
import { ErrorPage } from '@/components/Ui/ErrorPage';
import { EmptyDataPage } from '@/components/Ui/EmptyDataPage';
import { PageHeader } from '@/components/Ui/PageHeader';
import { BudgetsSummary } from './BudgetsSummary';
import { BudgetsSkeleton } from './BudgetsSkeleton';
import { BudgetsList } from './BudgetsList';
import { ModalState, ModalType } from '@/types/budgets';
import { IBudget } from '@/lib/models/Budget';
import { DeleteModal } from '@/components/Ui/DeleteModal';
import { BudgetFormModal } from './BudgetFormModal';
import type { BudgetFormData } from '@/types/budgets';

export function BudgetsContent() {
  const [modalState, setModalState] = useState<ModalState>({
    type: null,
    budget: null,
  });

  const { data, isLoading, error } = useBudgets();
  const deleteBudget = useDeleteBudget();
  const addBudget = useAddBudget();
  const editBudget = useEditBudget();

  function openFormModal(type: 'add' | 'edit', budget?: IBudget) {
    setModalState({ type, budget: budget || null });
  }

  function openDeleteModal(budget: IBudget) {
    setModalState({ type: 'delete', budget });
  }

  function handleAction(type: ModalType, budget: IBudget) {
    if (type === 'delete') {
      openDeleteModal(budget);
    } else if (type === 'add' || type === 'edit') {
      openFormModal(type, budget);
    } else {
      console.log('Unhandled modal type:', type);
    }
  }

  const handleFormSubmit = async (formData: BudgetFormData) => {
    try {
      if (modalState.type === 'edit' && modalState.budget?._id) {
        await editBudget.mutateAsync({
          id: modalState.budget._id,
          ...formData,
        });
      } else {
        await addBudget.mutateAsync(formData);
      }
      handleCloseModal();
    } catch (error) {
      console.error('Failed to save budget:', error);
    }
  };

  const handleDeleteBudget = async () => {
    if (!modalState.budget?._id) return;
    try {
      await deleteBudget.mutateAsync(modalState.budget._id);
      handleCloseModal();
    } catch (error) {
      console.error('Failed to delete budget:', error);
    }
  };

  const handleCloseModal = () => {
    setModalState({ type: null, budget: null });
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
          title="Budgets"
          addButtonLabel="+ Add New Budget"
          onAddClick={() => {}}
        />
        <BudgetsSkeleton />
      </div>
    );
  }

  if (!data?.data || data.data.length === 0) {
    return <EmptyDataPage viewType="budgets" />;
  }

  const isEditMode = modalState.type === 'edit';
  const isFormModalOpen = modalState.type === 'add' || isEditMode;

  const totalSpent = data.data.reduce((acc, budget) => {
    const categorySpent = data.spent?.[budget.category]?.spent || 0;
    return acc + categorySpent;
  }, 0);

  const totalLimit = data.data.reduce((acc, budget) => acc + budget.maximum, 0);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Budgets"
        addButtonLabel="+ Add New Budget"
        onAddClick={() => openFormModal('add')}
      />

      <div className="grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <BudgetsSummary
            total={totalSpent}
            limit={totalLimit}
            budgets={data.data}
            spent={data.spent}
          />
        </div>

        <BudgetsList
          budgets={data.data}
          spentData={data.spent}
          onAction={handleAction}
        />

        <DeleteModal
          isOpen={modalState.type === 'delete'}
          onClose={handleCloseModal}
          onConfirm={handleDeleteBudget}
          isDeleting={deleteBudget.isPending}
          itemName={modalState.budget?.category || ''}
          itemType="budget"
        />

        <BudgetFormModal
          isOpen={isFormModalOpen}
          onClose={handleCloseModal}
          onSubmit={handleFormSubmit}
          isLoading={isEditMode ? editBudget.isPending : addBudget.isPending}
          type={isEditMode ? 'edit' : 'add'}
          budget={modalState.budget}
        />
      </div>
    </div>
  );
}
