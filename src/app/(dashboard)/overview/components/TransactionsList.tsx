import { ContentCard } from '@/components/Ui/ContentCard';
import { SectionHeader } from '@/components/Ui/SectionHeader';
import { TransactionsListProps } from '@/types/overview';
import Image from 'next/image';
import { formatCurrency } from '@/lib/utils/formatCurrency';
import { format } from 'date-fns';
import { cn } from '@/lib/utils/cn';

import React from 'react';
import { CATEGORY_ICONS } from '@/constants/transactions';
import { IconRenderer } from '@/components/Ui/IconRenderer';
export function TransactionsList({ transactions }: TransactionsListProps) {
  return (
    <ContentCard className="p-6 lg:p-6">
      <SectionHeader
        title="Transactions"
        linkHref="/transactions"
        linkText="View All"
        titleStyle="text-preset-2"
      />
      <>
        {transactions.map((transaction) => {
          const isIconName = !transaction.avatar.startsWith('/');

          return (
            <div
              key={transaction._id}
              className="border-b border-grey100 last:border-b-0"
            >
              <div className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  {isIconName && (
                    <div className="h-10 w-10 rounded-full bg-grey100 p-2">
                      <IconRenderer
                        iconName={
                          transaction.avatar as keyof typeof CATEGORY_ICONS
                        }
                        className="h-full w-full text-grey900"
                      />
                    </div>
                  )}
                  {!isIconName && (
                    <Image
                      src={transaction.avatar}
                      alt={transaction.name}
                      width={40}
                      height={40}
                      className="rounded-full object-cover"
                    />
                  )}
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
          );
        })}
      </>
    </ContentCard>
  );
}
