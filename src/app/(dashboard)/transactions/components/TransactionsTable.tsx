import { TABLE_COLUMNS } from '@/constants/transactions';
import type { TransactionsTableProps } from '@/types/transactions';
import { TransactionItem } from './TransactionItem';
import { cn } from '@/lib/utils/cn';

export function TransactionsTable({
  transactions,
  onAction,
}: TransactionsTableProps) {
  return (
    <table className="w-full">
      <thead className="hidden sm:table-header-group">
        <tr className="border-b border-grey100 text-preset-5">
          {TABLE_COLUMNS.map((column) => (
            <th
              key={column.key}
              scope="col"
              className={cn(
                'px-1 py-4 first:pl-0 last:pr-0',
                'text-grey500',
                column.key === 'amount' ? 'text-right' : 'text-left',
                column.key === 'category' || column.key === 'date'
                  ? 'hidden sm:table-cell'
                  : ''
              )}
            >
              {column.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {transactions.map((transaction) => (
          <TransactionItem
            key={transaction._id}
            transaction={transaction}
            onAction={(type) => onAction(type, transaction)}
          />
        ))}
      </tbody>
    </table>
  );
}
