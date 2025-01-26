import { formatCurrency } from '@/lib/utils/formatCurrency';
import type { SummaryCardProps } from '@/types/transactions';
import { cn } from '@/lib/utils/cn';

export function SummaryCard({ items }: SummaryCardProps) {
  return (
    <div className="flex w-full flex-col items-start gap-5 rounded-xl bg-white p-6">
      <h3 className="text-preset-3">Summary</h3>
      <div className="w-full space-y-3">
        {items.map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-between border-b border-grey100 pb-3 last:border-0 last:pb-0"
          >
            <span
              className={cn('text-preset-5', {
                'text-red': item.label === 'Due Soon',
                'text-grey500': item.label !== 'Due Soon',
              })}
            >
              {item.label}
            </span>
            <span
              className={cn('text-preset-5 font-bold', {
                'text-red': item.label === 'Due Soon',
                'text-grey900': item.label !== 'Due Soon',
              })}
            >
              {item.count} ({formatCurrency(item.amount)})
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
