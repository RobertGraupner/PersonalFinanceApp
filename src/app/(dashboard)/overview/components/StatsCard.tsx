import { formatCurrency } from '@/lib/utils/formatCurrency';
import { StatsCardsProps } from '@/types/overview';

export function StatsCards({ stats }: StatsCardsProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {/* Current Balance */}
      <div className="flex flex-col gap-3 rounded-xl bg-grey900 p-6 text-white">
        <p className="text-preset-4">Current Balance</p>
        <p className="break-words text-preset-1">
          {formatCurrency(stats.current)}
        </p>
      </div>

      {/* Income */}
      <div className="flex flex-col gap-3 rounded-xl bg-white p-6">
        <p className="text-preset-4">Income</p>
        <p className="break-words text-preset-1">
          {formatCurrency(stats.income)}
        </p>
      </div>

      {/* Expenses */}
      <div className="flex flex-col gap-3 rounded-xl bg-white p-6">
        <p className="text-preset-4">Expenses</p>
        <p className="break-words text-preset-1">
          {formatCurrency(stats.expenses)}
        </p>
      </div>
    </div>
  );
}
