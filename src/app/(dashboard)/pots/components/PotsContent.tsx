'use client';

import { useState } from 'react';
import { usePots } from '@/hooks/usePots';
import { useDeletePot } from '@/hooks/usePots';
import { ErrorPage } from '@/components/Ui/ErrorPage';
import { EmptyDataPage } from '@/components/Ui/EmptyDataPage';
import { PotsList } from './PotsList';
import { PotsSkeleton } from './PotsSkeleton';
import { PageHeader } from '@/components/Ui/PageHeader';
import { DeleteModal } from '@/components/Ui/DeleteModal';
import { IPot } from '@/lib/models/Pot';
import { ModalState } from '@/types/pots';

export function PotsContent() {
  const [modalState, setModalState] = useState<ModalState>({
    type: null,
    pot: null,
  });

  const { data, isLoading, error } = usePots();
  const deletePot = useDeletePot();

  const handleOpenModal = (pot: IPot) => {
    setModalState({ type: 'delete', pot });
  };

  const handleDeletePot = async () => {
    if (!modalState.pot?._id) return;

    try {
      await deletePot.mutateAsync(modalState.pot._id);
      handleCloseModal();
    } catch (error) {
      console.error('Failed to delete pot:', error);
    }
  };

  const handleCloseModal = () => {
    setModalState({ type: null, pot: null });
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
          title="Pots"
          addButtonLabel="+ Add New Pot"
          onAddClick={() => {}}
        />
        <PotsSkeleton />
      </div>
    );
  }

  if (!data || data.data.length === 0) {
    return <EmptyDataPage viewType="pots" />;
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Pots"
        addButtonLabel="+ Add New Pot"
        onAddClick={() => console.log('Add new pot')}
      />

      {data?.data && <PotsList pots={data.data} onDelete={handleOpenModal} />}

      <DeleteModal
        isOpen={modalState.type === 'delete'}
        onClose={handleCloseModal}
        onConfirm={handleDeletePot}
        isDeleting={deletePot.isPending}
        itemName={modalState.pot?.name || ''}
        itemType="pot"
      />
    </div>
  );
}
