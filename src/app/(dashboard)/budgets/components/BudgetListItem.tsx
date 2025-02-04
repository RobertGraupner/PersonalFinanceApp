import { formatCurrency } from '@/lib/utils/formatCurrency';
import { BudgetListItemProps } from '@/types/budgets';

export function BudgetListItem({
  category,
  theme,
  spent,
  maximum,
}: BudgetListItemProps) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-grey100 py-3 last:border-b-0 last:pb-0">
      {/* Category */}
      <div className="flex items-center gap-3">
        <div
          className="h-full min-h-[21px] w-1 shrink-0 rounded-full"
          style={{ backgroundColor: theme }}
        />
        <span className="text-preset-4 text-grey500">{category}</span>
      </div>

      {/* Spent amount */}
      <div className="flex flex-row items-end lg:flex-col lg:items-end xl:flex-row xl:items-center">
        <span className="text-preset-3 text-grey900">
          {formatCurrency(spent)}&nbsp;
        </span>
        <span className="text-preset-5 text-grey500">
          of {formatCurrency(maximum)}
        </span>
      </div>
    </div>
  );
}
