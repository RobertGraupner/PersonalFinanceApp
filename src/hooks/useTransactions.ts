import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import type { ApiResponse } from '@/types/api';
import type { ITransaction } from '@/lib/models/Transaction';
import { useSearchParams } from 'next/navigation';

import { INCOME_CATEGORIES } from '@/constants/transactions';
import type { TransactionFormData } from '@/types/transactions';

export function useTransactions() {
  const searchParams = useSearchParams();

  return useQuery<ApiResponse<ITransaction[]>>({
    queryKey: ['transactions', searchParams.toString()],
    queryFn: async () => {
      const response = await fetch(
        `/api/transactions?${searchParams.toString()}`
      );
      if (!response.ok) {
        throw new Error('An error occurred while fetching transactions');
      }
      return response.json();
    },
    // placeholderData: keepPreviousData,
    staleTime: 1000 * 10,
  });
}

export function useAddTransaction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: TransactionFormData) => {
      const parsedAmount = parseFloat(data.amount.replace(',', '.'));
      if (isNaN(parsedAmount)) {
        throw new Error('Nieprawidłowy format kwoty');
      }
      const isIncome = INCOME_CATEGORIES.includes(data.category as string);
      const amount = isIncome
        ? Math.abs(parsedAmount)
        : -Math.abs(parsedAmount);

      const response = await fetch('/api/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          amount,
          date: new Date().toISOString(),
          avatar: data.category,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to add transaction');
      }

      return response.json();
    },
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ['transactions'],
          refetchType: 'all',
        }),
        queryClient.invalidateQueries({
          queryKey: ['overview'],
          refetchType: 'all',
        }),
      ]);
    },
  });
}
