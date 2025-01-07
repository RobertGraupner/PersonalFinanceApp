import { useQuery } from '@tanstack/react-query';
import type { ApiResponse } from '@/types/api';
import type { OverviewData } from '@/types/overview';
import { ITransaction } from '@/lib/models/Transaction';
import { IBudget } from '@/lib/models/Budget';
import { IPot } from '@/lib/models/Pot';
import { IUserBalance } from '@/lib/models/User';

export function useOverviewData() {
  return useQuery<OverviewData>({
    queryKey: ['overview'],
    queryFn: async () => {
      const [transactionsRes, budgetsRes, potsRes, userRes] = await Promise.all(
        [
          fetch(`/api/transactions?limit=5&sort=latest`),
          fetch(`/api/budgets`),
          fetch(`/api/pots`),
          fetch(`/api/user`),
        ]
      );

      const [transactions, budgets, pots, user] = (await Promise.all([
        transactionsRes.json(),
        budgetsRes.json(),
        potsRes.json(),
        userRes.json(),
      ])) as [
        ApiResponse<ITransaction[]>,
        ApiResponse<IBudget[]>,
        ApiResponse<IPot[]>,
        ApiResponse<IUserBalance>,
      ];

      return {
        transactions: transactions.data || [],
        budgets: budgets.data || [],
        pots: pots.data || [],
        stats: user.data || {
          current: 0,
          income: 0,
          expenses: 0,
        },
      };
    },
  });
}
