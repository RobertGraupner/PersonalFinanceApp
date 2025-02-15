import Image from 'next/image';
import { formatCurrency } from '@/lib/utils/formatCurrency';
import { cn } from '@/lib/utils/cn';
import type { RecurringItemProps } from '@/types/transactions';
import { getDayWithSuffix } from '@/lib/utils/getDayWithSuffix';
import { IconRenderer } from '@/components/Ui/IconRenderer';
import { CATEGORY_ICONS } from '@/constants/transactions';

export function RecurringItem({ transaction }: RecurringItemProps) {
  const formattedDate = `Monthly - ${getDayWithSuffix(new Date(transaction.date))}`;
  const isPositiveAmount = transaction.amount > 0;
  const cellClasses = 'py-4 px-1 first:pl-0 last:pr-0';
  const isIconName = !transaction.avatar.startsWith('/');

  return (
    <tr className="border-b border-grey100 last:border-none">
      <td className={cn(cellClasses, 'w-[40%]')}>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-4">
            {isIconName && (
              <IconRenderer
                iconName={transaction.avatar as keyof typeof CATEGORY_ICONS}
                category={transaction.category}
                className="h-full w-full text-white"
              />
            )}
            {!isIconName && (
              <Image
                src={transaction.avatar}
                alt={`Picture/logo of ${transaction.name}`}
                width={40}
                height={40}
                className="rounded-full object-cover"
              />
            )}

            <span className="text-preset-4 font-bold text-grey900">
              {transaction.name}
            </span>
          </div>

          {/* date mobile */}
          <div className="flex items-center gap-2 text-preset-5 sm:hidden">
            {formattedDate}
            {transaction.status === 'paid' && (
              <Image
                src="/images/icon-bill-paid.svg"
                alt="Paid bill icon"
                width={16}
                height={16}
              />
            )}
            {transaction.status === 'due' && (
              <Image
                src="/images/icon-bill-due.svg"
                alt="Due bill icon"
                width={16}
                height={16}
              />
            )}
          </div>
        </div>
      </td>

      {/* date desktop */}
      <td
        className={cn(
          'hidden text-preset-5 sm:table-cell',
          cellClasses,
          'w-[25%]',
          {
            'text-red': transaction.status === 'due',
          }
        )}
      >
        <div className="flex items-center gap-2">
          {formattedDate}
          {transaction.status === 'paid' && (
            <Image
              src="/images/icon-bill-paid.svg"
              alt="Paid bill icon"
              width={16}
              height={16}
            />
          )}
          {transaction.status === 'due' && (
            <Image
              src="/images/icon-bill-due.svg"
              alt="Due bill icon"
              width={16}
              height={16}
            />
          )}
        </div>
      </td>

      {/* amount */}
      <td className={cn('text-right', cellClasses, 'w-[10%]')}>
        <div className="flex flex-col items-end">
          <span
            className={cn('text-preset-4 font-bold', {
              'text-red': transaction.status === 'due',
            })}
          >
            {isPositiveAmount ? '+' : ''}
            {formatCurrency(transaction.amount)}
          </span>
        </div>
      </td>
    </tr>
  );
}
