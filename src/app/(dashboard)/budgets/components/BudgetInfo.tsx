import { formatCurrency } from '@/lib/utils/formatCurrency';
import type { BudgetInfoProps } from '@/types/budgets';

export function BudgetInfo({
  maximum,
  spent,
  remaining,
  progress,
  theme,
}: BudgetInfoProps) {
  const clampedProgress = Math.min(Math.max(progress, 0), 100);

  return (
    <div className="space-y-4">
      <p className="text-preset-4 text-grey500">
        Maximum of {formatCurrency(maximum)}
      </p>

      <div className="h-8 w-full overflow-hidden rounded bg-beige100 p-1">
        <div
          className="h-full rounded transition-all duration-300"
          style={{
            width: `${clampedProgress}%`,
            backgroundColor: theme,
          }}
        />
      </div>

      <div className="flex items-center">
        <div className="flex flex-1 items-center gap-4">
          <div
            className="h-full min-h-[43px] w-1 shrink-0 rounded-full"
            style={{ backgroundColor: theme }}
          />
          <div className="flex flex-col">
            <p className="text-preset-5 text-grey500">Spent</p>
            <p className="text-preset-4 font-bold text-grey900">
              {formatCurrency(spent)}
            </p>
          </div>
        </div>
        <div className="flex flex-1 items-center gap-4">
          <div className="h-full min-h-[43px] w-1 shrink-0 rounded-full bg-beige100" />
          <div className="flex flex-col">
            <p className="text-preset-5 text-grey500">Remaining</p>
            <p className="text-preset-4 font-bold text-grey900">
              {formatCurrency(remaining)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
