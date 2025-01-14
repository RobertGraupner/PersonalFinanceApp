import { useQuery } from '@tanstack/react-query';
import type { ApiResponse } from '@/types/api';
import type { OverviewData } from '@/types/overview';
import { ITransaction } from '@/lib/models/Transaction';
import { IBudget } from '@/lib/models/Budget';
import { IPot } from '@/lib/models/Pot';
import { IUserBalance } from '@/lib/models/User';
import type { CategorySpent } from '@/types/api';

export function useOverviewData() {
  return useQuery<OverviewData>({
    queryKey: ['overview'],
    queryFn: async () => {
      const [
        transactionsRes,
        budgetsRes,
        spentRes,
        potsRes,
        recurringRes,
        userRes,
      ] = await Promise.all([
        fetch(`/api/transactions?sort=latest&limit=5`),
        fetch(`/api/budgets`),
        fetch(`/api/transactions?aggregate=true`),
        fetch(`/api/pots`),
        fetch(`/api/transactions?recurring=true&limit=9999`),
        fetch(`/api/user`),
      ]);

      const [transactions, budgets, spent, pots, recurring, user] =
        (await Promise.all([
          transactionsRes.json(),
          budgetsRes.json(),
          spentRes.json(),
          potsRes.json(),
          recurringRes.json(),
          userRes.json(),
        ])) as [
          ApiResponse<ITransaction[]>,
          ApiResponse<IBudget[]>,
          ApiResponse<CategorySpent>,
          ApiResponse<IPot[]>,
          ApiResponse<ITransaction[]>,
          ApiResponse<IUserBalance>,
        ];

      return {
        transactions: transactions.data || [],
        budgets: budgets.data || [],
        pots: pots.data || [],
        recurring: recurring.data || [],
        stats: user.data || {
          current: 0,
          income: 0,
          expenses: 0,
        },
        spent: spent.data || {},
      };
    },
  });
}
