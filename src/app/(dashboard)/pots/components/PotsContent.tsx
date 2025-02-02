'use client';

import { usePots } from '@/hooks/usePots';
import { ErrorPage } from '@/components/Ui/ErrorPage';
import { EmptyDataPage } from '@/components/Ui/EmptyDataPage';
import { PotsList } from './PotsList';
import { AddEntityButton } from '@/components/Ui/AddEntityButton';
import { PotsSkeleton } from './PotsSkeleton';

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
      <div className="flex items-center justify-between">
        <h1 className="text-preset-1">Pots</h1>
        <AddEntityButton
          onClick={() => console.log('Add pot')}
          label="+ Add New Pot"
        />
      </div>
      <PotsList pots={data.data} />
    </div>
  );
}
