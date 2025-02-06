import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';

import type { ApiResponse } from '@/types/api';
import type { IBudget } from '@/lib/models/Budget';
import type { CategorySpent } from '@/types/api';
import type { BudgetsResponse } from '@/types/budgets';

export function useBudgets() {
  return useQuery<BudgetsResponse>({
    queryKey: ['budgets'],
    queryFn: async () => {
      const [budgetsRes, spentRes] = await Promise.all([
        fetch('/api/budgets'),
        fetch('/api/transactions?aggregate=true'),
      ]);

      if (!budgetsRes.ok || !spentRes.ok) {
        throw new Error('Failed to fetch budgets data');
      }

      const [budgets, spent] = (await Promise.all([
        budgetsRes.json(),
        spentRes.json(),
      ])) as [ApiResponse<IBudget[]>, ApiResponse<CategorySpent>];

      return {
        data: budgets.data ?? [],
        spent: spent.data ?? {},
      };
    },
  });
}

export function useDeleteBudget() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (budgetId: string) => {
      const response = await fetch(`/api/budgets/${budgetId}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete budget');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['budgets'] });
      queryClient.invalidateQueries({ queryKey: ['overview'] });
    },
  });
}
