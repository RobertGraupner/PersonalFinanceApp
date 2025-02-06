'use client';

import { useBudgets } from '@/hooks/useBudgets';
import { ErrorPage } from '@/components/Ui/ErrorPage';
import { EmptyDataPage } from '@/components/Ui/EmptyDataPage';
import { PageHeader } from '@/components/Ui/PageHeader';
import { BudgetsSummary } from './BudgetsSummary';
import { BudgetsSkeleton } from './BudgetsSkeleton';
import { BudgetsList } from './BudgetsList';

export function BudgetsContent() {
  const { data, isLoading, error } = useBudgets();

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
        onAddClick={() => console.log('+ Add new budget')}
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

        <BudgetsList budgets={data.data} spentData={data.spent} />
      </div>
    </div>
  );
}
