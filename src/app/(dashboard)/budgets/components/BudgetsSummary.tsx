import { ContentCard } from '@/components/Ui/ContentCard';
import { BudgetListItem } from './BudgetListItem';
import type { BudgetsSummaryProps } from '@/types/budgets';
import { Chart } from '@/components/Ui/Chart';

export function BudgetsSummary({
  total,
  limit,
  budgets,
  spent,
}: BudgetsSummaryProps) {
  const data = budgets.map((budget) => ({
    name: budget.category,
    value: budget.maximum,
    color: budget.theme,
  }));

  return (
    <ContentCard>
      <div className="flex h-full w-full flex-col items-center justify-center gap-6 sm:flex-row md:flex-col">
        <Chart data={data} total={total} limit={limit} />
        {/* Budgets list */}
        <div className="flex w-full flex-col">
          <h2 className="mb-6 text-preset-2">Budgets summary</h2>
          {budgets.map((budget) => {
            return (
              <BudgetListItem
                key={budget._id}
                category={budget.category}
                theme={budget.theme}
                spent={spent[budget.category]?.spent || 0}
                maximum={budget.maximum}
              />
            );
          })}
        </div>
      </div>
    </ContentCard>
  );
}
