import { useQuery, keepPreviousData } from '@tanstack/react-query';
import type { ApiResponse } from '@/types/api';
import type { ITransaction } from '@/lib/models/Transaction';
import { useSearchParams } from 'next/navigation';

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
    placeholderData: keepPreviousData,
    staleTime: 1000 * 10,
  });
}
