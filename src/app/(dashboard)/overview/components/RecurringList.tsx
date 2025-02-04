import { useMemo } from 'react';
import { ContentCard } from '@/components/Ui/ContentCard';
import { SectionHeader } from '@/components/Ui/SectionHeader';
import { formatCurrency } from '@/lib/utils/formatCurrency';
import { RecurringListProps } from '@/types/overview';

export function RecurringList({ recurring }: RecurringListProps) {
  const stats = useMemo(() => {
    return {
      paidBills: recurring
        .filter((t) => new Date(t.date) < new Date())
        .reduce((sum, t) => sum + Math.abs(t.amount), 0),

      totalUpcoming: recurring
        .filter((t) => new Date(t.date) > new Date())
        .reduce((sum, t) => sum + Math.abs(t.amount), 0),

      dueSoon: recurring
        .filter((t) => {
          const transactionDate = new Date(t.date);
          const nextWeek = new Date();
          nextWeek.setDate(nextWeek.getDate() + 7);
          return transactionDate > new Date() && transactionDate <= nextWeek;
        })
        .reduce((sum, t) => sum + Math.abs(t.amount), 0),
    };
  }, [recurring]);

  const items = [
    {
      label: 'Paid Bills',
      value: stats.paidBills,
      color: '#277C78',
    },
    {
      label: 'Total Upcoming',
      value: stats.totalUpcoming,
      color: '#F2CDAC',
    },
    {
      label: 'Due Soon',
      value: stats.dueSoon,
      color: '#82C9D7',
    },
  ];

  return (
    <ContentCard className="p-6 lg:p-6">
      <SectionHeader
        title="Recurring Bills"
        linkHref="/recurring"
        linkText="See Details"
        titleStyle="text-preset-2"
      />
      <div className="flex flex-col gap-2">
        {items.map((item) => (
          <div
            key={item.label}
            className="rounded-l-lg rounded-r-3xl"
            style={{ backgroundColor: item.color }}
          >
            <div className="ml-1 flex items-center justify-between rounded-lg bg-beige100 p-4">
              <span className="text-preset-4 text-grey500">{item.label}</span>
              <span className="text-preset-4 font-bold text-grey900">
                {formatCurrency(item.value)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </ContentCard>
  );
}
