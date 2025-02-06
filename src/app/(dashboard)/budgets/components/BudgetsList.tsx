import { format } from 'date-fns';
import { BudgetCard } from './BudgetCard';
import type { BudgetsListProps } from '@/types/budgets';

export function BudgetsList({
  budgets,
  spentData,
  onDelete,
}: BudgetsListProps) {
  return (
    <div className="space-y-6 lg:col-span-3">
      {budgets.map((budget) => {
        const categoryData = spentData?.[budget.category];
        const latestTransactions =
          categoryData?.transactions?.map((t) => ({
            name: t.name,
            amount: t.amount,
            date: format(new Date(t.date), 'd MMM yyyy'),
            avatar: t.avatar,
          })) || [];

        return (
          <BudgetCard
            key={budget._id}
            budget={budget}
            spent={categoryData?.spent || 0}
            transactions={latestTransactions}
            onDelete={onDelete}
          />
        );
      })}
    </div>
  );
}
