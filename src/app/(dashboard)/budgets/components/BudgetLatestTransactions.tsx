import Image from 'next/image';
import { formatCurrency } from '@/lib/utils/formatCurrency';
import type { BudgetLatestTransactionsProps } from '@/types/budgets';
import { SectionHeader } from '@/components/Ui/SectionHeader';
import { IconRenderer } from '@/components/Ui/IconRenderer';
import { CATEGORY_ICONS } from '@/constants/transactions';

export function BudgetLatestTransactions({
  transactions,
  category,
}: BudgetLatestTransactionsProps) {
  return (
    <div className="space-y-4 rounded-lg bg-beige100 p-5">
      <SectionHeader
        title="Latest Spending"
        linkHref={`/transactions?page=1&category=${category}`}
        linkText="See All"
        titleStyle="text-preset-3"
      />

      <div>
        {transactions.map((transaction, index) => {
          const isIconName = !transaction.avatar.startsWith('/');

          return (
            <div
              key={index}
              className="flex items-center justify-between gap-1 border-b border-grey500 border-opacity-15 py-3 last:border-b-0 last:pb-0"
            >
              <div className="flex items-center gap-4">
                {isIconName ? (
                  <IconRenderer
                    iconName={transaction.avatar as keyof typeof CATEGORY_ICONS}
                    category={category}
                    className="h-full w-full text-white"
                  />
                ) : (
                  <Image
                    src={transaction.avatar}
                    alt={transaction.name}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                )}
                <span className="text-preset-5 font-bold text-grey900">
                  {transaction.name}
                </span>
              </div>
              <div className="text-right">
                <p className="text-preset-5 font-bold text-grey900">
                  {formatCurrency(transaction.amount)}
                </p>
                <p className="text-preset-5 text-grey500">{transaction.date}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
