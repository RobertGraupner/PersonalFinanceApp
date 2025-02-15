import Image from 'next/image';
import { format } from 'date-fns';
import { formatCurrency } from '@/lib/utils/formatCurrency';
import { cn } from '@/lib/utils/cn';
import type { TransactionItemProps } from '@/types/transactions';
import { CATEGORY_ICONS } from '@/constants/transactions';
import { ActionMenu } from '@/components/Ui/ActionMenu';
import { IconRenderer } from '@/components/Ui/IconRenderer';

export function TransactionItem({
  transaction,
  onAction,
}: TransactionItemProps) {
  const formattedDate = format(new Date(transaction.date), 'd MMM yyyy');
  const isPositiveAmount = transaction.amount > 0;
  const cellClasses = 'py-4 px-1 first:pl-0 last:pr-0';

  // Check if avatar is an icon name
  const isIconName = !transaction.avatar.startsWith('/');

  return (
    <tr className="border-b border-grey100 last:border-none">
      <td className={cn(cellClasses, 'w-[35%]')}>
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
          <div className="flex flex-col gap-1">
            <span className="text-preset-4 font-bold text-grey900">
              {transaction.name}
            </span>
            <span
              className="text-preset-5 text-grey500 sm:hidden"
              role="cell"
              aria-label="Category"
            >
              {transaction.category}
            </span>
          </div>
        </div>
      </td>

      {/* category desktop */}
      <td
        className={cn(
          'hidden text-preset-5 text-grey500 sm:table-cell',
          cellClasses,
          'w-[25%]'
        )}
      >
        {transaction.category}
      </td>

      {/* date desktop */}
      <td
        className={cn(
          'hidden text-preset-5 text-grey500 sm:table-cell',
          cellClasses,
          'w-[25%]'
        )}
      >
        {formattedDate}
      </td>

      {/* amount and date */}
      <td className={cn('text-right', cellClasses, 'w-[10%]')}>
        <div className="flex flex-col items-end">
          <span
            className={cn('text-preset-4 font-bold', {
              'text-green': isPositiveAmount,
              'text-grey900': !isPositiveAmount,
            })}
          >
            {isPositiveAmount ? '+' : ''}
            {formatCurrency(transaction.amount)}
          </span>
          <span className="text-preset-5 text-grey500 sm:hidden">
            {formattedDate}
          </span>
        </div>
      </td>
      <td className={cn(cellClasses, 'w-[5%]', 'text-center')}>
        <ActionMenu
          onEdit={() => onAction('edit', transaction)}
          onDelete={() => onAction('delete', transaction)}
          type="transaction"
        />
      </td>
    </tr>
  );
}
