import type { ITransaction } from '@/lib/models/Transaction';
import type { OverviewStats } from '@/types/overview';

export function calculateOverviewStats(
  transactions: ITransaction[]
): OverviewStats {
  return {
    balance: transactions.reduce((sum, t) => sum + t.amount, 0),

    income: transactions
      .filter((t) => t.amount > 0)
      .reduce((sum, t) => sum + t.amount, 0),

    expenses: Math.abs(
      transactions
        .filter((t) => t.amount < 0)
        .reduce((sum, t) => sum + t.amount, 0)
    ),
  };
}
