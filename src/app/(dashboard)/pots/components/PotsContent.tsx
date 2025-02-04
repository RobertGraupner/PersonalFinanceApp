'use client';

import { usePots } from '@/hooks/usePots';
import { ErrorPage } from '@/components/Ui/ErrorPage';
import { EmptyDataPage } from '@/components/Ui/EmptyDataPage';
import { PotsList } from './PotsList';
import { PotsSkeleton } from './PotsSkeleton';
import { PageHeader } from '@/components/Ui/PageHeader';

export function PotsContent() {
  const { data, isLoading, error } = usePots();
  console.log(data);

  if (error) {
    return (
      <ErrorPage
        title="Oops! Something went wrong"
        description={error.message}
      />
    );
  }

  if (isLoading) {
    return <PotsSkeleton />;
  }

  if (!data || data.data.length === 0) {
    return <EmptyDataPage viewType="pots" />;
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Pots"
        addButtonLabel="+ Add New Pot"
        onAddClick={() => console.log('+ Add new pot')}
      />
      <PotsList pots={data.data} />
    </div>
  );
}
