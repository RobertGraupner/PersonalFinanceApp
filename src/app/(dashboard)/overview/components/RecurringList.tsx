import { useMemo } from 'react';
import { Card } from './Card';
import { formatCurrency } from '@/lib/utils/formatCurrency';
import { ITransaction } from '@/lib/models/Transaction';

interface RecurringListProps {
  transactions: ITransaction[];
}

export function RecurringList({ transactions }: RecurringListProps) {
  const stats = useMemo(() => {
    const recurringTransactions = transactions.filter((t) => t.recurring);
    console.log(recurringTransactions);
    console.log(transactions);

    return {
      paidBills: recurringTransactions
        .filter((t) => new Date(t.date) < new Date())
        .reduce((sum, t) => sum + Math.abs(t.amount), 0),

      totalUpcoming: recurringTransactions
        .filter((t) => new Date(t.date) > new Date())
        .reduce((sum, t) => sum + Math.abs(t.amount), 0),

      dueSoon: recurringTransactions
        .filter((t) => {
          const transactionDate = new Date(t.date);
          const nextWeek = new Date();
          nextWeek.setDate(nextWeek.getDate() + 7);
          return transactionDate > new Date() && transactionDate <= nextWeek;
        })
        .reduce((sum, t) => sum + Math.abs(t.amount), 0),
    };
  }, [transactions]);

  const items = [
    {
      label: 'Paid Bills',
      value: stats.paidBills,
      color: '#277C78', // zielony
    },
    {
      label: 'Total Upcoming',
      value: stats.totalUpcoming,
      color: '#BE6C49', // pomarańczowy
    },
    {
      label: 'Due Soon',
      value: stats.dueSoon,
      color: '#82C9D7', // turkusowy
    },
  ];

  return (
    <Card title="Recurring Bills" linkHref="/recurring" linkText="See Details">
      <div className="flex flex-col gap-2">
        {items.map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-between rounded-lg bg-beige100 p-4"
          >
            <div className="flex items-center gap-2">
              <div
                className="h-4 w-1 rounded-sm"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-preset-4 text-grey500">{item.label}</span>
            </div>
            <span className="text-preset-4 font-bold text-grey900">
              {formatCurrency(item.value)}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}
