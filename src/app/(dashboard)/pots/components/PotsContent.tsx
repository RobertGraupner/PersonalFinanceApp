'use client';

import { useState } from 'react';
import { usePots } from '@/hooks/usePots';
import {
  useDeletePot,
  useEditPot,
  useAddPot,
  useMoneyOperation,
} from '@/hooks/usePots';
import { ErrorPage } from '@/components/Ui/ErrorPage';
import { EmptyDataPage } from '@/components/Ui/EmptyDataPage';
import { PotsList } from './PotsList';
import { PotsSkeleton } from './PotsSkeleton';
import { PageHeader } from '@/components/Ui/PageHeader';
import { DeleteModal } from '@/components/Ui/DeleteModal';
import { PotFormModal } from './PotFormModal';
import { PotMoneyOperationModal } from './PotMoneyOperationModal';
import { IPot } from '@/lib/models/Pot';
import { ModalState, ModalType } from '@/types/pots';
import { useOverviewData } from '@/hooks/useOverviewData';
export function PotsContent() {
  const [modalState, setModalState] = useState<ModalState>({
    type: null,
    pot: null,
  });

  const { data, isLoading, error } = usePots();
  const { data: overviewData } = useOverviewData();
  const deletePot = useDeletePot();
  const editPot = useEditPot();
  const addPot = useAddPot();
  const moneyOperation = useMoneyOperation();

  function openFormModal(type: 'add' | 'edit', pot?: IPot) {
    setModalState({ type, pot: pot || null });
  }

  function openDeleteModal(pot: IPot) {
    setModalState({ type: 'delete', pot });
  }

  function openOperationModal(type: 'addMoney' | 'withdraw', pot: IPot) {
    setModalState({ type, pot });
  }

  function handleAction(type: ModalType, pot: IPot) {
    if (type === 'delete') {
      openDeleteModal(pot);
    } else if (type === 'add' || type === 'edit') {
      openFormModal(type, pot);
    } else if (type === 'addMoney' || type === 'withdraw') {
      openOperationModal(type, pot);
    }
  }

  const handleFormSubmit = async (formData: Partial<IPot>) => {
    try {
      if (modalState.type === 'edit') {
        if (!modalState.pot?._id) return;
        await editPot.mutateAsync({ id: modalState.pot._id, ...formData });
      } else {
        await addPot.mutateAsync(formData);
      }
      handleCloseModal();
    } catch (err) {
      console.error(
        `Failed to ${modalState.type === 'edit' ? 'edit' : 'add'} pot:`,
        err
      );
    }
  };

  const handleDeletePot = async () => {
    if (!modalState.pot?._id) return;
    try {
      await deletePot.mutateAsync(modalState.pot._id);
      handleCloseModal();
    } catch (err) {
      console.error('Failed to delete pot:', err);
    }
  };

  const handleMoneyOperation = async (amount: number) => {
    if (!modalState.pot?._id || !modalState.type) return;
    try {
      await moneyOperation.mutateAsync({
        potId: modalState.pot._id,
        amount,
        operation: modalState.type as 'addMoney' | 'withdraw',
      });
      handleCloseModal();
    } catch (err) {
      console.error('Failed to process money operation:', err);
    }
  };

  const handleCloseModal = () => {
    setModalState({ type: null, pot: null });
  };

  const isEditMode = modalState.type === 'edit';
  const isFormModalOpen = modalState.type === 'add' || isEditMode;
  const isMoneyOperationModalOpen =
    modalState.type === 'addMoney' || modalState.type === 'withdraw';

  if (error)
    return (
      <ErrorPage
        title="Oops! Something went wrong"
        description={error.message}
      />
    );

  if (isLoading) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Pots"
          addButtonLabel="+ Add New Pot"
          onAddClick={() => {}}
        />
        <PotsSkeleton />
      </div>
    );
  }

  if (!data || data.data.length === 0)
    return (
      <>
        <EmptyDataPage
          viewType="pots"
          onAddClick={() => openFormModal('add')}
        />
        <PotFormModal
          isOpen={isFormModalOpen}
          onClose={handleCloseModal}
          onSubmit={handleFormSubmit}
          isLoading={isEditMode ? editPot.isPending : addPot.isPending}
          type={isEditMode ? 'edit' : 'add'}
          pot={modalState.pot}
        />
      </>
    );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Pots"
        addButtonLabel="+ Add New Pot"
        onAddClick={() => openFormModal('add')}
      />
      <PotsList pots={data.data} onAction={handleAction} />

      <DeleteModal
        isOpen={modalState.type === 'delete'}
        onClose={handleCloseModal}
        onConfirm={handleDeletePot}
        isDeleting={deletePot.isPending}
        itemName={modalState.pot?.name || ''}
        itemType="pot"
      />

      <PotFormModal
        isOpen={isFormModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleFormSubmit}
        isLoading={isEditMode ? editPot.isPending : addPot.isPending}
        type={isEditMode ? 'edit' : 'add'}
        pot={modalState.pot}
      />

      <PotMoneyOperationModal
        isOpen={isMoneyOperationModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleMoneyOperation}
        isProcessing={moneyOperation.isPending}
        type={modalState.type as 'addMoney' | 'withdraw'}
        pot={modalState.pot as IPot}
        userBalance={overviewData?.stats.current || 0}
      />
    </div>
  );
}
