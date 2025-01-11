import { Card } from './Card';
import { TransactionsListProps } from '@/types/overview';
import Image from 'next/image';
import { formatCurrency } from '@/lib/utils/formatCurrency';
import { format } from 'date-fns';
import { cn } from '@/lib/utils/cn';
export function TransactionsList({ transactions }: TransactionsListProps) {
  return (
    <Card
      title="Latest Transactions"
      linkHref="/transactions"
      linkText="View All"
    >
      <>
        {transactions.map((transaction) => (
          <div
            key={transaction._id}
            className="border-b border-grey100 last:border-b-0"
          >
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <Image
                  src={transaction.avatar}
                  alt={transaction.name}
                  width={40}
                  height={40}
                  className="rounded-full object-cover"
                />
                <p className="text-preset-4 font-bold text-grey900">
                  {transaction.name}
                </p>
              </div>
              <div className="text-right">
                <p
                  className={cn('text-preset-4 font-bold', {
                    'text-green': transaction.amount > 0,
                    'text-grey900': transaction.amount <= 0,
                  })}
                >
                  {transaction.amount > 0 ? '+' : ''}
                  {formatCurrency(transaction.amount)}
                </p>
                <p className="text-preset-5 text-grey500">
                  {format(new Date(transaction.date), 'd MMM yyyy')}
                </p>
              </div>
            </div>
          </div>
        ))}
      </>
    </Card>
  );
}
